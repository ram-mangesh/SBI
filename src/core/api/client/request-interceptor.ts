// ============================================================================
// Request Interceptor
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10
// Injects: Authorization header, X-Request-ID, X-App-Version.
// ============================================================================

import type { InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/core/utils/storage.utils';
import { uuid } from '@/core/utils/encryption.utils';
import { APP_CONFIG } from '@/core/config/app.config';
import logger from '@/core/utils/logger.utils';

/**
 * Attach auth token + tracing headers to every outgoing request.
 * Called via axiosInstance.interceptors.request.use(attachRequestHeaders)
 */
export function attachRequestHeaders(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = storage.local.getRaw(APP_CONFIG.tokenStorageKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['X-Request-ID'] = uuid();
  config.headers['X-App-Version'] = APP_CONFIG.version;

  return config;
}

/**
 * Log outgoing requests in development.
 */
export function logRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  if (APP_CONFIG.environment === 'development') {
    logger.debug(`→ ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
    });
  }
  return config;
}

export function onRequestError(error: unknown): Promise<never> {
  return Promise.reject(error);
}

export default { attachRequestHeaders, logRequest, onRequestError };
