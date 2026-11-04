import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App path={window.location.pathname} />
  </React.StrictMode>
);

// Production builds ship prerendered HTML inside #root for every page (see
// scripts/prerender.mjs) so crawlers get full content without JavaScript.
// Hydrate it when present; fall back to a fresh render in dev.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
