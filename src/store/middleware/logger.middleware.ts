// ============================================================================
// Zustand Logger Middleware
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §19
// Logs state changes in development only.
// ============================================================================

import type { StateCreator } from 'zustand';
import { isDevelopment } from '@/core/config/env.config';
import logger from '@/core/utils/logger.utils';

type LoggerType = <T>(
  config: StateCreator<T>
) => StateCreator<T>;

/**
 * Dev-only logger that prints store action + state diff.
 * Usage: create<MyState>()(devtools(logger(mySlice)))
 */
export const loggerMiddleware: LoggerType = (config) => (set, get, api) =>
  config(
    (args) => {
      if (isDevelopment) {
        logger.debug('[Zustand]', { action: JSON.stringify(args), prevState: get() });
      }
      set(args);
      if (isDevelopment) {
        logger.debug('[Zustand] → next state', { nextState: get() });
      }
    },
    get,
    api
  );

export default loggerMiddleware;
