// ============================================================================
// Shortcut Help Dialog
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.13
// Modal listing all global keyboard shortcuts. Toggled by Ctrl/Cmd + /.
// Uses Radix Dialog for focus-trap, Esc-to-close and return-focus behavior.
// ============================================================================

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { GLOBAL_SHORTCUTS, SHORTCUT_GROUPS } from '@/core/constants/shortcuts.constants';
import { cn } from '@/core/utils/cn.utils';

export interface ShortcutHelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShortcutHelpDialog({ open, onOpenChange }: ShortcutHelpDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          style={{ zIndex: 'var(--z-modal-backdrop)' }}
        />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[1001] w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2',
            'rounded-2xl border border-gray-200 bg-white p-6 shadow-lg outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          )}
          aria-describedby={undefined}
        >
          <div className="flex items-start justify-between">
            <div>
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Keyboard shortcuts
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-gray-500">
                Use these shortcuts from anywhere in the app.
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close shortcuts"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="mt-5 space-y-5">
            {SHORTCUT_GROUPS.map((group) => {
              const items = GLOBAL_SHORTCUTS.filter((s) => s.group === group);
              if (!items.length) return null;
              return (
                <section key={group}>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {group}
                  </h3>
                  <ul className="space-y-1.5">
                    {items.map((s) => (
                      <li
                        key={s.keys + s.description}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="text-sm text-gray-700">{s.description}</span>
                        <kbd
                          className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-xs font-medium text-gray-600"
                        >
                          {s.keys}
                        </kbd>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ShortcutHelpDialog;
