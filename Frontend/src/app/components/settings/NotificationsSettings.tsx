import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

export function NotificationsSettings() {
  const [pushNotifications, setPushNotifications] = useState({
    leakAlerts: true,
    dailySummary: true,
    goalUpdates: true,
    aiInsights: false,
    weatherAlerts: true,
  });

  const [emailNotifications, setEmailNotifications] = useState({
    weeklyReports: true,
    monthlySummary: true,
    goalAchievements: true,
    productUpdates: false,
    tips: false,
    marketing: false,
  });

  const [quietHours, setQuietHours] = useState(true);
  const [startTime, setStartTime] = useState("22:00");
  const [endTime, setEndTime] = useState("07:00");
  const [applyAllDays, setApplyAllDays] = useState(true);
  const [selectedDays, setSelectedDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notification Preferences</h1>
        <p className="text-muted-foreground">
          Choose what updates you want to receive
        </p>
      </div>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Leak Alerts - Cannot be disabled */}
          <div className="flex items-start gap-4 p-4 border border-border rounded-lg bg-red-50/30">
            <div className="text-2xl">🚨</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <Label className="font-semibold">Leak Alerts</Label>
                <Switch checked={true} disabled />
              </div>
              <p className="text-sm text-muted-foreground">Immediate notification when leak detected</p>
              <p className="text-xs text-red-600 mt-1 font-medium">Cannot be disabled (critical alert)</p>
            </div>
          </div>

          {/* Daily Summary */}
          <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
            <div className="text-2xl">📊</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <Label className="font-semibold cursor-pointer" htmlFor="daily-summary">Daily Summary</Label>
                <Switch
                  id="daily-summary"
                  checked={pushNotifications.dailySummary}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, dailySummary: checked })
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">Daily usage report at 9:00 PM</p>
            </div>
          </div>

          {/* Goal Updates */}
          <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
            <div className="text-2xl">🎯</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <Label className="font-semibold cursor-pointer" htmlFor="goal-updates">Goal Updates</Label>
                <Switch
                  id="goal-updates"
                  checked={pushNotifications.goalUpdates}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, goalUpdates: checked })
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">Progress notifications and milestones</p>
            </div>
          </div>

          {/* AI Insights */}
          <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <Label className="font-semibold cursor-pointer" htmlFor="ai-insights">AI Insights</Label>
                <Switch
                  id="ai-insights"
                  checked={pushNotifications.aiInsights}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, aiInsights: checked })
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">Smart recommendations and tips</p>
            </div>
          </div>

          {/* Weather Alerts */}
          <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
            <div className="text-2xl">🌧️</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <Label className="font-semibold cursor-pointer" htmlFor="weather-alerts">Weather Alerts</Label>
                <Switch
                  id="weather-alerts"
                  checked={pushNotifications.weatherAlerts}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, weatherAlerts: checked })
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">Rain forecasts and watering suggestions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Email Notifications</CardTitle>
          <p className="text-sm text-muted-foreground">Sent to: sarah.ahmed@email.com</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Checkbox
                id="weekly-reports"
                checked={emailNotifications.weeklyReports}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, weeklyReports: checked as boolean })
                }
              />
              <Label htmlFor="weekly-reports" className="cursor-pointer">
                Weekly usage reports (Sundays at 8:00 AM)
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Checkbox
                id="monthly-summary"
                checked={emailNotifications.monthlySummary}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, monthlySummary: checked as boolean })
                }
              />
              <Label htmlFor="monthly-summary" className="cursor-pointer">
                Monthly summary (1st of each month)
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Checkbox
                id="goal-achievements"
                checked={emailNotifications.goalAchievements}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, goalAchievements: checked as boolean })
                }
              />
              <Label htmlFor="goal-achievements" className="cursor-pointer">
                Goal achievements
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Checkbox
                id="product-updates"
                checked={emailNotifications.productUpdates}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, productUpdates: checked as boolean })
                }
              />
              <Label htmlFor="product-updates" className="cursor-pointer">
                Product updates and news
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Checkbox
                id="tips"
                checked={emailNotifications.tips}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, tips: checked as boolean })
                }
              />
              <Label htmlFor="tips" className="cursor-pointer">
                Water-saving tips and blog posts
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Checkbox
                id="marketing"
                checked={emailNotifications.marketing}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, marketing: checked as boolean })
                }
              />
              <Label htmlFor="marketing" className="cursor-pointer">
                Marketing emails
              </Label>
            </div>
          </div>

          <button className="text-sm text-red-600 hover:text-red-700 hover:underline pt-2">
            Unsubscribe from all emails
          </button>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Quiet Hours</CardTitle>
              <p className="text-sm text-muted-foreground">Pause non-critical notifications during these times</p>
            </div>
            <Switch
              checked={quietHours}
              onCheckedChange={setQuietHours}
            />
          </div>
        </CardHeader>
        {quietHours && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start time</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0");
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>End time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0");
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <Checkbox
                id="apply-all-days"
                checked={applyAllDays}
                onCheckedChange={(checked) => setApplyAllDays(checked as boolean)}
              />
              <Label htmlFor="apply-all-days" className="cursor-pointer">
                Apply to all days
              </Label>
            </div>

            {!applyAllDays && (
              <div className="space-y-2">
                <Label>Select specific days</Label>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                    const key = day.toLowerCase() as keyof typeof selectedDays;
                    return (
                      <button
                        key={day}
                        onClick={() =>
                          setSelectedDays({ ...selectedDays, [key]: !selectedDays[key] })
                        }
                        className={`px-3 py-2 rounded-lg border transition-colors ${
                          selectedDays[key]
                            ? "bg-[#0066CC] text-white border-[#0066CC]"
                            : "bg-white border-gray-300 hover:border-[#0066CC]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-sm text-muted-foreground flex items-start gap-2 bg-yellow-50 p-3 rounded-lg">
              <span className="text-yellow-600">ℹ️</span>
              <span>Leak alerts will still come through during quiet hours</span>
            </p>
          </CardContent>
        )}
      </Card>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-[#0066CC] hover:bg-[#0055AA]">Save Changes</Button>
      </div>
    </div>
  );
}
