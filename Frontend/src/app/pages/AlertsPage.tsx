import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import { Card, CardContent } from "../components/ui/card";
import {
  CheckCircle, AlertTriangle, ShowerHead, UtensilsCrossed, Sprout, Shirt
} from "lucide-react";
import { fetchAlerts } from "../services/api";

export function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await fetchAlerts();
      setAlerts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load alerts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();

    const handleAlertsUpdated = () => {
      loadAlerts();
    };

    window.addEventListener('alertsUpdated', handleAlertsUpdated);
    return () => window.removeEventListener('alertsUpdated', handleAlertsUpdated);
  }, []);

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

  const formatAlertData = (alert: any) => ({
    id: Math.random(),
    sensor: alert.detected_sensor,
    sensorIcon: getSensorIcon(alert.detected_sensor),
    sensorColor: getSensorColor(alert.detected_sensor),
    date: new Date(alert.datetime).toLocaleDateString(),
    time: new Date(alert.datetime).toLocaleTimeString(),
    usage: `${alert.total_L}L`,
    severity: (alert.severity === "HIGH" ? "HIGH" : "MEDIUM") as const,
    description: `Anomaly detected - Score: ${alert.anomaly_score.toFixed(2)}`,
    status: (alert.status || "resolved") as "active" | "resolved",
  });

  const activeCount = alerts.filter(a => (a.status || "resolved") === "active").length;
  const resolvedCount = alerts.filter(a => (a.status || "resolved") === "resolved").length;

  const filteredAlerts = filter === "all"
    ? alerts
    : filter === "active"
    ? alerts.filter(a => (a.status || "resolved") === "active")
    : alerts.filter(a => (a.status || "resolved") === "resolved");

  return (
    <MainLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Alerts</h1>
          <p className="text-muted-foreground mt-1">Monitor and track water usage anomalies</p>
        </div>

        {/* Alerts Summary */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-3xl font-bold text-red-600">{activeCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-3xl font-bold text-green-600">{resolvedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Alerts</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "all"
                    ? "bg-[#0066CC] text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                All ({alerts.length})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "active"
                    ? "bg-red-500 text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                onClick={() => setFilter("resolved")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "resolved"
                    ? "bg-green-500 text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Resolved ({resolvedCount})
              </button>
            </div>
          </div>
          {loading ? (
            <p className="text-muted-foreground">Loading alerts...</p>
          ) : error ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <p className="text-red-600 text-sm">{error}</p>
              </CardContent>
            </Card>
          ) : filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">No alerts found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const formattedAlert = formatAlertData(alert);
                const Icon = formattedAlert.sensorIcon;
                const severityConfig = {
                  HIGH: { bg: "bg-red-500", text: "text-red-600", borderColor: "border-red-200" },
                  MEDIUM: { bg: "bg-orange-500", text: "text-orange-600", borderColor: "border-orange-200" },
                };
                const severity = severityConfig[formattedAlert.severity];

                return (
                  <Card key={formattedAlert.id} className={`${severity.borderColor} hover:shadow-lg transition-all`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${formattedAlert.sensorColor}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: formattedAlert.sensorColor }} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold" style={{ color: formattedAlert.sensorColor }}>
                                  {formattedAlert.sensor}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${severity.bg}`}>
                                  {formattedAlert.severity}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  formattedAlert.status === "active"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                }`}>
                                  {formattedAlert.status === "active" ? "🔴 Active" : "✓ Resolved"}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {formattedAlert.date} at {formattedAlert.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold" style={{ color: formattedAlert.sensorColor }}>
                                {formattedAlert.usage}
                              </p>
                              <p className="text-xs text-muted-foreground">Water used</p>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed">{formattedAlert.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
