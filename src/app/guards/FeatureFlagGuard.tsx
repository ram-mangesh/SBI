// ============================================================================
// FeatureFlagGuard
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2
// Gates routes behind feature flags:
//   voice_campaigns · financial_goals · voice_config_access · voice_agent
// ============================================================================

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/core/config/routes.config';
import {
  FeatureFlag,
  FEATURE_FLAG_DEFAULTS,
} from '@/core/constants/feature-flags.constants';

export interface FeatureFlagGuardProps {
  children: ReactNode;
  /** Flag that must be enabled to view the route. */
  flag: FeatureFlag;
  /** Fallback route when the flag is off (defaults to 404). */
  fallback?: string;
}

/**
 * Renders children only when the requested feature flag is enabled.
 * Flag resolution currently uses build-time defaults; Section 4 will replace
 * this with a remote-config / entitlement-backed resolver.
 */
export function FeatureFlagGuard({
  children,
  flag,
  fallback = ROUTES.NOT_FOUND,
}: FeatureFlagGuardProps) {
  const enabled = FEATURE_FLAG_DEFAULTS[flag];

  if (!enabled) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}

export default FeatureFlagGuard;