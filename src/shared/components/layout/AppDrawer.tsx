// ============================================================================
// AppDrawer
// Source of Truth: Frontend Blueprint Section 3.10
// Generic accessible side drawer for details, filters, and action panels.
// ============================================================================

import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/core/utils/cn.utils';

export type DrawerSide = 'left' | 'right' | 'bottom';

export interface AppDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  side?: DrawerSide;
  children: ReactNode;
  footer?: ReactNode;
}

const SIDE_CLASS: Record<DrawerSide, string> = {
  left: 'left-0 top-0 h-full w-[min(420px,92vw)] data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  right: 'right-0 top-0 h-full w-[min(420px,92vw)] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  bottom: 'inset-x-0 bottom-0 max-h-[85dvh] rounded-t-lg data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
};

export function AppDrawer({
  open,
  onOpenChange,
  title,
  description,
  side = 'right',
  children,
  footer,
}: AppDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          style={{ zIndex: 'var(--z-drawer-scrim)' }}
        />
        <Dialog.Content
          className={cn(
            'fixed z-[1000] flex flex-col border-app bg-surface shadow-lg outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            SIDE_CLASS[side],
          )}
        >
          <header className="flex min-h-16 items-start gap-3 border-b border-app px-5 py-4">
            <div className="min-w-0 flex-1">
              <Dialog.Title className="truncate text-base font-semibold text-app">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-1 text-sm text-muted-app">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md p-1.5 text-muted-app hover:bg-gray-50 hover:text-app"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </header>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer ? <footer className="border-t border-app px-5 py-4">{footer}</footer> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AppDrawer;
