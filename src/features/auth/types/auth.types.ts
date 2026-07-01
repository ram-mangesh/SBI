import type { SessionUser } from '@/core/types';

export type OtpPurpose = 'LOGIN' | 'REGISTRATION' | 'PASSWORD_RESET';

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormValues {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export interface OtpChallenge {
  referenceId: string;
  destination: string;
  purpose: OtpPurpose;
  expiresIn: number;
  resendAvailableIn: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthSession {
  user: SessionUser;
  tokens: AuthTokens;
  profileCompletionPct?: number;
  kycStatus?: string | null;
}

export interface AuthFlowResult {
  status: 'AUTHENTICATED' | 'OTP_REQUIRED';
  session?: AuthSession;
  otp?: OtpChallenge;
  message?: string;
}

export interface VerifyOtpPayload {
  referenceId: string;
  otp: string;
  purpose: OtpPurpose;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface SessionBroadcastMessage {
  type: 'LOGOUT' | 'TOKENS_REFRESHED' | 'ACTIVITY';
  sourceId: string;
  at: number;
}
