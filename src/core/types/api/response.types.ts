// ============================================================================
// API Response Types
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10
// Standard response envelope shapes + auth/session responses.
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiErrorResponse {
  success: false;
  code?: string;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  timestamp?: string;
  path?: string;
}

// ── Auth responses ──────────────────────────────────────────────────────
export interface AuthSessionResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
  user: SessionUser;
}

export interface SessionUser {
  id: string;
  email: string | null;
  mobile: string;
  fullName: string;
  roles: string[];
  customerId?: string;
  profileCompleted?: boolean;
  kycStatus?: string;
}

export interface OtpResponse {
  referenceId: string;
  expiresIn: number;
  resendAvailableIn: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ── Health / system ─────────────────────────────────────────────────────
export interface HealthResponse {
  status: 'UP' | 'DOWN';
  timestamp: string;
  version?: string;
}

export default {};
