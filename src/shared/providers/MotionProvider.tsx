// ============================================================================
// Motion Provider — Framer Motion
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §14
// Configures global motion defaults + reduced-motion support.
// ============================================================================

import React, { useMemo } from 'react';
import { MotionConfig } from 'framer-motion';

export interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const config = useMemo(
    () => ({
      reducedMotion: 'user' as const, // respects prefers-reduced-motion
    }),
    []
  );

  return <MotionConfig {...config}>{children}</MotionConfig>;
}

export default MotionProvider;
