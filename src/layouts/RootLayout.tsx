// ============================================================================
// Root Layout — App Shell
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.1 / 3.2
//   (Layout Architecture & Hierarchy)
//
// The outermost layout. Wraps every route with:
//   • Skip link (accessibility — jump to #main-content)
//   • Route transition progress bar
//   • Global portals (highest in the DOM), each at its own z-layer:
//       - Global Loading Overlay   (z 9998)
//       - Global Modal portal       (z 9999)
//       - Global Search overlay     (z 9999)
//       - Global Toast container    (z 10000)
//
// All other layouts (Blank/Auth/Customer/Admin/RM/Onboarding) render as
// nested <Outlet/> children of this shell. The ShortcutsProvider must sit
// inside the Router so it can useNavigate — it is mounted in AppProviders.
// ============================================================================

import type { ReactNode } from 'react';
import { RouteProgress } from '@/shared/components/navigation/RouteProgress';
import { GlobalModal } from '@/shared/components/feedback/GlobalModal';
import { GlobalToast } from '@/shared/components/feedback/GlobalToast';
import { GlobalLoadingOverlay } from '@/shared/components/feedback/GlobalLoadingOverlay';
import { GlobalSearchOverlay } from '@/shared/components/feedback/GlobalSearchOverlay';

export interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {/* Skip link — first focusable element for keyboard users (Section 3.13) */}
      <a href="#main-content" className="bm-skip-link">
        Skip to main content
      </a>

      {/* Route-transition loading bar (Section 3.11) */}
      <RouteProgress />

      {/* Routed layouts render here */}
      {children}

      {/* ── Global portals (fixed, top-level z-layers) ─────────────────── */}
      <GlobalLoadingOverlay />
      <GlobalSearchOverlay />
      <GlobalModal />
      <GlobalToast />
    </>
  );
}

export default RootLayout;
