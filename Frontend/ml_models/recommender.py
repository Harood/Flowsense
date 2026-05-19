import pandas as pd
import numpy as np
import json
import os

# ── Paths ────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
DATA_PATH  = os.path.join(BASE_DIR, "data", "water_data_hourly.csv")
MODELS_DIR = os.path.join(BASE_DIR, "..", "Backend", "data")
os.makedirs(MODELS_DIR, exist_ok=True)

# ── Load & Aggregate ─────────────────────────────────────────
def load_daily_data():
    df = pd.read_csv(DATA_PATH)
    df["date"] = pd.to_datetime(df["date"])
    daily = df.groupby("date")[[
        "bathroom1_L", "bathroom2_L", "laundry_L",
        "kitchen_L", "garden_L", "total_L"
    ]].sum().reset_index()
    return df, daily

# ── Compute User Profile ─────────────────────────────────────
def compute_profile(df, daily):
    """
    Compute usage statistics for the single household user.
    """
    profile = {}

    # Average daily usage per sensor
    profile["avg_daily_total"]      = round(daily["total_L"].mean(), 2)
    profile["avg_daily_bathroom1"]  = round(daily["bathroom1_L"].mean(), 2)
    profile["avg_daily_bathroom2"]  = round(daily["bathroom2_L"].mean(), 2)
    profile["avg_daily_laundry"]    = round(daily["laundry_L"].mean(), 2)
    profile["avg_daily_kitchen"]    = round(daily["kitchen_L"].mean(), 2)
    profile["avg_daily_garden"]     = round(daily["garden_L"].mean(), 2)

    # Zone percentages of total
    total = profile["avg_daily_total"]
    profile["bathroom1_pct"] = round(profile["avg_daily_bathroom1"] / total * 100, 1)
    profile["bathroom2_pct"] = round(profile["avg_daily_bathroom2"] / total * 100, 1)
    profile["laundry_pct"]   = round(profile["avg_daily_laundry"]   / total * 100, 1)
    profile["kitchen_pct"]   = round(profile["avg_daily_kitchen"]   / total * 100, 1)
    profile["garden_pct"]    = round(profile["avg_daily_garden"]    / total * 100, 1)

    # Night usage (potential overnight leaks)
    night_df = df[df["hour"].between(0, 5)]
    profile["avg_night_total"] = round(night_df["total_L"].mean(), 2)

    # Weekend vs weekday
    daily["weekday"] = pd.to_datetime(daily["date"]).dt.weekday
    weekday_avg = daily[daily["weekday"] < 5]["total_L"].mean()
    weekend_avg = daily[daily["weekday"] >= 5]["total_L"].mean()
    profile["weekday_avg"] = round(weekday_avg, 2)
    profile["weekend_avg"] = round(weekend_avg, 2)

    # Peak usage day
    peak_day = daily.loc[daily["total_L"].idxmax()]
    profile["peak_day"]       = str(peak_day["date"].date())
    profile["peak_day_usage"] = round(float(peak_day["total_L"]), 2)

    # Highest consuming bathroom
    bath_avgs = {
        "Master Bathroom":  profile["avg_daily_bathroom1"],
        "Common Bathroom":  profile["avg_daily_bathroom2"],
        "Laundry":          profile["avg_daily_laundry"],
    }
    profile["highest_bathroom"] = max(bath_avgs, key=bath_avgs.get)

    return profile

# ── Rule Engine ──────────────────────────────────────────────
def generate_recommendations(profile):
    """
    Apply rules to profile and return ranked recommendations.
    Each rule produces a recommendation dict with:
      - title
      - description
      - sensor (which zone it relates to)
      - impact (High / Medium / Low)
      - saving_estimate_L (estimated daily saving in litres)
      - triggered (bool — whether rule fired)
    """
    recommendations = []

    # ── Rule 1: Master Bathroom high usage
    if profile["bathroom1_pct"] > 35:
        recommendations.append({
            "title":             "Reduce Master Bathroom Usage",
            "description":       f"Master Bathroom accounts for {profile['bathroom1_pct']}% of total daily usage. "
                                 f"Consider shorter showers and fixing dripping taps.",
            "sensor":            "Master Bathroom",
            "impact":            "High",
            "saving_estimate_L": round(profile["avg_daily_bathroom1"] * 0.15, 1),
            "priority":          1
        })

    # ── Rule 2: Common Bathroom high usage
    if profile["bathroom2_pct"] > 20:
        recommendations.append({
            "title":             "Check Common Bathroom Fixtures",
            "description":       f"Common Bathroom is using {profile['bathroom2_pct']}% of daily water. "
                                 f"Inspect taps and showerhead for drips.",
            "sensor":            "Common Bathroom",
            "impact":            "Medium",
            "saving_estimate_L": round(profile["avg_daily_bathroom2"] * 0.12, 1),
            "priority":          2
        })

    # ── Rule 3: Laundry high usage
    if profile["laundry_pct"] > 20:
        recommendations.append({
            "title":             "Optimise Laundry Water Usage",
            "description":       f"Laundry contributes {profile['laundry_pct']}% of usage. "
                                 f"Use full loads and consider a water-efficient washing machine.",
            "sensor":            "Laundry",
            "impact":            "Medium",
            "saving_estimate_L": round(profile["avg_daily_laundry"] * 0.12, 1),
            "priority":          3
        })

    # ── Rule 4: Kitchen high usage
    if profile["kitchen_pct"] > 25:
        recommendations.append({
            "title":             "Fix Kitchen Tap Drips",
            "description":       f"Kitchen usage is {profile['kitchen_pct']}% of total. "
                                 f"A dripping tap wastes up to 20L/day. Check and fix immediately.",
            "sensor":            "Kitchen",
            "impact":            "High",
            "saving_estimate_L": round(profile["avg_daily_kitchen"] * 0.20, 1),
            "priority":          1
        })

    # ── Rule 5: Garden high usage
    if profile["garden_pct"] > 15:
        recommendations.append({
            "title":             "Shift Garden Watering to Dawn",
            "description":       f"Garden uses {profile['garden_pct']}% of daily water. "
                                 f"Watering at 5-6 AM reduces evaporation and saves up to 30% garden usage.",
            "sensor":            "Garden",
            "impact":            "Medium",
            "saving_estimate_L": round(profile["avg_daily_garden"] * 0.25, 1),
            "priority":          2
        })

    # ── Rule 6: High overall usage
    if profile["avg_daily_total"] > 450:
        recommendations.append({
            "title":             "Overall Usage Above Average",
            "description":       f"Your household uses {profile['avg_daily_total']}L/day on average. "
                                 f"The national average for a 4-person household is ~400L/day.",
            "sensor":            "All Zones",
            "impact":            "High",
            "saving_estimate_L": round((profile["avg_daily_total"] - 400), 1),
            "priority":          1
        })

    # ── Rule 7: High night usage (possible overnight leak)
    if profile["avg_night_total"] > 5:
        recommendations.append({
            "title":             "Possible Overnight Leak Detected",
            "description":       f"Average night usage (12AM-5AM) is {profile['avg_night_total']}L. "
                                 f"Normal households use near 0L overnight. Check for running toilets.",
            "sensor":            "All Zones",
            "impact":            "High",
            "saving_estimate_L": round(profile["avg_night_total"] * 0.8, 1),
            "priority":          1
        })

    # ── Rule 8: Weekend spike
    if profile["weekend_avg"] > profile["weekday_avg"] * 1.3:
        diff = round(profile["weekend_avg"] - profile["weekday_avg"], 1)
        recommendations.append({
            "title":             "High Weekend Consumption",
            "description":       f"Weekend usage is {diff}L higher than weekdays. "
                                 f"Be mindful of garden watering and longer showers on weekends.",
            "sensor":            "All Zones",
            "impact":            "Low",
            "saving_estimate_L": round(diff * 0.3, 1),
            "priority":          3
        })

    # ── Default: Good habits (if no major rules triggered)
    if len(recommendations) == 0:
        recommendations.append({
            "title":             "Great Water Habits!",
            "description":       "Your household usage is within normal range. "
                                 "Keep monitoring daily to maintain these good habits.",
            "sensor":            "All Zones",
            "impact":            "Low",
            "saving_estimate_L": 0,
            "priority":          3
        })

    # Sort by priority then impact
    impact_order = {"High": 1, "Medium": 2, "Low": 3}
    recommendations.sort(key=lambda x: (x["priority"], impact_order[x["impact"]]))

    # Return top 3
    return recommendations[:3]

# ── Save Output ──────────────────────────────────────────────
def save_output(profile, recommendations):
    output = {
        "profile":         profile,
        "recommendations": recommendations,
        "generated_for":   "Single Household - 4 persons",
        "data_period":     "90 days (Jan-Mar 2024)"
    }
    path = os.path.join(MODELS_DIR, "recommendations.json")
    with open(path, "w") as f:
        json.dump(output, f, indent=2)
    print(f"Saved to saved_models/recommendations.json")
    return output

# ── Main ─────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 50)
    print("  FlowSense - Rule-Based Recommendation Engine")
    print("=" * 50)

    df, daily = load_daily_data()

    print("\nComputing household profile...")
    profile = compute_profile(df, daily)

    print("\nHousehold Profile:")
    print("-" * 40)
    print(f"  Avg daily total:      {profile['avg_daily_total']}L")
    print(f"  Master Bathroom:      {profile['bathroom1_pct']}% ({profile['avg_daily_bathroom1']}L)")
    print(f"  Common Bathroom:      {profile['bathroom2_pct']}% ({profile['avg_daily_bathroom2']}L)")
    print(f"  Laundry:              {profile['laundry_pct']}% ({profile['avg_daily_laundry']}L)")
    print(f"  Kitchen:              {profile['kitchen_pct']}% ({profile['avg_daily_kitchen']}L)")
    print(f"  Garden:               {profile['garden_pct']}% ({profile['avg_daily_garden']}L)")
    print(f"  Avg night usage:      {profile['avg_night_total']}L")
    print(f"  Weekday avg:          {profile['weekday_avg']}L")
    print(f"  Weekend avg:          {profile['weekend_avg']}L")
    print(f"  Peak day:             {profile['peak_day']} ({profile['peak_day_usage']}L)")
    print(f"  Highest bathroom:     {profile['highest_bathroom']}")

    print("\nGenerating recommendations...")
    recommendations = generate_recommendations(profile)

    print("\nTop 3 Recommendations:")
    print("-" * 40)
    for i, rec in enumerate(recommendations, 1):
        print(f"\n  {i}. {rec['title']}")
        print(f"     Sensor:   {rec['sensor']}")
        print(f"     Impact:   {rec['impact']}")
        print(f"     Saving:   ~{rec['saving_estimate_L']}L/day")
        print(f"     Tip:      {rec['description'][:80]}...")

    save_output(profile, recommendations)
    print("\nDone! OK")