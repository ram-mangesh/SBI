// ============================================================================
// GuestOnly
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2
// Inverse of AuthGuard — keeps authenticated users out of /auth/* routes.
// Redirects to the role-appropriate landing page.
// ============================================================================

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, resolveUserRole } from '@/store/auth.store';
import { ROUTES } from '@/core/config/routes.config';
import { UserRole } from '@/core/constants/roles.constants';

export interface GuestOnlyProps {
  children: ReactNode;
}

/** Role-aware post-login landing route. */
function landingRouteForRole(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return ROUTES.ADMIN_DASHBOARD;
    case UserRole.RELATIONSHIP_MANAGER:
      return ROUTES.RM_DASHBOARD;
    case UserRole.CUSTOMER:
    default:
      return ROUTES.DASHBOARD;
  }
}

/**
 * Renders children only when no session exists. Authenticated visitors are
 * forwarded to their role's dashboard.
 */
export function GuestOnly({ children }: GuestOnlyProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if (isAuthenticated && user) {
    return <Navigate to={landingRouteForRole(resolveUserRole(user))} replace />;
  }

  return <>{children}</>;
}

export default GuestOnly;