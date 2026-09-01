import { RequestHistory } from "@/types/request";
import { formatDate } from "@/utils/stock";
import { User, ClipboardCheck, XCircle } from "lucide-react";

export function ReviewHistory({ history }: { history?: RequestHistory[] }) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-foreground mb-6">Riwayat Review & Audit</h3>
        <p className="text-sm font-medium text-muted-foreground text-center py-6 border border-dashed rounded-xl border-border/60">
          Belum ada aktivitas review.
        </p>
      </div>
    );
  }

  // Sort history newest first
  const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-foreground mb-6">Riwayat Review & Audit</h3>
      
      <div className="relative border-l-2 border-muted ml-3 space-y-6">
        {sortedHistory.map((entry, idx) => {
          const isReject = entry.action === "REJECT_REQUEST";
          const isApprove = entry.action === "APPROVE_REQUEST";
          const Icon = isReject ? XCircle : isApprove ? ClipboardCheck : User;
          
          return (
            <div key={idx} className="relative pl-6">
              <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-surface border-2 border-muted flex items-center justify-center">
                <Icon className={`w-4 h-4 ${isReject ? "text-red-500" : isApprove ? "text-emerald-500" : "text-blue-500"}`} />
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  {formatDate(entry.timestamp)}
                </span>
                <div className="text-sm">
                  <span className="font-bold text-foreground">{entry.actorName}</span>
                  <span className="font-medium text-muted-foreground ml-1">
                    ({entry.role === "ADMIN_GUDANG" ? "Admin Gudang" : entry.role === "MANAJER" ? "Manajer Operasional" : entry.role})
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {entry.action === "VALIDATE_REQUEST" && "Melakukan validasi administratif."}
                  {entry.action === "APPROVE_REQUEST" && "Menyetujui permohonan secara final."}
                  {entry.action === "REJECT_REQUEST" && <span className="text-red-600">Menolak permohonan.</span>}
                </p>
                {entry.comment && (
                  <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border/50 text-sm font-medium italic">
                    "{entry.comment}"
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
