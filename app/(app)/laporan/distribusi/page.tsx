"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { AnalyticsKpiCard } from "@/components/analytics/AnalyticsKpiCard";
import { RequestTrendChart } from "@/components/analytics/RequestTrendChart"; // We can reuse this for distribution trend
import { RoleGuard } from "@/components/auth/RoleGuard";
import { getDistributionStats, getDistributionTrend } from "@/services/analyticsService";
import { Truck, AlertTriangle, CheckCircle, Clock, Download } from "lucide-react";
import { AnalyticsFilter } from "@/types/analytics";
import { useRedistributionStore } from "@/store/useRedistributionStore";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/utils/export-csv";

function getFilterFromParams(searchParams: URLSearchParams): AnalyticsFilter {
  const range = searchParams.get("range") || "7d";
  let dateFrom = undefined;
  let dateTo = undefined;
  
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
    dateTo,
    unitId: searchParams.get("unit") || undefined,
  };
}

export default function LaporanDistribusiPage() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const redistributions = useRedistributionStore(state => state.redistributions);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filter = useMemo(() => getFilterFromParams(searchParams), [searchParams]);
  const stats = useMemo(() => getDistributionStats(filter), [filter]);
  const trendData = useMemo(() => getDistributionTrend(filter), [filter]);

  // Data for export
  const exportData = useMemo(() => {
    return redistributions.filter(rd => {
      if (filter.unitId && rd.destinationUnit !== filter.unitId) return false;
      if (filter.dateFrom) {
         const rdDate = new Date(rd.createdAt).getTime();
         const fromDate = new Date(filter.dateFrom).getTime();
         if (rdDate < fromDate) return false;
      }
      return true;
    }).map(r => ({
      id: r.id,
      tujuan: r.destinationUnit,
      status: r.status,
      tanggal: new Date(r.createdAt).toLocaleDateString("id-ID"),
      kurir: r.shippingInfo?.shippedBy || "-",
      selisih: r.receivingRecord?.discrepancies ? Object.keys(r.receivingRecord.discrepancies).length : 0
    }));
  }, [redistributions, filter]);

  const handleExport = () => {
    const columns = [
      { header: "ID Distribusi", accessorKey: "id" },
      { header: "Unit Tujuan", accessorKey: "tujuan" },
      { header: "Status", accessorKey: "status" },
      { header: "Tanggal", accessorKey: "tanggal" },
      { header: "Kurir", accessorKey: "kurir" },
      { header: "Jumlah Selisih", accessorKey: "selisih" },
    ];
    exportToCSV(exportData, columns, `Laporan_Distribusi_${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (!isMounted) return null;

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "MANAJER"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Laporan Performa Distribusi</h2>
            <p className="text-sm text-slate-500">Analitik proses logistik, pengiriman, dan penerimaan.</p>
          </div>
          <Button onClick={handleExport} className="gap-2 font-semibold">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        <AnalyticsFilters />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsKpiCard 
            title="Total Distribusi" 
            value={stats.total} 
            icon={<Truck className="w-5 h-5 text-blue-600" />} 
          />
          <AnalyticsKpiCard 
            title="Selesai / Diterima" 
            value={stats.completed} 
            icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} 
            className="border-emerald-200"
          />
          <AnalyticsKpiCard 
            title="Dalam Pengiriman" 
            value={stats.inDelivery} 
            icon={<Clock className="w-5 h-5 text-amber-600" />} 
            className="border-amber-200"
          />
          <AnalyticsKpiCard 
            title="Selisih / Kendala" 
            value={stats.discrepancy} 
            icon={<AlertTriangle className="w-5 h-5 text-rose-600" />} 
            className="border-rose-200"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="font-semibold text-slate-800 mb-6">Tren Volume Distribusi</h3>
            <RequestTrendChart data={trendData} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden h-full">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Kendala Penerimaan</h3>
              </div>
              <div className="divide-y divide-slate-100 p-2">
                {exportData.filter(d => d.selisih > 0).length > 0 ? (
                  exportData.filter(d => d.selisih > 0).map((item, idx) => (
                    <div key={idx} className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-bold text-slate-900">{item.id}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                          {item.selisih} Issue
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Tujuan: {item.tujuan}</p>
                      <p className="text-xs text-slate-500">Tanggal: {item.tanggal}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-slate-500">
                    Tidak ada catatan selisih/kendala pada periode ini.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
