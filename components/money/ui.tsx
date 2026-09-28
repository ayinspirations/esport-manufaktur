import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  CtaProps & { eyebrow: string; title: string; accent: string; lead?: string; body?: React.ReactNode; tagline?: string; image: string; imageAlt: string;
    /** Telefon: Unterzeile und Fliesstext ausblenden (die Seite zeigt sie unter dem Kopf). */
    compactMobile?: boolean;
    /** Schriftgroesse der H1, falls der Titel lang ist. */
    titleSize?: string }
> = ({ eyebrow, title, accent, lead, body, tagline, image, imageAlt, label, onBooking, onContact, secondary, compactMobile, titleSize = 'text-[clamp(38px,6.4vw,90px)]' }) => (
  <section
    data-nav-ground="dark"
    className="relative w-full overflow-hidden bg-[#020617] flex items-end min-h-[78vh] md:min-h-[86vh] pt-40 md:pt-52 pb-14 md:pb-24"
  >
    <img src={asset(image)} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
    {/* Telefon: gleichmaessig abgedunkelt, damit das Bild bis zur Unterkante sichtbar
        bleibt. Breite Schirme: Verlauf hinter dem Text, Bild rechts frei. */}
    <div className="sm:hidden absolute inset-0 bg-[#020617]/60" />
    <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/75 to-[#020617]/25" />
    <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent" />
    <div className={`${CONTAINER} relative z-10 w-full`}>
      <Reveal duration={0.6} className="text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-5 md:mb-7">
        {eyebrow}
      </Reveal>
      <h1 className={`${titleSize} font-black leading-[0.92] tracking-tighter uppercase text-white max-w-5xl`}>
        {/* Der Suchbegriff steht im Eyebrow; fuer Suchmaschinen gehoert er auch in die H1. */}
        <span className="sr-only">{eyebrow}: </span>
        <RevealText as="span" by="word" text={title} delay={0.05} className="block" />
        <RevealText as="span" by="word" text={accent} delay={0.18} className="block text-[#2dd4bf] italic" />
      </h1>
      {lead && (
        <Reveal as="p" delay={0.26} className={`${compactMobile ? 'hidden sm:block' : ''} mt-5 md:mt-7 text-white font-black text-lg md:text-2xl tracking-tight max-w-3xl`}>
          {lead}
        </Reveal>
      )}
      {body && (
        <Reveal as="div" delay={0.32} className={`${compactMobile ? 'hidden sm:block' : ''} mt-5 md:mt-7 text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-2xl tracking-tight space-y-3`}>
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
export const ImageCard: React.FC<{ title: string; text: string; image: string; textClass?: string }> = ({ title, text, image, textClass = 'min-h-[3.25em]' }) => (
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
      {/* Feste Mindesthoehe fuer den Text: so stehen die Titel einer Reihe auf
          derselben Hoehe, auch wenn ein Text eine Zeile laenger ist. */}
      <p className={`text-white/70 text-sm leading-relaxed font-medium ${textClass}`}>{text}</p>
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
  const railRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Waehlen scrollt nur die Kachelreihe, nie die Seite: die gewaehlte Kachel
  // rueckt in den sichtbaren Bereich der Reihe.
  const select = (i: number) => {
    const next = (i + tiles.length) % tiles.length;
    setActive(next);
    const rail = railRef.current;
    const tile = tileRefs.current[next];
    if (rail && tile) {
      const left = tile.offsetLeft - rail.offsetLeft - (rail.clientWidth - tile.clientWidth) / 2;
      rail.scrollTo({ left, behavior: 'smooth' });
    }
  };

  const arrow =
    'w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/70 backdrop-blur-md border border-white/80 text-[#0b0f2a] shadow-[0_8px_24px_-12px_rgba(11,15,42,0.45)] transition-[transform,background-color] duration-300 hover:bg-white active:scale-95';

  return (
    <div>
      {/* Alle Bilder liegen uebereinander und sind von Anfang an geladen; beim
          Wechsel wird nur die Deckkraft ueberblendet -- nichts laedt nach,
          nichts springt. */}
      <div className="relative aspect-[16/9] rounded-card overflow-hidden bg-[#020617] shadow-[0_40px_80px_-40px_rgba(2,6,23,0.7)]">
        {tiles.map((t, i) => (
          <img
            key={t.id}
            src={asset(t.image)}
            alt={i === active ? `Turnierplattform im Look von ${t.title}` : ''}
            aria-hidden={i !== active}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Beschreibung und Pfeile. Alle Beschreibungen stehen im selben
          Rasterfeld uebereinander; die Hoehe richtet sich nach der laengsten,
          also verschiebt ein zweizeiliger Text nichts darunter. */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="grid flex-1 min-w-0">
          {tiles.map((t, i) => (
            <p
              key={t.id}
              aria-hidden={i !== active}
              className="[grid-area:1/1] text-slate-600 text-sm md:text-base font-medium transition-opacity duration-500"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <span className="text-[#0b0f2a] font-black uppercase tracking-tight mr-2">{t.title}</span>
              {t.text}
            </p>
          ))}
        </div>
        <div className="flex shrink-0 gap-2.5">
          <button type="button" onClick={() => select(active - 1)} aria-label="Vorherige Plattform" className={arrow}>
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button type="button" onClick={() => select(active + 1)} aria-label="Nächste Plattform" className={arrow}>
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-5 flex gap-3 overflow-x-auto overscroll-x-contain -mx-6 px-6 md:mx-0 md:px-0 py-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {tiles.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { tileRefs.current[i] = el; }}
            onClick={() => select(i)}
            aria-current={i === active ? 'true' : undefined}
            aria-label={`${t.title} anzeigen`}
            // Keine Bewegung bei der Auswahl: die Reihe bleibt, wo sie ist.
            className="shrink-0 w-[132px] md:w-[150px]"
          >
            <span className="block aspect-[16/10] rounded-2xl overflow-hidden">
              <img src={asset(t.image)} alt="" decoding="async" className="w-full h-full object-cover" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
