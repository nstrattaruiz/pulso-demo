/**
 * MI PEDIDO: drawer lateral (tarjeta flotante con fondo desenfocado, firma NS).
 * Barra de pedido mínimo en vivo, cantidades, nota para PULSO y "Enviar pedido".
 * Se abre solo al agregar un producto.
 */
import { cartLines, cartProgress, cartCount, removeFromCart, placeOrder, on, isLogged } from '../store.js';
import { createLayer } from '../ui/layer.js';
import { money, plural, $ } from '../ui/format.js';
import { icon } from '../ui/icons.js';
import { productImage } from '../ui/art.js';
import { toast } from '../ui/toast.js';
import { qtyStepper } from './price.js';
import { emptyState } from './emptyState.js';

let layer;
let note = '';

const progress = () => {
  const { subtotal, min, missing, ratio } = cartProgress();
  const done = missing === 0 && subtotal > 0;
  return `
    <div class="pl-progress ${done ? 'is-done' : ''}">
      <p class="pl-progress__msg" aria-live="polite">
        ${done ? `${icon('check')} <strong>¡Pedido mínimo alcanzado!</strong>` : `Te faltan <strong>${money(missing)}</strong> para alcanzar el mínimo de compra.`}
      </p>
      <div class="pl-progress__bar" role="progressbar" aria-label="Avance hacia el pedido mínimo" aria-valuemin="0" aria-valuemax="${min}" aria-valuenow="${Math.min(subtotal, min)}">
        <span style="--p:${ratio}"></span>
      </div>
      <p class="pl-progress__legend"><span>${money(0)}</span><span>Mínimo ${money(min)}</span></p>
    </div>`;
};

const line = (l) => {
  const p = l.product;
  return `
    <li class="pl-line" data-line="${p.id}">
      <a class="pl-line__img" href="#/producto/${p.slug}" tabindex="-1" aria-hidden="true"><img src="${productImage(p).src}" alt="" width="80" height="100"></a>
      <div class="pl-line__info">
        <a class="pl-line__name" href="#/producto/${p.slug}">${p.name}</a>
        <span class="pl-line__sku">${p.sku} · mín. ${p.min}</span>
        <span class="pl-line__calc">${l.qty} × ${money(p.price)}</span>
        ${qtyStepper(p, { value: l.qty, cartId: p.id, size: 'pl-qty--sm' })}
      </div>
      <div class="pl-line__end">
        <strong>${money(l.qty * p.price)}</strong>
        <button type="button" class="pl-line__remove" data-action="remove" data-id="${p.id}" aria-label="Quitar ${p.name} del pedido">${icon('trash')}</button>
      </div>
    </li>`;
};

const render = () => {
  const el = $('#pl-cart');
  const lines = cartLines();
  const { subtotal, missing } = cartProgress();
  const body = $('.pl-drawer__body', el);
  const foot = $('.pl-drawer__foot', el);
  $('.pl-drawer__count', el).textContent = plural(cartCount(), 'unidad', 'unidades');

  if (!lines.length) {
    body.innerHTML = emptyState({
      art: 'bag',
      title: 'Tu pedido está vacío.',
      text: 'Hay muchos productos esperando.',
      action: `<a class="pl-btn pl-btn--primary" href="#/catalogo" data-action="close-layer">Explorar catálogo <span class="pl-btn__arrow">${icon('arrow')}</span></a>`,
    });
    foot.hidden = true;
    return;
  }

  // Si el foco estaba en un selector de cantidad, lo recuperamos después de re-renderizar
  const focused = document.activeElement?.closest('[data-cart-id]')?.dataset.cartId;
  const focusedAction = document.activeElement?.dataset?.action;

  body.innerHTML = `${progress()}<ul class="pl-lines">${lines.map(line).join('')}</ul>
    <label class="pl-note"><span>Nota para PULSO <small>(opcional)</small></span>
      <textarea rows="2" placeholder="Ej.: entregar de mañana, facturar a otra razón social…">${note}</textarea></label>`;
  foot.hidden = false;
  foot.innerHTML = `
    <dl class="pl-totals">
      <div><dt>Subtotal</dt><dd>${money(subtotal)}</dd></div>
      <div><dt>Mínimo de pedido</dt><dd>${money(150)}</dd></div>
      <div class="pl-totals__state ${missing ? '' : 'is-ok'}"><dt>Estado</dt><dd>${missing ? `Faltan ${money(missing)}` : `${icon('check')} Monto mínimo alcanzado`}</dd></div>
    </dl>
    <button type="button" class="pl-btn pl-btn--primary pl-btn--block pl-btn--lg" data-action="send-order" ${missing ? 'disabled' : ''}>
      Enviar pedido a PULSO <span class="pl-btn__arrow">${icon('arrow')}</span>
    </button>
    <p class="pl-drawer__legal">No se cobra nada ahora. Nuestro equipo confirma disponibilidad, envío y forma de pago.</p>`;

  $('textarea', body).addEventListener('input', (e) => (note = e.target.value));
  if (focused) $(`[data-cart-id="${focused}"] [data-action="${focusedAction}"]`, body)?.focus() ?? $(`[data-cart-id="${focused}"] input`, body)?.focus();
};

export const openCart = (from) => {
  if (!isLogged()) return;
  render();
  layer.open(from);
};
export const closeCart = () => layer?.close();

export const initCart = () => {
  const el = document.createElement('aside');
  el.className = 'pl-drawer';
  el.id = 'pl-cart';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-labelledby', 'pl-cart-title');
  el.innerHTML = `
    <header class="pl-drawer__head">
      <div><h2 id="pl-cart-title">Mi pedido</h2><span class="pl-drawer__count"></span></div>
      <button type="button" class="pl-iconbtn pl-iconbtn--light" data-action="close-layer" aria-label="Cerrar pedido">${icon('close')}</button>
    </header>
    <div class="pl-drawer__body"></div>
    <footer class="pl-drawer__foot"></footer>`;
  document.body.append(el);
  layer = createLayer(el);

  el.addEventListener('click', (e) => {
    const t = e.target.closest('[data-action]');
    if (!t) return;
    const { action, id } = t.dataset;
    if (action === 'close-layer') layer.close();
    if (action === 'remove') {
      const row = t.closest('.pl-line');
      row.classList.add('is-leaving');
      setTimeout(() => removeFromCart(id), 220);
    }
    if (action === 'send-order') {
      t.disabled = true;
      t.classList.add('is-loading');
      setTimeout(() => {
        const order = placeOrder(note);
        if (!order) return;
        note = '';
        layer.close({ silent: false });
        toast('Pedido enviado correctamente', { icon: 'check', tone: 'purple' });
        location.hash = `#/pedido-enviado/${order.id}`;
      }, 900);
    }
  });

  on('cart', (d) => {
    // Pausa corta para que se vea el "Agregado ✓" antes de que entre el drawer
    if (d?.added && !layer.isOpen) setTimeout(() => !layer.isOpen && openCart(), 650);
    else if (layer.isOpen) render();
  });
  on('auth', (u) => !u && layer.close());
};
