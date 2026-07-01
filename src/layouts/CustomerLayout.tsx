// ============================================================================
// CustomerLayout
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.1 / 3.1 / 3.3 / 3.4
//   Section 3.5.2 (Authenticated Footer) · 3.6 (Content Container)
// App shell for /customer/* routes:
//   ┌─────────────────────────────────────────────────┐
//   │ AppHeader (sticky, z-100)                       │
//   ├──────────┬──────────────────────────────────────┤
//   │ Sidebar  │ Content area                         │
//   │ 280/64px │  ├─ Life Event Banner (if any)        │
//   │ (fixed)  │  ├─ Page Title (sticky z-40)          │
//   │          │  ├─ <Outlet />                        │
//   │          │  └─ Footer (40px, hidden on mobile)   │
//   ├──────────┴──────────────────────────────────────┤
//   │ MobileBottomNav (60px, lg:hidden)               │
//   └─────────────────────────────────────────────────┘
//   Mobile: sidebar → drawer via MobileNavDrawer.
// ============================================================================

import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';
import { PageTransition } from '@/shared/components/feedback/PageTransition';
import { LifeEventBanner, PageShell } from '@/shared/components/layout';
import { useLocation } from 'react-router-dom';
import { useUIStore } from '@/store';
import { cn } from '@/core/utils/cn.utils';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/core/config/routes.config';
import { APP_NAME } from '@/core/constants/app.constants';
import { FloatingCopilot } from '@/features/chat/components/CopilotExperience';

// Lazy-loaded chrome
const CustomerSidebar = lazy(() =>
  import('@/shared/components/navigation/CustomerSidebar').then((m) => ({
    default: m.CustomerSidebar,
  })),
);
const AppHeader = lazy(() =>
  import('@/shared/components/navigation/AppHeader').then((m) => ({
    default: m.AppHeader,
  })),
);
const MobileBottomNav = lazy(() =>
  import('@/shared/components/navigation/MobileBottomNav').then((m) => ({
    default: m.MobileBottomNav,
  })),
);
const MobileNavDrawer = lazy(() =>
  import('@/shared/components/navigation/MobileNavDrawer').then((m) => ({
    default: m.MobileNavDrawer,
  })),
);

export function CustomerLayout() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      {/* ── Desktop sidebar (fixed left) ─────────────────────────────── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[200] hidden border-r border-app bg-surface transition-[width] duration-300 ease-in-out lg:block',
          collapsed ? 'w-16' : 'w-[280px]',
        )}
        style={{ top: 0 }}
      >
        <Suspense fallback={<div className="p-4" />}>
          <CustomerSidebar />
        </Suspense>
      </aside>

      {/* ── Main column ─────────────────────────────────────────────── */}
      <div
        className={cn(
          'flex flex-1 flex-col transition-[margin] duration-300 ease-in-out',
          // Offset for fixed sidebar on desktop
          'lg:transition-[margin]',
          !collapsed && 'lg:ml-[280px]',
          collapsed && 'lg:ml-16',
        )}
      >
        <Suspense fallback={null}>
          <AppHeader role="customer" />
        </Suspense>

        <main id="main-content" className="flex-1 pb-24 lg:pb-6">
          <ErrorBoundary>
            <PageTransition routeKey={location.pathname}>
              <PageShell banner={<LifeEventBanner />}>
                <Outlet />
              </PageShell>
            </PageTransition>
          </ErrorBoundary>
        </main>

        {/* ── Authenticated footer (Section 3.5.2) — hidden on mobile ── */}
        <footer className="hidden border-t border-app bg-surface px-6 py-2.5 text-xs text-muted-app lg:block">
          <nav aria-label="Footer" className="flex items-center justify-between">
            <span>© {new Date().getFullYear()} {APP_NAME}</span>
            <div className="flex gap-4">
              <Link to={ROUTES.HELP} className="hover:text-app">
                Help
              </Link>
              <Link to={ROUTES.TERMS} className="hover:text-app">
                Terms
              </Link>
              <Link to={ROUTES.PRIVACY} className="hover:text-app">
                Privacy
              </Link>
            </div>
          </nav>
        </footer>
      </div>

      {/* ── Mobile drawer (lazy) ─────────────────────────────────────── */}
      <Suspense fallback={null}>
        <MobileNavDrawer role="customer" />
      </Suspense>

      {/* ── Mobile bottom nav ──────────────────────────────────────── */}
      <Suspense fallback={null}>
        <MobileBottomNav role="customer" />
      </Suspense>

      <FloatingCopilot />
    </div>
  );
}

export default CustomerLayout;
