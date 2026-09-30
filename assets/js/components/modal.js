/** Modal genérico reutilizable: openModal({ title, body, size }) */
import { createLayer } from '../ui/layer.js';
import { icon } from '../ui/icons.js';
import { $ } from '../ui/format.js';

let layer;
let el;

export const initModal = () => {
  el = document.createElement('div');
  el.className = 'pl-modal';
  el.id = 'pl-modal';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-labelledby', 'pl-modal-title');
  el.innerHTML = `
    <div class="pl-modal__card">
      <button type="button" class="pl-iconbtn pl-modal__close" data-action="close-modal" aria-label="Cerrar">${icon('close')}</button>
      <div class="pl-modal__content"></div>
    </div>`;
  document.body.append(el);
  layer = createLayer(el);
  el.addEventListener('click', (e) => {
    if (e.target === el || e.target.closest('[data-action="close-modal"]')) layer.close();
    else if (e.target.closest('a[href^="#/"]')) layer.close({ silent: false });
  });
};

export const openModal = ({ title, body, size = '', from, onMount }) => {
  el.querySelector('.pl-modal__card').className = `pl-modal__card ${size}`;
  $('.pl-modal__content', el).innerHTML = `<h2 id="pl-modal-title" class="pl-modal__title">${title}</h2>${body}`;
  onMount?.(el);
  layer.open(from);
};

export const closeModal = () => layer?.close();
