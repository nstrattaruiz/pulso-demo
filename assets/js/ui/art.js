/**
 * Arte de producto en SVG (placeholder ilustrado, liviano y con la paleta de la marca).
 * Si un producto trae `images` (fotos reales), se usan esas y esto queda como respaldo.
 *
 * productImages(p) → [{ src, alt }, ...]  (4 vistas: principal, detalle, packaging, en tienda)
 * sceneImage(name) → src                   (fotos editoriales de "Nosotros")
 */
import { esc } from './format.js';

export const TONES = {
  purple: { bg: '#6C4DFF', a: '#C7F36B', b: '#FFD84D', c: '#F7F5EF', ink: '#17171C' },
  blue: { bg: '#19B5FE', a: '#FF6B5E', b: '#FFD84D', c: '#F7F5EF', ink: '#17171C' },
  coral: { bg: '#FF6B5E', a: '#6C4DFF', b: '#FFD84D', c: '#F7F5EF', ink: '#17171C' },
  yellow: { bg: '#FFD84D', a: '#6C4DFF', b: '#FF6B5E', c: '#F7F5EF', ink: '#17171C' },
  lime: { bg: '#C7F36B', a: '#6C4DFF', b: '#FF6B5E', c: '#F7F5EF', ink: '#17171C' },
  dark: { bg: '#17171C', a: '#C7F36B', b: '#6C4DFF', c: '#FF6B5E', ink: '#F7F5EF' },
  cream: { bg: '#EFEBE0', a: '#6C4DFF', b: '#19B5FE', c: '#FF6B5E', ink: '#17171C' },
};

const DARK = '#17171C';
const pulse = (x, y, s = 1, color = '#fff', w = 8) =>
  `<path d="M${x} ${y} h${30 * s} l${12 * s} ${-30 * s} l${20 * s} ${60 * s} l${14 * s} ${-40 * s} l${10 * s} ${14 * s} h${30 * s}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const flame = (x, y) =>
  `<path d="M${x} ${y - 30} C${x + 14} ${y - 12} ${x + 12} ${y} ${x} ${y} C${x - 12} ${y} ${x - 14} ${y - 12} ${x} ${y - 30}Z" fill="#FFD84D"/><path d="M${x} ${y - 16} c6 8 5 14 0 14 c-5 0 -6 -6 0 -14z" fill="#FF6B5E"/>`;

/* ---------- Objetos (centrados en x=200, apoyados en y=400) ---------- */
const SHAPES = {
  lamp: (t) => `
    <defs><radialGradient id="g" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#FFFDF0"/><stop offset=".55" stop-color="#FFF1B8"/><stop offset="1" stop-color="${t.b}"/></radialGradient></defs>
    <circle cx="200" cy="250" r="118" fill="#FFF6C9" opacity=".22"/>
    <rect x="148" y="370" width="104" height="30" rx="12" fill="${DARK}"/>
    <rect x="193" y="320" width="14" height="54" fill="${DARK}"/>
    <circle cx="200" cy="250" r="82" fill="url(#g)"/>
    <ellipse cx="172" cy="218" rx="22" ry="13" fill="#fff" opacity=".7" transform="rotate(-30 172 218)"/>`,
  vase: (t) => `
    <path d="M200 170 C200 120 230 96 262 84 M200 150 C196 118 168 100 138 96" stroke="#2f6d3a" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="266" cy="82" r="16" fill="${t.b}"/><circle cx="134" cy="94" r="14" fill="${t.c}"/><circle cx="222" cy="112" r="11" fill="${t.b}"/>
    <path d="M165 400 C128 340 140 285 168 245 C180 228 178 205 176 185 C175 176 181 170 190 170 H210 C219 170 225 176 224 185 C222 205 220 228 232 245 C260 285 272 340 235 400Z" fill="${t.a}"/>
    <path d="M147 300 C182 314 218 314 253 300" stroke="${t.c}" stroke-width="10" fill="none" opacity=".9"/>
    <path d="M142 330 C180 346 220 346 258 330" stroke="${t.b}" stroke-width="10" fill="none"/>
    <path d="M178 250 C166 280 164 320 174 360" stroke="#fff" stroke-width="8" fill="none" opacity=".35" stroke-linecap="round"/>`,
  tray: (t) => `
    <ellipse cx="200" cy="378" rx="138" ry="44" fill="${DARK}" opacity=".18"/>
    <ellipse cx="200" cy="364" rx="136" ry="44" fill="${t.a}"/>
    <ellipse cx="200" cy="356" rx="120" ry="34" fill="${t.c}"/>
    <circle cx="160" cy="350" r="16" fill="none" stroke="${t.b}" stroke-width="7"/>
    <rect x="200" y="336" width="54" height="16" rx="8" fill="${DARK}" transform="rotate(-12 227 344)"/>
    <circle cx="258" cy="332" r="9" fill="none" stroke="${DARK}" stroke-width="5"/>`,
  candle: (t) => `
    <path d="M150 262 Q150 250 162 250 H238 Q250 250 250 262 V400 H150Z" fill="${t.c}"/>
    <rect x="150" y="285" width="100" height="55" fill="${t.b}"/>
    <path d="M150 340 H250 V388 Q250 400 238 400 H162 Q150 400 150 388Z" fill="${t.a}"/>
    <path d="M200 250 V234" stroke="${DARK}" stroke-width="4" stroke-linecap="round"/>${flame(200, 232)}
    <rect x="160" y="262" width="10" height="120" rx="5" fill="#fff" opacity=".35"/>`,
  bottle: (t) => `
    <rect x="160" y="190" width="80" height="210" rx="32" fill="${t.a}"/>
    <rect x="160" y="262" width="80" height="34" fill="${t.b}"/>
    <rect x="172" y="146" width="56" height="50" rx="14" fill="${t.c}"/>
    <path d="M186 146 C186 116 214 116 214 146" stroke="${t.c}" stroke-width="9" fill="none"/>
    <rect x="172" y="212" width="10" height="160" rx="5" fill="#fff" opacity=".35"/>`,
  bottleWave: (t) => `
    <rect x="164" y="170" width="72" height="230" rx="28" fill="${t.a}"/>
    <rect x="174" y="132" width="52" height="44" rx="12" fill="${DARK}"/>
    <path d="M164 300 q18 -20 36 0 t36 0" stroke="${t.b}" stroke-width="9" fill="none"/>
    <path d="M164 326 q18 -20 36 0 t36 0" stroke="${t.c}" stroke-width="9" fill="none"/>
    <rect x="176" y="190" width="9" height="180" rx="4.5" fill="#fff" opacity=".35"/>`,
  mug: (t) => `
    <path d="M256 290 q54 0 54 42 q0 42 -54 42" stroke="${t.c}" stroke-width="20" fill="none"/>
    <rect x="136" y="250" width="124" height="150" rx="22" fill="${t.c}"/>
    <path d="M136 272 Q136 250 158 250 H238 Q260 250 260 272 V278 H136Z" fill="${t.a}"/>
    <circle cx="198" cy="334" r="20" fill="${t.a}"/>${pulse(170, 334, .45, t.c, 5)}
    <path d="M175 230 c-10 -14 10 -22 0 -40 M210 226 c-10 -14 10 -22 0 -40" stroke="#fff" stroke-width="6" fill="none" opacity=".7" stroke-linecap="round"/>`,
  tote: (t) => `
    <path d="M162 236 C162 150 238 150 238 236" stroke="${t.c}" stroke-width="11" fill="none"/>
    <path d="M128 232 H272 L288 404 H112Z" fill="${t.c}"/>
    ${pulse(134, 330, 1.15, t.a, 9)}
    <path d="M128 232 H272 L274 252 H126Z" fill="${DARK}" opacity=".08"/>`,
  giftbox: (t) => `
    <rect x="126" y="276" width="148" height="124" rx="6" fill="${t.a}"/>
    <rect x="114" y="244" width="172" height="42" rx="8" fill="${t.a}"/><rect x="114" y="276" width="172" height="10" fill="${DARK}" opacity=".15"/>
    <rect x="190" y="244" width="20" height="156" fill="${t.b}"/>
    <ellipse cx="176" cy="232" rx="28" ry="16" fill="${t.b}" transform="rotate(-25 176 232)"/><ellipse cx="224" cy="232" rx="28" ry="16" fill="${t.b}" transform="rotate(25 224 232)"/>
    <circle cx="200" cy="240" r="10" fill="${t.c}"/>`,
  weekend: (t) => `
    <rect x="262" y="262" width="46" height="138" rx="18" fill="${t.c}"/><rect x="270" y="238" width="30" height="28" rx="8" fill="${DARK}"/>
    <rect x="96" y="296" width="170" height="104" rx="34" fill="${t.a}"/>
    <path d="M120 318 H242" stroke="${t.b}" stroke-width="6" stroke-linecap="round"/><circle cx="244" cy="318" r="7" fill="${t.b}"/>
    <path d="M118 250 Q180 232 250 250" stroke="${DARK}" stroke-width="5" fill="none"/>
    <ellipse cx="158" cy="260" rx="32" ry="20" fill="${DARK}"/><ellipse cx="214" cy="260" rx="32" ry="20" fill="${DARK}"/>`,
  surprise: (t) => `
    <rect x="118" y="244" width="164" height="156" rx="8" fill="${t.a}"/>
    <rect x="108" y="226" width="184" height="34" rx="8" fill="${t.a}"/><rect x="108" y="252" width="184" height="8" fill="${DARK}" opacity=".18"/>
    <text x="200" y="370" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="110" fill="${t.c}">?</text>
    <circle cx="112" cy="176" r="9" fill="${t.c}"/><rect x="270" y="160" width="18" height="18" rx="3" fill="${t.a}" transform="rotate(20 279 169)"/>
    <circle cx="300" cy="212" r="7" fill="${DARK}"/><rect x="146" y="150" width="14" height="14" fill="${DARK}" transform="rotate(35 153 157)"/><circle cx="232" cy="176" r="6" fill="${t.c}"/>`,
  relax: (t) => `
    <ellipse cx="282" cy="392" rx="46" ry="14" fill="${DARK}" opacity=".15"/>
    <rect x="236" y="342" width="92" height="50" rx="12" fill="${t.b}"/><ellipse cx="282" cy="342" rx="46" ry="14" fill="${t.c}"/>
    <rect x="96" y="262" width="118" height="138" rx="18" fill="${t.c}" opacity=".95"/>
    <rect x="96" y="310" width="118" height="46" fill="${t.a}"/>
    <path d="M155 262 V246" stroke="${DARK}" stroke-width="4" stroke-linecap="round"/>${flame(155, 244)}
    <text x="155" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="14" letter-spacing="2" fill="${t.c}">RELAX</text>`,
  notebook: (t) => `
    <g transform="rotate(-6 200 280)">
      <rect x="126" y="150" width="150" height="250" rx="12" fill="${t.a}"/>
      <rect x="126" y="150" width="18" height="250" fill="${DARK}" opacity=".15"/>
      <path d="M160 190 H250 M160 210 H250 M160 230 H250 M175 180 V240 M200 180 V240 M225 180 V240" stroke="#fff" stroke-width="2" opacity=".35"/>
      <rect x="160" y="300" width="84" height="26" rx="6" fill="${t.c}"/>
      <rect x="252" y="150" width="9" height="250" fill="${DARK}"/>
    </g>`,
  planner: (t) => `
    <g transform="rotate(5 200 280)">
      <rect x="120" y="160" width="164" height="236" rx="14" fill="${t.a}"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${140 + i * 25}" cy="160" r="7" fill="none" stroke="${DARK}" stroke-width="5"/>`).join('')}
      <text x="202" y="290" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="52" fill="${t.c}">2027</text>
      <rect x="150" y="310" width="104" height="10" rx="5" fill="${t.b}"/>
      <circle cx="256" cy="360" r="16" fill="${t.b}"/><circle cx="150" cy="210" r="10" fill="${t.c}"/>
    </g>`,
  sticky: (t) => `
    <rect x="96" y="250" width="120" height="120" rx="6" fill="${t.b}" transform="rotate(-12 156 310)"/>
    <rect x="184" y="236" width="120" height="120" rx="6" fill="${t.c}" transform="rotate(10 244 296)"/>
    <rect x="130" y="196" width="120" height="120" rx="6" fill="${t.a}" transform="rotate(-4 190 256)"/>
    <rect x="150" y="290" width="120" height="110" rx="6" fill="${DARK}"/>
    <path d="M168 318 H250 M168 338 H236 M168 358 H244" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>`,
  desk: (t) => `
    <rect x="94" y="364" width="130" height="36" rx="14" fill="${t.c}"/>
    <circle cx="130" cy="362" r="8" fill="${t.b}"/><rect x="152" y="356" width="44" height="8" rx="4" fill="${DARK}"/>
    <rect x="236" y="186" width="10" height="130" rx="4" fill="${t.b}" transform="rotate(-10 241 250)"/>
    <rect x="262" y="176" width="10" height="140" rx="4" fill="${t.c}"/>
    <rect x="286" y="194" width="10" height="120" rx="4" fill="${DARK}" transform="rotate(12 291 254)"/>
    <rect x="224" y="282" width="92" height="118" rx="12" fill="${t.a}"/>
    ${pulse(236, 342, .7, t.c, 6)}`,
  keychain: (t) => `
    <circle cx="200" cy="148" r="30" fill="none" stroke="#d9d9d9" stroke-width="8"/>
    <path d="M200 178 V206" stroke="#d9d9d9" stroke-width="6"/>
    <rect x="136" y="206" width="128" height="180" rx="46" fill="${t.a}"/>
    <circle cx="200" cy="232" r="9" fill="${t.c}" opacity=".9"/>
    ${pulse(142, 312, 1.12, t.c, 9)}`,
  pins: (t) => `
    <circle cx="146" cy="238" r="54" fill="${t.a}" stroke="#fff" stroke-width="6"/>
    <path d="M146 262s-26-16-26-34a13 13 0 0 1 26-5 13 13 0 0 1 26 5c0 18-26 34-26 34z" fill="${t.c}"/>
    <circle cx="256" cy="262" r="50" fill="${DARK}" stroke="#fff" stroke-width="6"/>
    ${pulse(218, 264, .62, t.b, 6)}
    <circle cx="196" cy="346" r="46" fill="${t.b}" stroke="#fff" stroke-width="6"/>
    <path d="M196 318 l8 18 20 2 -15 13 5 20 -18-11 -18 11 5-20 -15-13 20-2z" fill="${t.c}"/>`,
  clip: (t) => `
    <path d="M100 300 q25 -60 50 0 t50 0 t50 0 t50 0" stroke="${t.a}" stroke-width="46" fill="none" stroke-linecap="round"/>
    <path d="M100 300 q25 -60 50 0 t50 0 t50 0 t50 0" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".35" transform="translate(0 -12)"/>
    ${[120, 170, 220, 270].map((x) => `<rect x="${x}" y="322" width="12" height="46" rx="6" fill="${t.a}"/>`).join('')}`,
  strap: (t) => `
    <rect x="164" y="340" width="72" height="60" rx="12" fill="${DARK}"/>
    <path d="M200 342 C120 300 100 180 160 150 C210 126 250 176 230 230 C214 274 200 300 200 342" stroke="${t.b}" stroke-width="10" fill="none"/>
    ${[[134, 214, t.a], [150, 168, t.c], [196, 144, t.a], [240, 176, t.c], [226, 246, '#fff'], [210, 296, t.a]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="15" fill="${c}"/>`).join('')}`,
};

const shadow = '<ellipse cx="200" cy="404" rx="118" ry="14" fill="#000" opacity=".16"/>';
const wrap = (bg, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500"><rect width="400" height="500" fill="${bg}"/>${inner}</svg>`;
const uri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
const scaleAt = (s, cx = 200, cy = 400) => `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`;

const packaging = (p, t) => `
  <path d="M110 210 L200 170 L300 206 L210 250Z" fill="#fff"/>
  <path d="M210 250 L300 206 V376 L210 420Z" fill="#DCD6C8"/>
  <path d="M110 210 L210 250 V420 L110 380Z" fill="${t.c === '#F7F5EF' ? '#F7F5EF' : '#fff'}"/>
  <g transform="matrix(1 .4 0 1 110 210)">
    <circle cx="50" cy="52" r="24" fill="#6C4DFF"/>
    <path d="M34 53 h8 l4-10 6 18 4-12 3 4 h9" fill="none" stroke="#C7F36B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="50" y="106" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="20" fill="${DARK}">PULSO</text>
    <text x="50" y="126" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" letter-spacing="1" fill="${DARK}">${esc(p.name.toUpperCase())}</text>
    <rect x="18" y="140" width="64" height="4" rx="2" fill="${t.bg}"/>
  </g>`;

const cache = new Map();

export const productImages = (p) => {
  if (p.images?.length) return p.images.map((src, i) => ({ src, alt: `${p.name}, foto ${i + 1}` }));
  if (cache.has(p.id)) return cache.get(p.id);
  const t = TONES[p.tone] ?? TONES.purple;
  const draw = SHAPES[p.shape] ?? SHAPES.giftbox;
  const deco = `<circle cx="330" cy="92" r="150" fill="#fff" opacity=".13"/><circle cx="54" cy="468" r="90" fill="#000" opacity=".05"/>`;
  const alt = TONES[p.tone === 'dark' ? 'lime' : 'cream'];
  const views = [
    { svg: wrap(t.bg, deco + shadow + draw(t)), alt: `${p.name}, vista principal` },
    { svg: wrap(alt.bg, `<circle cx="200" cy="250" r="190" fill="${t.bg}" opacity=".9"/><g transform="${scaleAt(1.28, 200, 330)}">${draw(t)}</g>`), alt: `${p.name}, detalle` },
    { svg: wrap(t.bg, deco + '<ellipse cx="205" cy="418" rx="120" ry="14" fill="#000" opacity=".18"/>' + packaging(p, t)), alt: `${p.name}, packaging` },
    {
      svg: wrap('#F7F5EF', `<rect y="0" width="400" height="500" fill="${t.bg}" opacity=".18"/><g transform="${scaleAt(.78, 200, 402)}">${draw(t)}</g>
        <rect x="0" y="402" width="400" height="16" fill="${DARK}"/><rect x="0" y="418" width="400" height="82" fill="#E7E1D3"/>
        <rect x="46" y="424" width="92" height="30" rx="4" fill="#fff"/><text x="92" y="444" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="11" fill="${DARK}">${esc(p.sku)}</text>`),
      alt: `${p.name}, exhibido en tienda`,
    },
  ].map((v) => ({ src: uri(v.svg), alt: v.alt }));
  cache.set(p.id, views);
  return views;
};

export const productImage = (p, i = 0) => productImages(p)[i] ?? productImages(p)[0];

/** Arte suelto por forma y tono (categorías, hero, secciones). */
export const shapeImage = (shape, tone = 'purple', { plain = false } = {}) => {
  const key = `${shape}:${tone}:${plain}`;
  if (cache.has(key)) return cache.get(key);
  const t = TONES[tone];
  const deco = plain ? '' : `<circle cx="330" cy="92" r="150" fill="#fff" opacity=".13"/>`;
  const src = uri(wrap(t.bg, deco + shadow + (SHAPES[shape] ?? SHAPES.giftbox)(t)));
  cache.set(key, src);
  return src;
};

/* ---------- Escenas editoriales (Nosotros) ---------- */
const box = (x, y, w, h, c = '#D9C9A8', logo = true) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${c}"/>
  <rect x="${x}" y="${y + h / 2 - 5}" width="${w}" height="10" fill="#000" opacity=".08"/>
  ${logo ? `<circle cx="${x + w / 2}" cy="${y + h / 2 - 20}" r="${Math.min(w, h) / 7}" fill="#6C4DFF"/>` : ''}`;

const SCENES = {
  productos: () => wrap('#6C4DFF', `<g transform="translate(-40 -40) scale(.6)">${SHAPES.lamp(TONES.purple)}</g><g transform="translate(160 -30) scale(.6)">${SHAPES.mug(TONES.purple)}</g><g transform="translate(-40 190) scale(.6)">${SHAPES.sticky(TONES.purple)}</g><g transform="translate(160 190) scale(.6)">${SHAPES.giftbox(TONES.purple)}</g>`),
  packaging: () => wrap('#FFD84D', `<ellipse cx="200" cy="420" rx="150" ry="16" fill="#000" opacity=".15"/>${box(90, 300, 130, 110)}${box(210, 320, 110, 90, '#CDBB96')}${box(130, 200, 120, 100, '#E3D5B6')}
    <path d="M150 190 C170 150 220 150 240 190" stroke="#FF6B5E" stroke-width="10" fill="none"/>
    <text x="200" y="110" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="30" fill="#17171C">PULSO</text>`),
  deposito: () => wrap('#17171C', `${[140, 270, 400].map((y) => `<rect x="30" y="${y}" width="340" height="10" fill="#6C4DFF"/>`).join('')}
    <rect x="30" y="20" width="10" height="400" fill="#6C4DFF"/><rect x="360" y="20" width="10" height="400" fill="#6C4DFF"/>
    ${[[50, 70], [130, 80], [220, 60], [290, 70]].map(([x, h]) => box(x, 140 - h, 66, h, '#D9C9A8')).join('')}
    ${[[50, 90], [140, 70], [230, 100]].map(([x, h]) => box(x, 270 - h, 76, h, '#CDBB96')).join('')}
    ${[[60, 80], [160, 90], [260, 70]].map(([x, h]) => box(x, 400 - h, 80, h, '#E3D5B6')).join('')}
    <circle cx="336" cy="200" r="6" fill="#C7F36B"/>`),
  preparacion: () => wrap('#C7F36B', `<ellipse cx="190" cy="430" rx="160" ry="16" fill="#000" opacity=".15"/>
    <path d="M60 300 H300 V420 H60Z" fill="#CDBB96"/><path d="M60 300 L20 250 H260 L300 300Z" fill="#E3D5B6"/>
    <g transform="translate(40 -90) scale(.55)">${SHAPES.candle(TONES.lime)}</g><g transform="translate(130 -100) scale(.55)">${SHAPES.bottle(TONES.lime)}</g>
    <rect x="248" y="90" width="120" height="160" rx="10" fill="#fff" transform="rotate(8 308 170)"/>
    ${[0, 1, 2, 3].map((i) => `<g transform="rotate(8 308 170)"><path d="M266 ${126 + i * 30} l6 6 10-12" stroke="#6C4DFF" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="290" y="${122 + i * 30}" width="60" height="8" rx="4" fill="#17171C" opacity=".2"/></g>`).join('')}`),
};

export const sceneImage = (name) => {
  const key = `scene:${name}`;
  if (!cache.has(key)) cache.set(key, uri(SCENES[name]()));
  return cache.get(key);
};
