// ============================================================================
// App Providers — Provider Composition Order
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §14
//
// NESTING ORDER (outermost → innermost):
// 1. React.StrictMode
// 2. ErrorBoundary (global error catch)
// 3. ThemeProvider (Tailwind dark/light)
// 4. I18nProvider (i18next)
// 5. QueryProvider (TanStack Query client)
// 6. ToastProvider (Radix Toast)
// 7. MotionProvider (Framer Motion config)
// 8. AppRoutes (React Router v7 BrowserRouter)
// ============================================================================

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import { AccentThemeProvider } from '@/shared/providers/AccentThemeProvider';
import { QueryProvider } from '@/shared/providers/QueryProvider';
import { ToastProvider } from '@/shared/providers/ToastProvider';
import { MotionProvider } from '@/shared/providers/MotionProvider';
import { I18nProvider } from '@/shared/providers/I18nProvider';
import { ShortcutsProvider } from '@/shared/providers/ShortcutsProvider';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';
import { SessionManager } from '@/features/auth/components/SessionManager';

export interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          {/* Dynamic primary color by customer type (Section 3.12). Sits inside
              ThemeProvider so it can react to resolvedTheme. */}
          <AccentThemeProvider>
            <I18nProvider>
              <QueryProvider>
                <ToastProvider>
                  <MotionProvider>
                    <BrowserRouter>
                      {/* ShortcutsProvider lives inside the Router so it can
                          useNavigate for the Alt+* jumps. */}
                      <ShortcutsProvider>
                        <SessionManager />
                        {children}
                      </ShortcutsProvider>
                    </BrowserRouter>
                  </MotionProvider>
                </ToastProvider>
              </QueryProvider>
            </I18nProvider>
          </AccentThemeProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default AppProviders;
