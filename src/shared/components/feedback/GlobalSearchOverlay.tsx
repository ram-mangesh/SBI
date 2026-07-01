// ============================================================================
// Global Search Overlay (Command Palette)
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.3.1 (Global Search)
// Lightweight command-palette overlay opened via Ctrl/Cmd + K. Quick links to
// primary destinations plus a free-text field. Section 3 ships the shell;
// backend search wiring is deferred to the feature phase.
// ============================================================================

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/store';
import { ROUTES } from '@/core/config/routes.config';
import { cn } from '@/core/utils/cn.utils';

interface QuickLink {
  label: string;
  to: string;
  hint: string;
}

const QUICK_LINKS: QuickLink[] = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, hint: 'Customer' },
  { label: 'Products', to: ROUTES.PRODUCTS, hint: 'Customer' },
  { label: 'Applications', to: ROUTES.APPLICATIONS, hint: 'Customer' },
  { label: 'Recommendations', to: ROUTES.RECOMMENDATIONS, hint: 'Customer' },
  { label: 'AI Chat', to: ROUTES.CHAT, hint: 'Customer' },
  { label: 'Notifications', to: ROUTES.NOTIFICATIONS, hint: 'Customer' },
  { label: 'Help Center', to: ROUTES.HELP, hint: 'Public' },
];

export function GlobalSearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  // Auto-focus the input on open; reset on close.
  useEffect(() => {
    if (open) {
      setQuery('');
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const results = query
    ? QUICK_LINKS.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()))
    : QUICK_LINKS;

  function go(to: string) {
    setOpen(false);
    navigate(to);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          style={{ zIndex: 'var(--z-global-modal)' }}
        />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-[15vh] z-[9999] w-[calc(100%-32px)] max-w-xl -translate-x-1/2',
            'overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4',
          )}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Global search</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-gray-100 px-4">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, help, pages…"
              className="h-14 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && results[0]) go(results[0].to);
              }}
            />
            <kbd className="rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] text-gray-400">
              Esc
            </kbd>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {query ? 'Results' : 'Quick links'}
            </p>
            {results.length ? (
              <ul>
                {results.map((l) => (
                  <li key={l.to}>
                    <button
                      type="button"
                      onClick={() => go(l.to)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-50"
                    >
                      <Search className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                      <span className="flex-1 text-sm font-medium text-gray-800">{l.label}</span>
                      <span className="text-xs text-gray-400">{l.hint}</span>
                      <ArrowRight className="h-4 w-4 text-gray-300" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-6 text-center text-sm text-gray-400">
                No matches for “{query}”.
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default GlobalSearchOverlay;
