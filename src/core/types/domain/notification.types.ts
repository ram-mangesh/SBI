// ============================================================================
// Domain Types — Notification
// Source of Truth: BankMate AI Frontend Blueprint · Section 10
// ============================================================================

import type { NotificationChannel, NotificationCategory } from '@/core/constants/notification-types.constants';

export type NotificationReadStatus = 'READ' | 'UNREAD';

export interface Notification {
  id: string;
  customerId: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  category: NotificationCategory;
  readStatus: NotificationReadStatus;
  deepLink?: string;
  imageUrl?: string;
  metadata?: Record<string, unknown>;
  isDismissible: boolean;
  expiresAt?: string | null;
  createdAt: string;
  readAt?: string | null;
}

export interface NotificationPreferences {
  customerId: string;
  channels: Record<NotificationChannel, boolean>;
  categories: Record<NotificationCategory, boolean>;
  quietHoursEnabled: boolean;
  quietHoursStart?: string; // HH:mm
  quietHoursEnd?: string;
}

export interface CommunicationRecord {
  id: string;
  customerId: string;
  channel: NotificationChannel;
  campaignId?: string;
  title: string;
  body: string;
  status: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
  sentAt: string;
  readAt?: string | null;
}

export interface Campaign {
  id: string;
  name: string;
  channel: NotificationChannel;
  category: NotificationCategory;
  status: 'ACTIVE' | 'SCHEDULED' | 'COMPLETED' | 'PAUSED';
  recipientCount: number;
  sentCount?: number;
  startDate: string;
  endDate?: string | null;
}

export default {};
