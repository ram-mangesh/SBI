// ============================================================================
// API — Barrel Export
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10
// ============================================================================

export { default as axiosInstance } from './client/axios-instance';
export { attachRequestHeaders, logRequest } from './client/request-interceptor';
export { unwrapResponse, handleResponseError } from './client/response-interceptor';
export { ApiError, handleApiError } from './client/error-handler';
export { authApi } from '@/features/auth/api/auth.api';
