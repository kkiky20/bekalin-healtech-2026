"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import { Calendar, Building, Package, Filter, X } from "lucide-react";
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

  const hasActiveFilters = searchParams.get("unit") || searchParams.get("category") || (searchParams.get("range") && searchParams.get("range") !== "7d");

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200/60 shadow-sm mb-6">
      <div className="flex items-center px-3 py-1.5 border-r border-slate-100 hidden lg:flex text-slate-400">
        <Filter className="w-4 h-4 mr-2" />
        <span className="text-xs font-semibold uppercase tracking-wider">Filter</span>
      </div>
      
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="relative group">
          <Select 
            value={searchParams.get("range") || "7d"} 
            onValueChange={(val: string | null) => router.push(pathname + "?" + createQueryString("range", val || ""))}
          >
            <SelectTrigger className="w-full h-10 bg-slate-50/50 border-transparent hover:border-slate-200 hover:bg-white transition-all rounded-xl pl-9 font-medium text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3" />
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="7d">7 Hari Terakhir</SelectItem>
              <SelectItem value="30d">30 Hari</SelectItem>
              <SelectItem value="90d">90 Hari</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative group">
          <Select 
            value={searchParams.get("unit") || "all"} 
            onValueChange={(val: string | null) => router.push(pathname + "?" + createQueryString("unit", val === "all" ? "" : (val || "")))}
          >
            <SelectTrigger className="w-full h-10 bg-slate-50/50 border-transparent hover:border-slate-200 hover:bg-white transition-all rounded-xl pl-9 font-medium text-slate-700">
              <Building className="w-4 h-4 text-slate-400 absolute left-3" />
              <SelectValue placeholder="Semua Unit" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Semua Unit</SelectItem>
              <SelectItem value="IGD">IGD</SelectItem>
              <SelectItem value="ICU">ICU</SelectItem>
              <SelectItem value="Rawat Inap">Rawat Inap</SelectItem>
              <SelectItem value="Farmasi">Farmasi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative group">
          <Select 
            value={searchParams.get("category") || "all"} 
            onValueChange={(val: string | null) => router.push(pathname + "?" + createQueryString("category", val === "all" ? "" : (val || "")))}
          >
            <SelectTrigger className="w-full h-10 bg-slate-50/50 border-transparent hover:border-slate-200 hover:bg-white transition-all rounded-xl pl-9 font-medium text-slate-700">
              <Package className="w-4 h-4 text-slate-400 absolute left-3" />
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="Obat">Obat</SelectItem>
              <SelectItem value="Alat Kesehatan">Alat Kesehatan</SelectItem>
              <SelectItem value="Bahan Medis Habis Pakai">BMHP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          className="h-10 px-4 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl font-semibold"
          onClick={() => router.push(pathname)}
        >
          <X className="w-4 h-4 mr-1.5" />
          Reset
        </Button>
      )}
    </div>
  );
}

export function AnalyticsFilters() {
  return (
    <Suspense fallback={<div className="h-[56px] bg-slate-100 animate-pulse rounded-2xl mb-6 border border-slate-200/50"></div>}>
      <AnalyticsFiltersContent />
    </Suspense>
  );
}
