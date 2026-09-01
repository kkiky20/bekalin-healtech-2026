import { AppNotification } from "@/types/notification";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useRouter } from "next/navigation";
import { AlertTriangle, Clipboard, CheckCircle, Package, Truck, Inbox, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

function getRelativeTime(dateString: string) {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diff = Math.floor((now - then) / 1000);
  
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 172800) return "Kemarin";
  return `${Math.floor(diff / 86400)} hari lalu`;
}

const ICON_MAP: Record<string, typeof Info> = {
  STOCK_ALERT: AlertTriangle,
  REQUEST: Clipboard,
  APPROVAL: CheckCircle,
  REDISTRIBUTION: Package,
  DISTRIBUTION: Truck,
  RECEIVING: Inbox,
  DISCREPANCY: AlertCircle,
  SYSTEM: Info,
};

export function getNotificationIcon(type: string) {
  return ICON_MAP[type] || Info;
}

export function NotificationItem({ notification, onClickCallback }: { notification: AppNotification; onClickCallback?: () => void }) {
  const router = useRouter();
  const markAsRead = useNotificationStore(state => state.markAsRead);
  const Icon = getNotificationIcon(notification.type);
  const isCritical = notification.priority === "CRITICAL";
  const isUnread = !notification.isRead;

  const handleClick = () => {
    if (isUnread) markAsRead(notification.id);
    onClickCallback?.();
    router.push(notification.targetUrl);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full text-left px-4 py-3.5 flex gap-3.5 transition-colors relative",
        "hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
        isUnread && "bg-primary/[0.03]",
        isCritical && isUnread && "bg-red-50/60 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/30"
      )}
    >
      {isUnread && (
        <span className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-7 rounded-r",
          isCritical ? "bg-red-500" : "bg-primary"
        )} />
      )}
      
      <div className={cn(
        "shrink-0 w-9 h-9 rounded-lg flex items-center justify-center",
        isCritical ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline gap-2 mb-0.5">
          <p className={cn(
            "text-[13px] truncate",
            isUnread ? "font-semibold text-foreground" : "font-medium text-muted-foreground",
            isCritical && isUnread && "text-red-700 dark:text-red-400"
          )}>
            {notification.title}
          </p>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
            {getRelativeTime(notification.createdAt)}
          </span>
        </div>
        <p className={cn(
          "text-xs line-clamp-2 leading-relaxed",
          isUnread ? "text-foreground/80" : "text-muted-foreground"
        )}>
          {notification.description}
        </p>
      </div>
    </button>
  );
}
