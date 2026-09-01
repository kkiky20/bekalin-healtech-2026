import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle } from "lucide-react";

interface RejectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function RejectionDialog({ isOpen, onClose, onConfirm }: RejectionDialogProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (reason.trim().length < 10) {
      setError("Alasan penolakan minimal 10 karakter.");
      return;
    }
    setError("");
    onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface border border-border shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center p-6 border-b border-border/50">
          <h3 className="font-black text-xl text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" /> Tolak Permintaan?
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Berikan alasan yang jelas mengapa permintaan logistik ini ditolak. Alasan ini akan dibaca oleh pemohon dari unit pelayanan.
          </p>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
              Alasan Penolakan <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full h-32 p-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
              placeholder="Jelaskan alasan permintaan ditolak..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
            />
            {error ? (
              <span className="text-xs font-bold text-red-500">{error}</span>
            ) : (
              <span className="text-xs font-medium text-muted-foreground">Minimal 10 karakter.</span>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-border/50 flex items-center justify-end gap-3 bg-muted/10">
          <Button variant="ghost" className="font-bold" onClick={onClose}>
            Kembali
          </Button>
          <Button 
            className="font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20"
            onClick={handleSubmit}
          >
            Tolak Permintaan
          </Button>
        </div>
      </div>
    </div>
  );
}
