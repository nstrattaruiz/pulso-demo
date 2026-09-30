/**
 * Catálogo: sidebar de categorías, filtros, buscador, orden y grid.
 * El estado vive en la query del hash (#/catalogo?cat=hogar&q=vela) para poder compartir el link.
 * En tablet y celular los filtros se abren en un drawer.
 */
import { PRODUCTS, CATEGORIES, categoryBySlug, availability, margin } from '../data/products.js';
import { isLogged } from '../store.js';
import { setQuery } from '../router.js';
import { createLayer } from '../ui/layer.js';
import { icon } from '../ui/icons.js';
import { $, $$, esc, plural } from '../ui/format.js';
import { productCard } from '../components/productCard.js';
import { emptyState } from '../components/emptyState.js';
import { searchProducts } from '../components/search.js';

export const title = ({ query }) => (query.cat ? categoryBySlug(query.cat)?.name ?? 'Catálogo' : 'Catálogo');

const AVAIL = [
  ['in', 'En stock'],
  ['low', 'Pocas unidades'],
  ['restock', 'Próximo ingreso'],
];

const SORTS = () => [
  ['featured', 'Destacados'],
  ['new', 'Novedades primero'],
  ['name', 'Nombre A–Z'],
  ...(isLogged()
    ? [
        ['price-asc', 'Precio: menor a mayor'],
        ['price-desc', 'Precio: mayor a menor'],
        ['margin', 'Mayor margen'],
      ]
    : []),
];

const readState = (q) => ({
  cat: q.cat && q.cat !== 'novedades' ? q.cat : '',
  sub: q.sub ?? '',
  avail: q.avail ? q.avail.split(',') : [],
  isNew: q.cat === 'novedades' || q.new === '1',
  best: q.best === '1',
  q: q.q ?? '',
  sort: q.sort ?? 'featured',
});

const toQuery = (s) => ({
  cat: s.cat,
  sub: s.sub,
  avail: s.avail.join(','),
  new: s.isNew ? '1' : '',
  best: s.best ? '1' : '',
  q: s.q,
  sort: s.sort === 'featured' ? '' : s.sort,
});

const filterList = (s) => {
  let list = s.q.trim() ? searchProducts(s.q) : PRODUCTS.slice();
  if (s.cat) list = list.filter((p) => p.category === s.cat);
  if (s.sub) list = list.filter((p) => p.sub === s.sub);
  if (s.avail.length) list = list.filter((p) => s.avail.includes(availability(p).key));
  if (s.isNew) list = list.filter((p) => p.isNew);
  if (s.best) list = list.filter((p) => p.best);
  const by = {
    featured: (a, b) => (b.best + b.isNew) - (a.best + a.isNew) || (b.stock > 0) - (a.stock > 0),
    new: (a, b) => b.isNew - a.isNew,
    name: (a, b) => a.name.localeCompare(b.name, 'es'),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    margin: (a, b) => margin(b) - margin(a),
  }[s.sort];
  if (by && !(s.q.trim() && s.sort === 'featured')) list.sort(by);
  return list;
};

const activeCount = (s) => s.avail.length + (s.isNew ? 1 : 0) + (s.best ? 1 : 0) + (s.sub ? 1 : 0) + (s.cat ? 1 : 0);

const filters = (s, scope) => {
  const subs = [...new Set(PRODUCTS.filter((p) => !s.cat || p.category === s.cat).map((p) => p.sub))];
  const id = (k) => `f-${scope}-${k}`;
  return `
    <div class="pl-filter">
      <h3 class="pl-filter__title">Categorías</h3>
      <ul class="pl-filter__cats">
        <li><button type="button" class="${!s.cat ? 'is-on' : ''}" data-cat="" id="${id('cat-all')}">Todo el catálogo <span>${PRODUCTS.length}</span></button></li>
        ${CATEGORIES.filter((c) => !c.virtual).map((c) => `
          <li><button type="button" class="${s.cat === c.slug ? 'is-on' : ''}" data-cat="${c.slug}" id="${id(`cat-${c.slug}`)}">
            <i class="pl-dot pl-dot--${c.tone}"></i>${c.name} <span>${PRODUCTS.filter((p) => p.category === c.slug).length}</span></button></li>`).join('')}
      </ul>
    </div>
    <div class="pl-filter">
      <h3 class="pl-filter__title">Subcategoría</h3>
      <div class="pl-chips">
        ${subs.map((sub) => `<button type="button" class="pl-chip ${s.sub === sub ? 'is-on' : ''}" data-sub="${esc(sub)}" id="${id(`sub-${sub.replace(/\W/g, '')}`)}" aria-pressed="${s.sub === sub}">${sub}</button>`).join('')}
      </div>
    </div>
    <div class="pl-filter">
      <h3 class="pl-filter__title">Disponibilidad</h3>
      ${AVAIL.map(([k, label]) => `
        <label class="pl-check"><input type="checkbox" data-avail="${k}" id="${id(`av-${k}`)}" ${s.avail.includes(k) ? 'checked' : ''}><span></span>${label}</label>`).join('')}
    </div>
    <div class="pl-filter">
      <h3 class="pl-filter__title">Destacados</h3>
      <label class="pl-switch"><input type="checkbox" data-flag="isNew" id="${id('new')}" ${s.isNew ? 'checked' : ''}><span></span>Novedades</label>
      <label class="pl-switch"><input type="checkbox" data-flag="best" id="${id('best')}" ${s.best ? 'checked' : ''}><span></span>Más vendidos</label>
    </div>
    ${!isLogged() ? `
      <div class="pl-filter pl-filter__promo">
        ${icon('lock')}
        <p><strong>Precios exclusivos para comercios.</strong> Ingresá para verlos y ordenar por precio o margen.</p>
        <a class="pl-btn pl-btn--primary pl-btn--sm pl-btn--block" href="#/login?next=%2Fcatalogo">Iniciar sesión</a>
      </div>` : ''}
    <button type="button" class="pl-linkbtn" data-clear ${activeCount(s) || s.q ? '' : 'hidden'}>Limpiar filtros</button>`;
};

const chips = (s) => {
  const list = [];
  if (s.q) list.push(['q', `“${esc(s.q)}”`]);
  if (s.cat) list.push(['cat', categoryBySlug(s.cat).name]);
  if (s.sub) list.push(['sub', s.sub]);
  s.avail.forEach((a) => list.push([`avail:${a}`, AVAIL.find((x) => x[0] === a)[1]]));
  if (s.isNew) list.push(['isNew', 'Novedades']);
  if (s.best) list.push(['best', 'Más vendidos']);
  return list.map(([k, label]) => `<button type="button" class="pl-chip pl-chip--active" data-remove="${k}">${label} ${icon('close')}</button>`).join('');
};

const heading = (s) => {
  if (s.isNew && !s.cat) return { t: 'Novedades', d: 'Los últimos productos incorporados.' };
  if (s.cat) {
    const c = categoryBySlug(s.cat);
    return { t: c.name, d: c.desc };
  }
  return { t: 'Catálogo mayorista', d: 'Más productos. Menos vueltas.' };
};

export const render = ({ query }) => {
  const s = readState(query);
  const h = heading(s);
  return `
  <section class="pl-page-head pl-page-head--catalog">
    <div class="pl-container">
      <p class="pl-eyebrow">${isLogged() ? 'Catálogo con precios mayoristas' : 'Catálogo · Precios para comercios registrados'}</p>
      <h1 class="pl-h1" data-heading>${h.t}</h1>
      <p class="pl-lead" data-heading-desc>${h.d}</p>
    </div>
  </section>
  <section class="pl-container pl-catalog">
    <aside class="pl-catalog__side" aria-label="Filtros">${filters(s, 'side')}</aside>
    <div class="pl-catalog__main">
      <div class="pl-toolbar">
        <label class="pl-toolbar__search">
          ${icon('search')}
          <span class="sr-only">Buscar en el catálogo</span>
          <input type="search" value="${esc(s.q)}" placeholder="¿Qué estás buscando?" data-q>
        </label>
        <button type="button" class="pl-btn pl-btn--ghost pl-toolbar__filters" data-open-filters>
          ${icon('filter')} Filtros <span class="pl-count" data-fcount ${activeCount(s) ? '' : 'hidden'}>${activeCount(s)}</span>
        </button>
        <label class="pl-select">
          <span class="sr-only">Ordenar</span>
          <select data-sort>${SORTS().map(([v, l]) => `<option value="${v}" ${s.sort === v ? 'selected' : ''}>${l}</option>`).join('')}</select>
          ${icon('chevron')}
        </label>
      </div>
      <div class="pl-toolbar__meta">
        <p data-results aria-live="polite"></p>
        <div class="pl-chips" data-chips></div>
      </div>
      <div data-grid></div>
    </div>
  </section>`;
};

export const mount = (root, { query }) => {
  let s = readState(query);

  const drawer = document.createElement('aside');
  drawer.className = 'pl-drawer pl-drawer--filters';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', 'Filtros');
  drawer.innerHTML = `
    <header class="pl-drawer__head"><div><h2>Filtros</h2></div>
      <button type="button" class="pl-iconbtn pl-iconbtn--light" data-close aria-label="Cerrar filtros">${icon('close')}</button></header>
    <div class="pl-drawer__body" data-drawer-filters></div>
    <footer class="pl-drawer__foot"><button type="button" class="pl-btn pl-btn--primary pl-btn--block" data-close data-show></button></footer>`;
  document.body.append(drawer);
  const layer = createLayer(drawer);

  const side = $('.pl-catalog__side', root);
  const drawerBody = $('[data-drawer-filters]', drawer);

  const update = ({ grid = true } = {}) => {
    setQuery(toQuery(s));
    const focusId = document.activeElement?.id;
    side.innerHTML = filters(s, 'side');
    drawerBody.innerHTML = filters(s, 'drawer');
    if (focusId) document.getElementById(focusId)?.focus();

    const list = filterList(s);
    const h = heading(s);
    $('[data-heading]', root).textContent = h.t;
    $('[data-heading-desc]', root).textContent = h.d;
    $('[data-results]', root).textContent = plural(list.length, 'producto', 'productos');
    $('[data-chips]', root).innerHTML = chips(s);
    const n = activeCount(s);
    const fc = $('[data-fcount]', root);
    fc.textContent = n;
    fc.hidden = !n;
    $('[data-show]', drawer).textContent = `Ver ${plural(list.length, 'producto', 'productos')}`;

    if (!grid) return;
    const g = $('[data-grid]', root);
    g.innerHTML = list.length
      ? `<div class="pl-grid">${list.map((p, i) => productCard(p, i)).join('')}</div>`
      : emptyState({
          art: 'search',
          title: 'No encontramos productos con esos filtros.',
          text: 'Probá sacar algún filtro o buscar con otra palabra.',
          action: '<button type="button" class="pl-btn pl-btn--ghost" data-clear>Limpiar filtros</button>',
        });
    $$('[data-reveal]', g).forEach((n2) => requestAnimationFrame(() => n2.classList.add('is-in')));
  };

  const onClick = (e) => {
    const t = e.target;
    const cat = t.closest('[data-cat]');
    if (cat) {
      s = { ...s, cat: cat.dataset.cat, sub: '' };
      return update();
    }
    const sub = t.closest('[data-sub]');
    if (sub) {
      s = { ...s, sub: s.sub === sub.dataset.sub ? '' : sub.dataset.sub };
      return update();
    }
    const rm = t.closest('[data-remove]');
    if (rm) {
      const k = rm.dataset.remove;
      if (k.startsWith('avail:')) s.avail = s.avail.filter((a) => a !== k.slice(6));
      else if (k === 'cat') s = { ...s, cat: '', sub: '' };
      else if (k === 'q') {
        s.q = '';
        $('[data-q]', root).value = '';
      } else s[k] = k === 'isNew' || k === 'best' ? false : '';
      return update();
    }
    if (t.closest('[data-clear]')) {
      s = readState({});
      $('[data-q]', root).value = '';
      return update();
    }
    if (t.closest('[data-open-filters]')) layer.open(t.closest('button'));
    if (t.closest('[data-close]')) layer.close();
  };

  const onChange = (e) => {
    const t = e.target;
    if (t.dataset.avail) {
      s.avail = t.checked ? [...s.avail, t.dataset.avail] : s.avail.filter((a) => a !== t.dataset.avail);
      update();
    } else if (t.dataset.flag) {
      s[t.dataset.flag] = t.checked;
      update();
    } else if (t.matches('[data-sort]')) {
      s.sort = t.value;
      update();
    }
  };

  let timer;
  const onInput = (e) => {
    if (!e.target.matches('[data-q]')) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      s.q = e.target.value;
      update();
    }, 160);
  };

  root.addEventListener('click', onClick);
  root.addEventListener('change', onChange);
  root.addEventListener('input', onInput);
  drawer.addEventListener('click', onClick);
  drawer.addEventListener('change', onChange);

  update();

  return () => {
    root.removeEventListener('click', onClick);
    root.removeEventListener('change', onChange);
    root.removeEventListener('input', onInput);
    layer.close({ silent: false });
    drawer.remove();
  };
};
