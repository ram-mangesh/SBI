// ============================================================================
// Date Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Thin wrappers around date-fns with app-wide defaults.
// ============================================================================

import {
  format,
  formatDistanceToNow,
  isValid,
  parseISO,
  differenceInDays,
  differenceInMonths,
  isAfter,
  isBefore,
} from 'date-fns';

export const DATE_FORMATS = {
  short: 'dd MMM yyyy',
  long: 'dd MMMM yyyy',
  dateTime: 'dd MMM yyyy, HH:mm',
  time: 'HH:mm',
  iso: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  relative: 'relative',
} as const;

type DateInput = Date | string | number;

/** Coerce any date input into a valid Date (or null). */
export function toDate(value: DateInput): Date | null {
  if (value instanceof Date) return isValid(value) ? value : null;
  if (typeof value === 'number') {
    const d = new Date(value);
    return isValid(d) ? d : null;
  }
  if (typeof value === 'string') {
    const parsed = parseISO(value);
    if (isValid(parsed)) return parsed;
    const d = new Date(value);
    return isValid(d) ? d : null;
  }
  return null;
}

export function formatDate(value: DateInput, pattern: string = DATE_FORMATS.short): string {
  const date = toDate(value);
  if (!date) return '—';
  return format(date, pattern);
}

export function formatRelative(value: DateInput): string {
  const date = toDate(value);
  if (!date) return '—';
  return formatDistanceToNow(date, { addSuffix: true });
}

export function daysBetween(from: DateInput, to: DateInput): number {
  const fromD = toDate(from);
  const toD = toDate(to);
  if (!fromD || !toD) return 0;
  return differenceInDays(toD, fromD);
}

export function monthsBetween(from: DateInput, to: DateInput): number {
  const fromD = toDate(from);
  const toD = toDate(to);
  if (!fromD || !toD) return 0;
  return differenceInMonths(toD, fromD);
}

export function isDateAfter(a: DateInput, b: DateInput): boolean {
  const aD = toDate(a);
  const bD = toDate(b);
  if (!aD || !bD) return false;
  return isAfter(aD, bD);
}

export function isDateBefore(a: DateInput, b: DateInput): boolean {
  const aD = toDate(a);
  const bD = toDate(b);
  if (!aD || !bD) return false;
  return isBefore(aD, bD);
}

/** Age in completed years from a DOB. */
export function calculateAge(dob: DateInput, on = new Date()): number {
  const birth = toDate(dob);
  if (!birth) return 0;
  const ref = toDate(on) ?? new Date();
  const years = ref.getFullYear() - birth.getFullYear();
  const m = ref.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) return years - 1;
  return years;
}

export default {
  DATE_FORMATS,
  toDate,
  formatDate,
  formatRelative,
  daysBetween,
  monthsBetween,
  isDateAfter,
  isDateBefore,
  calculateAge,
};
