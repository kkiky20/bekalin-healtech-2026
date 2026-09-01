"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { navigationConfig, secondaryNavigationConfig } from "@/config/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, LogOut, HeartPulse } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) return null;

  const primaryNav = navigationConfig.filter(item => item.allowedRoles.includes(user.role));
  const secondaryNav = secondaryNavigationConfig.filter(item => item.allowedRoles.includes(user.role));

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const desktopClasses = cn(
    "hidden lg:flex flex-col bg-surface-secondary border-r border-border h-screen sticky top-0 transition-all duration-300 z-50",
    isCollapsed ? "w-[80px]" : "w-[260px]"
  );

  const mobileClasses = cn(
    "lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] bg-background border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl",
    isMobileOpen ? "translate-x-0" : "-translate-x-full"
  );

  const NavList = ({ items, label }: { items: typeof navigationConfig, label?: string }) => (
    <div className="flex flex-col gap-1 mb-8">
      {label && (!isCollapsed || isMobileOpen) && (
        <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
          {label}
        </span>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onMobileClose()}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg mx-2 transition-all group relative",
              isActive 
                ? "bg-primary/10 text-primary font-bold" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
            )}
            title={isCollapsed && !isMobileOpen ? item.label : undefined}
          >
            <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
            {(!isCollapsed || isMobileOpen) && (
              <span className="truncate">{item.label}</span>
            )}
            
            {/* Active Indicator Line */}
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full" />
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className={desktopClasses}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {(!isCollapsed) && (
            <div className="flex items-center gap-2 overflow-hidden">
              <img src="/logo-transparent.png" alt="BEKALIN Logo" className="w-8 h-8 object-contain shrink-0 drop-shadow-sm" />
              <div className="flex flex-col">
                <span className="font-bold tracking-tight leading-none">BEKALIN<span className="text-primary">.</span></span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Clinical Supply</span>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <img src="/logo-transparent.png" alt="BEKALIN Logo" className="w-8 h-8 object-contain drop-shadow-sm" />
            </div>
          )}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-1.5 rounded-md hover:bg-muted text-muted-foreground hidden lg:flex absolute -right-3 top-5 bg-surface border border-border shadow-sm z-10",
              isCollapsed && "right-auto left-1/2 -translate-x-1/2 top-4 shadow-none border-transparent bg-transparent"
            )}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <NavList items={primaryNav} label="Menu Utama" />
          <NavList items={secondaryNav} label="Lainnya" />
        </div>

        <div className="p-4 border-t border-border">
          {(!isCollapsed) ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold truncate">{user.name}</span>
                <span className="text-[10px] text-muted-foreground truncate">{user.unit}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogout}
              className="w-full flex justify-center p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <aside className={mobileClasses}>
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2">
            <img src="/logo-transparent.png" alt="BEKALIN Logo" className="w-8 h-8 object-contain shrink-0 drop-shadow-sm" />
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none text-lg">BEKALIN<span className="text-primary">.</span></span>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-border/50 bg-surface/50">
          <p className="font-bold text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.unit}</p>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-2">
          <NavList items={primaryNav} label="Menu Utama" />
          <NavList items={secondaryNav} label="Lainnya" />
        </div>
        
        <div className="p-4 border-t border-border">
           <button 
            onClick={handleLogout}
            className="flex items-center gap-2 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors w-full font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
