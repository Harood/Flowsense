import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib
import json
import os

# ── Paths ────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "water_data_hourly.csv")
MODELS_DIR = os.path.join(BASE_DIR, "..", "Backend", "data")
os.makedirs(MODELS_DIR, exist_ok=True)

# The regenerated dataset contains roughly 0.4% anomalous rows, so matching the
# contamination rate to that scale gives the unsupervised detector a better
# recall/precision tradeoff.
CONTAMINATION = 0.004

def load_data():
    df = pd.read_csv(DATA_PATH)
    df["datetime"] = pd.to_datetime(df["datetime"])
    return df

def extract_features(df):
    features = df[[
        "bathroom1_L","bathroom2_L","laundry_L",
        "kitchen_L","garden_L","total_L","hour"
    ]].copy()
    features["is_peak_hour"] = features["hour"].apply(
        lambda h: 1 if h in [6,7,8,9,18,19,20,21] else 0
    )
    features["is_night"] = features["hour"].apply(
        lambda h: 1 if 0 <= h <= 5 else 0
    )
    features["b1_ratio"]  = features["bathroom1_L"] / (features["total_L"] + 0.01)
    features["b2_ratio"]  = features["bathroom2_L"] / (features["total_L"] + 0.01)
    features["laundry_ratio"]  = features["laundry_L"] / (features["total_L"] + 0.01)
    features["kit_ratio"] = features["kitchen_L"]   / (features["total_L"] + 0.01)
    features["gar_ratio"] = features["garden_L"]    / (features["total_L"] + 0.01)
    return features

def train_model(df):
    print("Training Isolation Forest model...")
    features = extract_features(df)
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)
    model = IsolationForest(
        n_estimators=200,
        contamination=CONTAMINATION,
        random_state=42,
        max_samples="auto"
    )
    model.fit(features_scaled)
    joblib.dump(model,  os.path.join(MODELS_DIR, "isolation_forest.pkl"))
    joblib.dump(scaler, os.path.join(MODELS_DIR, "scaler.pkl"))
    print("Model saved to saved_models/")
    return model, scaler

def evaluate_model(df, model, scaler):
    print("\nEvaluating model...")
    features = extract_features(df)
    features_scaled = scaler.transform(features)
    predictions = model.predict(features_scaled)
    scores = model.score_samples(features_scaled)
    df = df.copy()
    df["predicted_anomaly"] = (predictions == -1).astype(int)
    df["anomaly_score"] = scores
    actual    = df["is_anomaly"].values
    predicted = df["predicted_anomaly"].values
    TP = int(np.sum((actual==1)&(predicted==1)))
    TN = int(np.sum((actual==0)&(predicted==0)))
    FP = int(np.sum((actual==0)&(predicted==1)))
    FN = int(np.sum((actual==1)&(predicted==0)))
    accuracy  = round((TP+TN)/(TP+TN+FP+FN)*100, 2)
    precision = round(TP/(TP+FP)*100, 2) if (TP+FP)>0 else 0
    recall    = round(TP/(TP+FN)*100, 2) if (TP+FN)>0 else 0
    f1        = round(2*precision*recall/(precision+recall), 2) if (precision+recall)>0 else 0
    print(f"\nConfusion Matrix:")
    print(f"  TP: {TP}  FN: {FN}")
    print(f"  FP: {FP}  TN: {TN}")
    print(f"\nMetrics:")
    print(f"  Accuracy:  {accuracy}%")
    print(f"  Precision: {precision}%")
    print(f"  Recall:    {recall}%")
    print(f"  F1 Score:  {f1}%")
    missed = df[(df["is_anomaly"]==1)&(df["predicted_anomaly"]==0)]
    if len(missed)>0:
        print(f"\nMissed leaks ({len(missed)}):")
        for _, r in missed.iterrows():
            print(f"  {r['datetime']} | {r['anomaly_sensor']} | {r['total_L']}L")
    return df, {"TP":TP,"TN":TN,"FP":FP,"FN":FN,
                "accuracy":accuracy,"precision":precision,"recall":recall,"f1":f1}

def show_detected_anomalies(df):
    print("\nDetected Anomalies:")
    print("-"*70)
    anomalies = df[df["predicted_anomaly"]==1]
    for _, row in anomalies.iterrows():
        print(f"  {row['datetime']} | Sensor: {row['anomaly_sensor']} "
              f"| Total: {row['total_L']}L | Score: {round(row['anomaly_score'],4)}")
    print(f"\nTotal detected: {len(anomalies)}")

def identify_sensor(row):
    sensor_vals = {
        "Master Bathroom": row["bathroom1_L"],
        "Common Bathroom": row["bathroom2_L"],
        "Laundry":         row["laundry_L"],
        "Kitchen":         row["kitchen_L"],
        "Garden":          row["garden_L"]
    }
    if 0 <= row["hour"] <= 5:
        suspicious = {k:v for k,v in sensor_vals.items() if v > 10}
        if suspicious:
            return max(suspicious, key=suspicious.get)
    return max(sensor_vals, key=sensor_vals.get)

def save_alerts_json(df):
    anomalies = df[df["predicted_anomaly"]==1].copy()
    alerts = []
    for _, row in anomalies.iterrows():
        detected_sensor = identify_sensor(row)
        severity = str(row["severity"]).upper()
        if severity == "NORMAL":
            severity = "MEDIUM"
        alerts.append({
            "datetime":        str(row["datetime"]),
            "date":            str(row["date"]),
            "hour":            int(row["hour"]),
            "detected_sensor": detected_sensor,
            "actual_sensor":   str(row["anomaly_sensor"]),
            "total_L":         float(row["total_L"]),
            "bathroom1_L":     float(row["bathroom1_L"]),
            "bathroom2_L":     float(row["bathroom2_L"]),
            "laundry_L":       float(row["laundry_L"]),
            "kitchen_L":       float(row["kitchen_L"]),
            "garden_L":        float(row["garden_L"]),
            "anomaly_score":   float(row["anomaly_score"]),
            "severity":        severity
        })
    output_path = os.path.join(MODELS_DIR, "alerts.json")
    with open(output_path, "w") as f:
        json.dump(alerts, f, indent=2)
    print(f"\nAlerts saved to saved_models/alerts.json ({len(alerts)} alerts)")
    return alerts

if __name__ == "__main__":
    print("="*50)
    print("  FlowSense - Isolation Forest Anomaly Detection")
    print("="*50)
    df = load_data()
    print(f"Loaded {len(df)} rows | Actual anomalies: {df['is_anomaly'].sum()}")
    model, scaler = train_model(df)
    df_result, metrics = evaluate_model(df, model, scaler)
    show_detected_anomalies(df_result)
    save_alerts_json(df_result)
    print("\nDone!")