"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useRequestStore } from "@/store/useRequestStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequestItemSelector } from "@/components/requests/RequestItemSelector";
import { StockItem } from "@/types/stock";
import { MOCK_STOCK_DATA } from "@/mock/stock";
import { RequestPriority, RequestItem } from "@/types/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, AlertCircle, Save, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CreateRequestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateRequestContent />
    </Suspense>
  );
}

function CreateRequestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const addRequest = useRequestStore(state => state.addRequest);
  const requests = useRequestStore(state => state.requests);

  // Form State
  const [priority, setPriority] = useState<RequestPriority>("NORMAL");
  const [note, setNote] = useState("");
  const [items, setItems] = useState<RequestItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  // Calculate generic incremental ID for demo
  const nextIdNum = requests.length + 1;
  const newRequestId = `PR-2026-${nextIdNum.toString().padStart(3, '0')}`;

  // Auto-add item from URL query (?item=id)
  useEffect(() => {
    const itemId = searchParams.get("item");
    if (itemId && items.length === 0) {
      const stockItem = MOCK_STOCK_DATA.find(i => i.id === itemId);
      if (stockItem) {
        setItems([
          {
            id: `draft-${Date.now()}`,
            stockItemId: stockItem.id,
            name: stockItem.name,
            category: stockItem.category,
            unitType: "Set", // Simplified
            quantity: 1,
            note: ""
          }
        ]);
      }
    }
  }, [searchParams]);

  const handleSelectItem = (stockItem: StockItem) => {
    // Only add if not already in list
    if (!items.find(i => i.stockItemId === stockItem.id)) {
      setItems([
        ...items,
        {
          id: `draft-${Date.now()}`,
          stockItemId: stockItem.id,
          name: stockItem.name,
          category: stockItem.category,
          unitType: "Set", // Fallback, would normally come from stock item definitions
          quantity: 1,
          note: ""
        }
      ]);
      setErrors([]);
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleQuantityChange = (id: string, qty: number) => {
    setItems(items.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));
  };

  const handleItemNoteChange = (id: string, itemNote: string) => {
    setItems(items.map(i => i.id === id ? { ...i, note: itemNote } : i));
  };

  const handleSubmit = () => {
    const newErrors = [];
    if (items.length === 0) {
      newErrors.push("Pilih minimal satu item logistik untuk diminta.");
    }
    
    if (items.some(i => i.quantity <= 0)) {
      newErrors.push("Jumlah item harus lebih dari 0.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock API Submission
    addRequest({
      id: newRequestId,
      unit: user?.unit || "Unit Ekstra", // fallback if no unit
      requesterName: user?.name || "Pemohon Unknown",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "MENUNGGU_VALIDASI",
      priority,
      note,
      items
    });

    // Success feedback could be toast here, for now just redirect
    router.push("/permintaan");
  };

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT"]}>
      <div className="animate-in fade-in duration-500 pb-24 lg:pb-12 space-y-6 max-w-5xl mx-auto">
        <PageHeader 
          title="Buat Permintaan Logistik" 
          description="Ajukan kebutuhan logistik unit Anda."
        />

        {errors.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4 flex flex-col gap-2">
            {errors.map((err, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" /> {err}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            
            <section className="bg-surface border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-foreground mb-6 pb-4 border-b border-border/50">Informasi Dasar</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Unit Pemohon
                  </label>
                  <div className="h-11 px-3 flex items-center rounded-lg bg-muted/50 border border-transparent text-sm font-semibold text-foreground">
                    {user?.unit || "Pilih Unit"}
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground mt-1">
                    Ditentukan berdasarkan profil akun Anda.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Prioritas Permintaan
                  </label>
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as RequestPriority)}
                    className="w-full h-11 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm font-semibold focus:outline-none focus:border-primary/50 text-foreground"
                  >
                    <option value="RENDAH">Rendah</option>
                    <option value="NORMAL">Normal</option>
                    <option value="TINGGI">Tinggi</option>
                    <option value="KRITIS">Kritis</option>
                  </select>
                  {priority === "KRITIS" && (
                    <p className="text-[10px] font-bold text-red-600 mt-1">
                      Gunakan prioritas kritis HANYA untuk kebutuhan mendesak yang mengganggu pelayanan operasional unit!
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Catatan (Opsional)
                  </label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tambahkan alasan atau informasi kebutuhan..."
                    className="w-full min-h-[100px] p-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 text-foreground resize-none"
                    maxLength={500}
                  />
                  <div className="text-right text-[10px] font-medium text-muted-foreground mt-1">
                    {note.length}/500
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-foreground mb-6 pb-4 border-b border-border/50">Item yang Dibutuhkan</h3>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Cari & Tambah Item
                </label>
                <RequestItemSelector 
                  onSelectItem={handleSelectItem}
                  selectedIds={items.map(i => i.stockItemId)}
                />
              </div>

              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="p-4 rounded-xl border border-border bg-muted/10 flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <div className="flex-1">
                        <span className="text-xs font-bold text-muted-foreground block mb-1">Item {index + 1}</span>
                        <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                        <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.category}</p>
                      </div>
                      
                      <div className="w-full md:w-32">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Jumlah</label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min={1} 
                            value={item.quantity} 
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="h-9 w-20 text-center font-bold"
                          />
                          <span className="text-xs font-bold text-muted-foreground">{item.unitType}</span>
                        </div>
                      </div>

                      <div className="w-full md:w-48">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Catatan Item (Opsional)</label>
                        <Input 
                          placeholder="Misal: Ukuran L" 
                          value={item.note || ""} 
                          onChange={(e) => handleItemNoteChange(item.id, e.target.value)}
                          className="h-9 text-xs"
                        />
                      </div>

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 self-end md:self-auto h-9 px-2"
                        title="Hapus item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 rounded-xl border-2 border-dashed border-border/60 bg-muted/10 text-muted-foreground">
                  <p className="text-sm font-semibold">Belum ada item yang ditambahkan.</p>
                  <p className="text-xs font-medium mt-1">Cari item di atas untuk mulai menyusun permintaan.</p>
                </div>
              )}
            </section>

          </div>

          {/* Sidebar / Preview Action */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Preview Permintaan</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-xs font-bold text-muted-foreground uppercase">ID Request</span>
                  <span className="text-sm font-black text-foreground">{newRequestId}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Unit Tujuan</span>
                  <span className="text-sm font-bold text-foreground">{user?.unit}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Prioritas</span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded uppercase",
                    priority === "KRITIS" ? "bg-red-100 text-red-700" :
                    priority === "TINGGI" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                  )}>{priority}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Total Item</span>
                  <span className="text-sm font-black text-foreground">{items.length}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full font-bold shadow-md shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground h-11"
                  onClick={handleSubmit}
                >
                  <Save className="w-4 h-4 mr-2" /> Ajukan Permintaan
                </Button>
                <Link href="/permintaan" className="block">
                  <Button variant="outline" className="w-full font-bold text-muted-foreground h-11">
                    Batal
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </RoleGuard>
  );
}
