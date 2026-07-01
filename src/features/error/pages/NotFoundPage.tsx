// ============================================================================
// 404 — Not Found
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.7 (Error Pages)
// Rendered for unknown routes. Offers a way back to the dashboard / home.
// ============================================================================

import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { ROUTES } from '@/core/config/routes.config';
import { useAuthStore, resolveUserRole } from '@/store/auth.store';
import { UserRole } from '@/core/constants/roles.constants';

/** Role-aware landing route so the "Go home" CTA lands on the right dashboard. */
function landingRoute(): string {
  const user = useAuthStore.getState().user;
  if (!user) return ROUTES.ROOT;
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

export function NotFoundPage() {
  return (
    <ErrorState
      icon={FileQuestion}
      statusCode={404}
      title="Page not found"
      message="The page you're looking for doesn't exist or may have been moved. Check the address or head back home."
      tone="info"
      actions={
        <>
          <Link
            to={landingRoute()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go home
          </Link>
          <Link
            to={ROUTES.HELP}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Visit help center
          </Link>
        </>
      }
    />
  );
}

export default NotFoundPage;