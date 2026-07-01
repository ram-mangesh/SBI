// ============================================================================
// useMediaQuery — Reactive CSS media query hook
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §1.2
// Breakpoints: mobile 640 / tablet 768 / desktop 1024 / wide 1280 / full 1536
// ============================================================================

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Convenience breakpoint hooks per Phase 1 §11
export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 640px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

export function useIsWide(): boolean {
  return useMediaQuery('(min-width: 1280px)');
}

export default useMediaQuery;
