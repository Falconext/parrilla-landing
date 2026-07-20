"use client";

import { useEffect, useRef, useState } from "react";

/* ── reveal al hacer scroll ─────────────────────────────── */
export function useInView(ref, { rootMargin = "0px 0px -10% 0px", threshold = 0.12 } = {}) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    // lo que ya está en pantalla al montar se muestra sin esperar al observer
    if (el.getBoundingClientRect().top < innerHeight * 0.92) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, rootMargin, threshold]);
  return seen;
}

export function Rise({ as: Tag = "div", i = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  return (
    <Tag
      ref={ref}
      style={{ "--i": i }}
      className={`rise ${seen ? "is-in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ── video de fondo: solo se descarga si hay movimiento y datos ── */
export function BgVideo({ src, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const vid = ref.current;
    if (!vid) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const net = navigator.connection || {};
    const cheap = net.saveData === true || /^(slow-)?2g$/.test(net.effectiveType || "");
    if (reduce || cheap) return; // nos quedamos con la foto (5–19 KB)

    vid.src = src;
    const onPlaying = () => vid.setAttribute("data-on", "");
    vid.addEventListener("playing", onPlaying, { once: true });

    let pending = false;
    const tryPlay = () => {
      if (!vid.isConnected || pending || !vid.paused) return;
      pending = true;
      vid
        .play()
        .then(() => (pending = false))
        .catch((err) => {
          pending = false;
          // solo el bloqueo real de autoplay nos devuelve a la foto;
          // un AbortError al alternar play/pause es transitorio
          if (err.name === "NotAllowedError") vid.remove();
        });
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tryPlay() : vid.pause()), {
      threshold: 0.05,
    });
    io.observe(vid);
    const onVis = () => (document.hidden ? vid.pause() : tryPlay());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      vid.removeEventListener("playing", onPlaying);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      disablePictureInPicture
    />
  );
}

/* ── brasas del hero: rAF, pausa fuera de pantalla ── */
export function Embers() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, parts = [], run = false, raf = 0;

    const seed = () => {
      const n = innerWidth < 700 ? 34 : 70;
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: H + Math.random() * H * 0.5,
        r: Math.random() * 1.7 + 0.5,
        s: Math.random() * 0.5 + 0.18,
        d: Math.random() * Math.PI * 2,
        a: Math.random() * 0.55 + 0.2,
      }));
    };
    const size = () => {
      W = cv.clientWidth * dpr;
      H = cv.clientHeight * dpr;
      cv.width = W;
      cv.height = H;
      seed();
    };
    const frame = () => {
      raf = 0;
      if (!run) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y -= p.s * dpr;
        p.d += 0.012;
        p.x += Math.sin(p.d) * 0.35 * dpr;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
        const fade = Math.max(0, Math.min(1, p.y / H));
        ctx.beginPath();
        ctx.fillStyle = `rgba(226,${98 + Math.round(60 * (1 - fade))},43,${p.a * fade})`;
        ctx.arc(p.x, p.y, p.r * dpr, 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!run && !reduce) {
        run = true;
        if (!raf) raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      run = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    size();
    addEventListener("resize", size, { passive: true });
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(cv);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      // fotograma estático: mismas brasas, sin movimiento
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(226,120,43,${p.a * 0.6})`;
        ctx.arc(p.x, p.y * 0.6, p.r * dpr, 0, 6.2832);
        ctx.fill();
      }
    }
    return () => {
      stop();
      io.disconnect();
      removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas id="embers" ref={ref} aria-hidden="true" />;
}

/* ── mapa de Miraflores dibujado, no incrustado ── */
export function MapCanvas({ label }) {
  const ref = useRef(null);
  useEffect(() => {
    const mp = ref.current;
    if (!mp) return;
    const c = mp.getContext("2d");
    const w = mp.width, h = mp.height;
    c.fillStyle = "#0D0B0A";
    c.fillRect(0, 0, w, h);
    c.strokeStyle = "rgba(242,235,224,.13)";
    c.lineWidth = 1.5;
    c.save();
    c.translate(w * 0.5, h * 0.5);
    c.rotate(-0.55);
    c.translate(-w * 0.5, -h * 0.5);
    for (let i = -6; i < 12; i++) {
      c.beginPath();
      c.moveTo(-200 + i * 92, -300);
      c.lineTo(-200 + i * 92, h + 300);
      c.stroke();
    }
    for (let i = -4; i < 12; i++) {
      c.beginPath();
      c.moveTo(-300, -150 + i * 84);
      c.lineTo(w + 300, -150 + i * 84);
      c.stroke();
    }
    c.restore();
    // Costa Verde: banda de mar en la esquina inferior izquierda
    c.beginPath();
    c.moveTo(0, h * 0.52);
    c.lineTo(w * 0.3, h);
    c.lineTo(0, h);
    c.closePath();
    c.fillStyle = "rgba(96,126,146,.18)";
    c.fill();
    c.strokeStyle = "rgba(96,126,146,.45)";
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(0, h * 0.52);
    c.lineTo(w * 0.3, h);
    c.stroke();
    // marcador
    const mx = w * 0.46, my = h * 0.5;
    c.beginPath();
    c.arc(mx, my, 34, 0, 6.2832);
    c.fillStyle = "rgba(226,98,43,.16)";
    c.fill();
    c.beginPath();
    c.arc(mx, my, 7, 0, 6.2832);
    c.fillStyle = "#E2622B";
    c.fill();
    c.font = "500 15px Karla, sans-serif";
    c.fillStyle = "#F2EBE0";
    c.fillText("EL CHARRÚA", mx + 20, my - 14);
    c.font = "400 13px Karla, sans-serif";
    c.fillStyle = "#9A9086";
    c.fillText("Miraflores", mx + 20, my + 6);
    c.fillText("Costa Verde", 28, h - 28);
  }, []);

  return (
    <canvas
      ref={ref}
      width={700}
      height={610}
      role="img"
      aria-label={label}
      className="aspect-[1.15] w-full border border-line bg-[#0D0B0A]"
    />
  );
}
