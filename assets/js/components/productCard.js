/** Product card reutilizable (catálogo, búsqueda, favoritos, home). */
import { categoryBySlug } from '../data/products.js';
import { isFav, isLogged } from '../store.js';
import { productImage } from '../ui/art.js';
import { icon } from '../ui/icons.js';
import { cardPrice, cardFoot } from './price.js';

export const badges = (p, extra = []) => {
  const list = [...extra];
  if (p.isNew) list.push(['NUEVO', 'lime']);
  if (p.best) list.push(['MÁS VENDIDO', 'yellow']);
  if (p.stock <= 0) list.push(['SIN STOCK', 'light']);
  return list.map(([t, tone]) => `<span class="pl-badge pl-badge--${tone}">${t}</span>`).join('');
};

export const favButton = (p, cls = '') => {
  const on = isLogged() && isFav(p.id);
  return `
    <button type="button" class="pl-fav ${cls} ${on ? 'is-on' : ''}" data-action="fav" data-id="${p.id}"
      aria-pressed="${on}" aria-label="${on ? 'Quitar de favoritos' : 'Guardar en favoritos'}: ${p.name}">
      ${icon('heart')}
    </button>`;
};

export const productCard = (p, i = 0, { extraBadges = [] } = {}) => {
  const img = productImage(p, 0);
  const alt = productImage(p, 2);
  const cat = categoryBySlug(p.category);
  return `
    <article class="pl-card" data-reveal style="--d:${Math.min(i, 8)}" data-product="${p.id}">
      <a class="pl-card__media" href="#/producto/${p.slug}" tabindex="-1" aria-hidden="true">
        <img src="${img.src}" alt="" loading="lazy" decoding="async" width="400" height="500">
        <img class="pl-card__alt" src="${alt.src}" alt="" loading="lazy" decoding="async" width="400" height="500">
      </a>
      <div class="pl-card__badges">${badges(p, extraBadges)}</div>
      ${favButton(p)}
      <div class="pl-card__body">
        <p class="pl-card__cat">${cat.name} · ${p.sub}</p>
        <h3 class="pl-card__title"><a href="#/producto/${p.slug}">${p.name}</a></h3>
        ${cardPrice(p)}
        ${cardFoot(p)}
      </div>
    </article>`;
};

export const productGrid = (list, cls = '') =>
  `<div class="pl-grid ${cls}">${list.map((p, i) => productCard(p, i)).join('')}</div>`;
