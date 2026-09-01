"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { UserCircle } from "lucide-react";

export default function profilPage() {
  return (
    <RoleGuard allowedRoles={['ADMIN_GUDANG', 'ADMIN_CSSD', 'PERAWAT', 'MANAJER']}>
      <div className="animate-in fade-in duration-500">
        <PageHeader 
          title="Profil Pengguna" 
          description="Modul ini sedang dalam tahap pengembangan." 
        />
        
        <EmptyState 
          icon={UserCircle}
          title="Profil Pengguna Belum Tersedia"
          description="Fitur ini akan dirilis pada iterasi pengembangan BEKALIN selanjutnya."
        />
      </div>
    </RoleGuard>
  );
}
