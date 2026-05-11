import { MainLayout } from "../components/MainLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LeakAlertModal } from "../components/LeakAlertModal";
import { Sparkles, AlertTriangle, ShowerHead, UtensilsCrossed, Sprout, Shirt } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "../components/ui/badge";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { fetchDashboard } from "../services/api";

const sensorIconMap: Record<string, any> = {
  "Master Bathroom": ShowerHead,
  "Common Bathroom": ShowerHead,
  "Laundry": Shirt,
  "Kitchen": UtensilsCrossed,
  "Garden": Sprout,
};

export function DashboardPage() {
  const navigate = useNavigate();
  const [showLeakAlert, setShowLeakAlert] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboard();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    const handleOpenLeakAlert = (event: any) => {
      setSelectedAlert(event.detail);
      setShowLeakAlert(true);
    };

    window.addEventListener('openLeakAlert', handleOpenLeakAlert);
    return () => window.removeEventListener('openLeakAlert', handleOpenLeakAlert);
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8 flex items-center justify-center h-screen">
          <p className="text-lg text-muted-foreground">Loading dashboard...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !dashboardData) {
    return (
      <MainLayout>
        <div className="p-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <p className="text-red-600 font-semibold">Error loading dashboard</p>
              <p className="text-sm text-red-500 mt-2">{error}</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const sensorCards = dashboardData.sensor_cards || [];
  const chartData = dashboardData.chart_last30 || [];
  const hourlyData = dashboardData.hourly_data || [];
  const todayDate = dashboardData.today_date || new Date().toISOString().split('T')[0];

  const lastDateObj = new Date(todayDate);
  const dayName = lastDateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = `${dayName}, ${lastDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

  const weeklyData = chartData.slice(-7).map((day: any) => {
    const mapped: Record<string, any> = { date: day.date };
    sensorCards.forEach((sensor: any) => {
      mapped[sensor.name] = day[sensor.name] || 0;
    });
    return mapped;
  });

  const mappedSensors = sensorCards.map((card: any, index: number) => ({
    ...card,
    id: index + 1,
    icon: sensorIconMap[card.name] || ShowerHead,
    todayUsage: card.today_L,
    percentOfTotal: card.pct_of_total,
    status: card.status || "normal",
  }));

  return (
    <MainLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>

        {/* Hero Stats Card */}
        <Card className="bg-gradient-to-br from-[#0066CC] to-[#00D4FF] text-white border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-4 gap-8">
              <div>
                <p className="text-white/80 text-sm mb-1">Today's Total Usage</p>
                <p className="text-5xl font-bold">{dashboardData.today_total_L}L</p>
                <p className="text-sm text-white/80 mt-2">Current consumption</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Active Sensors</p>
                <p className="text-4xl font-bold">{dashboardData.active_sensors}/5</p>
                <p className="text-sm text-green-300 mt-1">All operational</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">This Month</p>
                <p className="text-4xl font-bold">{dashboardData.month_total_L}L</p>
                <p className="text-sm text-white/80 mt-1">Daily avg: {dashboardData.daily_avg_L}L</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Estimated Bill</p>
                <p className="text-4xl font-bold">Rs{dashboardData.est_bill_rs}</p>
                <p className="text-sm text-white/80 mt-1">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Sensor Cards - 5 Sensors */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Sensor Overview</h2>
          <div className="grid grid-cols-5 gap-4">
            {mappedSensors.map((sensor) => {
              const Icon = sensor.icon;
              const statusConfig = {
                normal: { color: "bg-green-500", text: "Normal" },
                warning: { color: "bg-yellow-500", text: "Warning" },
                leak: { color: "bg-red-500", text: "Leak Detected" }
              };
              const status = statusConfig[sensor.status];

              return (
                <Card key={sensor.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${sensor.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: sensor.color }} />
                      </div>
                      <div className={`w-2 h-2 rounded-full ${status.color}`} title={status.text} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{sensor.name}</p>
                    <p className="text-2xl font-bold mb-1" style={{ color: sensor.color }}>
                      {sensor.todayUsage}L
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">{sensor.percentOfTotal}% of total</p>
                    <div style={{ width: '100%', height: '32px' }}>
                      <ResponsiveContainer width="100%" height={32}>
                        <LineChart data={weeklyData}>
                          <Line
                            type="monotone"
                            dataKey={sensor.name}
                            stroke={sensor.color}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Hourly Breakdown for Current Day */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Breakdown - {formattedDate}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Hour</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#3B82F6]">Master</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#EC4899]">Laundry</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#8B5CF6]">Common</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#F59E0B]">Kitchen</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#10B981]">Garden</th>
                    <th className="px-4 py-2 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {hourlyData.map((row: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                      <td className="px-4 py-2">{row.time}</td>
                      <td className="px-4 py-2 text-right">{row["Master Bathroom"]}L</td>
                      <td className="px-4 py-2 text-right">{row["Laundry"]}L</td>
                      <td className="px-4 py-2 text-right">{row["Common Bathroom"]}L</td>
                      <td className="px-4 py-2 text-right">{row["Kitchen"]}L</td>
                      <td className="px-4 py-2 text-right">{row["Garden"]}L</td>
                      <td className="px-4 py-2 text-right font-semibold">{row.Total}L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* All Sensors Chart - 2/3 width */}
          <Card className="col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Sensors - Last 7 Days</CardTitle>
                <div className="flex items-center gap-3 flex-wrap">
                  {mappedSensors.map((sensor) => (
                    <div key={sensor.id} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: sensor.color }}
                      />
                      <span className="text-xs">{sensor.name.replace(' Bathroom', '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: "Liters", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    {mappedSensors.map((sensor) => (
                      <Line
                        key={`line-${sensor.name}`}
                        type="monotone"
                        dataKey={sensor.name}
                        stroke={sensor.color}
                        strokeWidth={2}
                        dot={{ fill: sensor.color, r: 3 }}
                        name={sensor.name}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights - 1/3 width */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-3">
                  <div className="text-2xl">💡</div>
                  <div className="flex-1">
                    <p className="text-sm mb-2">Your showers average 12 mins vs 8 min household avg</p>
                    <Badge className="bg-[#00C853] text-white text-xs">Save ₨450/month</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-3">
                  <div className="text-2xl">🌧️</div>
                  <div className="flex-1">
                    <p className="text-sm mb-2">Rain forecast tomorrow - skip garden watering</p>
                    <Badge className="bg-[#0066CC] text-white text-xs">Save 120L</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-3">
                  <div className="text-2xl">⚠️</div>
                  <div className="flex-1">
                    <p className="text-sm mb-2">Slight increase in night usage detected</p>
                    <Badge className="bg-[#FFC107] text-white text-xs">Check for leaks</Badge>
                  </div>
                </div>
              </div>

              <Button variant="link" className="w-full" onClick={() => navigate("/insights")}>
                View All Insights →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Alert Banner */}
        <Card className="bg-gradient-to-r from-[#FF3B30] to-[#FF6B58] text-white border-0">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-6 h-6" />
              <div>
                <p className="font-semibold">Possible Leak Detected!</p>
                <p className="text-sm text-white/90">Continuous 3L/min flow from 3:00-6:00 AM • Bathroom Sensor</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={() => setShowLeakAlert(true)}>
                View Details
              </Button>
              <button className="p-1 hover:bg-white/10 rounded">×</button>
            </div>
          </CardContent>
        </Card>

        {/* Leak Alert Modal */}
        <LeakAlertModal
          open={showLeakAlert}
          selectedAlert={selectedAlert}
          onClose={() => {
            setShowLeakAlert(false);
            setSelectedAlert(null);
          }}
          onAlertUpdated={() => {
            window.dispatchEvent(new Event('alertsUpdated'));
          }}
        />
      </div>
    </MainLayout>
  );
}