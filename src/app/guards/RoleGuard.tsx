// ============================================================================
// RoleGuard
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2
// Enforces role hierarchy: ADMIN > RELATIONSHIP_MANAGER > CUSTOMER.
// A user may access a route if their highest role's privilege >= required.
// ============================================================================

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, resolveUserRole } from '@/store/auth.store';
import { ROUTES } from '@/core/config/routes.config';
import { ROLE_PRIVILEGE, UserRole } from '@/core/constants/roles.constants';

export interface RoleGuardProps {
  children: ReactNode;
  /** Minimum role required to view the route. */
  role: UserRole;
  /** Optional fallback route when denied (defaults to /403). */
  fallback?: string;
}

/**
 * Grants access when the user's highest role meets or exceeds the required
 * privilege weight. Otherwise redirects to the forbidden page.
 */
export function RoleGuard({ children, role, fallback = ROUTES.FORBIDDEN }: RoleGuardProps) {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    // AuthGuard should always wrap RoleGuard upstream; guard anyway.
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const userRole = resolveUserRole(user);
  const hasAccess = ROLE_PRIVILEGE[userRole] >= ROLE_PRIVILEGE[role];

  if (!hasAccess) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}

export default RoleGuard;