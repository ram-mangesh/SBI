// ============================================================================
// Life Events Constants
// Source of Truth: BankMate AI Frontend Blueprint · Section 6.2.3
//   HOME_PURCHASE / MARRIAGE / NEW_BABY / EDUCATION / CAREER_CHANGE /
//   RETIREMENT / BUSINESS_START / TRAVEL
// ============================================================================

export const LifeEventType = {
  HOME_PURCHASE: 'HOME_PURCHASE',
  MARRIAGE: 'MARRIAGE',
  NEW_BABY: 'NEW_BABY',
  EDUCATION: 'EDUCATION',
  CAREER_CHANGE: 'CAREER_CHANGE',
  RETIREMENT: 'RETIREMENT',
  BUSINESS_START: 'BUSINESS_START',
  TRAVEL: 'TRAVEL',
} as const;

export type LifeEventType = (typeof LifeEventType)[keyof typeof LifeEventType];

export const LIFE_EVENT_LABELS: Record<LifeEventType, string> = {
  HOME_PURCHASE: 'Home Purchase',
  MARRIAGE: 'Marriage Planning',
  NEW_BABY: 'New Family Member',
  EDUCATION: 'Education Planning',
  CAREER_CHANGE: 'Career Transition',
  RETIREMENT: 'Retirement Planning',
  BUSINESS_START: 'Business Launch',
  TRAVEL: 'Travel Planning',
};

export const LIFE_EVENT_EMOJI: Record<LifeEventType, string> = {
  HOME_PURCHASE: '🏠',
  MARRIAGE: '💍',
  NEW_BABY: '👶',
  EDUCATION: '🎓',
  CAREER_CHANGE: '💼',
  RETIREMENT: '🌅',
  BUSINESS_START: '🚀',
  TRAVEL: '✈️',
};

// Illustration asset name per Phase 1 folder (public/assets/illustrations/life-events)
export const LIFE_EVENT_ILLUSTRATIONS: Record<LifeEventType, string> = {
  HOME_PURCHASE: 'home-purchase',
  MARRIAGE: 'marriage',
  NEW_BABY: 'baby',
  EDUCATION: 'education',
  CAREER_CHANGE: 'business',
  RETIREMENT: 'retirement',
  BUSINESS_START: 'business',
  TRAVEL: 'travel',
};

export const LIFE_EVENT_TYPES = Object.values(LifeEventType);

export default {
  LifeEventType,
  LIFE_EVENT_LABELS,
  LIFE_EVENT_EMOJI,
  LIFE_EVENT_ILLUSTRATIONS,
  LIFE_EVENT_TYPES,
};
