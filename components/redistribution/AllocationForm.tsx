"use client";

import { useState } from "react";
import { LogisticsRequest, RequestItem } from "@/types/request";
import { StockAllocation, AllocationRisk } from "@/types/redistribution";
import { MOCK_STOCK_DATA } from "@/mock/stock";
import { StockItem } from "@/types/stock";
import { calculateMaxSafeAllocation, getAllocationRisk } from "@/utils/redistribution";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AllocationFormProps {
  request: LogisticsRequest;
  onConfirm: (allocations: StockAllocation[]) => void;
}

// Inner component to handle each item's allocation
function ItemAllocation({ 
  item, 
  allocations, 
  onChange 
}: { 
  item: RequestItem; 
  allocations: StockAllocation[]; 
  onChange: (allocs: StockAllocation[]) => void; 
}) {
  // Find candidates based on name
  const candidates = MOCK_STOCK_DATA.filter(s => s.name === item.name && s.currentStock > 0);
  
  const handleAddSource = (stockId: string) => {
    if (allocations.find(a => a.stockItemId === stockId)) return;
    
    const stockItem = candidates.find(c => c.id === stockId);
    if (!stockItem) return;

    const newAlloc: StockAllocation = {
      id: `ALC-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      stockItemId: stockId,
      sourceUnitId: stockItem.unit,
      requestedQuantity: item.quantity,
      allocatedQuantity: 0,
      batchId: stockItem.batch,
      expirationDate: stockItem.expirationDate
    };
    onChange([...allocations, newAlloc]);
  };

  const handleRemoveSource = (id: string) => {
    onChange(allocations.filter(a => a.id !== id));
  };

  const handleUpdateQty = (id: string, qty: number) => {
    onChange(allocations.map(a => a.id === id ? { ...a, allocatedQuantity: qty } : a));
  };

  const totalAllocated = allocations.reduce((sum, a) => sum + a.allocatedQuantity, 0);

  return (
    <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-border/50 flex justify-between items-center bg-muted/10">
        <div>
          <h4 className="font-bold text-foreground">{item.name}</h4>
          <p className="text-xs font-medium text-muted-foreground mt-0.5">Diminta: {item.quantity} {item.unitType}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Status Alokasi</p>
          {totalAllocated === item.quantity ? (
            <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Terpenuhi
            </span>
          ) : totalAllocated > 0 ? (
            <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">
              Sebagian ({totalAllocated}/{item.quantity})
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
              Belum Dialokasikan
            </span>
          )}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Source Candidates */}
        <div className="flex flex-wrap gap-2">
          {candidates.map(candidate => {
            const isSelected = allocations.some(a => a.stockItemId === candidate.id);
            const safeQty = calculateMaxSafeAllocation(candidate.currentStock, candidate.minimumStock);
            
            return (
              <button
                key={candidate.id}
                type="button"
                onClick={() => handleAddSource(candidate.id)}
                disabled={isSelected}
                className={cn(
                  "text-left p-3 rounded-xl border transition-all min-w-[200px]",
                  isSelected 
                    ? "bg-primary/5 border-primary/30 opacity-50 cursor-not-allowed" 
                    : "bg-surface border-border/50 hover:border-primary/50 cursor-pointer shadow-sm"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-sm">{candidate.unit}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-muted-foreground">Stok: <strong className="text-foreground">{candidate.currentStock}</strong></span>
                  <span className="text-emerald-600 font-semibold">Aman: {safeQty}</span>
                </div>
              </button>
            );
          })}
          {candidates.length === 0 && (
            <div className="text-sm text-red-500 font-medium p-3 bg-red-50 border border-red-100 rounded-xl">
              Data sumber stok tidak tersedia untuk item ini.
            </div>
          )}
        </div>

        {/* Selected Sources Input */}
        {allocations.length > 0 && (
          <div className="mt-6 border border-border/50 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 border-b border-border/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Sumber</th>
                  <th className="px-4 py-3 text-center">Batch / Exp</th>
                  <th className="px-4 py-3 w-32">Kuantitas</th>
                  <th className="px-4 py-3">Risiko Sumber</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {allocations.map((alloc) => {
                  const stockItem = candidates.find(c => c.id === alloc.stockItemId);
                  const remaining = (stockItem?.currentStock || 0) - alloc.allocatedQuantity;
                  const risk = getAllocationRisk(remaining, stockItem?.minimumStock || 0);
                  
                  return (
                    <tr key={alloc.id} className="bg-surface">
                      <td className="px-4 py-3 font-semibold">{alloc.sourceUnitId}</td>
                      <td className="px-4 py-3 text-center">
                        <p className="text-xs font-bold text-foreground">{alloc.batchId || "-"}</p>
                        <p className="text-[10px] font-medium text-muted-foreground">{alloc.expirationDate || "-"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Input 
                          type="number"
                          min={0}
                          max={stockItem?.currentStock || 0}
                          value={alloc.allocatedQuantity || ""}
                          onChange={(e) => handleUpdateQty(alloc.id, parseInt(e.target.value) || 0)}
                          className="h-8 w-20 text-center font-bold"
                        />
                      </td>
                      <td className="px-4 py-3">
                        {risk === "SAFE" && <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Aman</span>}
                        {risk === "LOW" && <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">Menipis</span>}
                        {risk === "CRITICAL" && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded flex items-center w-fit"><ShieldAlert className="w-3 h-3 mr-1"/> Kritis</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleRemoveSource(alloc.id)} className="text-muted-foreground hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function AllocationForm({ request, onConfirm }: AllocationFormProps) {
  // state: Record<RequestItemId, StockAllocation[]>
  const [allocationMap, setAllocationMap] = useState<Record<string, StockAllocation[]>>({});

  const handleItemChange = (itemId: string, allocs: StockAllocation[]) => {
    setAllocationMap(prev => ({ ...prev, [itemId]: allocs }));
  };

  const handleConfirm = () => {
    const allAllocations = Object.values(allocationMap).flat();
    
    // Validations
    if (allAllocations.length === 0) {
      alert("Belum ada item yang dialokasikan.");
      return;
    }
    
    const hasZero = allAllocations.some(a => a.allocatedQuantity <= 0);
    if (hasZero) {
      alert("Terdapat alokasi dengan kuantitas 0. Harap perbaiki atau hapus sumber.");
      return;
    }

    const hasExceeded = request.items.some(item => {
      const total = (allocationMap[item.id] || []).reduce((s, a) => s + a.allocatedQuantity, 0);
      return total > item.quantity;
    });

    if (hasExceeded) {
      alert("Terdapat item yang dialokasikan melebihi jumlah permintaan.");
      return;
    }

    onConfirm(allAllocations);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {request.items.map(item => (
          <ItemAllocation 
            key={item.id} 
            item={item} 
            allocations={allocationMap[item.id] || []} 
            onChange={(allocs) => handleItemChange(item.id, allocs)} 
          />
        ))}
      </div>

      <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm sticky bottom-6 z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-bold text-foreground">Konfirmasi Pemenuhan</h4>
          <p className="text-sm font-medium text-muted-foreground mt-1">Pastikan sumber dan kuantitas sudah sesuai sebelum dikonfirmasi.</p>
        </div>
        <Button 
          size="lg" 
          className="w-full md:w-auto font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          onClick={handleConfirm}
        >
          Buat Redistribusi <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
