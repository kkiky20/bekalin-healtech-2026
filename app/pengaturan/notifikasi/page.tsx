"use client";

import { useNotificationStore } from "@/store/useNotificationStore";
import { PageHeader } from "@/components/layout/PageHeader";
import { Switch } from "@/components/ui/switch"; // Assuming shadcn Switch exists, wait, let me use a basic toggle if not

export default function NotificationSettingsPage() {
  const { settings, updateSettings } = useNotificationStore();

  const handleToggle = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <PageHeader 
        title="Pengaturan Notifikasi" 
        description="Pilih jenis notifikasi yang ingin Anda terima."
      />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-amber-50 border-b border-amber-100">
          <p className="text-sm text-amber-800 font-medium">
            <strong>Catatan:</strong> Notifikasi peringatan stok kritis dan peringatan operasional penting (seperti selisih penerimaan) tidak dapat dinonaktifkan demi keamanan operasional.
          </p>
        </div>
        
        <div className="divide-y divide-slate-100">
          <SettingRow 
            title="Peringatan Stok" 
            description="Informasi saat stok menipis (mendekati batas minimum)."
            checked={settings.stockAlert}
            onChange={() => handleToggle('stockAlert')}
          />
          <SettingRow 
            title="Permintaan Logistik" 
            description="Notifikasi saat ada permintaan baru atau perubahan status permintaan."
            checked={settings.request}
            onChange={() => handleToggle('request')}
          />
          <SettingRow 
            title="Persetujuan" 
            description="Notifikasi saat dokumen membutuhkan persetujuan Anda."
            checked={settings.approval}
            onChange={() => handleToggle('approval')}
          />
          <SettingRow 
            title="Redistribusi" 
            description="Informasi pembuatan rencana redistribusi stok antar unit."
            checked={settings.redistribution}
            onChange={() => handleToggle('redistribution')}
          />
          <SettingRow 
            title="Distribusi" 
            description="Update status pengiriman logistik dari gudang ke unit."
            checked={settings.distribution}
            onChange={() => handleToggle('distribution')}
          />
          <SettingRow 
            title="Penerimaan" 
            description="Pemberitahuan saat barang tiba dan menunggu konfirmasi penerimaan."
            checked={settings.receiving}
            onChange={() => handleToggle('receiving')}
          />
        </div>
      </div>
    </div>
  );
}

function SettingRow({ title, description, checked, onChange }: { title: string, description: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-start justify-between p-6">
      <div className="pr-8">
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
      <button 
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white ${checked ? 'bg-primary' : 'bg-slate-200'}`}
      >
        <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
