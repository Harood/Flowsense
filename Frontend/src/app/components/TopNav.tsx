import { Bell } from "lucide-react";
import { Logo } from "./Logo";
import { NotificationPanel } from "./NotificationPanel";
import { useState, useEffect } from "react";
import { fetchAlerts } from "../services/api";

export function TopNav() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const alerts = await fetchAlerts();
        const activeAlerts = alerts.filter((a: any) => (a.status || "resolved") === "active");
        setHasUnread(activeAlerts.length > 0);
      } catch (error) {
        console.error("Failed to load alerts:", error);
      }
    };

    loadUnreadCount();

    const handleAlertsUpdated = () => {
      loadUnreadCount();
    };

    window.addEventListener('alertsUpdated', handleAlertsUpdated);
    return () => window.removeEventListener('alertsUpdated', handleAlertsUpdated);
  }, []);

  const handleViewDetails = (alert: any) => {
    window.dispatchEvent(new CustomEvent('openLeakAlert', { detail: alert }));
  };

  const handleResolved = (alertTitle: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-50';
    notification.textContent = `✓ ${alertTitle} marked as resolved`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <header className="h-[72px] bg-card border-b border-border flex items-center px-6 gap-6 relative">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Logo
          size="sm"
          showText={true}
          textColor="text-foreground"
          iconColor="text-[#0066CC]"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Bell
            className={`w-6 h-6 transition-colors ${
              showNotifications ? "text-[#0066CC]" : "text-[#6B7280]"
            }`}
          />
          {hasUnread && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF3B30] rounded-full animate-pulse" />
          )}
        </button>
      </div>

      {/* Notification Dropdown Panel */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowNotifications(false)}
          />
          <NotificationPanel
            onClose={() => setShowNotifications(false)}
            onViewDetails={handleViewDetails}
            onResolved={handleResolved}
          />
        </>
      )}
    </header>
  );
}