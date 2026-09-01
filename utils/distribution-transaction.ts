import { useRedistributionStore } from "@/store/useRedistributionStore";
import { useStockStore } from "@/store/useStockStore";
import { ReceivingRecord, ShippingInfo } from "@/types/distribution";
import { notifyDistributionDispatched, notifyDiscrepancy } from "@/utils/notification-events";

// Action: Process Distribution
export function startProcessing(distributionId: string, actor: any) {
  const { updateRedistributionStatus } = useRedistributionStore.getState();
  updateRedistributionStatus(distributionId, "PROCESSING", actor, "Memulai proses pengepakan distribusi.");
}

// Action: Dispatch
export function dispatchDistribution(
  distributionId: string, 
  actor: any, 
  shippingInfo: ShippingInfo
) {
  const { redistributions, updateRedistributionStatus } = useRedistributionStore.getState();
  const { transferOut } = useStockStore.getState();

  const record = redistributions.find(r => r.id === distributionId);
  if (!record) throw new Error("Distribution not found");
  if (record.status !== "PROCESSING") throw new Error("Invalid transition: must be PROCESSING");

  // 1. Decrease source stock & increase inTransit for each allocation
  record.allocations.forEach(alloc => {
    // Note: in a real app we'd map `alloc.stockItemId` precisely. 
    // For our mock, we assume `alloc.stockItemId` is the valid ID in the source unit.
    transferOut(alloc.stockItemId, alloc.allocatedQuantity);
  });

  // 2. Update status and save shipping info
  useRedistributionStore.setState(state => ({
    redistributions: state.redistributions.map(rd => {
      if (rd.id === distributionId) {
        return {
          ...rd,
          shippingInfo,
          status: "IN_DELIVERY",
          updatedAt: new Date().toISOString(),
          history: [...rd.history, {
            actorId: actor.id,
            actorName: actor.name,
            role: actor.role,
            action: "DISPATCH",
            timestamp: new Date().toISOString(),
            comment: shippingInfo.notes || "Pengiriman dimulai."
          }]
        };
      }
      return rd;
    })
  }));

  notifyDistributionDispatched(distributionId, record.destinationUnit);
}

// Action: Receive
export function receiveDistribution(
  distributionId: string, 
  actor: any, 
  receivingRecord: ReceivingRecord
) {
  const { redistributions } = useRedistributionStore.getState();
  const { transferIn } = useStockStore.getState();

  const record = redistributions.find(r => r.id === distributionId);
  if (!record) throw new Error("Distribution not found");
  if (record.status !== "IN_DELIVERY") throw new Error("Invalid transition: must be IN_DELIVERY");

  // 1. Process received quantities and discrepancies
  record.allocations.forEach(alloc => {
    const discrepancy = receivingRecord.discrepancies?.[alloc.id];
    const actualReceived = discrepancy ? discrepancy.actual : alloc.allocatedQuantity;
    
    // Transfer from inTransit to destination's currentStock
    if (actualReceived > 0) {
      // For mock, destination stock item ID would ideally be matched by `code`. 
      // We'll pass the source ID and our store will do a simple translation if needed.
      // (In `useStockStore` we're just matching the destination unit mock id, but let's assume `alloc.stockItemId` + destinationUnit)
      transferIn(`${alloc.stockItemId}-DEST`, actualReceived, alloc.stockItemId);
    }
    
    // What happens to lost transit? In a real system we write it off. We'll skip for this mock.
  });

  // 2. Determine next state based on discrepancies
  const hasDiscrepancy = Object.keys(receivingRecord.discrepancies || {}).length > 0;
  
  useRedistributionStore.setState(state => ({
    redistributions: state.redistributions.map(rd => {
      if (rd.id === distributionId) {
        return {
          ...rd,
          receivingRecord,
          status: "RECEIVED",
          updatedAt: new Date().toISOString(),
          history: [...rd.history, {
            actorId: actor.id,
            actorName: actor.name,
            role: actor.role,
            action: "RECEIVE",
            timestamp: new Date().toISOString(),
            comment: hasDiscrepancy ? "Diterima dengan selisih/catatan khusus." : "Diterima dalam kondisi lengkap."
          }]
        };
      }
      return rd;
    })
  }));

  if (hasDiscrepancy) {
    notifyDiscrepancy(distributionId, record.destinationUnit);
  }
}

// Action: Complete
export function completeDistribution(distributionId: string, actor: any) {
  const { updateRedistributionStatus } = useRedistributionStore.getState();
  updateRedistributionStatus(distributionId, "COMPLETED", actor, "Distribusi diselesaikan.");
}
