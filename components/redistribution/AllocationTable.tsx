import { StockAllocation } from "@/types/redistribution";
import { MOCK_STOCK_DATA } from "@/mock/stock";

export function AllocationTable({ allocations }: { allocations: StockAllocation[] }) {
  return (
    <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border/50">
        <h3 className="font-bold text-foreground">Detail Alokasi Item</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Sumber Unit</th>
              <th className="px-6 py-4 text-center">Batch / Exp</th>
              <th className="px-6 py-4 text-center">Diminta</th>
              <th className="px-6 py-4 text-center">Dialokasikan</th>
              <th className="px-6 py-4">Status Pemenuhan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {allocations.map((alloc) => {
              const stockItem = MOCK_STOCK_DATA.find(s => s.id === alloc.stockItemId);
              const name = stockItem ? stockItem.name : "Unknown Item";
              const isFull = alloc.allocatedQuantity >= alloc.requestedQuantity;

              return (
                <tr key={alloc.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <p className="font-bold text-foreground">{name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">{alloc.stockItemId}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {alloc.sourceUnitId}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-xs font-bold text-foreground">{alloc.batchId || "-"}</p>
                    <p className="text-[10px] font-medium text-muted-foreground">{alloc.expirationDate || "-"}</p>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-muted-foreground">
                    {alloc.requestedQuantity}
                  </td>
                  <td className="px-6 py-4 text-center font-black text-foreground text-base">
                    {alloc.allocatedQuantity}
                  </td>
                  <td className="px-6 py-4">
                    {isFull ? (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
                        Penuh
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase text-blue-700 bg-blue-100 px-2 py-1 rounded">
                        Parsial
                      </span>
                    )}
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
