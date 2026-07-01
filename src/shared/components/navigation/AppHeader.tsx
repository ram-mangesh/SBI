// ============================================================================
// App Header
// Source of Truth: Frontend Blueprint Section 3.3
// Shared role-aware header for Customer, Admin, and RM layouts.
// ============================================================================

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Bell,
  LogOut,
  Menu,
  Mic,
  Moon,
  Search,
  Settings,
  Sun,
  User as UserIcon,
} from 'lucide-react';
import { APP_NAME, APP_VERSION } from '@/core/constants/app.constants';
import { ROUTES } from '@/core/config/routes.config';
import { ROLE_LABELS, ROLE_SHORT } from '@/core/constants/roles.constants';
import { cn } from '@/core/utils/cn.utils';
import { useAuthStore, resolveUserRole, useUIStore } from '@/store';
import type { NavRole } from '@/store';
import { useTheme } from '@/shared/providers/ThemeProvider';
import { Breadcrumb } from './Breadcrumb';

export interface AppHeaderProps {
  role: NavRole;
}

function landingRoute(role: NavRole): string {
  switch (role) {
    case 'admin':
      return ROUTES.ADMIN_DASHBOARD;
    case 'rm':
      return ROUTES.RM_DASHBOARD;
    default:
      return ROUTES.DASHBOARD;
  }
}

export function AppHeader({ role }: AppHeaderProps) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const openMobileNav = useUIStore((s) => s.openMobileNav);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const { resolvedTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const resolvedRole = resolveUserRole(user);

  useEffect(() => {
    if (!menuOpen) return;
    function onDocClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

  function handleLogout() {
    clearSession();
    navigate(ROUTES.LOGIN);
  }

  const isAdmin = role === 'admin';
  const isRm = role === 'rm';
  const isCustomer = role === 'customer';
  const roleBadge = isAdmin ? 'ADMIN' : isRm ? 'RM' : 'CUSTOMER';

  return (
    <header
      className="sticky top-0 z-[100] flex h-14 items-center gap-3 border-b border-app bg-surface/95 px-3 backdrop-blur lg:h-16 lg:px-6"
      role="banner"
    >
      <button
        type="button"
        onClick={openMobileNav}
        className="rounded-md p-2 text-muted-app hover:bg-gray-50 hover:text-app lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <Link to={landingRoute(role)} className="flex min-w-0 items-center gap-2 lg:hidden">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-600 text-xs font-bold text-white">
          B
        </span>
        <span className="truncate text-sm font-semibold text-app">{APP_NAME}</span>
      </Link>

      <div className="hidden min-w-0 flex-1 items-center gap-4 lg:flex">
        <Breadcrumb className="min-w-0 flex-1" />
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="hidden h-10 w-[300px] items-center gap-2 rounded-full border border-transparent bg-gray-50 px-4 text-left text-sm text-gray-500 ring-1 ring-gray-100 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 xl:flex"
          aria-label="Open global search"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="flex-1 truncate">Search products, help...</span>
          <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-gray-400">
            Ctrl K
          </kbd>
        </button>
      </div>

      <div className="flex-1 lg:hidden" />

      {isAdmin ? (
        <Link
          to={ROUTES.ADMIN_MONITORING}
          className="hidden items-center gap-2 rounded-full bg-success-light px-3 py-1.5 text-xs font-semibold text-success-dark lg:flex"
          title="System healthy"
        >
          <span className="h-2 w-2 rounded-full bg-success" />
          Healthy
        </Link>
      ) : null}

      {isRm ? (
        <Link
          to={ROUTES.RM_TARGETS}
          className="hidden items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 lg:flex"
          title="View targets"
        >
          <Activity className="h-4 w-4" aria-hidden="true" />
          68%
        </Link>
      ) : null}

      <span
        className={cn(
          'hidden rounded-full px-2.5 py-1 text-[11px] font-bold lg:inline-flex',
          isAdmin
            ? 'bg-warning-light text-warning-dark'
            : isRm
              ? 'bg-primary-50 text-primary-700'
              : 'bg-gray-100 text-gray-600',
        )}
      >
        {roleBadge}
      </span>

      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="rounded-md p-2 text-muted-app hover:bg-gray-50 hover:text-app xl:hidden"
        aria-label="Open global search"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>

      {isCustomer ? (
        <Link
          to={ROUTES.VOICE}
          className="relative rounded-md p-2 text-muted-app hover:bg-gray-50 hover:text-app"
          aria-label="Voice assistant"
          title="Voice assistant"
        >
          <Mic className="h-5 w-5" aria-hidden="true" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
        </Link>
      ) : null}

      <Link
        to={isAdmin ? ROUTES.ADMIN_MONITORING_ERRORS : ROUTES.NOTIFICATIONS}
        className="relative rounded-md p-2 text-muted-app hover:bg-gray-50 hover:text-app"
        aria-label="Notifications"
        title="Notifications"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold leading-none text-white">
          3
        </span>
      </Link>

      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-md p-2 text-muted-app hover:bg-gray-50 hover:text-app"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-primary-200"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
            {user?.fullName?.charAt(0)?.toUpperCase() ?? 'U'}
          </span>
        </button>

        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-64 overflow-hidden rounded-md border border-app bg-surface py-1 shadow-lg"
          >
            <div className="border-b border-app px-4 py-3">
              <p className="truncate text-sm font-medium text-app">{user?.fullName ?? 'User'}</p>
              <p className="truncate text-xs text-muted-app">
                {ROLE_LABELS[resolvedRole]} - {ROLE_SHORT[resolvedRole]}
              </p>
              {isAdmin ? <p className="mt-1 text-[11px] font-medium text-warning">v{APP_VERSION}</p> : null}
            </div>
            <Link
              to={isCustomer ? ROUTES.PROFILE : landingRoute(role)}
              role="menuitem"
              className="flex items-center gap-2 px-4 py-2 text-sm text-app hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <UserIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              Profile
            </Link>
            <Link
              to={isCustomer ? ROUTES.SETTINGS : landingRoute(role)}
              role="menuitem"
              className="flex items-center gap-2 px-4 py-2 text-sm text-app hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <Settings className="h-4 w-4 text-gray-400" aria-hidden="true" />
              Settings
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-error hover:bg-error-light"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default AppHeader;
