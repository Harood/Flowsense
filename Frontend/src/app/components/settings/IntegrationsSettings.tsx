import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";

const integrations = [
  {
    id: "google-home",
    name: "Google Home",
    description: "Control with voice commands",
    icon: "🏠",
    connected: false,
  },
  {
    id: "alexa",
    name: "Amazon Alexa",
    description: "Smart home integration",
    icon: "🎙️",
    connected: false,
  },
  {
    id: "ifttt",
    name: "IFTTT",
    description: "Create custom automations",
    icon: "⚙️",
    connected: true,
  },
];

export function IntegrationsSettings() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Integrations & Connections</h1>
        <p className="text-muted-foreground">
          Connect FlowSense with other services
        </p>
      </div>

      {/* Available Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="text-5xl mb-4">{integration.icon}</div>
                <h3 className="text-xl font-bold mb-2">{integration.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {integration.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant={integration.connected ? "default" : "secondary"} className={integration.connected ? "bg-green-500" : ""}>
                    {integration.connected ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Connected
                      </span>
                    ) : (
                      "Not Connected"
                    )}
                  </Badge>
                  <Button
                    variant={integration.connected ? "outline" : "default"}
                    size="sm"
                    className={!integration.connected ? "bg-[#0066CC] hover:bg-[#0055AA]" : ""}
                  >
                    {integration.connected ? "Configure" : "Connect"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-[#0066CC] hover:bg-[#0055AA]">Save Changes</Button>
      </div>
    </div>
  );
}
