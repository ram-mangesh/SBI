// ============================================================================
// API Error Handler
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10
// Normalizes all API errors → ApiError type with user-friendly messages.
// ============================================================================

import { AxiosError } from 'axios';
import {
  HTTP_ERROR_MESSAGES,
  BUSINESS_ERROR_MESSAGES,
  BUSINESS_ERROR_CODES,
  type BusinessErrorCode,
} from '@/core/constants/error-codes.constants';
import logger from '@/core/utils/logger.utils';

/** Standardized application-level error from API calls. */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isNetworkError: boolean;
  public readonly isServerError: boolean;
  public readonly isClientError: boolean;
  public readonly isAuthError: boolean;
  public readonly fieldErrors?: Array<{ field: string; message: string }>;

  constructor(statusCode: number, code: string, message: string, fieldErrors?: Array<{ field: string; message: string }>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.isNetworkError = statusCode === 0;
    this.isServerError = statusCode >= 500;
    this.isClientError = statusCode >= 400 && statusCode < 500;
    this.isAuthError = statusCode === 401 || statusCode === 403;
    this.fieldErrors = fieldErrors;
  }
}

/** Handle an Axios error and return a normalized ApiError. */
export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const responseData = error.response?.data;

    // Business error code from response body
    const businessCode = responseData?.code;
    if (businessCode && businessCode in BUSINESS_ERROR_CODES) {
      const code = businessCode as BusinessErrorCode;
      return new ApiError(
        status,
        code,
        BUSINESS_ERROR_MESSAGES[code],
        responseData?.errors
      );
    }

    // Field-level validation errors (422)
    if (status === 422 && Array.isArray(responseData?.errors)) {
      const fieldMsg = responseData.errors.map((e: { field: string; message: string }) => e.message).join(', ');
      return new ApiError(status, 'VALIDATION_ERROR', fieldMsg, responseData.errors);
    }

    // HTTP status code mapping
    const message = HTTP_ERROR_MESSAGES[status] ?? responseData?.message ?? 'An unexpected error occurred.';
    const code = status === 401 ? BUSINESS_ERROR_CODES.AUTH_TOKEN_EXPIRED : `HTTP_${status}`;
    return new ApiError(status, code, message);
  }

  // Network / unknown errors
  if (error instanceof Error) {
    if (error.message === 'Network Error' || error.message === 'Failed to fetch') {
      return new ApiError(0, BUSINESS_ERROR_CODES.NETWORK_ERROR, BUSINESS_ERROR_MESSAGES.NETWORK_ERROR);
    }
    logger.error('Unexpected error in API handler', error);
    return new ApiError(0, BUSINESS_ERROR_CODES.UNKNOWN_ERROR, BUSINESS_ERROR_MESSAGES.UNKNOWN_ERROR);
  }

  return new ApiError(0, BUSINESS_ERROR_CODES.UNKNOWN_ERROR, BUSINESS_ERROR_MESSAGES.UNKNOWN_ERROR);
}

export default { ApiError, handleApiError };
