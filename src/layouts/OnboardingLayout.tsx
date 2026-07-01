// ============================================================================
// OnboardingLayout
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.1 / 3.1 / 3.8
// Wizard shell for the /customer/onboarding flow.
//   ┌───────────────────────────────────────────────┐
//   │ Brand header (back link + logo)               │
//   ├───────────────────────────────────────────────┤
//   │ Stepper bar (steps 1..N, progress line)       │
//   ├───────────────────────────────────────────────┤
//   │ Step content slot (max-width 600px, centered) │
//   │ <Outlet />                                    │
//   ├───────────────────────────────────────────────┤
//   │ Navigation bar: [Back] [Skip] ─── [Next/Submit]│
//   └───────────────────────────────────────────────┘
//
// Step pages render via <Outlet/>. Navigation buttons use a shared
// `useOnboardingStep` hook (or direct props) — Section 3 wires the shell;
// step business logic lives in the feature layer.
// ============================================================================

import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/core/config/routes.config';
import { APP_NAME } from '@/core/constants/app.constants';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';
import { PageTransition } from '@/shared/components/feedback/PageTransition';
import { useLocation } from 'react-router-dom';
import { useOverlayStore } from '@/store';

const TOTAL_STEPS = 4; // Default — step pages can override via context if needed.

export function OnboardingLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const confirm = useOverlayStore((s) => s.confirm);

  async function handleExit() {
    const yes = await confirm({
      title: 'Leave onboarding?',
      description:
        'Your progress has been saved as a draft. You can continue from where you left off.',
      confirmLabel: 'Leave',
      cancelLabel: 'Stay',
    });
    if (yes) navigate(ROUTES.DASHBOARD);
  }

  return (
    <div className="flex min-h-screen flex-col bg-app">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="border-b border-app bg-surface bm-safe-top">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Link
            to={ROUTES.DASHBOARD}
            className="flex items-center gap-1.5 text-sm text-muted-app hover:text-app"
            onClick={(e) => {
              e.preventDefault();
              handleExit();
            }}
          >
            ← Dashboard
          </Link>
          <span className="mx-1 text-gray-300">/</span>
          <Link to={ROUTES.ROOT} className="flex items-center gap-2 text-sm font-semibold text-app">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-600 text-xs font-bold text-white">
              B
            </span>
            {APP_NAME}
          </Link>
        </div>
      </header>

      {/* ── Stepper ──────────────────────────────────────────────────── */}
      <div className="border-b border-app bg-surface">
        <div className="mx-auto flex max-w-md items-center gap-1 px-4 py-3">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className="flex flex-1 items-center gap-1.5">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  i <= 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i + 1}
              </span>
              {i < TOTAL_STEPS - 1 ? (
                <div className="h-0.5 flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-primary-600 transition-all duration-500"
                    style={{ width: i < 0 ? '100%' : '0%' }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <main id="main-content" className="flex flex-1 items-start justify-center px-4 py-8">
        <div className="w-full max-w-[600px]">
          <ErrorBoundary>
            <PageTransition routeKey={location.pathname}>
              <Outlet />
            </PageTransition>
          </ErrorBoundary>
        </div>
      </main>

      {/* ── Bottom nav buttons ─────────────────────────────────────── */}
      <footer className="border-t border-app bg-surface">
        <div className="mx-auto flex max-w-[600px] items-center justify-between px-4 py-4">
          <button
            type="button"
            onClick={handleExit}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Exit
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-app hover:bg-gray-50"
            >
              Skip
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OnboardingLayout;
