// ============================================================================
// Route Progress
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.11 (Loading Strategy)
// Thin top loading bar shown during route transitions / lazy chunk loads.
// Driven by the UI store's `routeLoading` flag.
// ============================================================================

import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/store';

export function RouteProgress() {
  const routeLoading = useUIStore((s) => s.routeLoading);

  return (
    <AnimatePresence>
      {routeLoading ? (
        <motion.div
          className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary-600"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        />
      ) : null}
    </AnimatePresence>
  );
}

export default RouteProgress;