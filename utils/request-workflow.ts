import { LogisticsRequest, RequestStatus } from "@/types/request";

export function canValidateRequest(role: string | undefined, request: LogisticsRequest): boolean {
  return role === "ADMIN_GUDANG" && request.status === "MENUNGGU_VALIDASI";
}

export function canApproveRequest(role: string | undefined, request: LogisticsRequest): boolean {
  return role === "MANAJER" && request.status === "MENUNGGU_PERSETUJUAN";
}

export function canRejectRequest(role: string | undefined, request: LogisticsRequest): boolean {
  if (role === "ADMIN_GUDANG" && request.status === "MENUNGGU_VALIDASI") return true;
  if (role === "MANAJER" && request.status === "MENUNGGU_PERSETUJUAN") return true;
  return false;
}

export function transitionRequestStatus(
  currentStatus: RequestStatus, 
  action: "VALIDATE" | "APPROVE" | "REJECT" | "CANCEL"
): RequestStatus | null {
  
  if (action === "VALIDATE" && currentStatus === "MENUNGGU_VALIDASI") return "MENUNGGU_PERSETUJUAN";
  if (action === "APPROVE" && currentStatus === "MENUNGGU_PERSETUJUAN") return "DISETUJUI";
  
  if (action === "REJECT" && (currentStatus === "MENUNGGU_VALIDASI" || currentStatus === "MENUNGGU_PERSETUJUAN")) {
    return "DITOLAK";
  }

  if (action === "CANCEL" && (currentStatus === "DRAFT" || currentStatus === "MENUNGGU_VALIDASI")) {
    return "DIBATALKAN";
  }

  return null; // Invalid transition
}
