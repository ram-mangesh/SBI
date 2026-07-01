// ============================================================================
// Application Configuration
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Static, build-time app-level configuration.
// ============================================================================

import { env, isProduction } from './env.config';

export const APP_CONFIG = {
  name: env.appName,
  version: env.appVersion,
  environment: env.appEnv,
  isProduction,
  // Session / security
  tokenStorageKey: 'bankmate.accessToken',
  refreshTokenStorageKey: 'bankmate.refreshToken',
  sessionExpiryKey: 'bankmate.sessionExpiry',
  // Network
  apiBaseUrl: env.apiBaseUrl,
  apiTimeout: 30000,
  maxRetries: 3,
  // Cache (TanStack Query defaults)
  defaultStaleTime: 5 * 60 * 1000, // 5 minutes
  defaultCacheTime: 30 * 60 * 1000, // 30 minutes
  defaultRefetchOnWindowFocus: false,
  // Realtime
  sseReconnectBaseDelay: 1000, // 1s
  sseReconnectMaxDelay: 30000, // 30s
  // Pagination
  defaultPageSize: 20,
  // Push notifications (Section 10.6)
  fcmVapidKey: env.fcmVapidKey,
  pushEnabled: env.fcmVapidKey.length > 0 && isProduction,
} as const;

export type AppConfig = typeof APP_CONFIG;

export default APP_CONFIG;
