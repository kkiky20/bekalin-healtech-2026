"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { PriorityQueue } from "@/components/dashboard/PriorityQueue";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { gudangMetrics, gudangChartData, gudangAlerts, gudangQueue, gudangActivities } from "@/mock/dashboard/admin-gudang";
import { Package, AlertTriangle, AlertCircle, ArrowDownToLine, Plus, Search, Repeat2, Truck } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

export function AdminGudangDashboard() {
  const { user } = useAuthStore();
  const dateStr = new Date().toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Map icons to metrics
  const metricsWithIcons = gudangMetrics.map(m => {
    if (m.id === "m1") return { ...m, icon: Package };
    if (m.id === "m2") return { ...m, icon: AlertTriangle };
    if (m.id === "m3") return { ...m, icon: AlertCircle };
    if (m.id === "m4") return { ...m, icon: ArrowDownToLine };
    return m;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader 
          title={`Selamat Pagi, ${user?.name} 👋`}
          description="Berikut ringkasan kondisi logistik dan aktivitas supply chain hari ini."
        />
        <div className="text-sm font-bold text-muted-foreground bg-muted/50 px-4 py-2 rounded-xl border border-border/50 self-start md:self-auto mb-8 md:mb-0">
          {dateStr}
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metricsWithIcons.map(metric => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart (2/3 width) */}
        <div className="lg:col-span-2">
          <DashboardChart 
            title="Visual Supply Dashboard"
            subtitle="Perubahan kondisi persediaan dan kebutuhan logistik hari ini."
            type="area"
            data={gudangChartData}
            xAxisKey="time"
            dataKeys={[
              { key: "available", name: "Tersedia", color: "#10b981" },
              { key: "demand", name: "Permintaan", color: "#3b82f6" }
            ]}
          />
        </div>
        
        {/* Alerts (1/3 width) */}
        <div className="lg:col-span-1">
          <AlertPanel title="Traffic-Light Alert" alerts={gudangAlerts} />
        </div>
      </div>

      {/* Priority Queue (Full width) */}
      <div className="grid grid-cols-1">
        <PriorityQueue 
          title="Membutuhkan Tindakan Cepat"
          subtitle="Permintaan dan kondisi stok yang membutuhkan perhatian segera."
          items={gudangQueue}
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border/50 rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-6">Aksi Cepat</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/monitoring-stok" className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Tambah Stok</span>
            </Link>
            
            <Link href="/permintaan" className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Review Permintaan</span>
            </Link>
            
            <Link href="/redistribusi" className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Repeat2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Redistribusi</span>
            </Link>
            
            <Link href="/tracking" className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Lihat Distribusi</span>
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-1 h-[300px]">
          <ActivityList title="Aktivitas Terbaru" activities={gudangActivities} />
        </div>
      </div>
    </div>
  );
}
