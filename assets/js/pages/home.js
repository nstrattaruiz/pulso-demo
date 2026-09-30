/** Inicio: hero, categorías, productos que hacen girar la tienda, novedades, cómo funciona y vendedores. */
import { PRODUCTS, CATEGORIES, productsIn, byId, margin } from '../data/products.js';
import { isLogged, user } from '../store.js';
import { productImage, shapeImage } from '../ui/art.js';
import { icon } from '../ui/icons.js';
import { money } from '../ui/format.js';
import { productCard } from '../components/productCard.js';
import { cardPrice } from '../components/price.js';

export const title = 'Lo que mueve tu tienda';

const pulseLine = `<svg class="pl-pulse-line" viewBox="0 0 220 40" aria-hidden="true"><path pathLength="1" d="M2 22h60l10-16 16 30 12-22 8 8h110" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const categoryCards = () => `
  <div class="pl-cats">
    ${CATEGORIES.map((c, i) => `
      <a class="pl-cat pl-cat--${c.tone}" href="${c.virtual ? '#/novedades' : `#/catalogo?cat=${c.slug}`}" data-reveal style="--d:${i}">
        <span class="pl-cat__img"><img src="${shapeImage(c.hero, c.tone, { plain: true })}" alt="" loading="lazy" width="400" height="500"></span>
        <span class="pl-cat__count">${productsIn(c.slug).length} productos</span>
        <span class="pl-cat__name">${c.name}</span>
        <span class="pl-cat__desc">${c.desc}</span>
        <span class="pl-cat__arrow">${icon('arrowUpRight')}</span>
      </a>`).join('')}
  </div>`;

export const howItWorks = () => `
  <section class="pl-section pl-steps-wrap">
    <div class="pl-container">
      <header class="pl-head" data-reveal>
        <p class="pl-eyebrow">¿Cómo funciona?</p>
        <h2 class="pl-h2">Elegí. Armá. Pedí.</h2>
      </header>
      <ol class="pl-steps">
        ${[
          ['01', 'Registrate', 'Contanos sobre tu comercio.', 'purple'],
          ['02', 'Explorá', 'Accedé al catálogo mayorista.', 'blue'],
          ['03', 'Armá tu pedido', 'Elegí productos y cantidades.', 'coral'],
          ['04', 'Nosotros hacemos el resto', 'Confirmamos disponibilidad y coordinamos el envío.', 'lime'],
        ].map(([n, t, d, tone], i) => `
          <li class="pl-step pl-step--${tone}" data-reveal style="--d:${i}">
            <span class="pl-step__n">${n}</span>
            <h3>${t}</h3>
            <p>${d}</p>
          </li>`).join('')}
      </ol>
    </div>
  </section>`;

export const sellersBand = () => `
  <section class="pl-sellers">
    <div class="pl-container pl-sellers__grid">
      <div class="pl-sellers__copy" data-reveal>
        <p class="pl-eyebrow pl-eyebrow--light">Para comercios</p>
        <h2 class="pl-h2">Tu tienda necesita productos que se muevan.</h2>
        <p>PULSO reúne productos pensados para vender. Alta rotación, diseño y una propuesta que tus clientes quieren llevarse.</p>
        <a class="pl-btn pl-btn--lime pl-btn--lg" href="${isLogged() ? '#/catalogo' : '#/registro'}">${isLogged() ? 'Ir al catálogo' : 'Quiero vender PULSO'} <span class="pl-btn__arrow">${icon('arrow')}</span></a>
      </div>
      <div class="pl-sellers__float" aria-hidden="true">
        ${[['bottleWave', 'yellow'], ['giftbox', 'coral'], ['candle', 'lime'], ['mug', 'blue']].map(([s, t], i) => `
          <img class="pl-float pl-float--${i}" src="${shapeImage(s, t)}" alt="" loading="lazy" width="400" height="500">`).join('')}
      </div>
    </div>
  </section>`;

export const render = () => {
  const u = user();
  const logged = Boolean(u);
  const featured = [
    [byId(6), 'ALTA ROTACIÓN', 'blue', 'Se repone cada 3 semanas en promedio.'],
    [byId(4), 'BUEN MARGEN', 'coral', 'El margen que tu caja agradece.'],
    [byId(1), 'NOVEDAD', 'lime', 'Llegó en septiembre y ya es de los más pedidos.'],
  ];
  const newest = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return `
  <section class="pl-hero">
    <div class="pl-container pl-hero__grid">
      <div class="pl-hero__copy">
        <p class="pl-eyebrow pl-hero__eyebrow"><span class="pl-live" aria-hidden="true"></span>
          ${logged ? `Hola, ${u.firstName}. Tu acceso mayorista está activo` : 'Plataforma mayorista · Solo para comercios'}</p>
        <h1 class="pl-hero__title">
          <span class="pl-hero__line"><span>LO QUE</span></span>
          <span class="pl-hero__line pl-hero__line--accent"><span>MUEVE ${pulseLine}</span></span>
          <span class="pl-hero__line"><span>TU TIENDA.</span></span>
        </h1>
        <p class="pl-hero__lead">Descubrí productos pensados para comercios que quieren vender algo diferente.</p>
        <div class="pl-hero__ctas">
          <a class="pl-btn pl-btn--primary pl-btn--lg" href="#/catalogo">Explorar catálogo <span class="pl-btn__arrow">${icon('arrow')}</span></a>
          ${logged
            ? `<a class="pl-btn pl-btn--ghost pl-btn--lg" href="#/cuenta">Ir a mi cuenta</a>`
            : `<a class="pl-btn pl-btn--ghost pl-btn--lg" href="#/registro">Quiero vender PULSO</a>`}
        </div>
        <ul class="pl-hero__proof">
          <li><strong>350+</strong> comercios</li>
          <li><strong>48h</strong> de despacho</li>
          <li><strong>6</strong> países</li>
        </ul>
      </div>

      <div class="pl-hero__art" aria-hidden="true">
        <div class="pl-tile pl-tile--a"><img src="${productImage(byId(1)).src}" alt="" width="400" height="500"></div>
        <div class="pl-tile pl-tile--b"><img src="${productImage(byId(2)).src}" alt="" width="400" height="500"></div>
        <div class="pl-tile pl-tile--c"><img src="${productImage(byId(15)).src}" alt="" width="400" height="500"></div>
        <div class="pl-tile pl-tile--d"><img src="${productImage(byId(9)).src}" alt="" width="400" height="500"></div>
        <span class="pl-chipf pl-chipf--1">+120 productos</span>
        <span class="pl-chipf pl-chipf--2">${icon('spark')} Nuevos cada mes</span>
        <span class="pl-chipf pl-chipf--3">${icon('lock')} Solo para comercios</span>
        <span class="pl-chipf pl-chipf--4">B2B</span>
        ${logged ? `<span class="pl-chipf pl-chipf--price">Lámpara Mini Orb <strong>${money(18.5)}</strong></span>` : ''}
      </div>
    </div>
  </section>

  <div class="pl-band-wrap" aria-hidden="true"><div class="pl-band">
    <div class="pl-band__track">
      ${Array.from({ length: 2 }, () => `<span>Elegí. Armá. Pedí.</span><i></i><span>Más productos. Menos vueltas.</span><i></i><span>Tu próxima reposición empieza acá.</span><i></i>`).join('')}
    </div>
  </div></div>

  <section class="pl-section">
    <div class="pl-container">
      <header class="pl-head pl-head--split" data-reveal>
        <div>
          <p class="pl-eyebrow">Categorías</p>
          <h2 class="pl-h2">Encontrá lo que tu tienda necesita.</h2>
        </div>
        <a class="pl-link" href="#/categorias">Ver todas las categorías ${icon('arrow')}</a>
      </header>
      ${categoryCards()}
    </div>
  </section>

  <section class="pl-section pl-spin">
    <div class="pl-container">
      <header class="pl-head" data-reveal>
        <p class="pl-eyebrow">Selección comercial</p>
        <h2 class="pl-h2 pl-h2--xl">Productos que hacen girar la tienda.</h2>
        <p class="pl-lead">Productos que se venden solos no existen. Productos que dan ganas de comprar, sí.</p>
      </header>
      <div class="pl-spin__grid">
        ${featured.map(([p, tag, tone, note], i) => `
          <article class="pl-spin__card pl-spin__card--${tone}" data-reveal style="--d:${i}" data-product="${p.id}">
            <span class="pl-spin__tag">${tag}</span>
            <a class="pl-spin__img" href="#/producto/${p.slug}" tabindex="-1" aria-hidden="true"><img src="${productImage(p).src}" alt="" loading="lazy" width="400" height="500"></a>
            <div class="pl-spin__body">
              <h3><a href="#/producto/${p.slug}">${p.name}</a></h3>
              <p class="pl-spin__note">${note}</p>
              ${logged ? `<p class="pl-spin__margin">Margen estimado <strong>+${margin(p)}%</strong></p>` : ''}
              ${cardPrice(p)}
            </div>
          </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="pl-section pl-replace">
    <div class="pl-container pl-replace__grid">
      <div data-reveal>
        <p class="pl-eyebrow">Una sola plataforma</p>
        <h2 class="pl-h2">Menos PDF. Menos WhatsApp. Menos planillas.</h2>
        <p class="pl-lead">Catálogo, precios, pedidos e historial en el mismo lugar. Tu cliente pide cuando quiere; vos recibís todo ordenado.</p>
      </div>
      <ul class="pl-replace__list">
        <li data-reveal style="--d:0"><span class="pl-replace__old">${icon('pdf')} Catálogo en PDF desactualizado</span><span class="pl-replace__new">${icon('check')} Catálogo vivo con stock real</span></li>
        <li data-reveal style="--d:1"><span class="pl-replace__old">${icon('wa')} Pedidos por WhatsApp</span><span class="pl-replace__new">${icon('check')} Pedidos con mínimos y cantidades</span></li>
        <li data-reveal style="--d:2"><span class="pl-replace__old">${icon('sheet')} Planillas para cada cliente</span><span class="pl-replace__new">${icon('check')} Historial y reposición en un clic</span></li>
      </ul>
    </div>
  </section>

  <section class="pl-section pl-news-home">
    <div class="pl-container">
      <header class="pl-head pl-head--split" data-reveal>
        <div>
          <p class="pl-eyebrow">Novedades · Septiembre 2026</p>
          <h2 class="pl-h2">Llegó lo nuevo.</h2>
        </div>
        <a class="pl-link" href="#/novedades">Ver novedades ${icon('arrow')}</a>
      </header>
      <div class="pl-grid">${newest.map((p, i) => productCard(p, i, { extraBadges: [] })).join('')}</div>
    </div>
  </section>

  ${howItWorks()}
  ${sellersBand()}`;
};
