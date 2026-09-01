import { notificationService } from "@/services/notificationService";

export function notifyRequestCreated(requestId: string, unitName: string) {
  notificationService.createNotification({
    targetRoles: ["ADMIN_GUDANG"],
    type: "REQUEST",
    priority: "HIGH",
    title: "Permintaan Baru",
    description: `Unit ${unitName} mengajukan permintaan logistik baru.`,
    targetUrl: `/persetujuan/${requestId}`,
    referenceId: requestId
  });
}

export function notifyApprovalRequired(requestId: string) {
  notificationService.createNotification({
    targetRoles: ["MANAJER"],
    type: "APPROVAL",
    priority: "HIGH",
    title: "Menunggu Persetujuan",
    description: `Permintaan ${requestId} telah tervalidasi dan menunggu persetujuan Anda.`,
    targetUrl: `/persetujuan/${requestId}`,
    referenceId: requestId
  });
}

export function notifyRequestApproved(requestId: string, unitName: string) {
  notificationService.createNotification({
    targetRoles: ["ADMIN_GUDANG"],
    type: "REDISTRIBUTION",
    priority: "MEDIUM",
    title: "Permintaan Disetujui",
    description: `Permintaan ${requestId} telah disetujui. Siap dialokasikan.`,
    targetUrl: `/redistribusi/baru?request=${requestId}`,
    referenceId: requestId
  });
  // Also notify the unit that their request is approved
  notificationService.createNotification({
    targetRoles: ["PERAWAT"],
    targetUnitId: unitName,
    type: "SYSTEM",
    priority: "INFO",
    title: "Permintaan Disetujui",
    description: `Permintaan logistik Anda telah disetujui Manajer.`,
    targetUrl: `/permintaan/${requestId}`,
    referenceId: requestId
  });
}

export function notifyDistributionDispatched(distributionId: string, destinationUnit: string) {
  notificationService.createNotification({
    targetRoles: ["PERAWAT"],
    targetUnitId: destinationUnit,
    type: "DISTRIBUTION",
    priority: "INFO",
    title: "Pengiriman Dimulai",
    description: `Distribusi logistik sedang dalam perjalanan menuju unit Anda.`,
    targetUrl: `/distribusi/${distributionId}`,
    referenceId: distributionId
  });
}

export function notifyDiscrepancy(distributionId: string, destinationUnit: string) {
  notificationService.createNotification({
    targetRoles: ["ADMIN_GUDANG", "MANAJER"],
    type: "DISCREPANCY",
    priority: "HIGH",
    title: "Selisih Penerimaan",
    description: `Terdapat selisih/catatan pada penerimaan barang di ${destinationUnit}.`,
    targetUrl: `/distribusi/${distributionId}`,
    referenceId: distributionId
  });
}

export function notifyCriticalStock(itemId: string, itemName: string, unitName: string, remaining: number, threshold: number) {
  notificationService.createNotification({
    targetRoles: ["ADMIN_GUDANG", "MANAJER"],
    type: "STOCK_ALERT",
    priority: "CRITICAL",
    title: "Stok Kritis",
    description: `Stok ${itemName} di ${unitName} berada di bawah batas kritis (Sisa ${remaining} / Batas ${threshold}).`,
    targetUrl: `/monitoring-stok/${itemId}`,
    referenceId: itemId,
    dedupKey: `STOCK_ALERT:${itemId}:CRITICAL`
  });
}
