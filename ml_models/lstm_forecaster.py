import pandas as pd
import numpy as np
import json
import os
import warnings
warnings.filterwarnings("ignore")

from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import LinearRegression
import joblib

# ── Paths ────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
DATA_PATH  = os.path.join(BASE_DIR, "data", "water_data_hourly.csv")
MODELS_DIR = os.path.join(BASE_DIR, "..", "Backend", "data")
os.makedirs(MODELS_DIR, exist_ok=True)

LOOKBACK = 30   # use last 30 days to predict next day
SENSORS  = ["bathroom1_L", "bathroom2_L", "laundry_L", "kitchen_L", "garden_L", "total_L"]

# ── Load & Aggregate to Daily ────────────────────────────────
def load_daily_data():
    df = pd.read_csv(DATA_PATH)
    df["date"] = pd.to_datetime(df["date"])

    # ── Remove anomaly hours before aggregating ──
    # LSTM should train on clean data only
    df_clean = df[df["is_anomaly"] == 0]

    daily = df_clean.groupby("date")[SENSORS].sum().reset_index()
    daily = daily.sort_values("date").reset_index(drop=True)

    print(f"Daily data shape: {daily.shape}")
    print(f"Clean rows used: {len(df_clean)} / {len(df)} total")
    print(f"Date range: {daily['date'].min()} to {daily['date'].max()}")

    return daily

# ── Build Sequences ──────────────────────────────────────────
def build_sequences(data, lookback):
    X, y = [], []
    for i in range(lookback, len(data)):
        X.append(data[i - lookback:i])
        y.append(data[i])
    return np.array(X), np.array(y)


def train_fallback_forecast(daily):
    print("\nTensorFlow is unavailable in this environment; using a lightweight linear fallback.")
    print("-" * 50)

    all_forecasts = {}
    metrics_all = {}

    for sensor in SENSORS:
        print(f"\n  Sensor: {sensor}")

        values = daily[sensor].values.astype(float)

        scaler = MinMaxScaler(feature_range=(0, 1))
        values_scaled = scaler.fit_transform(values.reshape(-1, 1)).flatten()

        X, y = build_sequences(values_scaled, LOOKBACK)
        split = int(len(X) * 0.8)
        X_train, X_test = X[:split], X[split:]
        y_train, y_test = y[:split], y[split:]

        model = LinearRegression()
        model.fit(X_train, y_train)

        y_pred_scaled = model.predict(X_test)
        y_pred = scaler.inverse_transform(y_pred_scaled.reshape(-1, 1)).flatten()
        y_true = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

        mae = float(np.mean(np.abs(y_true - y_pred)))
        mape = float(np.mean(np.abs((y_true - y_pred) / (y_true + 0.01))) * 100)
        rmse = float(np.sqrt(np.mean((y_true - y_pred) ** 2)))

        print(f"    MAE:  {mae:.2f}L")
        print(f"    MAPE: {mape:.2f}%")
        print(f"    RMSE: {rmse:.2f}L")

        metrics_all[sensor] = {"mae": round(mae, 2), "mape": round(mape, 2), "rmse": round(rmse, 2)}

        last_sequence = values_scaled[-LOOKBACK:].copy()
        forecasts_scaled = []

        for _ in range(30):
            next_val = model.predict(last_sequence.reshape(1, LOOKBACK))[0]
            forecasts_scaled.append(next_val)
            last_sequence = np.append(last_sequence[1:], next_val)

        forecasts = scaler.inverse_transform(np.array(forecasts_scaled).reshape(-1, 1)).flatten()
        forecasts = np.clip(forecasts, 0, None)
        all_forecasts[sensor] = [round(float(v), 2) for v in forecasts]

    return all_forecasts, metrics_all

# ── Train LSTM ───────────────────────────────────────────────
def train_lstm(daily):
    try:
        from tensorflow import keras  # noqa: F401
        from tensorflow.keras.models import Sequential
        from tensorflow.keras.layers import LSTM, Dense, Dropout
        from tensorflow.keras.callbacks import EarlyStopping
    except Exception as exc:
        print(f"\nTensorFlow import failed: {exc}")
        return train_fallback_forecast(daily)

    print("\nTraining LSTM models for each sensor...")
    print("-" * 50)

    all_forecasts = {}
    metrics_all   = {}

    for sensor in SENSORS:
        print(f"\n  Sensor: {sensor}")

        values = daily[sensor].values.astype(float)

        # Normalise
        scaler = MinMaxScaler(feature_range=(0, 1))
        values_scaled = scaler.fit_transform(values.reshape(-1, 1)).flatten()

        # Build sequences
        X, y = build_sequences(values_scaled, LOOKBACK)
        X = X.reshape(X.shape[0], X.shape[1], 1)

        # Train/test split (80/20)
        split = int(len(X) * 0.8)
        X_train, X_test = X[:split], X[split:]
        y_train, y_test = y[:split], y[split:]

        # Build model
        model = Sequential([
            LSTM(64, return_sequences=True, input_shape=(LOOKBACK, 1)),
            Dropout(0.2),
            LSTM(32),
            Dropout(0.2),
            Dense(1)
        ])
        model.compile(optimizer="adam", loss="mse")

        # Train
        early_stop = EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)
        history = model.fit(
            X_train, y_train,
            epochs=50,
            batch_size=8,
            validation_data=(X_test, y_test),
            callbacks=[early_stop],
            verbose=0
        )

        # Evaluate on test set
        y_pred_scaled = model.predict(X_test, verbose=0).flatten()
        y_pred = scaler.inverse_transform(y_pred_scaled.reshape(-1,1)).flatten()
        y_true = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

        mae  = float(np.mean(np.abs(y_true - y_pred)))
        mape = float(np.mean(np.abs((y_true - y_pred) / (y_true + 0.01))) * 100)
        rmse = float(np.sqrt(np.mean((y_true - y_pred)**2)))

        print(f"    MAE:  {mae:.2f}L")
        print(f"    MAPE: {mape:.2f}%")
        print(f"    RMSE: {rmse:.2f}L")

        metrics_all[sensor] = {"mae": round(mae,2), "mape": round(mape,2), "rmse": round(rmse,2)}

        # ── Forecast next 30 days ────────────────────────────
        last_sequence = values_scaled[-LOOKBACK:].copy()
        forecasts_scaled = []

        for _ in range(30):
            seq = last_sequence[-LOOKBACK:].reshape(1, LOOKBACK, 1)
            next_val = model.predict(seq, verbose=0)[0][0]
            forecasts_scaled.append(next_val)
            last_sequence = np.append(last_sequence, next_val)

        forecasts = scaler.inverse_transform(
            np.array(forecasts_scaled).reshape(-1,1)
        ).flatten()

        # Clip negative values
        forecasts = np.clip(forecasts, 0, None)
        all_forecasts[sensor] = [round(float(v), 2) for v in forecasts]

        # Save model and scaler per sensor
        model.save(os.path.join(MODELS_DIR, f"lstm_{sensor}.keras"))
        joblib.dump(scaler, os.path.join(MODELS_DIR, f"scaler_lstm_{sensor}.pkl"))

    return all_forecasts, metrics_all

# ── Build Forecast JSON ──────────────────────────────────────
def build_forecast_json(daily, all_forecasts):
    last_date = daily["date"].max()
    forecast_dates = pd.date_range(
        start=last_date + pd.Timedelta(days=1),
        periods=30
    )

    forecast_rows = []
    for i, date in enumerate(forecast_dates):
        row = {"date": date.strftime("%Y-%m-%d"), "day": i + 1}
        for sensor in SENSORS:
            row[sensor] = all_forecasts[sensor][i]
        forecast_rows.append(row)

    # Also include 7-day and 30-day summary
    output = {
        "generated_on": str(last_date.date()),
        "forecast_start": forecast_dates[0].strftime("%Y-%m-%d"),
        "forecast_end":   forecast_dates[-1].strftime("%Y-%m-%d"),
        "next_7_days":  forecast_rows[:7],
        "next_30_days": forecast_rows,
        "summary": {
            "next_7_total_L":  round(sum(r["total_L"] for r in forecast_rows[:7]),  2),
            "next_30_total_L": round(sum(r["total_L"] for r in forecast_rows),      2),
            "avg_daily_L":     round(sum(r["total_L"] for r in forecast_rows) / 30, 2),
        }
    }

    path = os.path.join(MODELS_DIR, "forecast.json")
    with open(path, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nForecast saved to saved_models/forecast.json")
    print(f"  Next 7 days total:  {output['summary']['next_7_total_L']}L")
    print(f"  Next 30 days total: {output['summary']['next_30_total_L']}L")
    print(f"  Avg daily usage:    {output['summary']['avg_daily_L']}L")

    return output

# ── Save Metrics ─────────────────────────────────────────────
def save_metrics(metrics_all):
    path = os.path.join(MODELS_DIR, "lstm_metrics.json")
    with open(path, "w") as f:
        json.dump(metrics_all, f, indent=2)
    print(f"\nMetrics saved to saved_models/lstm_metrics.json")

# ── Main ─────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 50)
    print("  FlowSense - LSTM Usage Forecaster")
    print("=" * 50)

    daily          = load_daily_data()
    all_forecasts, metrics_all = train_lstm(daily)
    build_forecast_json(daily, all_forecasts)
    save_metrics(metrics_all)

    print("\nAll LSTM models trained and saved!")
    print("Done! OK")