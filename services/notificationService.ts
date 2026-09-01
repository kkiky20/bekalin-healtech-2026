import { useNotificationStore } from '@/store/useNotificationStore';
import { AppNotification, NotificationType, NotificationPriority } from '@/types/notification';

export const notificationService = {
  createNotification(data: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>) {
    useNotificationStore.getState().addNotification(data);
  },

  createNotifications(items: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>[]) {
    items.forEach(item => {
      useNotificationStore.getState().addNotification(item);
    });
  },

  markAsRead(id: string) {
    useNotificationStore.getState().markAsRead(id);
  },

  markAllAsRead(role?: string) {
    useNotificationStore.getState().markAllAsRead(role);
  },

  getUnreadCount(role?: string) {
    return useNotificationStore.getState().getUnreadCount(role);
  },

  getNotificationsForUser(role?: string) {
    const notifications = useNotificationStore.getState().notifications;
    if (!role) return notifications;
    return notifications.filter(n => !n.targetRoles || n.targetRoles.includes(role));
  }
};
