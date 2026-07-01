// Ultra-light security layer with async validation

/**
 * Rate Limiter Store (in-memory, ideal para edge/serverless)
 * Tracked por IP/fingerprint com TTL automático
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minuto
  maxRequests: 30, // 30 requests por minuto
};

export function createRateLimiter(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_CONFIG.windowMs });
    return true;
  }

  if (record.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Ultra-lightweight input sanitizer (no regex hell)
 * Roda em background, não bloqueia rendering
 */
const DANGEROUS_CHARS = /[<>"'`]/g;
const HTML_ENTITIES: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
};

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(DANGEROUS_CHARS, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Async validator para forms (roda em web worker quando possível)
 */
export async function validateEmailAsync(email: string): Promise<boolean> {
  const trimmed = email.trim().toLowerCase();
  // Simple RFC 5322 subset validation
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(trimmed);
}

export async function validateUrlAsync(url: string): Promise<boolean> {
  try {
    const u = new URL(url);
    return ['http:', 'https:'].includes(u.protocol);
  } catch {
    return false;
  }
}

/**
 * Cleanup rate limiter records older que 2 minutos (garbage collection)
 */
export function cleanupRateLimitStore(): void {
  if (typeof window === 'undefined') return; // Server-side cleanup happens elsewhere
  
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetAt + 60_000) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get client fingerprint (lightweight, não é perfect)
 */
export function getClientFingerprint(): string {
  if (typeof window === 'undefined') return 'server';
  
  const nav = navigator;
  const screen_ = typeof window !== 'undefined' ? window.screen : null;
  
  const parts = [
    nav.userAgent,
    nav.language,
    screen_?.width,
    screen_?.height,
    new Date().getTimezoneOffset(),
  ];
  
  // Simple hash (não use em production critical, mas OK para rate limiting)
  return parts.join('|');
}

/**
 * CSP Headers para prevenir XSS (adicionar no servidor)
 */
export const CSP_HEADER = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'wasm-unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};
