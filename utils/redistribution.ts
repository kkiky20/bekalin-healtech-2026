import { AllocationRisk, AllocationStatus } from "@/types/redistribution";

export function calculateMaxSafeAllocation(currentStock: number, minimumStock: number): number {
  const safe = currentStock - minimumStock;
  return safe > 0 ? safe : 0;
}

export function getAllocationRisk(remainingStock: number, minimumStock: number, criticalThreshold: number = minimumStock * 0.5): AllocationRisk {
  if (remainingStock > minimumStock) return "SAFE";
  if (remainingStock === minimumStock) return "AT_MINIMUM";
  if (remainingStock > criticalThreshold && remainingStock < minimumStock) return "LOW";
  return "CRITICAL";
}

export function calculateAllocationStatus(allocated: number, requested: number, hasRisk: boolean): AllocationStatus {
  if (allocated === 0) return "NOT_STARTED";
  if (hasRisk) return "RISK";
  if (allocated < requested) return "PARTIAL";
  return "FULL";
}
