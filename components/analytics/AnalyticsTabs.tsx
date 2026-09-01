"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PackageSearch, ClipboardData, Truck } from "lucide-react";
import { PageHeader } from "../layout/PageHeader";

export function AnalyticsTabs() {
  const pathname = usePathname();
  
  const tabs = [
    { name: "Overview", href: "/laporan", icon: LayoutDashboard },
    { name: "Stok & Persediaan", href: "/laporan/stok", icon: PackageSearch },
    { name: "Tren Permintaan", href: "/laporan/permintaan", icon: ClipboardData },
    { name: "Performa Distribusi", href: "/laporan/distribusi", icon: Truck },
  ];

  return (
    <div className="mb-2">
      <PageHeader 
        title="Laporan & Analitik" 
        description="Pantau kondisi persediaan, tren permintaan, dan performa redistribusi logistik."
      />
      <div className="mt-[-1rem]">
        <nav className="flex space-x-2 overflow-x-auto hide-scrollbar p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 inline-flex" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  isActive
                    ? "bg-white text-primary shadow-sm ring-1 ring-slate-900/5"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                  "group relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-bold whitespace-nowrap transition-all duration-200"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className={cn(
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600",
                  "w-4 h-4 shrink-0 transition-colors"
                )} />
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
