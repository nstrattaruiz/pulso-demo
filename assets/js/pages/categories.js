/** Categorías: grilla de colores + una muestra de cada una. */
import { CATEGORIES, productsIn } from '../data/products.js';
import { icon } from '../ui/icons.js';
import { productCard } from '../components/productCard.js';
import { categoryCards } from './home.js';

export const title = 'Categorías';

export const render = () => `
  <section class="pl-page-head">
    <div class="pl-container">
      <p class="pl-eyebrow">Categorías</p>
      <h1 class="pl-h1">Encontrá lo que tu tienda necesita.</h1>
      <p class="pl-lead">Seis mundos de producto, pensados para rotar en mostrador y en vidriera.</p>
    </div>
  </section>
  <section class="pl-container pl-section pl-section--tight">${categoryCards()}</section>
  ${CATEGORIES.filter((c) => !c.virtual).map((c) => `
    <section class="pl-container pl-section pl-section--tight pl-catrow">
      <header class="pl-head pl-head--split" data-reveal>
        <div><p class="pl-eyebrow"><i class="pl-dot pl-dot--${c.tone}"></i> ${productsIn(c.slug).length} productos</p><h2 class="pl-h2">${c.name}</h2></div>
        <a class="pl-link" href="#/catalogo?cat=${c.slug}">Ver ${c.name.toLowerCase()} ${icon('arrow')}</a>
      </header>
      <div class="pl-grid">${productsIn(c.slug).slice(0, 4).map((p, i) => productCard(p, i)).join('')}</div>
    </section>`).join('')}`;
