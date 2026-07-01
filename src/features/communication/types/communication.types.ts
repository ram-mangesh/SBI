import type { NotificationChannel, NotificationCategory } from '@/core/constants/notification-types.constants';
import type { Campaign, CommunicationRecord, Notification, NotificationPreferences } from '@/core/types/domain/notification.types';
import type { CallRecord, VoiceCampaign, VoicePreferences } from '@/core/types/domain/voice.types';

export type CommunicationFilter = 'ALL' | 'UNREAD' | NotificationChannel;
export type CommunicationGroup = 'today' | 'earlier' | 'campaigns' | 'security';

export interface CommunicationInsight {
  label: string;
  value: string;
  trend: string;
}

export interface ConsentAuditItem {
  id: string;
  label: string;
  channel: NotificationChannel;
  changedAt: string;
  changedBy: string;
  value: boolean;
}

export interface CommunicationStoreState {
  notifications: Notification[];
  preferences: NotificationPreferences;
  communicationHistory: CommunicationRecord[];
  campaigns: Campaign[];
  voiceCampaigns: VoiceCampaign[];
  voiceHistory: CallRecord[];
  voicePreferences: VoicePreferences;
  consentAudit: ConsentAuditItem[];
  foregroundToastId: string | null;
  markRead: (id: string) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  setForegroundToast: (id: string | null) => void;
  toggleChannelPreference: (channel: NotificationChannel) => void;
  toggleCategoryPreference: (category: NotificationCategory) => void;
  toggleQuietHours: () => void;
  updateVoicePreference: <K extends keyof VoicePreferences>(key: K, value: VoicePreferences[K]) => void;
  initiateVoiceCall: (campaignId?: string) => void;
}

export type {
  Campaign,
  CallRecord,
  CommunicationRecord,
  Notification,
  NotificationChannel,
  NotificationCategory,
  NotificationPreferences,
  VoiceCampaign,
  VoicePreferences,
};
