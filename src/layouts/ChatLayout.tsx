// ============================================================================
// ChatLayout
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.1 / 3.8.5
// Full-screen AI chat shell for /chat/* routes.
//   ┌─────────────────────────────────────────────────────┐
//   │ Chat Header (back, agent name, clear history)         │
//   ├──────────────┬──────────────────────────────────────┤
//   │ Conversation │ Messages area                        │
//   │ list panel   │  ┌────────────────────────────┐      │
//   │ (25%)        │  │ Message bubbles             │      │
//   │              │  │ …                           │      │
//   │              │  └────────────────────────────┘      │
//   │              │  Input area (text + send)             │
//   ├──────────────┴──────────────────────────────────────┤
//   │ (no footer — input stays visible)                    │
//   └─────────────────────────────────────────────────────┘
//
// On mobile the conversation list is hidden (drawer-style or stacked).
// The chat pages themselves render via <Outlet/> for agent-specific UI.
// ============================================================================

import { Suspense, lazy } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { ROUTES } from '@/core/config/routes.config';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';
import { PageTransition } from '@/shared/components/feedback/PageTransition';
import { cn } from '@/core/utils/cn.utils';

const MobileNavDrawer = lazy(() =>
  import('@/shared/components/navigation/MobileNavDrawer').then((m) => ({
    default: m.MobileNavDrawer,
  })),
);

export function ChatLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isConversation = location.pathname.startsWith(ROUTES.CHAT_CONVERSATION);

  return (
    <div className="flex h-dvh flex-col bg-app">
      {/* ── Chat header ──────────────────────────────────────────────── */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-app bg-surface px-4 bm-safe-top">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 rounded-lg p-1.5 text-muted-app hover:bg-gray-50 hover:text-app lg:hidden"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <Link
          to={ROUTES.CHAT}
          className="flex items-center gap-2 text-sm font-semibold text-app"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
            💬
          </span>
          <span className="hidden sm:inline">AI Chat</span>
        </Link>
        <div className="flex-1" />
        <Link
          to={ROUTES.SETTINGS}
          className="rounded-lg p-2 text-muted-app hover:bg-gray-50 hover:text-app"
          aria-label="Chat settings"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
        </Link>
      </header>

      {/* ── Main chat area ────────────────────────────────────────────── */}
      <main id="main-content" className="flex flex-1 overflow-hidden">
        {/* Conversation list sidebar (desktop / wide) */}
        <aside
          className={cn(
            'hidden w-72 shrink-0 border-r border-app bg-surface lg:block',
            isConversation ? 'xl:block' : 'xl:hidden',
          )}
          aria-label="Conversations"
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-app p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Conversations
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {/* Conversation list rendered by chat pages via context.
                  Layout provides the shell; feature fills the list. */}
              <div className="space-y-1">
                <p className="px-2 py-8 text-center text-sm text-gray-400">
                  Start a new conversation
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Messages + input area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ErrorBoundary>
            <PageTransition routeKey={location.pathname}>
              <Outlet />
            </PageTransition>
          </ErrorBoundary>
        </div>
      </main>

      {/* ── Mobile drawer (for sidebar on small screens) ─────────────── */}
      <Suspense fallback={null}>
        <MobileNavDrawer role="customer" />
      </Suspense>
    </div>
  );
}

export default ChatLayout;
