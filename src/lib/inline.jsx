/**
 * Minimal inline-link markup for page copy: "[link text](/path/)".
 * <Inline> renders the links as <a>; plain() strips the markup for
 * meta tags and structured data.
 */
import { LINK } from './plain.js';

export function Inline({ text = '' }) {
  const out = [];
  let last = 0;
  for (const m of String(text).matchAll(LINK)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <a
        key={m.index}
        href={m[2]}
        className="text-ivory underline decoration-gold/60 decoration-1 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
