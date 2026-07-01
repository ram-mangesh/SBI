// ============================================================================
// Notification Types Constants
// Source of Truth: BankMate AI Frontend Blueprint · Section 10
//   Communication channels: PUSH / EMAIL / SMS / WHATSAPP / VOICE / IN_APP
// ============================================================================

export const NotificationChannel = {
  PUSH: 'PUSH',
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
  VOICE: 'VOICE',
  IN_APP: 'IN_APP',
} as const;

export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];

export const NOTIFICATION_CHANNEL_LABELS: Record<NotificationChannel, string> = {
  PUSH: 'Push Notification',
  EMAIL: 'Email',
  SMS: 'SMS',
  WHATSAPP: 'WhatsApp',
  VOICE: 'Voice Call',
  IN_APP: 'In-App',
};

// Tailwind/CSS token classes per channel (maps to components.css bm-channel-*)
export const NOTIFICATION_CHANNEL_STYLES: Record<
  NotificationChannel,
  { bg: string; text: string; chip: string }
> = {
  PUSH: { bg: 'bg-primary-50', text: 'text-primary-700', chip: 'bm-channel-push' },
  EMAIL: { bg: 'bg-gray-100', text: 'text-gray-700', chip: 'bm-channel-email' },
  SMS: { bg: 'bg-success-light', text: 'text-success-dark', chip: 'bm-channel-sms' },
  WHATSAPP: { bg: 'bg-success-light', text: 'text-success-dark', chip: 'bm-channel-whatsapp' },
  VOICE: { bg: 'bg-secondary-50', text: 'text-secondary-700', chip: 'bm-channel-voice' },
  IN_APP: { bg: 'bg-secondary-50', text: 'text-secondary-700', chip: 'bm-channel-inapp' },
};

// Icon asset name per Phase 1 folder (public/assets/icons/notifications)
export const NOTIFICATION_CHANNEL_ICONS: Record<NotificationChannel, string> = {
  PUSH: 'push-icon',
  EMAIL: 'email-icon',
  SMS: 'sms-icon',
  WHATSAPP: 'whatsapp-icon',
  VOICE: 'voice-icon',
  IN_APP: 'in-app-icon',
};

export const NOTIFICATION_CHANNELS = Object.values(NotificationChannel);

// Logical notification categories (Section 10)
export const NotificationCategory = {
  TRANSACTIONAL: 'TRANSACTIONAL',
  PROMOTIONAL: 'PROMOTIONAL',
  CAMPAIGN: 'CAMPAIGN',
  LIFE_EVENT: 'LIFE_EVENT',
  RECOMMENDATION: 'RECOMMENDATION',
  APPLICATION_UPDATE: 'APPLICATION_UPDATE',
  KYC_UPDATE: 'KYC_UPDATE',
  SECURITY: 'SECURITY',
} as const;

export type NotificationCategory =
  (typeof NotificationCategory)[keyof typeof NotificationCategory];

export default {
  NotificationChannel,
  NotificationCategory,
  NOTIFICATION_CHANNEL_LABELS,
  NOTIFICATION_CHANNEL_STYLES,
  NOTIFICATION_CHANNEL_ICONS,
  NOTIFICATION_CHANNELS,
};
