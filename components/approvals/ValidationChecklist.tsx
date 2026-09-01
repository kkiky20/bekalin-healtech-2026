import { useState } from "react";
import { LogisticsRequest } from "@/types/request";
import { Button } from "@/components/ui/button";
import { CheckSquare, Square, FileCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationChecklistProps {
  request: LogisticsRequest;
  onCheck: (allChecked: boolean) => void;
}

const CHECKLIST_ITEMS = [
  { id: "c1", label: "Unit pemohon sesuai dengan kewenangan." },
  { id: "c2", label: "Item yang diminta relevan dengan kebutuhan klinis." },
  { id: "c3", label: "Jumlah kebutuhan telah diperiksa kewajarannya." },
  { id: "c4", label: "Ketersediaan dan batas stok telah ditinjau." }
];

export function ValidationChecklist({ request, onCheck }: ValidationChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    const newChecked = { ...checked, [id]: !checked[id] };
    setChecked(newChecked);
    
    const allChecked = CHECKLIST_ITEMS.every(item => newChecked[item.id]);
    onCheck(allChecked);
  };

  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <FileCheck className="w-5 h-5 text-primary" /> Checklist Verifikasi Administratif
      </h3>
      <p className="text-xs font-medium text-muted-foreground mb-4">
        Harap tandai semua poin di bawah ini sebelum memvalidasi dokumen.
      </p>

      <div className="space-y-3">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <div 
              key={item.id} 
              className={cn(
                "flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer select-none",
                isChecked ? "bg-primary/5 border-primary/20 text-foreground" : "bg-muted/10 border-border/50 text-muted-foreground hover:bg-muted/30"
              )}
              onClick={() => toggleCheck(item.id)}
            >
              {isChecked ? (
                <CheckSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <span className="text-sm font-medium leading-relaxed">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
