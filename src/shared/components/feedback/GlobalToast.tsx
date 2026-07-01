// ============================================================================
// Global Toast Container
// Source of Truth: BankMate AI Frontend Blueprint · Section 3 (Root Layout)
//   + Section 3.8.5 (Communication widgets)
// Renders the global toast stack through a fixed portal. Driven by the overlay
// store so any code can call `overlay.toast(...)` / `overlay.success(...)` etc.
// Highest z-layer in the app (z 10000) — always above modals and loading.
// ============================================================================

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useOverlayStore, type ToastVariant } from '@/store';
import { cn } from '@/core/utils/cn.utils';

const ICONS: Record<ToastVariant, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

const ACCENT: Record<ToastVariant, string> = {
  info: 'text-primary-600',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
};

const POSITION_CLASS: Record<string, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-left': 'bottom-4 left-4 items-start',
};

export function GlobalToast() {
  const toasts = useOverlayStore((s) => s.toasts);
  const position = useOverlayStore((s) => s.position);
  const dismiss = useOverlayStore((s) => s.dismissToast);

  return (
    <div
      className={cn(
        'pointer-events-none fixed z-[10000] flex w-[calc(100%-32px)] max-w-sm flex-col gap-2',
        POSITION_CLASS[position],
      )}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const Icon = ICONS[t.variant];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                'pointer-events-auto flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white p-3.5 shadow-lg',
              )}
              role={t.variant === 'error' ? 'alert' : 'status'}
            >
              <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', ACCENT[t.variant])} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                {t.title ? (
                  <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                ) : null}
                {t.description ? (
                  <p className={cn('text-sm text-gray-600', t.title && 'mt-0.5')}>{t.description}</p>
                ) : null}
                {t.actionLabel ? (
                  <button
                    type="button"
                    onClick={() => {
                      t.onAction?.();
                      dismiss(t.id);
                    }}
                    className="mt-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700"
                  >
                    {t.actionLabel}
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default GlobalToast;
