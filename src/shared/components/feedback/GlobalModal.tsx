// ============================================================================
// Global Modal Container (Confirm / Alert)
// Source of Truth: BankMate AI Frontend Blueprint · Section 3 (Root Layout)
//   + Section 3.9 (Modal Architecture)
// Renders the app-wide confirmation modal driven by the overlay store. Any
// code can `await overlay.confirm({...})`. z 9999 — below toasts, above all
// page chrome. Uses Radix Dialog for focus-trap + Esc-to-close.
// ============================================================================

import * as Dialog from '@radix-ui/react-dialog';
import { AlertTriangle } from 'lucide-react';
import { useOverlayStore } from '@/store';
import { cn } from '@/core/utils/cn.utils';

export function GlobalModal() {
  const modal = useOverlayStore((s) => s.modal);
  const resolveModal = useOverlayStore((s) => s.resolveModal);

  return (
    <Dialog.Root
      open={modal.open}
      onOpenChange={(open) => {
        // Closing via overlay/Esc/X counts as a cancellation.
        if (!open) resolveModal(false);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          style={{ zIndex: 'var(--z-global-modal)' }}
        />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[9999] w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-2xl border border-gray-200 bg-white p-6 shadow-lg outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          )}
          aria-describedby={modal.description ? undefined : undefined}
        >
          <div className="flex items-start gap-3">
            {modal.destructive ? (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error-light">
                <AlertTriangle className="h-5 w-5 text-error" aria-hidden="true" />
              </span>
            ) : null}
            <div className="min-w-0 flex-1">
              <Dialog.Title className="text-base font-semibold text-gray-900">
                {modal.title}
              </Dialog.Title>
              {modal.description ? (
                <Dialog.Description className="mt-1.5 text-sm text-gray-500">
                  {modal.description}
                </Dialog.Description>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => resolveModal(false)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {modal.cancelLabel}
            </button>
            <button
              type="button"
              onClick={() => resolveModal(true)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
                modal.destructive
                  ? 'bg-error hover:bg-error-dark focus-visible:outline-error'
                  : 'bg-primary-600 hover:bg-primary-700 focus-visible:outline-primary-600',
              )}
            >
              {modal.confirmLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default GlobalModal;
