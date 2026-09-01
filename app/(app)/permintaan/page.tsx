"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, FileX } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRequestStore } from "@/store/useRequestStore";
import { RequestToolbar } from "@/components/requests/RequestToolbar";
import { RequestTable } from "@/components/requests/RequestTable";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { DashboardMetric } from "@/types/dashboard";
import Link from "next/link";

export default function PermintaanPage() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const requests = useRequestStore(state => state.requests);

  // URL state
  const queryStatus = searchParams.get("status") || "ALL";
  const queryUnit = searchParams.get("unit") || "ALL";
  const queryPriority = searchParams.get("priority") || "ALL";

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(queryStatus);
  const [unitFilter, setUnitFilter] = useState(queryUnit);
  const [priorityFilter, setPriorityFilter] = useState(queryPriority);

  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (unitFilter !== "ALL") params.set("unit", unitFilter);
    if (priorityFilter !== "ALL") params.set("priority", priorityFilter);
    
    const newSearch = params.toString();
    const currentPath = window.location.pathname;
    window.history.replaceState(null, '', `${currentPath}${newSearch ? `?${newSearch}` : ''}`);
  }, [statusFilter, unitFilter, priorityFilter]);

  useEffect(() => {
    if (queryStatus !== statusFilter) setStatusFilter(queryStatus);
    if (queryUnit !== unitFilter) setUnitFilter(queryUnit);
    if (queryPriority !== priorityFilter) setPriorityFilter(queryPriority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "ALL" || unitFilter !== "ALL" || priorityFilter !== "ALL";

  const handleReset = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setUnitFilter("ALL");
    setPriorityFilter("ALL");
  };

  const roleFilterOptions = user?.role === "PERAWAT" ? [user.unit] : undefined;

  // Filter Engine
  const filteredData = useMemo(() => {
    let data = requests;

    if (user?.role === "PERAWAT" && user.unit) {
      data = data.filter(item => item.unit === user.unit);
    } else if (unitFilter !== "ALL") {
      data = data.filter(item => item.unit === unitFilter);
    }

    if (statusFilter !== "ALL") {
      data = data.filter(item => item.status === statusFilter);
    }

    if (priorityFilter !== "ALL") {
      data = data.filter(item => item.priority === priorityFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.id.toLowerCase().includes(q) || 
        item.unit.toLowerCase().includes(q) ||
        item.requesterName.toLowerCase().includes(q) ||
        item.items.some(i => i.name.toLowerCase().includes(q))
      );
    }

    // Sort: Priority -> Newest
    const priorityScore = { KRITIS: 1, TINGGI: 2, NORMAL: 3, RENDAH: 4 };
    data.sort((a, b) => {
      if (priorityScore[a.priority] !== priorityScore[b.priority]) {
        return priorityScore[a.priority] - priorityScore[b.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return data;
  }, [searchQuery, unitFilter, statusFilter, priorityFilter, user, requests]);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, unitFilter, statusFilter, priorityFilter]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  // KPI Calculation
  const kpiData = useMemo(() => {
    const baseData = user?.role === "PERAWAT" ? requests.filter(i => i.unit === user.unit) : requests;
    
    let pending = 0, processing = 0, critical = 0, completed = 0;
    
    baseData.forEach(item => {
      if (item.status === "MENUNGGU_VALIDASI" || item.status === "MENUNGGU_PERSETUJUAN") pending++;
      else if (item.status === "DIPROSES" || item.status === "DALAM_PENGIRIMAN") processing++;
      else if (item.status === "SELESAI") completed++;

      if (item.priority === "KRITIS" || item.priority === "TINGGI") critical++;
    });

    return { total: baseData.length, pending, processing, critical, completed };
  }, [user, requests]);

  const metrics: DashboardMetric[] = [
    { id: "k1", title: "TOTAL PERMINTAAN", value: kpiData.total, subtitle: "Seluruh request", status: "info" },
    { id: "k2", title: "MENUNGGU", value: kpiData.pending, subtitle: "Perlu validasi/acc", status: "warning" },
    { id: "k3", title: "DIPROSES", value: kpiData.processing, subtitle: "Sedang dikerjakan", status: "info" },
    { id: "k4", title: "PRIORITAS TINGGI", value: kpiData.critical, subtitle: "Kritis / Tinggi", status: "critical" },
    { id: "k5", title: "SELESAI", value: kpiData.completed, subtitle: "Telah dipenuhi", status: "success" },
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"]}>
      <div className="animate-in fade-in duration-500 pb-12 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <PageHeader 
            title="Permintaan Logistik" 
            description="Ajukan dan pantau kebutuhan logistik klinis secara terstruktur."
          />
          <div className="flex items-center gap-3 self-start md:self-auto mb-8 md:mb-0">
            {user?.role === "PERAWAT" && (
              <Link href="/permintaan/baru">
                <Button className="font-bold shadow-md shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" /> Buat Permintaan
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metrics.map(m => (
            <MetricCard key={m.id} metric={m} className="p-4" />
          ))}
        </div>

        {/* Filters */}
        <RequestToolbar 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
          unitFilter={unitFilter} setUnitFilter={setUnitFilter}
          onReset={handleReset} hasActiveFilters={hasActiveFilters}
          roleFilterOptions={roleFilterOptions}
        />

        {/* Table/Cards */}
        {filteredData.length === 0 ? (
          <EmptyState 
            icon={FileX}
            title={hasActiveFilters ? "Tidak ada permintaan yang sesuai" : "Belum ada permintaan"}
            description={hasActiveFilters ? "Ubah kriteria filter Anda." : (user?.role === "PERAWAT" ? "Anda belum membuat permintaan logistik." : "Belum ada permohonan logistik yang masuk.")}
            actionLabel={hasActiveFilters ? "Reset Filter" : (user?.role === "PERAWAT" ? "+ Buat Permintaan" : undefined)}
            onAction={hasActiveFilters ? handleReset : () => router.push("/permintaan/baru")}
          />
        ) : (
          <div className="space-y-4">
            <RequestTable requests={paginatedData} />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 bg-surface border border-border/50 rounded-2xl p-4 shadow-sm">
                <span className="text-sm font-medium text-muted-foreground">
                  Menampilkan {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} dari {totalItems} permintaan
                </span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" size="sm"
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
                    variant="outline" size="sm"
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
