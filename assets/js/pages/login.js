/** Login mayorista: pantalla dividida (marca a la izquierda, formulario a la derecha). */
import { login } from '../store.js';
import { icon } from '../ui/icons.js';
import { logo } from '../ui/logo.js';
import { toast } from '../ui/toast.js';
import { $ } from '../ui/format.js';
import { shapeImage } from '../ui/art.js';
import { openModal, closeModal } from '../components/modal.js';
import { DEMO } from '../components/demo.js';

export const title = 'Iniciar sesión';
export const guestOnly = true;

export const render = () => `
  <section class="pl-auth">
    <div class="pl-auth__brand">
      <a href="#/" class="pl-auth__logo" aria-label="PULSO, ir al inicio">${logo('pl-logo--light')}</a>
      <h1 class="pl-auth__title">Todo lo que tu tienda necesita.<br><span>En un solo lugar.</span></h1>
      <ul class="pl-auth__list">
        <li>${icon('check')} Precios mayoristas y PVP sugerido</li>
        <li>${icon('check')} Pedidos con stock en tiempo real</li>
        <li>${icon('check')} Historial y reposición en un clic</li>
      </ul>
      <div class="pl-auth__float" aria-hidden="true">
        <img src="${shapeImage('lamp', 'blue')}" alt="" width="400" height="500">
        <img src="${shapeImage('sticky', 'lime')}" alt="" width="400" height="500">
        <img src="${shapeImage('giftbox', 'coral')}" alt="" width="400" height="500">
      </div>
    </div>

    <div class="pl-auth__panel">
      <form class="pl-form pl-auth__form" novalidate>
        <p class="pl-eyebrow">Acceso mayorista</p>
        <h2 class="pl-h2">Ingresá a tu cuenta</h2>
        <div class="pl-field">
          <label for="lg-email">Email</label>
          <input id="lg-email" name="email" type="email" autocomplete="email" required placeholder="tu@comercio.com">
        </div>
        <div class="pl-field">
          <label for="lg-pass">Contraseña</label>
          <div class="pl-field__pass">
            <input id="lg-pass" name="password" type="password" autocomplete="current-password" required placeholder="••••••••">
            <button type="button" class="pl-field__toggle" data-toggle-pass aria-label="Mostrar contraseña" aria-pressed="false">${icon('eye')}</button>
          </div>
        </div>
        <div class="pl-form__row">
          <label class="pl-check"><input type="checkbox" name="remember" checked><span></span>Recordarme</label>
          <button type="button" class="pl-linkbtn" data-forgot>¿Olvidaste tu contraseña?</button>
        </div>
        <p class="pl-form__error" role="alert" hidden></p>
        <button class="pl-btn pl-btn--primary pl-btn--lg pl-btn--block" type="submit">Ingresar <span class="pl-btn__arrow">${icon('arrow')}</span></button>
        <p class="pl-auth__alt">¿Todavía no tenés cuenta? <a href="#/registro">Solicitar acceso mayorista</a></p>
      </form>

      <aside class="pl-auth__demo" aria-label="Cuenta demo">
        <div>
          <p class="pl-auth__demo-title">${icon('eye')} ¿Estás recorriendo la demo?</p>
          <p>Usá <code>${DEMO.email}</code> · <code>${DEMO.password}</code></p>
        </div>
        <button type="button" class="pl-btn pl-btn--ghost pl-btn--sm" data-fill>Completar</button>
      </aside>
    </div>
  </section>`;

export const mount = (root) => {
  const form = $('form', root);
  const err = $('.pl-form__error', form);
  const email = form.email;
  const pass = form.password;

  const fail = (msg, field) => {
    err.textContent = msg;
    err.hidden = false;
    form.classList.remove('is-shake');
    void form.offsetWidth;
    form.classList.add('is-shake');
    field?.setAttribute('aria-invalid', 'true');
    field?.focus();
  };

  form.addEventListener('input', (e) => {
    e.target.removeAttribute('aria-invalid');
    err.hidden = true;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) return fail('Ingresá un email válido.', email);
    if (!pass.value) return fail('Ingresá tu contraseña.', pass);
    const btn = $('button[type="submit"]', form);
    btn.classList.add('is-loading');
    btn.disabled = true;
    setTimeout(() => {
      if (login(email.value, pass.value, form.remember.checked)) {
        toast('Bienvenido a PULSO', { icon: 'check', tone: 'purple' });
      } else {
        btn.classList.remove('is-loading');
        btn.disabled = false;
        fail('El email o la contraseña no coinciden. Revisalos e intentá de nuevo.', pass);
      }
    }, 650);
  });

  $('[data-toggle-pass]', form).addEventListener('click', (e) => {
    const b = e.currentTarget;
    const show = pass.type === 'password';
    pass.type = show ? 'text' : 'password';
    b.setAttribute('aria-pressed', String(show));
    b.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });

  $('[data-fill]', root).addEventListener('click', () => {
    email.value = DEMO.email;
    pass.value = DEMO.password;
    err.hidden = true;
    $('button[type="submit"]', form).focus();
  });

  $('[data-forgot]', form).addEventListener('click', (e) =>
    openModal({
      from: e.currentTarget,
      title: 'Recuperar contraseña',
      body: `
        <p class="pl-modal__lead">Te enviamos un enlace para crear una contraseña nueva.</p>
        <form class="pl-form" data-reset novalidate>
          <div class="pl-field"><label for="rs-email">Email de tu cuenta</label><input id="rs-email" type="email" required value="${email.value}" placeholder="tu@comercio.com"></div>
          <button class="pl-btn pl-btn--primary pl-btn--block" type="submit">Enviar enlace</button>
        </form>`,
      onMount: (m) =>
        $('[data-reset]', m).addEventListener('submit', (ev) => {
          ev.preventDefault();
          closeModal();
          toast('Listo: revisá tu email (en la demo no se envía nada).', { icon: 'mail' });
        }),
    }),
  );
};
