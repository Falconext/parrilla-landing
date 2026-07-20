import { Bodoni_Moda, Karla } from "next/font/google";
import "./globals.css";

// autoalojadas por Next: sin petición a Google, sin FOUT
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-bodoni",
});
const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export const metadata = {
  title: "El Charrúa — Parrilla uruguaya · Miraflores, Lima",
  description:
    "Parrilla uruguaya a la leña en Miraflores, Lima. Cortes al fuego, achuras y bodega del Río de la Plata. Reservas por WhatsApp, carta y pedidos para llevar.",
  // MAQUETA DE PROPUESTA: contenido de ejemplo, no es el sitio oficial de El Charrúa
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#12100E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${bodoni.variable} ${karla.variable}`} suppressHydrationWarning>
      <head>
        {/* marca que hay JS: sin esto la página se muestra entera, sin reveals */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet="/assets/hero-fuego-900.avif 900w, /assets/hero-fuego-1672.avif 1672w"
          imageSizes="100vw"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
