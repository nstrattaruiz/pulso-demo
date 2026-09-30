/** Footer grande. */
import { logo } from '../ui/logo.js';
import { icon } from '../ui/icons.js';

export const renderFooter = () => {
  document.getElementById('pl-footer').innerHTML = `
    <div class="pl-footer__big" aria-hidden="true">
      <div class="pl-footer__marquee"><span>LO QUE MUEVE TU TIENDA · LO QUE MUEVE TU TIENDA · </span><span>LO QUE MUEVE TU TIENDA · LO QUE MUEVE TU TIENDA · </span></div>
    </div>
    <div class="pl-container pl-footer__grid">
      <div class="pl-footer__brand">
        <a href="#/" aria-label="PULSO, ir al inicio">${logo('pl-logo--light')}</a>
        <p class="pl-footer__slogan">Lo que mueve tu tienda.</p>
        <p class="pl-footer__small">Distribución mayorista de productos para comercios que quieren vender algo diferente.</p>
        <a class="pl-btn pl-btn--lime" href="#/registro">Solicitar cuenta mayorista <span class="pl-btn__arrow">${icon('arrow')}</span></a>
      </div>
      <nav class="pl-footer__col" aria-label="Catálogo">
        <h2>Catálogo</h2>
        <a href="#/catalogo?cat=hogar">Hogar</a>
        <a href="#/catalogo?cat=lifestyle">Lifestyle</a>
        <a href="#/catalogo?cat=regalos">Regalos</a>
        <a href="#/catalogo?cat=papeleria">Papelería</a>
        <a href="#/novedades">Novedades</a>
      </nav>
      <nav class="pl-footer__col" aria-label="Mayoristas">
        <h2>Mayoristas</h2>
        <a href="#/como-comprar">Cómo comprar</a>
        <a href="#/registro">Solicitar cuenta</a>
        <a href="#/como-comprar">Pedido mínimo</a>
        <a href="#/como-comprar">Envíos</a>
      </nav>
      <nav class="pl-footer__col" aria-label="PULSO">
        <h2>PULSO</h2>
        <a href="#/nosotros">Nosotros</a>
        <a href="mailto:hola@pulso.demo">Contacto</a>
        <a href="#/como-comprar">Preguntas frecuentes</a>
      </nav>
      <div class="pl-footer__col">
        <h2>Social</h2>
        <a href="#/" data-action="social">${icon('ig')} Instagram</a>
        <a href="#/" data-action="social">${icon('tiktok')} TikTok</a>
        <a href="#/" data-action="social">${icon('pinterest')} Pinterest</a>
      </div>
    </div>
    <div class="pl-container pl-footer__bottom">
      <p>© 2026 PULSO · Marca ficticia creada como demo</p>
      <div>
        <a href="#/como-comprar">Términos</a>
        <a href="#/como-comprar">Privacidad</a>
        <button type="button" class="pl-linkbtn" data-action="reset-demo">Reiniciar demo</button>
      </div>
    </div>`;
};
