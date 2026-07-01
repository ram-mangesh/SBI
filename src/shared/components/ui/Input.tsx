// ============================================================================
// Input — UI Primitive
// Source of Truth: BankMate AI Frontend Blueprint · §6 / §11
// Single-line text input matching the global design tokens.
// ============================================================================

import { forwardRef } from 'react';
import { cn } from '@/core/utils/cn.utils';

export type InputSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-sm',
  lg: 'h-12 text-base',
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: InputSize;
  /** Renders the input in an error state. */
  invalid?: boolean;
  /** Left adornment (e.g. leading icon). */
  leftAdornment?: React.ReactNode;
  /** Right adornment (e.g. password-visibility toggle). */
  rightAdornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, inputSize = 'md', invalid, leftAdornment, rightAdornment, ...props },
    ref,
  ) => {
    if (!leftAdornment && !rightAdornment) {
      return (
        <input
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-white px-3 text-gray-900 placeholder:text-gray-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60',
            invalid
              ? 'border-error focus-visible:ring-error'
              : 'border-gray-300 hover:border-gray-400',
            sizeClasses[inputSize],
            className,
          )}
          {...props}
        />
      );
    }

    return (
      <div className="relative w-full">
        {leftAdornment ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {leftAdornment}
          </span>
        ) : null}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-white text-gray-900 placeholder:text-gray-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60',
            invalid
              ? 'border-error focus-visible:ring-error'
              : 'border-gray-300 hover:border-gray-400',
            leftAdornment ? 'pl-10' : 'px-3',
            rightAdornment ? 'pr-10' : '',
            sizeClasses[inputSize],
            className,
          )}
          {...props}
        />
        {rightAdornment ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            {rightAdornment}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
