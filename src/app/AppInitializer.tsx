// ============================================================================
// App Initializer
// Source of Truth: BankMate AI Frontend Blueprint - Phase 1 Section 18
// Section 4 adds session restore and refresh-on-load.
// ============================================================================

import React, { useCallback, useEffect, useState } from 'react';
import { tokenManager } from '@/core/api/client/token-manager';
import { isProduction } from '@/core/config/env.config';
import { SW_PATH } from '@/core/constants/app.constants';
import logger from '@/core/utils/logger.utils';
import { LoadingScreen } from '@/shared/components/feedback/LoadingScreen';
import { useAuthStore } from '@/store/auth.store';

export interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [isReady, setIsReady] = useState(false);
  const updateTokens = useAuthStore((s) => s.updateTokens);
  const clearSession = useAuthStore((s) => s.clearSession);

  const registerServiceWorker = useCallback(async () => {
    if (!isProduction || !('serviceWorker' in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.register(SW_PATH);
      logger.info('[SW] Registered', { scope: registration.scope });
    } catch (error) {
      logger.warn('[SW] Registration failed', error);
    }
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      await registerServiceWorker();

      if (tokenManager.hasAccessToken() && tokenManager.isExpired()) {
        const refreshed = await tokenManager.refresh();
        if (refreshed) {
          updateTokens(refreshed);
        } else {
          clearSession();
        }
      }

      setIsReady(true);
    };

    bootstrap();
  }, [clearSession, registerServiceWorker, updateTokens]);

  if (!isReady) {
    return <LoadingScreen message="Initializing BankMate AI..." />;
  }

  return <>{children}</>;
}

export default AppInitializer;
