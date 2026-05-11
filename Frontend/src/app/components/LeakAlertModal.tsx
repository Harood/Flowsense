import * as React from "react";
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { fetchAlerts, updateAlertStatus } from "../services/api";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface LeakAlertModalProps {
  open: boolean;
  onClose: () => void;
  onAlertUpdated?: () => void;
  selectedAlert?: any;
}

export function LeakAlertModal({ open, onClose, onAlertUpdated, selectedAlert }: LeakAlertModalProps) {
  const [latestAlert, setLatestAlert] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const displayAlert = selectedAlert || latestAlert;

  const loadNextAlert = async () => {
    if (selectedAlert) return;
    try {
      setLoading(true);
      const alerts = await fetchAlerts();
      const activeAlerts = alerts.filter((a: any) => (a.status || "resolved") === "active");
      if (activeAlerts.length > 0) {
        setLatestAlert(activeAlerts[0]);
      } else {
        setLatestAlert(null);
      }
    } catch (error) {
      console.error('Failed to load alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadNextAlert();
    }
  }, [open]);

  const handleResolve = async () => {
    if (!displayAlert) return;
    try {
      await updateAlertStatus(displayAlert.datetime, "resolved");
      onAlertUpdated?.();

      // Show resolved notification
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-50';
      notification.textContent = `✓ ${displayAlert.detected_sensor} - Alert marked as resolved`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

      await loadNextAlert();
    } catch (error) {
      console.error('Failed to resolve alert:', error);
      alert('Error updating alert: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleRemindLater = async () => {
    if (!displayAlert) return;
    try {
      await updateAlertStatus(displayAlert.datetime, "resolved");
      onAlertUpdated?.();

      // Show notification
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-50';
      notification.textContent = `✓ ${displayAlert.detected_sensor} - Alert dismissed`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

      await loadNextAlert();
    } catch (error) {
      console.error('Failed to dismiss alert:', error);
    }
  };

  const handleDismiss = () => {
    onClose();
  };

  if (!displayAlert) {
    return null;
  }

  const detectedDate = new Date(displayAlert.datetime);
  const dateStr = detectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const timeStr = detectedDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  const volumeWasted = Math.round(displayAlert.total_L);
  const estimatedCost = Math.round(volumeWasted * 0.5);
  const dailyWaste = volumeWasted;
  const monthlyWaste = Math.round(volumeWasted * 30);
  const monthlyExtraCost = Math.round(monthlyWaste * 0.5);
  const flowRate = displayAlert.total_L / 3;

  const leakData = [
    { time: `${displayAlert.hour - 3} AM`, flow: 0 },
    { time: `${displayAlert.hour - 2} AM`, flow: 0 },
    { time: `${displayAlert.hour - 1} AM`, flow: 0 },
    { time: `${displayAlert.hour} AM`, flow: flowRate },
    { time: `${displayAlert.hour + 1} AM`, flow: flowRate },
    { time: `${displayAlert.hour + 2} AM`, flow: flowRate },
    { time: `${displayAlert.hour + 3} AM`, flow: 0 },
  ];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-full max-h-[95vh] overflow-y-auto p-8" style={{ maxWidth: '92vw' }}>
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <DialogTitle className="text-3xl text-red-600">Leak Alert Detected</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground mt-1">
                Immediate attention required
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Grid with bigger columns */}
          <div className="grid grid-cols-12 gap-8">
            {/* Alert Details - 3 cols */}
            <Card className="col-span-3">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Alert Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Detected At</p>
                  <p className="text-base font-semibold mt-2">{timeStr}, {dateStr}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Location</p>
                  <p className="text-base font-semibold mt-2">{displayAlert.detected_sensor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Duration</p>
                  <p className="text-base font-semibold mt-2">3 hours</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Flow Rate</p>
                  <p className="text-base font-semibold mt-2">{flowRate.toFixed(1)} L/min</p>
                </div>
                <div className="pt-4 border-t mt-4">
                  <p className="text-sm text-muted-foreground font-medium">Volume Wasted</p>
                  <p className="text-4xl font-bold text-red-600 mt-3">{volumeWasted}L</p>
                </div>
                <div className="pt-3">
                  <p className="text-sm text-muted-foreground font-medium">Estimated Cost</p>
                  <p className="text-2xl font-bold mt-2">₨{estimatedCost}</p>
                </div>
              </CardContent>
            </Card>

            {/* Flow Pattern - 5 cols */}
            <Card className="col-span-5">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Flow Pattern</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div style={{ width: '100%', height: '320px' }}>
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={leakData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{ fontSize: 13 }} />
                      <YAxis tick={{ fontSize: 13 }} label={{ value: "L/min", angle: -90, position: "insideLeft", style: { fontSize: 13 } }} />
                      <Tooltip />
                      <Area
                        key="leak-flow-area"
                        type="monotone"
                        dataKey="flow"
                        stroke="#FF3B30"
                        fill="#FF3B30"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Impact Assessment - 4 cols */}
            <Card className="col-span-4 bg-red-50 border-red-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-red-800">⚠️ Impact Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="text-center py-5 bg-white rounded-lg border border-red-100">
                  <p className="text-5xl font-bold text-red-600">{dailyWaste}L</p>
                  <p className="text-sm text-muted-foreground font-medium mt-3">daily waste</p>
                </div>
                <div className="text-center py-5 bg-white rounded-lg border border-red-100">
                  <p className="text-5xl font-bold text-red-600">{monthlyWaste.toLocaleString()}L</p>
                  <p className="text-sm text-muted-foreground font-medium mt-3">monthly waste</p>
                </div>
                <div className="text-center py-5 bg-white rounded-lg border border-red-100">
                  <p className="text-5xl font-bold text-red-600">₨{monthlyExtraCost.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground font-medium mt-3">extra cost</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button
              onClick={handleResolve}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold"
            >
              {loading ? "Updating..." : "Mark as Resolved"}
            </Button>
            <Button
              onClick={handleRemindLater}
              disabled={loading}
              variant="outline"
              className="flex-1 h-12 text-lg font-semibold"
            >
              Remind Me Later
            </Button>
            <Button
              onClick={handleDismiss}
              disabled={loading}
              variant="ghost"
              className="h-12 text-lg font-semibold"
            >
              Dismiss
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
