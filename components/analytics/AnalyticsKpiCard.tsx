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
    <div className={cn(
      "group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] flex flex-col hover:-translate-y-0.5", 
      className
    )}>
      {/* Decorative gradient blur in background */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <h3 className="text-[13px] font-semibold tracking-wide text-slate-500 uppercase">{title}</h3>
        <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10 transition-all duration-300">
          {icon}
        </div>
      </div>
      
      <div className="flex items-baseline gap-3 mb-2 relative z-10">
        <div className="text-3xl font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors">{value}</div>
        {trend && (
          <div className={cn(
            "text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1",
            trendDirection === "up" ? "text-emerald-700 bg-emerald-50 border border-emerald-100/50" : 
            trendDirection === "down" ? "text-rose-700 bg-rose-50 border border-rose-100/50" : 
            "text-slate-600 bg-slate-100 border border-slate-200/50"
          )}>
            {trendDirection === "up" ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            ) : trendDirection === "down" ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l10 10"/><path d="M17 7v10H7"/></svg>
            ) : (
              <span className="text-lg leading-none -mt-1">-</span>
            )}
            {trend}
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-[13px] font-medium text-slate-400 mt-auto relative z-10">{description}</p>
      )}
    </div>
  );
}
