import { LogisticsRequest } from "@/types/request";
import { RequestStatusBadge } from "./RequestStatusBadge";
import { RequestPriorityBadge } from "./RequestPriorityBadge";
import { formatDate } from "@/utils/stock";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface RequestTableProps {
  requests: LogisticsRequest[];
}

export function RequestTable({ requests }: RequestTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Request ID</th>
                <th className="px-5 py-4">Unit & Pemohon</th>
                <th className="px-5 py-4">Jumlah Item</th>
                <th className="px-5 py-4">Prioritas</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Dibuat</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="font-bold text-foreground">{req.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-foreground text-sm">{req.unit}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{req.requesterName}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold">{req.items.length} item</span>
                  </td>
                  <td className="px-5 py-4">
                    <RequestPriorityBadge priority={req.priority} />
                  </td>
                  <td className="px-5 py-4">
                    <RequestStatusBadge status={req.status} />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-muted-foreground">
                    {formatDate(req.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link 
                      href={`/permintaan/${req.id}`}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-bold text-xs"
                    >
                      Lihat <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {requests.map(req => (
          <RequestCard key={req.id} req={req} />
        ))}
      </div>
    </>
  );
}

function RequestCard({ req }: { req: LogisticsRequest }) {
  return (
    <div className="bg-surface border border-border/50 rounded-xl p-4 flex flex-col gap-4 shadow-sm relative overflow-hidden">
      {req.priority === "KRITIS" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
      
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground leading-snug">{req.id}</h4>
          <p className="text-xs font-medium text-muted-foreground mt-1">{req.unit} • {req.items.length} item</p>
        </div>
        <RequestStatusBadge status={req.status} className="shrink-0" />
      </div>

      <div className="flex justify-between items-center bg-muted/30 rounded-lg p-3 border border-border/50">
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Prioritas</p>
          <RequestPriorityBadge priority={req.priority} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Tanggal</p>
          <span className="text-xs font-semibold">{formatDate(req.createdAt)}</span>
        </div>
      </div>

      <Link 
        href={`/permintaan/${req.id}`}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors"
      >
        Lihat Detail <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
