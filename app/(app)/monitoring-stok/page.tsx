"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Download, FileX } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useStockStore } from "@/store/useStockStore";
import { getStockStatus } from "@/utils/stock";
import { StockToolbar } from "@/components/stock/StockToolbar";
import { StockHealth } from "@/components/stock/StockHealth";
import { StockTable } from "@/components/stock/StockTable";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { DashboardMetric } from "@/types/dashboard";

export default function MonitoringStokPage() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const stockItems = useStockStore(state => state.stockItems);

  // URL state
  const queryStatus = searchParams.get("status") || "ALL";
  const queryUnit = searchParams.get("unit") || "ALL";
  const queryCategory = searchParams.get("category") || "ALL";

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(queryStatus);
  const [unitFilter, setUnitFilter] = useState(queryUnit);
  const [categoryFilter, setCategoryFilter] = useState(queryCategory);

  // Sync state with URL manually for simplicity, or just use local state and update URL on change if needed.
  // We'll sync local state -> URL on change
  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (unitFilter !== "ALL") params.set("unit", unitFilter);
    if (categoryFilter !== "ALL") params.set("category", categoryFilter);
    
    const newSearch = params.toString();
    const currentPath = window.location.pathname;
    
    // Replace state without refreshing
    window.history.replaceState(null, '', `${currentPath}${newSearch ? `?${newSearch}` : ''}`);
  }, [statusFilter, unitFilter, categoryFilter]);

  // Initial sync from URL
  useEffect(() => {
    if (queryStatus !== statusFilter) setStatusFilter(queryStatus);
    if (queryUnit !== unitFilter) setUnitFilter(queryUnit);
    if (queryCategory !== categoryFilter) setCategoryFilter(queryCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "ALL" || unitFilter !== "ALL" || categoryFilter !== "ALL";

  const handleReset = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setUnitFilter("ALL");
    setCategoryFilter("ALL");
  };

  // Role-based visibility
  const roleFilterOptions = user?.role === "PERAWAT" ? [user.unit] : undefined;

  // Filter Engine
  const filteredData = useMemo(() => {
    let data = stockItems;

    // Force unit filter for Perawat
    if (user?.role === "PERAWAT" && user.unit) {
      data = data.filter(item => item.unit === user.unit);
    } else if (unitFilter !== "ALL") {
      data = data.filter(item => item.unit === unitFilter);
    }

    if (categoryFilter !== "ALL") {
      data = data.filter(item => item.category === categoryFilter);
    }

    if (statusFilter !== "ALL") {
      if (statusFilter === "EXPIRING_SOON") {
        data = data.filter(item => getStockStatus(item) === "EXPIRING_SOON" || getStockStatus(item) === "EXPIRED");
      } else {
        data = data.filter(item => getStockStatus(item) === statusFilter);
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.code.toLowerCase().includes(q) ||
        item.batch.toLowerCase().includes(q)
      );
    }

    // Sort Engine
    // Priority: EXPIRED > CRITICAL > LOW > EXPIRING_SOON > SAFE
    const statusPriority = { EXPIRED: 1, CRITICAL: 2, LOW: 3, EXPIRING_SOON: 4, SAFE: 5 };
    
    data.sort((a, b) => {
      const sa = getStockStatus(a);
      const sb = getStockStatus(b);
      if (statusPriority[sa] !== statusPriority[sb]) {
        return statusPriority[sa] - statusPriority[sb];
      }
      // If same status, sort by stock ratio
      return (a.currentStock / a.minimumStock) - (b.currentStock / b.minimumStock);
    });

    return data;
  }, [searchQuery, categoryFilter, unitFilter, statusFilter, user]);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, unitFilter, statusFilter]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  // KPI Calculation
  const kpiData = useMemo(() => {
    // KPI is based on user's permission scope (All vs Perawat Unit)
    const baseData = user?.role === "PERAWAT" ? stockItems.filter(i => i.unit === user.unit) : stockItems;
    
    let safe = 0, low = 0, critical = 0, expired = 0, expiringSoon = 0;
    
    baseData.forEach(item => {
      const st = getStockStatus(item);
      if (st === "SAFE") safe++;
      else if (st === "LOW") low++;
      else if (st === "CRITICAL") critical++;
      else if (st === "EXPIRED") expired++;
      else if (st === "EXPIRING_SOON") expiringSoon++;
    });

    return { total: baseData.length, safe, low, critical, expired, expiringSoon };
  }, [user]);

  const metrics: DashboardMetric[] = [
    { id: "k1", title: "TOTAL ITEM", value: kpiData.total, subtitle: "Item tercatat", status: "info" },
    { id: "k2", title: "STOK AMAN", value: kpiData.safe, subtitle: "Persediaan cukup", status: "success" },
    { id: "k3", title: "STOK MENIPIS", value: kpiData.low, subtitle: "Mendekati batas", status: "warning" },
    { id: "k4", title: "STOK KRITIS", value: kpiData.critical, subtitle: "Risiko stock-out", status: "critical" },
    { id: "k5", title: "SEGERA EXPIRED", value: kpiData.expiringSoon + kpiData.expired, subtitle: "< 30 hari / Expired", status: "neutral" },
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"]}>
      <div className="animate-in fade-in duration-500 pb-12 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <PageHeader 
            title="Monitoring Stok" 
            description="Pantau ketersediaan dan kondisi persediaan logistik klinis secara terpusat."
          />
          <div className="flex items-center gap-3 self-start md:self-auto mb-8 md:mb-0">
            {user?.role === "ADMIN_GUDANG" && (
              <Button className="font-bold shadow-md shadow-primary/20">
                <Plus className="w-4 h-4 mr-2" /> Tambah Stok
              </Button>
            )}
            {user?.role !== "PERAWAT" && (
              <Button variant="outline" className="font-bold">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            )}
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metrics.map(m => (
            <MetricCard key={m.id} metric={m} className="p-4" />
          ))}
        </div>

        {/* Stock Health */}
        <StockHealth 
          safe={kpiData.safe} 
          low={kpiData.low} 
          critical={kpiData.critical} 
          expired={kpiData.expired + kpiData.expiringSoon} 
          total={kpiData.total} 
        />

        {/* Filters */}
        <StockToolbar 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          unitFilter={unitFilter} setUnitFilter={setUnitFilter}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          onReset={handleReset} hasActiveFilters={hasActiveFilters}
          roleFilterOptions={roleFilterOptions}
        />

        {/* Table/Cards */}
        {filteredData.length === 0 ? (
          <EmptyState 
            icon={FileX}
            title="Stok tidak ditemukan"
            description="Belum ada item yang sesuai dengan kriteria filter Anda."
            actionLabel="Reset Filter"
            onAction={handleReset}
          />
        ) : (
          <div className="space-y-4">
            <StockTable items={paginatedData} />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 bg-surface border border-border/50 rounded-2xl p-4 shadow-sm">
                <span className="text-sm font-medium text-muted-foreground">
                  Menampilkan {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} dari {totalItems} item
                </span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "ghost"}
                        size="sm"
                        className={page === currentPage ? "w-8 h-8 p-0" : "w-8 h-8 p-0 text-muted-foreground"}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
