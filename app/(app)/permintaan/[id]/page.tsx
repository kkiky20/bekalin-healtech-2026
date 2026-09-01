"use client";

import { use } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { useRequestStore } from "@/store/useRequestStore";
import { RequestStatusBadge } from "@/components/requests/RequestStatusBadge";
import { RequestTimeline } from "@/components/requests/RequestTimeline";
import { RequestItemList } from "@/components/requests/RequestItemList";
import { RequestSummary } from "@/components/requests/RequestSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle, CheckCircle, Search, Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const { user } = useAuthStore();
  const { requests, cancelRequest, updateRequestStatus } = useRequestStore();
  const request = requests.find(r => r.id === id);

  if (!request) {
    notFound();
  }

  // Permissions logic
  const canCancel = (user?.role === "PERAWAT" && user?.unit === request.unit) && 
                    (request.status === "DRAFT" || request.status === "MENUNGGU_VALIDASI");
  
  const canEdit = (user?.role === "PERAWAT" && user?.unit === request.unit) && request.status === "DRAFT";

  const canValidate = user?.role === "ADMIN_GUDANG" && request.status === "MENUNGGU_VALIDASI";

  const handleCancel = () => {
    if (confirm("Batalkan permintaan? Data yang sudah diajukan akan ditarik kembali.")) {
      cancelRequest(request.id);
    }
  };

  const handleValidate = () => {
    updateRequestStatus(request.id, "MENUNGGU_PERSETUJUAN"); // Simple mock transition
  };

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"]}>
      <div className="animate-in fade-in duration-500 pb-12 space-y-6">
        
        {/* Breadcrumb / Back Link */}
        <Link 
          href="/permintaan" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Permintaan
        </Link>

        {/* Detail Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{request.id}</h1>
              <RequestStatusBadge status={request.status} />
            </div>
            {request.priority === "KRITIS" && (
              <p className="text-sm font-bold text-red-600 dark:text-red-400 mt-2">
                Permintaan prioritas kritis!
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {canEdit && (
              <Button variant="outline" className="font-bold">
                <Edit className="w-4 h-4 mr-2" /> Edit Permintaan
              </Button>
            )}
            
            {canCancel && (
              <Button variant="outline" className="font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={handleCancel}>
                <XCircle className="w-4 h-4 mr-2" /> Batalkan Permintaan
              </Button>
            )}

            {canValidate && (
              <>
                <Button variant="outline" className="font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => updateRequestStatus(request.id, "DITOLAK")}>
                  Tolak
                </Button>
                <Button className="font-bold shadow-md shadow-primary/20" onClick={handleValidate}>
                  <CheckCircle className="w-4 h-4 mr-2" /> Validasi
                </Button>
              </>
            )}

            {user?.role === "ADMIN_GUDANG" && !canValidate && (request.status === "MENUNGGU_VALIDASI" || request.status === "MENUNGGU_PERSETUJUAN") && (
               <Link href={`/persetujuan/${request.id}`}>
                 <Button variant="outline" className="font-bold">
                   <Search className="w-4 h-4 mr-2" /> Review di Persetujuan
                 </Button>
               </Link>
            )}
            
            {user?.role === "ADMIN_GUDANG" && request.status === "DISETUJUI" && (
               <Link href={`/redistribusi/baru?request=${request.id}`}>
                 <Button className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                   Atur Redistribusi
                 </Button>
               </Link>
            )}
          </div>
        </div>

        {/* Timeline */}
        <RequestTimeline status={request.status} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RequestItemList items={request.items} />
          </div>
          <div className="lg:col-span-1">
            <RequestSummary request={request} />
          </div>
        </div>
        
      </div>
    </RoleGuard>
  );
}
