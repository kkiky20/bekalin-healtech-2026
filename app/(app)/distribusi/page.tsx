"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { useRedistributionStore } from "@/store/useRedistributionStore";
import { DistributionTable } from "@/components/distribution/DistributionTable";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

export default function DistribusiPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Memuat data distribusi...</div>}>
      <DistribusiContent />
    </Suspense>
  );
}

function DistribusiContent() {
  const { user } = useAuthStore();
  const redistributions = useRedistributionStore(state => state.redistributions);
  const searchParams = useSearchParams();
  const queryStatus = searchParams.get("status");

  const scopedData = useMemo(() => {
    if (user?.role === "PERAWAT") {
      return redistributions.filter(rd => rd.destinationUnit === user.unit && rd.status !== "DRAFT");
    }
    return redistributions;
  }, [redistributions, user]);

  const displayData = useMemo(() => {
    if (queryStatus) {
      return scopedData.filter(rd => rd.status.toLowerCase() === queryStatus.toLowerCase());
    }
    return [...scopedData].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [scopedData, queryStatus]);

  const readyToProcess = scopedData.filter(r => r.status === "ALLOCATED").length;
  const processing = scopedData.filter(r => r.status === "PROCESSING").length;
  const inDelivery = scopedData.filter(r => r.status === "IN_DELIVERY").length;
  const waitingConfirm = scopedData.filter(r => r.status === "RECEIVED").length;

  const metrics = [
    { id: "m1", title: "Siap Diproses", value: readyToProcess, subtitle: "Dialokasikan", status: readyToProcess > 0 ? "warning" : "default" },
    { id: "m2", title: "Sedang Diproses", value: processing, subtitle: "Pengepakan", status: "info" },
    { id: "m3", title: "Dalam Pengiriman", value: inDelivery, subtitle: "Menuju unit", status: "info" },
    { id: "m4", title: "Perlu Konfirmasi", value: waitingConfirm, subtitle: "Menunggu penerimaan", status: waitingConfirm > 0 ? "warning" : "default" },
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "MANAJER", "PERAWAT"]}>
      <div className="animate-in fade-in duration-500 pb-12 space-y-8">
        
        <PageHeader 
          title="Tracking Distribusi" 
          description="Pantau proses pemenuhan dan distribusi logistik dari sumber hingga unit tujuan."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <MetricCard key={m.id} metric={m as any} className="p-4" />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-foreground">Daftar Distribusi</h3>
            {queryStatus && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                Filter aktif: {queryStatus.replace("_", " ")}
              </span>
            )}
          </div>
          <DistributionTable records={displayData} />
        </div>

      </div>
    </RoleGuard>
  );
}
