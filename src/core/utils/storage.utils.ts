// ============================================================================
// Storage Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Safe wrappers around localStorage / sessionStorage with JSON + SSR guards.
// ============================================================================

const isBrowser = typeof window !== 'undefined';

export const storage = {
  // ── localStorage ──────────────────────────────────────────────────
  local: {
    get<T>(key: string, fallback: T): T {
      if (!isBrowser) return fallback;
      try {
        const raw = window.localStorage.getItem(key);
        return raw === null ? fallback : (JSON.parse(raw) as T);
      } catch {
        return fallback;
      }
    },
    getRaw(key: string): string | null {
      if (!isBrowser) return null;
      return window.localStorage.getItem(key);
    },
    set<T>(key: string, value: T): void {
      if (!isBrowser) return;
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* quota / serialization errors — fail silently */
      }
    },
    setRaw(key: string, value: string): void {
      if (!isBrowser) return;
      window.localStorage.setItem(key, value);
    },
    remove(key: string): void {
      if (!isBrowser) return;
      window.localStorage.removeItem(key);
    },
    clear(): void {
      if (!isBrowser) return;
      window.localStorage.clear();
    },
  },

  // ── sessionStorage ────────────────────────────────────────────────
  session: {
    get<T>(key: string, fallback: T): T {
      if (!isBrowser) return fallback;
      try {
        const raw = window.sessionStorage.getItem(key);
        return raw === null ? fallback : (JSON.parse(raw) as T);
      } catch {
        return fallback;
      }
    },
    set<T>(key: string, value: T): void {
      if (!isBrowser) return;
      try {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* fail silently */
      }
    },
    remove(key: string): void {
      if (!isBrowser) return;
      window.sessionStorage.removeItem(key);
    },
    clear(): void {
      if (!isBrowser) return;
      window.sessionStorage.clear();
    },
  },
} as const;

export default storage;
