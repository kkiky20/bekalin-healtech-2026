import { cn } from "@/lib/utils";

interface StockHealthProps {
  safe: number;
  low: number;
  critical: number;
  expired: number;
  total: number;
  className?: string;
}

export function StockHealth({ safe, low, critical, expired, total, className }: StockHealthProps) {
  if (total === 0) return null;

  const safePct = (safe / total) * 100;
  const lowPct = (low / total) * 100;
  const criticalPct = (critical / total) * 100;
  const expiredPct = (expired / total) * 100;

  return (
    <div className={cn("bg-surface border border-border/50 rounded-2xl p-5 shadow-sm", className)}>
      <h3 className="text-sm font-bold text-foreground mb-4">Stock Health Summary</h3>
      
      {/* Progress Bar */}
      <div className="h-3 w-full flex rounded-full overflow-hidden mb-4">
        <div style={{ width: `${safePct}%` }} className="bg-emerald-500 h-full" title={`Aman: ${safe}`} />
        <div style={{ width: `${lowPct}%` }} className="bg-amber-500 h-full" title={`Menipis: ${low}`} />
        <div style={{ width: `${criticalPct}%` }} className="bg-red-500 h-full" title={`Kritis: ${critical}`} />
        <div style={{ width: `${expiredPct}%` }} className="bg-slate-500 h-full" title={`Expired: ${expired}`} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">Aman ({Math.round(safePct)}%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-muted-foreground">Menipis ({Math.round(lowPct)}%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-muted-foreground">Kritis ({Math.round(criticalPct)}%)</span>
        </div>
        {expired > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span className="text-muted-foreground">Expired ({Math.round(expiredPct)}%)</span>
          </div>
        )}
      </div>
    </div>
  );
}
