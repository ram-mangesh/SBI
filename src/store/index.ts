// ============================================================================
// Store — Root Index
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §9
// Zustand store barrel. Feature stores imported here for combined access.
// ============================================================================

// Middleware exports
export { loggerMiddleware } from './middleware/logger.middleware';
export { errorMiddleware } from './middleware/error.middleware';

// ── Feature stores ──────────────────────────────────────────────────────
export {
  useAuthStore,
  resolveUserRole,
  AUTH_STORAGE_KEYS,
  PROFILE_COMPLETION_STAGES,
} from './auth.store';
export type { AuthState, ProfileCompletionStage } from './auth.store';

export { useUIStore } from './ui.store';
export type { UIState, NavRole } from './ui.store';

// ── Global overlays (modals / toasts / loading) — Section 3 Root Layout ──
export { useOverlayStore, overlay } from './overlay.store';
export type {
  OverlayState,
  ToastOptions,
  ToastVariant,
  ToastPosition,
  ToastItem,
  ConfirmOptions,
} from './overlay.store';