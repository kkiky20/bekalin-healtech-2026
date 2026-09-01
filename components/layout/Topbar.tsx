"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Search, Menu, UserCircle, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { RoleBadge } from "@/components/ui/RoleBadge";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4 lg:hidden">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-bold tracking-tight">BEKALIN<span className="text-primary">.</span></span>
      </div>

      <div className="hidden lg:flex flex-1 max-w-md items-center relative">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
        <input 
          type="text" 
          placeholder="Cari barang, batch, supplier..." 
          className="w-full h-10 pl-10 pr-4 rounded-full bg-surface border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-3 ml-auto">
        <button className="lg:hidden p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <NotificationBell />

        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border"
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold leading-none mb-0.5">{user?.name}</span>
              <span className="text-[10px] font-medium text-muted-foreground leading-none">{user?.unit}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
              {user?.name.charAt(0)}
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-60 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 origin-top-right p-1.5"
                >
                  <div className="px-3 py-3 border-b border-border/50 mb-1">
                    <p className="font-semibold text-sm truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate mb-2">{user?.email}</p>
                    {user?.role && <RoleBadge role={user.role} />}
                  </div>
                  
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => { setShowProfile(false); router.push("/profil"); }} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full text-left">
                      <UserCircle className="w-4 h-4" /> Profil Saya
                    </button>
                    <button onClick={() => { setShowProfile(false); router.push("/pengaturan/notifikasi"); }} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full text-left">
                      <Settings className="w-4 h-4" /> Pengaturan
                    </button>
                    <div className="h-px bg-border/50 my-1 mx-2" />
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-sm font-medium text-red-600 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
