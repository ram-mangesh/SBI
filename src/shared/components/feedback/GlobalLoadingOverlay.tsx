// ============================================================================
// Global Loading Overlay
// Source of Truth: BankMate AI Frontend Blueprint · Section 3 (Root Layout)
// Full-viewport loading overlay driven by the overlay store (ref-counted so
// multiple callers can stack show/hide). z 9998 — above page chrome and
// modals, below the global confirm modal (9999) and toasts (10000).
// ============================================================================

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useOverlayStore } from '@/store';

export function GlobalLoadingOverlay() {
  const visible = useOverlayStore((s) => s.loading.visible);
  const message = useOverlayStore((s) => s.loading.message);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-4 bg-gray-900/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="alertdialog"
          aria-busy="true"
          aria-live="assertive"
          aria-label={message ?? 'Loading'}
        >
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-700">
              {message ?? 'Loading…'}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default GlobalLoadingOverlay;
