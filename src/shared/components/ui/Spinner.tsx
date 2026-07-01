// ============================================================================
// Spinner — UI Primitive
// Source of Truth: BankMate AI Frontend Blueprint · §6 / §11
// ============================================================================

import { Loader2 } from 'lucide-react';
import { cn } from '@/core/utils/cn.utils';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <span role="status" className={cn('inline-flex', className)}>
      <Loader2 className={cn('animate-spin text-primary-600', sizeMap[size])} aria-hidden="true" />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

export default Spinner;
