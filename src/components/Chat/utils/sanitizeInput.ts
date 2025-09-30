// src/utils/sanitizeInput.ts
import DOMPurify from 'dompurify';

// Common XSS patterns to block
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+="[^"]*"/gi,
  /on\w+='[^']*'/gi,
  /on\w+=[^\s>]+/gi,
  /<\s*\/?html|head|body|iframe|frame|object|embed|svg/gi
];

// Common SQL injection patterns
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|TRUNCATE|CREATE|ALTER)\b)/gi,
  /(--|\/\*|\*\/|;|'|"|`|\\\*|\|)/g
];

// Maximum message length
const MAX_MESSAGE_LENGTH = 2000;

/**
 * Sanitizes and validates user input
 * @param input The input string to sanitize
 * @returns Sanitized and validated string or null if invalid
 */
export function sanitizeInput(input: string): string | null {
  if (typeof input !== 'string') {
    return null;
  }

  // Trim whitespace
  const trimmed = input.trim();
  
  // Check max length
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return null;
  }

  // Check for XSS patterns
  for (const pattern of XSS_PATTERNS) {
    if (pattern.test(trimmed)) {
      return null;
    }
  }

  // Check for SQL injection patterns
  for (const pattern of SQL_INJECTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return null;
    }
  }

  // Sanitize HTML using DOMPurify
  const clean = DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p', 'span'],
    ALLOWED_ATTR: ['class', 'style'],
    ALLOW_DATA_ATTR: false
  });

  return clean || null;
}

/**
 * Validates if a message is safe to send
 * @param message The message to validate
 * @returns boolean indicating if the message is valid
 */
export function isValidMessage(message: string): boolean {
  return sanitizeInput(message) !== null;
}