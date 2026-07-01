// ============================================================================
// KYCGuard
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2
// Gates routes behind KYC verification state.
//   PENDING / IN_PROGRESS / VERIFIED / REJECTED / EXPIRED
// (Mapped onto the project's KYCStatus constant set.)
// ============================================================================

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/core/config/routes.config';
import { KYCStatus } from '@/core/constants/kyc.constants';

export interface KYCGuardProps {
  children: ReactNode;
  /**
   * KYC statuses permitted to view the route. Defaults to APPROVED only.
   * Routes that allow in-progress access pass [APPROVED, PENDING].
   */
  allowedStatuses?: KYCStatus[];
  /** Where to send users who fail the check. Defaults to the KYC flow. */
  fallback?: string;
}

const DEFAULT_ALLOWED: KYCStatus[] = [KYCStatus.APPROVED];

/**
 * Renders children only when the user's KYC status is in the allowed set.
 * Users without a verified KYC are sent to the KYC onboarding flow.
 */
export function KYCGuard({
  children,
  allowedStatuses = DEFAULT_ALLOWED,
  fallback = ROUTES.KYC,
}: KYCGuardProps) {
  const kycStatus = useAuthStore((s) => s.kycStatus);

  if (!kycStatus || !allowedStatuses.includes(kycStatus)) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}

export default KYCGuard;