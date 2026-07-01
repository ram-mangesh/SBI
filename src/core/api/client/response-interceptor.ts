// ============================================================================
// Response Interceptor
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10 + Section 4.2.6
// 200-299 → return response.data
// 401 → token refresh (single-flight) → replay queued requests → else logout
// 403 → role error (auth:forbidden)
// 429 → rate limit warning
// 5xx → log + throw ApiError
// ============================================================================

import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { handleApiError } from './error-handler';
import { tokenManager, AUTH_EVENTS } from './token-manager';
import logger from '@/core/utils/logger.utils';

// Single-flight refresh gate + queue of requests that 401'd mid-refresh.
let isRefreshing = false;
let pendingRequests: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function flushPending(token: string | null): void {
  pendingRequests.forEach((p) => {
    if (token) {
      p.resolve(token);
    } else {
      p.reject(new Error('Session expired'));
    }
  });
  pendingRequests = [];
}

/** Extract payload from successful responses. */
export function unwrapResponse<T>(response: AxiosResponse<T>): T {
  return response.data;
}

/** Handle 401 — attempt token refresh, then replay the original request. */
export async function handleUnauthorizedError(
  error: unknown,
): Promise<unknown> {
  const apiError = handleApiError(error);
  const originalRequest = axios.isAxiosError(error)
    ? (error.config as InternalAxiosRequestConfig | undefined)
    : undefined;

  if (apiError.statusCode !== 401 || !originalRequest) {
    return Promise.reject(apiError);
  }

  // The refresh endpoint itself returned 401 → session is truly over.
  const isRefreshCall = originalRequest.url?.includes('/auth/refresh');
  if (isRefreshCall) {
    tokenManager.clearTokens();
    window.dispatchEvent(new CustomEvent(AUTH_EVENTS.SESSION_EXPIRED));
    return Promise.reject(apiError);
  }

  // Queue this request if a refresh is already in flight (single-flight).
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      pendingRequests.push({ resolve, reject });
    }).then((token) => {
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axios(originalRequest);
    });
  }

  isRefreshing = true;
  const refreshed = await tokenManager.refresh();
  isRefreshing = false;

  if (refreshed) {
    flushPending(refreshed.accessToken);
    originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
    return axios(originalRequest);
  }

  // Refresh failed — clear session and signal the app to redirect.
  flushPending(null);
  tokenManager.clearTokens();
  logger.warn('Session expired — tokens cleared', { url: originalRequest.url });
  window.dispatchEvent(new CustomEvent(AUTH_EVENTS.SESSION_EXPIRED));
  return Promise.reject(apiError);
}

/** Main response error handler — dispatches to specialized handlers. */
export async function handleResponseError(error: unknown): Promise<never> {
  const apiError = handleApiError(error);

  // 403 — role/permission error
  if (apiError.statusCode === 403) {
    window.dispatchEvent(new CustomEvent(AUTH_EVENTS.FORBIDDEN));
    return Promise.reject(apiError);
  }

  // 429 — rate limited (no auto-retry here; UI shows toast)
  if (apiError.statusCode === 429) {
    logger.warn('Rate limited', { code: apiError.code });
  }

  // 5xx — server error
  if (apiError.isServerError) {
    logger.error('Server error', { status: apiError.statusCode, code: apiError.code });
  }

  return Promise.reject(apiError);
}

export function logResponse(response: AxiosResponse): AxiosResponse {
  if (import.meta.env.DEV) {
    logger.debug(`← ${response.status} ${response.config.url}`);
  }
  return response;
}

export default {
  unwrapResponse,
  handleUnauthorizedError,
  handleResponseError,
  logResponse,
};
