import {
  Bell,
  CheckCircle2,
  FileText,
  Mail,
  MessageCircle,
  Megaphone,
  Mic,
  Shield,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import {
  NOTIFICATION_CHANNEL_LABELS,
  NOTIFICATION_CHANNEL_STYLES,
  NotificationCategory,
  NotificationChannel,
  type NotificationChannel as NotificationChannelType,
  type NotificationCategory as NotificationCategoryType,
} from '@/core/constants/notification-types.constants';
import type { Notification } from '../types/communication.types';

export function formatDateTime(value?: string | null) {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatDuration(seconds?: number) {
  if (!seconds) return '0 min';
  const mins = Math.floor(seconds / 60);
  const rem = seconds % 60;
  return `${mins}m ${rem}s`;
}

export function channelIcon(channel: NotificationChannelType): LucideIcon {
  const icons: Record<NotificationChannelType, LucideIcon> = {
    PUSH: Smartphone,
    EMAIL: Mail,
    SMS: MessageCircle,
    WHATSAPP: MessageCircle,
    VOICE: Mic,
    IN_APP: Bell,
  };
  return icons[channel];
}

export function categoryIcon(category: NotificationCategoryType): LucideIcon {
  if (category === NotificationCategory.SECURITY) return Shield;
  if (category === NotificationCategory.APPLICATION_UPDATE || category === NotificationCategory.KYC_UPDATE) return FileText;
  if (category === NotificationCategory.CAMPAIGN || category === NotificationCategory.PROMOTIONAL) return Megaphone;
  if (category === NotificationCategory.RECOMMENDATION || category === NotificationCategory.LIFE_EVENT) return CheckCircle2;
  return Bell;
}

export function channelLabel(channel: NotificationChannelType) {
  return NOTIFICATION_CHANNEL_LABELS[channel];
}

export function channelChipClass(channel: NotificationChannelType) {
  return NOTIFICATION_CHANNEL_STYLES[channel].chip;
}

export function categoryLabel(category: NotificationCategoryType) {
  return category
    .split('_')
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(' ');
}

export function notificationCta(notification: Notification) {
  if (typeof notification.metadata?.cta === 'string') return notification.metadata.cta;
  if (notification.category === NotificationCategory.SECURITY) return 'Review';
  if (notification.channel === NotificationChannel.VOICE) return 'Start call';
  return 'Open';
}

export function unreadCount(notifications: Notification[]) {
  return notifications.filter((item) => item.readStatus === 'UNREAD').length;
}

export function groupNotifications(notifications: Notification[]) {
  const today = new Date('2026-06-27T00:00:00.000Z').getTime();
  return {
    today: notifications.filter((item) => Date.parse(item.createdAt) >= today),
    earlier: notifications.filter((item) => Date.parse(item.createdAt) < today),
    campaigns: notifications.filter((item) => item.category === NotificationCategory.CAMPAIGN || item.category === NotificationCategory.PROMOTIONAL),
    security: notifications.filter((item) => item.category === NotificationCategory.SECURITY),
  };
}
