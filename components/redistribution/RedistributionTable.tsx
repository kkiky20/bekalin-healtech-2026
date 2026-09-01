import { RedistributionRecord } from "@/types/redistribution";
import { formatDate } from "@/utils/stock";
import Link from "next/link";
import { ChevronRight, PackageCheck, AlertCircle } from "lucide-react";

export function RedistributionTable({ records }: { records: RedistributionRecord[] }) {
  return (
    <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-border/50 bg-muted/10 flex justify-between items-center">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-emerald-600" /> Redistribusi Aktif
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/30 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-5 py-4">ID Redistribusi</th>
              <th className="px-5 py-4">Request ID</th>
              <th className="px-5 py-4">Tujuan</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {records.map((rd) => (
              <tr key={rd.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-bold text-foreground">{rd.id}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatDate(rd.createdAt)}</p>
                </td>
                <td className="px-5 py-4 font-semibold text-muted-foreground">{rd.requestId}</td>
                <td className="px-5 py-4 font-bold">{rd.destinationUnit}</td>
                <td className="px-5 py-4">
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                    {rd.status}
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link 
                    href={`/redistribusi/${rd.id}`}
                    className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-bold text-xs"
                  >
                    Detail <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground font-medium">
                  Tidak ada redistribusi aktif saat ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
