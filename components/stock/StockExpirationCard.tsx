"use client";

import { StockItem } from "@/types/stock";
import { getDaysRemaining, formatDate } from "@/utils/stock";
import { Clock, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function StockExpirationCard({ item }: { item: StockItem }) {
  const daysRemaining = getDaysRemaining(item.expirationDate);
  
  let statusStr = "Aman";
  let Icon = CheckCircle2;
  let colorClass = "text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50";
  
  if (daysRemaining <= 0) {
    statusStr = "Sudah Expired";
    Icon = AlertCircle;
    colorClass = "text-red-500 bg-red-50 border-red-100 dark:bg-red-950/20 dark:border-red-900/50";
  } else if (daysRemaining <= 30) {
    statusStr = "Segera Expired";
    Icon = AlertTriangle;
    colorClass = "text-orange-500 bg-orange-50 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/50";
  }

  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
      <h3 className="font-bold text-foreground mb-6">Informasi Kedaluwarsa</h3>
      
      <div className={cn("flex flex-col items-center justify-center text-center p-6 rounded-xl border mb-6", colorClass)}>
        <Icon className="w-10 h-10 mb-3" />
        <h4 className="text-2xl font-black tracking-tighter mb-1">{daysRemaining > 0 ? `${daysRemaining} Hari` : "EXPIRED"}</h4>
        <p className="text-sm font-semibold">{statusStr}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
          <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Nomor Batch</span>
          <span className="font-semibold text-foreground">{item.batch}</span>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
          <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Tanggal Expired</span>
          <span className="font-semibold text-foreground">{formatDate(item.expirationDate)}</span>
        </div>
      </div>
    </div>
  );
}
