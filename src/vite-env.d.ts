/// <reference types="vite/client" />

// ============================================================================
// Vite environment type declarations
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §2
// ============================================================================

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_ENV: 'development' | 'production' | 'test';
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_FCM_VAPID_KEY: string;
  readonly VITE_SSE_ENDPOINT: string;
  readonly VITE_ENABLE_REDUX_LOGGER: string;
  readonly VITE_ENABLE_QUERY_DEVTOOLS: string;
  readonly VITE_ENABLE_MOCK_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// App version injected via vite.config.ts define
declare const __APP_VERSION__: string;
