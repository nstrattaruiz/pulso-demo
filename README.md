# PULSO · Plataforma mayorista B2B (demo)

**PULSO** es una marca ficticia. Esta web es una demo navegable de una plataforma mayorista:
catálogo con precios privados, pedidos con mínimo de compra, confirmación y cuenta de cliente.
No hay backend: todo funciona con JavaScript y `localStorage`.

## Cómo recorrerla

1. **Como visitante**: catálogo, fichas y categorías completas, pero sin precios.
2. **Registro**: `#/registro` → formulario → "Solicitud recibida ✓".
3. **Login**: `#/login` con la cuenta demo, o el botón **Probar acceso mayorista** (abajo a la izquierda).
   - Usuario: `martina@tienda.com`
   - Contraseña: `demo123`
4. **Catálogo privado**: precio mayorista, PVP sugerido, margen, stock y cantidades.
5. **Mi pedido**: drawer con barra de pedido mínimo (USD 150) → **Enviar pedido a PULSO**.
6. **Confirmación**: `#PUL-1052`.
7. **Mi cuenta**: KPIs, compras por mes, historial con detalle y "Repetir pedido", favoritos y datos.

"Ver como visitante" (en la misma píldora) vuelve al modo visitante. En el footer, **Reiniciar demo** borra todo lo guardado.

## Estructura

```
index.html                 Marcado base + firma NS (header píldora, menú grande, volver arriba)
404.html                   Redirección para GitHub Pages (/pulso/cuenta → /pulso/#/cuenta)
assets/css/
  ns-firma.css             Firma NS (sin tocar; se adapta con tokens --ns-*)
  base.css                 Tokens de marca, tipografía, botones, badges, formularios
  components.css           Header, marquee, cards, precios, drawer, modal, toasts, buscador, footer
  pages.css                Estilos de cada página + responsive
assets/js/
  main.js                  Arranque, acciones comunes delegadas, rutas
  router.js                Router por hash
  store.js                 Sesión, pedido, favoritos y pedidos (localStorage)
  data/products.js         Catálogo (20 productos, 6 categorías)
  data/account.js          Cuenta demo y pedidos históricos
  ui/                      Utilidades: formato, íconos, logo, arte SVG, toasts, capas, animaciones
  components/              Header, footer, product card, precio, pedido, buscador, modal, demo, vacíos
  pages/                   Home, catálogo, categorías, novedades, producto, cómo comprar, nosotros,
                           login, registro, cuenta, confirmación, 404
```

Para agregar productos alcanza con sumar un objeto en `data/products.js`: la card, la ficha, la búsqueda y los filtros se generan solos.

## Imágenes

Hoy los productos usan ilustraciones SVG generadas en `ui/art.js` (placeholders con la paleta de la marca).
Para usar fotos reales, agregar `images: [...]` al producto en `data/products.js`:

| Archivo sugerido | Proporción | Uso |
|---|---|---|
| `assets/img/productos/<sku>-1.jpg` | 4:5 (1200×1500) | Foto principal sobre fondo de color |
| `assets/img/productos/<sku>-2.jpg` | 4:5 | Detalle |
| `assets/img/productos/<sku>-3.jpg` | 4:5 | Packaging |
| `assets/img/productos/<sku>-4.jpg` | 4:5 | Producto exhibido en tienda |
| `assets/img/nosotros/{productos,packaging,deposito,preparacion}.jpg` | 4:5 y 16:9 | Mosaico de "Nosotros" |

## Publicar en GitHub Pages

Repo → Settings → Pages → Deploy from branch → `main` / root. No necesita build.
