import { LogisticsRequest } from "@/types/request";
import { RequestStatusBadge } from "@/components/requests/RequestStatusBadge";
import { RequestPriorityBadge } from "@/components/requests/RequestPriorityBadge";
import { formatDate } from "@/utils/stock";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { evaluateRequestItem } from "@/utils/request-validation";
import { MOCK_STOCK_DATA } from "@/mock/stock";

interface ApprovalTableProps {
  requests: LogisticsRequest[];
}

function getRequestStockStatus(request: LogisticsRequest) {
  let hasCritical = false;
  let hasLow = false;
  let hasInsufficient = false;

  request.items.forEach(item => {
    const stockItem = MOCK_STOCK_DATA.find(s => s.id === item.stockItemId);
    const evaluation = evaluateRequestItem(item.quantity, stockItem?.currentStock, stockItem?.minimumStock);
    
    if (evaluation.availabilityStatus === "TIDAK_MENCUKUPI") hasInsufficient = true;
    else if (evaluation.availabilityStatus === "STOK_KRITIS") hasCritical = true;
    else if (evaluation.availabilityStatus === "STOK_RENDAH") hasLow = true;
  });

  if (hasInsufficient) return <span className="text-red-600 font-bold text-xs bg-red-100 px-2 py-1 rounded">Tidak Mencukupi</span>;
  if (hasCritical) return <span className="text-orange-600 font-bold text-xs bg-orange-100 px-2 py-1 rounded">Sebagian Kritis</span>;
  if (hasLow) return <span className="text-amber-600 font-bold text-xs bg-amber-100 px-2 py-1 rounded">Stok Menipis</span>;
  return <span className="text-emerald-600 font-bold text-xs bg-emerald-100 px-2 py-1 rounded">Semua Tersedia</span>;
}

export function ApprovalTable({ requests }: ApprovalTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Request ID</th>
                <th className="px-5 py-4">Pemohon</th>
                <th className="px-5 py-4">Item & Konteks Stok</th>
                <th className="px-5 py-4">Prioritas</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="font-bold text-foreground">{req.id}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{formatDate(req.createdAt)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-foreground text-sm">{req.unit}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{req.requesterName}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className="font-semibold">{req.items.length} item diminta</span>
                      {getRequestStockStatus(req)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <RequestPriorityBadge priority={req.priority} />
                  </td>
                  <td className="px-5 py-4">
                    <RequestStatusBadge status={req.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link 
                      href={`/persetujuan/${req.id}`}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-bold text-xs"
                    >
                      Review <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden flex flex-col gap-4">
        {requests.map(req => (
          <ApprovalCard key={req.id} req={req} />
        ))}
      </div>
    </>
  );
}

function ApprovalCard({ req }: { req: LogisticsRequest }) {
  return (
    <div className="bg-surface border border-border/50 rounded-xl p-4 flex flex-col gap-4 shadow-sm relative overflow-hidden">
      {req.priority === "KRITIS" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
      
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground leading-snug">{req.id}</h4>
          <p className="text-xs font-medium text-muted-foreground mt-1">{req.unit} • {formatDate(req.createdAt)}</p>
        </div>
        <RequestStatusBadge status={req.status} className="shrink-0" />
      </div>

      <div className="flex flex-col gap-3 bg-muted/30 rounded-lg p-3 border border-border/50">
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Prioritas</p>
          <RequestPriorityBadge priority={req.priority} />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Konteks Stok</p>
          {getRequestStockStatus(req)}
        </div>
      </div>

      <Link 
        href={`/persetujuan/${req.id}`}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors"
      >
        Review Permintaan <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
