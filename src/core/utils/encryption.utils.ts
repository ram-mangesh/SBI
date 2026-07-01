// ============================================================================
// Encryption Utility
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Lightweight obfuscation for client-stored sensitive tokens.
// NOTE: Not a substitute for server-side security — client storage of
// credentials uses Bearer JWT strategy (Phase 1 §10); this provides
// tamper-evident encoding for sessionStorage values only.
// ============================================================================

const SALT = 'bankmate::v1';

function xorTransform(input: string, key: string): string {
  let output = '';
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    output += String.fromCharCode(charCode);
  }
  return output;
}

/** Encode a string to base64 (Unicode-safe). */
export function encodeBase64(value: string): string {
  if (typeof window === 'undefined') return '';
  return window.btoa(unescape(encodeURIComponent(value)));
}

/** Decode a base64 string (Unicode-safe). */
export function decodeBase64(value: string): string {
  if (typeof window === 'undefined') return '';
  try {
    return decodeURIComponent(escape(window.atob(value)));
  } catch {
    return '';
  }
}

/** Obfuscate a value before placing in client storage. */
export function encrypt(value: string): string {
  const transformed = xorTransform(value, SALT);
  return encodeBase64(transformed);
}

/** Reverse of encrypt(). Returns '' on failure. */
export function decrypt(value: string): string {
  const decoded = decodeBase64(value);
  if (!decoded) return '';
  return xorTransform(decoded, SALT);
}

/** Generate a pseudo-random ID (not cryptographically secure). */
export function generateId(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const array = new Uint8Array(length);
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) result += chars[array[i] % chars.length];
  } else {
    for (let i = 0; i < length; i++) result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/** RFC4122 v4 UUID using crypto where available. */
export function uuid(): string {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default { encrypt, decrypt, encodeBase64, decodeBase64, generateId, uuid };
