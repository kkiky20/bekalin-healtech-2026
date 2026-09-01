"use client";

import { use } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { useRedistributionStore } from "@/store/useRedistributionStore";
import { DistributionTimeline } from "@/components/distribution/DistributionTimeline";
import { DistributionStatusBadge } from "@/components/distribution/DistributionTable";
import { ReviewHistory } from "@/components/approvals/ReviewHistory";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Warehouse, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { startProcessing, dispatchDistribution, receiveDistribution, completeDistribution } from "@/utils/distribution-transaction";

export default function DistributionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuthStore();
  const { redistributions } = useRedistributionStore();
  
  const record = redistributions.find(r => r.id === id);

  if (!record) {
    notFound();
  }

  const handleProcess = () => {
    startProcessing(record.id, user);
    router.refresh();
  };

  const handleDispatch = () => {
    dispatchDistribution(record.id, user, {
      processedDate: new Date().toISOString(),
    });
    router.refresh();
  };

  const handleReceive = () => {
    receiveDistribution(record.id, user, {
      receivedDate: new Date().toISOString(),
      receivedBy: user?.name || "Unknown",
      discrepancies: {}
    });
    router.refresh();
  };

  const handleComplete = () => {
    completeDistribution(record.id, user);
    router.refresh();
  };

  const isAdmin = user?.role === "ADMIN_GUDANG";
  const isDest = user?.role === "PERAWAT" && user?.unit === record.destinationUnit;

  const hasAction = 
    (record.status === "ALLOCATED" && isAdmin) ||
    (record.status === "PROCESSING" && isAdmin) ||
    (record.status === "IN_DELIVERY" && isDest) ||
    (record.status === "RECEIVED" && isAdmin);

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "MANAJER", "PERAWAT"]}>
      <div className="animate-in fade-in duration-500 pb-24 lg:pb-12 space-y-6 max-w-5xl mx-auto">
        
        <Link 
          href="/distribusi" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Kembali
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-border/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">{record.id}</h1>
              <DistributionStatusBadge status={record.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Referensi permintaan: <span className="font-semibold text-foreground">{record.requestId}</span>
            </p>
          </div>
          
          <div className="hidden md:flex gap-3">
            {record.status === "ALLOCATED" && isAdmin && (
              <Button onClick={handleProcess} className="font-semibold">
                Proses Distribusi
              </Button>
            )}
            {record.status === "PROCESSING" && isAdmin && (
              <Button onClick={handleDispatch} className="font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                Mulai Pengiriman
              </Button>
            )}
            {record.status === "IN_DELIVERY" && isDest && (
              <Button onClick={handleReceive} className="font-semibold bg-emerald-600 hover:bg-emerald-700 text-white">
                Konfirmasi Penerimaan
              </Button>
            )}
            {record.status === "RECEIVED" && isAdmin && (
              <Button onClick={handleComplete} className="font-semibold">
                Selesaikan Distribusi
              </Button>
            )}
          </div>
        </div>

        {/* Route Topology */}
        <div className="flex items-center justify-center gap-6 py-8 bg-muted/20 border border-border/50 rounded-2xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Warehouse className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sumber</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground/40">
            <div className="w-12 h-px bg-border" />
            <ChevronsRight className="w-5 h-5" />
            <div className="w-12 h-px bg-border" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">{record.destinationUnit}</span>
          </div>
        </div>

        <DistributionTimeline status={record.status} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50">
                <h3 className="font-semibold text-foreground">Daftar Item</h3>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-muted/30 text-xs text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold">ID Item</th>
                    <th className="text-left px-6 py-3 font-semibold">Sumber</th>
                    <th className="text-right px-6 py-3 font-semibold">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {record.allocations.map(a => (
                    <tr key={a.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{a.stockItemId}</td>
                      <td className="px-6 py-4 text-muted-foreground">{a.sourceUnitId}</td>
                      <td className="px-6 py-4 text-right font-bold text-foreground">{a.allocatedQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ReviewHistory history={record.history} />
          </div>
        </div>

        {hasAction && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/50 z-50 md:hidden flex justify-end gap-3">
            {record.status === "ALLOCATED" && isAdmin && (
              <Button onClick={handleProcess} className="w-full font-semibold">
                Proses Distribusi
              </Button>
            )}
            {record.status === "PROCESSING" && isAdmin && (
              <Button onClick={handleDispatch} className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                Mulai Pengiriman
              </Button>
            )}
            {record.status === "IN_DELIVERY" && isDest && (
              <Button onClick={handleReceive} className="w-full font-semibold bg-emerald-600 hover:bg-emerald-700 text-white">
                Konfirmasi Penerimaan
              </Button>
            )}
            {record.status === "RECEIVED" && isAdmin && (
              <Button onClick={handleComplete} className="w-full font-semibold">
                Selesaikan Distribusi
              </Button>
            )}
          </div>
        )}

      </div>
    </RoleGuard>
  );
}
