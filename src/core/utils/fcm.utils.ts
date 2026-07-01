// ============================================================================
// FCM (Firebase Cloud Messaging) Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §18 + §10.6
// Push-notification registration helpers. FCM SDK loaded lazily;
// no-op in non-browser / unsupported environments.
// ============================================================================

import { env, isProduction } from '@/core/config/env.config';
import logger from './logger.utils';

export interface FcmTokenResult {
  granted: boolean;
  token: string | null;
  reason?: string;
}

/** Whether push messaging is available + configured. */
export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    env.fcmVapidKey.length > 0 &&
    isProduction
  );
}

/** Request notification permission. */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

/**
 * Register for push and obtain an FCM token.
 * Returns { granted: false } gracefully if FCM is not configured (Phase 1).
 * Full Firebase integration is wired in the communication feature module.
 */
export async function registerForPush(): Promise<FcmTokenResult> {
  if (!isPushSupported()) {
    return { granted: false, token: null, reason: 'Push not supported in this environment' };
  }
  const permission = await requestNotificationPermission();
  if (permission !== 'granted') {
    return { granted: false, token: null, reason: 'Permission denied' };
  }
  try {
    // Dynamic import — feature module supplies messaging when configured.
    logger.debug('FCM registration requested', { vapidKeyPresent: Boolean(env.fcmVapidKey) });
    return { granted: true, token: null, reason: 'Pending feature-module messaging setup' };
  } catch (error) {
    logger.error('FCM registration failed', error);
    return { granted: false, token: null, reason: 'Registration error' };
  }
}

export default { isPushSupported, requestNotificationPermission, registerForPush };
