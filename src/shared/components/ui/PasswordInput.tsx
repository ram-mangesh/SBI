// ============================================================================
// PasswordInput — UI Primitive
// Source of Truth: BankMate AI Frontend Blueprint · §4.1.1 / §4.1.2 / §4.1.5
// Password field with a show/hide toggle (eye icon), autocomplete hints and
// forwardRef so it drops straight into react-hook-form's register/register().
// ============================================================================

import { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/core/utils/cn.utils';

export type PasswordInputSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<PasswordInputSize, string> = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-sm',
  lg: 'h-12 text-base',
};

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  inputSize?: PasswordInputSize;
  invalid?: boolean;
  /** autocomplete value — 'current-password' (login) | 'new-password' (register/reset). */
  autoComplete?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { className, inputSize = 'md', invalid, autoComplete = 'current-password', ...props },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const toggleId = useId();

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          className={cn(
            'w-full rounded-lg border bg-white px-3 pr-11 text-gray-900 placeholder:text-gray-400',
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
        <button
          id={toggleId}
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
