import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

export function UnitsDisplaySettings() {
  const [volumeUnit, setVolumeUnit] = useState("liters");
  const [temperature, setTemperature] = useState("celsius");
  const [currency, setCurrency] = useState("PKR");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("12");
  const [timezone, setTimezone] = useState("UTC+5");
  const [autoTimezone, setAutoTimezone] = useState(false);
  const [language, setLanguage] = useState("en");
  const [region, setRegion] = useState("Pakistan");
  const [defaultView, setDefaultView] = useState("week");
  const [chartType, setChartType] = useState("line");
  const [dashboardPrefs, setDashboardPrefs] = useState({
    breakdown: true,
    aiInsights: true,
    weeklyChart: true,
    comparison: true,
    ranking: false,
    weather: true,
  });

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Units & Display Preferences</h1>
      </div>

      {/* Measurement Units */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Measurement Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Volume</Label>
            <RadioGroup value={volumeUnit} onValueChange={setVolumeUnit}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="liters" id="liters" />
                <Label htmlFor="liters" className="cursor-pointer">Liters (L)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gallons" id="gallons" />
                <Label htmlFor="gallons" className="cursor-pointer">Gallons (gal)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cubic" id="cubic" />
                <Label htmlFor="cubic" className="cursor-pointer">Cubic Meters (m³)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Temperature</Label>
            <div className="flex gap-2">
              <Button
                variant={temperature === "celsius" ? "default" : "outline"}
                onClick={() => setTemperature("celsius")}
                className={temperature === "celsius" ? "bg-[#0066CC]" : ""}
              >
                Celsius (°C)
              </Button>
              <Button
                variant={temperature === "fahrenheit" ? "default" : "outline"}
                onClick={() => setTemperature("fahrenheit")}
                className={temperature === "fahrenheit" ? "bg-[#0066CC]" : ""}
              >
                Fahrenheit (°F)
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PKR">Pakistani Rupee (₨ PKR)</SelectItem>
                <SelectItem value="USD">US Dollar ($ USD)</SelectItem>
                <SelectItem value="EUR">Euro (€ EUR)</SelectItem>
                <SelectItem value="GBP">British Pound (£ GBP)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Date & Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Date & Time Format</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (02/03/2026)</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (03/02/2026)</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2026-03-02)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Time Format</Label>
            <RadioGroup value={timeFormat} onValueChange={setTimeFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="12" id="12-hour" />
                <Label htmlFor="12-hour" className="cursor-pointer">12-hour (9:34 AM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="24" id="24-hour" />
                <Label htmlFor="24-hour" className="cursor-pointer">24-hour (09:34)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone} disabled={autoTimezone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC+5">(UTC+5) Pakistan Standard Time</SelectItem>
                <SelectItem value="UTC">(UTC+0) UTC</SelectItem>
                <SelectItem value="UTC-5">(UTC-5) Eastern Time</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Checkbox
                id="auto-timezone"
                checked={autoTimezone}
                onCheckedChange={(checked) => setAutoTimezone(checked as boolean)}
              />
              <Label htmlFor="auto-timezone" className="cursor-pointer text-sm">
                Auto-detect timezone
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Language & Region</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ur">🇵🇰 اردو (Urdu)</SelectItem>
                <SelectItem value="ar">🇦🇪 العربية (Arabic)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pakistan">Pakistan</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="USA">United States</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Affects: Date formats, currency defaults</p>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Dashboard Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Default View</Label>
            <RadioGroup value={defaultView} onValueChange={setDefaultView}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="week" id="week" />
                <Label htmlFor="week" className="cursor-pointer">This Week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="month" id="month" />
                <Label htmlFor="month" className="cursor-pointer">This Month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30days" id="30days" />
                <Label htmlFor="30days" className="cursor-pointer">Last 30 Days</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Chart Type</Label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Show on Dashboard</Label>
            <div className="space-y-2">
              {[
                { key: "breakdown", label: "Usage breakdown by category" },
                { key: "aiInsights", label: "AI insights panel" },
                { key: "weeklyChart", label: "Weekly overview chart" },
                { key: "comparison", label: "Comparison to last month" },
                { key: "ranking", label: "Community ranking" },
                { key: "weather", label: "Weather forecast" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-3 p-2">
                  <Checkbox
                    id={item.key}
                    checked={dashboardPrefs[item.key as keyof typeof dashboardPrefs]}
                    onCheckedChange={(checked) =>
                      setDashboardPrefs({ ...dashboardPrefs, [item.key]: checked })
                    }
                  />
                  <Label htmlFor={item.key} className="cursor-pointer">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
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
