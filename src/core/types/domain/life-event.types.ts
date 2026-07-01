// ============================================================================
// Domain Types — Life Events
// Source of Truth: BankMate AI Frontend Blueprint · Section 6.2.3
// ============================================================================

import type { LifeEventType } from '@/core/constants/life-events.constants';

export type LifeEventStage =
  | 'EARLY_STAGE'
  | 'PLANNING'
  | 'ACTIVE'
  | 'COMPLETED';

export interface LifeEvent {
  id: string;
  customerId: string;
  type: LifeEventType;
  title: string;
  description?: string;
  stage: LifeEventStage;
  detectedAt?: string;
  targetDate?: string | null;
  confidenceScore?: number; // 0–100 (AI detection)
  isConfirmed: boolean;
  metadata?: Record<string, unknown>;
}

export interface DetectedLifeEvent extends LifeEvent {
  detectionMethod: 'TRANSACTIONAL' | 'PROFILE' | 'MANUAL' | 'AI';
  detectedConfidence: number;
}

export interface LifeEventStageUpdate {
  eventId: string;
  stage: LifeEventStage;
  updatedAt: string;
}

export default {};
