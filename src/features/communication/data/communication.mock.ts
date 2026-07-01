import { NotificationCategory, NotificationChannel } from '@/core/constants/notification-types.constants';
import type { Campaign, CommunicationRecord, Notification, NotificationPreferences } from '@/core/types/domain/notification.types';
import type { CallRecord, VoiceCampaign, VoicePreferences } from '@/core/types/domain/voice.types';
import type { CommunicationInsight, ConsentAuditItem } from '../types/communication.types';

export const mockNotifications: Notification[] = [
  {
    id: 'notif-offer-ready',
    customerId: 'cust-priya',
    title: 'Home loan offer is ready',
    body: 'Your BankMate Home Flex Loan offer at 8.45% p.a. is ready for acceptance.',
    channel: NotificationChannel.PUSH,
    category: NotificationCategory.APPLICATION_UPDATE,
    readStatus: 'UNREAD',
    deepLink: '/customer/applications/app-approved-card/accept',
    metadata: { cta: 'Review offer', priority: 'HIGH' },
    isDismissible: true,
    expiresAt: '2026-07-04T18:30:00.000Z',
    createdAt: '2026-06-27T09:10:00.000Z',
  },
  {
    id: 'notif-kyc-complete',
    customerId: 'cust-priya',
    title: 'KYC verification completed',
    body: 'Your identity verification is complete. You can now submit applications without re-uploading core documents.',
    channel: NotificationChannel.IN_APP,
    category: NotificationCategory.KYC_UPDATE,
    readStatus: 'UNREAD',
    deepLink: '/customer/kyc/status',
    metadata: { cta: 'View KYC' },
    isDismissible: true,
    createdAt: '2026-06-27T08:25:00.000Z',
  },
  {
    id: 'notif-recommendation-refresh',
    customerId: 'cust-priya',
    title: 'New recommendations available',
    body: 'CommunicationAgent refreshed your recommendations after your home purchase signal.',
    channel: NotificationChannel.EMAIL,
    category: NotificationCategory.RECOMMENDATION,
    readStatus: 'READ',
    readAt: '2026-06-26T17:00:00.000Z',
    deepLink: '/customer/recommendations',
    metadata: { cta: 'View matches' },
    isDismissible: true,
    createdAt: '2026-06-26T16:30:00.000Z',
  },
  {
    id: 'notif-doc-needed',
    customerId: 'cust-priya',
    title: 'Bank statement needed',
    body: 'Please upload a password-free 6 month statement to continue the personal loan application.',
    channel: NotificationChannel.WHATSAPP,
    category: NotificationCategory.APPLICATION_UPDATE,
    readStatus: 'UNREAD',
    deepLink: '/customer/products/personal-quick/apply',
    metadata: { cta: 'Upload document', priority: 'ACTION_REQUIRED' },
    isDismissible: false,
    createdAt: '2026-06-26T11:15:00.000Z',
  },
  {
    id: 'notif-security-login',
    customerId: 'cust-priya',
    title: 'New login detected',
    body: 'A login from Windows Chrome was detected. Review if this was not you.',
    channel: NotificationChannel.SMS,
    category: NotificationCategory.SECURITY,
    readStatus: 'UNREAD',
    deepLink: '/customer/settings/security',
    metadata: { cta: 'Review devices', priority: 'SECURITY' },
    isDismissible: false,
    createdAt: '2026-06-25T20:45:00.000Z',
  },
  {
    id: 'notif-voice-campaign',
    customerId: 'cust-priya',
    title: 'Voice callback available',
    body: 'A relationship manager voice campaign can explain your home loan sanction details.',
    channel: NotificationChannel.VOICE,
    category: NotificationCategory.CAMPAIGN,
    readStatus: 'READ',
    readAt: '2026-06-25T12:00:00.000Z',
    deepLink: '/customer/voice',
    metadata: { cta: 'Start call', campaignId: 'voice-home-offer' },
    isDismissible: true,
    createdAt: '2026-06-25T11:45:00.000Z',
  },
];

export const mockPreferences: NotificationPreferences = {
  customerId: 'cust-priya',
  channels: {
    PUSH: true,
    EMAIL: true,
    SMS: true,
    WHATSAPP: true,
    VOICE: true,
    IN_APP: true,
  },
  categories: {
    TRANSACTIONAL: true,
    PROMOTIONAL: false,
    CAMPAIGN: true,
    LIFE_EVENT: true,
    RECOMMENDATION: true,
    APPLICATION_UPDATE: true,
    KYC_UPDATE: true,
    SECURITY: true,
  },
  quietHoursEnabled: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
};

export const mockCommunicationHistory: CommunicationRecord[] = mockNotifications.map((item) => ({
  id: `history-${item.id}`,
  customerId: item.customerId,
  channel: item.channel,
  campaignId: typeof item.metadata?.campaignId === 'string' ? item.metadata.campaignId : undefined,
  title: item.title,
  body: item.body,
  status: item.readStatus === 'READ' ? 'READ' : 'DELIVERED',
  sentAt: item.createdAt,
  readAt: item.readAt,
}));

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-home-buyers',
    name: 'Home Buyer Guidance',
    channel: NotificationChannel.EMAIL,
    category: NotificationCategory.LIFE_EVENT,
    status: 'ACTIVE',
    recipientCount: 1,
    sentCount: 3,
    startDate: '2026-06-20T09:00:00.000Z',
    endDate: '2026-07-05T18:30:00.000Z',
  },
  {
    id: 'camp-card-rewards',
    name: 'Rewards Card Education',
    channel: NotificationChannel.PUSH,
    category: NotificationCategory.RECOMMENDATION,
    status: 'SCHEDULED',
    recipientCount: 1,
    startDate: '2026-06-29T09:00:00.000Z',
  },
];

export const mockVoiceCampaigns: VoiceCampaign[] = [
  {
    id: 'voice-home-offer',
    name: 'Home Loan Offer Explanation',
    status: 'ACTIVE',
    script: 'Explain sanction amount, EMI, processing fee, and acceptance steps.',
    targetAudience: 'Approved home loan applicants',
    recipientCount: 1,
    startDate: '2026-06-25T09:00:00.000Z',
    endDate: '2026-07-04T18:30:00.000Z',
  },
  {
    id: 'voice-doc-help',
    name: 'Document Upload Assistance',
    status: 'SCHEDULED',
    script: 'Guide customers through statement upload and document verification.',
    targetAudience: 'Customers with pending documents',
    recipientCount: 1,
    startDate: '2026-06-28T10:00:00.000Z',
  },
];

export const mockVoiceHistory: CallRecord[] = [
  {
    id: 'call-1049',
    customerId: 'cust-priya',
    campaignId: 'voice-home-offer',
    status: 'COMPLETED',
    direction: 'OUTBOUND',
    durationSeconds: 248,
    startedAt: '2026-06-25T12:10:00.000Z',
    endedAt: '2026-06-25T12:14:08.000Z',
    notes: 'Customer requested offer summary by email.',
  },
  {
    id: 'call-1028',
    customerId: 'cust-priya',
    status: 'MISSED',
    direction: 'OUTBOUND',
    scheduledAt: '2026-06-24T17:00:00.000Z',
    notes: 'Retry during preferred evening window.',
  },
];

export const mockVoicePreferences: VoicePreferences = {
  customerId: 'cust-priya',
  preferredTimeSlot: '18:00 - 20:00',
  language: 'English',
  doNotDisturb: false,
  allowedCampaigns: true,
};

export const mockConsentAudit: ConsentAuditItem[] = [
  { id: 'audit-whatsapp', label: 'WhatsApp consent enabled', channel: NotificationChannel.WHATSAPP, changedAt: '2026-06-20T12:00:00.000Z', changedBy: 'Customer', value: true },
  { id: 'audit-promo', label: 'Promotional email disabled', channel: NotificationChannel.EMAIL, changedAt: '2026-06-18T08:30:00.000Z', changedBy: 'Customer', value: false },
];

export const communicationInsights: CommunicationInsight[] = [
  { label: 'Open rate', value: '84%', trend: '+12% this month' },
  { label: 'Unread', value: '4', trend: '2 action items' },
  { label: 'Preferred channel', value: 'WhatsApp', trend: 'Fastest response' },
  { label: 'Voice calls', value: '1', trend: 'Completed this week' },
];
