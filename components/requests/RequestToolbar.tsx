"use client";

import { Search, RotateCcw, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RequestToolbarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  priorityFilter: string;
  setPriorityFilter: (val: string) => void;
  unitFilter: string;
  setUnitFilter: (val: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  roleFilterOptions?: string[]; // If Perawat, unit is locked
}

export function RequestToolbar({
  searchQuery, setSearchQuery,
  statusFilter, setStatusFilter,
  priorityFilter, setPriorityFilter,
  unitFilter, setUnitFilter,
  onReset, hasActiveFilters,
  roleFilterOptions
}: RequestToolbarProps) {
  
  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 items-center mb-6">
      <div className="relative w-full lg:w-80 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          type="text"
          placeholder="Cari ID permintaan, item, unit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-10 rounded-lg bg-muted/50 border-transparent focus-visible:bg-background shadow-none"
        />
      </div>

      <div className="flex-1 flex flex-wrap items-center gap-3 w-full">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-1 hidden xl:flex">
          <Filter className="w-4 h-4" /> Filter:
        </div>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 text-foreground"
        >
          <option value="ALL">Semua Status</option>
          <option value="DRAFT">Draft</option>
          <option value="MENUNGGU_VALIDASI">Menunggu Validasi</option>
          <option value="MENUNGGU_PERSETUJUAN">Menunggu Persetujuan</option>
          <option value="DISETUJUI">Disetujui</option>
          <option value="DIPROSES">Diproses</option>
          <option value="DALAM_PENGIRIMAN">Dalam Pengiriman</option>
          <option value="SELESAI">Selesai</option>
          <option value="DITOLAK">Ditolak</option>
          <option value="DIBATALKAN">Dibatalkan</option>
        </select>
        
        <select 
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="h-10 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 text-foreground"
        >
          <option value="ALL">Semua Prioritas</option>
          <option value="RENDAH">Rendah</option>
          <option value="NORMAL">Normal</option>
          <option value="TINGGI">Tinggi</option>
          <option value="KRITIS">Kritis</option>
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

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground h-10 ml-auto xl:ml-0"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        )}
      </div>
    </div>
  );
}
