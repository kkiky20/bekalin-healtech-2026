import { RequestItem } from "@/types/request";

export function RequestItemList({ items }: { items: RequestItem[] }) {
  return (
    <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border/50">
        <h3 className="font-bold text-foreground">Item yang Diminta</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Item & Kategori</th>
              <th className="px-6 py-4 text-center">Jumlah</th>
              <th className="px-6 py-4">Catatan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/20">
                <td className="px-6 py-4">
                  <p className="font-bold text-foreground">{item.name}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.category}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-baseline gap-1.5 px-3 py-1 bg-muted rounded-md">
                    <span className="font-black text-foreground">{item.quantity}</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase">{item.unitType}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.note ? (
                    <p className="text-sm font-medium text-foreground max-w-sm truncate whitespace-normal leading-relaxed">{item.note}</p>
                  ) : (
                    <span className="text-muted-foreground text-xs italic">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
