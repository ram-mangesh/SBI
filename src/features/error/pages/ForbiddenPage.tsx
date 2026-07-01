// ============================================================================
// 403 — Forbidden
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.7 (Error Pages)
// Shown by RoleGuard when a user lacks the required role privilege.
// ============================================================================

import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { ROUTES } from '@/core/config/routes.config';
import { useAuthStore, resolveUserRole } from '@/store/auth.store';
import { UserRole } from '@/core/constants/roles.constants';

function landingRoute(): string {
  const user = useAuthStore.getState().user;
  if (!user) return ROUTES.LOGIN;
  switch (resolveUserRole(user)) {
    case UserRole.ADMIN:
      return ROUTES.ADMIN_DASHBOARD;
    case UserRole.RELATIONSHIP_MANAGER:
      return ROUTES.RM_DASHBOARD;
    case UserRole.CUSTOMER:
    default:
      return ROUTES.DASHBOARD;
  }
}

export function ForbiddenPage() {
  return (
    <ErrorState
      icon={ShieldAlert}
      statusCode={403}
      title="Access denied"
      message="You don't have permission to view this page. If you believe this is a mistake, contact your administrator."
      tone="danger"
      actions={
        <Link
          to={landingRoute()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to your dashboard
        </Link>
      }
    />
  );
}

export default ForbiddenPage;