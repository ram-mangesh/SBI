import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_EVENTS, REFRESH_LEAD_TIME_MS, tokenManager } from '@/core/api/client/token-manager';
import { ROUTES } from '@/core/config/routes.config';
import { overlay } from '@/store';
import { useAuthStore } from '@/store/auth.store';
import type { SessionBroadcastMessage } from '../types/auth.types';

const CHANNEL_NAME = 'bankmate.auth.session';
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const IDLE_WARNING_MS = 5 * 60 * 1000;
const ACTIVITY_THROTTLE_MS = 15 * 1000;

const ACTIVITY_EVENTS = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'] as const;

function createSourceId(): string {
  return `tab-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function SessionManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const expiresAt = useAuthStore((s) => s.expiresAt);
  const rememberMe = useAuthStore((s) => s.rememberMe);
  const updateTokens = useAuthStore((s) => s.updateTokens);
  const clearSession = useAuthStore((s) => s.clearSession);
  const setLastActivity = useAuthStore((s) => s.setLastActivity);

  const sourceId = useMemo(createSourceId, []);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const lastActivityRef = useRef(Date.now());
  const lastBroadcastRef = useRef(0);
  const warningOpenRef = useRef(false);

  useEffect(() => {
    if (!('BroadcastChannel' in window)) return undefined;
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<SessionBroadcastMessage>) => {
      const message = event.data;
      if (!message || message.sourceId === sourceId) return;

      if (message.type === 'LOGOUT') {
        clearSession();
        navigate(ROUTES.LOGIN, { replace: true });
      }

      if (message.type === 'ACTIVITY') {
        lastActivityRef.current = message.at;
        setLastActivity();
      }
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [clearSession, navigate, setLastActivity, sourceId]);

  useEffect(() => {
    const onSessionExpired = () => {
      clearSession();
      navigate(ROUTES.SESSION_EXPIRED, { replace: true });
    };

    window.addEventListener(AUTH_EVENTS.SESSION_EXPIRED, onSessionExpired);
    return () => window.removeEventListener(AUTH_EVENTS.SESSION_EXPIRED, onSessionExpired);
  }, [clearSession, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    const markActivity = () => {
      const now = Date.now();
      lastActivityRef.current = now;
      setLastActivity();

      if (now - lastBroadcastRef.current > ACTIVITY_THROTTLE_MS) {
        lastBroadcastRef.current = now;
        channelRef.current?.postMessage({ type: 'ACTIVITY', sourceId, at: now });
      }
    };

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, markActivity, { passive: true });
    });

    markActivity();

    return () => {
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, markActivity);
      });
    };
  }, [isAuthenticated, setLastActivity, sourceId]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    const interval = window.setInterval(async () => {
      const idleFor = Date.now() - lastActivityRef.current;

      if (idleFor >= IDLE_TIMEOUT_MS && !rememberMe) {
        clearSession();
        channelRef.current?.postMessage({ type: 'LOGOUT', sourceId, at: Date.now() });
        navigate(ROUTES.SESSION_EXPIRED, { replace: true });
        return;
      }

      if (idleFor >= IDLE_TIMEOUT_MS - IDLE_WARNING_MS && !rememberMe && !warningOpenRef.current) {
        warningOpenRef.current = true;
        const staySignedIn = await overlay.confirm({
          title: 'Session expiring soon',
          description: 'You have been inactive for a while. Stay signed in?',
          confirmLabel: 'Stay signed in',
          cancelLabel: 'Sign out',
        });
        warningOpenRef.current = false;

        if (staySignedIn) {
          lastActivityRef.current = Date.now();
          setLastActivity();
          const refreshed = await tokenManager.refresh();
          if (refreshed) updateTokens(refreshed);
          return;
        }

        clearSession();
        channelRef.current?.postMessage({ type: 'LOGOUT', sourceId, at: Date.now() });
        navigate(ROUTES.LOGIN, { replace: true });
      }
    }, 30 * 1000);

    return () => window.clearInterval(interval);
  }, [clearSession, isAuthenticated, navigate, rememberMe, setLastActivity, sourceId, updateTokens]);

  useEffect(() => {
    if (!isAuthenticated || !expiresAt) return undefined;

    const refreshIn = Math.max(0, expiresAt - Date.now() - REFRESH_LEAD_TIME_MS);
    const timeout = window.setTimeout(async () => {
      const refreshed = await tokenManager.refresh();
      if (refreshed) {
        updateTokens(refreshed);
        channelRef.current?.postMessage({ type: 'TOKENS_REFRESHED', sourceId, at: Date.now() });
      } else if (tokenManager.isExpired()) {
        clearSession();
        navigate(ROUTES.SESSION_EXPIRED, { replace: true });
      }
    }, refreshIn);

    return () => window.clearTimeout(timeout);
  }, [clearSession, expiresAt, isAuthenticated, navigate, sourceId, updateTokens]);

  useEffect(() => {
    if (!isAuthenticated && location.pathname === ROUTES.LOGOUT) {
      channelRef.current?.postMessage({ type: 'LOGOUT', sourceId, at: Date.now() });
    }
  }, [isAuthenticated, location.pathname, sourceId]);

  return null;
}

export default SessionManager;
