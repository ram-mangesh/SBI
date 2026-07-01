// ============================================================================
// ProfileCompletionGuard
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2
// Gates routes behind profile completion stages:
//   STARTED 20% · BASIC 40% · FINANCIAL 60% · PREFERENCES 80% · COMPLETE 100%
// ============================================================================

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, PROFILE_COMPLETION_STAGES } from '@/store/auth.store';
import { ROUTES } from '@/core/config/routes.config';

export type ProfileCompletionStage = keyof typeof PROFILE_COMPLETION_STAGES;

export interface ProfileCompletionGuardProps {
  children: ReactNode;
  /** Minimum completion stage required. */
  stage: ProfileCompletionStage;
  /** Fallback route — defaults to onboarding. */
  fallback?: string;
}

/**
 * Renders children only when the user's profile completion percentage meets
 * the threshold for the requested stage. Otherwise redirects to onboarding.
 */
export function ProfileCompletionGuard({
  children,
  stage,
  fallback = ROUTES.ONBOARDING,
}: ProfileCompletionGuardProps) {
  const completion = useAuthStore((s) => s.profileCompletionPct);
  const required = PROFILE_COMPLETION_STAGES[stage];

  if (completion < required) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}

export default ProfileCompletionGuard;