import csv
import random
from datetime import datetime, timedelta

random.seed(42)

# ── Config ──────────────────────────────────────────────────
START_DATE = datetime(2026, 1, 1)
DAYS = 90
HOUSEHOLD_SIZE = 4

# Base hourly litres per sensor (normal behaviour)
BASE = {
    "bathroom1": 8.0,   # Master bathroom - highest usage
    "laundry": 5.5,   # Guest bathroom
    "bathroom2": 6.0,   # Common bathroom
    "kitchen":   4.5,   # Kitchen
    "garden":    3.0,   # Garden (zero at night)
}

# Manually defined leak events
# Format: (day_offset, hour, sensor, extra_litres, severity)
LEAK_EVENTS = [
    # Obvious leaks - will be detected (HIGH)
    (13,  3, "bathroom1", 85,  "HIGH"),    # Jan 14 - large burst
    (62,  1, "bathroom2", 110, "HIGH"),    # Mar 3  - large burst
    (55,  3, "laundry", 90,  "HIGH"),    # Feb 25 - large burst

    # Moderate leaks - likely detected (HIGH)
    (40,  2, "laundry", 45,  "HIGH"),    # Feb 10 - moderate
    (71,  2, "garden",    60,  "MEDIUM"),  # Mar 12 - moderate

    # Subtle leaks - might be missed (MEDIUM)
    (25, 14, "kitchen",   22,  "MEDIUM"),  # Jan 26 - small kitchen drip
    (80,  1, "bathroom2", 28,  "MEDIUM"),  # Mar 21 - subtle drip
    (86,  4, "bathroom1", 25,  "MEDIUM"),  # Mar 27 - subtle drip
]

# Build a lookup dict for fast access
leak_lookup = {}
for (day, hour, sensor, extra, severity) in LEAK_EVENTS:
    leak_lookup[(day, hour)] = (sensor, extra, severity)

# ── Multipliers ──────────────────────────────────────────────
def hour_multiplier(hour, sensor):
    """Return usage multiplier based on time of day and sensor."""
    # Garden only used morning and evening
    if sensor == "garden":
        if hour in [6, 7]:
            return 2.5
        elif hour in [18, 19]:
            return 2.0
        else:
            return 0.0   # no garden use at night

    # Bathroom peaks: morning and evening
    if sensor in ["bathroom1", "bathroom2"]:
        if hour in [6, 7, 8]:
            return 2.2
        elif hour in [19, 20, 21]:
            return 1.8
        elif 0 <= hour <= 5:
            return 0.05  # almost zero at night (leak detection window)
        else:
            return 0.4

    # Laundry peaks: morning and evening
    if sensor == "laundry":
        if hour in [6, 7, 8]:
            return 2.2
        elif hour in [19, 20, 21]:
            return 1.8
        elif 0 <= hour <= 5:
            return 0.05  # almost zero at night (leak detection window)
        else:
            return 0.4

    # Kitchen peaks: morning, lunch, dinner
    if sensor == "kitchen":
        if hour in [7, 8]:
            return 1.8
        elif hour in [12, 13]:
            return 1.5
        elif hour in [18, 19, 20]:
            return 1.7
        elif 0 <= hour <= 5:
            return 0.05
        else:
            return 0.5

    return 1.0

def weekend_multiplier(weekday):
    """Slightly higher usage on weekends."""
    return 1.2 if weekday >= 5 else 1.0

# ── Generate data ────────────────────────────────────────────
rows = []

for day in range(DAYS):
    current_date = START_DATE + timedelta(days=day)
    weekday = current_date.weekday()

    for hour in range(24):
        row = {
            "date": current_date.strftime("%Y-%m-%d"),
            "hour": hour,
            "datetime": current_date.strftime("%Y-%m-%d") + f" {hour:02d}:00",
            "bathroom1_L": 0.0,
            "laundry_L": 0.0,
            "bathroom2_L": 0.0,
            "kitchen_L":   0.0,
            "garden_L":    0.0,
            "total_L":     0.0,
            "is_anomaly":  0,
            "anomaly_sensor": "none",
            "severity": "normal"
        }

        # Calculate normal usage for each sensor
        for sensor, base in BASE.items():
            hm = hour_multiplier(hour, sensor)
            wm = weekend_multiplier(weekday)
            noise = random.uniform(0.85, 1.15)
            value = round(base * hm * wm * noise, 2)
            row[sensor + "_L"] = value

        # Inject leak if this day+hour matches
        if (day, hour) in leak_lookup:
            leak_sensor, extra_L, severity = leak_lookup[(day, hour)]
            row[leak_sensor + "_L"] += extra_L
            row[leak_sensor + "_L"] = round(row[leak_sensor + "_L"], 2)
            row["is_anomaly"] = 1
            row["anomaly_sensor"] = leak_sensor
            row["severity"] = severity

        # Calculate total
        row["total_L"] = round(
            row["bathroom1_L"] +
            row["laundry_L"] +
            row["bathroom2_L"] +
            row["kitchen_L"] +
            row["garden_L"], 2
        )

        rows.append(row)

# ── Write CSV ────────────────────────────────────────────────
fieldnames = [
    "date", "hour", "datetime",
    "bathroom1_L", "laundry_L", "bathroom2_L",
    "kitchen_L", "garden_L", "total_L",
    "is_anomaly", "anomaly_sensor", "severity"
]

output_file = "water_data_hourly.csv"

with open(output_file, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Dataset generated: {output_file}")
print(f"Total rows: {len(rows)}")
print(f"Anomaly rows: {sum(1 for r in rows if r['is_anomaly'] == 1)}")
print(f"Date range: {rows[0]['date']} to {rows[-1]['date']}")
print("\nLeak events injected:")
for (day, hour, sensor, extra, severity) in LEAK_EVENTS:
    date = (START_DATE + timedelta(days=day)).strftime("%Y-%m-%d")
    print(f"  {date} {hour:02d}:00 | {sensor} | +{extra}L | {severity}")