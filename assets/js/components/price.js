/**
 * Precio y compra: la pieza central de la demo.
 * Visitante → nunca ve valores (ni mayorista, ni PVP, ni subtotales).
 * Mayorista → precio, PVP sugerido, margen, selector de cantidad y "Agregar al pedido".
 */
import { isLogged } from '../store.js';
import { availability, margin } from '../data/products.js';
import { money } from '../ui/format.js';
import { icon } from '../ui/icons.js';

export const loginHref = () => `#/login?next=${encodeURIComponent(location.hash.slice(1) || '/')}`;

export const qtyStepper = (p, { value = p.min, cartId = null, size = '' } = {}) => `
  <div class="pl-qty ${size}" data-min="${p.min}" data-max="${Math.max(p.min, p.stock)}" ${cartId ? `data-cart-id="${cartId}"` : ''}>
    <button type="button" class="pl-qty__btn" data-action="qty-dec" aria-label="Restar una unidad de ${p.name}">${icon('minus')}</button>
    <input class="pl-qty__input" type="number" inputmode="numeric" value="${value}" min="${p.min}" max="${p.stock}" aria-label="Cantidad de ${p.name}">
    <button type="button" class="pl-qty__btn" data-action="qty-inc" aria-label="Sumar una unidad de ${p.name}">${icon('plus')}</button>
  </div>`;

/** Bloque de precio para cards (compacto). */
export const cardPrice = (p) => {
  if (!isLogged()) {
    return `
      <div class="pl-price is-locked">
        <span class="pl-price__label">${icon('lock')} Precio mayorista</span>
        <strong class="pl-price__locked">Ingresá para consultar</strong>
      </div>
      <a class="pl-btn pl-btn--dark pl-btn--block pl-btn--sm" href="${loginHref()}">Iniciar sesión <span class="pl-btn__arrow">${icon('arrow')}</span></a>`;
  }
  const out = p.stock <= 0;
  return `
    <div class="pl-price">
      <span class="pl-price__label">Precio mayorista</span>
      <strong class="pl-price__value">${money(p.price)}</strong>
      <span class="pl-price__rrp">PVP sugerido: ${money(p.retail)} <em>+${margin(p)}%</em></span>
    </div>
    ${out
      ? `<button type="button" class="pl-btn pl-btn--ghost pl-btn--block pl-btn--sm" data-action="notify" data-id="${p.id}">${icon('refresh')} Avisarme cuando llegue</button>`
      : `<div class="pl-buy">
          ${qtyStepper(p)}
          <button type="button" class="pl-btn pl-btn--primary pl-btn--sm pl-add" data-action="add" data-id="${p.id}">
            <span class="pl-add__label">Agregar al pedido</span><span class="pl-add__done" aria-hidden="true">${icon('check')} Agregado</span>
          </button>
        </div>`}`;
};

/** Pie de card: mínimo de compra y disponibilidad (solo mayoristas ven stock). */
export const cardFoot = (p) => {
  const a = availability(p);
  return `
    <p class="pl-card__foot">
      <span>Venta mínima: ${p.min} unidades</span>
      ${isLogged() ? `<span class="pl-stock pl-stock--${a.key}"><i></i>${a.key === 'in' ? 'En stock' : a.key === 'low' ? 'Pocas unidades' : 'Próximo ingreso'}</span>` : ''}
    </p>`;
};
