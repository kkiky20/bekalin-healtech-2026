"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { ChartNoAxesCombined } from "lucide-react";

export default function manajemenPage() {
  return (
    <RoleGuard allowedRoles={['MANAJER']}>
      <div className="animate-in fade-in duration-500">
        <PageHeader 
          title="Dashboard Manajemen" 
          description="Modul ini sedang dalam tahap pengembangan." 
        />
        
        <EmptyState 
          icon={ChartNoAxesCombined}
          title="Dashboard Manajemen Belum Tersedia"
          description="Fitur ini akan dirilis pada iterasi pengembangan BEKALIN selanjutnya."
        />
      </div>
    </RoleGuard>
  );
}
