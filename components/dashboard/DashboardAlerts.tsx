"use client";

import { useNotificationStore } from "@/store/useNotificationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { AlertTriangle, AlertCircle } from "lucide-react";
import Link from "next/link";

export function DashboardAlerts() {
  const { user } = useAuthStore();
  const { notifications } = useNotificationStore();

  if (!user) return null;

  const criticalAndHighAlerts = notifications
    .filter(n => n.targetRoles && n.targetRoles.includes(user.role))
    .filter(n => !n.isRead && (n.priority === "CRITICAL" || n.priority === "HIGH"))
    .slice(0, 5); // Max 5 items

  if (criticalAndHighAlerts.length === 0) return null;

  const criticalCount = criticalAndHighAlerts.filter(n => n.priority === "CRITICAL").length;
  const highCount = criticalAndHighAlerts.filter(n => n.priority === "HIGH").length;

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 shadow-sm">
      <div className="flex-1 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-red-900 dark:text-red-400">Perlu Perhatian</h3>
          <p className="text-sm text-red-800 dark:text-red-300 mt-1">
            Anda memiliki {criticalAndHighAlerts.length} alert aktif yang perlu segera ditindaklanjuti.
          </p>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-100/50 px-2 py-1 rounded-md">
              <AlertCircle className="w-3.5 h-3.5" />
              Critical: {criticalCount}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-700 bg-orange-100/50 px-2 py-1 rounded-md">
              <AlertTriangle className="w-3.5 h-3.5" />
              High: {highCount}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center sm:pl-4 sm:border-l border-red-200 dark:border-red-900/50">
        <Link 
          href="/notifikasi" 
          className="w-full sm:w-auto text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
        >
          Lihat Alert
        </Link>
      </div>
    </div>
  );
}
