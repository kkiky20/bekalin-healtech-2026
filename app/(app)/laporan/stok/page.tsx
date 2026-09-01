"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { AnalyticsKpiCard } from "@/components/analytics/AnalyticsKpiCard";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { getStockHealth, getTopLowStockItems } from "@/services/analyticsService";
import { Package, AlertCircle, AlertTriangle, Download } from "lucide-react";
import { AnalyticsFilter } from "@/types/analytics";
import { useStockStore } from "@/store/useStockStore";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/utils/export-csv";

function getFilterFromParams(searchParams: URLSearchParams): AnalyticsFilter {
  return {
    unitId: searchParams.get("unit") || undefined,
    categoryId: searchParams.get("category") || undefined,
  };
}

export default function LaporanStokPage() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const stockItems = useStockStore(state => state.stockItems);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filter = useMemo(() => getFilterFromParams(searchParams), [searchParams]);
  const stockHealth = useMemo(() => getStockHealth(filter), [filter]);
  const topLowStock = useMemo(() => getTopLowStockItems(filter), [filter]);

  // Apply filters to table data
  const tableData = useMemo(() => {
    return stockItems.filter(item => {
      if (filter.unitId && item.unit !== filter.unitId) return false;
      if (filter.categoryId && item.category !== filter.categoryId) return false;
      return true;
    });
  }, [stockItems, filter]);

  const handleExport = () => {
    const columns = [
      { header: "Kode Item", accessorKey: "code" },
      { header: "Nama Item", accessorKey: "name" },
      { header: "Kategori", accessorKey: "category" },
      { header: "Unit", accessorKey: "unit" },
      { header: "Stok Saat Ini", accessorKey: "currentStock" },
      { header: "Stok Minimum", accessorKey: "minimumStock" },
      { header: "Satuan", accessorKey: "unitType" },
    ];
    exportToCSV(tableData, columns, `Laporan_Stok_${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (!isMounted) return null;

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "MANAJER"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Laporan Kondisi Stok</h2>
            <p className="text-sm text-slate-500">Analitik persediaan barang dan risiko stock-out.</p>
          </div>
          <Button onClick={handleExport} className="gap-2 font-semibold">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        <AnalyticsFilters />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AnalyticsKpiCard 
            title="Total Item Aman" 
            value={stockHealth.safe} 
            icon={<Package className="w-5 h-5" />} 
            description={`${stockHealth.safePercentage}% dari total inventaris`}
          />
          <AnalyticsKpiCard 
            title="Item Menipis" 
            value={stockHealth.low} 
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />} 
            className="border-amber-200"
            description="Perlu dijadwalkan restock"
          />
          <AnalyticsKpiCard 
            title="Item Kritis" 
            value={stockHealth.critical} 
            icon={<AlertCircle className="w-5 h-5 text-rose-600" />} 
            className="border-rose-200"
            description="Di bawah 50% dari minimum stok"
          />
        </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-slate-800">Detail Persediaan</h3>
              <span className="text-xs text-slate-500">{tableData.length} item ditemukan</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3">Item</th>
                    <th className="px-5 py-3">Unit</th>
                    <th className="px-5 py-3 text-right">Stok Aktif</th>
                    <th className="px-5 py-3 text-right">Min. Stok</th>
                    <th className="px-5 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.slice(0, 10).map((item) => {
                    const isCritical = item.currentStock <= (item.minimumStock * 0.5);
                    const isLow = item.currentStock < item.minimumStock && !isCritical;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-3">
                          <div className="font-medium text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-500">{item.code} • {item.category}</div>
                        </td>
                        <td className="px-5 py-3 text-slate-600">{item.unit}</td>
                        <td className="px-5 py-3 text-right font-medium text-slate-900">{item.currentStock} {item.unitType}</td>
                        <td className="px-5 py-3 text-right text-slate-500">{item.minimumStock}</td>
                        <td className="px-5 py-3 text-center">
                          {isCritical ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">KRITIS</span>
                          ) : isLow ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">MENIPIS</span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">AMAN</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {tableData.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                        Tidak ada data stok yang sesuai dengan filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {tableData.length > 10 && (
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 text-center text-xs text-slate-500">
                Menampilkan 10 item. Gunakan fitur Export CSV untuk melihat keseluruhan data.
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Top 10 Item Kritis</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {topLowStock.length > 0 ? (
                  topLowStock.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-rose-600">{item.currentStock}</p>
                        <p className="text-[10px] text-slate-500">dari min {item.minimumStock}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-slate-500">
                    Semua stok dalam kondisi aman.
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
