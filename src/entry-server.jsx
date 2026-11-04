import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { routes } from './data/pages.js';
import { headFor } from './lib/seo.js';

/** Used only by scripts/prerender.mjs at build time. */
export function render(path) {
  return renderToString(<App path={path} />);
}

export { routes, headFor };
