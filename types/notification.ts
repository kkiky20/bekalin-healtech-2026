export type NotificationType = 
  | 'STOCK_ALERT'
  | 'REQUEST'
  | 'APPROVAL'
  | 'REDISTRIBUTION'
  | 'DISTRIBUTION'
  | 'RECEIVING'
  | 'DISCREPANCY'
  | 'SYSTEM';

export type NotificationPriority = 
  | 'CRITICAL'
  | 'HIGH'
  | 'MEDIUM'
  | 'LOW'
  | 'INFO';

export interface AppNotification {
  id: string;
  userId: string | null; // null means broadcast to applicable roles
  targetRoles?: string[];
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  description: string;
  referenceType?: string;
  referenceId?: string;
  targetUrl: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationSettings {
  stockAlert: boolean;
  request: boolean;
  approval: boolean;
  redistribution: boolean;
  distribution: boolean;
  receiving: boolean;
  discrepancy: boolean;
}
