/** Novedades: diseño editorial distinto al catálogo, con cards grandes. */
import { PRODUCTS, categoryBySlug } from '../data/products.js';
import { productImages } from '../ui/art.js';
import { icon } from '../ui/icons.js';
import { cardPrice, cardFoot } from '../components/price.js';
import { favButton } from '../components/productCard.js';

export const title = 'Novedades';

export const render = () => {
  const list = PRODUCTS.filter((p) => p.isNew);
  return `
  <section class="pl-news-hero">
    <div class="pl-container">
      <p class="pl-eyebrow pl-eyebrow--light">Colección primavera · 2026</p>
      <h1 class="pl-news-hero__title">Llegó<br>lo nuevo.</h1>
      <p class="pl-news-hero__lead">${list.length} productos recién incorporados. Llegaron para la temporada fuerte: asegurá tu stock antes que el resto.</p>
      <span class="pl-news-hero__stamp" aria-hidden="true">NEW<br>DROP</span>
    </div>
  </section>
  <section class="pl-container pl-news">
    ${list.map((p, i) => {
      const imgs = productImages(p);
      return `
      <article class="pl-news__card ${i % 2 ? 'is-flip' : ''}" data-reveal data-product="${p.id}">
        <div class="pl-news__media">
          <a href="#/producto/${p.slug}" tabindex="-1" aria-hidden="true" class="pl-news__img"><img src="${imgs[0].src}" alt="" loading="lazy" width="400" height="500"></a>
          <a href="#/producto/${p.slug}" tabindex="-1" aria-hidden="true" class="pl-news__img pl-news__img--sm"><img src="${imgs[1].src}" alt="" loading="lazy" width="400" height="500"></a>
          ${favButton(p)}
        </div>
        <div class="pl-news__body">
          <div class="pl-news__tags"><span class="pl-badge pl-badge--lime">RECIÉN LLEGADO</span><span class="pl-news__since">Disponible desde septiembre 2026</span></div>
          <p class="pl-card__cat">${categoryBySlug(p.category).name} · ${p.sub}</p>
          <h2 class="pl-news__name"><a href="#/producto/${p.slug}">${p.name}</a></h2>
          <p class="pl-news__desc">${p.desc}</p>
          <div class="pl-news__buy">${cardPrice(p)}</div>
          ${cardFoot(p)}
          <a class="pl-link" href="#/producto/${p.slug}">Ver ficha completa ${icon('arrow')}</a>
        </div>
      </article>`;
    }).join('')}
  </section>`;
};
