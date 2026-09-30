/**
 * Capas superpuestas (drawers y modales) con el fondo desenfocado de la firma NS.
 * Una sola capa abierta por vez. Esc o tocar el fondo cierran. Foco atrapado adentro
 * y devuelto al botón que la abrió.
 */
const root = document.documentElement;
let scrim;
let current = null;

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

const ensureScrim = () => {
  if (scrim) return scrim;
  scrim = document.createElement('div');
  scrim.className = 'pl-scrim';
  scrim.setAttribute('aria-hidden', 'true');
  scrim.addEventListener('click', () => current?.close());
  document.body.append(scrim);
  return scrim;
};

document.addEventListener('keydown', (e) => {
  if (!current) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    current.close();
    return;
  }
  if (e.key !== 'Tab') return;
  const items = [...current.el.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

export const createLayer = (el, { onOpen, onClose, focus } = {}) => {
  el.inert = true;
  el.setAttribute('aria-hidden', 'true');
  let trigger = null;

  const api = {
    el,
    get isOpen() { return current === api; },
    open(from = document.activeElement) {
      if (current && current !== api) current.close({ silent: true });
      ensureScrim();
      trigger = from;
      current = api;
      onOpen?.();
      el.inert = false;
      el.setAttribute('aria-hidden', 'false');
      el.classList.add('is-open');
      root.classList.add('pl-layer-open');
      const target = (focus && el.querySelector(focus)) || el.querySelector(FOCUSABLE);
      setTimeout(() => target?.focus({ preventScroll: true }), 60);
    },
    close({ silent = false } = {}) {
      if (current !== api) return;
      current = null;
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      el.inert = true;
      if (!silent) root.classList.remove('pl-layer-open');
      onClose?.();
      if (!silent && trigger?.isConnected) trigger.focus({ preventScroll: true });
    },
    toggle(from) { api.isOpen ? api.close() : api.open(from); },
  };
  return api;
};

export const closeLayers = () => current?.close();
