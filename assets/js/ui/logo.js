/**
 * Logo PULSO: símbolo (círculo con la línea de pulso) + palabra.
 * El símbolo funciona solo (favicon, avatar, packaging). La línea se "dibuja" al hover.
 */

export const mark = (cls = '') => `
  <svg class="pl-mark ${cls}" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <circle cx="20" cy="20" r="20" style="fill: var(--mark-bg, #D1146E)"/>
    <path class="pl-mark__line" pathLength="1" d="M6.5 21h6l3-7.5 5 14 3.5-10 2.5 3.5h7" fill="none" style="stroke: var(--mark-fg, #C7F36B)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

export const logo = (cls = '') => `
  <span class="pl-logo ${cls}">
    ${mark()}
    <span class="pl-logo__word">PULSO</span>
  </span>`;
