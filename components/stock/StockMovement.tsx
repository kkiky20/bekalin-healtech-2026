"use client";

import { StockMovement as IStockMovement } from "@/types/stock";
import { formatDate } from "@/utils/stock";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StockMovement({ movements }: { movements: IStockMovement[] }) {
  if (!movements || movements.length === 0) {
    return (
      <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm h-full flex flex-col justify-center items-center text-center">
        <h3 className="font-bold text-foreground w-full text-left mb-6 self-start">Riwayat Pergerakan Stok</h3>
        <p className="text-muted-foreground text-sm font-medium pb-8">Belum ada riwayat pergerakan yang tercatat untuk batch ini.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border/50 rounded-2xl flex flex-col h-full shadow-sm">
      <div className="p-6 border-b border-border/50">
        <h3 className="font-bold text-foreground">Riwayat Pergerakan Stok</h3>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="relative border-l border-border/60 ml-3 space-y-8">
          {movements.map((mov) => {
            const isOut = mov.type === "OUT";
            const Icon = isOut ? ArrowUpRight : ArrowDownRight;
            const colorClass = isOut ? "text-amber-500 bg-amber-50 dark:bg-amber-900/30" : "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30";
            const sign = isOut ? "-" : "+";

            return (
              <div key={mov.id} className="relative pl-6">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                </div>
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                      {formatDate(mov.date)}
                    </span>
                    <p className="text-sm font-semibold text-foreground mb-1 leading-snug">
                      {mov.description}
                    </p>
                  </div>
                  <div className={`shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-md font-bold text-sm ${colorClass}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {sign}{mov.quantity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
