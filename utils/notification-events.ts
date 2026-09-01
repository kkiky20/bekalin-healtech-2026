import { notificationService } from '@/services/notificationService';

export const notificationEvents = {
  notifyRequestCreated(requestId: string, unit: string) {
    notificationService.createNotification({
      userId: null,
      targetRoles: ['ADMIN_GUDANG'],
      type: 'REQUEST',
      priority: 'MEDIUM',
      title: 'Permintaan Baru',
      description: `Permintaan ${requestId} dari ${unit} menunggu validasi.`,
      targetUrl: `/permintaan/${requestId}`,
      referenceType: 'REQUEST',
      referenceId: requestId
    });
  },

  notifyRequestValidated(requestId: string) {
    notificationService.createNotification({
      userId: null,
      targetRoles: ['PERAWAT'],
      type: 'REQUEST',
      priority: 'INFO',
      title: 'Permintaan Divalidasi',
      description: `Permintaan ${requestId} telah divalidasi.`,
      targetUrl: `/permintaan/${requestId}`,
      referenceType: 'REQUEST',
      referenceId: requestId
    });
  },

  notifyApprovalRequired(requestId: string) {
    notificationService.createNotification({
      userId: null,
      targetRoles: ['MANAJER'],
      type: 'APPROVAL',
      priority: 'HIGH',
      title: 'Menunggu Persetujuan',
      description: `Permintaan ${requestId} membutuhkan persetujuan Anda.`,
      targetUrl: `/persetujuan/${requestId}`,
      referenceType: 'REQUEST',
      referenceId: requestId
    });
  },

  notifyRequestApproved(requestId: string) {
    notificationService.createNotification({
      userId: null,
      targetRoles: ['ADMIN_GUDANG', 'PERAWAT'],
      type: 'APPROVAL',
      priority: 'INFO',
      title: 'Permintaan Disetujui',
      description: `Permintaan ${requestId} telah disetujui.`,
      targetUrl: `/permintaan/${requestId}`,
      referenceType: 'REQUEST',
      referenceId: requestId
    });
  },

  notifyRedistributionCreated(redistributionId: string) {
    notificationService.createNotification({
      userId: null,
      targetRoles: ['ADMIN_GUDANG', 'PERAWAT'],
      type: 'REDISTRIBUTION',
      priority: 'INFO',
      title: 'Redistribusi Dibuat',
      description: `Redistribusi ${redistributionId} telah berhasil dibuat.`,
      targetUrl: `/redistribusi/${redistributionId}`,
      referenceType: 'REDISTRIBUTION',
      referenceId: redistributionId
    });
  },

  notifyDistributionDispatched(distributionId: string, destinationUnit: string) {
    notificationService.createNotification({
      userId: null,
      targetRoles: ['PERAWAT'], // Assuming destination unit role
      type: 'DISTRIBUTION',
      priority: 'INFO',
      title: 'Distribusi Dikirim',
      description: `Distribusi ${distributionId} sedang dalam pengiriman ke ${destinationUnit}.`,
      targetUrl: `/distribusi/${distributionId}`,
      referenceType: 'DISTRIBUTION',
      referenceId: distributionId
    });
  },

  notifyReceivingRequired(distributionId: string) {
    notificationService.createNotification({
      userId: null,
      targetRoles: ['PERAWAT'],
      type: 'RECEIVING',
      priority: 'MEDIUM',
      title: 'Menunggu Penerimaan',
      description: `Distribusi ${distributionId} telah tiba dan menunggu konfirmasi.`,
      targetUrl: `/distribusi/${distributionId}`,
      referenceType: 'DISTRIBUTION',
      referenceId: distributionId
    });
  },

  notifyDiscrepancy(distributionId: string, discrepancyCount: number) {
    notificationService.createNotification({
      userId: null,
      targetRoles: ['ADMIN_GUDANG', 'MANAJER'],
      type: 'DISCREPANCY',
      priority: 'HIGH',
      title: 'Selisih Penerimaan',
      description: `Terdapat selisih ${discrepancyCount} item pada penerimaan ${distributionId}.`,
      targetUrl: `/distribusi/${distributionId}`,
      referenceType: 'DISTRIBUTION',
      referenceId: distributionId
    });
  },

  notifyCriticalStock(stockItemId: string, itemName: string, unit: string, currentStock: number, threshold: number) {
    // Deduplication strategy would be implemented here or in store/service
    notificationService.createNotification({
      userId: null,
      targetRoles: ['ADMIN_GUDANG', 'MANAJER'],
      type: 'STOCK_ALERT',
      priority: 'CRITICAL',
      title: 'Stok Kritis',
      description: `${itemName} di ${unit} berada di bawah batas kritis (Sisa: ${currentStock}).`,
      targetUrl: `/monitoring-stok/${stockItemId}`,
      referenceType: 'STOCK',
      referenceId: stockItemId
    });
  }
};
