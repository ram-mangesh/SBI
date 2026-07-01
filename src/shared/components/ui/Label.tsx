// ============================================================================
// Label — UI Primitive
// Source of Truth: BankMate AI Frontend Blueprint · §6 / §11
// ============================================================================

import { forwardRef } from 'react';
import { cn } from '@/core/utils/cn.utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('mb-1.5 block text-sm font-medium text-gray-700', className)}
      {...props}
    >
      {children}
      {required ? <span className="ml-0.5 text-error">*</span> : null}
    </label>
  ),
);

Label.displayName = 'Label';

export default Label;
