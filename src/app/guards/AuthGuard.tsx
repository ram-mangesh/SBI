// ============================================================================
// AuthGuard
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2
// Requires an authenticated session. Redirects to /auth/login with returnUrl.
// ============================================================================

import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/core/config/routes.config';
import { LoadingScreen } from '@/shared/components/feedback/LoadingScreen';

export interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Blocks rendering until authenticated.
 * - While the session bootstrap is in flight, show a loading screen.
 * - Once unauthenticated, redirect to login preserving the attempted URL.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitializing = useAuthStore((s) => s.isInitializing);

  if (isInitializing) {
    return <LoadingScreen message="Restoring your session…" />;
  }

  if (!isAuthenticated) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${ROUTES.LOGIN}?returnUrl=${returnUrl}`} replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;