"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { BgVideo, Embers, MapCanvas, Rise, useInView } from "./media";
import { DONENESS, HOURS, LINKS, MARQUEE, MENU, T, wa } from "@/lib/content";

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const OutArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

/* contador que arranca al entrar en pantalla */
function Counter({ to }) {
  const ref = useRef(null);
  const seen = useInView(ref, { threshold: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    const t0 = performance.now(), dur = 1300;
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{n}</span>;
}

export default function Site() {
  /* ── idioma: el turismo de ticket alto llega en inglés ── */
  const [lang, setLang] = useState("es");
  useEffect(() => {
    let l = (navigator.language || "").startsWith("en") ? "en" : "es";
    try { l = localStorage.getItem("lang") || l; } catch {}
    setLang(l);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);
  const t = T[lang];
  const en = lang === "en";

  /* ── nav ── */
  const [stuck, setStuck] = useState(false);
  const [dock, setDock] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setStuck(scrollY > 12);
      setDock(scrollY > innerHeight * 0.6);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => { setHeroIn(true); }, []);

  /* ── carta ── */
  const TABS = ["fire", "grill", "cuts", "specials"];
  const [tab, setTab] = useState(0);
  const tabRefs = useRef([]);
  const onTabKey = (e, i) => {
    const map = { ArrowRight: 1, ArrowLeft: -1, Home: -i, End: TABS.length - 1 - i };
    const d = map[e.key];
    if (d === undefined) return;
    e.preventDefault();
    const next = (i + d + TABS.length) % TABS.length;
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  /* ── término ── */
  const [done, setDone] = useState(1);
  const levels = DONENESS[lang];
  const [dLabel, dTemp, dNote, dK] = levels[done];

  /* ── horario: hoy ── */
  const [today, setToday] = useState(-1);
  useEffect(() => { setToday(new Date().getDay()); }, []);

  /* ── reservas ── */
  const [dates, setDates] = useState({ min: "", max: "", value: "" });
  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    const iso = d.toISOString().slice(0, 10);
    const max = new Date(d);
    max.setDate(max.getDate() + 30);
    setDates({ min: iso, max: max.toISOString().slice(0, 10), value: iso });
  }, []);
  const [form, setForm] = useState({ time: "8:00 PM", party: 1, name: "", mail: "" });
  const [errs, setErrs] = useState({});
  const [okMsg, setOkMsg] = useState("");

  const check = useCallback(
    (k, v) => {
      if (k === "date") return !!v;
      if (k === "time") return !!v;
      if (k === "name") return v.trim().length > 0;
      if (k === "mail") return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v);
      return true;
    },
    []
  );

  const submit = (e) => {
    e.preventDefault();
    const next = {
      date: !check("date", dates.value),
      time: !check("time", form.time),
      name: !check("name", form.name),
      mail: !check("mail", form.mail),
    };
    setErrs(next);
    if (Object.values(next).some(Boolean)) {
      document.querySelector("[data-err] input, [data-err] select")?.focus();
      setOkMsg("");
      return;
    }
    const d = new Date(dates.value + "T12:00:00");
    const pretty = d.toLocaleDateString(en ? "en-GB" : "es-PE", {
      weekday: "long", day: "numeric", month: "long",
    });
    const party = t.parties[form.party];
    setOkMsg(
      en
        ? `Requested — ${party}, ${pretty} at ${form.time}. We will confirm within the hour.`
        : `Solicitada — ${party}, ${pretty} a las ${form.time}. Te confirmamos en menos de una hora.`
    );
  };

  const times = ["12:30 PM","1:00 PM","1:30 PM","2:00 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"];
  const marquee = useMemo(() => [...MARQUEE, ...MARQUEE], []);
  const field = "grid gap-2 mb-6";
  const input =
    "w-full min-h-12 rounded-[2px] border border-line bg-char px-4 py-[.95rem] font-body text-base leading-none text-bone transition-colors hover:border-smoke";

  return (
    <>
      <a className="fixed left-4 top-4 z-[200] -translate-y-[300%] bg-ember px-5 py-3 font-bold text-[#150F0B] transition-transform duration-200 focus:translate-y-0" href="#main">
        {t.skip}
      </a>

      {/* ══ NAV ══ */}
      <header
        className={`sticky top-0 z-[60] border-b transition-[background,border-color] duration-500 ${
          stuck ? "border-line bg-char/85 backdrop-blur-lg" : "border-transparent"
        }`}
      >
        <div className="wrap flex min-h-[68px] items-center justify-between gap-6">
          <a className="flex items-center gap-3" href="#top" aria-label="El Charrúa, inicio">
            <Image src="/assets/logo.png" alt="El Charrúa" width={160} height={44} priority className="h-[38px] w-auto object-contain md:h-[46px]" />
            <span className="hidden border-l border-line pl-3 font-body text-[.625rem] font-medium uppercase tracking-[.18em] text-smoke sm:inline-block">
              Miraflores
            </span>
          </a>

          <nav className="hidden gap-8 lg:flex" aria-label={en ? "Primary" : "Principal"}>
            {["fire", "menu", "cuts", "takeout", "visit"].map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                className="group relative py-2 font-body text-xs font-medium uppercase tracking-[.16em] text-smoke transition-colors hover:text-bone"
              >
                {t.nav[i]}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-line" role="group" aria-label="Idioma / Language">
              {["es", "en"].map((l, i) => (
                <span key={l} className="contents">
                  {i === 1 && <span aria-hidden="true">/</span>}
                  <button
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`min-h-11 min-w-[34px] px-1 py-2 font-body text-xs font-bold tracking-[.12em] transition-colors ${
                      lang === l ? "text-ember" : "text-smoke hover:text-bone"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
            <a className="btn btn--sm" href="#book">
              {t.book} <Arrow />
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <span id="top" />

        {/* ══ HERO ══ */}
        <section className="relative flex min-h-[min(100svh,860px)] items-end overflow-clip pb-14 pt-24">
          <div className="hero-media" aria-hidden="true">
            <picture>
              <source type="image/avif" sizes="100vw" srcSet="/assets/hero-fuego-900.avif 900w, /assets/hero-fuego-1672.avif 1672w" />
              <source type="image/webp" sizes="100vw" srcSet="/assets/hero-fuego-900.webp 900w, /assets/hero-fuego-1672.webp 1672w" />
              <img src="/assets/hero-fuego-1672.jpg" alt="" width={1672} height={941} fetchPriority="high" decoding="async" />
            </picture>
            <BgVideo src="/assets/hero-fuego.mp4" className="hero-video" />
          </div>
          <div className="hero-scrim" aria-hidden="true" />
          <Embers />
          <div className="hero-heat" aria-hidden="true" />

          <div className="wrap hero-type">
            <p className={`eyebrow rise ${heroIn ? "is-in" : ""}`}>{t.heroEyebrow}</p>
            <h1 className={`h-3xl mb-9 mt-6 ${heroIn ? "is-in" : ""}`}>
              <span className="ln" style={{ "--i": 0 }}><i>{t.heroH1a}</i></span>
              {/* el .ital va dentro del <i>: `.ln > i` fuerza font-style:inherit */}
              <span className="ln" style={{ "--i": 1 }}><i><span className="ital">{t.heroH1b}</span></i></span>
            </h1>
            <p className={`lede rise ${heroIn ? "is-in" : ""}`} style={{ "--i": 1 }}>{t.heroLede}</p>

            <div className={`mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 rise ${heroIn ? "is-in" : ""}`} style={{ "--i": 2 }}>
              <a className="btn" href="#book">{t.bookTable} <Arrow /></a>
              <a className="btn btn--ghost" href="#menu">{t.seeMenu}</a>
            </div>

            <div className={`mt-9 flex flex-wrap gap-x-6 gap-y-[.4rem] border-t border-line pt-6 rise ${heroIn ? "is-in" : ""}`} style={{ "--i": 3 }}>
              {[
                [t.metaService, t.metaServiceB],
                [t.metaHours, t.metaHoursB],
              ].map(([k, v]) => (
                <span key={k} className="font-body text-xs font-medium uppercase tracking-[.16em] text-smoke">
                  {k} <b className="font-medium text-bone">{v}</b>
                </span>
              ))}
              <span className="font-body text-xs font-medium uppercase tracking-[.16em] text-smoke">
                {t.metaBook}{" "}
                <b className="font-medium text-bone">
                  <a href={wa(en ? "Hello, I would like to book a table at El Charrúa" : "Hola, quiero reservar una mesa en El Charrúa")} target="_blank" rel="noopener">
                    WhatsApp
                  </a>
                </b>
              </span>
            </div>
          </div>
        </section>

        {/* ══ MARQUESINA ══ */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {marquee.map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>

        {/* ══ 01 EL FUEGO ══ */}
        <section id="fire" className="border-b border-line py-24 md:py-36">
          <div className="wrap grid gap-14 md:grid-cols-2 md:items-center md:gap-24">
            <div>
              <Rise as="p" className="eyebrow !text-ember">{t.fireEyebrow}</Rise>
              <Rise as="h2" i={1} className="h-xl">
                {t.fireH2a} <span className="ital">{t.fireH2b}</span>
              </Rise>
              <Rise as="p" i={2} className="lede">{t.fireLede}</Rise>
              <Rise as="p" i={3} className="mt-6 max-w-[var(--measure)] text-smoke">{t.fireBody}</Rise>

              <Rise as="dl" i={4} className="mt-6 grid grid-cols-3 gap-px bg-line">
                {t.facts.map(([k, v, s]) => (
                  <div key={k} className="bg-char px-4 py-6">
                    <dt className="font-body text-xs font-medium uppercase tracking-[.16em] text-smoke">{k}</dt>
                    <dd className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-none text-ember">
                      <Counter to={v} />
                      {k === "Brasa" ? "°" : ""}
                      <small className="mt-2 block font-body text-xs font-medium tracking-[.12em] text-smoke">{s}</small>
                    </dd>
                  </div>
                ))}
              </Rise>
            </div>

            <Rise as="figure" i={2} className="fire-fig m-0">
              <picture>
                <source type="image/avif" sizes="(min-width:940px) 44vw, 90vw" srcSet="/assets/hogar-700.avif 700w, /assets/hogar-1126.avif 1122w" />
                <source type="image/webp" sizes="(min-width:940px) 44vw, 90vw" srcSet="/assets/hogar-700.webp 700w, /assets/hogar-1126.webp 1122w" />
                <img
                  src="/assets/hogar-1126.jpg" width={1122} height={1402} loading="lazy" decoding="async"
                  alt={en
                    ? "Burning logs in the open hearth: red embers under a charred log and sparks rising in the dark."
                    : "Leños encendidos en el hogar abierto: brasas al rojo bajo un tronco carbonizado y chispas subiendo en la oscuridad."}
                />
              </picture>
              <BgVideo src="/assets/hogar.mp4" className="fig-video" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d0b0af2] to-transparent p-6 font-body text-xs font-medium uppercase leading-6 tracking-[.16em] text-smoke">
                {t.figCaption}
              </figcaption>
            </Rise>
          </div>
        </section>

        {/* ══ 02 CARTA ══ */}
        <section id="menu" className="border-b border-line py-24 md:py-36">
          <div className="wrap">
            <div className="mb-14 max-w-[var(--measure)]">
              <Rise as="p" className="eyebrow !text-ember">{t.menuEyebrow}</Rise>
              <Rise as="h2" i={1} className="h-xl">
                {t.menuH2a} <span className="ital">{t.menuH2b}</span>
              </Rise>
              <Rise as="p" i={2} className="lede">{t.menuLede}</Rise>
              <Rise as="p" i={3} className="mt-6">
                <a className="btn btn--ghost btn--sm" href={LINKS.menuPdf} target="_blank" rel="noopener">
                  {t.menuPdf}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" />
                  </svg>
                </a>
              </Rise>
            </div>

            <div className="mb-9 flex flex-wrap gap-2 border-b border-line pb-6" role="tablist" aria-label={en ? "Menu sections" : "Secciones de la carta"}>
              {t.tabs.map((label, i) => (
                <button
                  key={label}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  aria-selected={tab === i}
                  aria-controls={`panel-${i}`}
                  tabIndex={tab === i ? 0 : -1}
                  onClick={() => setTab(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`min-h-11 cursor-pointer rounded-[2px] border px-[1.1rem] py-3 font-body text-xs font-medium uppercase tracking-[.18em] transition-colors duration-300 ${
                    tab === i
                      ? "border-bone bg-bone text-[#150F0B]"
                      : "border-transparent text-smoke hover:border-line hover:text-bone"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {TABS.map((key, i) => (
              <div
                key={key}
                id={`panel-${i}`}
                role="tabpanel"
                tabIndex={0}
                hidden={tab !== i}
                data-open={tab === i ? "" : undefined}
                className="menu-panel"
              >
                <div className="grid gap-x-24 gap-y-6 md:grid-cols-2">
                  {MENU[key].map(([name, desc, tag], j) => (
                    <article key={name} className="dish" style={{ "--i": j }}>
                      <h3 className="dish__name">{name}</h3>
                      <p className="dish__desc">
                        {desc}
                        {tag && <span className="dish__tag">{tag}</span>}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 03 TÉRMINO ══ */}
        <section id="cuts" className="border-b border-line py-24 md:py-36">
          <div className="wrap">
            <div className="mb-14 max-w-[var(--measure)]">
              <Rise as="p" className="eyebrow !text-ember">{t.doneEyebrow}</Rise>
              <Rise as="h2" i={1} className="h-xl">
                {t.doneH2a} <span className="ital">{t.doneH2b}</span>
              </Rise>
              <Rise as="p" i={2} className="lede">{t.doneLede}</Rise>
            </div>

            <Rise i={3} className="grid items-center gap-9 md:grid-cols-[auto_1fr] md:gap-14">
              <div className="steak" role="img" aria-label={`${en ? "Steak cooked" : "Corte"} ${dLabel.toLowerCase()}`}>
                {levels.map((lv, i) => (
                  <picture key={i}>
                    <source type="image/avif" srcSet={`/assets/corte-${i}.avif`} />
                    <img
                      src={`/assets/corte-${i}.webp`} alt="" width={900} height={900}
                      loading="lazy" decoding="async"
                      style={{ "--k": lv[3] }}
                      data-on={done === i ? "" : undefined}
                    />
                  </picture>
                ))}
              </div>

              <div>
                <p className="mb-4 flex items-baseline gap-4">
                  <span className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-none">{dLabel}</span>
                  <span className="font-body text-[.9375rem] font-medium tabular-nums text-ember">{dTemp}</span>
                </p>
                <p className="mb-6 max-w-[32rem] text-smoke">{dNote}</p>

                <label htmlFor="doneness" className="eyebrow mb-2 block">{t.doneLabel}</label>
                <input
                  id="doneness" type="range" min={0} max={4} step={1} value={done}
                  onChange={(e) => setDone(+e.target.value)}
                  aria-valuetext={`${dLabel}, ${dTemp}`}
                />
                <div className="mt-1 flex max-w-[26rem] justify-between" aria-hidden="true">
                  {t.doneScale.map((s) => (
                    <span key={s} className="font-body text-[.625rem] font-medium uppercase tracking-[.1em] text-smoke">{s}</span>
                  ))}
                </div>
              </div>
            </Rise>
          </div>
        </section>

        {/* ══ 04 PARA LLEVAR ══ */}
        <section id="takeout" className="border-b border-line py-24 md:py-36">
          <div className="wrap">
            <div className="mb-14 max-w-[var(--measure)]">
              <Rise as="p" className="eyebrow !text-ember">{t.takeEyebrow}</Rise>
              <Rise as="h2" i={1} className="h-xl">
                {t.takeH2a} <span className="ital">{t.takeH2b}</span>
              </Rise>
              <Rise as="p" i={2} className="lede">{t.takeLede}</Rise>
            </div>

            <Rise i={3} className="grid gap-px bg-line md:grid-cols-3">
              {t.cards.map(([title, body, cta], i) => (
                <article key={title} className="flex flex-col gap-3 bg-hearth px-6 py-9 transition-colors duration-500 hover:bg-[#211C18]">
                  <span className="font-display text-base text-ember">{["I", "II", "III"][i]}</span>
                  <h3 className="font-display text-[1.6rem] leading-[1.15]">{title}</h3>
                  <p className="text-[.9375rem] text-smoke">{body}</p>
                  {i === 1 ? (
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      {[["Rappi", LINKS.rappi], ["PedidosYa", LINKS.pedidosya]].map(([n, href]) => (
                        <a key={n} href={href} target="_blank" rel="noopener"
                           className="inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-line px-4 py-3 font-body text-xs font-bold uppercase tracking-[.1em] text-bone transition-colors hover:border-ember hover:bg-ember/10">
                          {n} <OutArrow />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      className="group mt-auto inline-flex items-center gap-2 pt-4 font-body text-xs font-medium uppercase tracking-[.16em] text-bone"
                      href={i === 0 ? wa(en ? "Hello, I would like to order a grill box to go" : "Hola, quiero pedir una parrillada para llevar") : "mailto:eventos@elcharrua.pe"}
                      target={i === 0 ? "_blank" : undefined}
                      rel={i === 0 ? "noopener" : undefined}
                    >
                      {cta}
                      <span className="transition-transform duration-500 group-hover:translate-x-[5px]"><Arrow /></span>
                    </a>
                  )}
                </article>
              ))}
            </Rise>
          </div>
        </section>

        {/* ══ 05 RESERVAS ══ */}
        <section id="book" className="border-b border-line py-24 md:py-36">
          <div className="wrap grid gap-14 md:grid-cols-2 md:items-center md:gap-24">
            <div>
              <Rise as="p" className="eyebrow !text-ember">{t.bookEyebrow}</Rise>
              <Rise as="h2" i={1} className="h-xl">
                {t.bookH2a} <span className="ital">{t.bookH2b}</span>
              </Rise>
              <Rise as="p" i={2} className="lede">{t.bookLede}</Rise>
              <Rise as="p" i={3} className="mt-6 text-smoke">{t.bookBody}</Rise>
            </div>

            <Rise i={2}>
              {/* en Perú se reserva por WhatsApp: va primero, el formulario es la alternativa */}
              <div className="grid gap-6 border border-ember/35 bg-hearth p-9">
                <div className="flex items-start gap-4">
                  <span className="grid size-[46px] flex-none place-items-center rounded-full bg-ember/10 text-ember" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.24-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.24-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-2xl leading-[1.1]">{t.waTitle}</p>
                    <p className="mt-[.3rem] text-[.9375rem] text-smoke">{t.waSub}</p>
                  </div>
                </div>
                <a
                  className="btn w-full"
                  target="_blank" rel="noopener"
                  href={wa(en
                    ? "Hello El Charrúa, I would like to book a table.\nDate: \nTime: \nGuests: \nName: "
                    : "Hola El Charrúa, quiero reservar una mesa.\nFecha: \nHora: \nPersonas: \nNombre: ")}
                >
                  {t.waCta} <Arrow />
                </a>
              </div>

              <p className="my-6 flex items-center gap-4 text-center font-body text-xs uppercase tracking-[.16em] text-smoke before:h-px before:flex-1 before:bg-line before:content-[''] after:h-px after:flex-1 after:bg-line after:content-['']">
                {t.waOr}
              </p>

              <form className="border border-line bg-hearth p-9" onSubmit={submit} noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className={field} data-err={errs.date ? "" : undefined}>
                    <label htmlFor="bk-date" className="eyebrow">{t.fDate}</label>
                    <input id="bk-date" type="date" required className={`${input} ${errs.date ? "!border-ember" : ""}`}
                      min={dates.min} max={dates.max} value={dates.value}
                      onChange={(e) => setDates((d) => ({ ...d, value: e.target.value }))} />
                    {errs.date && <span className="text-[.8125rem] text-ember">{t.eDate}</span>}
                  </div>
                  <div className={field} data-err={errs.time ? "" : undefined}>
                    <label htmlFor="bk-time" className="eyebrow">{t.fTime}</label>
                    <select id="bk-time" required className={`${input} appearance-none bg-[right_1rem_center] bg-no-repeat ${errs.time ? "!border-ember" : ""}`}
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%239A9086' stroke-width='2'%3E%3Cpath d='m3 5 4 4 4-4'/%3E%3C/svg%3E\")" }}
                      value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}>
                      <option value="">{t.fSelect}</option>
                      {times.map((x) => <option key={x}>{x}</option>)}
                    </select>
                    {errs.time && <span className="text-[.8125rem] text-ember">{t.eTime}</span>}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className={field}>
                    <label htmlFor="bk-party" className="eyebrow">{t.fParty}</label>
                    <select id="bk-party" className={`${input} appearance-none bg-[right_1rem_center] bg-no-repeat`}
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%239A9086' stroke-width='2'%3E%3Cpath d='m3 5 4 4 4-4'/%3E%3C/svg%3E\")" }}
                      value={form.party} onChange={(e) => setForm((f) => ({ ...f, party: +e.target.value }))}>
                      {t.parties.map((p, i) => <option key={p} value={i}>{p}</option>)}
                    </select>
                  </div>
                  <div className={field} data-err={errs.name ? "" : undefined}>
                    <label htmlFor="bk-name" className="eyebrow">{t.fName}</label>
                    <input id="bk-name" type="text" autoComplete="name" required
                      className={`${input} ${errs.name ? "!border-ember" : ""}`}
                      value={form.name}
                      onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); if (errs.name) setErrs((x) => ({ ...x, name: !check("name", e.target.value) })); }}
                      onBlur={(e) => setErrs((x) => ({ ...x, name: !check("name", e.target.value) }))} />
                    {errs.name && <span className="text-[.8125rem] text-ember">{t.eName}</span>}
                  </div>
                </div>

                <div className={field} data-err={errs.mail ? "" : undefined}>
                  <label htmlFor="bk-mail" className="eyebrow">{t.fMail}</label>
                  <input id="bk-mail" type="email" autoComplete="email" required
                    className={`${input} ${errs.mail ? "!border-ember" : ""}`}
                    value={form.mail}
                    onChange={(e) => { setForm((f) => ({ ...f, mail: e.target.value })); if (errs.mail) setErrs((x) => ({ ...x, mail: !check("mail", e.target.value) })); }}
                    onBlur={(e) => setErrs((x) => ({ ...x, mail: !check("mail", e.target.value) }))} />
                  {errs.mail && <span className="text-[.8125rem] text-ember">{t.eMail}</span>}
                  <small className="text-[.8125rem] text-smoke">{t.mailHelp}</small>
                </div>

                <button className="btn w-full" type="submit">{t.submit} <Arrow /></button>

                <p className="mt-4 text-[.8125rem] text-smoke">
                  {en ? "Or write to us on " : "O escríbenos por "}
                  <a className="text-bone" href={wa(en ? "Hello, I would like to book a table" : "Hola, quiero reservar una mesa")} target="_blank" rel="noopener">WhatsApp</a>
                  {en ? ", from 11 AM to 11 PM." : ", de 11 AM a 11 PM."}
                </p>

                {okMsg && (
                  <p className="mt-6 border border-ember p-6 text-[.9375rem] text-bone" role="status">{okMsg}</p>
                )}
              </form>
            </Rise>
          </div>
        </section>

        {/* ══ 06 VISÍTANOS ══ */}
        <section id="visit" className="border-b border-line py-24 md:py-36">
          <div className="wrap grid gap-9 md:grid-cols-2 md:gap-24">
            <div>
              <Rise as="p" className="eyebrow !text-ember">{t.visitEyebrow}</Rise>
              <Rise as="h2" i={1} className="h-xl">
                {t.visitH2a}<br />
                <span className="ital">{t.visitH2b}</span>
              </Rise>
              <Rise as="p" i={2} className="lede">{t.visitLede}</Rise>

              <Rise as="ul" i={3} className="mt-9 border-t border-line">
                {HOURS.map(([d, es, enName, h]) => (
                  <li key={d} className={`flex justify-between gap-4 border-b border-line py-[.85rem] text-[.9375rem] ${today === d ? "text-ember" : ""}`}>
                    <span className={`font-body text-xs font-medium uppercase tracking-[.08em] ${today === d ? "text-ember" : "text-smoke"}`}>
                      {en ? enName : es}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </Rise>
            </div>

            <Rise i={2}>
              <MapCanvas label={en
                ? "Stylised map of Miraflores, Lima, showing El Charrúa"
                : "Mapa estilizado de Miraflores, Lima, con la ubicación de El Charrúa"} />
              <p className="mt-4">
                <a className="btn btn--ghost btn--sm" href={LINKS.maps} target="_blank" rel="noopener">
                  {t.openMaps} <OutArrow />
                </a>
              </p>
            </Rise>
          </div>
        </section>

        {/* ══ 07 INSTAGRAM ══ */}
        <section id="feed" className="border-b border-line py-24 md:py-36">
          <div className="wrap">
            <div className="mb-14 max-w-[var(--measure)]">
              <Rise as="p" className="eyebrow !text-ember">{t.feedEyebrow}</Rise>
              <Rise as="h2" i={1} className="h-xl">
                {t.feedH2a} <span className="ital">{t.feedH2b}</span>
              </Rise>
              <Rise as="p" i={2} className="lede">{t.feedLede}</Rise>
            </div>

            <Rise i={3} className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <a key={i} href={LINKS.instagram} target="_blank" rel="noopener"
                   className="feed-cell relative block aspect-square overflow-hidden bg-hearth">
                  <span className="feed-ph" aria-hidden="true" />
                  {i === 0 && (
                    <span className="absolute bottom-4 left-4 font-body text-xs font-medium lowercase tracking-[.14em] text-bone">
                      @elcharrualima
                    </span>
                  )}
                </a>
              ))}
            </Rise>

            <Rise i={4} as="p" className="mt-9">
              <a className="btn btn--ghost" href={LINKS.instagram} target="_blank" rel="noopener">
                {t.follow} <OutArrow />
              </a>
            </Rise>
          </div>
        </section>

        {/* ══ CIERRE ══ */}
        <section className="overflow-clip py-24 text-center md:py-36">
          <div className="wrap">
            <Rise as="p" className="eyebrow !text-ember">{t.closeEyebrow}</Rise>
            <Rise as="h2" i={1} className="h-2xl mx-auto my-9 max-w-[16ch]">
              {t.closeH2a} <span className="ital">{t.closeH2b}</span>
            </Rise>
            <Rise as="p" i={2}>
              <a className="btn" href="#book">{t.bookTable} <Arrow /></a>
            </Rise>
          </div>
        </section>
      </main>

      {/* ══ PIE ══ */}
      <footer>
        <div className="wrap grid gap-6 border-t border-line py-9 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <span className="font-display text-[1.4rem] font-medium tracking-[.28em]">EL CHARRÚA</span>
            <p className="mt-4 max-w-[26rem] text-[.9375rem] text-smoke">{t.footAddr}</p>
          </div>
          <div>
            <h4 className="mb-4 font-body text-xs font-medium uppercase tracking-[.2em] text-smoke">{t.footContact}</h4>
            <ul className="text-[.9375rem] text-smoke">
              <li className="py-1"><a className="hover:text-bone" href={wa("Hola")} target="_blank" rel="noopener">WhatsApp</a></li>
              <li className="py-1"><a className="hover:text-bone" href={LINKS.instagram} target="_blank" rel="noopener">@elcharrualima</a></li>
              <li className="py-1"><a className="hover:text-bone" href={LINKS.facebook} target="_blank" rel="noopener">facebook.com/charrua</a></li>
              <li className="py-1"><a className="hover:text-bone" href={LINKS.site} target="_blank" rel="noopener">elcharrua.com.pe</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-body text-xs font-medium uppercase tracking-[.2em] text-smoke">{t.footHours}</h4>
            <ul className="text-[.9375rem] text-smoke">
              {t.footHoursList.map((h) => <li key={h} className="py-1">{h}</li>)}
            </ul>
          </div>
        </div>
        <div className="wrap flex flex-wrap justify-between gap-4 border-t border-line py-6 font-body text-[.6875rem] font-medium uppercase leading-relaxed tracking-[.14em] text-smoke">
          <span>© 2026 El Charrúa</span>
          <span>{t.legal}</span>
        </div>
      </footer>

      {/* ══ BARRA MÓVIL ══ */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[70] flex gap-2 border-t border-line bg-char/90 px-[var(--pad)] pb-[calc(.7rem+env(safe-area-inset-bottom))] pt-[.7rem] backdrop-blur-lg transition-transform duration-500 lg:hidden ${
          dock ? "translate-y-0" : "translate-y-[120%]"
        }`}
      >
        <a className="btn btn--ghost flex-1" href={wa(en ? "Hello, I would like to book a table" : "Hola, quiero reservar una mesa")}
           target="_blank" rel="noopener" aria-label={en ? "Message us on WhatsApp" : "Escribir por WhatsApp"}>
          {t.dockWa}
        </a>
        <a className="btn flex-1" href="#book">{t.dockBook}</a>
      </div>
    </>
  );
}
