import { MainLayout } from "../components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { TrendingDown, Calendar, Lightbulb, ShowerHead, UtensilsCrossed, Sprout, Shirt } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { useState, useEffect } from "react";
import { fetchForecast } from "../services/api";

const sensors = [
  { key: "bathroom1_L", name: "Master Bathroom", color: "#3B82F6", icon: ShowerHead },
  { key: "bathroom2_L", name: "Common Bathroom", color: "#8B5CF6", icon: ShowerHead },
  { key: "laundry_L", name: "Laundry", color: "#EC4899", icon: Shirt },
  { key: "kitchen_L", name: "Kitchen", color: "#F59E0B", icon: UtensilsCrossed },
  { key: "garden_L", name: "Garden", color: "#10B981", icon: Sprout },
];

export function ForecastPage() {
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadForecast = async () => {
      try {
        setLoading(true);
        const data = await fetchForecast();
        setForecastData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load forecast');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadForecast();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8 flex items-center justify-center h-screen">
          <p className="text-lg text-muted-foreground">Loading forecast...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !forecastData) {
    return (
      <MainLayout>
        <div className="p-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <p className="text-red-600 font-semibold">Error loading forecast</p>
              <p className="text-sm text-red-500 mt-2">{error}</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const sevenDayData = (forecastData.next_7_days || []).map((d: any) => ({
    ...d,
    day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    total: d.total_L,
  }));

  const thirtyDayData = (forecastData.next_30_days || []).map((d: any) => ({
    ...d,
    day: d.date,
    total: d.total_L,
  }));

  const sevenDayTotal = sevenDayData.reduce((sum: number, d: any) => sum + (d.total_L || 0), 0);
  const sevenDayAvg = sevenDayTotal / (sevenDayData.length || 1);

  const thirtyDayTotal = thirtyDayData.reduce((sum: number, d: any) => sum + (d.total_L || 0), 0);
  const thirtyDayAvg = thirtyDayTotal / (thirtyDayData.length || 1);
  return (
    <MainLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Water Usage Forecast</h1>
            <p className="text-muted-foreground">AI-powered predictions based on your usage patterns</p>
          </div>
          <Badge className="bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white px-4 py-2">
            <Lightbulb className="w-4 h-4 mr-2" />
            AI Powered
          </Badge>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">7-Day Forecast</p>
              <p className="text-3xl font-bold mb-2">{Math.round(sevenDayTotal)}L</p>
              <div className="flex items-center gap-1 text-[#00C853] text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>Total for 7 days</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">30-Day Forecast</p>
              <p className="text-3xl font-bold mb-2">{Math.round(thirtyDayTotal)}L</p>
              <div className="flex items-center gap-1 text-[#00C853] text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>Total for 30 days</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Expected Daily Avg</p>
              <p className="text-3xl font-bold mb-2">{Math.round(thirtyDayAvg)}L</p>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" />
                <span>Next 30 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for 7-day and 30-day */}
        <Tabs defaultValue="7day" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="7day">7-Day Forecast</TabsTrigger>
            <TabsTrigger value="30day">30-Day Forecast</TabsTrigger>
          </TabsList>

          {/* 7-Day Forecast Tab */}
          <TabsContent value="7day" className="space-y-6">
            {/* Combined Total Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>Total Water Usage - Next 7 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={sevenDayData}>
                      <defs>
                        <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0066CC" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0066CC" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="day"
                        label={{ value: "Day", position: "insideBottom", offset: -5 }}
                      />
                      <YAxis
                        label={{ value: "Liters", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip />
                      <Area
                        key="7day-total-area"
                        type="monotone"
                        dataKey="total"
                        stroke="#0066CC"
                        strokeWidth={3}
                        fill="url(#totalGradient)"
                        name="Total Usage"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Per-Sensor Forecast */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Per-Sensor Forecast - Next 7 Days</CardTitle>
                  <div className="flex items-center gap-3 flex-wrap">
                    {sensors.map((sensor) => (
                      <div key={sensor.key} className="flex items-center gap-2">
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
                <div style={{ width: '100%', height: '400px' }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={sevenDayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="day"
                        label={{ value: "Day", position: "insideBottom", offset: -5 }}
                      />
                      <YAxis
                        label={{ value: "Liters", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip />
                      <Legend />
                      {sensors.map((sensor) => (
                        <Line
                          key={`7day-sensors-${sensor.key}`}
                          type="monotone"
                          dataKey={sensor.key}
                          stroke={sensor.color}
                          strokeWidth={2}
                          dot={{ fill: sensor.color, r: 4 }}
                          name={sensor.name}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 7-Day Insights */}
          </TabsContent>

          {/* 30-Day Forecast Tab */}
          <TabsContent value="30day" className="space-y-6">
            {/* Combined Total Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>Total Water Usage - Next 30 Days (Weekly Average)</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={thirtyDayData}>
                      <defs>
                        <linearGradient id="totalGradient30" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0066CC" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0066CC" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="week"
                        label={{ value: "Week", position: "insideBottom", offset: -5 }}
                      />
                      <YAxis
                        label={{ value: "Liters (Daily Avg)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip />
                      <Area
                        key="30day-total-area"
                        type="monotone"
                        dataKey="total"
                        stroke="#0066CC"
                        strokeWidth={3}
                        fill="url(#totalGradient30)"
                        name="Total Usage"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Per-Sensor Forecast */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Per-Sensor Forecast - Next 30 Days (Weekly Average)</CardTitle>
                  <div className="flex items-center gap-3 flex-wrap">
                    {sensors.map((sensor) => (
                      <div key={sensor.key} className="flex items-center gap-2">
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
                <div style={{ width: '100%', height: '400px' }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={thirtyDayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="week"
                        label={{ value: "Week", position: "insideBottom", offset: -5 }}
                      />
                      <YAxis
                        key="forecast-30day-sensors-yaxis"
                        label={{ value: "Liters (Daily Avg)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip />
                      <Legend />
                      {sensors.map((sensor) => (
                        <Line
                          key={`30day-sensors-${sensor.key}`}
                          type="monotone"
                          dataKey={sensor.key}
                          stroke={sensor.color}
                          strokeWidth={2}
                          dot={{ fill: sensor.color, r: 4 }}
                          name={sensor.name}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 30-Day Insights */}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
