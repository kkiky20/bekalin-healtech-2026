"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRequestStore } from "@/store/useRequestStore";
import { RequestToolbar } from "@/components/requests/RequestToolbar";
import { ApprovalTable } from "@/components/approvals/ApprovalTable";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { DashboardMetric } from "@/types/dashboard";
import { FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function ApprovalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApprovalContent />
    </Suspense>
  );
}

function ApprovalContent() {
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

  // Filter Engine
  const filteredData = useMemo(() => {
    let data = requests;

    if (unitFilter !== "ALL") {
      data = data.filter(item => item.unit === unitFilter);
    }

    if (statusFilter !== "ALL") {
      // Normalize 'pending_validation' query params from dashboard to 'MENUNGGU_VALIDASI'
      if (statusFilter === "pending_validation") data = data.filter(item => item.status === "MENUNGGU_VALIDASI");
      else if (statusFilter === "pending_approval") data = data.filter(item => item.status === "MENUNGGU_PERSETUJUAN");
      else if (statusFilter === "critical") data = data.filter(item => item.priority === "KRITIS");
      else data = data.filter(item => item.status === statusFilter);
    } else {
      // Default view if no specific status requested: Show only actionable ones for the role
      if (user?.role === "ADMIN_GUDANG") {
        data = data.filter(item => item.status === "MENUNGGU_VALIDASI" || item.status === "MENUNGGU_PERSETUJUAN");
      } else if (user?.role === "MANAJER") {
        data = data.filter(item => item.status === "MENUNGGU_PERSETUJUAN" || item.status === "DISETUJUI");
      }
    }

    if (priorityFilter !== "ALL") {
      if (priorityFilter === "critical") data = data.filter(item => item.priority === "KRITIS");
      else data = data.filter(item => item.priority === priorityFilter);
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
    let pendingVal = 0, pendingApp = 0, highPrio = 0, criticalPrio = 0, approvedToday = 0, rejectedToday = 0;
    const today = new Date().toISOString().split('T')[0];

    requests.forEach(item => {
      if (item.status === "MENUNGGU_VALIDASI") pendingVal++;
      if (item.status === "MENUNGGU_PERSETUJUAN") pendingApp++;
      if (item.priority === "TINGGI") highPrio++;
      if (item.priority === "KRITIS") criticalPrio++;
      
      const itemUpdateDate = item.updatedAt.split('T')[0];
      if (itemUpdateDate === today) {
        if (item.status === "DISETUJUI") approvedToday++;
        if (item.status === "DITOLAK") rejectedToday++;
      }
    });

    return { pendingVal, pendingApp, highPrio, criticalPrio, approvedToday, rejectedToday };
  }, [requests]);

  const metrics: DashboardMetric[] = [
    { id: "k1", title: "MENUNGGU VALIDASI", value: kpiData.pendingVal, subtitle: "Tugas Admin Gudang", status: "warning" },
    { id: "k2", title: "MENUNGGU PERSETUJUAN", value: kpiData.pendingApp, subtitle: "Tugas Manajer", status: "warning" },
    { id: "k3", title: "PRIORITAS KRITIS", value: kpiData.criticalPrio, subtitle: "Tindakan Segera", status: "critical" },
    { id: "k4", title: "DISETUJUI HARI INI", value: kpiData.approvedToday, subtitle: "Siap diproses", status: "success" },
    { id: "k5", title: "DITOLAK HARI INI", value: kpiData.rejectedToday, subtitle: "Memerlukan peninjauan ulang", status: "info" },
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "MANAJER"]}>
      <div className="animate-in fade-in duration-500 pb-12 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <PageHeader 
            title="Persetujuan Permintaan" 
            description="Review dan kelola permintaan logistik berdasarkan kebutuhan, prioritas, dan ketersediaan stok."
          />
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
        />

        {/* Table/Cards */}
        {filteredData.length === 0 ? (
          <EmptyState 
            icon={FileX}
            title={hasActiveFilters ? "Tidak ada permintaan yang sesuai" : "Belum ada antrean pekerjaan"}
            description={hasActiveFilters ? "Ubah kriteria filter Anda." : "Semua permintaan telah divalidasi dan disetujui."}
            actionLabel={hasActiveFilters ? "Reset Filter" : undefined}
            onAction={hasActiveFilters ? handleReset : undefined}
          />
        ) : (
          <div className="space-y-4">
            <ApprovalTable requests={paginatedData} />
            
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
