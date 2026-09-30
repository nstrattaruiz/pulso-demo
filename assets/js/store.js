/**
 * Estado de la demo: sesión, pedido en curso, favoritos y pedidos.
 * Sin backend: todo se guarda en localStorage (la sesión en sessionStorage si no se marca "Recordarme").
 * Los componentes se suscriben con `on('cart' | 'favs' | 'auth' | 'orders', fn)`.
 */
import { PRODUCTS, byId, MIN_ORDER } from './data/products.js';
import { DEMO_USERS, seedOrders, FIRST_NEW_ORDER } from './data/account.js';

const KEY = 'pulso-demo:v1';
const SESSION_KEY = 'pulso-demo:session';

const safe = (fn, fallback) => {
  try { return fn(); } catch { return fallback; }
};

const load = () => safe(() => JSON.parse(localStorage.getItem(KEY)) ?? {}, {});
const loadSession = () =>
  safe(() => JSON.parse(localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)), null);

const data = Object.assign({ cart: [], favs: [], orders: null, seq: FIRST_NEW_ORDER }, load());
let session = loadSession();

const save = () => safe(() => localStorage.setItem(KEY, JSON.stringify(data)));

/* ---------- Eventos ---------- */
const listeners = new Map();
export const on = (type, fn) => {
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type).add(fn);
  return () => listeners.get(type).delete(fn);
};
const emit = (type, detail) => {
  save();
  listeners.get(type)?.forEach((fn) => fn(detail));
};

/* ---------- Sesión ---------- */
export const user = () => (session ? DEMO_USERS.find((u) => u.email === session.email) ?? null : null);
export const isLogged = () => Boolean(user());

export const login = (email, password, remember = true) => {
  const u = DEMO_USERS.find((x) => x.email === email.trim().toLowerCase() && x.password === password);
  if (!u) return false;
  session = { email: u.email, at: Date.now() };
  safe(() => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
  });
  if (!data.orders) data.orders = seedOrders(PRODUCTS);
  emit('auth', u);
  return true;
};

export const logout = () => {
  session = null;
  safe(() => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  });
  emit('auth', null);
};

/* ---------- Pedido en curso ---------- */
export const cartLines = () =>
  data.cart
    .map((l) => ({ ...l, product: byId(l.id) }))
    .filter((l) => l.product);

export const cartCount = () => data.cart.reduce((s, l) => s + l.qty, 0);
export const cartSubtotal = () => cartLines().reduce((s, l) => s + l.qty * l.product.price, 0);
export const cartProgress = () => {
  const subtotal = cartSubtotal();
  return { subtotal, min: MIN_ORDER, missing: Math.max(0, MIN_ORDER - subtotal), ratio: Math.min(1, subtotal / MIN_ORDER) };
};
export const qtyInCart = (id) => data.cart.find((l) => l.id === id)?.qty ?? 0;

const clampQty = (p, qty) => Math.max(p.min, Math.min(p.stock, Math.round(qty)));

export const addToCart = (id, qty) => {
  const p = byId(id);
  if (!p || p.stock <= 0) return false;
  const line = data.cart.find((l) => l.id === p.id);
  if (line) line.qty = clampQty(p, line.qty + qty);
  else data.cart.push({ id: p.id, qty: clampQty(p, qty) });
  emit('cart', { added: p, qty });
  return true;
};

export const setCartQty = (id, qty) => {
  const p = byId(id);
  const line = data.cart.find((l) => l.id === Number(id));
  if (!p || !line) return;
  line.qty = clampQty(p, qty);
  emit('cart');
};

export const removeFromCart = (id) => {
  data.cart = data.cart.filter((l) => l.id !== Number(id));
  emit('cart');
};

/* ---------- Favoritos ---------- */
export const favs = () => data.favs.map(byId).filter(Boolean);
export const isFav = (id) => data.favs.includes(Number(id));
export const toggleFav = (id) => {
  const n = Number(id);
  const added = !data.favs.includes(n);
  data.favs = added ? [...data.favs, n] : data.favs.filter((x) => x !== n);
  emit('favs', { id: n, added });
  return added;
};

/* ---------- Pedidos ---------- */
export const orders = () => (data.orders ?? []).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id.localeCompare(a.id)));
export const orderById = (id) => (data.orders ?? []).find((o) => o.id === id);

export const placeOrder = (note = '') => {
  const lines = cartLines();
  if (!lines.length || cartSubtotal() < MIN_ORDER) return null;
  const today = new Date();
  const order = {
    id: `PUL-${data.seq++}`,
    date: today.toISOString().slice(0, 10),
    status: 'Recibido',
    items: lines.map((l) => ({ id: l.id, qty: l.qty, price: l.product.price })),
    total: cartSubtotal(),
    note: note.trim(),
    fresh: true,
  };
  data.orders = [order, ...(data.orders ?? [])];
  data.cart = [];
  emit('orders', order);
  emit('cart');
  return order;
};

/** Reposición: vuelve a cargar al pedido los productos de un pedido anterior. */
export const reorder = (id) => {
  const order = orderById(id);
  if (!order) return 0;
  let n = 0;
  order.items.forEach((it) => {
    const p = byId(it.id);
    if (p && p.stock > 0) {
      const line = data.cart.find((l) => l.id === p.id);
      if (line) line.qty = clampQty(p, line.qty + it.qty);
      else data.cart.push({ id: p.id, qty: clampQty(p, it.qty) });
      n++;
    }
  });
  emit('cart');
  return n;
};

export const accountStats = () => {
  const list = orders();
  return {
    count: list.length,
    pending: list.filter((o) => o.status !== 'Entregado').length,
    total: list.reduce((s, o) => s + o.total, 0),
    last: list[0] ?? null,
  };
};

/** Reinicia la demo (útil al presentarla varias veces). */
export const resetDemo = () => {
  safe(() => {
    localStorage.removeItem(KEY);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  });
  location.hash = '#/';
  location.reload();
};
