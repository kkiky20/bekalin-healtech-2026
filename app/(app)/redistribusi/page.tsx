"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { useRequestStore } from "@/store/useRequestStore";
import { useRedistributionStore } from "@/store/useRedistributionStore";
import { ApprovedRequestTable } from "@/components/redistribution/ApprovedRequestTable";
import { RedistributionTable } from "@/components/redistribution/RedistributionTable";
import { MetricCard } from "@/components/dashboard/MetricCard";

export default function RedistributionPage() {
  const { user } = useAuthStore();
  const requests = useRequestStore(state => state.requests);
  const redistributions = useRedistributionStore(state => state.redistributions);

  // Derive data
  const approvedRequests = requests.filter(r => r.status === "DISETUJUI");
  
  // Metrics
  const activeRd = redistributions.filter(r => r.status === "ALLOCATED" || r.status === "READY");
  const pendingRequestsCount = approvedRequests.filter(r => !redistributions.some(rd => rd.requestId === r.id)).length;
  const completedToday = redistributions.filter(r => r.status === "COMPLETED" && r.updatedAt.includes(new Date().toISOString().split('T')[0])).length;
  const itemsAllocated = redistributions.reduce((acc, curr) => acc + curr.allocations.reduce((a, c) => a + c.allocatedQuantity, 0), 0);

  const metrics = [
    { id: "m1", title: "SIAP DIPENUHI", value: pendingRequestsCount, subtitle: "Request Approved", status: pendingRequestsCount > 0 ? "warning" : "default" },
    { id: "m2", title: "REDISTRIBUSI AKTIF", value: activeRd.length, subtitle: "Sedang diproses", status: "info" },
    { id: "m3", title: "ITEM DIALOKASIKAN", value: itemsAllocated, subtitle: "Total kuantitas", status: "success" },
    { id: "m4", title: "SELESAI HARI INI", value: completedToday, subtitle: "Pengiriman sukses", status: "default" },
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "MANAJER"]}>
      <div className="animate-in fade-in duration-500 pb-12 space-y-8">
        
        <PageHeader 
          title="Manajemen Redistribusi Stok" 
          description="Koordinasikan pemenuhan kebutuhan unit berdasarkan ketersediaan stok aktual."
        />

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m: any) => (
            <MetricCard key={m.id} metric={m} className="p-4" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ApprovedRequestTable requests={approvedRequests} />
          </div>
          <div className="space-y-4">
            <RedistributionTable records={redistributions} />
          </div>
        </div>

      </div>
    </RoleGuard>
  );
}
