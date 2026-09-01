"use client";

import { use } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { useStockStore } from "@/store/useStockStore";
import { getStockStatus, formatDate } from "@/utils/stock";
import { StockStatusBadge } from "@/components/stock/StockStatusBadge";
import { StockLevelCard } from "@/components/stock/StockLevelCard";
import { StockExpirationCard } from "@/components/stock/StockExpirationCard";
import { StockMovement } from "@/components/stock/StockMovement";
import { StockUsageChart } from "@/components/stock/StockUsageChart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Repeat2, Inbox, Search, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function StockDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const { user } = useAuthStore();
  const stockItems = useStockStore(state => state.stockItems);
  const item = stockItems.find(i => i.id === id);

  if (!item) {
    notFound();
  }

  const status = getStockStatus(item);

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"]}>
      <div className="animate-in fade-in duration-500 pb-12 space-y-6">
        
        {/* Breadcrumb / Back Link */}
        <Link 
          href="/monitoring-stok" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Monitoring Stok
        </Link>

        {/* Detail Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{item.name}</h1>
              <StockStatusBadge status={status} />
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
              <span>Kode: <strong className="text-foreground">{item.code}</strong></span>
              <span>Kategori: <strong className="text-foreground">{item.category}</strong></span>
              <span>Lokasi Unit: <strong className="text-foreground">{item.unit}</strong></span>
              <span>Supplier: <strong className="text-foreground">{item.supplier}</strong></span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            {user?.role === "ADMIN_GUDANG" && (
              <>
                <Button variant="outline" className="font-bold">
                  <Inbox className="w-4 h-4 mr-2" /> Catat Penerimaan
                </Button>
                <Button className="font-bold shadow-md shadow-primary/20">
                  <Repeat2 className="w-4 h-4 mr-2" /> Ajukan Redistribusi
                </Button>
              </>
            )}
            {user?.role === "PERAWAT" && (
              <Link href={`/permintaan/baru?item=${item.id}`}>
                <Button className="font-bold shadow-md shadow-primary/20">
                  <Plus className="w-4 h-4 mr-2" /> Buat Permintaan
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="text-xs font-semibold text-muted-foreground">
          Terakhir diperbarui: {formatDate(item.lastUpdated)}
        </div>

        {/* Grid 1: Levels & Expiration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StockLevelCard item={item} />
          <StockExpirationCard item={item} />
        </div>

        {/* Grid 2: Movement & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StockUsageChart data={item.usageTrend} />
          </div>
          <div className="lg:col-span-1 h-[400px]">
            <StockMovement movements={item.movements} />
          </div>
        </div>
        
      </div>
    </RoleGuard>
  );
}
