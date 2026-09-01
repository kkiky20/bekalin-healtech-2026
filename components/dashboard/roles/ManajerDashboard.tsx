"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { PriorityQueue } from "@/components/dashboard/PriorityQueue";
import { SmartInsight } from "@/components/dashboard/SmartInsight";
import { DashboardAlerts } from "@/components/dashboard/DashboardAlerts";
import { manajerMetrics, manajerChartData, manajerIssues, manajerInsights, manajerSummary } from "@/mock/dashboard/manajer";
import { Activity, CheckCircle, FileText, TrendingUp, Filter } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

export function ManajerDashboard() {
  const { user } = useAuthStore();

  const metricsWithIcons = manajerMetrics.map(m => {
    if (m.id === "m1") return { ...m, icon: Activity };
    if (m.id === "m2") return { ...m, icon: CheckCircle };
    if (m.id === "m3") return { ...m, icon: FileText };
    if (m.id === "m4") return { ...m, icon: TrendingUp };
    return m;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader 
          title={`Selamat Pagi, ${user?.name} 👋`}
          description="Ringkasan performa clinical supply chain rumah sakit."
        />
        <div className="flex items-center gap-2 self-start md:self-auto mb-8 md:mb-0">
          <Button variant="outline" className="font-semibold" size="sm">
            <Filter className="w-4 h-4 mr-2" /> 7 Hari Terakhir
          </Button>
        </div>
      </div>
      
      <DashboardAlerts />

      {/* Smart Insight (Executive Overview) */}
      <SmartInsight insights={manajerInsights} className="shadow-sm" />

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metricsWithIcons.map(metric => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart (2/3 width) */}
        <div className="lg:col-span-2">
          <DashboardChart 
            title="Supply Chain Performance"
            subtitle="Tren ketersediaan, pemenuhan, dan distribusi dalam 7 hari terakhir."
            type="line"
            data={manajerChartData}
            xAxisKey="date"
            dataKeys={[
              { key: "availability", name: "Availability", color: "#10b981" },
              { key: "fulfillment", name: "Fulfillment", color: "#3b82f6" },
              { key: "distribution", name: "Distribution", color: "#8b5cf6" }
            ]}
          />
        </div>
        
        {/* Operational Summary (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border/50 rounded-2xl p-6 h-full flex flex-col shadow-sm">
            <h3 className="font-bold text-foreground mb-6">Operational Summary</h3>
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Total Permintaan</span>
                <span className="font-bold text-foreground">{manajerSummary.totalPermintaan}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Berhasil Dipenuhi</span>
                <span className="font-bold text-emerald-600">{manajerSummary.dipenuhi}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Permintaan Pending</span>
                <span className="font-bold text-amber-600">{manajerSummary.pending}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Redistribusi Aktif</span>
                <span className="font-bold text-blue-600">{manajerSummary.redistribusi}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-medium text-muted-foreground">Avg. Waktu Pemenuhan</span>
                <span className="font-bold text-foreground">{manajerSummary.avgTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      <div className="grid grid-cols-1">
        <PriorityQueue 
          title="Critical Supply Issues"
          subtitle="Masalah operasional yang membutuhkan eskalasi atau perhatian manajerial."
          items={manajerIssues}
        />
      </div>
    </div>
  );
}
