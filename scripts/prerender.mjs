/**
 * Prerender: render <App /> to static HTML and inject it into dist/index.html
 * so the page has real content without JavaScript. The client bundle then
 * hydrates on top (see src/main.jsx).
 *
 * Runs after `vite build` and `vite build --ssr` (see package.json "build").
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(path.join(ssrDir, 'entry-server.js'));
const appHtml = render();

const template = await readFile(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}
const html = template.replace(marker, `<div id="root">${appHtml}</div>`);
await writeFile(indexPath, html);
await rm(ssrDir, { recursive: true, force: true });

const words = appHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log(`prerender: injected ${appHtml.length.toLocaleString()} chars (${words} words) into dist/index.html`);
