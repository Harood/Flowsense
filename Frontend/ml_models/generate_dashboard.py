import pandas as pd
import json, os

BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "water_data_hourly.csv")
OUT_PATH  = os.path.join(BASE_DIR, "..", "Backend", "data", "dashboard_stats.json")

df = pd.read_csv(DATA_PATH)
df["date"] = pd.to_datetime(df["date"])

SENSORS = ["bathroom1_L","laundry_L","bathroom2_L","kitchen_L","garden_L"]
NAMES   = ["Master Bathroom","Laundry","Common Bathroom","Kitchen","Garden"]
COLORS  = ["#3B82F6","#EC4899","#8B5CF6","#F59E0B","#10B981"]

# KWSB 2024 rate: Rs3,900/5000L + 23% hike = Rs0.96/L
# Blended with tanker supplement → Rs0.90/L realistic
RATE = 0.50

daily = df.groupby("date")[SENSORS + ["total_L"]].sum().reset_index().sort_values("date").reset_index(drop=True)
today       = daily.iloc[-1]
today_date  = str(today["date"].date())
today_total = round(float(today["total_L"]), 1)
month_total = round(float(daily["total_L"].tail(30).sum()), 1)
daily_avg   = round(float(daily["total_L"].mean()), 1)
est_bill    = round(month_total * RATE)
daily_cost  = round(daily_avg * RATE, 1)

# Calculate stats for current month (for display)
today_pd = pd.to_datetime(today_date)
current_month_data = daily[(daily["date"].dt.year == today_pd.year) &
                           (daily["date"].dt.month == today_pd.month)]
if len(current_month_data) > 0:
    month_total = round(float(current_month_data["total_L"].sum()), 1)

sensor_cards = []
for s, n, c in zip(SENSORS, NAMES, COLORS):
    val = round(float(today[s]), 1)
    sensor_cards.append({
        "name": n, "color": c,
        "today_L": val,
        "pct_of_total": round(val/today_total*100, 1),
        "sparkline": [round(float(r[s]),1) for _,r in daily.tail(7).iterrows()],
        "status": "normal"
    })

chart_data = []
# Include all available daily data (not just last 30 days) to support month navigation
for _, row in daily.iterrows():
    e = {"date": str(row["date"].date())}
    for s,n in zip(SENSORS,NAMES): e[n] = round(float(row[s]),1)
    e["Total"] = round(float(row["total_L"]),1)
    chart_data.append(e)

df["weekday"] = df["date"].dt.weekday
heatmap = [{"weekday":int(r["weekday"]),"hour":int(r["hour"]),"avg_L":round(float(r["total_L"]),2)}
           for _,r in df.groupby(["weekday","hour"])["total_L"].mean().reset_index().iterrows()]

# Get hourly data for the last day
last_date_df = df[df["date"] == pd.to_datetime(today_date)]
hourly_data = []
for _, row in last_date_df.iterrows():
    hourly_entry = {
        "hour": int(row["hour"]),
        "time": f"{int(row['hour']):02d}:00",
    }
    for s, n in zip(SENSORS, NAMES):
        hourly_entry[n] = round(float(row[s]), 2)
    hourly_entry["Total"] = round(float(row["total_L"]), 2)
    hourly_data.append(hourly_entry)

output = {
    "meta": {"rate_per_litre_rs": RATE, "source": "KWSB 2024 residential rate"},
    "today_date": today_date,
    "today_total_L": today_total, "month_total_L": month_total,
    "daily_avg_L": daily_avg,     "daily_cost_rs": daily_cost,
    "est_bill_rs": est_bill,      "active_sensors": 5,
    "sensor_cards": sensor_cards, "chart_last30": chart_data, "heatmap": heatmap,
    "hourly_data": hourly_data
}

with open(OUT_PATH,"w") as f: json.dump(output,f,indent=2)

print(f"Daily avg : {daily_avg}L")
print(f"Monthly   : {month_total}L")
print(f"Rate      : Rs{RATE}/litre (KWSB 2024)")
print(f"Est. bill : Rs{est_bill:,}/month (realistic!)")
print(f"Daily cost: Rs{daily_cost}")
print(f"Last date : {today_date}")
print("Done! OK")