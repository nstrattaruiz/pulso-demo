/** Formatos y utilidades chicas compartidas. */

const nf = (digits) => new Intl.NumberFormat('es-AR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const int = nf(0);
const dec = nf(2);

/** USD 18,50 · USD 111 · USD 4.820 */
export const money = (n) => `USD ${Number.isInteger(Math.round(n * 100) / 100) ? int.format(n) : dec.format(n)}`;

/** 2026-09-24 → 24/09/2026 */
export const date = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Quita acentos y pasa a minúsculas, para buscar. */
export const norm = (s = '') => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
