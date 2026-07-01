// ============================================================================
// useThrottle — Throttle a callback
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §1.2
// ============================================================================

import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay = 300
): T {
  const lastCall = useRef<number>(0);
  const lastCallArgs = useRef<unknown[]>([]);

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const elapsed = now - lastCall.current;

      lastCallArgs.current = args;

      if (elapsed >= delay) {
        lastCall.current = now;
        callback(...args);
      } else {
        setTimeout(() => {
          if (lastCallArgs.current === args) {
            lastCall.current = Date.now();
            callback(...args);
          }
        }, delay - elapsed);
      }
    },
    [callback, delay]
  ) as unknown as T;

  return throttled;
}

export default useThrottle;
