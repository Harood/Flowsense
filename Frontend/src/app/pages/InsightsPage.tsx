import { MainLayout } from "../components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { TrendingDown, TrendingUp, CheckCircle, ShowerHead, UtensilsCrossed, Sprout, Lightbulb, Shirt } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "../components/ui/badge";
import { useState, useEffect } from "react";
import { fetchDashboard, fetchRecommendations } from "../services/api";

const getSensorIcon = (sensorName: string) => {
  if (sensorName.includes("Bathroom")) return ShowerHead;
  if (sensorName.includes("Laundry")) return Shirt;
  if (sensorName.includes("Kitchen")) return UtensilsCrossed;
  if (sensorName.includes("Garden")) return Sprout;
  return ShowerHead;
};

const getSensorColor = (sensorName: string) => {
  if (sensorName.includes("Master")) return "#3B82F6";
  if (sensorName.includes("Common")) return "#8B5CF6";
  if (sensorName.includes("Laundry")) return "#EC4899";
  if (sensorName.includes("Kitchen")) return "#F59E0B";
  if (sensorName.includes("Garden")) return "#10B981";
  return "#6B7280";
};

export function InsightsPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("monthly");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Start with January 2026
  const minDate = new Date(2026, 0, 1); // January 2026
  const maxDate = new Date(2026, 2, 31); // March 2026

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [dashData, recsData] = await Promise.all([
          fetchDashboard(),
          fetchRecommendations(),
        ]);
        setDashboardData(dashData);
        setRecommendations(Array.isArray(recsData) ? recsData : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load insights');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDecimal = (value: number) => {
    return Math.round(value * 1000) / 1000;
  };

  const getMonthData = () => {
    const chartData = dashboardData?.chart_last30 || [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    return chartData.filter((d: any) => {
      const date = new Date(d.date);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  };

  const getMonthStats = () => {
    const monthData = getMonthData();
    if (monthData.length === 0) {
      return { total: 0, daily: 0, bill: 0 };
    }

    const totalL = monthData.reduce((sum: number, d: any) => sum + (d.Total || 0), 0);
    const dailyAvg = formatDecimal(totalL / monthData.length);
    const bill = Math.round(dailyAvg * 0.5 * 30);

    return {
      total: formatDecimal(totalL),
      daily: dailyAvg,
      bill: bill,
    };
  };

  const getChartData = () => {
    const monthData = getMonthData();

    if (timeframe === "daily") {
      const lastDay = monthData[monthData.length - 1];
      if (!lastDay) return [];

      const heatmapData = dashboardData?.heatmap || [];
      const dateObj = new Date(lastDay.date);
      const weekday = dateObj.getDay();
      const dayHeatmap = heatmapData.filter((h: any) => h.weekday === weekday);

      return dayHeatmap.map((h: any) => ({
        time: `${String(h.hour).padStart(2, '0')}:00`,
        Master: formatDecimal(h.avg_L * 0.31),
        Laundry: formatDecimal(h.avg_L * 0.22),
        Common: formatDecimal(h.avg_L * 0.23),
        Kitchen: formatDecimal(h.avg_L * 0.18),
        Garden: formatDecimal(h.avg_L * 0.06),
      }));
    } else if (timeframe === "weekly") {
      return monthData.map((d: any) => ({
        date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
        Master: formatDecimal((d["Master Bathroom"] || 0)),
        Laundry: formatDecimal(d["Laundry"] || 0),
        Common: formatDecimal((d["Common Bathroom"] || 0)),
        Kitchen: formatDecimal(d["Kitchen"] || 0),
        Garden: formatDecimal(d["Garden"] || 0),
      }));
    } else {
      return monthData.map((d: any) => ({
        date: new Date(d.date).toLocaleDateString('en-US', { day: 'numeric' }),
        Master: formatDecimal((d["Master Bathroom"] || 0)),
        Laundry: formatDecimal(d["Laundry"] || 0),
        Common: formatDecimal((d["Common Bathroom"] || 0)),
        Kitchen: formatDecimal(d["Kitchen"] || 0),
        Garden: formatDecimal(d["Garden"] || 0),
      }));
    }
  };

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    if (prevMonth >= minDate) {
      setCurrentDate(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    if (nextMonth <= maxDate) {
      setCurrentDate(nextMonth);
    }
  };

  const monthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8 flex items-center justify-center h-screen">
          <p className="text-lg text-muted-foreground">Loading insights...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <p className="text-red-600 font-semibold">Error loading insights</p>
              <p className="text-sm text-red-500 mt-2">{error}</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const getMonthPieData = () => {
    const monthData = getMonthData();
    if (monthData.length === 0) return [];

    const sensorTotals = {
      "Master Bathroom": 0,
      "Common Bathroom": 0,
      "Laundry": 0,
      "Kitchen": 0,
      "Garden": 0,
    };

    monthData.forEach((d: any) => {
      sensorTotals["Master Bathroom"] += d["Master Bathroom"] || 0;
      sensorTotals["Common Bathroom"] += d["Common Bathroom"] || 0;
      sensorTotals["Laundry"] += d["Laundry"] || 0;
      sensorTotals["Kitchen"] += d["Kitchen"] || 0;
      sensorTotals["Garden"] += d["Garden"] || 0;
    });

    const total = Object.values(sensorTotals).reduce((a: number, b: number) => a + b, 0) || 1;

    return [
      { name: "Master Bathroom", value: Math.round((sensorTotals["Master Bathroom"] / total) * 100 * 10) / 10, color: "#3B82F6" },
      { name: "Laundry", value: Math.round((sensorTotals["Laundry"] / total) * 100 * 10) / 10, color: "#EC4899" },
      { name: "Common Bathroom", value: Math.round((sensorTotals["Common Bathroom"] / total) * 100 * 10) / 10, color: "#8B5CF6" },
      { name: "Kitchen", value: Math.round((sensorTotals["Kitchen"] / total) * 100 * 10) / 10, color: "#F59E0B" },
      { name: "Garden", value: Math.round((sensorTotals["Garden"] / total) * 100 * 10) / 10, color: "#10B981" },
    ];
  };

  const getMonthHeatmapData = () => {
    const monthData = getMonthData();
    if (monthData.length === 0) return [];

    const heatmapByDay: any = {};

    monthData.forEach((d: any) => {
      const date = new Date(d.date);
      const weekday = date.getDay();

      if (!heatmapByDay[weekday]) {
        heatmapByDay[weekday] = {};
      }

      for (let hour = 0; hour < 24; hour++) {
        if (!heatmapByDay[weekday][hour]) {
          heatmapByDay[weekday][hour] = [];
        }
      }
    });

    const allHeatmapData = dashboardData?.heatmap || [];
    const monthFilteredHeatmap = allHeatmapData.filter((h: any) => {
      const monthDataDates = monthData.map((d: any) => new Date(d.date).getDay());
      return monthDataDates.includes(h.weekday);
    });

    return monthFilteredHeatmap;
  };

  const sensorCards = dashboardData?.sensor_cards || [];
  const pieData = getMonthPieData();

  const chartData = dashboardData?.chart_last30 || [];
  const monthlyData = chartData.map((d: any) => ({
    day: d.date ? new Date(d.date).getDate() : 0,
    bathroom: ((d["Master Bathroom"] || 0) + (d["Common Bathroom"] || 0)) / 2,
    laundry: d["Laundry"] || 0,
    kitchen: d["Kitchen"] || 0,
    garden: d["Garden"] || 0,
  }));

  return (
    <MainLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Insights & Analytics</h1>
            <div className="flex items-center gap-3 text-muted-foreground">
              <button
                onClick={handlePreviousMonth}
                disabled={currentDate <= minDate}
                className="hover:text-foreground text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                ‹
              </button>
              <span className="w-40 text-center">{monthLabel}</span>
              <button
                onClick={handleNextMonth}
                disabled={currentDate >= maxDate}
                className="hover:text-foreground text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Usage</p>
              <p className="text-3xl font-bold mb-2">{getMonthStats().total}L</p>
              <div className="flex items-center gap-1 text-[#00C853] text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>This month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Average Daily</p>
              <p className="text-3xl font-bold mb-2">{getMonthStats().daily}L</p>
              <div className="flex items-center gap-1 text-[#00C853] text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>Per day</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Active Sensors</p>
              <p className="text-3xl font-bold mb-2">{dashboardData?.active_sensors || 0}/5</p>
              <div className="flex items-center gap-1 text-[#00C853] text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Operational</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Estimated Bill</p>
              <p className="text-3xl font-bold mb-2">Rs{getMonthStats().bill}</p>
              <div className="flex items-center gap-1 text-[#00C853] text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Usage Trends</CardTitle>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeframe("daily")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    timeframe === "daily"
                      ? "bg-[#0066CC] text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTimeframe("weekly")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    timeframe === "weekly"
                      ? "bg-[#0066CC] text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeframe("monthly")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    timeframe === "monthly"
                      ? "bg-[#0066CC] text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: '350px' }}>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey={timeframe === "daily" ? "time" : "date"}
                    label={{
                      value: timeframe === "daily" ? "Hour of Day" : "Day",
                      position: "insideBottom",
                      offset: -5
                    }}
                  />
                  <YAxis label={{ value: "Liters", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value: any) => formatDecimal(value).toFixed(2)} />
                  <Line
                    type="monotone"
                    dataKey="Master"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Master Bathroom"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Laundry"
                    stroke="#EC4899"
                    strokeWidth={2}
                    name="Laundry"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Common"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    name="Common Bathroom"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Kitchen"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    name="Kitchen"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Garden"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Garden"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-5 gap-6">
          {/* Peak Usage Times - 3/5 width */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Peak Usage Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getMonthHeatmapData().reduce((acc: any[], item: any) => {
                  const day = item.weekday;
                  if (!acc[day]) acc[day] = [];
                  acc[day].push(item);
                  return acc;
                }, []).map((dayData: any, dayIndex: number) => {
                  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                  const maxIntensity = Math.max(...dayData.map((d: any) => d.avg_L), 1);
                  return (
                    <div key={dayIndex} className="flex items-center gap-4">
                      <span className="w-12 text-sm font-medium">{dayLabels[dayIndex]}</span>
                      <div className="flex-1 flex gap-1.5">
                        {dayData.map((hourData: any, hourIndex: number) => {
                          const intensity = hourData.avg_L / maxIntensity;
                          const opacity = 0.3 + intensity * 0.7;
                          return (
                            <div
                              key={`${dayIndex}-${hourIndex}`}
                              className="flex-1 h-6 rounded transition-all hover:ring-2 hover:ring-offset-1 hover:ring-[#0066CC]"
                              style={{
                                backgroundColor: `rgba(0, 102, 204, ${opacity})`,
                              }}
                              title={`${hourData.hour}:00 - ${formatDecimal(hourData.avg_L).toFixed(3)}L`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span>12 AM</span>
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>11 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Distribution - 2/5 width */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '250px' }}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      key="insights-usage-pie"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`insights-pie-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations - Sensor Specific */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.length === 0 ? (
              <p className="text-muted-foreground text-sm">No recommendations available</p>
            ) : (
              recommendations.map((rec, idx) => {
                const sensorName = rec.sensor || "All Zones";
                const Icon = getSensorIcon(sensorName);
                const color = getSensorColor(sensorName);

                return (
                  <Card key={idx} className="border-2 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Sensor Icon */}
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">
                              {sensorName}
                            </p>
                            <h4 className="text-lg font-bold mb-2">{rec.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge className="bg-green-600 text-white text-xs">
                              Save {formatDecimal(rec.saving_estimate_L).toFixed(3)}L/day
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {rec.impact} Impact
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}