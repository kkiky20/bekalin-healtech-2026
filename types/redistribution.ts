export type RedistributionStatus = "DRAFT" | "READY" | "ALLOCATED" | "PROCESSING" | "IN_DELIVERY" | "RECEIVED" | "COMPLETED" | "CANCELLED";
export type AllocationRisk = "SAFE" | "AT_MINIMUM" | "LOW" | "CRITICAL";
export type AllocationStatus = "NOT_STARTED" | "PARTIAL" | "FULL" | "RISK";

export interface StockAllocation {
  id: string; // e.g. ALC-1001
  stockItemId: string; // Item being requested
  sourceUnitId: string; // From where it is taken
  requestedQuantity: number;
  allocatedQuantity: number;
  batchId?: string;
  expirationDate?: string;
}

export interface RedistributionHistory {
  actorId: string;
  actorName: string;
  role: string;
  action: string;
  timestamp: string;
  comment?: string;
}

export interface RedistributionRecord {
  id: string; // e.g. RD-2026-004
  requestId: string;
  destinationUnit: string;
  requesterName: string;
  priority: string; // Inherited from request
  status: RedistributionStatus;
  allocations: StockAllocation[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  notes?: string;
  history: RedistributionHistory[];
  
  // Phase 09 Extensions
  shippingInfo?: {
    processedDate?: string;
    shippedDate?: string;
    shippedBy?: string;
    referenceNumber?: string;
    notes?: string;
  };
  receivingRecord?: {
    receivedDate: string;
    receivedBy: string;
    discrepancies?: Record<string, {
      expected: number;
      actual: number;
      difference: number;
      condition: "Baik" | "Rusak" | "Kurang" | "Tidak Sesuai";
      notes: string;
    }>;
    notes?: string;
  };
}
