"use client";

import { use, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useRequestStore } from "@/store/useRequestStore";
import { useRedistributionStore } from "@/store/useRedistributionStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { RequestContext } from "@/components/redistribution/RequestContext";
import { AllocationForm } from "@/components/redistribution/AllocationForm";
import { StockAllocation, RedistributionRecord } from "@/types/redistribution";
import { LogisticsRequest } from "@/types/request";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/button";

export default function CreateRedistributionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateRedistributionContent />
    </Suspense>
  );
}

function CreateRedistributionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const requests = useRequestStore(state => state.requests);
  const { redistributions, createRedistribution } = useRedistributionStore();
  
  const requestId = searchParams.get("request");
  const [request, setRequest] = useState<LogisticsRequest | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (requestId) {
      const found = requests.find(r => r.id === requestId);
      if (!found) {
        setError("Permintaan tidak ditemukan.");
      } else if (found.status !== "DISETUJUI") {
        setError("Permintaan belum disetujui. Redistribusi tidak dapat dilakukan.");
      } else if (redistributions.some(rd => rd.requestId === found.id)) {
        setError("Permintaan ini sudah memiliki redistribusi aktif.");
      } else {
        setRequest(found);
      }
    } else {
      setError("Request ID tidak valid.");
    }
  }, [requestId, requests, redistributions]);

  const handleConfirm = (allocations: StockAllocation[]) => {
    if (!request || !user) return;

    // Check if partial or full
    let isPartial = false;
    request.items.forEach(item => {
      const allocTotal = allocations.filter(a => a.stockItemId.includes(item.stockItemId) || a.stockItemId.includes(item.name)) // Simple matching for mock
        .reduce((sum, a) => sum + a.allocatedQuantity, 0);
      if (allocTotal < item.quantity) {
        isPartial = true; // In a real app we'd map properly
      }
    });

    const newRdId = `RD-2026-${String(redistributions.length + 1).padStart(3, '0')}`;
    
    const newRecord: RedistributionRecord = {
      id: newRdId,
      requestId: request.id,
      destinationUnit: request.unit,
      requesterName: request.requesterName,
      priority: request.priority,
      status: "ALLOCATED",
      allocations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.name,
      history: [
        {
          actorId: user.id,
          actorName: user.name,
          role: user.role,
          action: "CREATE_REDISTRIBUTION",
          timestamp: new Date().toISOString(),
          comment: `Mengalokasikan stok untuk ${allocations.length} item.`
        }
      ]
    };

    createRedistribution(newRecord);
    alert(`Redistribusi ${newRdId} berhasil dibuat.`);
    router.push(`/redistribusi/${newRdId}`);
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <EmptyState 
          icon={AlertCircle}
          title="Tidak Dapat Memproses"
          description={error}
          actionLabel="Kembali ke Daftar Permintaan"
          onAction={() => router.push("/redistribusi")}
        />
      </div>
    );
  }

  if (!request) return null;

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD"]}>
      <div className="animate-in fade-in duration-500 pb-12 space-y-6 max-w-5xl mx-auto">
        <Link 
          href="/redistribusi" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Redistribusi
        </Link>

        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">Atur Redistribusi Stok</h1>
          <p className="text-muted-foreground font-medium mt-1">Alokasikan stok yang tersedia untuk memenuhi permintaan unit.</p>
        </div>

        <RequestContext request={request} />

        <AllocationForm request={request} onConfirm={handleConfirm} />
        
      </div>
    </RoleGuard>
  );
}
