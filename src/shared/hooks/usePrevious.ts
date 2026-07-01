// ============================================================================
// usePrevious — Track previous value of a state/prop
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §1.2
// ============================================================================

import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
