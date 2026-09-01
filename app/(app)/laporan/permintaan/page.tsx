"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { AnalyticsKpiCard } from "@/components/analytics/AnalyticsKpiCard";
import { RequestTrendChart } from "@/components/analytics/RequestTrendChart";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { getRequestTrend, getTopRequestedItems, getFulfillmentRate, getRequestByUnit } from "@/services/analyticsService";
import { ClipboardData, CheckCircle, Clock, XCircle, Download } from "lucide-react";
import { AnalyticsFilter } from "@/types/analytics";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/utils/export-csv";
import { useRequestStore } from "@/store/useRequestStore";

function getFilterFromParams(searchParams: URLSearchParams): AnalyticsFilter {
  const range = searchParams.get("range") || "7d";
  let dateFrom = undefined;
  let dateTo = undefined; // We can set this to today + 1 for safety
  
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
    categoryId: searchParams.get("category") || undefined,
  };
}

export default function LaporanPermintaanPage() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const requests = useRequestStore(state => state.requests);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filter = useMemo(() => getFilterFromParams(searchParams), [searchParams]);
  const trendData = useMemo(() => getRequestTrend(filter), [filter]);
  const topItems = useMemo(() => getTopRequestedItems(filter), [filter]);
  const fulfillment = useMemo(() => getFulfillmentRate(filter), [filter]);
  const requestByUnit = useMemo(() => getRequestByUnit(filter), [filter]);

  // Apply filters for export
  const exportData = useMemo(() => {
    return requests.filter(req => {
      if (filter.unitId && req.unit !== filter.unitId) return false;
      if (filter.dateFrom) {
         const reqDate = new Date(req.createdAt).getTime();
         const fromDate = new Date(filter.dateFrom).getTime();
         if (reqDate < fromDate) return false;
      }
      return true;
    }).map(r => ({
      id: r.id,
      unit: r.unit,
      requester: r.requesterName,
      status: r.status,
      priority: r.priority,
      date: new Date(r.createdAt).toLocaleDateString("id-ID"),
      itemCount: r.items.length
    }));
  }, [requests, filter]);

  const handleExport = () => {
    const columns = [
      { header: "ID Permintaan", accessorKey: "id" },
      { header: "Unit Pemohon", accessorKey: "unit" },
      { header: "Pemohon", accessorKey: "requester" },
      { header: "Status", accessorKey: "status" },
      { header: "Prioritas", accessorKey: "priority" },
      { header: "Tanggal", accessorKey: "date" },
      { header: "Jml Item", accessorKey: "itemCount" },
    ];
    exportToCSV(exportData, columns, `Laporan_Permintaan_${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (!isMounted) return null;

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "MANAJER"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Laporan Tren Permintaan</h2>
            <p className="text-sm text-slate-500">Analitik pengajuan barang dan tingkat persetujuan.</p>
          </div>
          <Button onClick={handleExport} className="gap-2 font-semibold">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        <AnalyticsFilters />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsKpiCard 
            title="Total Permintaan" 
            value={trendData.reduce((a, b) => a + b.count, 0)} 
            icon={<ClipboardData className="w-5 h-5" />} 
          />
          <AnalyticsKpiCard 
            title="Tingkat Persetujuan" 
            value={`${fulfillment.fulfillmentRate}%`} 
            icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} 
            className="border-emerald-200"
          />
          <AnalyticsKpiCard 
            title="Menunggu Tindakan" 
            value={fulfillment.unfulfilled} 
            icon={<Clock className="w-5 h-5 text-amber-600" />} 
            className="border-amber-200"
          />
          <AnalyticsKpiCard 
            title="Tidak Terpenuhi / Batal" 
            value={requests.filter(r => r.status === 'DITOLAK' || r.status === 'DIBATALKAN').length} 
            icon={<XCircle className="w-5 h-5 text-slate-400" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="font-semibold text-slate-800 mb-6">Volume Permintaan Harian</h3>
            <RequestTrendChart data={trendData} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Item Paling Sering Diminta</h3>
              </div>
              <div className="divide-y divide-slate-100 p-2">
                {topItems.length > 0 ? (
                  topItems.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate pr-4">{item.item}</p>
                        <p className="text-[10px] text-slate-500">{item.category}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-slate-700">{item.quantity}</p>
                        <p className="text-[10px] text-slate-500">diminta {item.requestCount}x</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-slate-500">
                    Tidak ada data permintaan item.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Distribusi by Unit</h3>
              </div>
              <div className="divide-y divide-slate-100 p-2">
                {requestByUnit.length > 0 ? (
                  requestByUnit.map((unit, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700">{unit.unit}</p>
                      <p className="text-sm font-bold text-blue-600">{unit.count} pengajuan</p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-slate-500">
                    Tidak ada data permintaan unit.
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
