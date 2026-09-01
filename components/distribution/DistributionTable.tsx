import { RedistributionRecord } from "@/types/redistribution";
import { formatDate } from "@/utils/stock";
import Link from "next/link";
import { ChevronRight, Truck, Package, Clock, CheckCircle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: typeof Package }> = {
  ALLOCATED: { label: "Siap Diproses", className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", icon: Package },
  PROCESSING: { label: "Sedang Diproses", className: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300", icon: Clock },
  IN_DELIVERY: { label: "Dalam Pengiriman", className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300", icon: Truck },
  RECEIVED: { label: "Diterima", className: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300", icon: Inbox },
  COMPLETED: { label: "Selesai", className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", icon: CheckCircle },
};

export function DistributionStatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.ALLOCATED;
  const Icon = config.icon;

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider", config.className)}>
      <Icon className="w-3 h-3" /> {config.label}
    </span>
  );
}

export function DistributionTable({ records }: { records: RedistributionRecord[] }) {
  return (
    <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/30 border-b border-border/50 text-xs text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3.5 font-semibold">ID</th>
              <th className="px-5 py-3.5 font-semibold">Request</th>
              <th className="px-5 py-3.5 font-semibold">Tujuan</th>
              <th className="px-5 py-3.5 font-semibold">Jumlah</th>
              <th className="px-5 py-3.5 font-semibold">Status</th>
              <th className="px-5 py-3.5 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {records.map((rd) => {
              const totalItems = rd.allocations.reduce((sum, a) => sum + a.allocatedQuantity, 0);
              return (
                <tr key={rd.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-foreground">{rd.id}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatDate(rd.updatedAt)}</p>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground font-medium">{rd.requestId}</td>
                  <td className="px-5 py-4 font-medium text-foreground">{rd.destinationUnit}</td>
                  <td className="px-5 py-4 font-semibold">{totalItems}</td>
                  <td className="px-5 py-4">
                    <DistributionStatusBadge status={rd.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link 
                      href={`/distribusi/${rd.id}`}
                      className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Detail <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
            {records.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center text-muted-foreground text-sm">
                  Belum ada distribusi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
