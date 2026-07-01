// ============================================================================
// API Request Types
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10
// Generic request envelopes + shared pagination/filter params.
// ============================================================================

export interface ApiRequestConfig {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeout?: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

export interface BaseListParams extends PaginationParams, DateRangeParams {
  search?: string;
}

// ── Auth requests ───────────────────────────────────────────────────────
export interface LoginRequest {
  mobile?: string;
  email?: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  mobile: string;
  otp: string;
  purpose?: 'LOGIN' | 'REGISTRATION' | 'PASSWORD_RESET';
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// ── Analytics (fire-and-forget — Phase 1 §17) ──────────────────────────
export interface AnalyticsEventRequest {
  eventType: string;
  customerId?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export default {};
