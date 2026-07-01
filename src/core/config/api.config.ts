// ============================================================================
// API Configuration
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10 (API Layer)
// Base paths + default request config consumed by axios client.
// ============================================================================

import { env } from './env.config';

export const API_CONFIG = {
  baseUrl: env.apiBaseUrl,
  // Endpoint prefixes map to backend /api/v1/* controllers (unchanged backend)
  prefixes: {
    auth: '/auth',
    customers: '/customers',
    lifeEvents: '/life-events',
    products: '/products',
    recommendations: '/recommendations',
    applications: '/applications',
    kyc: '/kyc',
    transactions: '/transactions',
    chat: '/chat',
    notifications: '/notifications',
    voice: '/voice',
    analytics: '/analytics',
    admin: '/admin',
    events: '/events', // SSE stream
  } as const,
  timeout: 30000,
  maxRetries: 3,
  // Retry-eligible status codes (response-interceptor — Phase 1 §10)
  retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  // Default headers
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } as const,
} as const;

export type ApiConfig = typeof API_CONFIG;

export default API_CONFIG;
