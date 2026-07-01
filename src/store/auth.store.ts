// ============================================================================
// Auth Store
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2 (Guards)
//   + Section 4 (Auth & Session Management)
// Zustand store holding the current session. Guards read from this store;
// Section 4 wires real login/refresh/logout actions against the API.
//
// IMPORTANT — storage contract (Section 4.2.2):
//   The store is persisted as the `bankmate.auth` blob, but the axios
//   request interceptor reads the *raw* keys `bankmate.accessToken` etc.
//   So every mutating action mirrors tokens into those raw keys via the
//   token-manager, and onRehydrateStorage restores them so a reload never
//   desyncs React state from what the interceptor sees.
// ============================================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SessionUser } from '@/core/types';
import { UserRole, highestRole } from '@/core/constants/roles.constants';
import type { KYCStatus } from '@/core/constants/kyc.constants';
import { tokenManager, type TokenSet } from '@/core/api/client/token-manager';
import { APP_CONFIG } from '@/core/config/app.config';

/** Profile completion stages per Section 2.2 (ProfileCompletionGuard). */
export const PROFILE_COMPLETION_STAGES = {
  STARTED: 20,
  BASIC: 40,
  FINANCIAL: 60,
  PREFERENCES: 80,
  COMPLETE: 100,
} as const;

export type ProfileCompletionStage = keyof typeof PROFILE_COMPLETION_STAGES;

export interface AuthState {
  // ── Session ──────────────────────────────────────────────────────────
  user: SessionUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  /** Epoch ms when the access token expires. */
  expiresAt: number | null;
  /** True while the bootstrap session-restore is in flight. */
  isInitializing: boolean;
  /** Login persistence preference captured at sign-in. */
  rememberMe: boolean;
  /** Epoch ms of the last successful login. */
  loginAt: number | null;
  /** Epoch ms of the latest observed user activity. */
  lastActivityAt: number | null;

  // ── Derived profile signals (kept in sync by Section 4 actions) ──────
  profileCompletionPct: number;
  kycStatus: KYCStatus | null;

  // ── Actions ──────────────────────────────────────────────────────────
  setSession: (payload: {
    user: SessionUser;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    rememberMe?: boolean;
  }) => void;
  /** Update tokens after a refresh, preserving the existing user. */
  updateTokens: (set: TokenSet) => void;
  updateUser: (patch: Partial<SessionUser>) => void;
  setProfileCompletion: (pct: number) => void;
  setKycStatus: (status: KYCStatus | null) => void;
  setInitializing: (v: boolean) => void;
  setLastActivity: () => void;
  clearSession: () => void;
}

/** Resolve the highest-privilege role for a session user. */
export function resolveUserRole(user: SessionUser | null): UserRole {
  if (!user || !user.roles?.length) return UserRole.CUSTOMER;
  return highestRole(user.roles);
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      expiresAt: null,
      isInitializing: true,
      rememberMe: false,
      loginAt: null,
      lastActivityAt: null,

      profileCompletionPct: 0,
      kycStatus: null,

      setSession: ({ user, accessToken, refreshToken, expiresIn, rememberMe = false }) => {
        // Mirror into raw keys consumed by the request interceptor.
        tokenManager.setTokens({ accessToken, refreshToken, expiresIn });
        const now = Date.now();
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          expiresAt: Date.now() + expiresIn * 1000,
          isInitializing: false,
          rememberMe,
          loginAt: now,
          lastActivityAt: now,
          profileCompletionPct: user.profileCompleted ? 100 : 0,
          kycStatus: (user.kycStatus as KYCStatus | null) ?? null,
        });
      },

      updateTokens: ({ accessToken, refreshToken, expiresIn }) => {
        tokenManager.setTokens({ accessToken, refreshToken, expiresIn });
        set({
          accessToken,
          refreshToken,
          expiresAt: Date.now() + expiresIn * 1000,
          isInitializing: false,
        });
      },

      updateUser: (patch) =>
        set((s) => (s.user ? { user: { ...s.user, ...patch } } : s)),

      setProfileCompletion: (pct) => set({ profileCompletionPct: pct }),

      setKycStatus: (status) => set({ kycStatus: status }),

      setInitializing: (v) => set({ isInitializing: v }),

      setLastActivity: () => set({ lastActivityAt: Date.now() }),

      clearSession: () => {
        tokenManager.clearTokens();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          expiresAt: null,
          isInitializing: false,
          rememberMe: false,
          loginAt: null,
          lastActivityAt: null,
          profileCompletionPct: 0,
          kycStatus: null,
        });
      },
    }),
    {
      name: 'bankmate.auth',
      storage: createJSONStorage(() => localStorage),
      // Persist only token + user; never persist transient flags.
      partialize: (s) => ({
        user: s.user,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        isAuthenticated: s.isAuthenticated,
        expiresAt: s.expiresAt,
        rememberMe: s.rememberMe,
        loginAt: s.loginAt,
        lastActivityAt: s.lastActivityAt,
        profileCompletionPct: s.profileCompletionPct,
        kycStatus: s.kycStatus,
      }),
      // Keep raw localStorage token keys in sync with the persisted blob so
      // the axios interceptor and a fresh page load see the same tokens.
      onRehydrateStorage: () => (state) => {
        if (state?.isAuthenticated && state.accessToken && state.refreshToken) {
          // Recompute the remaining lifetime; clamp negative (already expired)
          // values to 0 so a refresh is triggered on the next request.
          const expiresIn = state.expiresAt
            ? Math.max(0, Math.round((state.expiresAt - Date.now()) / 1000))
            : 0;
          tokenManager.setTokens({
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            expiresIn,
          });
        }
        // Bootstrap is done once Zustand has rehydrated from localStorage.
        state?.setInitializing(false);
      },
    },
  ),
);

/** Storage keys mirrored from APP_CONFIG for non-store callers. */
export const AUTH_STORAGE_KEYS = {
  accessToken: APP_CONFIG.tokenStorageKey,
  refreshToken: APP_CONFIG.refreshTokenStorageKey,
  sessionExpiry: APP_CONFIG.sessionExpiryKey,
} as const;

export default useAuthStore;
