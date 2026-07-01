// ============================================================================
// RMLayout
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.1 / 3.1 / 3.3.3
//   Section 3.4.4 (Collapsible sidebar)
// App shell for /rm/* routes (Relationship Manager workspace):
//   ┌─────────────────────────────────────────────────┐
//   │ RM Header (calendar peek, task counter, target)  │
//   ├──────────┬──────────────────────────────────────┤
//   │ Sidebar  │ Content area                         │
//   │ 280/64px │  ├─ Page Title (sticky)              │
//   │ (fixed)  │  └─ <Outlet />                        │
//   └──────────┴──────────────────────────────────────┘
// ============================================================================

import { Suspense, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';
import { PageTransition } from '@/shared/components/feedback/PageTransition';
import { PageShell } from '@/shared/components/layout';
import { useUIStore } from '@/store';
import { cn } from '@/core/utils/cn.utils';

const RMSidebar = lazy(() =>
  import('@/shared/components/navigation/RMSidebar').then((m) => ({
    default: m.RMSidebar,
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

export function RMLayout() {
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
          <RMSidebar />
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
          <AppHeader role="rm" />
        </Suspense>

        <main id="main-content" className="flex-1 pb-24 lg:pb-6">
          <ErrorBoundary>
            <PageTransition routeKey={location.pathname}>
              <PageShell width="list" description="Portfolio, leads, tasks, appointments and targets in one workspace.">
                <Outlet />
              </PageShell>
            </PageTransition>
          </ErrorBoundary>
        </main>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <MobileNavDrawer role="rm" />
      </Suspense>
    </div>
  );
}

export default RMLayout;
