import axiosInstance from '@/core/api/client/axios-instance';
import { API_CONFIG } from '@/core/config/api.config';
import { UserRole } from '@/core/constants/roles.constants';
import type { ApiResponse, SessionUser } from '@/core/types';
import type {
  AuthFlowResult,
  AuthSession,
  AuthTokens,
  ForgotPasswordPayload,
  LoginFormValues,
  OtpChallenge,
  OtpPurpose,
  RegisterFormValues,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from '../types/auth.types';

type AnyRecord = Record<string, unknown>;

function unwrap<T>(payload: unknown): T {
  const envelope = payload as ApiResponse<T> | T;
  if (
    envelope &&
    typeof envelope === 'object' &&
    'data' in envelope &&
    (envelope as ApiResponse<T>).data !== undefined
  ) {
    return (envelope as ApiResponse<T>).data;
  }
  return envelope as T;
}

function asRecord(value: unknown): AnyRecord {
  return value && typeof value === 'object' ? (value as AnyRecord) : {};
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function normalizeUser(raw: unknown): SessionUser {
  const data = asRecord(raw);
  const profile = asRecord(data.profile);
  const name =
    asString(data.fullName) ||
    asString(data.name) ||
    [asString(data.firstName), asString(data.lastName)].filter(Boolean).join(' ') ||
    asString(profile.fullName) ||
    'BankMate Customer';

  const roles = Array.isArray(data.roles)
    ? data.roles.filter((role): role is string => typeof role === 'string')
    : [asString(data.role, UserRole.CUSTOMER)];

  return {
    id: asString(data.id) || asString(data.userId) || asString(data.customerId),
    email: asString(data.email) || null,
    mobile: asString(data.mobile) || asString(data.phone),
    fullName: name,
    roles: roles.length ? roles : [UserRole.CUSTOMER],
    customerId: asString(data.customerId) || asString(data.id),
    profileCompleted: Boolean(data.profileCompleted ?? data.isProfileComplete),
    kycStatus: asString(data.kycStatus) || asString(profile.kycStatus),
  };
}

function normalizeTokens(data: AnyRecord): AuthTokens | null {
  const accessToken = asString(data.accessToken) || asString(data.token);
  const refreshToken = asString(data.refreshToken);
  if (!accessToken || !refreshToken) return null;

  return {
    accessToken,
    refreshToken,
    expiresIn: asNumber(data.expiresIn, 86400),
  };
}

function normalizeOtp(raw: unknown, purpose: OtpPurpose, fallbackDestination: string): OtpChallenge {
  const data = asRecord(raw);
  return {
    referenceId: asString(data.referenceId) || asString(data.otpSessionId) || asString(data.sessionId),
    destination: asString(data.destination) || asString(data.mobile) || fallbackDestination,
    purpose,
    expiresIn: asNumber(data.expiresIn, 300),
    resendAvailableIn: asNumber(data.resendAvailableIn, 30),
  };
}

function normalizeAuthFlow(raw: unknown, purpose: OtpPurpose, destination: string): AuthFlowResult {
  const data = asRecord(raw);
  const status = asString(data.status).toUpperCase();
  const userPayload = data.user ?? data.customer ?? data.profile;
  const tokens = normalizeTokens(data);

  if (status === 'OTP_REQUIRED' || data.otpRequired === true || data.referenceId || data.otpSessionId) {
    return {
      status: 'OTP_REQUIRED',
      otp: normalizeOtp(data.otp ?? data, purpose, destination),
      message: asString(data.message),
    };
  }

  if (tokens && userPayload) {
    const session: AuthSession = {
      user: normalizeUser(userPayload),
      tokens,
      profileCompletionPct: asNumber(data.profileCompletionPct, 0),
      kycStatus: asString(data.kycStatus) || null,
    };
    return { status: 'AUTHENTICATED', session, message: asString(data.message) };
  }

  return {
    status: 'OTP_REQUIRED',
    otp: normalizeOtp(data, purpose, destination),
    message: asString(data.message),
  };
}

export const authApi = {
  async login(values: LoginFormValues): Promise<AuthFlowResult> {
    const payload = await axiosInstance.post(`${API_CONFIG.prefixes.auth}/login`, {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });
    return normalizeAuthFlow(unwrap(payload), 'LOGIN', values.email);
  },

  async register(values: RegisterFormValues): Promise<AuthFlowResult> {
    const payload = await axiosInstance.post(`${API_CONFIG.prefixes.customers}/register`, {
      fullName: values.fullName,
      mobile: values.mobile,
      email: values.email,
      password: values.password,
    });
    return normalizeAuthFlow(unwrap(payload), 'REGISTRATION', values.mobile);
  },

  async verifyOtp(values: VerifyOtpPayload): Promise<AuthFlowResult> {
    const payload = await axiosInstance.post(`${API_CONFIG.prefixes.auth}/verify-otp`, values);
    return normalizeAuthFlow(unwrap(payload), values.purpose, values.referenceId);
  },

  async resendOtp(challenge: OtpChallenge): Promise<OtpChallenge> {
    const payload = await axiosInstance.post(`${API_CONFIG.prefixes.auth}/resend-otp`, {
      referenceId: challenge.referenceId,
      purpose: challenge.purpose,
    });
    return normalizeOtp(unwrap(payload), challenge.purpose, challenge.destination);
  },

  async forgotPassword(values: ForgotPasswordPayload): Promise<string> {
    const payload = await axiosInstance.post(`${API_CONFIG.prefixes.auth}/forgot-password`, values);
    const data = asRecord(unwrap(payload));
    return asString(data.message, 'Password reset instructions have been sent.');
  },

  async resetPassword(values: ResetPasswordPayload): Promise<string> {
    const payload = await axiosInstance.post(`${API_CONFIG.prefixes.auth}/reset-password`, values);
    const data = asRecord(unwrap(payload));
    return asString(data.message, 'Password reset successfully.');
  },

  async logout(): Promise<void> {
    await axiosInstance.post(`${API_CONFIG.prefixes.auth}/logout`);
  },
};

export default authApi;
