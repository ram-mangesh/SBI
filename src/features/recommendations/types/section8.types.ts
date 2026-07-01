import type { ProductCategory, ProductType } from '@/core/constants/products.constants';
import type { LifeEventType } from '@/core/constants/life-events.constants';

export type EligibilityStatus = 'LIKELY_ELIGIBLE' | 'CHECK_ELIGIBILITY' | 'MAY_NOT_QUALIFY' | 'NOT_ELIGIBLE';
export type SortKey = 'best_match' | 'affordability' | 'newest' | 'rate_low';
export type ProductSortKey = 'recommended' | 'rate_low' | 'amount_high' | 'newest';

export interface Metric {
  label: string;
  value: string;
}

export interface Section8Product {
  id: string;
  name: string;
  provider: string;
  category: ProductCategory;
  type: ProductType;
  summary: string;
  metrics: Metric[];
  interestRate: number;
  minAmount?: number;
  maxAmount?: number;
  fee: string;
  features: string[];
  documents: string[];
  terms: Metric[];
  featured?: boolean;
  createdAt: string;
}

export interface Section8Recommendation {
  id: string;
  productId: string;
  matchScore: number;
  affordabilityScore: number;
  eligibilityStatus: EligibilityStatus;
  lifeEventType?: LifeEventType;
  createdAt: string;
  saved: boolean;
  dismissed: boolean;
  reason: string;
  explanation: string[];
  breakdown: Metric[];
}

export interface Section8State {
  savedIds: string[];
  dismissedIds: string[];
  comparisonIds: string[];
  recentlyViewedIds: string[];
  eligibilityChecks: Record<string, EligibilityStatus>;
  toggleSaved: (id: string) => void;
  dismiss: (id: string) => void;
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  removeCompare: (productId: string) => void;
  trackView: (productId: string) => void;
  runEligibility: (productId: string, fallback: EligibilityStatus) => void;
}
