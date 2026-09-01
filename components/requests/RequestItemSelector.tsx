"use client";

import { useState } from "react";
import { MOCK_STOCK_DATA } from "@/mock/stock";
import { StockItem } from "@/types/stock";
import { getStockStatus, getStatusText } from "@/utils/stock";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RequestItemSelectorProps {
  onSelectItem: (item: StockItem) => void;
  selectedIds: string[];
}

export function RequestItemSelector({ onSelectItem, selectedIds }: RequestItemSelectorProps) {
  const [search, setSearch] = useState("");

  const filteredItems = search 
    ? MOCK_STOCK_DATA.filter(item => 
        (item.name.toLowerCase().includes(search.toLowerCase()) || 
         item.code.toLowerCase().includes(search.toLowerCase())) &&
        !selectedIds.includes(item.id)
      ).slice(0, 5) // limit to 5
    : [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Cari item obat, bhp, atau alkes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 bg-muted/30 focus-visible:bg-background"
        />
      </div>

      {search && filteredItems.length > 0 && (
        <div className="bg-surface border border-border/50 rounded-xl overflow-hidden shadow-sm divide-y divide-border/50">
          {filteredItems.map(item => {
            const status = getStockStatus(item);
            const isLow = status === "LOW" || status === "CRITICAL";

            return (
              <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/20 transition-colors">
                <div>
                  <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-muted-foreground">{item.code} • {item.unit}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 shrink-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Stok Saat Ini</p>
                    <div className="flex items-baseline gap-1.5 md:justify-end">
                      <span className={cn("text-sm font-bold", isLow ? "text-red-600" : "text-foreground")}>
                        {item.currentStock}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">/ Min {item.minimumStock}</span>
                    </div>
                    {isLow && (
                      <span className="text-[10px] font-bold text-red-600 mt-0.5 block">
                        Stok di bawah minimum
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => {
                      onSelectItem(item);
                      setSearch(""); // reset after selection
                    }}
                    className="w-full md:w-auto"
                  >
                    <Plus className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Pilih</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {search && filteredItems.length === 0 && (
        <div className="text-center p-6 text-muted-foreground text-sm border border-dashed rounded-xl bg-muted/10">
          Tidak ada item yang ditemukan.
        </div>
      )}
    </div>
  );
}
