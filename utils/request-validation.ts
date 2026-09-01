export type StockAvailabilityStatus = "TERSEDIA" | "TIDAK_MENCUKUPI" | "STOK_RENDAH" | "STOK_KRITIS" | "TIDAK_DITEMUKAN";

export interface RequestItemValidation {
  requestedQuantity: number;
  currentStock: number;
  minimumStock: number;
  availabilityStatus: StockAvailabilityStatus;
}

export function evaluateRequestItem(
  requestedQuantity: number, 
  currentStock: number | undefined, 
  minimumStock: number | undefined
): RequestItemValidation {
  
  if (currentStock === undefined || minimumStock === undefined) {
    return { requestedQuantity, currentStock: 0, minimumStock: 0, availabilityStatus: "TIDAK_DITEMUKAN" };
  }

  let availabilityStatus: StockAvailabilityStatus = "TERSEDIA";

  if (currentStock < requestedQuantity) {
    availabilityStatus = "TIDAK_MENCUKUPI";
  } else if (currentStock <= minimumStock * 0.5) { // e.g. critical threshold
    availabilityStatus = "STOK_KRITIS";
  } else if (currentStock <= minimumStock) {
    availabilityStatus = "STOK_RENDAH";
  }

  return {
    requestedQuantity,
    currentStock,
    minimumStock,
    availabilityStatus
  };
}
