"use client";

import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Akses Tidak Diizinkan" />
      
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-surface border border-red-500/20 dark:border-red-900/30 rounded-2xl shadow-sm">
        <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-6">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-3">403 - Akses Ditolak</h2>
        <p className="text-muted-foreground font-medium max-w-md mx-auto mb-8">
          Halaman ini tidak tersedia untuk role Anda. Silakan hubungi administrator jika Anda merasa ini adalah sebuah kesalahan.
        </p>
        <Button onClick={() => router.push("/dashboard")} className="font-bold px-8">
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
}
