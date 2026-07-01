// ============================================================================
// Domain Types — Voice
// Source of Truth: BankMate AI Frontend Blueprint · Section 10.7 + 7.12.2
// ============================================================================

export type VoiceCampaignStatus = 'ACTIVE' | 'SCHEDULED' | 'COMPLETED' | 'PAUSED';
export type CallStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'MISSED' | 'NO_ANSWER';

export interface VoiceCampaign {
  id: string;
  name: string;
  status: VoiceCampaignStatus;
  script?: string;
  targetAudience?: string;
  recipientCount: number;
  startDate: string;
  endDate?: string | null;
}

export interface CallRecord {
  id: string;
  customerId: string;
  campaignId?: string;
  status: CallStatus;
  direction: 'INBOUND' | 'OUTBOUND';
  durationSeconds?: number;
  recordingUrl?: string;
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  notes?: string;
}

export interface VoicePreferences {
  customerId: string;
  preferredTimeSlot?: string;
  language?: string;
  doNotDisturb: boolean;
  allowedCampaigns: boolean;
}

export default {};
