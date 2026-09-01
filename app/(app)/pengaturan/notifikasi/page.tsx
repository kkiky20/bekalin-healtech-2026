"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SettingKey = "STOCK_ALERT" | "REQUEST" | "APPROVAL" | "DISTRIBUTION" | "SYSTEM";

const SETTING_OPTIONS: { key: SettingKey; label: string; description: string; locked?: boolean }[] = [
  { key: "STOCK_ALERT", label: "Alert Stok", description: "Peringatan saat persediaan berada di bawah batas minimum.", locked: true },
  { key: "REQUEST", label: "Permintaan Logistik", description: "Pemberitahuan saat ada permintaan logistik baru dari unit." },
  { key: "APPROVAL", label: "Persetujuan & Validasi", description: "Pemberitahuan terkait status validasi dan persetujuan." },
  { key: "DISTRIBUTION", label: "Tracking Distribusi", description: "Update pengiriman dan penerimaan logistik." },
  { key: "SYSTEM", label: "Sistem & Pemeliharaan", description: "Informasi pemeliharaan dan update sistem." },
];

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<Record<SettingKey, boolean>>({
    STOCK_ALERT: true,
    REQUEST: true,
    APPROVAL: true,
    DISTRIBUTION: true,
    SYSTEM: true
  });
  const [saved, setSaved] = useState(false);

  const toggleSetting = (key: SettingKey) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12 space-y-6 max-w-2xl mx-auto">
      <Link 
        href="/notifikasi" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Kembali
      </Link>

      <PageHeader 
        title="Pengaturan Notifikasi" 
        description="Pilih jenis informasi yang ingin Anda terima."
      />

      <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden">
        {SETTING_OPTIONS.map((opt) => (
          <div key={opt.key} className="flex items-center justify-between px-6 py-5 border-b border-border/50 last:border-b-0">
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground text-sm">{opt.label}</p>
                {opt.locked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
            </div>
            <button
              onClick={() => !opt.locked && toggleSetting(opt.key)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors shrink-0",
                opt.locked ? "cursor-not-allowed" : "cursor-pointer",
                settings[opt.key] ? "bg-primary" : "bg-muted"
              )}
              disabled={opt.locked}
            >
              <span className={cn(
                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
                settings[opt.key] && "translate-x-5"
              )} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-sm text-emerald-600 font-medium flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" /> Tersimpan
          </span>
        )}
        <Button onClick={handleSave} className="font-semibold">
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
}
