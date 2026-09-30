/**
 * "Probar acceso mayorista": una píldora discreta que presenta la cuenta demo
 * como parte de la experiencia (no como un truco técnico).
 * Logueado, la misma píldora permite volver a ver el sitio como visitante.
 */
import { isLogged, login, logout, user, on } from '../store.js';
import { openModal, closeModal } from './modal.js';
import { icon } from '../ui/icons.js';
import { mark } from '../ui/logo.js';
import { toast } from '../ui/toast.js';

export const DEMO = { email: 'martina@tienda.com', password: 'demo123' };

const pill = document.createElement('div');
pill.className = 'pl-demo';

const render = () => {
  const u = user();
  pill.innerHTML = u
    ? `<span class="pl-demo__dot" aria-hidden="true"></span><span class="pl-demo__txt">Viendo como <strong>mayorista</strong></span>
       <button type="button" data-action="demo-visitor">Ver como visitante</button>`
    : `<span class="pl-demo__dot" aria-hidden="true"></span><button type="button" data-action="open-demo">${icon('eye')} Probar acceso mayorista</button>`;
};

export const demoCredentials = (compact = false) => `
  <div class="pl-demo-card ${compact ? 'is-compact' : ''}">
    <p class="pl-demo-card__label">${mark()} Cuenta demo</p>
    <dl>
      <div><dt>Usuario</dt><dd><code>${DEMO.email}</code></dd></div>
      <div><dt>Contraseña</dt><dd><code>${DEMO.password}</code></dd></div>
    </dl>
  </div>`;

export const demoLogin = () => {
  login(DEMO.email, DEMO.password, true);
  toast('Bienvenido a PULSO', { icon: 'check', tone: 'purple' });
};

export const openDemo = (from) =>
  openModal({
    from,
    size: 'is-demo',
    title: 'Mirá PULSO con ojos de comercio.',
    body: `
      <p class="pl-modal__lead">Para explorar la experiencia mayorista podés ingresar con una cuenta demo: vas a ver precios, armar un pedido, enviarlo y revisar tu historial.</p>
      ${demoCredentials()}
      <ol class="pl-demo-steps">
        <li><span>1</span>Precios mayoristas y PVP sugerido</li>
        <li><span>2</span>Pedido con mínimo de compra</li>
        <li><span>3</span>Historial, favoritos y reposición</li>
      </ol>
      <div class="pl-modal__actions">
        <button type="button" class="pl-btn pl-btn--primary" data-action="demo-login">Ingresar con la cuenta demo <span class="pl-btn__arrow">${icon('arrow')}</span></button>
        <a class="pl-btn pl-btn--ghost" href="#/login">Ir al login</a>
      </div>`,
  });

export const initDemo = () => {
  render();
  document.body.append(pill);
  on('auth', render);

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-action]');
    if (!t) return;
    if (t.dataset.action === 'open-demo') openDemo(t);
    if (t.dataset.action === 'demo-login') {
      closeModal();
      demoLogin();
      if (/^#\/(login|registro)/.test(location.hash)) location.hash = '#/catalogo';
    }
    if (t.dataset.action === 'demo-visitor' && isLogged()) {
      logout();
      toast('Ahora estás viendo PULSO como visitante', { icon: 'eye' });
      if (location.hash.startsWith('#/cuenta') || location.hash.startsWith('#/pedido')) location.hash = '#/';
    }
  });
};
