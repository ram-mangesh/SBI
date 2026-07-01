// ============================================================================
// Logger Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Environment-aware logging. Suppressed in production builds.
// ============================================================================

import { isProduction } from '@/core/config/env.config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const MIN_LEVEL: LogLevel = isProduction ? 'warn' : 'debug';

const shouldLog = (level: LogLevel): boolean =>
  LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[MIN_LEVEL];

const format = (level: LogLevel, message: string, context?: unknown): unknown[] =>
  context === undefined ? [`[${level.toUpperCase()}] ${message}`] : [`[${level.toUpperCase()}] ${message}`, context];

export const logger = {
  debug(message: string, context?: unknown) {
    if (shouldLog('debug')) console.debug(...format('debug', message, context));
  },
  info(message: string, context?: unknown) {
    if (shouldLog('info')) console.info(...format('info', message, context));
  },
  warn(message: string, context?: unknown) {
    if (shouldLog('warn')) console.warn(...format('warn', message, context));
  },
  error(message: string, context?: unknown) {
    if (shouldLog('error')) console.error(...format('error', message, context));
  },
} as const;

export default logger;
