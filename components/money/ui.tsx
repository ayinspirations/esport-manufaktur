import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
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
  CtaProps & { eyebrow: string; title: string; accent: string; lead?: string; body: React.ReactNode; tagline?: string; image: string; imageAlt: string }
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
      <Reveal as="div" delay={0.32} className="mt-5 md:mt-7 text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-2xl tracking-tight space-y-3">
        {body}
      </Reveal>
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

/** Haekchen-Liste in Spalten. */
export const CheckList: React.FC<{ items: string[]; columns?: 1 | 2 | 3 | 4; dark?: boolean }> = ({ items, columns = 2, dark }) => {
  const cols = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <ul className={`grid ${cols} gap-x-8 gap-y-3`}>
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-2.5 font-bold text-sm md:text-base ${dark ? 'text-white/85' : 'text-[#0b0f2a]'}`}>
          <Check className={`w-4 h-4 mt-1 shrink-0 ${dark ? 'text-[#2dd4bf]' : 'text-[#0e958e]'}`} strokeWidth={3} />
          {item}
        </li>
      ))}
    </ul>
  );
};

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
// Kopf mit Kacheln -- wie die Buehne auf der Startseite
// ---------------------------------------------------------------------------
// Unten eine Reihe Kacheln; die gewaehlte Kachel wird zum Hintergrund. Ohne
// Bild laeuft die Kachel auf der dunklen Flaeche.
// ---------------------------------------------------------------------------

export interface HeroTile {
  id: string;
  title: string;
  text: string;
  image?: string;
}

export const TileHero: React.FC<
  CtaProps & { eyebrow: string; title: string; accent: string; body: React.ReactNode; tiles: HeroTile[] }
> = ({ eyebrow, title, accent, body, tiles, label, onBooking, onContact, secondary }) => {
  const [active, setActive] = useState(0);
  const current = tiles[active];

  return (
    <section
      data-nav-ground="dark"
      className="relative w-full min-h-screen-dyn overflow-hidden bg-[#020617] flex flex-col justify-end"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0"
        >
          {current.image && (
            <img
              src={asset(current.image)}
              alt={current.title}
              fetchPriority={active === 0 ? 'high' : undefined}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: '50% 55%' }}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #020617 0%, rgba(2,6,23,0.88) 28%, rgba(2,6,23,0.45) 58%, rgba(2,6,23,0.35) 100%)' }}
      />
      <div
        className="hidden sm:block absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(2,6,23,0.8) 0%, rgba(2,6,23,0.3) 45%, rgba(2,6,23,0) 70%)' }}
      />

      <div className={`${CONTAINER} relative z-10 w-full pt-28 md:pt-32`}>
        <Reveal duration={0.6} className="text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-5 md:mb-6">
          {eyebrow}
        </Reveal>
        <h1 className="text-[clamp(36px,5.2vw,72px)] font-black leading-[0.92] tracking-tighter uppercase text-white max-w-4xl">
          <span className="sr-only">{eyebrow}: </span>
          <RevealText as="span" by="word" text={title} delay={0.05} className="block" />
          <RevealText as="span" by="word" text={accent} delay={0.18} className="block text-[#2dd4bf] italic" />
        </h1>
        <Reveal as="div" delay={0.28} className="mt-5 md:mt-7 text-white/75 text-base md:text-lg font-medium leading-relaxed max-w-2xl tracking-tight space-y-3">
          {body}
        </Reveal>
        <Reveal delay={0.36} className="mt-7 md:mt-9 flex flex-wrap items-center gap-4 md:gap-6">
          <ExpandingCTA label={label} tone="light" onBooking={onBooking} onContact={onContact} />
          {secondary && <SecondaryLink {...secondary} />}
        </Reveal>
      </div>

      {/* Kachelreihe mit der Beschreibung der gewaehlten Kachel */}
      <div className={`${CONTAINER} relative z-10 w-full pt-6 md:pt-8 pb-6 md:pb-10`}>
        <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-10">
          <div
            className="flex gap-3 md:gap-4 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 pt-3 pb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {tiles.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`${t.title} anzeigen`}
                  className={`group relative shrink-0 w-[96px] sm:w-[110px] md:w-[124px] aspect-[3/4] rounded-[20px] overflow-hidden bg-[#0b1530] transition-[transform,box-shadow] duration-500 ${
                    isActive
                      ? '-translate-y-2 scale-[1.04] ring-2 ring-[#2dd4bf] shadow-[0_28px_54px_-20px_rgba(0,0,0,0.9)]'
                      : 'shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)] hover:-translate-y-1'
                  }`}
                >
                  {t.image && <img src={asset(t.image)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />}
                  <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-transparent' : 'bg-[#020617]/55 group-hover:bg-[#020617]/25'}`} />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-2.5 text-left text-[10px] md:text-[11px] font-black uppercase tracking-tight leading-tight text-white hyphens-auto break-words" lang="de">
                    {t.title}
                  </span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-white/80 text-sm md:text-base font-medium leading-relaxed max-w-sm lg:pb-3"
            >
              <span className="block text-[#2dd4bf] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-1.5">{current.title}</span>
              {current.text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
