import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ShowerHead, Droplet, Battery, Plus, Settings, Trash2, Info } from "lucide-react";

const sensors = [
  {
    id: "BS-001",
    name: "BATHROOM SHOWER",
    icon: ShowerHead,
    location: "Main Bathroom",
    lastReading: "2 min ago",
    battery: 85,
    status: "online",
  },
  {
    id: "BT-001",
    name: "BATHROOM TOILET",
    icon: Droplet,
    location: "Main Bathroom",
    lastReading: "30 sec ago",
    battery: 92,
    status: "online",
  },
];

export function SensorsSettings() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sensor Management</h1>
        <p className="text-muted-foreground">
          Configure and monitor your water sensors
        </p>
      </div>

      {/* Connected Sensors */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Connected Sensors</CardTitle>
            <Button variant="outline" className="border-[#0066CC] text-[#0066CC]">
              <Plus className="w-4 h-4 mr-2" />
              Add New Sensor
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {sensors.map((sensor) => {
            const Icon = sensor.icon;
            return (
              <div key={sensor.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#0066CC]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{sensor.name}</h4>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Sensor ID: {sensor.id}</p>
                    <p className="text-sm text-muted-foreground mb-1">Location: {sensor.location}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Last reading: {sensor.lastReading}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Battery className="w-4 h-4" />
                        Battery: {sensor.battery}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Sensor Calibration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Calibration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Last calibrated: February 15, 2026</p>
          <Button variant="outline" className="border-[#0066CC] text-[#0066CC]">
            Calibrate All Sensors
          </Button>
          <p className="text-sm text-muted-foreground">Recommended every 3 months</p>
        </CardContent>
      </Card>

      {/* Simulated Mode */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-900">
              Currently using simulated sensor data for demonstration. Connect real sensors to begin live monitoring.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Exit Demo Mode</Button>
            <Button className="bg-[#0066CC] hover:bg-[#0055AA]">Connect Real Sensors</Button>
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
