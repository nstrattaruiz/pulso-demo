/** Notificaciones en la esquina. toast('Texto', { icon: 'check', action: { label, href } }) */
import { icon } from './icons.js';
import { esc } from './format.js';

let box;
const ensure = () => {
  if (box) return box;
  box = document.createElement('div');
  box.className = 'pl-toasts';
  box.setAttribute('role', 'status');
  box.setAttribute('aria-live', 'polite');
  document.body.append(box);
  return box;
};

export const toast = (message, { icon: ic = 'check', tone = 'dark', action, time = 3400 } = {}) => {
  const el = document.createElement('div');
  el.className = `pl-toast pl-toast--${tone}`;
  el.innerHTML = `
    <span class="pl-toast__icon">${icon(ic)}</span>
    <span class="pl-toast__text">${esc(message)}</span>
    ${action ? `<a class="pl-toast__action" href="${action.href}">${esc(action.label)}</a>` : ''}
    <button class="pl-toast__close" type="button" aria-label="Cerrar aviso">${icon('close')}</button>`;
  const host = ensure();
  host.append(el);
  while (host.children.length > 3) host.firstElementChild.remove();
  requestAnimationFrame(() => el.classList.add('is-in'));

  let timer;
  const close = () => {
    clearTimeout(timer);
    el.classList.remove('is-in');
    el.classList.add('is-out');
    setTimeout(() => el.remove(), 320);
  };
  const start = () => (timer = setTimeout(close, time));
  el.addEventListener('mouseenter', () => clearTimeout(timer));
  el.addEventListener('mouseleave', start);
  el.querySelector('.pl-toast__close').addEventListener('click', close);
  el.querySelector('.pl-toast__action')?.addEventListener('click', close);
  start();
};
