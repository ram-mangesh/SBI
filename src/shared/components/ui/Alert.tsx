// ============================================================================
// Alert — UI Primitive
// Source of Truth: BankMate AI Frontend Blueprint · §6 / §11
// Inline contextual message (error/success/warning/info).
// ============================================================================

import { forwardRef } from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/core/utils/cn.utils';

const alertVariants = cva(
  'flex w-full items-start gap-3 rounded-lg border p-3.5 text-sm',
  {
    variants: {
      variant: {
        error: 'border-error/30 bg-error-light/60 text-error-dark',
        success: 'border-success/30 bg-success-light/60 text-success-dark',
        warning: 'border-warning/30 bg-warning-light/60 text-warning-dark',
        info: 'border-primary-200 bg-primary-50 text-primary-800',
      },
    },
    defaultVariants: { variant: 'info' },
  },
);

const iconMap = {
  error: XCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Optional title above the message. */
  title?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, children, ...props }, ref) => {
    const Icon = iconMap[variant ?? 'info'];
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          {title ? <p className="font-semibold">{title}</p> : null}
          {children ? <div className={cn(title ? 'mt-0.5 text-sm' : '')}>{children}</div> : null}
        </div>
      </div>
    );
  },
);

Alert.displayName = 'Alert';

export default Alert;
