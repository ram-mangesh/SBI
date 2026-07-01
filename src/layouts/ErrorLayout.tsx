// ============================================================================
// ErrorLayout
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.1 / 3.1 / 3.13
//   Section 3.11 (Empty & Error States)
// Layout shell for error pages (404 / 403 / 500 / 503 / offline / session-exp).
//   ┌─────────────────────────────────────────────────┐
//   │              [Illustration]                       │
//   │                                                 │
//   │            Error 404                            │
//   │        Page not found                           │
//   │   The page you're looking for doesn't exist…     │
//   │                                                 │
//   │      [Go Home]  [Report Issue]                   │
//   │                                                 │
//   │ Error ID: abc-123  │  Help · Terms · Privacy    │
//   └─────────────────────────────────────────────────┘
//
// Centers content vertically, provides an illustration slot, and renders
// help links in the footer. Error pages pass their own illustration/content
// via <Outlet/>.
// ============================================================================

import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/core/config/routes.config';
import { APP_NAME } from '@/core/constants/app.constants';
import { cn } from '@/core/utils/cn.utils';

/** Map common error paths to a numeric code and default title. */
function errorMeta(pathname: string): { code: string; title: string } {
  if (pathname === ROUTES.NOT_FOUND) return { code: '404', title: 'Page not found' };
  if (pathname === ROUTES.FORBIDDEN) return { code: '403', title: 'Access denied' };
  if (pathname === ROUTES.SERVER_ERROR) return { code: '500', title: 'Server error' };
  if (pathname === ROUTES.MAINTENANCE) return { code: '503', title: 'Under maintenance' };
  if (pathname === ROUTES.OFFLINE) return { code: 'offline', title: 'You are offline' };
  if (pathname === ROUTES.SESSION_EXPIRED) return { code: '401', title: 'Session expired' };
  return { code: 'Error', title: 'Something went wrong' };
}

export interface ErrorLayoutProps {
  className?: string;
}

export function ErrorLayout({ className }: ErrorLayoutProps) {
  const location = useLocation();
  const { code } = errorMeta(location.pathname);

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center bg-app',
        className,
      )}
    >
      <main id="main-content" className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-gray-100 py-5 text-center text-xs text-muted-app">
        <nav aria-label="Help" className="mb-2 flex items-center justify-center gap-4">
          <Link to={ROUTES.HELP} className="hover:text-app">
            Help Center
          </Link>
          <Link to={ROUTES.TERMS} className="hover:text-app">
            Terms
          </Link>
          <Link to={ROUTES.PRIVACY} className="hover:text-app">
            Privacy
          </Link>
          <Link to={ROUTES.CONTACT} className="hover:text-app">
            Contact
          </Link>
        </nav>
        <p>© {new Date().getFullYear()} {APP_NAME} · Error ID: {code}</p>
      </footer>
    </div>
  );
}

export default ErrorLayout;
