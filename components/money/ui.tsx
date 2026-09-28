import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, RevealText } from '../Reveal';
import { ExpandingCTA } from '../ui/expanding-cta';
import { BLOCK_GAP } from '../spacing';
import { asset } from '../site';

// ---------------------------------------------------------------------------
// Bausteine der Money Pages
// ---------------------------------------------------------------------------
// Kopf, Abschnittsueberschrift, Chips, Kacheln und Abschluss -- damit jede
// Leistungsseite gleich aussieht, ohne dieselben Klassen fuenfmal zu tragen.
// ---------------------------------------------------------------------------

export const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';
export const H2 = 'text-[clamp(28px,4vw,52px)] font-black leading-[1.02] tracking-tighter uppercase text-[#0b0f2a]';
export const ACCENT = 'text-[#0e958e] italic';

interface Secondary {
  label: string;
  href: string;
  onClick: () => void;
}

interface CtaProps {
  label: string;
  onBooking: () => void;
  onContact: () => void;
  /** Zweiter, stillerer Weg neben der CTA (z. B. "Modi entdecken"). */
  secondary?: Secondary;
}

/** Heller Umriss-Link fuer dunkle Flaechen. */
const SecondaryLink: React.FC<Secondary> = ({ label, href, onClick }) => (
  <a
    href={href}
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className="inline-flex items-center rounded-full border border-white/30 px-6 min-h-[50px] sm:min-h-[54px] text-white text-[12px] sm:text-[13.5px] font-black tracking-tight hover:bg-white/10 transition-colors duration-500"
  >
    {label}
  </a>
);

export const MoneyHero: React.FC<
  CtaProps & { eyebrow: string; title: string; accent: string; lead?: string; body?: React.ReactNode; tagline?: string; image: string; imageAlt: string }
> = ({ eyebrow, title, accent, lead, body, tagline, image, imageAlt, label, onBooking, onContact, secondary }) => (
  <section
    data-nav-ground="dark"
    className="relative w-full overflow-hidden bg-[#020617] flex items-end min-h-[78vh] md:min-h-[86vh] pt-40 md:pt-52 pb-14 md:pb-24"
  >
    <img src={asset(image)} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/75 to-[#020617]/25" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent" />
    <div className={`${CONTAINER} relative z-10 w-full`}>
      <Reveal duration={0.6} className="text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-5 md:mb-7">
        {eyebrow}
      </Reveal>
      <h1 className="text-[clamp(38px,6.4vw,90px)] font-black leading-[0.9] tracking-tighter uppercase text-white max-w-5xl">
        {/* Der Suchbegriff steht im Eyebrow; fuer Suchmaschinen gehoert er auch in die H1. */}
        <span className="sr-only">{eyebrow}: </span>
        <RevealText as="span" by="word" text={title} delay={0.05} className="block" />
        <RevealText as="span" by="word" text={accent} delay={0.18} className="block text-[#2dd4bf] italic" />
      </h1>
      {lead && (
        <Reveal as="p" delay={0.26} className="mt-5 md:mt-7 text-white font-black text-lg md:text-2xl tracking-tight">
          {lead}
        </Reveal>
      )}
      {body && (
        <Reveal as="div" delay={0.32} className="mt-5 md:mt-7 text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-2xl tracking-tight space-y-3">
          {body}
        </Reveal>
      )}
      {tagline && (
        <Reveal as="p" delay={0.38} className="mt-4 text-[#2dd4bf] font-black uppercase tracking-[0.2em] text-xs md:text-sm">
          {tagline}
        </Reveal>
      )}
      <Reveal delay={0.44} className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6">
        <ExpandingCTA label={label} tone="light" onBooking={onBooking} onContact={onContact} />
        {secondary && <SecondaryLink {...secondary} />}
      </Reveal>
    </div>
  </section>
);

/** Ein Abschnitt mit Ueberschrift (Teil + Akzent) und optionalem Einleitungstext. */
export const Section: React.FC<{
  title: string;
  accent?: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  /** Akzent in eigener Zeile -- fuer Ueberschriften aus zwei Saetzen. */
  accentBreak?: boolean;
}> = ({ title, accent, intro, children, className = '', id, accentBreak }) => (
  <section id={id} className={`${CONTAINER} ${BLOCK_GAP} scroll-mt-28 ${className}`}>
    <h2 className={H2}>
      {accentBreak ? <span className="block">{title}</span> : <>{title} </>}
      {accent && <span className={`${ACCENT} ${accentBreak ? 'block' : ''}`}>{accent}</span>}
    </h2>
    {intro && (
      <Reveal as="div" delay={0.08} className="mt-4 text-slate-600 text-base md:text-lg font-medium max-w-3xl leading-relaxed space-y-3">
        {intro}
      </Reveal>
    )}
    {children && <div className="mt-10">{children}</div>}
  </section>
);

/** Begriffe als Chips; `dark` fuer dunkle Flaechen. */
export const Chips: React.FC<{ items: string[]; dark?: boolean }> = ({ items, dark }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li
        key={item}
        className={`rounded-full px-4 py-2 text-[11px] md:text-xs font-black uppercase tracking-wider ${
          dark ? 'bg-white/10 text-white/85 border border-white/10' : 'bg-white/55 text-[#0b0f2a] border border-white/70'
        }`}
      >
        {item}
      </li>
    ))}
  </ul>
);

/** Helle Kachel mit Titel und Text, optional mit Icon. */
export const Tile: React.FC<{ title: string; text?: React.ReactNode; icon?: React.ElementType; children?: React.ReactNode }> = ({
  title,
  text,
  icon: Icon,
  children
}) => (
  <div className="h-full p-6 rounded-card bg-white/50 border border-white/70">
    {Icon && <Icon className="w-7 h-7 text-[#0e958e] mb-4" strokeWidth={1.6} />}
    <h3 className="text-[#0b0f2a] font-black text-sm md:text-base uppercase tracking-tight mb-1.5">{title}</h3>
    {text && <p className="text-slate-600 text-sm leading-relaxed font-medium">{text}</p>}
    {children}
  </div>
);

/** Dunkle Flaeche fuer Abschnitte, die herausstechen sollen. */
export const DarkPanel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`tile-gradient text-white rounded-card border border-white/10 p-7 md:p-12 ${className}`}>{children}</div>
);

/** Bildkarte mit Titel und kurzem Text. */
export const ImageCard: React.FC<{ title: string; text: string; image: string }> = ({ title, text, image }) => (
  <div className="group relative h-full min-h-[240px] sm:min-h-[300px] rounded-card overflow-hidden bg-[#020617] flex flex-col justify-end">
    <img
      src={asset(image)}
      alt={title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/10" />
    <div className="relative p-6">
      <h3 className="text-white font-black text-xl uppercase tracking-tight mb-2">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed font-medium">{text}</p>
    </div>
  </div>
);

/** Der dunkle Schlussblock mit CTA. */
export const ClosingCTA: React.FC<CtaProps & { title: string; accent: string; children: React.ReactNode }> = ({
  title,
  accent,
  children,
  label,
  onBooking,
  onContact,
  secondary
}) => (
  <section className={`${CONTAINER} ${BLOCK_GAP} pb-20 md:pb-28`}>
    <div data-nav-ground="dark" className="tile-gradient rounded-card border border-white/10 p-8 md:p-14 text-white">
      <p className="text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-5">Create. Engage. Empower.</p>
      <h2 className="text-[clamp(28px,4.4vw,58px)] font-black uppercase tracking-tighter leading-[1.02] max-w-3xl">
        {title} <span className="text-[#2dd4bf] italic">{accent}</span>
      </h2>
      <div className="mt-5 text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-2xl space-y-3">{children}</div>
      <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6">
        <ExpandingCTA label={label} tone="light" onBooking={onBooking} onContact={onContact} />
        {secondary && <SecondaryLink {...secondary} />}
      </div>
    </div>
  </section>
);

/** FAQ als aufklappbare Liste; die Antworten stehen im HTML (details), also auch fuer Crawler. */
export const Faq: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => (
  <div className="divide-y divide-[#0b0f2a]/10 border-y border-[#0b0f2a]/10">
    {items.map((f) => (
      <details key={f.q} className="group py-5 md:py-6">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[#0b0f2a] font-black text-base md:text-lg tracking-tight">
          {f.q}
          <span className="shrink-0 text-[#0e958e] text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <p className="mt-3 text-slate-600 text-base leading-relaxed font-medium max-w-3xl">{f.a}</p>
      </details>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Listen ohne Pillen
// ---------------------------------------------------------------------------

/** Begriffe als fliessende Zeile in grosser Schrift, getrennt durch Punkte. */
export const InlineList: React.FC<{ items: string[] }> = ({ items }) => (
  <p className="text-[#0b0f2a] font-black uppercase tracking-tight text-base md:text-xl leading-relaxed">
    {/* Der Punkt haengt am Begriff davor, damit keine Zeile mit einem Punkt
        beginnt; das Leerzeichen danach ist die Stelle zum Umbrechen. */}
    {items.map((item, i) => (
      <React.Fragment key={item}>
        <span className="whitespace-nowrap">
          {item}
          {i < items.length - 1 && <span className="text-[#0e958e] ml-2 md:ml-2.5 mr-1" aria-hidden="true">·</span>}
        </span>{' '}
      </React.Fragment>
    ))}
  </p>
);

/** Raster aus Zellen mit feinen Linien -- fuer Kennzahlen und kurze Begriffe. */
export const CellGrid: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-[#0b0f2a]/12">
    {items.map((item, i) => (
      <li key={item} className="border-b border-r border-[#0b0f2a]/12 px-4 py-5 md:px-6 md:py-7">
        <span className="block text-[#0e958e] font-black text-xs tabular-nums mb-2">{String(i + 1).padStart(2, '0')}</span>
        <span className="block text-[#0b0f2a] font-black uppercase tracking-tight text-sm md:text-base">{item}</span>
      </li>
    ))}
  </ul>
);

// ---------------------------------------------------------------------------
// Teal-Karte -- wie im Flyer: gefuellte Flaeche, weisse Schrift
// ---------------------------------------------------------------------------

export const TealCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`h-full rounded-card p-6 md:p-8 text-white bg-gradient-to-br from-[#12a39a] to-[#0a6f6a] shadow-[0_24px_50px_-30px_rgba(10,111,106,0.8)] ${className}`}>
    <h3 className="font-black uppercase tracking-tight text-base md:text-lg mb-2">{title}</h3>
    <div className="text-white/90 text-sm md:text-base leading-relaxed font-medium space-y-3">{children}</div>
  </div>
);

// ---------------------------------------------------------------------------
// Plattform-Buehne: grosses Bild, darunter die Kacheln
// ---------------------------------------------------------------------------
// Die gewaehlte Kachel erscheint gross. Kacheln bleiben immer voll sichtbar --
// keine Abdunkelung; die gewaehlte bekommt einen Rahmen.
// ---------------------------------------------------------------------------

export interface ShowcaseTile {
  id: string;
  title: string;
  text: string;
  image: string;
}

export const PlatformShowcase: React.FC<{ tiles: ShowcaseTile[] }> = ({ tiles }) => {
  const [active, setActive] = useState(0);
  const current = tiles[active];

  return (
    <div>
      <div className="relative aspect-[16/9] rounded-card overflow-hidden bg-[#020617] shadow-[0_40px_80px_-40px_rgba(2,6,23,0.7)]">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.id}
            src={asset(current.image)}
            alt={`Turnierplattform im Look von ${current.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="mt-5 text-slate-600 text-sm md:text-base font-medium"
        >
          <span className="text-[#0b0f2a] font-black uppercase tracking-tight mr-2">{current.title}</span>
          {current.text}
        </motion.p>
      </AnimatePresence>

      <div className="mt-5 flex gap-3 overflow-x-auto overscroll-x-contain -mx-6 px-6 md:mx-0 md:px-0 py-2" style={{ scrollbarWidth: 'none' }}>
        {tiles.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`${t.title} anzeigen`}
              className={`shrink-0 w-[132px] md:w-[150px] text-left transition-transform duration-500 ${isActive ? '' : 'hover:-translate-y-1'}`}
            >
              <span
                className={`block aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-colors duration-300 ${
                  isActive ? 'border-[#0e958e]' : 'border-transparent'
                }`}
              >
                <img src={asset(t.image)} alt="" loading="lazy" className="w-full h-full object-cover" />
              </span>
              <span className={`block mt-2 text-[11px] md:text-xs font-black uppercase tracking-tight ${isActive ? 'text-[#0e958e]' : 'text-[#0b0f2a]'}`}>
                {t.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
