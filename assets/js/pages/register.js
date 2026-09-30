/** Solicitud de cuenta mayorista con validación y estado de "Solicitud recibida". */
import { icon } from '../ui/icons.js';
import { $ } from '../ui/format.js';
import { shapeImage } from '../ui/art.js';

export const title = 'Solicitar cuenta mayorista';

const TYPES = ['Tienda de regalos', 'Boutique', 'Tienda de decoración', 'Librería', 'Concept store', 'Tienda de lifestyle', 'Tienda online', 'Otro'];
const VOLUMES = ['Hasta USD 300', 'USD 300 – 800', 'USD 800 – 2.000', 'Más de USD 2.000'];
const COUNTRIES = ['Uruguay', 'Argentina', 'Chile', 'Paraguay', 'Perú', 'Colombia'];

const field = (id, label, { type = 'text', auto = '', required = true, placeholder = '', full = false } = {}) => `
  <div class="pl-field ${full ? 'pl-field--full' : ''}">
    <label for="rg-${id}">${label}${required ? '' : ' <small>(opcional)</small>'}</label>
    <input id="rg-${id}" name="${id}" type="${type}" ${auto ? `autocomplete="${auto}"` : ''} ${required ? 'required' : ''} placeholder="${placeholder}">
    <span class="pl-field__msg" id="rg-${id}-msg"></span>
  </div>`;

const select = (id, label, options, full = false) => `
  <div class="pl-field ${full ? 'pl-field--full' : ''}">
    <label for="rg-${id}">${label}</label>
    <div class="pl-select pl-select--field">
      <select id="rg-${id}" name="${id}" required><option value="">Elegí una opción</option>${options.map((o) => `<option>${o}</option>`).join('')}</select>
      ${icon('chevron')}
    </div>
    <span class="pl-field__msg" id="rg-${id}-msg"></span>
  </div>`;

export const render = () => `
  <section class="pl-register">
    <div class="pl-container pl-register__grid">
      <div class="pl-register__intro">
        <p class="pl-eyebrow">Cuenta mayorista</p>
        <h1 class="pl-h1">Vendé PULSO en tu tienda.</h1>
        <p class="pl-lead">Creemos en los comercios que hacen las cosas a su manera. Por eso desarrollamos una propuesta mayorista flexible, simple y pensada para negocios reales.</p>
        <ul class="pl-register__perks">
          <li><span>${icon('eye')}</span><div><strong>Catálogo con precios</strong>Precio mayorista, PVP sugerido y margen de cada producto.</div></li>
          <li><span>${icon('bag')}</span><div><strong>Pedido mínimo de USD 150</strong>Combinando los productos que quieras.</div></li>
          <li><span>${icon('chat')}</span><div><strong>Una persona a cargo de tu cuenta</strong>Te ayuda con el primer pedido y la reposición.</div></li>
        </ul>
        <div class="pl-register__art" aria-hidden="true">
          <img src="${shapeImage('tote', 'lime')}" alt="" width="400" height="500">
          <img src="${shapeImage('planner', 'yellow')}" alt="" width="400" height="500">
        </div>
      </div>

      <div class="pl-register__card" data-state="form">
        <form class="pl-form pl-form--grid" novalidate>
          <h2 class="pl-form__title">Contanos sobre tu comercio</h2>
          ${field('nombre', 'Nombre', { auto: 'given-name' })}
          ${field('apellido', 'Apellido', { auto: 'family-name' })}
          ${field('email', 'Email', { type: 'email', auto: 'email', placeholder: 'tu@comercio.com' })}
          ${field('telefono', 'Teléfono', { type: 'tel', auto: 'tel', placeholder: '+598 99 000 000' })}
          ${field('comercio', 'Nombre del comercio', { auto: 'organization', full: true })}
          ${select('tipo', 'Tipo de comercio', TYPES)}
          ${field('ciudad', 'Ciudad', { auto: 'address-level2' })}
          ${select('pais', 'País', COUNTRIES)}
          ${field('web', 'Instagram / Web', { required: false, placeholder: '@tucomercio' })}
          ${select('volumen', 'Cantidad aproximada de compra mensual', VOLUMES, true)}
          <div class="pl-field pl-field--full">
            <label class="pl-check"><input type="checkbox" name="terminos" required><span></span>Acepto los términos y condiciones.</label>
            <span class="pl-field__msg" id="rg-terminos-msg"></span>
          </div>
          <button class="pl-btn pl-btn--primary pl-btn--lg pl-btn--block pl-field--full" type="submit">Solicitar acceso mayorista <span class="pl-btn__arrow">${icon('arrow')}</span></button>
          <p class="pl-form__note pl-field--full">Respondemos en 24 a 48 horas hábiles. Es una demo: los datos no se envían a ningún lado.</p>
        </form>
        <div class="pl-success" hidden tabindex="-1">
          <svg class="pl-check-anim" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="36" pathLength="1"/><path d="m24 41 11 11 22-24" pathLength="1"/></svg>
          <h2>Solicitud recibida ✓</h2>
          <p>Gracias<span data-name></span>. Nuestro equipo revisará tus datos y te contactará para activar tu cuenta.</p>
          <div class="pl-success__next">
            <p><strong>Mientras tanto</strong>, podés recorrer la experiencia mayorista con la cuenta demo.</p>
            <button type="button" class="pl-btn pl-btn--primary" data-action="open-demo">Probar acceso mayorista</button>
            <a class="pl-btn pl-btn--ghost" href="#/catalogo">Explorar catálogo</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;

const MSG = {
  valueMissing: 'Este dato es necesario.',
  typeMismatch: 'Revisá el formato.',
};

export const mount = (root) => {
  const form = $('form', root);
  const card = $('.pl-register__card', root);

  const check = (el) => {
    const msg = document.getElementById(`${el.id || `rg-${el.name}`}-msg`) ?? document.getElementById(`rg-${el.name}-msg`);
    const ok = el.checkValidity();
    el.setAttribute('aria-invalid', String(!ok));
    if (msg) {
      msg.textContent = ok ? '' : el.type === 'checkbox' ? 'Necesitamos que aceptes los términos.' : MSG[el.validity.valueMissing ? 'valueMissing' : 'typeMismatch'];
      el.setAttribute('aria-describedby', msg.id);
    }
    return ok;
  };

  form.addEventListener('blur', (e) => e.target.matches('input,select') && e.target.value && check(e.target), true);
  form.addEventListener('change', (e) => e.target.getAttribute('aria-invalid') === 'true' && check(e.target));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input,select')];
    const bad = fields.filter((f) => !check(f));
    if (bad.length) {
      bad[0].focus();
      return;
    }
    const btn = $('button[type="submit"]', form);
    btn.classList.add('is-loading');
    btn.disabled = true;
    setTimeout(() => {
      $('[data-name]', card).textContent = `, ${form.nombre.value.trim()}`;
      form.hidden = true;
      const ok = $('.pl-success', card);
      ok.hidden = false;
      card.dataset.state = 'done';
      ok.focus();
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  });
};
