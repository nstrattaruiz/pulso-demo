/** Nosotros: página editorial con imágenes y estadísticas. */
import { sceneImage } from '../ui/art.js';
import { sellersBand } from './home.js';

export const title = 'Nosotros';

export const render = () => `
  <section class="pl-about-hero">
    <div class="pl-container">
      <p class="pl-eyebrow">Nosotros</p>
      <h1 class="pl-h1 pl-about-hero__title">Hacemos que las tiendas tengan algo que contar.</h1>
      <div class="pl-about-hero__cols">
        <p class="pl-lead">PULSO nació de una idea simple: un buen producto puede cambiar la forma en que una persona entra, mira y compra en una tienda.</p>
        <p>Buscamos, diseñamos y seleccionamos objetos con una sola pregunta en mente: ¿esto hace que alguien se frene frente a una vidriera? Si la respuesta es sí, entra al catálogo. Después nos ocupamos de lo que no se ve: stock, packaging, despacho y un equipo comercial que conoce a cada cliente por su nombre.</p>
      </div>
    </div>
  </section>

  <section class="pl-container pl-mosaic">
    ${[
      ['productos', 'Productos', 'Más de 120 productos pensados para vender.'],
      ['packaging', 'Packaging', 'Cada caja llega lista para exhibir o regalar.'],
      ['deposito', 'Depósito', 'Stock propio y ordenado en Montevideo.'],
      ['preparacion', 'Preparación de pedidos', 'Cada pedido se controla dos veces.'],
    ].map(([k, t, d], i) => `
      <figure class="pl-mosaic__item pl-mosaic__item--${i}" data-reveal style="--d:${i}">
        <img src="${sceneImage(k)}" alt="${t}: ilustración de PULSO" loading="lazy" width="400" height="500">
        <figcaption><strong>${t}</strong>${d}</figcaption>
      </figure>`).join('')}
  </section>

  <section class="pl-stats">
    <div class="pl-container pl-stats__grid">
      ${[
        [120, '+', 'productos'],
        [350, '+', 'comercios'],
        [6, '', 'países'],
        [48, 'h', 'promedio de despacho'],
      ].map(([n, suf, l], i) => `
        <div class="pl-stat" data-reveal style="--d:${i}">
          <strong><span data-count="${n}" data-suffix="${suf}">${n}${suf}</span></strong>
          <span>${l}</span>
        </div>`).join('')}
    </div>
  </section>

  <section class="pl-container pl-section pl-values">
    ${[
      ['Producto primero', 'Si no lo pondríamos en nuestra propia tienda, no entra al catálogo.'],
      ['Margen real', 'Precios mayoristas que dejan lugar para que tu negocio crezca.'],
      ['Cerca de verdad', 'Una persona del equipo sigue cada cuenta, de principio a fin.'],
    ].map(([t, d], i) => `
      <article class="pl-value" data-reveal style="--d:${i}"><span>0${i + 1}</span><h2>${t}</h2><p>${d}</p></article>`).join('')}
  </section>

  ${sellersBand()}`;
