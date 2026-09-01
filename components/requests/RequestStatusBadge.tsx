import { RequestStatus } from "@/types/request";
import { getRequestStatusLabel } from "@/utils/request";
import { cn } from "@/lib/utils";

interface RequestStatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

export function RequestStatusBadge({ status, className }: RequestStatusBadgeProps) {
  const getBadgeStyle = (status: RequestStatus) => {
    switch (status) {
      case "SELESAI": 
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50";
      case "MENUNGGU_VALIDASI":
      case "MENUNGGU_PERSETUJUAN":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50";
      case "DITOLAK":
        return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-800/50";
      case "DISETUJUI":
      case "DIPROSES":
      case "DALAM_PENGIRIMAN":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50";
      case "DRAFT":
      case "DIBATALKAN":
      default: 
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/50 dark:text-slate-400 border-slate-300 dark:border-slate-700";
    }
  };

  const getDotStyle = (status: RequestStatus) => {
    switch (status) {
      case "SELESAI": return "bg-emerald-500";
      case "MENUNGGU_VALIDASI":
      case "MENUNGGU_PERSETUJUAN": return "bg-amber-500 animate-pulse";
      case "DITOLAK": return "bg-red-500";
      case "DISETUJUI":
      case "DIPROSES":
      case "DALAM_PENGIRIMAN": return "bg-blue-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border", getBadgeStyle(status), className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5 shrink-0", getDotStyle(status))} />
      {getRequestStatusLabel(status)}
    </span>
  );
}
