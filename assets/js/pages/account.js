/**
 * MI CUENTA (dashboard B2B): resumen, pedidos, favoritos y datos del comercio.
 * Rutas: #/cuenta, #/cuenta/pedidos, #/cuenta/favoritos, #/cuenta/datos
 */
import { user, orders, orderById, accountStats, favs, reorder } from '../store.js';
import { render as rerender } from '../router.js';
import { byId } from '../data/products.js';
import { ORDER_STATUSES } from '../data/account.js';
import { icon } from '../ui/icons.js';
import { money, date, plural, $, $$ } from '../ui/format.js';
import { productImage } from '../ui/art.js';
import { toast } from '../ui/toast.js';
import { productCard } from '../components/productCard.js';
import { emptyState } from '../components/emptyState.js';
import { openModal, closeModal } from '../components/modal.js';
import { openCart } from '../components/cart.js';

export const auth = true;
export const title = ({ params }) => ({ pedidos: 'Mis pedidos', favoritos: 'Favoritos', datos: 'Datos del comercio' })[params.tab] ?? 'Mi cuenta';

const TABS = [
  ['', 'Resumen', 'grid'],
  ['pedidos', 'Mis pedidos', 'receipt'],
  ['favoritos', 'Favoritos', 'heart'],
  ['datos', 'Datos del comercio', 'store'],
];

export const statusBadge = (s) => `<span class="pl-status pl-status--${s.toLowerCase()}"><i></i>${s}</span>`;

const ordersTable = (list, { limit } = {}) => {
  if (!list.length) {
    return emptyState({
      art: 'box',
      title: 'Todavía no realizaste pedidos.',
      text: 'Tu primer pedido está a unos clics.',
      action: `<a class="pl-btn pl-btn--primary" href="#/catalogo">Ir al catálogo <span class="pl-btn__arrow">${icon('arrow')}</span></a>`,
    });
  }
  const rows = limit ? list.slice(0, limit) : list;
  return `
    <div class="pl-table-wrap">
      <table class="pl-table">
        <thead><tr><th scope="col">Pedido</th><th scope="col">Fecha</th><th scope="col">Estado</th><th scope="col" class="is-num">Total</th><th scope="col"><span class="sr-only">Acciones</span></th></tr></thead>
        <tbody>
          ${rows.map((o) => `
            <tr class="${o.fresh ? 'is-fresh' : ''}">
              <th scope="row"><button type="button" class="pl-order-link" data-order="${o.id}">#${o.id}</button></th>
              <td>${date(o.date)}</td>
              <td>${statusBadge(o.status)}</td>
              <td class="is-num">${money(o.total)}</td>
              <td class="is-end"><button type="button" class="pl-linkbtn" data-order="${o.id}">Ver detalle</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
};

/* Compras por mes: una sola serie → un solo tono, sin leyenda, tooltip por barra y tabla accesible. */
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const monthlyChart = (list) => {
  const map = new Map();
  list.forEach((o) => {
    const k = o.date.slice(0, 7);
    map.set(k, (map.get(k) ?? 0) + o.total);
  });
  const keys = [...map.keys()].sort().slice(-7);
  if (!keys.length) return '';
  const data = keys.map((k) => ({ k, label: MONTHS[Number(k.slice(5)) - 1], v: map.get(k) }));
  const max = Math.max(...data.map((d) => d.v));
  const top = Math.ceil(max / 250) * 250;
  return `
    <section class="pl-panel pl-chart" aria-labelledby="chart-title">
      <header class="pl-panel__head"><h2 id="chart-title">Compras por mes</h2><span class="pl-muted">USD · últimos ${data.length} meses</span></header>
      <div class="pl-chart__plot" aria-hidden="true">
        <div class="pl-chart__grid">${[1, 0.5, 0].map((f) => `<span style="--y:${f}"><em>${money(top * f)}</em></span>`).join('')}</div>
        <div class="pl-chart__bars">
          ${data.map((d, i) => `
            <div class="pl-chart__col" tabindex="0">
              <span class="pl-chart__bar" style="--h:${d.v / top}; --d:${i}"></span>
              <span class="pl-chart__tip"><strong>${money(d.v)}</strong>${d.label} 2026</span>
              ${i === data.length - 1 ? `<span class="pl-chart__label" style="--h:${d.v / top}">${money(d.v)}</span>` : ''}
              <span class="pl-chart__x">${d.label}</span>
            </div>`).join('')}
        </div>
      </div>
      <table class="sr-only"><caption>Compras por mes en USD</caption><tbody>${data.map((d) => `<tr><th scope="row">${d.label} 2026</th><td>${money(d.v)}</td></tr>`).join('')}</tbody></table>
    </section>`;
};

const summary = (u) => {
  const s = accountStats();
  const list = orders();
  return `
    <header class="pl-account__hello">
      <div>
        <h1 class="pl-h1">Hola, ${u.firstName} 👋</h1>
        <p class="pl-lead">Este es el estado de tu cuenta mayorista.</p>
      </div>
      <a class="pl-btn pl-btn--primary" href="#/catalogo">${icon('plus')} Nuevo pedido</a>
    </header>

    <div class="pl-account__status">
      <span class="pl-status pl-status--entregado"><i></i>Cuenta activa</span>
      <span>Nivel <strong>${u.level}</strong></span>
      <span>Ejecutiva: <strong>${u.store.seller}</strong></span>
      <span>Cliente desde ${u.since}</span>
    </div>

    <div class="pl-kpis">
      <article class="pl-kpi" data-reveal style="--d:0"><span class="pl-kpi__label">${icon('receipt')} Pedidos</span><strong class="pl-kpi__value">${s.count}</strong><span class="pl-kpi__meta">desde ${u.since}</span></article>
      <article class="pl-kpi" data-reveal style="--d:1"><span class="pl-kpi__label">${icon('truck')} Pendientes</span><strong class="pl-kpi__value">${s.pending}</strong><span class="pl-kpi__meta">en curso</span></article>
      <article class="pl-kpi" data-reveal style="--d:2"><span class="pl-kpi__label">${icon('card')} Total comprado</span><strong class="pl-kpi__value">${money(s.total)}</strong><span class="pl-kpi__meta">acumulado 2026</span></article>
      <article class="pl-kpi pl-kpi--accent" data-reveal style="--d:3"><span class="pl-kpi__label">${icon('box')} Último pedido</span><strong class="pl-kpi__value">${s.last ? `#${s.last.id}` : '—'}</strong><span class="pl-kpi__meta">${s.last ? `${date(s.last.date)} · ${s.last.status}` : 'Sin pedidos'}</span></article>
    </div>

    <div class="pl-account__two">
      ${monthlyChart(list)}
      <section class="pl-panel pl-store-card" aria-labelledby="store-title">
        <header class="pl-panel__head"><h2 id="store-title">Datos del comercio</h2><a class="pl-linkbtn" href="#/cuenta/datos">Editar</a></header>
        <dl class="pl-dl">
          <div><dt>Comercio</dt><dd>${u.store.name}</dd></div>
          <div><dt>Tipo</dt><dd>${u.store.type}</dd></div>
          <div><dt>Ubicación</dt><dd>${u.store.city}, ${u.store.country}</dd></div>
          <div><dt>RUT</dt><dd>${u.store.taxId}</dd></div>
          <div><dt>Instagram</dt><dd>${u.store.web}</dd></div>
        </dl>
      </section>
    </div>

    <section class="pl-panel" aria-labelledby="recent-title">
      <header class="pl-panel__head"><h2 id="recent-title">Pedidos recientes</h2><a class="pl-link" href="#/cuenta/pedidos">Ver todos ${icon('arrow')}</a></header>
      ${ordersTable(list, { limit: 5 })}
    </section>`;
};

const ordersTab = () => {
  const list = orders();
  return `
    <header class="pl-account__hello"><div><h1 class="pl-h1">Mis pedidos</h1><p class="pl-lead">${plural(list.length, 'pedido', 'pedidos')} · Repetí cualquiera en un clic.</p></div></header>
    <div class="pl-chips pl-status-filter" role="group" aria-label="Filtrar por estado">
      <button type="button" class="pl-chip is-on" data-status="" aria-pressed="true">Todos</button>
      ${ORDER_STATUSES.map((s) => `<button type="button" class="pl-chip" data-status="${s}" aria-pressed="false">${s} <span>${list.filter((o) => o.status === s).length}</span></button>`).join('')}
    </div>
    <section class="pl-panel" data-orders>${ordersTable(list)}</section>`;
};

const favsTab = () => {
  const list = favs();
  return `
    <header class="pl-account__hello"><div><h1 class="pl-h1">Mis favoritos</h1><p class="pl-lead">${list.length ? plural(list.length, 'producto guardado', 'productos guardados') : 'Tu lista para la próxima reposición.'}</p></div></header>
    ${list.length
      ? `<div class="pl-grid pl-grid--3" data-favs>${list.map((p, i) => productCard(p, i)).join('')}</div>`
      : emptyState({
          art: 'heart',
          title: 'Todavía no guardaste productos.',
          text: 'Cuando encuentres algo que te guste, guardalo acá.',
          action: `<a class="pl-btn pl-btn--primary" href="#/catalogo">Explorar catálogo <span class="pl-btn__arrow">${icon('arrow')}</span></a>`,
        })}`;
};

const dataTab = (u) => `
  <header class="pl-account__hello"><div><h1 class="pl-h1">Datos del comercio</h1><p class="pl-lead">Mantené tus datos al día para facturar y despachar sin demoras.</p></div></header>
  <form class="pl-panel pl-form pl-form--grid" data-store-form>
    ${[
      ['Nombre', `${u.firstName}`], ['Apellido', u.lastName], ['Email', u.email], ['Teléfono', u.store.phone],
      ['Comercio', u.store.name], ['Tipo de comercio', u.store.type], ['Dirección', u.store.address], ['Ciudad', u.store.city],
      ['País', u.store.country], ['RUT', u.store.taxId],
    ].map(([l, v], i) => `<div class="pl-field"><label for="st-${i}">${l}</label><input id="st-${i}" value="${v}"></div>`).join('')}
    <button class="pl-btn pl-btn--primary pl-field--full" type="submit">Guardar cambios</button>
  </form>`;

const orderDetail = (o) => {
  const step = ORDER_STATUSES.indexOf(o.status);
  const units = o.items.reduce((s, i) => s + i.qty, 0);
  return `
    <p class="pl-modal__lead">${date(o.date)} · ${plural(o.items.length, 'producto', 'productos')} · ${units} unidades</p>
    <ol class="pl-timeline" aria-label="Estado del pedido">
      ${ORDER_STATUSES.map((s, i) => `<li class="${i < step ? 'is-done' : i === step ? 'is-current' : ''}" ${i === step ? 'aria-current="step"' : ''}><span>${i <= step ? icon('check') : ''}</span>${s}</li>`).join('')}
    </ol>
    <ul class="pl-mini-lines">
      ${o.items.map((it) => {
        const p = byId(it.id);
        return `<li><img src="${productImage(p).src}" alt="" width="48" height="60"><span><a href="#/producto/${p.slug}">${p.name}</a><small>${it.qty} × ${money(it.price)}</small></span><strong>${money(it.qty * it.price)}</strong></li>`;
      }).join('')}
    </ul>
    ${o.note ? `<p class="pl-order-note"><strong>Nota:</strong> ${o.note.replace(/</g, '&lt;')}</p>` : ''}
    <div class="pl-mini-total"><span>Total</span><strong>${money(o.total)}</strong></div>
    <div class="pl-modal__actions">
      <button type="button" class="pl-btn pl-btn--primary" data-reorder="${o.id}">${icon('refresh')} Repetir pedido</button>
      <button type="button" class="pl-btn pl-btn--ghost" data-action="close-modal">Cerrar</button>
    </div>`;
};

export const render = ({ params }) => {
  const u = user();
  const tab = params.tab ?? '';
  const content = { '': summary, pedidos: ordersTab, favoritos: favsTab, datos: dataTab }[tab];
  if (!content) return `<section class="pl-container pl-section">${emptyState({ art: 'box', title: 'Esta sección no existe.', text: 'Volvé a tu cuenta.', action: '<a class="pl-btn pl-btn--primary" href="#/cuenta">Mi cuenta</a>' })}</section>`;
  return `
  <section class="pl-account">
    <div class="pl-container pl-account__grid">
      <aside class="pl-account__side">
        <div class="pl-account__me">
          <span class="pl-avatar pl-avatar--lg" aria-hidden="true">${u.initials}</span>
          <div><strong>${u.firstName} ${u.lastName}</strong><span>${u.store.name}</span></div>
        </div>
        <span class="pl-tag-wholesale is-block">Cuenta mayorista</span>
        <nav class="pl-account__nav" aria-label="Mi cuenta">
          ${TABS.map(([k, l, ic]) => `<a href="#/cuenta${k ? `/${k}` : ''}" class="${tab === k ? 'is-on' : ''}" ${tab === k ? 'aria-current="page"' : ''}>${icon(ic)}<span>${l}</span>${k === 'favoritos' ? `<em>${favs().length}</em>` : ''}</a>`).join('')}
          <button type="button" data-action="logout">${icon('logout')}<span>Cerrar sesión</span></button>
        </nav>
        <div class="pl-account__help">
          <p><strong>¿Necesitás ayuda?</strong> ${u.store.seller.split(' ')[0]} responde en el día.</p>
          <a href="#/" data-action="social" class="pl-linkbtn">${icon('wa')} Escribir por WhatsApp</a>
        </div>
      </aside>
      <div class="pl-account__main">${content(u)}</div>
    </div>
  </section>`;
};

export const mount = (root) => {
  const onClick = (e) => {
    const o = e.target.closest('[data-order]');
    if (o) {
      const order = orderById(o.dataset.order);
      openModal({ from: o, size: 'is-wide', title: `Pedido #${order.id}`, body: orderDetail(order) });
      return;
    }
    const st = e.target.closest('[data-status]');
    if (st) {
      $$('[data-status]', root).forEach((b) => {
        b.classList.toggle('is-on', b === st);
        b.setAttribute('aria-pressed', String(b === st));
      });
      const list = orders().filter((x) => !st.dataset.status || x.status === st.dataset.status);
      $('[data-orders]', root).innerHTML = list.length
        ? ordersTable(list)
        : `<p class="pl-muted pl-pad">No hay pedidos en estado ${st.dataset.status}.</p>`;
    }
  };
  // Detalle y "Repetir pedido" viven en el modal (fuera de root)
  const onModal = (e) => {
    const r = e.target.closest('[data-reorder]');
    if (!r) return;
    const n = reorder(r.dataset.reorder);
    closeModal();
    toast(`${plural(n, 'producto cargado', 'productos cargados')} a tu pedido`, { icon: 'refresh' });
    setTimeout(() => openCart(), 300);
  };
  root.addEventListener('click', onClick);
  document.addEventListener('click', onModal);

  const form = $('[data-store-form]', root);
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    toast('Datos guardados', { icon: 'check' });
  });

  // Si se quita un favorito desde esta vista, sacamos la card
  const favGrid = $('[data-favs]', root);
  const onFav = (e) => {
    const b = e.target.closest('.pl-fav');
    if (!b || !favGrid?.contains(b)) return;
    setTimeout(() => {
      if (!b.classList.contains('is-on')) {
        const card = b.closest('.pl-card');
        card.classList.add('is-leaving');
        setTimeout(() => (favs().length ? card.remove() : rerender({ keepScroll: true })), 260);
      }
    });
  };
  document.addEventListener('click', onFav);

  return () => {
    root.removeEventListener('click', onClick);
    document.removeEventListener('click', onModal);
    document.removeEventListener('click', onFav);
  };
};
