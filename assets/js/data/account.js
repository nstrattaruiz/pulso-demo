/**
 * Cuenta demo y pedidos históricos. Todo ficticio.
 * Los totales de cada pedido salen de sus ítems (suman USD 4.820 entre los 12).
 */

export const DEMO_USERS = [
  {
    email: 'martina@tienda.com',
    password: 'demo123',
    firstName: 'Martina',
    lastName: 'Silva',
    initials: 'MS',
    level: 'Mayorista Pulso+',
    since: 'marzo 2025',
    store: {
      name: 'Casa Nido',
      type: 'Concept store',
      city: 'Montevideo',
      country: 'Uruguay',
      address: 'Av. Bello Horizonte 1432',
      taxId: 'RUT 21 845 330 0017',
      phone: '+598 99 000 000',
      web: '@casanido.demo',
      seller: 'Lucía (ejecutiva comercial)',
    },
  },
];

export const ORDER_STATUSES = ['Recibido', 'Confirmado', 'Preparando', 'Enviado', 'Entregado'];

// [id, fecha, estado, [[productId, cantidad], ...]]
const RAW = [
  [1048, '2026-09-24', 'Preparando', [[6, 24], [20, 24], [15, 36], [13, 48]]],
  [1045, '2026-09-12', 'Enviado', [[5, 24], [15, 24]]],
  [1039, '2026-08-28', 'Entregado', [[18, 48], [1, 12], [10, 4]]],
  [1034, '2026-08-10', 'Entregado', [[12, 8], [6, 24], [4, 12]]],
  [1030, '2026-07-22', 'Entregado', [[12, 4], [2, 15]]],
  [1026, '2026-07-05', 'Entregado', [[15, 24], [19, 18], [7, 24]]],
  [1019, '2026-06-18', 'Entregado', [[1, 12], [13, 36]]],
  [1012, '2026-05-30', 'Entregado', [[12, 10], [6, 24]]],
  [1006, '2026-05-11', 'Entregado', [[3, 12], [8, 6], [10, 4]]],
  [998, '2026-04-20', 'Entregado', [[8, 6], [16, 9], [9, 6], [2, 12]]],
  [991, '2026-04-02', 'Entregado', [[13, 48], [9, 6]]],
  [984, '2026-03-14', 'Entregado', [[17, 48], [10, 10]]],
];

export const seedOrders = (catalog) =>
  RAW.map(([id, date, status, items]) => {
    const lines = items.map(([pid, qty]) => {
      const p = catalog.find((x) => x.id === pid);
      return { id: pid, qty, price: p.price };
    });
    return {
      id: `PUL-${id}`,
      date,
      status,
      items: lines,
      total: lines.reduce((s, l) => s + l.qty * l.price, 0),
      note: '',
    };
  });

export const FIRST_NEW_ORDER = 1052;
