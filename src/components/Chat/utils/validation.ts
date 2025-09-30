// src/utils/validation.ts
export function validateMessage(input: string): { isValid: boolean; message?: string } {
  if (!input.trim()) {
    return { isValid: false, message: 'Message cannot be empty' };
  }
  
  if (input.length > 2000) {
    return { isValid: false, message: 'Message is too long (max 2000 characters)' };
  }
  
  // Simple check for common XSS patterns
  const xssPatterns = [
    /<script\b/i,
    /javascript:/i,
    /on\w+=/i,
    /<\/?html|head|body/i
  ];
  
  for (const pattern of xssPatterns) {
    if (pattern.test(input)) {
      return { isValid: false, message: 'Message contains invalid content' };
    }
  }
  
  return { isValid: true };
}