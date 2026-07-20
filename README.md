# El Charrúa — web

Maqueta de propuesta para El Charrúa (parrilla uruguaya, Miraflores, Lima).
Next.js 15 (App Router) + Tailwind v4. Página estática, lista para Vercel.

> ⚠️ **Contenido de ejemplo.** El diseño y los datos de contacto son una propuesta,
> no el sitio oficial. Lleva `noindex` y una nota en el pie hasta que el cliente
> apruebe y entregue sus datos reales.

## Arrancar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # comprobar antes de desplegar
```

## Desplegar en Vercel

```bash
npm i -g vercel      # si no lo tienes
vercel login
vercel               # primera vez: crea el proyecto y da una URL de preview
vercel --prod        # publicar
```

O desde la web: sube el repo a GitHub e impórtalo en vercel.com/new. Detecta
Next.js solo, sin configuración.

## Qué tocar

| Quiero cambiar… | Archivo |
|---|---|
| Textos, carta, horarios, enlaces (ES y EN) | `lib/content.js` |
| Número de WhatsApp | `lib/content.js` → `WA_NUMBER` |
| Colores, tipografías, espaciado | `app/globals.css` → bloque `@theme` |
| Maquetación de una sección | `components/Site.jsx` |
| Fotos y videos | `public/assets/` |

Todo el contenido está en `lib/content.js`: cambiar la carta o el idioma no
requiere tocar JSX.

## Pendientes antes de publicar de verdad

- [ ] `WA_NUMBER` real (ahora `51900000000`)
- [ ] Dirección exacta (aparece como `Av. [dirección]`)
- [ ] Horario confirmado
- [ ] 4 fotos reales para la retícula de Instagram
- [ ] Logo en SVG o PNG ≥600 px (el actual es de 158×92 y se ve blando en retina)
- [ ] Video del hogar sin la marca de agua "PopVid.AI" (hoy se recorta por encuadre)
- [ ] Quitar `noindex` en `app/layout.js` y la nota del pie en `lib/content.js`

## Decisiones técnicas

- **Tailwind** para retícula, espaciado, color y estados. **CSS propio** para lo
  que Tailwind no expresa: máscaras, `mix-blend-mode`, gradientes compuestos,
  keyframes, y el `input[type=range]`.
- **Fuentes autoalojadas** con `next/font` (Bodoni Moda + Karla): sin petición a
  Google, sin salto de texto al cargar.
- **Reveals sin JS obligatorio**: un script en `<head>` marca `.js` en el `<html>`.
  Si la hidratación falla, la página se ve entera en vez de quedar en blanco.
- **Videos** con carga diferida: no se descargan con `prefers-reduced-motion`,
  con Data Saver ni en 2G. Se pausan fuera de pantalla.
- **Imágenes** en AVIF con respaldo WebP/JPEG y `srcset` por tamaño.
