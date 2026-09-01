import { RequestStatus, RequestPriority } from "@/types/request";

export function getRequestStatusLabel(status: RequestStatus): string {
  switch (status) {
    case "DRAFT": return "Draft";
    case "MENUNGGU_VALIDASI": return "Menunggu Validasi";
    case "MENUNGGU_PERSETUJUAN": return "Menunggu Persetujuan";
    case "DISETUJUI": return "Disetujui";
    case "DIPROSES": return "Diproses";
    case "DALAM_PENGIRIMAN": return "Dalam Pengiriman";
    case "SELESAI": return "Selesai";
    case "DITOLAK": return "Ditolak";
    case "DIBATALKAN": return "Dibatalkan";
    default: return status;
  }
}

export function getRequestPriorityLabel(priority: RequestPriority): string {
  switch (priority) {
    case "RENDAH": return "Rendah";
    case "NORMAL": return "Normal";
    case "TINGGI": return "Tinggi";
    case "KRITIS": return "Kritis";
    default: return priority;
  }
}

// Map status to progress step index for timeline
export function getTimelineStep(status: RequestStatus): number {
  switch (status) {
    case "DRAFT": return 0;
    case "MENUNGGU_VALIDASI": return 1;
    case "MENUNGGU_PERSETUJUAN": return 1;
    case "DISETUJUI": return 2;
    case "DIPROSES": return 3;
    case "DALAM_PENGIRIMAN": return 4;
    case "SELESAI": return 5;
    default: return -1; // For cancelled or rejected
  }
}
