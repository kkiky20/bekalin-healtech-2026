import { AppNotification } from "@/types/notification";
import { useNotificationStore } from "@/store/useNotificationStore";

function generateId() {
  return `notif-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export const notificationService = {
  createNotification: (data: Omit<AppNotification, "id" | "isRead" | "createdAt">) => {
    const { addNotification } = useNotificationStore.getState();
    addNotification({
      id: generateId(),
      ...data,
      isRead: false,
      createdAt: new Date().toISOString()
    });
  }
};
