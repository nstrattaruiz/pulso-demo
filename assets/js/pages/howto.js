/** Comprar para tu tienda: condiciones comerciales + FAQ. */
import { icon } from '../ui/icons.js';
import { howItWorks } from './home.js';

export const title = 'Cómo comprar';

const INFO = [
  ['bag', 'Pedido mínimo', 'USD 150', 'Por pedido, combinando los productos que quieras. Cada producto tiene su venta mínima por unidades.', 'purple'],
  ['card', 'Formas de pago', 'A tu medida', 'Consultá condiciones según comercio: transferencia, depósito y cuenta corriente para clientes frecuentes.', 'blue'],
  ['truck', 'Envíos', 'Todo el país', 'Envíos nacionales por agencia o transporte propio. Despacho promedio en 48 horas hábiles.', 'coral'],
  ['refresh', 'Reposición', 'Cuando quieras', 'Podés volver a pedir tus productos cuando quieras, incluso repitiendo un pedido anterior en un clic.', 'yellow'],
  ['chat', 'Atención comercial', 'Personas reales', 'Un equipo disponible para ayudarte a elegir, armar tu pedido y resolver cualquier consulta.', 'lime'],
];

const FAQ = [
  ['¿Cómo creo una cuenta?', 'Completá el formulario de solicitud mayorista con los datos de tu comercio. Nuestro equipo lo revisa y te activa la cuenta en 24 a 48 horas hábiles.'],
  ['¿Cuánto es el pedido mínimo?', 'El pedido mínimo es de USD 150 por compra. Además, cada producto tiene una venta mínima por unidades que ves en su ficha.'],
  ['¿Los precios incluyen impuestos?', 'Los precios mayoristas se muestran sin impuestos. En la confirmación del pedido te detallamos el total final según tu régimen.'],
  ['¿Puedo pedir muestras?', 'Sí. Para comercios nuevos armamos un kit de muestras con los productos que te interesen. Pedilo a tu ejecutiva comercial.'],
  ['¿Cómo funcionan los envíos?', 'Despachamos en 48 horas hábiles promedio a todo el país. El costo depende del destino y del volumen, y lo confirmamos antes de facturar.'],
  ['¿Puedo modificar un pedido?', 'Mientras el pedido esté en estado Recibido o Confirmado podés modificarlo escribiéndonos. Cuando pasa a Preparando ya entra en el depósito.'],
];

export const render = () => `
  <section class="pl-page-head">
    <div class="pl-container">
      <p class="pl-eyebrow">Condiciones comerciales</p>
      <h1 class="pl-h1">Comprar para tu tienda</h1>
      <p class="pl-lead">Reglas claras, pedidos simples y un equipo que responde. Así trabajamos con los comercios.</p>
    </div>
  </section>
  <section class="pl-container pl-section pl-section--tight">
    <div class="pl-info">
      ${INFO.map(([ic, t, big, d, tone], i) => `
        <article class="pl-info__card pl-info__card--${tone}" data-reveal style="--d:${i}">
          <span class="pl-info__icon">${icon(ic)}</span>
          <h2>${t}</h2>
          <p class="pl-info__big">${big}</p>
          <p>${d}</p>
        </article>`).join('')}
      <article class="pl-info__card pl-info__card--cta" data-reveal style="--d:5">
        <h2>¿Listo para empezar?</h2>
        <p>Tu próxima reposición empieza acá.</p>
        <a class="pl-btn pl-btn--lime" href="#/registro">Solicitar cuenta <span class="pl-btn__arrow">${icon('arrow')}</span></a>
      </article>
    </div>
  </section>
  ${howItWorks()}
  <section class="pl-container pl-section pl-faq-wrap">
    <header class="pl-head" data-reveal><p class="pl-eyebrow">Preguntas frecuentes</p><h2 class="pl-h2">Lo que más nos preguntan.</h2></header>
    <div class="pl-faq">
      ${FAQ.map(([q, a], i) => `
        <details class="pl-faq__item" data-reveal style="--d:${i}" ${i === 0 ? 'open' : ''}>
          <summary>${q}<span class="pl-faq__icon" aria-hidden="true">${icon('plus')}</span></summary>
          <p>${a}</p>
        </details>`).join('')}
    </div>
  </section>`;
