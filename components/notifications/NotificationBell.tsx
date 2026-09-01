"use client";

import { useNotificationStore } from "@/store/useNotificationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Bell } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const { user } = useAuthStore();
  const { notifications, markAllAsRead } = useNotificationStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userNotifications = useMemo(() => {
    if (!user) return [];
    return notifications
      .filter(n => n.targetRoles.includes(user.role) && (!n.targetUnitId || n.targetUnitId === user.unit))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notifications, user]);

  const unreadCount = userNotifications.filter(n => !n.isRead).length;
  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  const dropdownNotifications = useMemo(() => {
    const source = tab === "unread" ? userNotifications.filter(n => !n.isRead) : userNotifications;
    return source.slice(0, 5);
  }, [userNotifications, tab]);

  const handleMarkAll = () => {
    if (user) markAllAsRead(user.role, user.unit);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        aria-label={`Notifikasi${unreadCount > 0 ? `, ${unreadCount} belum dibaca` : ""}`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center animate-in zoom-in">
            {displayCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 bg-background border border-border/50 shadow-xl rounded-xl overflow-hidden z-50 origin-top-right"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-border/50">
              <h3 className="font-semibold text-sm">Notifikasi</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAll}
                  className="text-xs text-primary font-medium hover:underline focus:outline-none"
                >
                  Tandai semua dibaca
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border/50">
              <button
                onClick={() => setTab("all")}
                className={cn(
                  "flex-1 text-xs font-medium py-2.5 transition-colors border-b-2",
                  tab === "all" 
                    ? "text-foreground border-primary" 
                    : "text-muted-foreground border-transparent hover:text-foreground"
                )}
              >
                Semua
              </button>
              <button
                onClick={() => setTab("unread")}
                className={cn(
                  "flex-1 text-xs font-medium py-2.5 transition-colors border-b-2",
                  tab === "unread" 
                    ? "text-foreground border-primary" 
                    : "text-muted-foreground border-transparent hover:text-foreground"
                )}
              >
                Belum Dibaca {unreadCount > 0 && `(${unreadCount})`}
              </button>
            </div>
            
            {/* List */}
            <div className="max-h-[360px] overflow-y-auto">
              {dropdownNotifications.length > 0 ? (
                <div className="divide-y divide-border/30">
                  {dropdownNotifications.map(notif => (
                    <NotificationItem 
                      key={notif.id} 
                      notification={notif} 
                      onClickCallback={() => setIsOpen(false)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  {tab === "unread" ? "Semua notifikasi sudah dibaca." : "Belum ada notifikasi."}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border/50">
              <Link href="/notifikasi" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full rounded-none h-10 text-xs font-medium text-muted-foreground hover:text-foreground">
                  Lihat Semua Notifikasi
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
