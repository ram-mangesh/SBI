// ============================================================================
// Domain Types — Recommendation
// Source of Truth: BankMate AI Frontend Blueprint · Section 6.2.4 + Section 7
// ============================================================================

import type { Product } from './product.types';
import type { LifeEventType } from '@/core/constants/life-events.constants';

export type RecommendationStatus =
  | 'NEW'
  | 'VIEWED'
  | 'SAVED'
  | 'DISMISSED'
  | 'APPLIED';

export type MatchScoreLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Recommendation {
  id: string;
  customerId: string;
  product: Product;
  matchScore: number; // 0–100
  matchScoreLevel: MatchScoreLevel;
  lifeEventType?: LifeEventType;
  reason: string;
  aiExplanation?: string;
  affordability: {
    monthlyEMI: number;
    incomeUtilization: number; // 0–1 ratio
    isAffordable: boolean;
  };
  eligibility: {
    isEligible: boolean;
    criteria: Array<{ name: string; passed: boolean; description?: string }>;
  };
  status: RecommendationStatus;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationFilters {
  status?: RecommendationStatus | 'ALL';
  lifeEventType?: LifeEventType;
  category?: string;
  sortBy?: 'matchScore' | 'createdAt' | 'affordability';
  sortOrder?: 'asc' | 'desc';
}

export default {};
