import { LucideIcon } from "lucide-react";

export type StatusColor = "success" | "warning" | "critical" | "info" | "neutral";

export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  status: StatusColor;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export interface DashboardAlert {
  id: string;
  title: string;
  description: string;
  status: StatusColor;
  time: string;
}

export interface DashboardQueueItem {
  id: string;
  itemName: string;
  category: string;
  currentStock?: number | string;
  usageRate?: string;
  prediction?: string;
  unit?: string;
  statusText?: string;
  statusColor: StatusColor;
  actionHref: string;
}

export interface DashboardActivity {
  id: string;
  time: string;
  description: string;
  unit: string;
}

export interface ChartDataPoint {
  [key: string]: string | number;
}
