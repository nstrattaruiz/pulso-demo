/**
 * PULSO · demo B2B. Punto de entrada: arma header, footer, capas y rutas,
 * y resuelve las acciones comunes (agregar, cantidades, favoritos) por delegación.
 */
import { startRouter, render } from './router.js';
import { on, addToCart, setCartQty, toggleFav, isLogged, resetDemo } from './store.js';
import { byId } from './data/products.js';
import { initHeader, setActiveNav } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initCart, openCart } from './components/cart.js';
import { initSearch, openSearch } from './components/search.js';
import { initModal } from './components/modal.js';
import { initDemo } from './components/demo.js';
import { toast } from './ui/toast.js';
import { $$ } from './ui/format.js';

import * as home from './pages/home.js';
import * as catalog from './pages/catalog.js';
import * as categories from './pages/categories.js';
import * as news from './pages/news.js';
import * as product from './pages/product.js';
import * as howto from './pages/howto.js';
import * as about from './pages/about.js';
import * as login from './pages/login.js';
import * as register from './pages/register.js';
import * as account from './pages/account.js';
import * as confirm from './pages/confirm.js';
import * as notFound from './pages/notFound.js';

/* ---------- Estructura común ---------- */
initModal();
initHeader();
renderFooter();
initCart();
initSearch();
initDemo();

/* ---------- Acciones comunes (delegadas) ---------- */
const clampInput = (input) => {
  const wrap = input.closest('.pl-qty');
  const min = Number(wrap.dataset.min);
  const max = Number(wrap.dataset.max);
  const v = Math.max(min, Math.min(max, Math.round(Number(input.value) || min)));
  input.value = v;
  return v;
};

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-action]');
  if (!t) return;
  const { action } = t.dataset;

  if (action === 'qty-inc' || action === 'qty-dec') {
    const wrap = t.closest('.pl-qty');
    const input = wrap.querySelector('input');
    input.value = Number(input.value) + (action === 'qty-inc' ? 1 : -1);
    const v = clampInput(input);
    if (wrap.dataset.cartId) setCartQty(wrap.dataset.cartId, v);
    return;
  }

  if (action === 'add') {
    const scope = t.closest('[data-product]');
    const input = scope?.querySelector('.pl-qty__input');
    const p = byId(t.dataset.id);
    const qty = input ? clampInput(input) : p.min;
    if (!addToCart(p.id, qty)) return;
    t.classList.add('is-done');
    t.disabled = true;
    setTimeout(() => {
      t.classList.remove('is-done');
      t.disabled = false;
    }, 1600);
    toast(`${p.name} agregada a tu pedido`, { icon: 'check' });
    return;
  }

  if (action === 'fav') {
    if (!isLogged()) {
      toast('Creá una cuenta para guardar tus productos.', { icon: 'heart', action: { label: 'Solicitar cuenta', href: '#/registro' } });
      return;
    }
    const added = toggleFav(t.dataset.id);
    toast(added ? '♡ Guardado en favoritos' : 'Quitado de favoritos', { icon: 'heart', tone: added ? 'coral' : 'dark' });
    return;
  }

  if (action === 'notify') {
    const p = byId(t.dataset.id);
    toast(`Te avisamos cuando ingrese ${p.name}`, { icon: 'refresh' });
    return;
  }
  if (action === 'open-cart') return openCart(t);
  if (action === 'open-search') return openSearch(t);
  if (action === 'social') {
    e.preventDefault();
    toast('PULSO es una marca demo: sus redes no existen (todavía).', { icon: 'spark' });
    return;
  }
  if (action === 'reset-demo') resetDemo();
});

document.addEventListener('change', (e) => {
  const input = e.target.closest('.pl-qty__input');
  if (!input) return;
  const v = clampInput(input);
  const cartId = input.closest('.pl-qty').dataset.cartId;
  if (cartId) setCartQty(cartId, v);
});

/* Favoritos: actualizar todos los corazones sin re-renderizar */
on('favs', ({ id, added }) => {
  $$(`.pl-fav[data-id="${id}"]`).forEach((b) => {
    b.classList.toggle('is-on', added);
    b.setAttribute('aria-pressed', String(added));
    b.classList.remove('is-pop');
    void b.offsetWidth;
    b.classList.add('is-pop');
  });
});

/* Login / logout: el sitio cambia de estado (precios, header, cards) */
on('auth', () => {
  document.documentElement.classList.add('is-switching');
  render({ keepScroll: true });
  setTimeout(() => document.documentElement.classList.remove('is-switching'), 600);
});

/* ---------- Rutas ---------- */
startRouter(
  [
    { path: '/', name: 'home', page: home },
    { path: '/catalogo', name: 'catalog', page: catalog },
    { path: '/categorias', name: 'categories', page: categories },
    { path: '/novedades', name: 'news', page: news },
    { path: '/producto/:slug', name: 'product', page: product },
    { path: '/como-comprar', name: 'howto', page: howto },
    { path: '/nosotros', name: 'about', page: about },
    { path: '/login', name: 'login', page: login },
    { path: '/registro', name: 'register', page: register },
    { path: '/cuenta', name: 'account', page: account },
    { path: '/cuenta/:tab', name: 'account', page: account },
    { path: '/pedido-enviado/:id', name: 'confirm', page: confirm },
    { path: '/404', name: 'notfound', page: notFound },
  ],
  { afterRender: ({ path }) => setActiveNav(path) },
);
