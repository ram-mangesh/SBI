// ============================================================================
// useSessionStorage — Reactive sessionStorage hook
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §1.2
// ============================================================================

import { useState, useCallback } from 'react';
import { storage } from '@/core/utils/storage.utils';

export function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    storage.session.get<T>(key, initialValue)
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        storage.session.set(key, next);
        return next;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    storage.session.remove(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export default useSessionStorage;
