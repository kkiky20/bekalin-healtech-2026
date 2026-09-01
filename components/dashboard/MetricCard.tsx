"use client";

import { DashboardMetric } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  metric: DashboardMetric;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const Icon = metric.icon;

  const statusStyles = {
    success: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50",
    warning: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50",
    critical: "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/50",
    info: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50",
    neutral: "bg-muted text-muted-foreground border-border",
  };

  const statusIndicators = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    critical: "bg-red-500",
    info: "bg-blue-500",
    neutral: "bg-slate-500",
  };

  return (
    <div className={cn("p-5 rounded-2xl bg-surface border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border group relative overflow-hidden flex flex-col justify-between h-full", className)}>
      <div className={cn("absolute top-0 left-0 w-full h-1", statusIndicators[metric.status])} />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {metric.title}
          </h3>
          {Icon && (
            <div className={cn("p-2 rounded-lg border", statusStyles[metric.status])}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-black tracking-tighter text-foreground">
            {metric.value}
          </span>
          {metric.trend && (
            <div className={cn(
              "flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md",
              metric.trend.isPositive ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30" : "text-red-600 bg-red-50 dark:bg-red-900/30"
            )}>
              {metric.trend.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {metric.trend.value}
            </div>
          )}
        </div>
      </div>
      
      <p className="text-sm font-medium text-muted-foreground mt-2">
        {metric.subtitle}
      </p>
    </div>
  );
}
