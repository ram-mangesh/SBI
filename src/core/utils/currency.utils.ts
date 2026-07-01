// ============================================================================
// Currency Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Indian banking context — INR formatting + EMI / affordability math.
// ============================================================================

export const CURRENCY = {
  code: 'INR',
  symbol: '₹',
  locale: 'en-IN',
} as const;

/** Format a number as Indian Rupees: 125000 → ₹1,25,000 */
export function formatCurrency(amount: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
}

/** Compact currency for large values: 1250000 → ₹12.5L, 12500000 → ₹1.25Cr */
export function formatCompactCurrency(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 10000000) return `${CURRENCY.symbol}${(amount / 10000000).toFixed(2)}Cr`;
  if (abs >= 100000) return `${CURRENCY.symbol}${(amount / 100000).toFixed(2)}L`;
  if (abs >= 1000) return `${CURRENCY.symbol}${(amount / 1000).toFixed(1)}K`;
  return formatCurrency(amount);
}

/** Parse a currency string back to number: '₹1,25,000' → 125000 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Standard EMI formula (reducing balance).
 * EMI = P × r × (1+r)^n / ((1+r)^n − 1)
 * where r = monthlyRate (decimal), n = tenureMonths.
 */
export function calculateEMI(principal: number, annualRatePercent: number, tenureMonths: number): number {
  const monthlyRate = annualRatePercent / 12 / 100;
  if (monthlyRate === 0) return principal / tenureMonths;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

/** Total payable = EMI × tenure. */
export function calculateTotalPayable(emi: number, tenureMonths: number): number {
  return emi * tenureMonths;
}

/** Total interest over the loan. */
export function calculateTotalInterest(principal: number, emi: number, tenureMonths: number): number {
  return Math.max(0, calculateTotalPayable(emi, tenureMonths) - principal);
}

/**
 * Affordability check — Section 5 (Recommendations).
 * Conservative rule: EMI should not exceed `emiToIncomeRatio` of monthly income.
 */
export function isAffordable(
  monthlyIncome: number,
  emi: number,
  emiToIncomeRatio = 0.4
): boolean {
  if (monthlyIncome <= 0) return false;
  return emi / monthlyIncome <= emiToIncomeRatio;
}

export default {
  CURRENCY,
  formatCurrency,
  formatCompactCurrency,
  parseCurrency,
  calculateEMI,
  calculateTotalPayable,
  calculateTotalInterest,
  isAffordable,
};
