import { RequestItem } from "@/types/request";
import { evaluateRequestItem } from "@/utils/request-validation";
import { MOCK_STOCK_DATA } from "@/mock/stock";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export function RequestItemReview({ items }: { items: RequestItem[] }) {
  return (
    <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border/50">
        <h3 className="font-bold text-foreground">Detail Item Permintaan</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Item & Kategori</th>
              <th className="px-6 py-4 text-center">Jumlah Diminta</th>
              <th className="px-6 py-4 text-center">Stok Saat Ini</th>
              <th className="px-6 py-4">Batas Min.</th>
              <th className="px-6 py-4">Status Stok & Rekomendasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {items.map((item) => {
              const stockItem = MOCK_STOCK_DATA.find(s => s.id === item.stockItemId);
              const evaluation = evaluateRequestItem(item.quantity, stockItem?.currentStock, stockItem?.minimumStock);
              
              let Icon = CheckCircle2;
              let statusColor = "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20";
              let statusText = "Tersedia";
              let recommendation = "Aman";

              if (evaluation.availabilityStatus === "TIDAK_MENCUKUPI") {
                Icon = XCircle;
                statusColor = "text-red-600 bg-red-50 dark:bg-red-950/20";
                statusText = "Tidak Mencukupi";
                recommendation = "Perlu Tinjauan Kritis";
              } else if (evaluation.availabilityStatus === "STOK_KRITIS") {
                Icon = AlertCircle;
                statusColor = "text-orange-600 bg-orange-50 dark:bg-orange-950/20";
                statusText = "Stok Kritis";
                recommendation = "Berpotensi Mengganggu Layanan";
              } else if (evaluation.availabilityStatus === "STOK_RENDAH") {
                Icon = AlertTriangle;
                statusColor = "text-amber-600 bg-amber-50 dark:bg-amber-950/20";
                statusText = "Stok Rendah";
                recommendation = "Bisa Disetujui Hati-hati";
              } else if (evaluation.availabilityStatus === "TIDAK_DITEMUKAN") {
                Icon = XCircle;
                statusColor = "text-slate-600 bg-slate-50 dark:bg-slate-950/20";
                statusText = "Data Tidak Tersedia";
                recommendation = "Periksa Master Data";
              }

              return (
                <tr key={item.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">{item.stockItemId} • {item.category}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-baseline gap-1.5 px-3 py-1 bg-muted rounded-md">
                      <span className="font-black text-foreground">{item.quantity}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.unitType}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-foreground text-base">
                    {evaluation.currentStock}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-muted-foreground">
                    {evaluation.minimumStock}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <div className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", statusColor)}>
                        <Icon className="w-3 h-3 mr-1" /> {statusText}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{recommendation}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
