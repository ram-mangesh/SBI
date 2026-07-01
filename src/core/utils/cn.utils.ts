// ============================================================================
// cn — className combiner (shadcn/ui convention)
// Merges clsx + tailwind-merge so later Tailwind classes win over earlier.
// ============================================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with proper Tailwind conflict resolution.
 * Usage: cn('px-2', condition && 'px-4') → 'px-4'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;
