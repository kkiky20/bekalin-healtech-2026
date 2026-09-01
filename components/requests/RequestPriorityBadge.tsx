import { RequestPriority } from "@/types/request";
import { getRequestPriorityLabel } from "@/utils/request";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

interface RequestPriorityBadgeProps {
  priority: RequestPriority;
  className?: string;
}

export function RequestPriorityBadge({ priority, className }: RequestPriorityBadgeProps) {
  const getBadgeStyle = (priority: RequestPriority) => {
    switch (priority) {
      case "KRITIS": 
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800/50";
      case "TINGGI":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800/50";
      case "NORMAL":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50";
      case "RENDAH":
      default: 
        return "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400 border-slate-200 dark:border-slate-700";
    }
  };

  const getIcon = (priority: RequestPriority) => {
    switch (priority) {
      case "KRITIS": return <AlertCircle className="w-3 h-3 mr-1" />;
      case "TINGGI": return <ArrowUp className="w-3 h-3 mr-1" />;
      case "NORMAL": return <ArrowRight className="w-3 h-3 mr-1" />;
      case "RENDAH": return <ArrowDown className="w-3 h-3 mr-1" />;
    }
  };

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border", getBadgeStyle(priority), className)}>
      {getIcon(priority)}
      {getRequestPriorityLabel(priority)}
    </span>
  );
}
