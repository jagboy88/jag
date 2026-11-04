import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production builds ship prerendered HTML inside #root (see
// scripts/prerender.mjs) so crawlers get the full page without JavaScript.
// Hydrate it when present; fall back to a fresh render in dev.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
