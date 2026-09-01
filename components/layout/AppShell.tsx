"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        onMobileClose={() => setIsMobileOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
