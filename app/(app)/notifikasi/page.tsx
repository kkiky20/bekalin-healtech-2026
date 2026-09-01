"use client";

import { useNotificationStore } from "@/store/useNotificationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Bell, Settings, Search } from "lucide-react";
import Link from "next/link";

function isToday(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function isYesterday(dateStr: string) {
  const d = new Date(dateStr);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.getDate() === y.getDate() && d.getMonth() === y.getMonth() && d.getFullYear() === y.getFullYear();
}

function isThisWeek(dateStr: string) {
  const d = new Date(dateStr).getTime();
  const now = new Date().getTime();
  const diff = (now - d) / (1000 * 60 * 60 * 24);
  return diff <= 7 && !isToday(dateStr) && !isYesterday(dateStr);
}

const FILTERS = [
  { key: "ALL", label: "Semua" },
  { key: "UNREAD", label: "Belum Dibaca" },
  { key: "CRITICAL", label: "Kritis" },
] as const;

export default function NotificationPage() {
  const { user } = useAuthStore();
  const { notifications, markAllAsRead } = useNotificationStore();
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const userNotifications = useMemo(() => {
    if (!user) return [];
    let data = notifications.filter(
      n => n.targetRoles.includes(user.role) && (!n.targetUnitId || n.targetUnitId === user.unit)
    );

    if (filter === "UNREAD") data = data.filter(n => !n.isRead);
    if (filter === "CRITICAL") data = data.filter(n => n.priority === "CRITICAL");

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.description.toLowerCase().includes(q) ||
        n.referenceId?.toLowerCase().includes(q)
      );
    }

    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notifications, user, filter, searchQuery]);

  const groups = useMemo(() => {
    const g: Record<string, typeof userNotifications> = {
      "Hari Ini": [],
      "Kemarin": [],
      "Minggu Ini": [],
      "Sebelumnya": []
    };
    userNotifications.forEach(n => {
      if (isToday(n.createdAt)) g["Hari Ini"].push(n);
      else if (isYesterday(n.createdAt)) g["Kemarin"].push(n);
      else if (isThisWeek(n.createdAt)) g["Minggu Ini"].push(n);
      else g["Sebelumnya"].push(n);
    });
    return g;
  }, [userNotifications]);

  const handleMarkAll = () => {
    if (user) markAllAsRead(user.role, user.unit);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12 space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          title="Notifikasi" 
          description="Informasi dan aktivitas yang membutuhkan perhatian Anda."
        />
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleMarkAll} className="font-medium text-xs">
            Tandai Semua Dibaca
          </Button>
          <Link href="/pengaturan/notifikasi">
            <Button variant="outline" size="icon" className="w-9 h-9">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filter === f.key 
                  ? "bg-foreground text-background" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari notifikasi..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="bg-surface border border-border/50 rounded-xl overflow-hidden">
        {userNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3 text-muted-foreground">
              <Bell className="w-5 h-5" />
            </div>
            <p className="font-medium text-foreground text-sm mb-1">Tidak ada notifikasi</p>
            <p className="text-muted-foreground text-xs">Semua notifikasi yang sesuai akan muncul di sini.</p>
          </div>
        ) : (
          Object.entries(groups).map(([label, items]) => {
            if (items.length === 0) return null;
            return (
              <div key={label}>
                <div className="px-4 py-2 bg-muted/20 border-b border-border/50 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {label}
                </div>
                <div className="divide-y divide-border/30">
                  {items.map(notif => (
                    <NotificationItem key={notif.id} notification={notif} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
