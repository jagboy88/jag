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
 * Cloudflare Turnstile, run on demand.
 *
 * The widget is prepared on mount but does nothing until `run()` is called
 * (on form submit). It then appears, verifies the visitor — automatically
 * for most people, with a click when Cloudflare asks for one — and resolves
 * with a single-use token. Nothing runs or refreshes in the background, so
 * the widget never flickers while someone is filling in the form.
 *
 * `onVisibleChange(true|false)` tells the parent when to show the slot.
 */
const Turnstile = forwardRef(function Turnstile({ siteKey, onVisibleChange }, ref) {
  const container = useRef(null);
  const widgetId = useRef(null);
  const pending = useRef(null); // { resolve, reject, timer }
  const used = useRef(false);
  const visibleCb = useRef(onVisibleChange);
  visibleCb.current = onVisibleChange;

  const settle = (fn, value) => {
    const p = pending.current;
    if (!p) return;
    clearTimeout(p.timer);
    pending.current = null;
    fn === 'resolve' ? p.resolve(value) : p.reject(value);
  };

  // Prepare (render, but don't run) the widget once the script is ready.
  const ensureWidget = async () => {
    const ts = await loadTurnstile();
    if (widgetId.current === null && container.current) {
      widgetId.current = ts.render(container.current, {
        sitekey: siteKey,
        theme: 'dark',
        action: 'contact',
        execution: 'execute', // only run when run() is called
        appearance: 'execute', // only visible while running
        'refresh-expired': 'never', // tokens are used immediately; never auto-refresh
        callback: (token) => settle('resolve', token),
        'error-callback': () => settle('reject', new Error('Turnstile error')),
        'timeout-callback': () => settle('reject', new Error('Turnstile timed out')),
        'expired-callback': () => settle('reject', new Error('Turnstile expired')),
      });
    }
    return ts;
  };

  useEffect(() => {
    ensureWidget().catch(() => {
      // Script blocked (ad-blocker, offline). run() will reject and the form
      // shows its normal error with the email address.
    });
    return () => {
      if (pending.current) settle('reject', new Error('unmounted'));
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  useImperativeHandle(ref, () => ({
    /** Verify the visitor. Resolves with a token; rejects on error or timeout. */
    async run({ timeoutMs = 90000 } = {}) {
      const ts = await ensureWidget();
      if (pending.current) settle('reject', new Error('superseded'));
      // Tokens are single-use: clear the previous run before starting again.
      if (used.current) ts.reset(widgetId.current);
      used.current = true;
      visibleCb.current?.(true);
      try {
        return await new Promise((resolve, reject) => {
          const timer = setTimeout(() => settle('reject', new Error('Turnstile timed out')), timeoutMs);
          pending.current = { resolve, reject, timer };
          ts.execute(widgetId.current);
        });
      } finally {
        visibleCb.current?.(false);
      }
    },
  }));

  return <div ref={container} />;
});

export default Turnstile;
