// ============================================================================
// Field — UI Primitive
// Source of Truth: BankMate AI Frontend Blueprint · §6 / §11
// Layout wrapper pairing a Label + control + hint/error text. Pairs with
// react-hook-form: pass the field error message and it renders inline.
// ============================================================================

import type { ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
import { cn } from '@/core/utils/cn.utils';

export interface FieldProps {
  /** htmlFor — must match the input id. */
  htmlFor?: string;
  label?: string;
  required?: boolean;
  /** Inline error message (renders the field in an error state). */
  error?: string;
  /** Helper text shown when there is no error. */
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function Field({
  htmlFor,
  label,
  required,
  error,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
          {required ? <span className="ml-0.5 text-error">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-error"
        >
          <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default Field;
