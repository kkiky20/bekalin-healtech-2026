"use client";

import { use, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { useRequestStore } from "@/store/useRequestStore";
import { RequestStatusBadge } from "@/components/requests/RequestStatusBadge";
import { RequestTimeline } from "@/components/requests/RequestTimeline";
import { RequestSummary } from "@/components/requests/RequestSummary";
import { RequestItemReview } from "@/components/approvals/RequestItemReview";
import { ReviewInsight } from "@/components/approvals/ReviewInsight";
import { ValidationChecklist } from "@/components/approvals/ValidationChecklist";
import { ReviewHistory } from "@/components/approvals/ReviewHistory";
import { RejectionDialog } from "@/components/approvals/RejectionDialog";
import { canValidateRequest, canApproveRequest, canRejectRequest } from "@/utils/request-workflow";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, ClipboardCheck, PackageCheck } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

export default function ApprovalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuthStore();
  const { requests, validateRequest, approveRequest, rejectRequest } = useRequestStore();
  
  const request = requests.find(r => r.id === id);
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isChecklistCompleted, setChecklistCompleted] = useState(false);

  if (!request) {
    notFound();
  }

  // Permissions logic
  const canValidate = canValidateRequest(user?.role, request);
  const canApprove = canApproveRequest(user?.role, request);
  const canReject = canRejectRequest(user?.role, request);
  
  const showChecklist = canValidate; // Admin gudang only

  const handleValidate = () => {
    if (!isChecklistCompleted) {
      alert("Harap lengkapi semua checklist validasi administratif terlebih dahulu.");
      return;
    }
    if (confirm("Validasi permintaan ini dan teruskan ke tahap persetujuan?")) {
      validateRequest(request.id, user, "Dokumen telah diperiksa kelengkapannya.");
      alert("Permintaan berhasil divalidasi.");
    }
  };

  const handleApprove = () => {
    if (confirm(`Setujui permintaan ${request.id} dengan total ${request.items.length} item?\n\nPerhatian: Penyetujuan tidak otomatis memotong stok Gudang. Pemenuhan akan dilakukan di tahap Distribusi.`)) {
      approveRequest(request.id, user, "Disetujui sesuai kuantitas yang diminta.");
      alert("Permintaan berhasil disetujui.");
    }
  };

  const handleReject = (reason: string) => {
    rejectRequest(request.id, user, reason);
    setRejectDialogOpen(false);
    alert("Permintaan telah ditolak.");
  };

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "MANAJER"]}>
      <div className="animate-in fade-in duration-500 pb-24 lg:pb-12 space-y-6 max-w-7xl mx-auto">
        
        <Link 
          href="/persetujuan" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Persetujuan
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{request.id}</h1>
              <RequestStatusBadge status={request.status} />
            </div>
            {request.priority === "KRITIS" && (
              <p className="text-sm font-bold text-red-600 dark:text-red-400 mt-2 px-3 py-1.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 inline-block rounded-lg">
                Permintaan prioritas kritis! Memerlukan perhatian segera.
              </p>
            )}
          </div>
        </div>

        {/* Timeline */}
        <RequestTimeline status={request.status} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Context */}
          <div className="lg:col-span-2 space-y-6">
            <ReviewInsight items={request.items} />
            <RequestItemReview items={request.items} />
            <ReviewHistory history={request.history} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <RequestSummary request={request} />

            {showChecklist && (
              <ValidationChecklist request={request} onCheck={setChecklistCompleted} />
            )}

            {/* Action Bar */}
            {(canValidate || canApprove || canReject || request.status === "DISETUJUI") && (
              <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-foreground mb-4">Keputusan</h3>
                
                <div className="space-y-3">
                  {canValidate && (
                    <Button 
                      className="w-full font-bold shadow-md shadow-primary/20 h-11"
                      onClick={handleValidate}
                      disabled={!isChecklistCompleted}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Validasi Permintaan
                    </Button>
                  )}

                  {canApprove && (
                    <Button 
                      className="w-full font-bold shadow-md shadow-primary/20 bg-emerald-600 hover:bg-emerald-700 text-white h-11"
                      onClick={handleApprove}
                    >
                      <ClipboardCheck className="w-4 h-4 mr-2" /> Setujui Permintaan
                    </Button>
                  )}

                  {canReject && (
                    <Button 
                      variant="outline"
                      className="w-full font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-11"
                      onClick={() => setRejectDialogOpen(true)}
                    >
                      <XCircle className="w-4 h-4 mr-2" /> Tolak
                    </Button>
                  )}
                  {request.status === "DISETUJUI" && (
                    <Link href={`/redistribusi/baru?request=${request.id}`}>
                      <Button 
                        className="w-full font-bold shadow-md shadow-primary/20 bg-blue-600 hover:bg-blue-700 text-white h-11"
                      >
                        <PackageCheck className="w-4 h-4 mr-2" /> Atur Redistribusi
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RejectionDialog 
        isOpen={isRejectDialogOpen} 
        onClose={() => setRejectDialogOpen(false)} 
        onConfirm={handleReject} 
      />
    </RoleGuard>
  );
}
