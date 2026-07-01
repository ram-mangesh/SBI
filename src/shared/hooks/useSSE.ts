// ============================================================================
// useSSE — Server-Sent Events consumer hook
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §16 (SSE Architecture)
// Listens on VITE_SSE_ENDPOINT with customerId + token query params.
// Reconnect: exponential backoff (1s, 2s, 4s, max 30s).
// Dispatches to stores based on event type.
// ============================================================================

import { useEffect, useRef, useCallback } from 'react';
import { env } from '@/core/config/env.config';
import { APP_CONFIG } from '@/core/config/app.config';
import logger from '@/core/utils/logger.utils';

export type SSEEventHandler = (event: MessageEvent) => void;

export interface UseSSEReturn {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  addHandler: (eventType: string, handler: SSEEventHandler) => void;
  removeHandler: (eventType: string, handler: SSEEventHandler) => void;
}

export function useSSE(customerId?: string, token?: string): UseSSEReturn {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handlersRef = useRef<Map<string, Set<SSEEventHandler>>>(new Map());
  const isConnectedRef = useRef(false);
  const retryCountRef = useRef(0);
  const mountedRef = useRef(true);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      isConnectedRef.current = false;
    }
    retryCountRef.current = 0;
  }, []);

  const connect = useCallback(() => {
    if (!customerId || !token) {
      logger.debug('[SSE] Skipping — no customerId or token');
      return;
    }

    disconnect();

    const url = `${env.sseEndpoint}?customerId=${customerId}&token=${token}`;
    logger.debug('[SSE] Connecting', { url });

    const source = new EventSource(url);

    source.onopen = () => {
      if (!mountedRef.current) return;
      isConnectedRef.current = true;
      retryCountRef.current = 0;
      logger.debug('[SSE] Connected');
    };

    source.onmessage = (event) => {
      if (!mountedRef.current) return;
      // Default handler — dispatch to registered type handlers
      try {
        const parsed = JSON.parse(event.data);
        const eventType = parsed?.type || parsed?.event;
        const handlers = handlersRef.current.get(eventType);
        if (handlers) {
          handlers.forEach((handler) => handler(event));
        }
      } catch {
        // Raw message — ignore non-JSON
      }
    };

    source.onerror = () => {
      if (!mountedRef.current) return;
      isConnectedRef.current = false;
      source.close();

      // Exponential backoff
      const delay = Math.min(
        APP_CONFIG.sseReconnectBaseDelay * Math.pow(2, retryCountRef.current),
        APP_CONFIG.sseReconnectMaxDelay
      );
      retryCountRef.current += 1;
      logger.warn('[SSE] Reconnecting', { attempt: retryCountRef.current, delay });

      reconnectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) connect();
      }, delay);
    };

    eventSourceRef.current = source;
  }, [customerId, token, disconnect]);

  const addHandler = useCallback((eventType: string, handler: SSEEventHandler) => {
    if (!handlersRef.current.has(eventType)) {
      handlersRef.current.set(eventType, new Set());
    }
    handlersRef.current.get(eventType)!.add(handler);
  }, []);

  const removeHandler = useCallback((eventType: string, handler: SSEEventHandler) => {
    handlersRef.current.get(eventType)?.delete(handler);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      disconnect();
    };
  }, [disconnect]);

  return {
    connect,
    disconnect,
    isConnected: isConnectedRef.current,
    addHandler,
    removeHandler,
  };
}

export default useSSE;
