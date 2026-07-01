// ============================================================================
// Query Provider — TanStack Query
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §14
// ============================================================================

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { APP_CONFIG } from '@/core/config/app.config';
import { env } from '@/core/config/env.config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: APP_CONFIG.defaultStaleTime,
      gcTime: APP_CONFIG.defaultCacheTime,
      refetchOnWindowFocus: APP_CONFIG.defaultRefetchOnWindowFocus,
      retry: APP_CONFIG.maxRetries,
    },
  },
});

export interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {env.enableQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export { queryClient };
export default QueryProvider;
