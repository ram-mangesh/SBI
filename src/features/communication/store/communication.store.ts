import { create } from 'zustand';
import type { NotificationChannel, NotificationCategory } from '@/core/constants/notification-types.constants';
import {
  mockCampaigns,
  mockCommunicationHistory,
  mockConsentAudit,
  mockNotifications,
  mockPreferences,
  mockVoiceCampaigns,
  mockVoiceHistory,
  mockVoicePreferences,
} from '../data/communication.mock';
import type { CommunicationStoreState } from '../types/communication.types';

export const useCommunicationStore = create<CommunicationStoreState>((set) => ({
  notifications: mockNotifications,
  preferences: mockPreferences,
  communicationHistory: mockCommunicationHistory,
  campaigns: mockCampaigns,
  voiceCampaigns: mockVoiceCampaigns,
  voiceHistory: mockVoiceHistory,
  voicePreferences: mockVoicePreferences,
  consentAudit: mockConsentAudit,
  foregroundToastId: 'notif-offer-ready',
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, readStatus: 'READ', readAt: new Date().toISOString() } : item,
      ),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, readStatus: 'READ', readAt: item.readAt ?? new Date().toISOString() })),
    })),
  dismiss: (id) => set((state) => ({ notifications: state.notifications.filter((item) => item.id !== id) })),
  setForegroundToast: (id) => set({ foregroundToastId: id }),
  toggleChannelPreference: (channel: NotificationChannel) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        channels: { ...state.preferences.channels, [channel]: !state.preferences.channels[channel] },
      },
      consentAudit: [
        {
          id: `audit-${channel}-${Date.now()}`,
          label: `${channel} consent ${state.preferences.channels[channel] ? 'disabled' : 'enabled'}`,
          channel,
          changedAt: new Date().toISOString(),
          changedBy: 'Customer',
          value: !state.preferences.channels[channel],
        },
        ...state.consentAudit,
      ],
    })),
  toggleCategoryPreference: (category: NotificationCategory) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        categories: { ...state.preferences.categories, [category]: !state.preferences.categories[category] },
      },
    })),
  toggleQuietHours: () =>
    set((state) => ({
      preferences: { ...state.preferences, quietHoursEnabled: !state.preferences.quietHoursEnabled },
    })),
  updateVoicePreference: (key, value) =>
    set((state) => ({
      voicePreferences: { ...state.voicePreferences, [key]: value },
    })),
  initiateVoiceCall: (campaignId) =>
    set((state) => ({
      voiceHistory: [
        {
          id: `call-${Date.now().toString().slice(-5)}`,
          customerId: 'cust-priya',
          campaignId,
          status: 'IN_PROGRESS',
          direction: 'OUTBOUND',
          startedAt: new Date().toISOString(),
          notes: 'Voice call initiated from Communication Center.',
        },
        ...state.voiceHistory,
      ],
    })),
}));
