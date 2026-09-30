/**
 * Buscador global con resultados rápidos (modal). Atajos: "/" o Ctrl/⌘ + K.
 * Respeta la regla de precios: el visitante nunca ve valores.
 */
import { PRODUCTS, CATEGORIES, categoryBySlug } from '../data/products.js';
import { isLogged } from '../store.js';
import { createLayer } from '../ui/layer.js';
import { norm, money, $ } from '../ui/format.js';
import { icon } from '../ui/icons.js';
import { productImage } from '../ui/art.js';

let layer;

export const searchProducts = (q) => {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return PRODUCTS.map((p) => {
    const name = norm(p.name);
    const hay = norm([p.name, p.sku, categoryBySlug(p.category).name, p.sub, p.desc, ...(p.tags ?? [])].join(' '));
    let score = 0;
    for (const t of terms) {
      if (!hay.includes(t)) return null;
      score += name.includes(t) ? (name.startsWith(t) ? 6 : 4) : (p.tags ?? []).some((x) => norm(x).startsWith(t)) ? 2 : 1;
    }
    return { p, score };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
};

const SUGGEST = ['vela', 'botella', 'regalo', 'cuaderno', 'taza', 'deco'];

const results = (q) => {
  if (!q.trim()) {
    return `
      <p class="pl-search__hint">Búsquedas frecuentes</p>
      <div class="pl-chips">${SUGGEST.map((s) => `<button type="button" class="pl-chip" data-suggest="${s}">${s}</button>`).join('')}</div>
      <p class="pl-search__hint">Categorías</p>
      <div class="pl-chips">${CATEGORIES.map((c) => `<a class="pl-chip pl-chip--${c.tone}" href="#/catalogo?cat=${c.slug}">${c.name}</a>`).join('')}</div>`;
  }
  const list = searchProducts(q);
  if (!list.length) {
    return `<div class="pl-search__none"><strong>Sin resultados para “${q.replace(/[<>&"]/g, '')}”.</strong><span>Probá con otra palabra o explorá las categorías.</span></div>`;
  }
  const logged = isLogged();
  return `
    <p class="pl-search__hint">${list.length} ${list.length === 1 ? 'resultado' : 'resultados'}</p>
    <ul class="pl-results" role="listbox" aria-label="Resultados">
      ${list.slice(0, 8).map((p) => `
        <li><a class="pl-result" href="#/producto/${p.slug}" role="option">
          <img src="${productImage(p).src}" alt="" width="56" height="70">
          <span class="pl-result__text"><strong>${p.name}</strong><small>${categoryBySlug(p.category).name} · ${p.sku}</small></span>
          <span class="pl-result__price">${logged ? money(p.price) : `${icon('lock')} Precio para comercios`}</span>
        </a></li>`).join('')}
    </ul>
    <a class="pl-btn pl-btn--ghost pl-btn--block" href="#/catalogo?q=${encodeURIComponent(q)}">Ver todos en el catálogo <span class="pl-btn__arrow">${icon('arrow')}</span></a>`;
};

export const openSearch = (from) => layer.open(from);

export const initSearch = () => {
  const el = document.createElement('div');
  el.className = 'pl-modal pl-modal--search';
  el.id = 'pl-search';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Buscar productos');
  el.innerHTML = `
    <div class="pl-modal__card">
      <form class="pl-search__form" role="search">
        ${icon('search')}
        <label class="sr-only" for="pl-search-input">¿Qué estás buscando?</label>
        <input id="pl-search-input" type="search" placeholder="¿Qué estás buscando?" autocomplete="off" spellcheck="false">
        <kbd>Esc</kbd>
      </form>
      <div class="pl-search__results" aria-live="polite"></div>
    </div>`;
  document.body.append(el);

  const input = $('input', el);
  const out = $('.pl-search__results', el);
  const update = () => (out.innerHTML = results(input.value));

  layer = createLayer(el, { focus: 'input', onOpen: update });
  el.addEventListener('click', (e) => {
    if (e.target === el) layer.close();
    const s = e.target.closest('[data-suggest]');
    if (s) {
      input.value = s.dataset.suggest;
      update();
      input.focus();
    }
    if (e.target.closest('a')) layer.close({ silent: false });
  });
  input.addEventListener('input', update);
  $('form', el).addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    layer.close();
    location.hash = `#/catalogo?q=${encodeURIComponent(q)}`;
  });

  document.addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName ?? '');
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      layer.open();
    }
  });
};
