/** Página de producto: galería, compra (o bloqueo para visitantes), descripción, especificaciones e info para la tienda. */
import { bySlug, categoryBySlug, PRODUCTS, availability, margin } from '../data/products.js';
import { isLogged, qtyInCart } from '../store.js';
import { productImages } from '../ui/art.js';
import { icon } from '../ui/icons.js';
import { money, $, $$ } from '../ui/format.js';
import { badges, favButton, productCard } from '../components/productCard.js';
import { qtyStepper, loginHref } from '../components/price.js';
import * as notFound from './notFound.js';

export const title = ({ params }) => bySlug(params.slug)?.name ?? 'Producto no encontrado';

const buyBox = (p) => {
  if (!isLogged()) {
    return `
      <div class="pl-unlock">
        <div class="pl-unlock__price" aria-hidden="true">
          <span>Precio mayorista</span><strong>USD ••,••</strong><span>PVP sugerido: USD ••</span>
        </div>
        <div class="pl-unlock__body">
          <span class="pl-unlock__icon">${icon('lock')}</span>
          <h2>¿Querés ver precios mayoristas?</h2>
          <p>Registrate como comercio y accedé al catálogo completo de precios.</p>
          <div class="pl-unlock__ctas">
            <a class="pl-btn pl-btn--lime" href="${loginHref()}">Iniciar sesión <span class="pl-btn__arrow">${icon('arrow')}</span></a>
            <a class="pl-btn pl-btn--outline-light" href="#/registro">Solicitar cuenta</a>
          </div>
          <button type="button" class="pl-linkbtn pl-linkbtn--light" data-action="open-demo">¿Estás viendo la demo? Probá el acceso mayorista</button>
        </div>
      </div>
      <p class="pl-pdp__min">${icon('box')} Venta mínima: <strong>${p.min} unidades</strong></p>`;
  }
  const a = availability(p);
  const inCart = qtyInCart(p.id);
  return `
    <div class="pl-pdp__price">
      <div>
        <span class="pl-price__label">Precio mayorista</span>
        <strong class="pl-pdp__value">${money(p.price)}</strong>
        <span class="pl-price__rrp">PVP sugerido: <strong>${money(p.retail)}</strong></span>
      </div>
      <div class="pl-pdp__margin"><span>Margen estimado</span><strong>+${margin(p)}%</strong><small>Ganás ${money(p.retail - p.price)} por unidad</small></div>
    </div>
    <dl class="pl-pdp__facts">
      <div><dt>Venta mínima</dt><dd>${p.min} unidades</dd></div>
      <div><dt>Stock</dt><dd><span class="pl-stock pl-stock--${a.key}"><i></i>${a.label}</span></dd></div>
    </dl>
    ${p.stock > 0
      ? `<div class="pl-pdp__buy">
          ${qtyStepper(p, { size: 'pl-qty--lg' })}
          <button type="button" class="pl-btn pl-btn--primary pl-btn--lg pl-add" data-action="add" data-id="${p.id}">
            <span class="pl-add__label">Agregar al pedido</span><span class="pl-add__done" aria-hidden="true">${icon('check')} Agregado</span>
          </button>
        </div>
        <p class="pl-pdp__subtotal" data-subtotal></p>
        ${inCart ? `<p class="pl-pdp__incart">${icon('bag')} Ya tenés <strong>${inCart} unidades</strong> en tu pedido. <button type="button" class="pl-linkbtn" data-action="open-cart">Ver pedido</button></p>` : ''}`
      : `<button type="button" class="pl-btn pl-btn--ghost pl-btn--lg pl-btn--block" data-action="notify" data-id="${p.id}">${icon('refresh')} Avisarme cuando llegue</button>`}`;
};

export const render = ({ params }) => {
  const p = bySlug(params.slug);
  if (!p) return notFound.render();
  const cat = categoryBySlug(p.category);
  const imgs = productImages(p);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  return `
  <div class="pl-container pl-pdp" data-product="${p.id}">
    <nav class="pl-crumbs" aria-label="Ruta">
      <a href="#/catalogo">Catálogo</a><span>/</span><a href="#/catalogo?cat=${cat.slug}">${cat.name}</a><span>/</span><span aria-current="page">${p.name}</span>
    </nav>

    <div class="pl-pdp__grid">
      <div class="pl-gallery">
        <div class="pl-gallery__main pl-tone--${p.tone}">
          <img src="${imgs[0].src}" alt="${imgs[0].alt}" width="400" height="500" data-main>
          <div class="pl-card__badges">${badges(p)}</div>
          ${favButton(p, 'pl-fav--lg')}
        </div>
        <div class="pl-gallery__thumbs" role="group" aria-label="Imágenes de ${p.name}">
          ${imgs.map((im, i) => `
            <button type="button" class="pl-gallery__thumb ${i === 0 ? 'is-on' : ''}" data-img="${i}" aria-label="Ver ${im.alt}" aria-pressed="${i === 0}">
              <img src="${im.src}" alt="" width="100" height="125" loading="lazy">
            </button>`).join('')}
        </div>
      </div>

      <div class="pl-pdp__info">
        <p class="pl-pdp__cat"><a href="#/catalogo?cat=${cat.slug}" class="pl-badge pl-badge--${cat.tone}">${cat.name}</a> ${p.isNew ? '<span class="pl-badge pl-badge--lime">NUEVO</span>' : ''}</p>
        <h1 class="pl-pdp__title">${p.name}</h1>
        <p class="pl-pdp__sku">SKU <code>${p.sku}</code> · ${p.sub}</p>
        <p class="pl-pdp__short">${p.desc}</p>
        ${buyBox(p)}
        <ul class="pl-pdp__perks">
          <li>${icon('check')} Venta mayorista</li>
          <li>${icon('check')} ${p.stock > 0 ? 'Stock disponible' : `Reingreso ${p.restock}`}</li>
          <li>${icon('truck')} Envíos a todo el país</li>
          <li>${icon('chat')} Atención comercial</li>
        </ul>
      </div>
    </div>

    <div class="pl-pdp__details">
      <section class="pl-pdp__block" data-reveal>
        <h2>Descripción</h2>
        <p>${p.desc}</p>
      </section>
      <section class="pl-pdp__block" data-reveal style="--d:1">
        <h2>Especificaciones</h2>
        <dl class="pl-specs">
          <div><dt>SKU</dt><dd>${p.sku}</dd></div>
          ${Object.entries(p.specs).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
          <div><dt>Venta mínima</dt><dd>${p.min} unidades</dd></div>
        </dl>
      </section>
      <section class="pl-pdp__block pl-pdp__block--store" data-reveal style="--d:2">
        <h2>Información para tu tienda</h2>
        <p class="pl-pdp__where-title">Dónde funciona mejor</p>
        <div class="pl-chips">${p.store.where.map((w) => `<span class="pl-chip is-static">${icon('store')} ${w}</span>`).join('')}</div>
        <p class="pl-pdp__tip"><strong>Tip de exhibición.</strong> ${p.store.tip}</p>
        ${isLogged() ? `<p class="pl-pdp__tip pl-pdp__tip--money"><strong>Números.</strong> Comprando ${p.min} unidades invertís ${money(p.min * p.price)} y, a PVP sugerido, facturás ${money(p.min * p.retail)}.</p>` : ''}
      </section>
    </div>

    ${related.length ? `
      <section class="pl-section pl-related">
        <header class="pl-head pl-head--split"><h2 class="pl-h2">También de ${cat.name}</h2><a class="pl-link" href="#/catalogo?cat=${cat.slug}">Ver todo ${icon('arrow')}</a></header>
        <div class="pl-grid">${related.map((r, i) => productCard(r, i)).join('')}</div>
      </section>` : ''}
  </div>`;
};

export const mount = (root, { params }) => {
  const p = bySlug(params.slug);
  if (!p) return null;
  const imgs = productImages(p);
  const main = $('[data-main]', root);

  $$('[data-img]', root).forEach((b) =>
    b.addEventListener('click', () => {
      const im = imgs[Number(b.dataset.img)];
      main.classList.remove('is-swap');
      void main.offsetWidth;
      main.src = im.src;
      main.alt = im.alt;
      main.classList.add('is-swap');
      $$('[data-img]', root).forEach((x) => {
        x.classList.toggle('is-on', x === b);
        x.setAttribute('aria-pressed', String(x === b));
      });
    }),
  );

  // Subtotal en vivo según la cantidad elegida
  const input = $('.pl-pdp__buy .pl-qty__input', root);
  const out = $('[data-subtotal]', root);
  if (input && out) {
    const sync = () => (out.innerHTML = `Subtotal: <strong>${Number(input.value)} × ${money(p.price)} = ${money(Number(input.value) * p.price)}</strong>`);
    input.addEventListener('input', sync);
    input.addEventListener('change', sync);
    $$('.pl-pdp__buy .pl-qty__btn', root).forEach((b) => b.addEventListener('click', () => setTimeout(sync)));
    sync();
  }
  return null;
};
