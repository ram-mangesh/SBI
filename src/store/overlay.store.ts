// ============================================================================
// Overlay Store — Global Modal / Toast / Loading
// Source of Truth: BankMate AI Frontend Blueprint · Section 3 (Layout Architecture)
//   3.9 (Modal) · 3.10 (Drawer) · Section 3 Root Layout (Global Portals)
//
// Imperative store for app-wide overlays rendered through fixed portals at the
// Root Layout level:
//   - confirm()/alert()  → Global Modal portal (z 9999)
//   - toast()            → Global Toast container (z 10000)
//   - showLoading()/hideLoading() → Global Loading overlay (z 9998)
//
// Keeps overlay plumbing out of feature code; feature pages just call helpers.
// ============================================================================

import { create } from 'zustand';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface ToastOptions {
  variant?: ToastVariant;
  /** Auto-dismiss after ms. 0 = sticky. Default 5000. */
  duration?: number;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ToastItem extends Required<Pick<ToastOptions, 'variant' | 'duration'>> {
  id: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Destructive styling for the confirm button (e.g. delete). */
  destructive?: boolean;
}

export interface OverlayState {
  // ── Toasts ─────────────────────────────────────────────────────────
  toasts: ToastItem[];
  position: ToastPosition;

  // ── Global modal (confirm/alert) ───────────────────────────────────
  modal: {
    open: boolean;
    title: string;
    description?: string;
    confirmLabel: string;
    cancelLabel: string;
    destructive: boolean;
    resolve: ((value: boolean) => void) | null;
  };

  // ── Global loading overlay ─────────────────────────────────────────
  loading: {
    visible: boolean;
    message?: string;
    /** Multiple callers can stack show/hide; ref-counted. */
    count: number;
  };

  // ── Actions ────────────────────────────────────────────────────────
  setPosition: (position: ToastPosition) => void;
  toast: (message: string, options?: ToastOptions) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;

  confirm: (options: ConfirmOptions) => Promise<boolean>;
  resolveModal: (value: boolean) => void;

  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

let toastSeq = 0;
function nextId(): string {
  toastSeq += 1;
  return `toast-${Date.now()}-${toastSeq}`;
}

export const useOverlayStore = create<OverlayState>((set, get) => ({
  toasts: [],
  position: 'top-right',

  modal: {
    open: false,
    title: '',
    description: undefined,
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    destructive: false,
    resolve: null,
  },

  loading: {
    visible: false,
    message: undefined,
    count: 0,
  },

  setPosition: (position) => set({ position }),

  toast: (message, options = {}) => {
    const id = nextId();
    const variant = options.variant ?? 'info';
    const duration = options.duration ?? 5000;
    const item: ToastItem = {
      id,
      variant,
      duration,
      title: options.title,
      description: options.description ?? message,
      actionLabel: options.actionLabel,
      onAction: options.onAction,
    };
    set((s) => ({ toasts: [...s.toasts, item] }));

    if (duration > 0 && typeof window !== 'undefined') {
      window.setTimeout(() => get().dismissToast(id), duration);
    }
    return id;
  },

  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  clearToasts: () => set({ toasts: [] }),

  confirm: (options) =>
    new Promise<boolean>((resolve) => {
      set({
        modal: {
          open: true,
          title: options.title,
          description: options.description,
          confirmLabel: options.confirmLabel ?? 'Confirm',
          cancelLabel: options.cancelLabel ?? 'Cancel',
          destructive: options.destructive ?? false,
          resolve,
        },
      });
    }),

  resolveModal: (value) => {
    const { modal } = get();
    modal.resolve?.(value);
    set({
      modal: {
        open: false,
        title: '',
        description: undefined,
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        destructive: false,
        resolve: null,
      },
    });
  },

  showLoading: (message) =>
    set((s) => ({
      loading: {
        visible: true,
        message,
        count: s.loading.count + 1,
      },
    })),

  hideLoading: () =>
    set((s) => {
      const count = Math.max(0, s.loading.count - 1);
      return {
        loading: {
          visible: count > 0,
          message: count > 0 ? s.loading.message : undefined,
          count,
        },
      };
    }),
}));

/** Imperative helpers — usable outside React components. */
export const overlay = {
  toast: (message: string, options?: ToastOptions) => useOverlayStore.getState().toast(message, options),
  success: (message: string, options?: ToastOptions) =>
    useOverlayStore.getState().toast(message, { ...options, variant: 'success' }),
  error: (message: string, options?: ToastOptions) =>
    useOverlayStore.getState().toast(message, { ...options, variant: 'error' }),
  warning: (message: string, options?: ToastOptions) =>
    useOverlayStore.getState().toast(message, { ...options, variant: 'warning' }),
  info: (message: string, options?: ToastOptions) =>
    useOverlayStore.getState().toast(message, { ...options, variant: 'info' }),
  dismiss: (id: string) => useOverlayStore.getState().dismissToast(id),
  confirm: (options: ConfirmOptions) => useOverlayStore.getState().confirm(options),
  showLoading: (message?: string) => useOverlayStore.getState().showLoading(message),
  hideLoading: () => useOverlayStore.getState().hideLoading(),
};

export default useOverlayStore;
