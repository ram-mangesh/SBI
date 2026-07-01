// ============================================================================
// Sidebar (generic)
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.6 (Sidebar Nav)
// Renders a role's NavSection[] with active-link matching, feature-flag
// filtering and a collapse state driven by the UI store. Role-specific
// sidebars (Customer/Admin/RM) are thin wrappers around this component.
// ============================================================================

import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { APP_NAME } from '@/core/constants/app.constants';
import { ROUTES } from '@/core/config/routes.config';
import { FEATURE_FLAG_DEFAULTS } from '@/core/constants/feature-flags.constants';
import { useAuthStore, resolveUserRole } from '@/store';
import { useUIStore } from '@/store';
import type { NavRole } from '@/store';
import { ROLE_SHORT } from '@/core/constants/roles.constants';
import { cn } from '@/core/utils/cn.utils';
import type { NavSection } from './nav.config';

export interface SidebarProps {
  role: NavRole;
  sections: NavSection[];
}

/** Landing route for a role — used by the brand logo. */
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

function isActive(pathname: string, to: string, match?: string): boolean {
  const prefix = match ?? to;
  if (prefix === ROUTES.ROOT) return pathname === ROUTES.ROOT;
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function Sidebar({ role, sections }: SidebarProps) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const user = useAuthStore((s) => s.user);
  const resolvedRole = resolveUserRole(user);
  const location = useLocation();

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Brand */}
      <div
        className={cn(
          'flex h-16 items-center gap-2 border-b border-gray-100 px-4',
          collapsed && 'justify-center px-0',
        )}
      >
        <NavLink to={landingRoute(role)} className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            B
          </span>
          {!collapsed ? (
            <span className="text-sm font-semibold text-gray-900">{APP_NAME}</span>
          ) : null}
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label={`${role} navigation`}>
        {sections.map((section, si) => {
          const items = section.items.filter(
            (item) => !item.flag || FEATURE_FLAG_DEFAULTS[item.flag],
          );
          if (!items.length) return null;

          return (
            <div key={section.label ?? si} className="mb-4">
              {!collapsed && section.label ? (
                <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {section.label}
                </p>
              ) : null}
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const active = isActive(location.pathname, item.to, item.match);
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          collapsed && 'justify-center px-0',
                          active
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-5 w-5 shrink-0',
                            active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600',
                          )}
                          aria-hidden="true"
                        />
                        {!collapsed ? <span className="flex-1">{item.label}</span> : null}
                        {!collapsed && item.badge ? (
                          <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                            {item.badge}
                          </span>
                        ) : null}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle + user */}
      <div className="border-t border-gray-100 p-2">
        <button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900',
            collapsed && 'justify-center px-0',
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Collapse</span>
            </>
          )}
        </button>

        {!collapsed && user ? (
          <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
              {user.fullName?.charAt(0)?.toUpperCase() ?? 'U'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-gray-900">{user.fullName}</p>
              <p className="truncate text-[11px] capitalize text-gray-400">
                {ROLE_SHORT[resolvedRole]}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Sidebar;