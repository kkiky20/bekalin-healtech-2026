import { StockStatus } from "@/types/stock";
import { getStatusText } from "@/utils/stock";
import { cn } from "@/lib/utils";

interface StockStatusBadgeProps {
  status: StockStatus;
  className?: string;
}

export function StockStatusBadge({ status, className }: StockStatusBadgeProps) {
  const getBadgeStyle = (status: StockStatus) => {
    switch (status) {
      case "SAFE": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50";
      case "LOW": return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50";
      case "CRITICAL": return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-800/50";
      case "EXPIRING_SOON": return "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 border-orange-200 dark:border-orange-800/50";
      case "EXPIRED": return "bg-slate-100 text-slate-700 dark:bg-slate-900/50 dark:text-slate-400 border-slate-300 dark:border-slate-700";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getDotStyle = (status: StockStatus) => {
    switch (status) {
      case "SAFE": return "bg-emerald-500";
      case "LOW": return "bg-amber-500";
      case "CRITICAL": return "bg-red-500 animate-pulse";
      case "EXPIRING_SOON": return "bg-orange-500";
      case "EXPIRED": return "bg-slate-500";
      default: return "bg-muted-foreground";
    }
  };

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border", getBadgeStyle(status), className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", getDotStyle(status))} />
      {getStatusText(status)}
    </span>
  );
}
