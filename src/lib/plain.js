/** "[link text](/path/)" markup used in page copy; see inline.jsx. */
export const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Strip link markup, keeping the link text (for meta tags and JSON-LD). */
export function plain(text = '') {
  return String(text).replace(LINK, '$1');
}
