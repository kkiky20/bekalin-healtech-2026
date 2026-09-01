import { useNotificationStore } from "@/store/useNotificationStore";
import { AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NotificationItem } from "./NotificationItem";

export function NotificationAlertCard() {
  const { notifications } = useNotificationStore();
  const alerts = notifications
    .filter(n => (n.priority === "CRITICAL" || n.priority === "HIGH") && !n.isRead)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (alerts.length === 0) return null;

  return (
    <div className="bg-surface border border-red-200/60 dark:border-red-900/40 rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center px-5 py-3.5 border-b border-red-200/60 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <AlertTriangle className="w-4 h-4" />
          <h3 className="font-semibold text-sm">Perlu Perhatian</h3>
        </div>
        <Link 
          href="/notifikasi?filter=CRITICAL" 
          className="text-xs font-medium text-red-600 dark:text-red-400 flex items-center hover:underline"
        >
          Lihat Semua <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </Link>
      </div>
      <div className="divide-y divide-border/50">
        {alerts.map(alert => (
          <NotificationItem key={alert.id} notification={alert} />
        ))}
      </div>
    </div>
  );
}
