"use client";

import { use } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { useRedistributionStore } from "@/store/useRedistributionStore";
import { RedistributionTimeline } from "@/components/redistribution/RedistributionTimeline";
import { AllocationTable } from "@/components/redistribution/AllocationTable";
import { ReviewHistory } from "@/components/approvals/ReviewHistory"; // Reuse
import { Button } from "@/components/ui/button";
import { ArrowLeft, PackageCheck, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function RedistributionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { redistributions } = useRedistributionStore();
  
  const record = redistributions.find(r => r.id === id);

  if (!record) {
    notFound();
  }

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "MANAJER"]}>
      <div className="animate-in fade-in duration-500 pb-24 lg:pb-12 space-y-6 max-w-7xl mx-auto">
        
        <Link 
          href="/redistribusi" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Manajemen Redistribusi
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{record.id}</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                {record.status}
              </span>
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4" /> Request: {record.requestId}
              </span>
              <span className="flex items-center gap-1.5 text-foreground font-bold">
                <MapPin className="w-4 h-4 text-emerald-500" /> Tujuan: {record.destinationUnit}
              </span>
            </div>
          </div>
          
          <div className="shrink-0">
            <Link href={`/permintaan/${record.requestId}`}>
              <Button variant="outline" className="font-bold">
                Lihat Request Asli <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Timeline */}
        <RedistributionTimeline status={record.status} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AllocationTable allocations={record.allocations} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <ReviewHistory history={record.history} />
          </div>
        </div>

      </div>
    </RoleGuard>
  );
}
