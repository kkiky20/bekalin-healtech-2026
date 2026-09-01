import { LogisticsRequest } from "@/types/request";
import { RequestPriorityBadge } from "@/components/requests/RequestPriorityBadge";
import { formatDate } from "@/utils/stock";
import { MapPin, Clock, Info } from "lucide-react";

export function RequestContext({ request }: { request: LogisticsRequest }) {
  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-500" /> Konteks Permintaan
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Request ID</p>
          <p className="font-bold text-foreground">{request.id}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Unit Tujuan</p>
          <p className="font-bold text-foreground flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-500" /> {request.unit}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Prioritas</p>
          <RequestPriorityBadge priority={request.priority} />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Disetujui Sejak</p>
          <p className="font-bold text-foreground flex items-center gap-1.5 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" /> {formatDate(request.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
