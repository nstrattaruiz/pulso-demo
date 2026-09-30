/**
 * Router por hash (#/catalogo, #/producto/lampara-mini-orb, #/cuenta…).
 * Funciona en GitHub Pages sin configurar nada. Cada página exporta:
 *   { title, auth?, render(ctx) → html, mount?(root, ctx) → cleanup? }
 */
import { isLogged } from './store.js';
import { reveal, countUp } from './ui/reveal.js';
import { closeLayers } from './ui/layer.js';

let routes = [];
let cleanup = null;
let lastPath = null;
let hooks = {};

export const parseHash = (hash = location.hash) => {
  const raw = hash.replace(/^#\/?/, '');
  const [pathPart, queryPart = ''] = raw.split('?');
  const path = `/${pathPart.replace(/\/$/, '')}`;
  return { path, query: Object.fromEntries(new URLSearchParams(queryPart)) };
};

const match = (path) => {
  for (const r of routes) {
    const keys = [];
    const re = new RegExp(`^${r.path.replace(/:([a-z]+)/g, (_, k) => (keys.push(k), '([^/]+)'))}$`);
    const m = path.match(re);
    if (m) return { route: r, params: Object.fromEntries(keys.map((k, i) => [k, decodeURIComponent(m[i + 1])])) };
  }
  return null;
};

/** Cambia la query del hash sin volver a renderizar (filtros del catálogo). */
export const setQuery = (query) => {
  const { path } = parseHash();
  const qs = new URLSearchParams(Object.entries(query).filter(([, v]) => v !== '' && v != null && v !== false)).toString();
  history.replaceState(null, '', `#${path}${qs ? `?${qs}` : ''}`);
};

export const render = ({ keepScroll = false } = {}) => {
  const app = document.getElementById('app');
  const { path, query } = parseHash();
  const found = match(path) ?? match('/404');
  const { route, params } = found;
  const page = route.page;

  if (page.auth && !isLogged()) {
    location.replace(`#/login?next=${encodeURIComponent(path)}`);
    return;
  }
  if (page.guestOnly && isLogged()) {
    location.replace(`#${query.next || '/catalogo'}`);
    return;
  }

  cleanup?.();
  cleanup = null;
  closeLayers();

  const ctx = { path, params, query };
  const samePage = lastPath === path;
  app.innerHTML = page.render(ctx);
  app.dataset.page = route.name;
  document.title = `${typeof page.title === 'function' ? page.title(ctx) : page.title} · PULSO`;
  cleanup = page.mount?.(app, ctx) ?? null;

  app.classList.remove('is-entering');
  void app.offsetWidth;
  app.classList.add('is-entering');

  if (!samePage && !keepScroll) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (lastPath !== null) app.focus({ preventScroll: true });
  }
  lastPath = path;
  reveal(app);
  countUp(app);
  hooks.afterRender?.(ctx);
};

export const startRouter = (list, options = {}) => {
  routes = list;
  hooks = options;
  window.addEventListener('hashchange', () => render());
  render();
};
