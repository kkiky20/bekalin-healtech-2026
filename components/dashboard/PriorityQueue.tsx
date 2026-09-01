"use client";

import { DashboardQueueItem } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PriorityQueueProps {
  title: string;
  subtitle?: string;
  items: DashboardQueueItem[];
  className?: string;
}

export function PriorityQueue({ title, subtitle, items, className }: PriorityQueueProps) {
  const getBadgeStyle = (status: DashboardQueueItem["statusColor"]) => {
    switch (status) {
      case "success": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50";
      case "warning": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50";
      case "critical": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50";
      case "info": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800/50";
    }
  };

  return (
    <div className={cn("bg-surface border border-border/50 rounded-2xl overflow-hidden flex flex-col", className)}>
      <div className="p-5 border-b border-border/50">
        <h3 className="font-bold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground font-medium mt-1">{subtitle}</p>}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-5 py-4">Item / ID</th>
              <th className="px-5 py-4">Kategori</th>
              <th className="px-5 py-4">Informasi Tambahan</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                <td className="px-5 py-4 font-bold text-foreground">
                  {item.itemName}
                  <span className="block text-xs font-medium text-muted-foreground mt-0.5">{item.id}</span>
                </td>
                <td className="px-5 py-4 font-medium text-muted-foreground">{item.category}</td>
                <td className="px-5 py-4 font-medium text-muted-foreground">
                  {item.currentStock && <span className="block">{item.currentStock}</span>}
                  {item.usageRate && <span className="block text-xs">Rate: {item.usageRate}</span>}
                  {item.prediction && <span className="block text-xs">Est: {item.prediction}</span>}
                </td>
                <td className="px-5 py-4">
                  <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", getBadgeStyle(item.statusColor))}>
                    {item.statusText}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link 
                    href={item.actionHref} 
                    className="inline-flex items-center text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Lihat <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List/Cards */}
      <div className="md:hidden flex flex-col divide-y divide-border/50">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex flex-col gap-3 hover:bg-muted/30 transition-colors">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h4 className="font-bold text-sm text-foreground">{item.itemName}</h4>
                <p className="text-xs font-medium text-muted-foreground">{item.category} • {item.id}</p>
              </div>
              <span className={cn("shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", getBadgeStyle(item.statusColor))}>
                {item.statusText}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs font-medium text-muted-foreground">
                {item.currentStock && <span>{item.currentStock}</span>}
              </div>
              <Link 
                href={item.actionHref} 
                className="inline-flex items-center text-xs font-bold text-primary px-3 py-1.5 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                Tindakan
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
