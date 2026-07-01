// ============================================================================
// Formatting Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Generic formatters: numbers, percentages, masks, truncation.
// ============================================================================

/** Format a number with thousands separators (locale-aware). */
export function formatNumber(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** Format a 0–1 or 0–100 ratio/percent value. Pass `inputMax=1` for decimals. */
export function formatPercent(value: number, inputMax = 100, fractionDigits = 0): string {
  const pct = inputMax === 1 ? value * 100 : value;
  return `${pct.toFixed(fractionDigits)}%`;
}

/** Mask sensitive identifiers — keeps first/last visible chars. */
export function maskString(value: string, visibleStart = 2, visibleEnd = 2): string {
  if (value.length <= visibleStart + visibleEnd) {
    return '•'.repeat(value.length);
  }
  const start = value.slice(0, visibleStart);
  const end = value.slice(-visibleEnd);
  const masked = '•'.repeat(Math.max(4, value.length - visibleStart - visibleEnd));
  return `${start}${masked}${end}`;
}

/** Mask an email: j•••@example.com */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return maskString(email);
  return `${local.charAt(0)}${'•'.repeat(Math.max(2, local.length - 1))}@${domain}`;
}

/** Mask a phone number: +91 9•••• •1234 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return maskString(phone);
  return `${digits.slice(0, digits.length - 4).replace(/./g, '•')}${digits.slice(-4)}`;
}

/** Truncate text with ellipsis. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

/** Format initials from a full name (max 2 chars). */
export function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Capitalize first letter. */
export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Title-case a slug: 'home_loan' → 'Home Loan' */
export function humanize(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(capitalize)
    .join(' ');
}

/** Pascal/camel to kebab-case: 'CustomerType' → 'customer-type' */
export function toKebabCase(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export default {
  formatNumber,
  formatPercent,
  maskString,
  maskEmail,
  maskPhone,
  truncate,
  getInitials,
  capitalize,
  humanize,
  toKebabCase,
};
