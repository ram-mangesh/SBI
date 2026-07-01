// ============================================================================
// AdminLayout
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.1 / 3.1 / 3.3.2
//   Section 3.5.3 (Admin Footer) · Section 3.4.4 (Collapsible sidebar)
// App shell for /admin/* routes:
//   ┌─────────────────────────────────────────────────┐
//   │ Admin Header (env tag, system health, alerts)   │
//   ├──────────┬──────────────────────────────────────┤
//   │ Sidebar  │ Content area                         │
//   │ 280/64px │  ├─ Page Title (sticky)              │
//   │ (fixed)  │  ├─ <Outlet />                       │
//   │          │  └─ Admin Footer (sys health bar)    │
//   └──────────┴──────────────────────────────────────┘
// ============================================================================

import { Suspense, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';
import { PageTransition } from '@/shared/components/feedback/PageTransition';
import { PageShell } from '@/shared/components/layout';
import { useUIStore } from '@/store';
import { cn } from '@/core/utils/cn.utils';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/core/config/routes.config';
import { APP_NAME, APP_VERSION } from '@/core/constants/app.constants';

const AdminSidebar = lazy(() =>
  import('@/shared/components/navigation/AdminSidebar').then((m) => ({
    default: m.AdminSidebar,
  })),
);
const AppHeader = lazy(() =>
  import('@/shared/components/navigation/AppHeader').then((m) => ({
    default: m.AppHeader,
  })),
);
const MobileNavDrawer = lazy(() =>
  import('@/shared/components/navigation/MobileNavDrawer').then((m) => ({
    default: m.MobileNavDrawer,
  })),
);

export function AdminLayout() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      {/* ── Desktop sidebar ──────────────────────────────────────────── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[200] hidden border-r border-app bg-surface transition-[width] duration-300 ease-in-out lg:block',
          collapsed ? 'w-16' : 'w-[280px]',
        )}
      >
        <Suspense fallback={<div className="p-4" />}>
          <AdminSidebar />
        </Suspense>
      </aside>

      {/* ── Main column ─────────────────────────────────────────────── */}
      <div
        className={cn(
          'flex flex-1 flex-col transition-[margin] duration-300 ease-in-out',
          !collapsed && 'lg:ml-[280px]',
          collapsed && 'lg:ml-16',
        )}
      >
        <Suspense fallback={null}>
          <AppHeader role="admin" />
        </Suspense>

        <main id="main-content" className="flex-1 pb-6 lg:pb-6">
          <ErrorBoundary>
            <PageTransition routeKey={location.pathname}>
              <PageShell width="list" description="Operational workspace for configuration, monitoring, analytics and management.">
                <Outlet />
              </PageShell>
            </PageTransition>
          </ErrorBoundary>
        </main>

        {/* ── Admin footer (Section 3.5.3) ────────────────────────────── */}
        <footer className="hidden border-t border-app bg-surface px-6 py-2.5 text-xs text-muted-app lg:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-success" title="System healthy" />
              <span>System Healthy</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{APP_NAME}</span>
              <span>v{APP_VERSION}</span>
              <Link to={ROUTES.ADMIN_SETTINGS} className="hover:text-app">
                Settings
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <MobileNavDrawer role="admin" />
      </Suspense>
    </div>
  );
}

export default AdminLayout;
