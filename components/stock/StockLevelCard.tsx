"use client";

import { StockItem } from "@/types/stock";
import { getStockStatus, getStatusText } from "@/utils/stock";
import { cn } from "@/lib/utils";

export function StockLevelCard({ item }: { item: StockItem }) {
  const status = getStockStatus(item);
  const pct = Math.min(100, Math.max(0, (item.currentStock / item.maximumStock) * 100));
  const minPct = Math.min(100, Math.max(0, (item.minimumStock / item.maximumStock) * 100));

  let indicatorColor = "bg-emerald-500";
  let alertText = "Stok saat ini mencukupi kebutuhan operasional.";
  
  if (status === "CRITICAL") {
    indicatorColor = "bg-red-500";
    alertText = "Risiko Stock-Out: Jika pola penggunaan saat ini berlanjut, persediaan diperkirakan tidak mencukupi kebutuhan berikutnya.";
  } else if (status === "LOW") {
    indicatorColor = "bg-amber-500";
    alertText = "Stok menipis, disarankan untuk segera merencanakan permintaan ulang.";
  }

  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-foreground mb-6">Stock Level</h3>
      
      <div className="flex items-end justify-between mb-2">
        <div className="flex flex-col">
          <span className="text-4xl font-black text-foreground tracking-tighter">{item.currentStock}</span>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Available</span>
        </div>
        <div className="flex flex-col text-center border-x border-border/50 px-6">
          <span className="text-2xl font-black text-blue-600 tracking-tighter">{item.inTransit}</span>
          <span className="text-xs font-bold text-blue-600/70 uppercase tracking-wider">In Transit</span>
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="text-lg font-bold text-muted-foreground">{item.maximumStock}</span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Maximum</span>
        </div>
      </div>

      <div className="relative h-4 w-full bg-muted rounded-full overflow-hidden mb-8">
        <div 
          className={cn("h-full rounded-full transition-all", indicatorColor)} 
          style={{ width: `${pct}%` }}
        />
        {/* Minimum Threshold Marker */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-foreground z-10"
          style={{ left: `${minPct}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-sm mb-6 border-b border-border/50 pb-6">
        <div className="flex items-center gap-2 font-medium">
          <div className="w-0.5 h-3 bg-foreground" />
          <span className="text-muted-foreground">Batas Minimum: <strong className="text-foreground">{item.minimumStock}</strong></span>
        </div>
        <div className="font-medium text-muted-foreground">
          Status: <strong className="text-foreground">{getStatusText(status)}</strong>
        </div>
      </div>

      <div className={cn("p-4 rounded-xl border flex gap-3", 
        status === "CRITICAL" ? "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/50 text-red-800 dark:text-red-300" :
        status === "LOW" ? "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50 text-amber-800 dark:text-amber-300" :
        "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300"
      )}>
        <p className="text-sm font-medium leading-relaxed">
          {alertText}
        </p>
      </div>
    </div>
  );
}
