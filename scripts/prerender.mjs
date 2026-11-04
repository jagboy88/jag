/**
 * Prerender every route to its own static HTML file and write sitemap.xml.
 *
 *   /                          → dist/index.html
 *   /services/video-editing/   → dist/services/video-editing/index.html
 *
 * Each file gets the rendered page inside #root and its own <head> tags
 * (title, description, canonical, Open Graph, JSON-LD) in place of the
 * <!--seo:start--> … <!--seo:end--> block from index.html. The client
 * bundle then hydrates on top (see src/main.jsx).
 *
 * Runs after `vite build` and `vite build --ssr` (see package.json "build").
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, routes, headFor } = await import(path.join(ssrDir, 'entry-server.js'));
const ORIGIN = 'https://impactmediagroup.ca';

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const ROOT_MARKER = '<div id="root"></div>';
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!template.includes(ROOT_MARKER)) throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
if (!SEO_BLOCK.test(template)) throw new Error('prerender: <!--seo:start-->…<!--seo:end--> block not found in index.html');

for (const route of routes) {
  const appHtml = render(route.path);
  const html = template
    .replace(SEO_BLOCK, headFor(route))
    .replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`);
  const outDir = path.join(dist, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  const words = appHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`prerender: ${route.path.padEnd(38)} ${String(words).padStart(5)} words`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${ORIGIN}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.kind === 'home' ? '1.0' : '0.8'}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`prerender: sitemap.xml with ${routes.length} URLs`);

await rm(ssrDir, { recursive: true, force: true });
