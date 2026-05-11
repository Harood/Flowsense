import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

export function GoalsAlertsSettings() {
  const [defaultDuration, setDefaultDuration] = useState("30");
  const [autoCreate, setAutoCreate] = useState(false);
  const [difficulty, setDifficulty] = useState("moderate");
  const [highUsageThreshold, setHighUsageThreshold] = useState(450);
  const [leakSensitivity, setLeakSensitivity] = useState("medium");
  const [unusualPattern, setUnusualPattern] = useState(true);
  const [costAlertThreshold, setCostAlertThreshold] = useState(4000);
  const [progressFrequency, setProgressFrequency] = useState("daily");
  const [milestones, setMilestones] = useState({
    m25: true,
    m50: true,
    m75: true,
    m100: true,
    exceeded: false,
  });

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Goals & Alerts Settings</h1>
      </div>

      {/* Default Goal Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Default Goal Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default Goal Duration</Label>
            <Select value={defaultDuration} onValueChange={setDefaultDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="60">60 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="font-medium">Auto-Create Goals</Label>
              <p className="text-sm text-muted-foreground">Automatically suggest goals based on usage patterns</p>
            </div>
            <input
              type="checkbox"
              checked={autoCreate}
              onChange={(e) => setAutoCreate(e.target.checked)}
              className="w-10 h-5"
            />
          </div>

          <div className="space-y-3">
            <Label>Goal Difficulty Preference</Label>
            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conservative" id="conservative" />
                <Label htmlFor="conservative" className="cursor-pointer">Conservative (10% reduction targets)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="moderate" />
                <Label htmlFor="moderate" className="cursor-pointer">Moderate (15-20% reduction targets)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aggressive" id="aggressive" />
                <Label htmlFor="aggressive" className="cursor-pointer">Aggressive (25%+ reduction targets)</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Alert Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Custom Alert Thresholds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Alert me when daily usage exceeds:</Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={highUsageThreshold}
                onChange={(e) => setHighUsageThreshold(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">L (Current baseline: 400L)</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Leak Detection Sensitivity</Label>
            <div className="flex gap-2">
              {["low", "medium", "high"].map((level) => (
                <Button
                  key={level}
                  variant={leakSensitivity === level ? "default" : "outline"}
                  onClick={() => setLeakSensitivity(level)}
                  className={leakSensitivity === level ? "bg-[#0066CC]" : ""}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Higher sensitivity may cause more false alerts</p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="font-medium">Unusual Pattern Alert</Label>
              <p className="text-sm text-muted-foreground">Notify about unexpected usage patterns (e.g., night usage)</p>
            </div>
            <input
              type="checkbox"
              checked={unusualPattern}
              onChange={(e) => setUnusualPattern(e.target.checked)}
              className="w-10 h-5"
            />
          </div>

          <div className="space-y-2">
            <Label>Alert when monthly bill will exceed:</Label>
            <div className="flex items-center gap-3">
              <span className="text-sm">₨</span>
              <Input
                type="number"
                value={costAlertThreshold}
                onChange={(e) => setCostAlertThreshold(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">Based on current rates</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reminder Frequency */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Reminder Frequency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Goal Progress Reminders</Label>
            <Select value={progressFrequency} onValueChange={setProgressFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="every3">Every 3 Days</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Milestone Notifications</Label>
            {[
              { key: "m25", label: "25% progress" },
              { key: "m50", label: "50% progress" },
              { key: "m75", label: "75% progress" },
              { key: "m100", label: "100% completion" },
              { key: "exceeded", label: "Exceeded goal" },
            ].map((milestone) => (
              <div key={milestone.key} className="flex items-center gap-3 p-2">
                <Checkbox
                  id={milestone.key}
                  checked={milestones[milestone.key as keyof typeof milestones]}
                  onCheckedChange={(checked) =>
                    setMilestones({ ...milestones, [milestone.key]: checked })
                  }
                />
                <Label htmlFor={milestone.key} className="cursor-pointer">
                  {milestone.label}
                </Label>
              </div>
            ))}
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
