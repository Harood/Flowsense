import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
  iconBgColor?: string;
  iconColor?: string;
  chart?: React.ReactNode;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
  chart,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${iconBgColor} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-3xl font-bold mb-1">{value}</p>
        {subtext && <p className="text-sm text-muted-foreground">{subtext}</p>}
        {chart && <div className="mt-4">{chart}</div>}
      </CardContent>
    </Card>
  );
}
