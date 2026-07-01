// ============================================================================
// Token Manager
// Source of Truth: BankMate AI Frontend Blueprint · Section 4.2 (Session Mgmt)
//   4.2.1 JWT Lifecycle · 4.2.2 Token Storage · 4.2.6 Token Refresh Strategy
//
// Canonical read/write layer for the raw localStorage token keys
// (`bankmate.accessToken` / `bankmate.refreshToken` / `bankmate.sessionExpiry`).
// The zustand auth store mirrors into these keys so the axios request
// interceptor (which reads raw keys) and React auth state never drift apart.
//
// Also owns the single-flight token refresh — used by:
//   - response-interceptor (reactive 401 refresh)
//   - SessionManager (proactive pre-expiry refresh)
//   - AppInitializer (restore on load)
// Refresh uses a raw `fetch` (NOT the intercepted axios instance) so it can
// never recurse into the 401-refresh path.
// ============================================================================

import { API_CONFIG } from '@/core/config/api.config';
import { APP_CONFIG } from '@/core/config/app.config';
import { storage } from '@/core/utils/storage.utils';
import logger from '@/core/utils/logger.utils';

const KEYS = {
  access: APP_CONFIG.tokenStorageKey,
  refresh: APP_CONFIG.refreshTokenStorageKey,
  expiry: APP_CONFIG.sessionExpiryKey,
} as const;

/** App-wide custom events broadcast by the token manager. */
export const AUTH_EVENTS = {
  TOKENS_REFRESHED: 'auth:tokens-refreshed',
  SESSION_EXPIRED: 'auth:session-expired',
  FORBIDDEN: 'auth:forbidden',
} as const;

export interface TokenSet {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
}

/** Lead time before expiry at which a proactive refresh is scheduled. */
export const REFRESH_LEAD_TIME_MS = 5 * 60 * 1000; // 5 minutes

function readExpiresAt(): number | null {
  const raw = storage.local.getRaw(KEYS.expiry);
  if (!raw) return null;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
}

// ── Single-flight refresh ─────────────────────────────────────────────────
let refreshPromise: Promise<TokenSet | null> | null = null;

/**
 * Refresh the access token. Single-flight: concurrent callers share one
 * in-flight request. Returns null when there is no refresh token or the
 * refresh fails (caller should treat null as "session ended").
 */
export function refreshTokens(): Promise<TokenSet | null> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = doRefresh().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
}

async function doRefresh(): Promise<TokenSet | null> {
  const refreshToken = storage.local.getRaw(KEYS.refresh);
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.prefixes.auth}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return null;

    const payload = await response.json();
    // Backend envelopes vary; accept both { data: {...} } and flat shapes,
    // and both `accessToken` and `token` field names.
    const data = payload?.data ?? payload;
    const accessToken: string | undefined = data?.accessToken ?? data?.token;
    if (!accessToken) return null;

    const set: TokenSet = {
      accessToken,
      refreshToken: data?.refreshToken ?? refreshToken,
      expiresIn: Number(data?.expiresIn ?? 86400),
    };
    tokenManager.setTokens(set);
    logger.info('[auth] Token refreshed');
    return set;
  } catch (error) {
    logger.warn('[auth] Token refresh failed', error);
    return null;
  }
}

export const tokenManager = {
  KEYS,

  // ── Reads ──────────────────────────────────────────────────────────
  getAccessToken(): string | null {
    return storage.local.getRaw(KEYS.access);
  },
  getRefreshToken(): string | null {
    return storage.local.getRaw(KEYS.refresh);
  },
  getExpiresAt(): number | null {
    return readExpiresAt();
  },
  hasAccessToken(): boolean {
    return !!storage.local.getRaw(KEYS.access);
  },

  /** True when the access token is missing or past its expiry. */
  isExpired(): boolean {
    const exp = readExpiresAt();
    return exp === null ? true : Date.now() >= exp;
  },

  /** Milliseconds until the access token expires (0 if already expired). */
  expiresInMs(): number {
    const exp = readExpiresAt();
    return exp ? Math.max(0, exp - Date.now()) : 0;
  },

  /** True when within REFRESH_LEAD_TIME_MS of expiry. */
  isExpiringSoon(): boolean {
    const remaining = this.expiresInMs();
    return remaining > 0 && remaining <= REFRESH_LEAD_TIME_MS;
  },

  // ── Writes ─────────────────────────────────────────────────────────
  /** Persist a token set to raw storage and broadcast the refresh event. */
  setTokens(set: TokenSet): void {
    storage.local.setRaw(KEYS.access, set.accessToken);
    storage.local.setRaw(KEYS.refresh, set.refreshToken);
    storage.local.setRaw(KEYS.expiry, String(Date.now() + set.expiresIn * 1000));
    window.dispatchEvent(
      new CustomEvent(AUTH_EVENTS.TOKENS_REFRESHED, { detail: { expiresIn: set.expiresIn } }),
    );
  },

  /** Remove all token keys (does NOT broadcast). */
  clearTokens(): void {
    storage.local.remove(KEYS.access);
    storage.local.remove(KEYS.refresh);
    storage.local.remove(KEYS.expiry);
  },

  /** Trigger the single-flight refresh. */
  refresh: refreshTokens,
};

export default tokenManager;
