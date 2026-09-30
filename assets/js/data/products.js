/**
 * Catálogo demo de PULSO. Todo ficticio.
 * Cada producto genera automáticamente su card, su página y su arte (ver ui/art.js).
 * Para usar fotos reales: agregar `images: ['assets/img/productos/pul-hog-001-1.jpg', ...]`.
 */

export const CATEGORIES = [
  { slug: 'hogar', name: 'Hogar', desc: 'Decoración, organización y pequeños objetos.', tone: 'purple', hero: 'lamp' },
  { slug: 'lifestyle', name: 'Lifestyle', desc: 'Productos de uso cotidiano.', tone: 'blue', hero: 'bottle' },
  { slug: 'regalos', name: 'Regalos', desc: 'Productos pensados para regalar.', tone: 'coral', hero: 'giftbox' },
  { slug: 'papeleria', name: 'Papelería', desc: 'Cuadernos, planners y accesorios.', tone: 'yellow', hero: 'sticky' },
  { slug: 'accesorios', name: 'Accesorios', desc: 'Productos pequeños de alta rotación.', tone: 'lime', hero: 'keychain' },
  { slug: 'novedades', name: 'Novedades', desc: 'Los últimos productos incorporados.', tone: 'dark', hero: 'vase', virtual: true },
];

export const PRODUCTS = [
  // ---------------- HOGAR ----------------
  {
    id: 1, slug: 'lampara-mini-orb', name: 'Lámpara Mini Orb', sku: 'PUL-HOG-001', category: 'hogar', sub: 'Iluminación',
    price: 18.5, retail: 34, min: 6, stock: 42, isNew: true, best: false, tone: 'blue', shape: 'lamp',
    desc: 'Una esfera de luz cálida sobre una base mínima. Ocupa poco lugar en el mostrador y se lleva todas las miradas: es el tipo de producto que la gente levanta, prende y se lleva.',
    specs: { Medidas: '14 × 14 × 19 cm', Material: 'Vidrio opalino y base de metal', Luz: 'LED cálida 3000K · USB-C', Presentación: 'Caja individual lista para regalo' },
    store: { where: ['Concept stores', 'Tiendas de decoración', 'Regalerías'], tip: 'Exhibila encendida y a la altura de los ojos: prendida vende el doble que apagada.' },
    tags: ['luz', 'lampara', 'deco', 'escritorio'],
  },
  {
    id: 2, slug: 'jarron-pop', name: 'Jarrón Pop', sku: 'PUL-HOG-002', category: 'hogar', sub: 'Floreros',
    price: 14, retail: 26, min: 6, stock: 36, isNew: true, best: false, tone: 'coral', shape: 'vase',
    desc: 'Cerámica esmaltada con curvas generosas y colores que no piden permiso. Funciona con flores, con ramas secas o solo, como objeto.',
    specs: { Medidas: '12 × 12 × 22 cm', Material: 'Cerámica esmaltada', Colores: 'Coral, lima y lavanda', Presentación: 'Caja con protección interna' },
    store: { where: ['Tiendas de decoración', 'Floristerías', 'Boutiques'], tip: 'Armá una isla con los tres colores juntos: el cliente elige uno y muchas veces se lleva dos.' },
    tags: ['florero', 'ceramica', 'deco'],
  },
  {
    id: 3, slug: 'bandeja-loop', name: 'Bandeja Loop', sku: 'PUL-HOG-003', category: 'hogar', sub: 'Organización',
    price: 12, retail: 22, min: 6, stock: 58, isNew: false, best: false, tone: 'yellow', shape: 'tray',
    desc: 'Bandeja ovalada para llaves, anillos o el café de la mañana. Orden con estilo para la entrada, la mesa de luz o el escritorio.',
    specs: { Medidas: '24 × 14 × 3 cm', Material: 'Resina con acabado mate', Colores: 'Amarillo, violeta y crema', Presentación: 'Bolsa compostable' },
    store: { where: ['Tiendas de decoración', 'Lifestyle', 'Hoteles boutique'], tip: 'Usala como exhibidor de otros productos chicos: vende sola y además ordena tu mostrador.' },
    tags: ['bandeja', 'organizador', 'deco'],
  },
  {
    id: 4, slug: 'vela-color-block', name: 'Vela Color Block', sku: 'PUL-HOG-004', category: 'hogar', sub: 'Aromas',
    price: 8.5, retail: 16, min: 12, stock: 120, isNew: false, best: true, tone: 'lime', shape: 'candle',
    desc: 'Vela de cera de soja en bloques de color. Aroma suave a vainilla y cedro, 30 horas de duración y un precio que la hace ideal para compra por impulso.',
    specs: { Medidas: '7 × 7 × 12 cm', Material: 'Cera de soja, mecha de algodón', Duración: '30 horas aprox.', Aroma: 'Vainilla y cedro' },
    store: { where: ['Regalerías', 'Concept stores', 'Tiendas de decoración'], tip: 'Ubicala cerca de la caja. Es el típico "me llevo una más" del final de la compra.' },
    tags: ['vela', 'aroma', 'regalo', 'soja'],
  },

  // ---------------- LIFESTYLE ----------------
  {
    id: 5, slug: 'botella-move', name: 'Botella Move', sku: 'PUL-LIF-001', category: 'lifestyle', sub: 'Botellas',
    price: 9, retail: 17, min: 12, stock: 84, isNew: false, best: false, tone: 'purple', shape: 'bottle',
    desc: 'Botella de 600 ml liviana y a prueba de mochila. Tapa con asa y colores pensados para verse bien en un gimnasio, en la oficina o en una vidriera.',
    specs: { Capacidad: '600 ml', Material: 'Tritan libre de BPA', Colores: 'Violeta, azul y negro', Presentación: 'Etiqueta colgante' },
    store: { where: ['Tiendas de lifestyle', 'Tiendas deportivas', 'Librerías'], tip: 'Combinala con el Tote PULSO en un mismo exhibidor: se venden juntas.' },
    tags: ['botella', 'agua', 'deporte'],
  },
  {
    id: 6, slug: 'mug-daily', name: 'Mug Daily', sku: 'PUL-LIF-002', category: 'lifestyle', sub: 'Cocina',
    price: 6.5, retail: 12, min: 12, stock: 150, isNew: false, best: true, tone: 'coral', shape: 'mug',
    desc: 'La taza de todos los días, con el borde en color y una forma que se agarra bien. Apta para lavavajillas y microondas.',
    specs: { Capacidad: '350 ml', Material: 'Gres esmaltado', Colores: '5 combinaciones', Presentación: 'Caja individual' },
    store: { where: ['Cafeterías con tienda', 'Regalerías', 'Lifestyle'], tip: 'Mostrala apilada en varios colores: la variedad invita a coleccionar.' },
    tags: ['taza', 'mug', 'cafe', 'cocina'],
  },
  {
    id: 7, slug: 'tote-pulso', name: 'Tote PULSO', sku: 'PUL-LIF-003', category: 'lifestyle', sub: 'Bolsos',
    price: 7.5, retail: 14, min: 12, stock: 96, isNew: false, best: true, tone: 'lime', shape: 'tote',
    desc: 'Bolsa de algodón grueso con estampa de onda. Entra todo, dura años y hace publicidad caminando.',
    specs: { Medidas: '38 × 42 cm · asas de 60 cm', Material: 'Algodón 280 g/m²', Estampa: 'Serigrafía a 2 colores', Presentación: 'Doblada con faja' },
    store: { where: ['Librerías', 'Concept stores', 'Ferias'], tip: 'Colgala abierta con productos adentro: muestra el tamaño y sugiere compras.' },
    tags: ['bolsa', 'tote', 'algodon'],
  },
  {
    id: 8, slug: 'botella-wave', name: 'Botella Wave', sku: 'PUL-LIF-004', category: 'lifestyle', sub: 'Botellas',
    price: 11, retail: 21, min: 6, stock: 9, isNew: true, best: false, tone: 'yellow', shape: 'bottleWave',
    desc: 'Botella térmica de acero con la onda PULSO grabada. Mantiene frío 24 horas y caliente 12. Una pieza de regalo en precio de impulso.',
    specs: { Capacidad: '500 ml', Material: 'Acero inoxidable doble pared', Temperatura: '24 h frío · 12 h calor', Presentación: 'Tubo de cartón' },
    store: { where: ['Tiendas de lifestyle', 'Regalos empresariales', 'Deportes'], tip: 'Destacá el dato de las 24 horas en un cartelito: es lo que más preguntan.' },
    tags: ['botella', 'termica', 'acero'],
  },

  // ---------------- REGALOS ----------------
  {
    id: 9, slug: 'gift-box-mini', name: 'Gift Box Mini', sku: 'PUL-REG-001', category: 'regalos', sub: 'Cajas regalo',
    price: 15, retail: 28, min: 6, stock: 40, isNew: false, best: true, tone: 'purple', shape: 'giftbox',
    desc: 'Caja lista para regalar con mini vela, taza espresso y tarjeta. Resuelve el regalo en diez segundos.',
    specs: { Contenido: 'Mini vela, taza espresso, tarjeta', Medidas: '18 × 18 × 9 cm', Presentación: 'Caja rígida con cinta', Ocasiones: 'Cumpleaños, gracias, día de la madre' },
    store: { where: ['Regalerías', 'Concept stores', 'Tiendas online'], tip: 'Tené siempre 2 o 3 armadas a la vista en fechas especiales: se van primero.' },
    tags: ['regalo', 'caja', 'vela', 'kit'],
  },
  {
    id: 10, slug: 'set-weekend', name: 'Set Weekend', sku: 'PUL-REG-002', category: 'regalos', sub: 'Sets',
    price: 22, retail: 42, min: 4, stock: 24, isNew: true, best: false, tone: 'blue', shape: 'weekend',
    desc: 'Neceser, antifaz y mini botella en un set para escapadas. El regalo que siempre queda bien y deja buen margen.',
    specs: { Contenido: 'Neceser, antifaz, botella 250 ml', Material: 'Nylon reciclado', Medidas: '22 × 14 × 8 cm', Presentación: 'Caja con ventana' },
    store: { where: ['Boutiques', 'Tiendas de viaje', 'Regalerías'], tip: 'Presentalo abierto junto a uno cerrado: el contenido convence.' },
    tags: ['regalo', 'viaje', 'set'],
  },
  {
    id: 11, slug: 'caja-surprise', name: 'Caja Surprise', sku: 'PUL-REG-003', category: 'regalos', sub: 'Cajas regalo',
    price: 18, retail: 34, min: 6, stock: 0, restock: 'octubre 2026', isNew: false, best: false, tone: 'yellow', shape: 'surprise',
    desc: 'Una caja con cuatro productos PULSO sorpresa, siempre distintos. Ideal para fidelizar clientes que vuelven.',
    specs: { Contenido: '4 productos sorpresa', Medidas: '24 × 18 × 10 cm', Presentación: 'Caja estampada con sello', Valor: 'Contenido de PVP mayor a USD 45' },
    store: { where: ['Regalerías', 'Tiendas online', 'Suscripciones'], tip: 'Funciona muy bien como edición limitada: anunciá cuántas quedan.' },
    tags: ['regalo', 'sorpresa', 'caja'],
  },
  {
    id: 12, slug: 'kit-relax', name: 'Kit Relax', sku: 'PUL-REG-004', category: 'regalos', sub: 'Sets',
    price: 20, retail: 38, min: 4, stock: 30, isNew: false, best: false, tone: 'lime', shape: 'relax',
    desc: 'Vela aromática en frasco, sales de baño y bálsamo en una caja que invita a bajar un cambio.',
    specs: { Contenido: 'Vela en frasco, sales 200 g, bálsamo', Aroma: 'Lavanda y eucalipto', Medidas: '20 × 15 × 8 cm', Presentación: 'Caja con faja' },
    store: { where: ['Spas', 'Regalerías', 'Farmacias boutique'], tip: 'Tené un tester de la vela abierta: el aroma cierra la venta.' },
    tags: ['vela', 'relax', 'regalo', 'aroma', 'spa'],
  },

  // ---------------- PAPELERÍA ----------------
  {
    id: 13, slug: 'notebook-grid', name: 'Notebook Grid', sku: 'PUL-PAP-001', category: 'papeleria', sub: 'Cuadernos',
    price: 5, retail: 10, min: 24, stock: 240, isNew: false, best: true, tone: 'purple', shape: 'notebook',
    desc: 'Cuaderno A5 cuadriculado con tapa flexible y banda elástica. El básico que se repone todos los meses.',
    specs: { Formato: 'A5 · 96 hojas', Papel: '90 g/m² cuadriculado', Tapa: 'Flexible con elástico', Colores: '6 colores' },
    store: { where: ['Librerías', 'Papelerías', 'Concept stores'], tip: 'Mostralo en abanico de colores: el que entra por uno sale con dos.' },
    tags: ['cuaderno', 'libreta', 'escuela'],
  },
  {
    id: 14, slug: 'planner-2027', name: 'Planner 2027', sku: 'PUL-PAP-002', category: 'papeleria', sub: 'Agendas',
    price: 9, retail: 18, min: 12, stock: 110, isNew: true, best: false, tone: 'coral', shape: 'planner',
    desc: 'Agenda semanal 2027 con anillado, stickers y hojas de objetivos. Llega justo para la temporada fuerte de fin de año.',
    specs: { Formato: 'A5 · semana a la vista', Encuadernación: 'Anillado doble', Extras: 'Stickers y bolsillo', Presentación: 'Faja con código de barras' },
    store: { where: ['Librerías', 'Papelerías', 'Regalerías'], tip: 'Octubre a enero es su ventana: asegurá stock antes de noviembre.' },
    tags: ['agenda', 'planner', '2027'],
  },
  {
    id: 15, slug: 'set-sticky-color', name: 'Set Sticky Color', sku: 'PUL-PAP-003', category: 'papeleria', sub: 'Accesorios de escritorio',
    price: 4, retail: 8, min: 24, stock: 300, isNew: false, best: true, tone: 'blue', shape: 'sticky',
    desc: 'Cinco blocks de notas adhesivas en colores PULSO. Alta rotación, poco espacio y margen del 100%.',
    specs: { Contenido: '5 blocks × 50 hojas', Medidas: '7,6 × 7,6 cm', Adhesivo: 'Reposicionable', Presentación: 'Blíster de cartón' },
    store: { where: ['Librerías', 'Papelerías', 'Oficinas'], tip: 'Colgalo en exhibidor de caja: es compra de impulso pura.' },
    tags: ['notas', 'post-it', 'oficina'],
  },
  {
    id: 16, slug: 'desk-kit', name: 'Desk Kit', sku: 'PUL-PAP-004', category: 'papeleria', sub: 'Accesorios de escritorio',
    price: 13, retail: 25, min: 6, stock: 44, isNew: false, best: false, tone: 'yellow', shape: 'desk',
    desc: 'Portalápices, bandejita y tres lápices en una caja: el escritorio ordenado en una sola compra.',
    specs: { Contenido: 'Portalápices, bandeja, 3 lápices', Material: 'Metal pintado y madera', Colores: 'Amarillo, violeta, negro', Presentación: 'Caja con ventana' },
    store: { where: ['Librerías', 'Concept stores', 'Regalos empresariales'], tip: 'Armalo en un escritorio de muestra: el cliente se imagina usándolo.' },
    tags: ['escritorio', 'oficina', 'lapices'],
  },

  // ---------------- ACCESORIOS ----------------
  {
    id: 17, slug: 'llavero-pulse', name: 'Llavero Pulse', sku: 'PUL-ACC-001', category: 'accesorios', sub: 'Llaveros',
    price: 3.5, retail: 7, min: 24, stock: 400, isNew: false, best: true, tone: 'coral', shape: 'keychain',
    desc: 'Llavero de acrílico con la onda PULSO. Liviano, colorido y perfecto para exhibir cerca de la caja.',
    specs: { Medidas: '5 × 3 cm', Material: 'Acrílico y aro de metal', Colores: '5 colores', Presentación: 'Tarjeta colgante' },
    store: { where: ['Regalerías', 'Librerías', 'Kioscos'], tip: 'Un exhibidor giratorio al lado de la caja es suficiente para que salga solo.' },
    tags: ['llavero', 'accesorio'],
  },
  {
    id: 18, slug: 'pin-set', name: 'Pin Set', sku: 'PUL-ACC-002', category: 'accesorios', sub: 'Pines',
    price: 4.5, retail: 9, min: 24, stock: 260, isNew: false, best: false, tone: 'purple', shape: 'pins',
    desc: 'Tres pines esmaltados con íconos PULSO para mochilas, camperas y totes.',
    specs: { Contenido: '3 pines', Medidas: '2,5 cm c/u', Material: 'Metal esmaltado', Presentación: 'Tarjeta ilustrada' },
    store: { where: ['Concept stores', 'Librerías', 'Tiendas de moda'], tip: 'Mostralos puestos en el Tote PULSO: suma venta cruzada.' },
    tags: ['pin', 'accesorio', 'mochila'],
  },
  {
    id: 19, slug: 'clip-wave', name: 'Clip Wave', sku: 'PUL-ACC-003', category: 'accesorios', sub: 'Pelo',
    price: 5.5, retail: 11, min: 12, stock: 90, isNew: true, best: false, tone: 'blue', shape: 'clip',
    desc: 'Broche de pelo con forma de onda, en acetato brillante. Tendencia, precio bajo y colores para combinar.',
    specs: { Medidas: '9 cm', Material: 'Acetato', Colores: 'Lima, coral, lavanda', Presentación: 'Tarjeta' },
    store: { where: ['Boutiques', 'Tiendas de moda', 'Concept stores'], tip: 'Ponelos en un espejo de mostrador: el cliente se los prueba y compra.' },
    tags: ['pelo', 'broche', 'moda'],
  },
  {
    id: 20, slug: 'strap-color', name: 'Strap Color', sku: 'PUL-ACC-004', category: 'accesorios', sub: 'Celular',
    price: 6, retail: 12, min: 12, stock: 14, isNew: false, best: false, tone: 'yellow', shape: 'strap',
    desc: 'Colgante para celular con cuentas de colores y adaptador universal. Se usa, se ve y se recomienda.',
    specs: { Largo: '120 cm regulable', Material: 'Poliéster trenzado y cuentas', Compatibilidad: 'Universal con placa', Presentación: 'Tarjeta' },
    store: { where: ['Tiendas de tecnología', 'Boutiques', 'Kioscos'], tip: 'Tené uno puesto en un celular de muestra.' },
    tags: ['celular', 'colgante', 'accesorio'],
  },
];

export const MIN_ORDER = 150;

export const byId = (id) => PRODUCTS.find((p) => p.id === Number(id));
export const bySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
export const categoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);

export const productsIn = (slug) =>
  slug === 'novedades' ? PRODUCTS.filter((p) => p.isNew) : PRODUCTS.filter((p) => p.category === slug);

export const availability = (p) => {
  if (p.stock <= 0) return { key: 'restock', label: `Próximo ingreso: ${p.restock ?? 'a confirmar'}` };
  if (p.stock < 20) return { key: 'low', label: `Pocas unidades (${p.stock})` };
  return { key: 'in', label: `En stock (${p.stock})` };
};

export const margin = (p) => Math.round(((p.retail - p.price) / p.price) * 100);
