/** Estados vacíos con una ilustración de formas simples. */

const ART = {
  heart: `<circle cx="60" cy="60" r="52" fill="#FFD84D"/><path d="M60 88s-26-15-26-34a14 14 0 0 1 26-7 14 14 0 0 1 26 7c0 19-26 34-26 34z" fill="#FF6B5E"/><circle cx="96" cy="22" r="8" fill="#6C4DFF"/>`,
  bag: `<circle cx="60" cy="60" r="52" fill="#C7F36B"/><path d="M34 46h52l-4 44a6 6 0 0 1-6 5H44a6 6 0 0 1-6-5z" fill="#6C4DFF"/><path d="M48 46v-6a12 12 0 0 1 24 0v6" stroke="#17171C" stroke-width="4" fill="none"/><rect x="92" y="14" width="14" height="14" rx="3" fill="#FF6B5E" transform="rotate(18 99 21)"/>`,
  box: `<circle cx="60" cy="60" r="52" fill="#19B5FE"/><path d="M30 50h60v38H30z" fill="#E3D5B6"/><path d="M30 50l-8-12h60l8 12z" fill="#CDBB96"/><path d="M90 50l8-12H82z" fill="#D9C9A8"/><path d="M44 70h32" stroke="#17171C" stroke-width="4" stroke-linecap="round" opacity=".4"/><circle cx="18" cy="24" r="7" fill="#FFD84D"/>`,
  search: `<circle cx="60" cy="60" r="52" fill="#F0ECFF"/><circle cx="54" cy="54" r="22" fill="none" stroke="#6C4DFF" stroke-width="8"/><path d="m70 70 16 16" stroke="#6C4DFF" stroke-width="8" stroke-linecap="round"/><circle cx="98" cy="24" r="7" fill="#C7F36B"/>`,
};

export const emptyState = ({ art = 'box', title, text, action = '' }) => `
  <div class="pl-empty" data-reveal>
    <svg class="pl-empty__art" viewBox="0 0 120 120" aria-hidden="true">${ART[art]}</svg>
    <h3>${title}</h3>
    <p>${text}</p>
    ${action}
  </div>`;
