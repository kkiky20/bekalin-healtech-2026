import { LogisticsRequest } from "@/types/request";
import { RequestPriorityBadge } from "@/components/requests/RequestPriorityBadge";
import { formatDate } from "@/utils/stock";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRedistributionStore } from "@/store/useRedistributionStore";
import { Button } from "@/components/ui/button";

export function ApprovedRequestTable({ requests }: { requests: LogisticsRequest[] }) {
  const redistributions = useRedistributionStore(state => state.redistributions);

  return (
    <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-border/50 bg-muted/10">
        <h3 className="font-bold text-foreground">Permintaan Siap Dipenuhi (Approved)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/30 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-5 py-4">Request ID</th>
              <th className="px-5 py-4">Unit Tujuan</th>
              <th className="px-5 py-4">Prioritas</th>
              <th className="px-5 py-4">Total Item</th>
              <th className="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {requests.map((req) => {
              const hasRedist = redistributions.some(rd => rd.requestId === req.id);
              return (
                <tr key={req.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-bold text-foreground">{req.id}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatDate(req.createdAt)}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold">{req.unit}</td>
                  <td className="px-5 py-4">
                    <RequestPriorityBadge priority={req.priority} />
                  </td>
                  <td className="px-5 py-4 font-bold">{req.items.length}</td>
                  <td className="px-5 py-4 text-right">
                    {hasRedist ? (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1.5 rounded-lg">
                        Sudah Dialokasikan
                      </span>
                    ) : (
                      <Link href={`/redistribusi/baru?request=${req.id}`}>
                        <Button size="sm" className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
                          Penuhi <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground font-medium">
                  Tidak ada permintaan baru yang siap dipenuhi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
