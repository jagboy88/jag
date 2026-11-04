import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/** Used only by scripts/prerender.mjs at build time. */
export function render() {
  return renderToString(<App />);
}
