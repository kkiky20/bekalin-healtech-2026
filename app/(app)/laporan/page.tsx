"use client";

import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { AnalyticsKpiCard } from "@/components/analytics/AnalyticsKpiCard";
import { InsightCard } from "@/components/analytics/InsightCard";
import { RequestTrendChart } from "@/components/analytics/RequestTrendChart";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { 
  getStockHealth, 
  getDistributionStats, 
  getOperationalInsights,
  getRequestTrend,
  getFulfillmentRate
} from "@/services/analyticsService";
import { Package, Truck, CheckCircle, TrendingUp } from "lucide-react";
import { AnalyticsFilter } from "@/types/analytics";

function getFilterFromParams(searchParams: URLSearchParams): AnalyticsFilter {
  const range = searchParams.get("range") || "7d";
  
  // Calculate dateFrom based on range
  let dateFrom = undefined;
  const today = new Date();
  
  if (range === "today") {
    dateFrom = today.toISOString().split('T')[0];
  } else if (range === "7d") {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    dateFrom = d.toISOString().split('T')[0];
  } else if (range === "30d") {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    dateFrom = d.toISOString().split('T')[0];
  } else if (range === "90d") {
    const d = new Date();
    d.setDate(d.getDate() - 90);
    dateFrom = d.toISOString().split('T')[0];
  }

  return {
    dateFrom,
    unitId: searchParams.get("unit") || undefined,
    categoryId: searchParams.get("category") || undefined,
  };
}

export default function LaporanOverviewPage() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filter = useMemo(() => getFilterFromParams(searchParams), [searchParams]);

  // Derived state from services based on filter
  const stockHealth = useMemo(() => getStockHealth(filter), [filter]);
  const distributionStats = useMemo(() => getDistributionStats(filter), [filter]);
  const insights = useMemo(() => getOperationalInsights(), []);
  const trendData = useMemo(() => getRequestTrend(filter), [filter]);
  const fulfillment = useMemo(() => getFulfillmentRate(filter), [filter]);

  if (!isMounted) return null;

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "MANAJER"]}>
      <div className="space-y-6">
        <AnalyticsFilters />
        
        {/* Top Level KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsKpiCard 
            title="Total Item Stok" 
            value={stockHealth.total} 
            icon={<Package className="w-5 h-5" />} 
            description={`${stockHealth.critical} item kritis, ${stockHealth.low} menipis`}
          />
          <AnalyticsKpiCard 
            title="Tingkat Pemenuhan" 
            value={`${fulfillment.fulfillmentRate}%`} 
            icon={<CheckCircle className="w-5 h-5" />} 
            description={`${fulfillment.fulfilled} selesai dari ${fulfillment.approved} permintaan`}
            trend="Stabil"
            trendDirection="neutral"
          />
          <AnalyticsKpiCard 
            title="Total Distribusi" 
            value={distributionStats.total} 
            icon={<Truck className="w-5 h-5" />} 
            description={`${distributionStats.processing} diproses, ${distributionStats.inDelivery} dikirim`}
          />
          <AnalyticsKpiCard 
            title="Permintaan Baru" 
            value={trendData.reduce((acc, curr) => acc + curr.count, 0)} 
            icon={<TrendingUp className="w-5 h-5" />} 
            description="Dalam periode ini"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="font-semibold text-slate-800 mb-6">Tren Permintaan Logistik</h3>
            <RequestTrendChart data={trendData} />
          </div>

          {/* Operational Insights side panel */}
          <div className="lg:col-span-1">
            <InsightCard insights={insights} />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
