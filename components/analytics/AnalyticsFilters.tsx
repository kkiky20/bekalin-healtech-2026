"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import { Calendar, Building, Package } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function AnalyticsFiltersContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
      <div className="flex-1 flex flex-col sm:flex-row gap-4">
        <div className="space-y-1.5 flex-1">
          <label className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Periode
          </label>
          <Select 
            value={searchParams.get("range") || "7d"} 
            onValueChange={(val) => router.push(pathname + "?" + createQueryString("range", val))}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="7d">7 Hari Terakhir</SelectItem>
              <SelectItem value="30d">30 Hari</SelectItem>
              <SelectItem value="90d">90 Hari</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 flex-1">
          <label className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5" />
            Unit
          </label>
          <Select 
            value={searchParams.get("unit") || "all"} 
            onValueChange={(val) => router.push(pathname + "?" + createQueryString("unit", val === "all" ? "" : val))}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Semua Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Unit</SelectItem>
              <SelectItem value="IGD">IGD</SelectItem>
              <SelectItem value="ICU">ICU</SelectItem>
              <SelectItem value="Rawat Inap">Rawat Inap</SelectItem>
              <SelectItem value="Farmasi">Farmasi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 flex-1">
          <label className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            Kategori
          </label>
          <Select 
            value={searchParams.get("category") || "all"} 
            onValueChange={(val) => router.push(pathname + "?" + createQueryString("category", val === "all" ? "" : val))}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="Obat">Obat</SelectItem>
              <SelectItem value="Alat Kesehatan">Alat Kesehatan</SelectItem>
              <SelectItem value="Bahan Medis Habis Pakai">BMHP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-end">
        <Button 
          variant="outline" 
          className="h-9 w-full sm:w-auto"
          onClick={() => router.push(pathname)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export function AnalyticsFilters() {
  return (
    <Suspense fallback={<div className="h-[84px] bg-slate-100 animate-pulse rounded-xl mb-6"></div>}>
      <AnalyticsFiltersContent />
    </Suspense>
  );
}
