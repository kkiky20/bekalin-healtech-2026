import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnalyticsKpiCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  description?: string;
  className?: string;
}

export function AnalyticsKpiCard({
  title,
  value,
  icon,
  trend,
  trendDirection,
  description,
  className
}: AnalyticsKpiCardProps) {
  return (
    <div className={cn("bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col", className)}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="flex items-baseline gap-2 mb-1">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {trend && (
          <div className={cn(
            "text-xs font-medium px-1.5 py-0.5 rounded-full",
            trendDirection === "up" ? "text-emerald-700 bg-emerald-50" : 
            trendDirection === "down" ? "text-rose-700 bg-rose-50" : 
            "text-slate-600 bg-slate-100"
          )}>
            {trendDirection === "up" ? "↑" : trendDirection === "down" ? "↓" : "−"} {trend}
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-slate-500 mt-auto">{description}</p>
      )}
    </div>
  );
}
