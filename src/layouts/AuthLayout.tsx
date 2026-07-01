// ============================================================================
// AuthLayout
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.1 / 3.1 / 3.3
// Split-screen shell for /auth/* routes.
//   Left  — brand panel: logo, headline, feature highlights, testimonial.
//   Right — form slot: language selector, <Outlet/> (form), legal footer.
// Collapses to a single centered column on mobile.
// ============================================================================

import { Outlet, Link } from 'react-router-dom';
import { Sparkles, MessageSquare, ShieldCheck, Mic } from 'lucide-react';
import { ROUTES } from '@/core/config/routes.config';
import { APP_NAME } from '@/core/constants/app.constants';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/core/constants/app.constants';
import { cn } from '@/core/utils/cn.utils';

const FEATURES = [
  { icon: Sparkles, title: 'Personalized recommendations', desc: 'AI-matched products for your goals.' },
  { icon: MessageSquare, title: 'Conversational AI chat', desc: 'Guidance across loans, insurance & more.' },
  { icon: Mic, title: 'Voice assistant', desc: 'Bank hands-free in your language.' },
  { icon: ShieldCheck, title: 'Bank-grade security', desc: 'Encrypted, RBI-compliant by design.' },
];

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-app lg:flex-row">
      {/* ── Brand panel (hidden on mobile) ─────────────────────────────── */}
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary-600 p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25), transparent 35%)',
          }}
          aria-hidden="true"
        />
        <Link to={ROUTES.ROOT} className="relative flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-base font-bold backdrop-blur">
            B
          </span>
          <span className="text-lg font-bold">{APP_NAME}</span>
        </Link>

        <div className="relative space-y-6">
          <h2 className="text-3xl font-bold leading-tight">
            Your intelligent banking companion
          </h2>
          <p className="max-w-md text-primary-100">
            Personalized product recommendations, AI-powered chat, and proactive
            financial guidance — all in one place.
          </p>

          <ul className="grid grid-cols-2 gap-4 pt-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <li key={f.title} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{f.title}</p>
                    <p className="text-xs text-primary-100">{f.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Testimonial */}
        <figure className="relative rounded-2xl bg-white/10 p-5 backdrop-blur">
          <blockquote className="text-sm text-primary-50">
            “BankMate flagged a marriage life event and pre-approved a wedding
            loan before I even asked. Felt like magic.”
          </blockquote>
          <figcaption className="mt-3 text-xs text-primary-100">
            — Priya S., Salaried Customer
          </figcaption>
        </figure>
      </aside>

      {/* ── Form panel ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col">
        {/* Language selector */}
        <div className="flex items-center justify-end px-6 py-4">
          <label htmlFor="auth-lang" className="sr-only">
            Language
          </label>
          <select
            id="auth-lang"
            defaultValue={DEFAULT_LANGUAGE}
            className={cn(
              'rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
            )}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
              </option>
            ))}
          </select>
        </div>

        <main id="main-content" className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>

        <footer className="px-6 py-5 text-center text-xs text-muted-app">
          <p>
            By continuing you agree to our{' '}
            <Link to={ROUTES.TERMS} className="font-medium text-primary-600 hover:underline">
              Terms
            </Link>{' '}
            &{' '}
            <Link to={ROUTES.PRIVACY} className="font-medium text-primary-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="mt-1">© {new Date().getFullYear()} {APP_NAME}</p>
        </footer>
      </div>
    </div>
  );
}

export default AuthLayout;
