export const logger = {
  debug: (...args: unknown[]) => {
    if (import.meta.env.DEV) console.log('[DEBUG]', ...args);
  },
  info: (...args: unknown[]) => console.log('[INFO]', ...args),
  warn: (...args: unknown[]) => console.warn('[WARN]', ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', ...args),
};
