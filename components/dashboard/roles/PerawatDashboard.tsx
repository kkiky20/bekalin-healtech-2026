"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PriorityQueue } from "@/components/dashboard/PriorityQueue";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { perawatMetrics, perawatRequests, perawatActivities } from "@/mock/dashboard/perawat";
import { ClipboardList, Clock, RefreshCcw, CheckCircle2, Plus, FileText, Truck } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export function PerawatDashboard() {
  const { user } = useAuthStore();

  const metricsWithIcons = perawatMetrics.map(m => {
    if (m.id === "m1") return { ...m, icon: ClipboardList };
    if (m.id === "m2") return { ...m, icon: Clock };
    if (m.id === "m3") return { ...m, icon: RefreshCcw };
    if (m.id === "m4") return { ...m, icon: CheckCircle2 };
    return m;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader 
          title={`Selamat Pagi, ${user?.name} 👋`}
          description="Pantau kebutuhan logistik unit dan status permintaan Anda."
        />
        <div className="text-sm font-bold text-primary bg-primary/10 px-6 py-2.5 rounded-full border border-primary/20 self-start md:self-auto mb-8 md:mb-0 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Unit: {user?.unit}
        </div>
      </div>

      {/* Primary Action Callout */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-xl font-black text-foreground tracking-tight mb-2">Butuh logistik atau alat medis?</h3>
          <p className="text-muted-foreground font-medium">Buat permintaan baru untuk unit {user?.unit} dan lacak statusnya secara real-time.</p>
        </div>
        <Link 
          href="/permintaan/baru" 
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 shrink-0"
        >
          <Plus className="w-5 h-5" /> Buat Permintaan
        </Link>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metricsWithIcons.map(metric => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Queue */}
        <div className="lg:col-span-2">
          <PriorityQueue 
            title="Permintaan Saya"
            subtitle={`Daftar permintaan logistik terakhir dari unit ${user?.unit}.`}
            items={perawatRequests}
          />
        </div>
        
        {/* Quick Actions & Activity */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-surface border border-border/50 rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">Akses Cepat</h3>
            <div className="space-y-3">
              <Link href="/permintaan" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border transition-colors">
                <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Lihat Semua Permintaan</span>
              </Link>
              <Link href="/tracking" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border transition-colors">
                <div className="p-2 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Lacak Distribusi Berjalan</span>
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <ActivityList title="Aktivitas Unit" activities={perawatActivities} />
          </div>
        </div>
      </div>
    </div>
  );
}
