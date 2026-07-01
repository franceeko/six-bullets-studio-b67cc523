/**
 * Lightweight error reporting (sem Lovable)
 * Apenas loga para console em dev, pode integrar com serviço próprio
 */

type ErrorContext = {
  boundary?: string;
  route?: string;
  timestamp?: number;
};

export function reportError(error: unknown, context: ErrorContext = {}) {
  if (typeof window === "undefined") return;

  const errorData = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    context: {
      ...context,
      route: context.route || window.location.pathname,
      timestamp: context.timestamp || Date.now(),
      userAgent: navigator.userAgent,
    },
  };

  // Log locally em dev
  if (process.env.NODE_ENV === "development") {
    console.error("[App Error]", errorData);
  }

  // Aqui você pode integrar com um serviço de error tracking
  // Ex: Sentry, Rollbar, etc.
  // await fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorData) })
}
