// ============================================================================
// Zustand Error Middleware
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §19
// Catches and logs store action errors so they never crash the UI.
// ============================================================================

import type { StateCreator } from 'zustand';
import logger from '@/core/utils/logger.utils';

type ErrorMiddlewareType = <T>(
  config: StateCreator<T>
) => StateCreator<T>;

/**
 * Wraps store actions so unhandled errors are logged instead of thrown.
 * Apply only to store slices that have side-effect actions.
 */
export const errorMiddleware: ErrorMiddlewareType = (config) => (set, get, api) =>
  config(
    (...args) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (config as any)(set, get, api)(...args);
      } catch (error) {
        logger.error('[Zustand] Action error', error);
        throw error; // rethrow so callers can handle
      }
    },
    get,
    api
  );

export default errorMiddleware;
