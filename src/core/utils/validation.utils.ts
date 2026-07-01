// ============================================================================
// Validation Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Field-level validators (complements Zod schemas in features/).
// Indian context: PAN, Aadhaar, mobile, IFSC, GSTIN.
// ============================================================================

export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Indian mobile: optional +91, 10 digits starting 6–9
  mobileIN: /^(\+91[\-\s]?)?[6-9]\d{9}$/,
  // PAN: 5 chars (AAAAA), 4 digits, 1 char → ABCDE1234F
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  // Aadhaar: 12 digits (UIDAI)
  aadhaar: /^\d{12}$/,
  // IFSC: 4 letters + 0 + 6 alphanumeric → SBIN0001234
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  // GSTIN: 15 chars
  gstin: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/,
  // 6-digit OTP
  otp: /^\d{6}$/,
  // Pincode (India): 6 digits
  pincodeIN: /^\d{6}$/,
  // URL
  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
  // UUID v4
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;

export type ValidationResult = { valid: boolean; message?: string };

export const validators = {
  required(value: unknown): ValidationResult {
    const valid =
      value !== null &&
      value !== undefined &&
      (typeof value === 'string' ? value.trim().length > 0 : true);
    return { valid, message: valid ? undefined : 'This field is required' };
  },
  email(value: string): ValidationResult {
    const valid = patterns.email.test(value);
    return { valid, message: valid ? undefined : 'Enter a valid email address' };
  },
  mobileIN(value: string): ValidationResult {
    const valid = patterns.mobileIN.test(value.replace(/[\-\s]/g, ''));
    return { valid, message: valid ? undefined : 'Enter a valid 10-digit mobile number' };
  },
  pan(value: string): ValidationResult {
    const valid = patterns.pan.test(value.toUpperCase());
    return { valid, message: valid ? undefined : 'Enter a valid PAN (e.g. ABCDE1234F)' };
  },
  aadhaar(value: string): ValidationResult {
    const clean = value.replace(/\s/g, '');
    const valid = patterns.aadhaar.test(clean);
    return { valid, message: valid ? undefined : 'Enter a valid 12-digit Aadhaar number' };
  },
  ifsc(value: string): ValidationResult {
    const valid = patterns.ifsc.test(value.toUpperCase());
    return { valid, message: valid ? undefined : 'Enter a valid IFSC code' };
  },
  pincodeIN(value: string): ValidationResult {
    const valid = patterns.pincodeIN.test(value);
    return { valid, message: valid ? undefined : 'Enter a valid 6-digit pincode' };
  },
  otp(value: string): ValidationResult {
    const valid = patterns.otp.test(value);
    return { valid, message: valid ? undefined : 'Enter the 6-digit OTP' };
  },
  minLength(value: string, min: number): ValidationResult {
    const valid = value.length >= min;
    return { valid, message: valid ? undefined : `Must be at least ${min} characters` };
  },
  maxLength(value: string, max: number): ValidationResult {
    const valid = value.length <= max;
    return { valid, message: valid ? undefined : `Must be at most ${max} characters` };
  },
};

export default { patterns, validators };
