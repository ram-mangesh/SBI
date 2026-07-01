// ============================================================================
// User Roles & Hierarchy
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2 (Guards)
//   RoleGuard hierarchy: ADMIN > RELATIONSHIP_MANAGER > CUSTOMER
// ============================================================================

export const UserRole = {
  ADMIN: 'ADMIN',
  RELATIONSHIP_MANAGER: 'RELATIONSHIP_MANAGER',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

/**
 * Numeric privilege weight — higher value = greater access.
 * Used by RoleGuard to enforce ADMIN > RELATIONSHIP_MANAGER > CUSTOMER.
 */
export const ROLE_PRIVILEGE: Record<UserRole, number> = {
  ADMIN: 30,
  RELATIONSHIP_MANAGER: 20,
  CUSTOMER: 10,
};

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrator',
  RELATIONSHIP_MANAGER: 'Relationship Manager',
  CUSTOMER: 'Customer',
};

/** Short aliases used in route guards / nav config. */
export const ROLE_SHORT: Record<UserRole, string> = {
  ADMIN: 'admin',
  RELATIONSHIP_MANAGER: 'rm',
  CUSTOMER: 'customer',
};

/** All roles in descending privilege order. */
export const ROLES_BY_PRIVILEGE: UserRole[] = [
  UserRole.ADMIN,
  UserRole.RELATIONSHIP_MANAGER,
  UserRole.CUSTOMER,
];

/**
 * Resolve the highest-privilege role from a list of role strings.
 * Unknown roles default to CUSTOMER privilege.
 */
export function highestRole(roles: string[]): UserRole {
  let best: UserRole = UserRole.CUSTOMER;
  let bestWeight = ROLE_PRIVILEGE[UserRole.CUSTOMER];
  for (const r of roles) {
    const weight = ROLE_PRIVILEGE[r as UserRole];
    if (typeof weight === 'number' && weight > bestWeight) {
      best = r as UserRole;
      bestWeight = weight;
    }
  }
  return best;
}

export default {
  UserRole,
  ROLE_PRIVILEGE,
  ROLE_LABELS,
  ROLE_SHORT,
  ROLES_BY_PRIVILEGE,
  highestRole,
};