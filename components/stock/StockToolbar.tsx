"use client";

import { Search, RotateCcw, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StockToolbarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  unitFilter: string;
  setUnitFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  roleFilterOptions?: string[]; // If we want to restrict units
}

export function StockToolbar({
  searchQuery, setSearchQuery,
  categoryFilter, setCategoryFilter,
  unitFilter, setUnitFilter,
  statusFilter, setStatusFilter,
  onReset, hasActiveFilters,
  roleFilterOptions
}: StockToolbarProps) {
  
  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center mb-6">
      <div className="relative w-full md:w-96 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          type="text"
          placeholder="Cari nama item, kode, batch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-10 rounded-lg bg-muted/50 border-transparent focus-visible:bg-background shadow-none"
        />
      </div>

      <div className="flex-1 flex flex-wrap items-center gap-3 w-full">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-1 hidden lg:flex">
          <Filter className="w-4 h-4" /> Filter:
        </div>
        
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 text-foreground"
        >
          <option value="ALL">Semua Kategori</option>
          <option value="Obat">Obat</option>
          <option value="Alat Kesehatan">Alat Kesehatan</option>
          <option value="Bahan Medis Habis Pakai">Bahan Medis Habis Pakai</option>
          <option value="Alat Steril">Alat Steril</option>
        </select>

        <select 
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          className="h-10 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 text-foreground"
        >
          <option value="ALL">Semua Unit</option>
          {roleFilterOptions ? roleFilterOptions.map(u => <option key={u} value={u}>{u}</option>) : (
            <>
              <option value="Gudang Utama">Gudang Utama</option>
              <option value="IGD">IGD</option>
              <option value="Rawat Jalan">Rawat Jalan</option>
              <option value="Rawat Inap">Rawat Inap</option>
              <option value="CSSD">CSSD</option>
              <option value="Farmasi">Farmasi</option>
            </>
          )}
        </select>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 text-foreground"
        >
          <option value="ALL">Semua Status</option>
          <option value="SAFE">Aman</option>
          <option value="LOW">Menipis</option>
          <option value="CRITICAL">Kritis</option>
          <option value="EXPIRING_SOON">Segera Expired</option>
          <option value="EXPIRED">Expired</option>
        </select>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground h-10 ml-auto md:ml-0"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        )}
      </div>
    </div>
  );
}
