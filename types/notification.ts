export type NotificationType = "STOCK_ALERT" | "REQUEST" | "APPROVAL" | "REDISTRIBUTION" | "DISTRIBUTION" | "RECEIVING" | "DISCREPANCY" | "SYSTEM";
export type NotificationPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

export interface AppNotification {
  id: string;
  targetRoles: string[]; // which roles should see this, e.g. ["ADMIN_GUDANG"] or ["PERAWAT"]
  targetUnitId?: string; // specific unit, e.g. if the notification is only for IGD Perawat
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  description: string;
  referenceId?: string;
  targetUrl: string;
  isRead: boolean;
  createdAt: string;
  dedupKey?: string; // used to prevent spam
}

export interface NotificationSettings {
  STOCK_ALERT: boolean; // Note: usually CRITICAL can't be turned off, this affects non-critical stock alerts
  REQUEST: boolean;
  APPROVAL: boolean;
  REDISTRIBUTION: boolean;
  DISTRIBUTION: boolean;
  RECEIVING: boolean;
  DISCREPANCY: boolean;
  SYSTEM: boolean;
}
