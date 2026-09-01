import { create } from 'zustand';
import { AppNotification } from '@/types/notification';

const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-001",
    targetRoles: ["ADMIN_GUDANG", "MANAJER"],
    type: "STOCK_ALERT",
    priority: "CRITICAL",
    title: "Stok Kritis",
    description: "NaCl 0.9% di Gudang Utama berada di bawah batas minimum (Sisa 8).",
    targetUrl: "/monitoring-stok/STK-002",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    dedupKey: "STOCK_ALERT:STK-002:CRITICAL"
  },
  {
    id: "notif-002",
    targetRoles: ["ADMIN_GUDANG"],
    type: "REQUEST",
    priority: "HIGH",
    title: "Permintaan Menunggu Validasi",
    description: "Permintaan PR-2026-004 dari unit IGD menunggu validasi.",
    targetUrl: "/persetujuan/PR-2026-004",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: "notif-003",
    targetRoles: ["MANAJER"],
    type: "APPROVAL",
    priority: "HIGH",
    title: "Menunggu Persetujuan",
    description: "Permintaan PR-2026-005 dari Rawat Inap membutuhkan persetujuan.",
    targetUrl: "/persetujuan/PR-2026-005",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
  },
  {
    id: "notif-004",
    targetRoles: ["PERAWAT"],
    targetUnitId: "IGD",
    type: "DISTRIBUTION",
    priority: "INFO",
    title: "Pengiriman Dalam Perjalanan",
    description: "Distribusi RD-2026-001 sedang dalam perjalanan menuju unit Anda.",
    targetUrl: "/distribusi/RD-2026-001",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: "notif-005",
    targetRoles: ["ADMIN_GUDANG"],
    type: "DISCREPANCY",
    priority: "HIGH",
    title: "Selisih Penerimaan",
    description: "Terdapat selisih penerimaan pada distribusi RD-2026-002 di Rawat Inap.",
    targetUrl: "/distribusi/RD-2026-002",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: "notif-006",
    targetRoles: ["ADMIN_GUDANG"],
    type: "REDISTRIBUTION",
    priority: "MEDIUM",
    title: "Redistribusi Dibuat",
    description: "Redistribusi RD-2026-003 untuk Poli Gigi berhasil dialokasikan.",
    targetUrl: "/redistribusi/RD-2026-003",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: "notif-007",
    targetRoles: ["PERAWAT"],
    targetUnitId: "IGD",
    type: "RECEIVING",
    priority: "MEDIUM",
    title: "Konfirmasi Penerimaan",
    description: "Distribusi RD-2026-001 telah tiba. Silakan konfirmasi penerimaan barang.",
    targetUrl: "/distribusi/RD-2026-001",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: "notif-008",
    targetRoles: ["ADMIN_GUDANG", "MANAJER"],
    type: "STOCK_ALERT",
    priority: "HIGH",
    title: "Stok Menipis",
    description: "Sarung Tangan Steril di unit Bedah mendekati batas minimum (Sisa 25).",
    targetUrl: "/monitoring-stok/STK-005",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    dedupKey: "STOCK_ALERT:STK-005:HIGH"
  },
  {
    id: "notif-009",
    targetRoles: ["ADMIN_GUDANG"],
    type: "REQUEST",
    priority: "MEDIUM",
    title: "Permintaan Baru",
    description: "Permintaan PR-2026-006 dari Poli Gigi telah diajukan.",
    targetUrl: "/persetujuan/PR-2026-006",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: "notif-010",
    targetRoles: ["ADMIN_GUDANG", "MANAJER"],
    type: "DISTRIBUTION",
    priority: "INFO",
    title: "Distribusi Selesai",
    description: "Distribusi RD-2026-005 ke Rawat Inap telah diselesaikan.",
    targetUrl: "/distribusi/RD-2026-005",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString()
  },
  {
    id: "notif-011",
    targetRoles: ["ADMIN_GUDANG"],
    type: "APPROVAL",
    priority: "INFO",
    title: "Permintaan Disetujui",
    description: "Permintaan PR-2026-003 telah disetujui oleh Manajer. Siap untuk alokasi.",
    targetUrl: "/redistribusi/baru?request=PR-2026-003",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString()
  },
  {
    id: "notif-012",
    targetRoles: ["ADMIN_GUDANG", "MANAJER", "PERAWAT", "ADMIN_CSSD"],
    type: "SYSTEM",
    priority: "LOW",
    title: "Pemeliharaan Terjadwal",
    description: "Sistem BEKALIN akan menjalani pemeliharaan pada 3 September 2026, pukul 02:00–04:00 WIB.",
    targetUrl: "/notifikasi",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
];

interface NotificationStore {
  notifications: AppNotification[];
  addNotification: (notification: AppNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (role: string, unitId?: string) => void;
  clearReadNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: MOCK_NOTIFICATIONS,

  addNotification: (notification) => set((state) => {
    if (notification.dedupKey) {
      const exists = state.notifications.some(
        n => n.dedupKey === notification.dedupKey && !n.isRead
      );
      if (exists) return state;
    }
    return {
      notifications: [notification, ...state.notifications]
    };
  }),

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    )
  })),

  markAllAsRead: (role, unitId) => set((state) => ({
    notifications: state.notifications.map(n => {
      const isTargetRole = n.targetRoles.includes(role);
      const isTargetUnit = !n.targetUnitId || n.targetUnitId === unitId;
      if (isTargetRole && isTargetUnit) {
        return { ...n, isRead: true };
      }
      return n;
    })
  })),

  clearReadNotifications: () => set((state) => ({
    notifications: state.notifications.filter(n => !n.isRead)
  }))
}));
