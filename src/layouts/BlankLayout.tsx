// ============================================================================
// BlankLayout
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.1 / 3.1 / 3.6
// Bare chrome for public marketing + error pages. Supports optional header &
// footer, content container width variants, and a vertically centered mode
// for error/auth-adjacent states.
// ============================================================================

import { Outlet } from 'react-router-dom';
import { cn } from '@/core/utils/cn.utils';

export type BlankContainer =
  | 'full'
  | 'dashboard'
  | 'detail'
  | 'list'
  | 'narrow'
  | 'form'
  | 'article';

export interface BlankLayoutProps {
  /** Show the public footer (Section 3.5.1). Default true. */
  footer?: boolean;
  /** Center content vertically (error pages). */
  centered?: boolean;
  /** Content max-width variant (Section 3.6). Default 'dashboard'. */
  container?: BlankContainer;
}

const CONTAINER_CLASS: Record<BlankContainer, string> = {
  full: 'max-w-none',
  dashboard: 'bm-container-dashboard',
  detail: 'bm-container-detail',
  list: 'bm-container-list',
  narrow: 'bm-container-narrow',
  form: 'bm-container-form',
  article: 'bm-container-article',
};

export function BlankLayout({
  footer = true,
  centered = false,
  container = 'dashboard',
}: BlankLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-app">
      <main
        id="main-content"
        className={cn(
          'flex flex-1 flex-col',
          centered && 'items-center justify-center py-16',
        )}
      >
        <div className={cn('bm-container mx-auto w-full', CONTAINER_CLASS[container])}>
          <Outlet />
        </div>
      </main>

      {footer ? (
        <footer className="mt-auto border-t border-gray-100 py-4 text-center text-xs text-muted-app">
          <span className="px-4">© {new Date().getFullYear()} BankMate AI</span>
        </footer>
      ) : null}
    </div>
  );
}

export default BlankLayout;
