// ============================================================================
// Deep Link Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §2.5 + §18
// Maps push-notification deepLinks to internal routes.
// Backend push payload → data.deepLink: 'bankmate://recommendations/:id'
// ============================================================================

import { ROUTES, routeBuilders } from '@/core/config/routes.config';

export const DEEP_LINK_SCHEME = 'bankmate://';

/** Parsed deep link result. */
export interface ParsedDeepLink {
  valid: boolean;
  route: string | null;
  params: Record<string, string>;
}

/**
 * Parse a deep link URL into an internal app route.
 * Supports: bankmate://<section>[/<id>]
 */
export function parseDeepLink(deepLink: string): ParsedDeepLink {
  const result: ParsedDeepLink = { valid: false, route: null, params: {} };
  if (!deepLink || !deepLink.startsWith(DEEP_LINK_SCHEME)) return result;

  const path = deepLink.replace(DEEP_LINK_SCHEME, '');
  const [section, id, action] = path.split('/').filter(Boolean);

  const map: Record<string, string> = {
    dashboard: ROUTES.DASHBOARD,
    recommendations: id ? routeBuilders.recommendationDetail(id) : ROUTES.RECOMMENDATIONS,
    applications:
      id && action === 'accept'
        ? routeBuilders.applicationAccept(id)
        : id
          ? routeBuilders.applicationDetail(id)
          : ROUTES.APPLICATIONS,
    'application-status': id ? routeBuilders.applicationStatus(id) : ROUTES.APPLICATIONS,
    products:
      id && action === 'apply'
        ? routeBuilders.productApply(id)
        : id
          ? routeBuilders.productDetail(id)
          : ROUTES.PRODUCTS,
    'life-events': id ? routeBuilders.lifeEventDetail(id) : ROUTES.LIFE_EVENTS,
    goals: id ? routeBuilders.goalDetail(id) : ROUTES.GOALS,
    kyc: id ? ROUTES.KYC_STATUS : ROUTES.KYC,
    notifications: id ? routeBuilders.notificationDetail(id) : ROUTES.NOTIFICATIONS,
    chat: id ? routeBuilders.chatAgent(id) : ROUTES.CHAT,
    transactions: id ? routeBuilders.transactionDetail(id) : ROUTES.TRANSACTIONS,
    voice: ROUTES.VOICE,
    settings: ROUTES.SETTINGS,
  };

  const route = map[section];
  if (!route) return result;
  result.valid = true;
  result.route = route;
  if (id) result.params.id = id;
  if (action) result.params.action = action;
  return result;
}

/** Build a deep link for a section + optional id. */
export function buildDeepLink(section: string, id?: string): string {
  return `${DEEP_LINK_SCHEME}${section}${id ? `/${id}` : ''}`;
}

export default { parseDeepLink, buildDeepLink, DEEP_LINK_SCHEME };
