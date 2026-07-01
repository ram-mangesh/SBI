// ============================================================================
// Axios Instance
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10
// Base URL, timeout, withCredentials: false (JWT Bearer strategy).
// ============================================================================

import axios from 'axios';
import { API_CONFIG } from '@/core/config/api.config';
import {
  attachRequestHeaders,
  logRequest,
  onRequestError,
} from './request-interceptor';
import {
  unwrapResponse,
  logResponse,
  handleUnauthorizedError,
  handleResponseError,
} from './response-interceptor';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    ...API_CONFIG.defaultHeaders,
  },
  withCredentials: false,
});

// ── Request pipeline ────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(attachRequestHeaders, onRequestError);
axiosInstance.interceptors.request.use(logRequest, onRequestError);

// ── Response pipeline ───────────────────────────────────────────────────
axiosInstance.interceptors.response.use(unwrapResponse as never, handleUnauthorizedError as never);
axiosInstance.interceptors.response.use(logResponse as never, handleResponseError);

export default axiosInstance;
