import { LogisticsRequest } from "@/types/request";
import { RequestStatusBadge } from "./RequestStatusBadge";
import { RequestPriorityBadge } from "./RequestPriorityBadge";
import { formatDate } from "@/utils/stock";

export function RequestSummary({ request }: { request: LogisticsRequest }) {
  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-foreground mb-6">Ringkasan Permintaan</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border/50">
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Request ID</span>
            <span className="font-bold text-foreground">{request.id}</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Tanggal Dibuat</span>
            <span className="font-semibold text-foreground">{formatDate(request.createdAt)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border/50">
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Unit Tujuan</span>
            <span className="font-semibold text-foreground">{request.unit}</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Pemohon</span>
            <span className="font-semibold text-foreground">{request.requesterName}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border/50">
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Prioritas</span>
            <RequestPriorityBadge priority={request.priority} />
          </div>
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Status Saat Ini</span>
            <RequestStatusBadge status={request.status} />
          </div>
        </div>

        {request.note && (
          <div className="pt-2">
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Catatan Permintaan</span>
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
              <p className="text-sm font-medium leading-relaxed">{request.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
