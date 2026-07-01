// ============================================================================
// Toast Provider — Radix UI Toast + Global Overlay Bridge
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §14 + Section 3
//
// Two layers of toast support:
//   1. Imperative global toasts via the overlay store — `overlay.toast(...)`.
//      Rendered by <GlobalToast/> in the Root Layout. Always available.
//   2. Radix Toast Root + Viewport for declarative component-level toasts
//      (shadcn-style). This provider mounts the Viewport so any descendant
//      can render <ToastPrimitive.Root/> instances.
// ============================================================================

import React, { createContext, useContext, useMemo } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { overlay, type ToastOptions } from '@/store';

export interface ToastApi {
  /** Show an info toast. */
  show: (message: string, options?: ToastOptions) => string;
  /** Show a success toast. */
  success: (message: string, options?: ToastOptions) => string;
  /** Show an error toast. */
  error: (message: string, options?: ToastOptions) => string;
  /** Show a warning toast. */
  warning: (message: string, options?: ToastOptions) => string;
  /** Dismiss a toast by id. */
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const api = useMemo<ToastApi>(
    () => ({
      show: (message, options) => overlay.toast(message, options),
      success: (message, options) => overlay.success(message, options),
      error: (message, options) => overlay.error(message, options),
      warning: (message, options) => overlay.warning(message, options),
      dismiss: (id) => overlay.dismiss(id),
    }),
    [],
  );

  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={5000}>
      <ToastContext.Provider value={api}>{children}</ToastContext.Provider>
      {/* Radix viewport for any declarative Toast primitives.
          Kept visually hidden — the imperative global stack is rendered
          separately by <GlobalToast/> in the Root Layout. */}
      <ToastPrimitive.Viewport className="sr-only" style={{ pointerEvents: 'none' }} />
    </ToastPrimitive.Provider>
  );
}

/** Access the declarative toast API (thin wrapper over the overlay store). */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

export default ToastProvider;
