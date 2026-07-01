// ============================================================================
// useInfiniteScroll — Infinite scroll / load-more hook
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §1.2
// ============================================================================

import { useCallback, useRef } from 'react';

export interface UseInfiniteScrollOptions {
  /** Callback when the sentinel enters the viewport. */
  onLoadMore: () => void;
  /** Whether there are more items to fetch. */
  hasMore: boolean;
  /** Whether a fetch is in progress. */
  isLoading: boolean;
}

export function useInfiniteScroll({ onLoadMore, hasMore, isLoading }: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node || isLoading || !hasMore) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            onLoadMore();
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(node);
    },
    [onLoadMore, hasMore, isLoading]
  );

  return { sentinelRef };
}

export default useInfiniteScroll;
