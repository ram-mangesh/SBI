// ============================================================================
// Mobile Nav Drawer
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.13 (Mobile Nav)
// Slide-in drawer holding the full role sidebar. Opened by the AppHeader
// hamburger on screens below the `lg` breakpoint.
// ============================================================================

import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useUIStore } from '@/store';
import type { NavRole } from '@/store';
import { cn } from '@/core/utils/cn.utils';

// Role sidebars are lazy so the drawer doesn't pull them into the main bundle.
const CustomerSidebar = lazy(() =>
  import('./CustomerSidebar').then((m) => ({ default: m.CustomerSidebar })),
);
const AdminSidebar = lazy(() =>
  import('./AdminSidebar').then((m) => ({ default: m.AdminSidebar })),
);
const RMSidebar = lazy(() =>
  import('./RMSidebar').then((m) => ({ default: m.RMSidebar })),
);

function SidebarForRole({ role }: { role: NavRole }) {
  switch (role) {
    case 'admin':
      return <AdminSidebar />;
    case 'rm':
      return <RMSidebar />;
    default:
      return <CustomerSidebar />;
  }
}

export interface MobileNavDrawerProps {
  role: NavRole;
}

export function MobileNavDrawer({ role }: MobileNavDrawerProps) {
  const open = useUIStore((s) => s.mobileNavOpen);
  const closeMobileNav = useUIStore((s) => s.closeMobileNav);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          {/* Scrim */}
          <motion.div
            className="absolute inset-0 bg-gray-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileNav}
          />

          {/* Panel */}
          <motion.aside
            className={cn('absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-xl')}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              type="button"
              onClick={closeMobileNav}
              className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="h-full overflow-y-auto">
              <Suspense fallback={<div className="p-4" />}>
                <SidebarForRole role={role} />
              </Suspense>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export default MobileNavDrawer;