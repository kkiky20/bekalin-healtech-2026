export type RequestStatus = 
  | "DRAFT" 
  | "MENUNGGU_VALIDASI" 
  | "MENUNGGU_PERSETUJUAN" 
  | "DISETUJUI" 
  | "DIPROSES" 
  | "DALAM_PENGIRIMAN" 
  | "SELESAI" 
  | "DITOLAK" 
  | "DIBATALKAN";

export type RequestPriority = "RENDAH" | "NORMAL" | "TINGGI" | "KRITIS";

export interface RequestItem {
  id: string; // unique row id
  stockItemId: string;
  name: string;
  category: string;
  unitType: string; // e.g. Box, Botol
  quantity: number;
  note?: string;
}

export interface RequestHistory {
  actorId: string;
  actorName: string;
  role: string;
  action: string;
  timestamp: string;
  comment?: string;
}

export interface LogisticsRequest {
  id: string; // e.g., PR-2026-015
  unit: string;
  requesterName: string;
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
  status: RequestStatus;
  priority: RequestPriority;
  note?: string;
  items: RequestItem[];
  history?: RequestHistory[];
  rejectionReason?: string;
  reviewNotes?: string;
}
