"use client";

import { useNotificationStore } from "@/store/useNotificationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemo, useState } from "react";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Check, Settings, BellOff } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FILTERS = ["Semua", "Belum Dibaca", "Critical", "High", "Medium", "Low", "Stock", "Permintaan", "Persetujuan", "Redistribusi", "Distribusi", "Discrepancy"];

export default function NotificationPage() {
  const { user } = useAuthStore();
  const { notifications, markAllAsRead } = useNotificationStore();
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const userNotifications = useMemo(() => {
    if (!user) return [];
    return notifications
      .filter(n => n.targetRoles && n.targetRoles.includes(user.role))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notifications, user]);

  const filteredNotifications = useMemo(() => {
    let result = userNotifications;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.description.toLowerCase().includes(q) ||
        (n.referenceId && n.referenceId.toLowerCase().includes(q))
      );
    }

    if (activeFilter !== "Semua") {
      if (activeFilter === "Belum Dibaca") result = result.filter(n => !n.isRead);
      else if (activeFilter === "Critical") result = result.filter(n => n.priority === "CRITICAL");
      else if (activeFilter === "High") result = result.filter(n => n.priority === "HIGH");
      else if (activeFilter === "Medium") result = result.filter(n => n.priority === "MEDIUM");
      else if (activeFilter === "Low") result = result.filter(n => n.priority === "LOW");
      else if (activeFilter === "Stock") result = result.filter(n => n.type === "STOCK_ALERT");
      else if (activeFilter === "Permintaan") result = result.filter(n => n.type === "REQUEST");
      else if (activeFilter === "Persetujuan") result = result.filter(n => n.type === "APPROVAL");
      else if (activeFilter === "Redistribusi") result = result.filter(n => n.type === "REDISTRIBUTION");
      else if (activeFilter === "Distribusi") result = result.filter(n => n.type === "DISTRIBUTION" || n.type === "RECEIVING");
      else if (activeFilter === "Discrepancy") result = result.filter(n => n.type === "DISCREPANCY");
    }

    return result;
  }, [userNotifications, activeFilter, search]);

  const groupedNotifications = useMemo(() => {
    const groups: Record<string, typeof filteredNotifications> = {
      "HARI INI": [],
      "KEMARIN": [],
      "MINGGU INI": [],
      "SEBELUMNYA": []
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;
    const lastWeek = today - 86400000 * 7;

    filteredNotifications.forEach(n => {
      const date = new Date(n.createdAt).getTime();
      if (date >= today) groups["HARI INI"].push(n);
      else if (date >= yesterday) groups["KEMARIN"].push(n);
      else if (date >= lastWeek) groups["MINGGU INI"].push(n);
      else groups["SEBELUMNYA"].push(n);
    });

    return groups;
  }, [filteredNotifications]);

  const handleMarkAll = () => {
    if (user) markAllAsRead(user.role);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          title="Notifikasi" 
          description="Informasi dan aktivitas yang membutuhkan perhatian Anda."
        />
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleMarkAll} className="h-9 font-semibold">
            <Check className="w-4 h-4 mr-2" />
            Tandai Semua Dibaca
          </Button>
          <Link href="/pengaturan/notifikasi">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold mb-3">Pencarian</h3>
            <input 
              type="text" 
              placeholder="Cari notifikasi..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 hide-scrollbar">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium text-left whitespace-nowrap transition-colors",
                  activeFilter === f 
                    ? "bg-primary/10 text-primary font-bold" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <BellOff className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tidak ada notifikasi</h3>
              <p className="text-slate-500 max-w-sm">
                Belum ada aktivitas atau informasi baru yang sesuai dengan filter pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {Object.entries(groupedNotifications).map(([group, items]) => {
                if (items.length === 0) return null;
                return (
                  <div key={group}>
                    <div className="bg-slate-50/50 px-4 py-2 border-y border-slate-100 first:border-t-0">
                      <span className="text-xs font-bold text-slate-500">{group}</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {items.map(notif => (
                        <div key={notif.id} className="hover:bg-slate-50/50 transition-colors">
                          <NotificationItem notification={notif} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
