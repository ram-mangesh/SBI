// ============================================================================
// Accent Theme Provider — Dynamic Primary by Customer Type
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.12 (Theme Integration)
//
// Overrides the --color-primary-* CSS variables on :root based on the active
// customer's type (Student → green, Salaried → blue, etc.), switching the
// light/dark ramp automatically with the resolved theme. Sits inside
// ThemeProvider so it can read resolvedTheme, and inside AuthProvider context
// so it can read the session user's customer type.
//
// Non-customer roles (admin/rm) keep the default brand primary.
// ============================================================================

import { useEffect, type ReactNode } from 'react';
import { useTheme } from '@/shared/providers/ThemeProvider';
import { useAuthStore } from '@/store';
import { ACCENT_THEMES } from '@/core/config/dynamic-theme.config';
import type { AccentRamp } from '@/core/config/dynamic-theme.config';
import { CustomerType } from '@/core/constants/customer-types.constants';

export interface AccentThemeProviderProps {
  children: ReactNode;
}

const RAMP_KEYS: (keyof AccentRamp)[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

/** Resolve the customer-type accent from the session user. */
function resolveAccentType(user: ReturnType<typeof useAuthStore.getState>['user']): CustomerType {
  if (!user) return CustomerType.SALARIED;
  // SessionUser carries roles; customer type lives on CustomerProfile in the
  // domain layer. Section 3 reads an optional `customerType` hint if present.
  const type = (user as { customerType?: string }).customerType;
  if (type && (Object.values(CustomerType) as string[]).includes(type)) {
    return type as CustomerType;
  }
  return CustomerType.SALARIED;
}

export function AccentThemeProvider({ children }: AccentThemeProviderProps) {
  const { resolvedTheme } = useTheme();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const root = document.documentElement;
    const accent = ACCENT_THEMES[resolveAccentType(user)];
    const ramp = resolvedTheme === 'dark' ? accent.dark : accent.light;

    RAMP_KEYS.forEach((k) => {
      root.style.setProperty(`--color-primary-${k}`, ramp[k]);
    });
    // Primary anchor used by the `primary` token + ring.
    root.style.setProperty('--color-primary', ramp[600]);
    root.style.setProperty('--color-ring', ramp[600]);
  }, [user, resolvedTheme]);

  return <>{children}</>;
}

export default AccentThemeProvider;
