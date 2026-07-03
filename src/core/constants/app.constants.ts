// ============================================================================
// App Constants
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Global application-wide constants (non-feature).
// ============================================================================

export const APP_NAME = 'SbiSetu Ai';
export const APP_VERSION = __APP_VERSION__ ?? '1.0.0';

export const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const SUPPORTED_THEMES = ['light', 'dark', 'system'] as const;
export type SupportedTheme = (typeof SUPPORTED_THEMES)[number];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 0,
} as const;

export const STORAGE_KEYS = {
  THEME: 'bankmate.theme',
  LANGUAGE: 'bankmate.language',
  ACCESS_TOKEN: 'bankmate.accessToken',
  REFRESH_TOKEN: 'bankmate.refreshToken',
  SESSION_EXPIRY: 'bankmate.sessionExpiry',
  ONBOARDING_DRAFT: 'bankmate.onboardingDraft',
  APPLICATION_DRAFT: 'bankmate.applicationDraft',
  NOTIFICATION_PREFS: 'bankmate.notificationPrefs',
} as const;

export const QUERY_STALE_TIME = {
  SHORT: 30 * 1000, // 30s — volatile data
  MEDIUM: 5 * 60 * 1000, // 5m — default
  LONG: 30 * 60 * 1000, // 30m — reference data
  INFINITE: Infinity,
} as const;

export const DEFAULT_TIMEOUT = 30000; // 30s
export const RETRY_COUNT = 3;

export const SW_PATH = '/service-worker.js';

export default {
  APP_NAME,
  APP_VERSION,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  PAGINATION,
  STORAGE_KEYS,
  QUERY_STALE_TIME,
  DEFAULT_TIMEOUT,
  RETRY_COUNT,
};
