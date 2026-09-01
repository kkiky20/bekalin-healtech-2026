import { User, Activity, Stethoscope, ShieldCheck } from "lucide-react";
import { Role } from "@/store/useAuthStore";

interface DemoAccountSelectorProps {
  onSelect: (role: Role) => void;
}

export function DemoAccountSelector({ onSelect }: DemoAccountSelectorProps) {
  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="text-center mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Gunakan Akun Demo
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelect('ADMIN_GUDANG')}
          className="flex items-center gap-2 p-2 rounded-lg border border-border bg-surface hover:bg-surface-secondary transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Admin Gudang</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelect('ADMIN_CSSD')}
          className="flex items-center gap-2 p-2 rounded-lg border border-border bg-surface hover:bg-surface-secondary transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Admin CSSD</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelect('PERAWAT')}
          className="flex items-center gap-2 p-2 rounded-lg border border-border bg-surface hover:bg-surface-secondary transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Perawat Unit</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelect('MANAJER')}
          className="flex items-center gap-2 p-2 rounded-lg border border-border bg-surface hover:bg-surface-secondary transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Manajer Ops</div>
          </div>
        </button>
      </div>
    </div>
  );
}
