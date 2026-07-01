// ============================================================================
// Theme Provider
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §14 + §15
// Provides: { theme, resolvedTheme, setTheme, toggleTheme }
// Tailwind dark/light class-based toggling.
// ============================================================================

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import type { ThemeMode, ResolvedTheme, ThemeContextValue } from '@/core/types';
import { THEME_CONFIG } from '@/core/config/theme.config';
import { storage } from '@/core/utils/storage.utils';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export function ThemeProvider({ children, defaultTheme = THEME_CONFIG.defaultTheme }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return (storage.local.get<ThemeMode>(THEME_CONFIG.storageKey, defaultTheme));
  });

  const resolvedTheme = useMemo(() => resolveTheme(theme), [theme]);

  // Sync dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setThemeState('system'); // trigger re-resolve
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    storage.local.set(THEME_CONFIG.storageKey, mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'dark';
      // system → resolved
      return resolveTheme('system') === 'dark' ? 'light' : 'dark';
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;
