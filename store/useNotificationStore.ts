import { create } from 'zustand';
import { AppNotification, NotificationSettings } from '@/types/notification';

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: null,
    targetRoles: ['ADMIN_GUDANG', 'MANAJER'],
    type: 'STOCK_ALERT',
    priority: 'CRITICAL',
    title: 'Stok Kritis',
    description: 'NaCl 0.9% di Gudang Utama berada di bawah batas kritis (Sisa: 8).',
    targetUrl: '/monitoring-stok/STK-001',
    isRead: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: 'notif-2',
    userId: null,
    targetRoles: ['ADMIN_GUDANG', 'MANAJER'],
    type: 'STOCK_ALERT',
    priority: 'HIGH',
    title: 'Stok Menipis',
    description: 'Paracetamol 500mg di IGD mendekati batas minimum.',
    targetUrl: '/monitoring-stok/STK-002',
    isRead: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: 'notif-3',
    userId: null,
    targetRoles: ['ADMIN_GUDANG', 'MANAJER'],
    type: 'STOCK_ALERT',
    priority: 'CRITICAL',
    title: 'Stok Kritis',
    description: 'Spuit 3cc di ICU berada di bawah batas kritis.',
    targetUrl: '/monitoring-stok/STK-003',
    isRead: true,
    createdAt: yesterday.toISOString(),
  },
  {
    id: 'notif-4',
    userId: null,
    targetRoles: ['ADMIN_GUDANG'],
    type: 'REQUEST',
    priority: 'MEDIUM',
    title: 'Permintaan Baru',
    description: 'Permintaan PR-2026-014 dari IGD menunggu validasi.',
    targetUrl: '/permintaan/PR-2026-014',
    isRead: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'notif-5',
    userId: null,
    targetRoles: ['ADMIN_GUDANG'],
    type: 'REQUEST',
    priority: 'MEDIUM',
    title: 'Permintaan Baru',
    description: 'Permintaan PR-2026-015 dari ICU menunggu validasi.',
    targetUrl: '/permintaan/PR-2026-015',
    isRead: true,
    createdAt: yesterday.toISOString(),
  },
  {
    id: 'notif-6',
    userId: null,
    targetRoles: ['MANAJER'],
    type: 'APPROVAL',
    priority: 'HIGH',
    title: 'Menunggu Persetujuan',
    description: 'Permintaan PR-2026-012 membutuhkan persetujuan Anda.',
    targetUrl: '/persetujuan/PR-2026-012',
    isRead: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'notif-7',
    userId: null,
    targetRoles: ['MANAJER'],
    type: 'APPROVAL',
    priority: 'HIGH',
    title: 'Menunggu Persetujuan',
    description: 'Permintaan PR-2026-013 membutuhkan persetujuan Anda.',
    targetUrl: '/persetujuan/PR-2026-013',
    isRead: true,
    createdAt: yesterday.toISOString(),
  },
  {
    id: 'notif-8',
    userId: null,
    targetRoles: ['ADMIN_GUDANG', 'PERAWAT'],
    type: 'REDISTRIBUTION',
    priority: 'INFO',
    title: 'Redistribusi Dibuat',
    description: 'Redistribusi RD-2026-004 telah berhasil dibuat.',
    targetUrl: '/redistribusi/RD-2026-004',
    isRead: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'notif-9',
    userId: null,
    targetRoles: ['PERAWAT'],
    type: 'DISTRIBUTION',
    priority: 'INFO',
    title: 'Distribusi Dikirim',
    description: 'Distribusi RD-2026-004 sedang dalam pengiriman ke IGD.',
    targetUrl: '/distribusi/RD-2026-004',
    isRead: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'notif-10',
    userId: null,
    targetRoles: ['PERAWAT'],
    type: 'DISTRIBUTION',
    priority: 'INFO',
    title: 'Distribusi Dikirim',
    description: 'Distribusi RD-2026-003 sedang dalam pengiriman ke ICU.',
    targetUrl: '/distribusi/RD-2026-003',
    isRead: true,
    createdAt: yesterday.toISOString(),
  },
  {
    id: 'notif-11',
    userId: null,
    targetRoles: ['PERAWAT'],
    type: 'RECEIVING',
    priority: 'MEDIUM',
    title: 'Menunggu Penerimaan',
    description: 'Distribusi RD-2026-002 telah tiba dan menunggu konfirmasi.',
    targetUrl: '/distribusi/RD-2026-002',
    isRead: true,
    createdAt: lastWeek.toISOString(),
  },
  {
    id: 'notif-12',
    userId: null,
    targetRoles: ['ADMIN_GUDANG', 'MANAJER'],
    type: 'DISCREPANCY',
    priority: 'HIGH',
    title: 'Selisih Penerimaan',
    description: 'Terdapat selisih 5 unit pada penerimaan RD-2026-001.',
    targetUrl: '/distribusi/RD-2026-001',
    isRead: false,
    createdAt: lastWeek.toISOString(),
  }
];

interface NotificationStore {
  notifications: AppNotification[];
  settings: NotificationSettings;
  addNotification: (notification: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (role?: string) => void;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
  getUnreadCount: (role?: string) => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: MOCK_NOTIFICATIONS,
  settings: {
    stockAlert: true,
    request: true,
    approval: true,
    redistribution: true,
    distribution: true,
    receiving: true,
    discrepancy: true,
  },

  addNotification: (notificationData) => set((state) => ({
    notifications: [
      {
        ...notificationData,
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        isRead: false,
      },
      ...state.notifications
    ]
  })),

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    )
  })),

  markAllAsRead: (role) => set((state) => ({
    notifications: state.notifications.map(n => {
      // If role is provided, only mark read for notifications targeting that role
      if (role && n.targetRoles && !n.targetRoles.includes(role)) {
        return n;
      }
      return { ...n, isRead: true };
    })
  })),

  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),

  getUnreadCount: (role) => {
    const { notifications } = get();
    return notifications.filter(n => {
      if (n.isRead) return false;
      if (role && n.targetRoles && !n.targetRoles.includes(role)) return false;
      return true;
    }).length;
  }
}));
