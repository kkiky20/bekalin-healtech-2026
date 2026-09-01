export type StockStatus = "SAFE" | "LOW" | "CRITICAL" | "EXPIRING_SOON" | "EXPIRED";

export type StockCategory = "Obat" | "Alat Kesehatan" | "Bahan Medis Habis Pakai" | "Alat Steril";

export interface StockMovement {
  id: string;
  date: string;
  type: "IN" | "OUT";
  quantity: number;
  description: string;
}

export interface UsageData {
  day: string;
  usage: number;
}

export interface StockItem {
  id: string;
  name: string;
  code: string;
  category: StockCategory;
  unit: string;
  currentStock: number;
  inTransit: number;
  minimumStock: number;
  maximumStock: number;
  batch: string;
  expirationDate: string; // ISO format YYYY-MM-DD
  supplier: string;
  lastUpdated: string; // ISO format
  movements: StockMovement[];
  usageTrend: UsageData[];
}
