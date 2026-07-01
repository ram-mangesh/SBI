// ============================================================================
// Session Expired
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.7 (Error Pages)
// Shown when a token refresh fails. Clears the session and prompts re-login.
// ============================================================================

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, LogIn } from 'lucide-react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { ROUTES } from '@/core/config/routes.config';
import { useAuthStore } from '@/store/auth.store';

export function SessionExpiredPage() {
  const clearSession = useAuthStore((s) => s.clearSession);

  // Ensure no stale session lingers behind the error page.
  useEffect(() => {
    clearSession();
  }, [clearSession]);

  return (
    <ErrorState
      icon={Clock}
      title="Your session has expired"
      message="For your security, you've been signed out after a period of inactivity. Please sign in again to continue."
      tone="info"
      actions={
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Sign in again
        </Link>
      }
    />
  );
}

export default SessionExpiredPage;