// ============================================================================
// useAnalyticsEvent — Fire-and-forget analytics event hook
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §17
// POST /analytics/events — never blocks UI, failures silently logged.
// ============================================================================

import { useCallback } from 'react';
import { axiosInstance } from '@/core/api';
import { storage } from '@/core/utils/storage.utils';
import logger from '@/core/utils/logger.utils';

export interface AnalyticsEventPayload {
  eventType: string;
  customerId?: string;
  metadata?: Record<string, unknown>;
}

export function useAnalyticsEvent(customerId?: string) {
  const fire = useCallback(
    async (payload: AnalyticsEventPayload) => {
      try {
        const cid = payload.customerId ?? customerId ?? storage.local.getRaw('bankmate.customerId') ?? undefined;
        await axiosInstance.post('/analytics/events', {
          eventType: payload.eventType,
          customerId: cid,
          timestamp: new Date().toISOString(),
          metadata: payload.metadata ?? {},
        });
      } catch {
        // Fire-and-forget — failures silently logged (Phase 1 §17)
        logger.debug('[Analytics] Event fire failed', { eventType: payload.eventType });
      }
    },
    [customerId]
  );

  return { fire };
}

export default useAnalyticsEvent;
