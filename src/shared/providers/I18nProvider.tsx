// ============================================================================
// I18n Provider — i18next
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §14 + §15
// Provides: { language, changeLanguage, t }
// Supported languages: en / hi / mr
// ============================================================================

import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import APP_CONFIG, { STORAGE_KEYS } from '@/core/constants/app.constants';
import { storage } from '@/core/utils/storage.utils';
import type { SupportedLanguage } from '@/core/constants/app.constants';

// ── Context ──────────────────────────────────────────────────────────────
interface I18nContextValue {
  language: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// ── i18next init (lazy — runs once) ─────────────────────────────────────
let initialized = false;

function ensureI18n(defaultLang: SupportedLanguage) {
  if (initialized) return;
  initialized = true;

  i18n.use(initReactI18next).init({
    resources: {}, // loaded from /public/locales in feature phase
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

// ── Provider ─────────────────────────────────────────────────────────────
export interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: SupportedLanguage;
}

export function I18nProvider({
  children,
  defaultLanguage = APP_CONFIG.DEFAULT_LANGUAGE,
}: I18nProviderProps) {
  const [language, setLanguage] = useState<SupportedLanguage>(() =>
    storage.local.get<SupportedLanguage>(STORAGE_KEYS.LANGUAGE, defaultLanguage)
  );

  // Init i18next once
  ensureI18n(language);

  const changeLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguage(lang);
    storage.local.set(STORAGE_KEYS.LANGUAGE, lang);
    i18n.changeLanguage(lang);
  }, []);

  const t = useCallback(
    (key: string, options?: Record<string, unknown>) => i18n.t(key, options),
    []
  );

  const value = useMemo(
    () => ({ language, changeLanguage, t }),
    [language, changeLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export default I18nProvider;
