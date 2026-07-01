// ============================================================================
// Error Codes Constants
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10 (error-handler)
// Maps HTTP status + business error codes to user-friendly messages.
// ============================================================================

export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'The request was invalid. Please check your input and try again.',
  401: 'Your session has expired. Please sign in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  408: 'The request timed out. Please try again.',
  409: 'A conflict occurred with the current state of the resource.',
  422: 'Some of the submitted data was invalid.',
  429: 'Too many requests. Please slow down and try again shortly.',
  500: 'Something went wrong on our end. Please try again later.',
  502: 'The service is temporarily unavailable. Please try again.',
  503: 'The service is under maintenance. Please try again later.',
  504: 'The server took too long to respond. Please try again.',
};

// Business error codes returned by the backend in { code } payload.
export const BUSINESS_ERROR_CODES = {
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_OTP_INVALID: 'AUTH_OTP_INVALID',
  AUTH_OTP_EXPIRED: 'AUTH_OTP_EXPIRED',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  CUSTOMER_NOT_FOUND: 'CUSTOMER_NOT_FOUND',
  CUSTOMER_PROFILE_INCOMPLETE: 'CUSTOMER_PROFILE_INCOMPLETE',
  KYC_NOT_VERIFIED: 'KYC_NOT_VERIFIED',
  KYC_DOCUMENT_INVALID: 'KYC_DOCUMENT_INVALID',
  KYC_ALREADY_VERIFIED: 'KYC_ALREADY_VERIFIED',
  APPLICATION_INVALID_STATE: 'APPLICATION_INVALID_STATE',
  APPLICATION_DUPLICATE: 'APPLICATION_DUPLICATE',
  PRODUCT_NOT_AVAILABLE: 'PRODUCT_NOT_AVAILABLE',
  RECOMMENDATION_NOT_FOUND: 'RECOMMENDATION_NOT_FOUND',
  ELIGIBILITY_FAILED: 'ELIGIBILITY_FAILED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type BusinessErrorCode = (typeof BUSINESS_ERROR_CODES)[keyof typeof BUSINESS_ERROR_CODES];

export const BUSINESS_ERROR_MESSAGES: Record<BusinessErrorCode, string> = {
  AUTH_INVALID_CREDENTIALS: 'Invalid phone number or password.',
  AUTH_OTP_INVALID: 'The OTP you entered is incorrect.',
  AUTH_OTP_EXPIRED: 'This OTP has expired. Please request a new one.',
  AUTH_TOKEN_EXPIRED: 'Your session has expired. Please sign in again.',
  AUTH_TOKEN_INVALID: 'Authentication failed. Please sign in again.',
  CUSTOMER_NOT_FOUND: 'We could not find your customer profile.',
  CUSTOMER_PROFILE_INCOMPLETE: 'Please complete your profile to continue.',
  KYC_NOT_VERIFIED: 'KYC verification is required to proceed.',
  KYC_DOCUMENT_INVALID: 'The uploaded document could not be verified.',
  KYC_ALREADY_VERIFIED: 'Your KYC is already verified.',
  APPLICATION_INVALID_STATE: 'This application cannot be modified in its current state.',
  APPLICATION_DUPLICATE: 'An application for this product already exists.',
  PRODUCT_NOT_AVAILABLE: 'This product is currently unavailable.',
  RECOMMENDATION_NOT_FOUND: 'This recommendation is no longer available.',
  ELIGIBILITY_FAILED: 'You are not currently eligible for this product.',
  RATE_LIMIT_EXCEEDED: 'Too many attempts. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

export default {
  HTTP_ERROR_MESSAGES,
  BUSINESS_ERROR_CODES,
  BUSINESS_ERROR_MESSAGES,
};
