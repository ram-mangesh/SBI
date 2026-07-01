// ============================================================================
// Environment Configuration
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §2
// Centralizes access to all VITE_* env vars with typed fallbacks.
// ============================================================================

type AppEnv = 'development' | 'production' | 'test';

const getEnv = (key: keyof ImportMetaEnv, fallback = ''): string => {
  const value = import.meta.env[key];
  return value === undefined || value === null ? fallback : String(value);
};

const parseBoolean = (value: string): boolean => value === 'true';

export const env = {
  apiBaseUrl: getEnv('VITE_API_BASE_URL', 'http://localhost:8080/api/v1'),
  appEnv: (getEnv('VITE_APP_ENV', 'development') as AppEnv) || 'development',
  appName: getEnv('VITE_APP_NAME', 'BankMate AI'),
  appVersion: getEnv('VITE_APP_VERSION', '1.0.0'),
  fcmVapidKey: getEnv('VITE_FCM_VAPID_KEY', ''),
  sseEndpoint: getEnv('VITE_SSE_ENDPOINT', 'http://localhost:8080/api/v1/events'),
  enableReduxLogger: parseBoolean(getEnv('VITE_ENABLE_REDUX_LOGGER', 'false')),
  enableQueryDevtools: parseBoolean(getEnv('VITE_ENABLE_QUERY_DEVTOOLS', 'false')),
  enableMockApi: parseBoolean(getEnv('VITE_ENABLE_MOCK_API', 'false')),
} as const;

export const isProduction = env.appEnv === 'production';
export const isDevelopment = env.appEnv === 'development';
export const isTest = env.appEnv === 'test';

export type EnvConfig = typeof env;

export default env;
