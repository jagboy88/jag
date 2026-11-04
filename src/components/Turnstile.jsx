import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise = null;

/** Load Cloudflare's Turnstile script once per page. */
function loadTurnstile() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve(window.turnstile);
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error('Turnstile failed to load'));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

/**
 * Invisible-unless-needed Cloudflare Turnstile check.
 *
 * Exposes `getToken()` (resolves with a fresh token, waiting up to
 * `timeoutMs` for the challenge to finish) and `reset()` (tokens are
 * single-use, so call it after every submission).
 */
const Turnstile = forwardRef(function Turnstile({ siteKey, timeoutMs = 8000 }, ref) {
  const container = useRef(null);
  const widgetId = useRef(null);
  const token = useRef('');
  const waiters = useRef([]);

  const settle = (value) => {
    token.current = value;
    if (value) {
      waiters.current.forEach((w) => w.resolve(value));
      waiters.current = [];
    }
  };

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((ts) => {
        if (cancelled || !container.current || widgetId.current !== null) return;
        widgetId.current = ts.render(container.current, {
          sitekey: siteKey,
          theme: 'dark',
          appearance: 'interaction-only', // shows a box only if Cloudflare needs the visitor to click
          action: 'contact',
          callback: (t) => settle(t),
          'expired-callback': () => settle(''),
          'error-callback': () => settle(''),
        });
      })
      .catch(() => {
        // Script blocked (ad-blocker, offline). getToken() will time out and
        // the form shows its normal error with the email address.
      });
    return () => {
      cancelled = true;
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey]);

  useImperativeHandle(ref, () => ({
    getToken() {
      if (token.current) return Promise.resolve(token.current);
      return new Promise((resolve, reject) => {
        const waiter = { resolve };
        waiters.current.push(waiter);
        setTimeout(() => {
          waiters.current = waiters.current.filter((w) => w !== waiter);
          reject(new Error('Turnstile timed out'));
        }, timeoutMs);
      });
    },
    reset() {
      token.current = '';
      if (widgetId.current !== null && window.turnstile) window.turnstile.reset(widgetId.current);
    },
  }));

  return <div ref={container} className="min-h-0" />;
});

export default Turnstile;
