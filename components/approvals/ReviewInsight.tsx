import { RequestItem } from "@/types/request";
import { evaluateRequestItem } from "@/utils/request-validation";
import { MOCK_STOCK_DATA } from "@/mock/stock";
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

export function ReviewInsight({ items }: { items: RequestItem[] }) {
  let available = 0;
  let low = 0;
  let critical = 0;
  let insufficient = 0;

  items.forEach(item => {
    const stockItem = MOCK_STOCK_DATA.find(s => s.id === item.stockItemId);
    const ev = evaluateRequestItem(item.quantity, stockItem?.currentStock, stockItem?.minimumStock);
    
    if (ev.availabilityStatus === "TERSEDIA") available++;
    else if (ev.availabilityStatus === "STOK_RENDAH") low++;
    else if (ev.availabilityStatus === "STOK_KRITIS") critical++;
    else if (ev.availabilityStatus === "TIDAK_MENCUKUPI") insufficient++;
  });

  const allClear = available === items.length;
  const hasSevereIssues = insufficient > 0 || critical > 0;

  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-foreground mb-4">Ringkasan Analisis Stok</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-muted/30 rounded-xl border border-border/50 text-center">
          <p className="text-xl font-black text-foreground">{items.length}</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Item</p>
        </div>
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50 text-center">
          <p className="text-xl font-black text-emerald-700 dark:text-emerald-400">{available}</p>
          <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">Tersedia</p>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/50 text-center">
          <p className="text-xl font-black text-orange-700 dark:text-orange-400">{low + critical}</p>
          <p className="text-[10px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-wider">Batas Minimum</p>
        </div>
        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/50 text-center">
          <p className="text-xl font-black text-red-700 dark:text-red-400">{insufficient}</p>
          <p className="text-[10px] font-bold text-red-600 dark:text-red-500 uppercase tracking-wider">Tdk Cukup</p>
        </div>
      </div>

      <div className="flex gap-3 p-4 rounded-xl border bg-muted/10 border-border/50">
        {allClear ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              Semua {items.length} item tersedia dengan baik di atas batas minimum stok. Permintaan dapat dipenuhi tanpa masalah.
            </p>
          </>
        ) : hasSevereIssues ? (
          <>
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              Terdapat item yang persediaannya <strong className="text-foreground">kritis atau tidak mencukupi</strong>. Penyetujuan penuh akan berisiko terhadap ketersediaan barang di gudang sentral.
            </p>
          </>
        ) : (
          <>
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              Beberapa item berada di dekat batas stok minimum. Harap berhati-hati sebelum memvalidasi seluruh kuantitas.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
