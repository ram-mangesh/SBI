// ============================================================================
// Page Transition
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.12 (Nav Animations)
// Wraps routed page content in a subtle fade/slide so route changes feel
// intentional. Respects prefers-reduced-motion via MotionProvider.
// ============================================================================

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface PageTransitionProps {
  children: ReactNode;
  /** Unique key (e.g. location.pathname) to retrigger the animation on change. */
  routeKey?: string;
}

const VARIANTS = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
} as const;

const TRANSITION = { duration: 0.22, ease: [0.4, 0, 0.2, 1] as const };

export function PageTransition({ children, routeKey }: PageTransitionProps) {
  return (
    <motion.div
      key={routeKey}
      variants={VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={TRANSITION}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;