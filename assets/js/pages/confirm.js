/** Confirmación de pedido con animación. */
import { orderById } from '../store.js';
import { byId } from '../data/products.js';
import { icon } from '../ui/icons.js';
import { money, date, plural } from '../ui/format.js';
import { productImage } from '../ui/art.js';
import { statusBadge } from './account.js';
import * as notFound from './notFound.js';

export const auth = true;
export const title = 'Pedido recibido';

export const render = ({ params }) => {
  const o = orderById(params.id);
  if (!o) return notFound.render();
  const units = o.items.reduce((s, i) => s + i.qty, 0);
  return `
  <section class="pl-confirm">
    <div class="pl-confirm__burst" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
    <div class="pl-container pl-confirm__grid">
      <div class="pl-confirm__copy">
        <svg class="pl-check-anim pl-check-anim--xl" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="36" pathLength="1"/><path d="m24 41 11 11 22-24" pathLength="1"/></svg>
        <p class="pl-eyebrow">Pedido #${o.id}</p>
        <h1 class="pl-h1">Pedido recibido.</h1>
        <p class="pl-lead">Tu pedido fue enviado correctamente. Nuestro equipo comercial se pondrá en contacto para confirmar disponibilidad y envío.</p>
        <div class="pl-confirm__ctas">
          <a class="pl-btn pl-btn--primary pl-btn--lg" href="#/cuenta/pedidos">Ver mis pedidos <span class="pl-btn__arrow">${icon('arrow')}</span></a>
          <a class="pl-btn pl-btn--ghost pl-btn--lg" href="#/catalogo">Seguir comprando</a>
        </div>
      </div>
      <aside class="pl-ticket" aria-label="Resumen del pedido">
        <header class="pl-ticket__head">
          <span class="pl-ticket__id">PEDIDO #${o.id}</span>
          ${statusBadge(o.status)}
        </header>
        <dl class="pl-ticket__meta">
          <div><dt>Fecha</dt><dd>${date(o.date)}</dd></div>
          <div><dt>Productos</dt><dd>${plural(o.items.length, 'producto', 'productos')} · ${units} u.</dd></div>
        </dl>
        <ul class="pl-mini-lines">
          ${o.items.map((it) => {
            const p = byId(it.id);
            return `<li><img src="${productImage(p).src}" alt="" width="48" height="60"><span>${p.name}<small>${it.qty} × ${money(it.price)}</small></span><strong>${money(it.qty * it.price)}</strong></li>`;
          }).join('')}
        </ul>
        <div class="pl-mini-total"><span>Total</span><strong>${money(o.total)}</strong></div>
        <p class="pl-ticket__foot">${icon('chat')} Te escribimos en menos de 24 horas hábiles.</p>
      </aside>
    </div>
  </section>`;
};
