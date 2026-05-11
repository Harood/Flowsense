import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Check, X, Eye, EyeOff, Shield, Laptop, Smartphone } from "lucide-react";
import { Badge } from "../ui/badge";

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    if (strength <= 33) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 66) return { strength, label: "Medium", color: "bg-yellow-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const requirements = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(newPassword) },
    { label: "Contains number", met: /[0-9]/.test(newPassword) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Security</h1>
        <p className="text-muted-foreground">
          Manage your account security and authentication
        </p>
      </div>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password Strength Meter */}
            {newPassword && (
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{passwordStrength.label}</span>
                </div>
                
                {/* Requirements List */}
                <div className="space-y-1">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {req.met ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={req.met ? "text-green-700" : "text-gray-500"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {confirmPassword && newPassword === confirmPassword && (
                <Check className="w-5 h-5 text-green-600 absolute right-10 top-1/2 -translate-y-1/2" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              disabled={!newPassword || newPassword !== confirmPassword || passwordStrength.strength < 75}
              className="bg-[#0066CC] hover:bg-[#0055AA]"
            >
              Update Password
            </Button>
            <span className="text-sm text-muted-foreground">Last changed: Jan 15, 2026</span>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Two-Factor Authentication (2FA)</CardTitle>
            <Badge variant={twoFactorEnabled ? "default" : "secondary"} className={twoFactorEnabled ? "bg-green-500" : ""}>
              {twoFactorEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account by requiring a verification code in addition to your password.
          </p>

          {twoFactorEnabled ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Your account is protected with 2FA</span>
              </div>
              <p className="text-sm text-muted-foreground">Backup codes: 8 remaining</p>
              <div className="flex gap-3">
                <Button variant="outline">View Backup Codes</Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setTwoFactorEnabled(false)}
                >
                  Disable 2FA
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="border-[#0066CC] text-[#0066CC] hover:bg-blue-50"
              onClick={() => setTwoFactorEnabled(true)}
            >
              Enable 2FA
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Active Sessions</CardTitle>
          <p className="text-sm text-muted-foreground">Manage devices where you're currently logged in</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Current Session */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3 flex-1">
                <Laptop className="w-6 h-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Chrome on Windows</h4>
                    <Badge variant="secondary" className="text-xs">Current</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Karachi, Pakistan</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: Just now • IP: 192.168.1.1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Session */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3 flex-1">
                <Smartphone className="w-6 h-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold">Safari on iPhone</h4>
                  <p className="text-sm text-muted-foreground">Karachi, Pakistan</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: 2 hours ago • IP: 192.168.1.45</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Sign Out
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50"
          >
            Sign Out All Other Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Login Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-semibold">Date & Time</th>
                  <th className="text-left py-3 font-semibold">Device</th>
                  <th className="text-left py-3 font-semibold">Location</th>
                  <th className="text-left py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Mar 2, 2026 9:34 AM", device: "Chrome/Win", location: "Karachi, PK", status: "Success" },
                  { date: "Mar 1, 2026 8:15 PM", device: "iPhone", location: "Karachi, PK", status: "Success" },
                  { date: "Feb 29, 2026 10:22 AM", device: "Chrome/Win", location: "Karachi, PK", status: "Success" },
                ].map((login, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3">{login.date}</td>
                    <td className="py-3">{login.device}</td>
                    <td className="py-3">{login.location}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span>{login.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-[#0066CC] hover:bg-[#0055AA]">Save Changes</Button>
      </div>
    </div>
  );
}
