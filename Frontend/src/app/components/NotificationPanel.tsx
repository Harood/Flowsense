import { useState, useEffect } from "react";
import { AlertTriangle, Trophy, BarChart3, Info, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { fetchAlerts } from "../services/api";

interface Notification {
  id: string;
  type: "leak" | "resolved" | "goal" | "summary" | "update";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  actionLabel?: string;
  onAction?: () => void;
  alertData?: any;
}

interface NotificationPanelProps {
  onClose: () => void;
  onViewDetails?: (alert: any) => void;
  onResolved?: (alertTitle: string) => void;
}

export function NotificationPanel({ onClose, onViewDetails, onResolved }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "alerts">("all");

  const loadAlerts = async () => {
    try {
      const alerts = await fetchAlerts();
      const activeAlerts = alerts.filter((a: any) => (a.status || "resolved") === "active");

      const newNotifications: Notification[] = activeAlerts.map((alert: any) => {
        const detectedDate = new Date(alert.datetime);
        const now = new Date();
        const diffMs = now.getTime() - detectedDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        let timeStr = "";
        if (diffMins < 60) {
          timeStr = `${diffMins} min ago`;
        } else if (diffHours < 24) {
          timeStr = `${diffHours}h ago`;
        } else {
          timeStr = `${diffDays}d ago`;
        }

        return {
          id: alert.datetime,
          type: "leak",
          title: `⚠️ Leak Detected - ${alert.detected_sensor}`,
          description: `${alert.total_L}L water usage detected - Anomaly score: ${alert.anomaly_score.toFixed(2)}`,
          time: timeStr,
          isRead: false,
          actionLabel: "View Details",
          alertData: alert,
        };
      });

      setNotifications(newNotifications);
    } catch (error) {
      console.error("Failed to load alerts:", error);
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

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "alerts":
        return notifications.filter((n) => n.type === "leak");
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const alertCount = notifications.filter((n) => n.type === "leak").length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const getNotificationStyles = (type: Notification["type"]) => {
    switch (type) {
      case "leak":
        return {
          bg: "bg-red-50",
          border: "border-l-4 border-l-[#FF3B30]",
          icon: <AlertTriangle className="w-8 h-8 text-[#FF3B30]" />,
          titleColor: "text-[#991B1B]",
        };
      case "resolved":
        return {
          bg: "bg-green-50",
          border: "border-l-4 border-l-[#00C853]",
          icon: <CheckCircle className="w-8 h-8 text-[#00C853]" />,
          titleColor: "text-[#065F46]",
        };
      case "goal":
        return {
          bg: "bg-green-50",
          border: "border-l-4 border-l-[#00C853]",
          icon: <Trophy className="w-8 h-8 text-[#00C853]" />,
          titleColor: "text-[#065F46]",
        };
      case "summary":
        return {
          bg: "bg-blue-50",
          border: "border-l-4 border-l-[#0066CC]",
          icon: <BarChart3 className="w-8 h-8 text-[#0066CC]" />,
          titleColor: "text-[#1E3A8A]",
        };
      case "update":
        return {
          bg: "bg-gray-50",
          border: "border-l-4 border-l-[#6B7280]",
          icon: <Info className="w-8 h-8 text-[#6B7280]" />,
          titleColor: "text-[#1F2937]",
        };
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="fixed top-[72px] right-6 w-[380px] max-h-[600px] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-[#E5E7EB] z-50">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1F2937]">Notifications</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#0066CC] hover:underline"
            >
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`text-sm pb-2 transition-all ${
              activeTab === "all"
                ? "border-b-3 border-[#0066CC] font-bold text-[#0066CC]"
                : "text-[#6B7280]"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`text-sm pb-2 transition-all ${
              activeTab === "unread"
                ? "border-b-3 border-[#0066CC] font-bold text-[#0066CC]"
                : "text-[#6B7280]"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`text-sm pb-2 transition-all ${
              activeTab === "alerts"
                ? "border-b-3 border-[#0066CC] font-bold text-[#0066CC]"
                : "text-[#6B7280]"
            }`}
          >
            Alerts ({alertCount})
          </button>
        </div>
      </div>

      {/* Notification List */}
      <ScrollArea className="h-[400px]">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-bold text-[#1F2937] mb-2">
              No new notifications
            </h4>
            <p className="text-sm text-[#6B7280]">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {filteredNotifications.map((notification) => {
              const styles = getNotificationStyles(notification.type);
              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                    notification.isRead ? "bg-[#F9FAFB]" : "bg-white"
                  } ${styles.border} ${styles.bg}`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0">{styles.icon}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                          className={`text-base font-bold ${styles.titleColor}`}
                        >
                          {notification.title}
                        </h4>
                        <span className="text-xs text-[#6B7280] flex-shrink-0">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B7280] mb-2">
                        {notification.description}
                      </p>

                      {/* Action Button */}
                      {notification.actionLabel && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 border-[#0066CC] text-[#0066CC] hover:bg-[#E3F2FD]"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (notification.alertData) {
                              onViewDetails?.(notification.alertData);
                            }
                          }}
                        >
                          {notification.actionLabel}
                        </Button>
                      )}

                      {/* Unread Indicator */}
                      {!notification.isRead && (
                        <div className="absolute top-4 left-1 w-2 h-2 bg-[#0066CC] rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-[#E5E7EB] text-center">
        <button className="text-sm text-[#0066CC] font-medium hover:underline">
          View All Notifications
        </button>
      </div>
    </div>
  );
}
