/**
 * Parte dinámica del header (el marcado base de la firma NS está en index.html):
 * acciones de la derecha según el estado, menú del avatar, contador del pedido,
 * enlace activo y desplazamiento de la barra de anuncios.
 */
import { user, cartCount, on, logout } from '../store.js';
import { icon } from '../ui/icons.js';
import { toast } from '../ui/toast.js';
import { $, $$ } from '../ui/format.js';

const slot = () => $('#pl-actions');

const visitor = () => `
  <button type="button" class="pl-iconbtn" data-action="open-search" aria-label="Buscar productos">${icon('search')}</button>
  <a class="pl-login" href="#/login">${icon('user')}<span>Iniciar sesión</span></a>
  <a class="ns-cta pl-cta" href="#/registro"><span>Solicitar cuenta</span></a>`;

const member = (u) => `
  <button type="button" class="pl-iconbtn" data-action="open-search" aria-label="Buscar productos">${icon('search')}</button>
  <span class="pl-tag-wholesale">Cuenta mayorista</span>
  <div class="pl-user">
    <button type="button" class="pl-user__btn" aria-expanded="false" aria-controls="pl-user-menu" aria-label="Menú de ${u.firstName}">
      <span class="pl-avatar" aria-hidden="true">${u.initials}</span>
      <span class="pl-user__name">${u.firstName}</span>
      ${icon('chevron', 'pl-user__chev')}
    </button>
    <div class="pl-user__menu" id="pl-user-menu" hidden>
      <p class="pl-user__head"><strong>${u.firstName} ${u.lastName}</strong><span>${u.store.name} · ${u.level}</span></p>
      <a href="#/cuenta">${icon('grid')} Mi cuenta</a>
      <a href="#/cuenta/pedidos">${icon('receipt')} Mis pedidos</a>
      <a href="#/cuenta/favoritos">${icon('heart')} Favoritos</a>
      <button type="button" data-action="logout">${icon('logout')} Cerrar sesión</button>
    </div>
  </div>
  <button type="button" class="pl-cartbtn" data-action="open-cart" aria-label="Mi pedido">
    ${icon('bag')}<span class="pl-cartbtn__label">Pedido</span>
    <span class="pl-count" data-cart-count>${cartCount()}</span>
  </button>`;

export const renderHeader = () => {
  const u = user();
  slot().innerHTML = u ? member(u) : visitor();
  document.documentElement.classList.toggle('is-member', Boolean(u));
  bindUserMenu();
  updateCount(false);
};

const updateCount = (bump = true) => {
  $$('[data-cart-count]').forEach((el) => {
    const n = cartCount();
    el.textContent = n > 999 ? '999+' : n;
    el.hidden = n === 0;
    if (bump) {
      el.classList.remove('is-bump');
      void el.offsetWidth;
      el.classList.add('is-bump');
    }
  });
};

let closeUserMenu = () => {};
document.addEventListener('click', (e) => !e.target.closest('.pl-user') && closeUserMenu());

const bindUserMenu = () => {
  const btn = $('.pl-user__btn');
  const menu = $('#pl-user-menu');
  if (!btn || !menu) return;
  const set = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (open) menu.querySelector('a')?.focus();
  };
  btn.addEventListener('click', () => set(menu.hidden));
  menu.addEventListener('click', (e) => e.target.closest('a,button') && set(false));
  closeUserMenu = () => !menu.hidden && set(false);
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      set(false);
      btn.focus();
    }
  });
};

/** Marca el enlace de la sección actual en el menú en línea y en el menú grande. */
export const setActiveNav = (path) => {
  const base = path.split('/')[1] ?? '';
  $$('.ns-nav a, .ns-panel__nav a').forEach((a) => {
    const target = a.getAttribute('href').replace('#/', '').split(/[/?]/)[0];
    const active = target && target === base;
    a.classList.toggle('is-active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
};

export const initHeader = () => {
  renderHeader();
  on('auth', renderHeader);
  on('cart', () => updateCount());

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-action="logout"]')) return;
    logout();
    toast('Cerraste sesión. ¡Hasta la próxima!', { icon: 'logout' });
    location.hash = '#/';
  });

  // La barra de anuncios se va con el scroll y el header sube a ocupar su lugar
  const bar = $('.pl-topbar');
  const root = document.documentElement;
  let raf = 0;
  const sync = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const h = bar?.offsetHeight ?? 0;
      root.style.setProperty('--pl-top', `${Math.max(0, h - window.scrollY)}px`);
    });
  };
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();
};
