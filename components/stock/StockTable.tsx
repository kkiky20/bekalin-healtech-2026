import { StockItem } from "@/types/stock";
import { getStockStatus, formatDate } from "@/utils/stock";
import { StockStatusBadge } from "./StockStatusBadge";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockTableProps {
  items: StockItem[];
}

export function StockTable({ items }: StockTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Item & Kode</th>
                <th className="px-5 py-4">Kategori & Unit</th>
                <th className="px-5 py-4 w-40">Tingkat Stok</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Kedaluwarsa</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {items.map((item) => {
                const status = getStockStatus(item);
                const pct = Math.min(100, Math.max(0, (item.currentStock / item.maximumStock) * 100));
                
                return (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-5 py-4">
                      <p className="font-bold text-foreground text-sm">{item.name}</p>
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.code} • Batch {item.batch}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">{item.category}</p>
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.unit}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-end justify-between mb-1.5">
                        <span className="font-bold text-foreground">{item.currentStock}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">Min {item.minimumStock}</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full transition-all", 
                            status === "CRITICAL" ? "bg-red-500" : 
                            status === "LOW" ? "bg-amber-500" : "bg-emerald-500"
                          )} 
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StockStatusBadge status={status} />
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-muted-foreground">
                      {formatDate(item.expirationDate)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link 
                        href={`/monitoring-stok/${item.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {items.map(item => (
          <StockCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

function StockCard({ item }: { item: StockItem }) {
  const status = getStockStatus(item);
  const pct = Math.min(100, Math.max(0, (item.currentStock / item.maximumStock) * 100));

  return (
    <div className="bg-surface border border-border/50 rounded-xl p-4 flex flex-col gap-4 shadow-sm relative overflow-hidden">
      {status === "CRITICAL" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
      {status === "LOW" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}
      
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground leading-snug">{item.name}</h4>
          <p className="text-xs font-medium text-muted-foreground mt-1">{item.code} • {item.unit}</p>
        </div>
        <StockStatusBadge status={status} className="shrink-0" />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-muted/30 rounded-lg p-3 border border-border/50">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Stok Saat Ini</p>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-lg font-black">{item.currentStock}</span>
            <span className="text-xs font-medium text-muted-foreground">/ Min {item.minimumStock}</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full transition-all", 
                status === "CRITICAL" ? "bg-red-500" : 
                status === "LOW" ? "bg-amber-500" : "bg-emerald-500"
              )} 
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex-1 bg-muted/30 rounded-lg p-3 border border-border/50 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Kedaluwarsa</p>
          <span className="text-sm font-semibold">{formatDate(item.expirationDate)}</span>
        </div>
      </div>

      <Link 
        href={`/monitoring-stok/${item.id}`}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors"
      >
        Lihat Detail <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
