"use client";

import { DashboardAlert } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

interface AlertPanelProps {
  title: string;
  alerts: DashboardAlert[];
  className?: string;
}

export function AlertPanel({ title, alerts, className }: AlertPanelProps) {
  const getIcon = (status: DashboardAlert["status"]) => {
    switch (status) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "critical": return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "info": return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  const getBg = (status: DashboardAlert["status"]) => {
    switch (status) {
      case "success": return "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50";
      case "warning": return "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50";
      case "critical": return "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/50";
      case "info": return "bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50";
      default: return "bg-muted border-border";
    }
  };

  return (
    <div className={cn("bg-surface border border-border/50 rounded-2xl flex flex-col h-full", className)}>
      <div className="p-5 border-b border-border/50">
        <h3 className="font-bold text-foreground">{title}</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-3">
        {alerts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
            <CheckCircle2 className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-sm font-medium">Tidak ada peringatan baru.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id}
              className={cn("p-4 rounded-xl border flex gap-4 transition-colors cursor-default", getBg(alert.status))}
            >
              <div className="shrink-0 mt-0.5">
                {getIcon(alert.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold truncate text-foreground">{alert.title}</h4>
                  <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">{alert.time}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  {alert.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
