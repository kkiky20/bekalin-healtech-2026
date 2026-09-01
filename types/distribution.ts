import { RedistributionStatus, StockAllocation } from "./redistribution";

export type DistributionStatus = RedistributionStatus;

export interface Discrepancy {
  expected: number;
  actual: number;
  difference: number;
  condition: "Baik" | "Rusak" | "Kurang" | "Tidak Sesuai";
  notes: string;
}

export interface ReceivingRecord {
  receivedDate: string;
  receivedBy: string; // user name
  discrepancies?: Record<string, Discrepancy>; // key is allocationId
  notes?: string;
}

export interface ShippingInfo {
  processedDate?: string;
  shippedDate?: string;
  shippedBy?: string;
  referenceNumber?: string;
  notes?: string;
}

export type TransactionType = "TRANSFER_OUT" | "TRANSFER_IN";

export interface StockTransaction {
  id: string;
  distributionId: string;
  stockItemId: string;
  sourceUnitId: string;
  destinationUnitId: string;
  type: TransactionType;
  quantity: number;
  timestamp: string;
  actorId: string;
}
