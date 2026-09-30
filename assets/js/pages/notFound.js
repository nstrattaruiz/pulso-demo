/** 404 divertida. */
import { icon } from '../ui/icons.js';

export const title = 'Página no encontrada';

export const render = () => `
  <section class="pl-404">
    <div class="pl-container pl-404__grid">
      <div>
        <p class="pl-eyebrow">Error 404</p>
        <h1 class="pl-h1">Parece que este producto se nos fue del depósito.</h1>
        <p class="pl-lead">Lo buscamos en todas las estanterías y nada. Pero hay otros 20 esperando.</p>
        <a class="pl-btn pl-btn--primary pl-btn--lg" href="#/catalogo">Volver al catálogo <span class="pl-btn__arrow">${icon('arrow')}</span></a>
      </div>
      <svg class="pl-404__art" viewBox="0 0 320 300" aria-hidden="true">
        <ellipse cx="160" cy="276" rx="130" ry="14" fill="#17171C" opacity=".12"/>
        <g class="pl-404__box">
          <path d="M60 140h200v130H60z" fill="#E3D5B6"/>
          <path d="M60 140 30 96h200l30 44z" fill="#CDBB96"/>
          <path d="M260 140l30-44h-60z" fill="#D9C9A8"/>
          <circle cx="160" cy="200" r="22" fill="#6C4DFF"/>
          <path d="M146 201h6l3-8 5 14 4-9 2 3h6" fill="none" stroke="#C7F36B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text class="pl-404__q" x="228" y="70" font-family="Unbounded, Arial Black, sans-serif" font-weight="800" font-size="64" fill="#FF6B5E">?</text>
        <circle class="pl-404__dot" cx="70" cy="60" r="12" fill="#FFD84D"/>
        <rect class="pl-404__dot" x="120" y="30" width="18" height="18" rx="4" fill="#19B5FE" transform="rotate(18 129 39)"/>
      </svg>
    </div>
  </section>`;
