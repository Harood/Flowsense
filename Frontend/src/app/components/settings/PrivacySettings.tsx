import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { AlertTriangle } from "lucide-react";

export function PrivacySettings() {
  const [dataCollection, setDataCollection] = useState({
    analytics: true,
    crashReports: true,
    benchmarking: false,
    marketing: false,
  });

  const [dataSharing, setDataSharing] = useState({
    utilityProvider: false,
    weather: false,
    smartHome: false,
  });

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Privacy & Data</h1>
        <p className="text-muted-foreground">
          Control how your data is used and shared
        </p>
      </div>

      {/* Data Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Data Collection & Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex items-start gap-3">
              <Checkbox
                id="analytics"
                checked={dataCollection.analytics}
                onCheckedChange={(checked) =>
                  setDataCollection({ ...dataCollection, analytics: checked as boolean })
                }
              />
              <div>
                <Label htmlFor="analytics" className="cursor-pointer font-medium">
                  Usage analytics for personalized insights
                </Label>
                <p className="text-sm text-muted-foreground">Allows AI to provide better recommendations</p>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-lg">
            <div className="flex items-start gap-3">
              <Checkbox
                id="crashReports"
                checked={dataCollection.crashReports}
                onCheckedChange={(checked) =>
                  setDataCollection({ ...dataCollection, crashReports: checked as boolean })
                }
              />
              <div>
                <Label htmlFor="crashReports" className="cursor-pointer font-medium">
                  Performance & crash reporting
                </Label>
                <p className="text-sm text-muted-foreground">Helps us improve the app</p>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-lg">
            <div className="flex items-start gap-3">
              <Checkbox
                id="benchmarking"
                checked={dataCollection.benchmarking}
                onCheckedChange={(checked) =>
                  setDataCollection({ ...dataCollection, benchmarking: checked as boolean })
                }
              />
              <div>
                <Label htmlFor="benchmarking" className="cursor-pointer font-medium">
                  Anonymized community benchmarking
                </Label>
                <p className="text-sm text-muted-foreground">
                  Compare your usage with similar households (no personal data shared)
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-lg">
            <div className="flex items-start gap-3">
              <Checkbox
                id="marketing-data"
                checked={dataCollection.marketing}
                onCheckedChange={(checked) =>
                  setDataCollection({ ...dataCollection, marketing: checked as boolean })
                }
              />
              <div>
                <Label htmlFor="marketing-data" className="cursor-pointer font-medium">
                  Marketing & product research
                </Label>
                <p className="text-sm text-muted-foreground">Opt-in to surveys and feature testing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sharing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Third-Party Sharing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
            FlowSense never sells your personal data. The toggles below control optional integrations.
          </p>

          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="utility"
                  checked={dataSharing.utilityProvider}
                  onCheckedChange={(checked) =>
                    setDataSharing({ ...dataSharing, utilityProvider: checked as boolean })
                  }
                />
                <div>
                  <Label htmlFor="utility" className="cursor-pointer font-medium">
                    Share data with water utility provider
                  </Label>
                  <p className="text-sm text-muted-foreground">Enable automatic bill sync (requires account number)</p>
                </div>
              </div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="weather-service"
                  checked={dataSharing.weather}
                  onCheckedChange={(checked) =>
                    setDataSharing({ ...dataSharing, weather: checked as boolean })
                  }
                />
                <div>
                  <Label htmlFor="weather-service" className="cursor-pointer font-medium">
                    Weather service integration
                  </Label>
                  <p className="text-sm text-muted-foreground">Share location for weather-based watering suggestions</p>
                </div>
              </div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="smart-home"
                  checked={dataSharing.smartHome}
                  onCheckedChange={(checked) =>
                    setDataSharing({ ...dataSharing, smartHome: checked as boolean })
                  }
                />
                <div>
                  <Label htmlFor="smart-home" className="cursor-pointer font-medium">
                    Smart home integration
                  </Label>
                  <p className="text-sm text-muted-foreground">Connect with Google Home, Alexa, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Export & Deletion */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Data Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-[#0066CC] text-[#0066CC] hover:bg-blue-50">
              Download Your Data
            </Button>
            <p className="text-sm text-muted-foreground">Get a copy of all your usage data in JSON format</p>
          </div>

          <div className="border-t pt-4 space-y-3">
            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
              Delete My Account
            </Button>
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-600">Permanently delete your account and all associated data</p>
                <p>This action cannot be undone</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Policy */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <a href="#" className="text-[#0066CC] hover:underline block">View Privacy Policy</a>
            <a href="#" className="text-[#0066CC] hover:underline block">View Terms of Service</a>
            <p className="text-sm text-muted-foreground">Last updated: January 1, 2026</p>
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
