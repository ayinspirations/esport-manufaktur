import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface ShowcaseCase {
  page: string;
  /**
   * Das Schlagwort zum Case. Steht aktuell nicht auf der Kachel -- die Pille
   * darueber nahm dem Titel den Auftakt und sagte in zwei Woertern, was die
   * Zeile darunter ohnehin sagt. Das Feld bleibt, weil es die Cases
   * beschreibt, nicht ihre Darstellung.
   */
  category: string;
  title: string;
  text: string;
  /** Full-bleed backdrop. Omitted where no photograph exists for the case. */
  image?: string;
  /** The card in the rail. Falls back to `image`. */
  card?: string;
  imageAlt?: string;
}

// The photography each case actually has. BFV, INTERSPORT, REWE und die XP
// Days haben noch keine -- die Pfade stehen im Code, die Dateien fehlen im
// Projekt --, also laufen sie auf der eigenen dunklen Flaeche der Seite,
// statt sich eine Aufnahme aus einem anderen Projekt zu leihen und sie als
// ihre auszugeben.
const CASES: ShowcaseCase[] = [
  {
    page: 'tsystems',
    category: 'Employer Branding',
    title: 'T-Systems',
    text: 'Eine deutschlandweite Gaming-Aktivierung, die junge Tech-Talente für den Arbeitgeber T-Systems gewinnt.',
    image: '/images/t-systems/hero.jpg',
    card: '/videos/case-tsystems.jpg',
    imageAlt: 'Gaming-Aktivierung für T-Systems von GG Manufaktur'
  },
  {
    page: 'hagebau',
    category: 'Retail Activation',
    title: 'Hagebau',
    text: 'Recruiting-Game, Messeaktivierung und eigene Gaming Days — ein Kreislauf, der bis zur Bewerbung führt.',
    image: '/images/hagebau/hero-hagebau.jpg',
    card: '/videos/case-hagebau.jpg',
    imageAlt: 'Gaming Day Aktivierung für Hagebau von GG Manufaktur'
  },
  {
    page: 'showdown-0711',
    category: 'Recruiting Event',
    title: '0711 Showdown',
    text: 'Fünf Arbeitgeber, 64 junge Talente, ein EA SPORTS FC-Turnier — und die Vorstufe der XP Days.',
    image: '/videos/case-showdown.jpg',
    imageAlt: '0711 Showdown eSport Recruiting Event von GG Manufaktur'
  },
  {
    page: 'bayern-zockt',
    category: 'Verbandsformat',
    title: 'Bayern zockt',
    text: 'Eine digitale EM im Originalmodus, mit Finale im Stadion des 1. FC Augsburg.',
    image: '/images/bayern-zockt/hero.jpg',
    card: '/videos/case-bayern-zockt.jpg',
    imageAlt: 'Bayern zockt eSport Turnierserie von GG Manufaktur'
  },
  {
    page: 'bfv',
    category: 'eFootball',
    title: 'BFV eFootball',
    text: 'Die digitale Fußballplattform des Bayerischen Fußball-Verbands — Kunde seit unserer Gründung.',
    imageAlt: 'BFV eFootball Plattform von GG Manufaktur'
  },
  {
    page: 'intersport',
    category: 'Retail Activation',
    title: 'INTERSPORT',
    text: 'Sechs Wochen Pop-up-Gaming im Clubhouse Berlin, mit eigenem EA SPORTS FC 26-Turnier.',
    imageAlt: 'INTERSPORT Clubhouse Gaming-Aktivierung von GG Manufaktur'
  },
  {
    page: 'rewe',
    category: 'Sponsoring-Aktivierung',
    title: 'REWE',
    text: 'Scouting für den 1. FC Köln, Community-Turniere und Recruiting — aus einem Sponsoring wird eine Plattform.',
    imageAlt: 'REWE eSport-Aktivierung mit dem 1. FC Köln von GG Manufaktur'
  },
  {
    page: 'xp-days',
    category: 'Eigenes Format',
    title: 'XP Days',
    text: 'Unsere eigene Karrieremesse: Plattform, XP-System, Videocontent und Gaming-Erlebniswelt in einem Format.',
    imageAlt: 'XP Days gamifizierte Karrieremesse von GG Manufaktur'
  }
];

/** The dark ground a case without photography runs on. */
const FallbackGround: React.FC = () => (
  <div className="absolute inset-0 tile-gradient">
    <div
      className="absolute inset-0 opacity-50"
      style={{
        backgroundImage:
          'repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(45, 212, 191, 0.45) 38px, rgba(45, 212, 191, 0.45) 40px)',
        maskImage: 'radial-gradient(ellipse 70% 65% at 68% 45%, white 0%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 68% 45%, white 0%, transparent 78%)'
      }}
    />
  </div>
);

// ---------------------------------------------------------------------------

/**
 * The Best Cases again, as a full-viewport stage.
 *
 * One case fills the screen behind a rail of cards; picking a card swaps the
 * backdrop to it and brings that card to the front of the rail. The mosaic
 * above shows them all at once and is the way to compare them; this is the way
 * to look at one.
 *
 * Only the active backdrop is mounted -- five full-bleed photographs held in
 * the DOM at once is several megabytes of decoded bitmap sitting there for a
 * section most visitors will scroll past. They are prefetched into the HTTP
 * cache when the section comes into view instead, so the first switch is
 * instant without any of them being decoded up front.
 */
export const CaseShowcase: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.05, rootMargin: '200px' });

  const current = CASES[active];

  // Warm the backdrops once the stage is near. Fetched, not rendered: they land
  // in the HTTP cache so a switch paints immediately, without five decoded
  // bitmaps being held in memory for a section nobody may interact with.
  useEffect(() => {
    if (!inView) return;
    for (const c of CASES) {
      if (!c.image) continue;
      const img = new Image();
      img.src = c.image;
    }
  }, [inView]);

  // Bring the chosen card to the front of the rail.
  //
  // `scrollIntoView` is not used: it scrolls every scrollable ancestor,
  // including the page, so choosing a card would also drag the stage around
  // under the visitor. Setting scrollLeft moves the rail and nothing else.
  useEffect(() => {
    const rail = railRef.current;
    const card = cardRefs.current[active];
    if (!rail || !card) return;
    rail.scrollTo({
      left: Math.max(card.offsetLeft - rail.clientWidth * 0.06, 0),
      behavior: 'smooth'
    });
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="case-showcase"
      data-nav-ground="dark"
      aria-label="Best Cases im Überblick"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#020617] flex flex-col justify-end"
    >
      {/* ---- Backdrop ---- */}
      {/* Default mode, not "wait" or "popLayout": the outgoing and incoming
          backdrops are both absolutely positioned and stacked, so letting them
          overlap for a moment is exactly what produces the crossfade. "wait"
          would blank the stage between the two. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.page}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0"
        >
          {current.image ? (
            <img
              src={current.image}
              alt={current.imageAlt ?? ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <FallbackGround />
          )}
        </motion.div>
      </AnimatePresence>

      {/*
        Legibility scrim, weighted rather than even.

        A flat wash across the whole frame took the same amount out of the
        picture everywhere, so the photograph never got to be bright anywhere
        and the whole stage read as hazy. This keeps the upper middle of the
        image close to full strength and spends the darkness where it is
        actually needed: the foot, under the copy and the rail, a touch at the
        very top for the navigation, and a soft fall from the left where the
        headline runs.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #020617 0%, rgba(2,6,23,0.94) 20%, rgba(2,6,23,0.5) 48%, rgba(2,6,23,0.08) 74%, rgba(2,6,23,0.45) 100%)'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.3) 36%, rgba(2,6,23,0) 66%)'
        }}
      />

      {/* ---- Copy for the active case ---- */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pt-32 pb-8 md:pb-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <h3 className="text-white text-[clamp(34px,5.5vw,68px)] font-black leading-[0.92] tracking-tighter uppercase mb-5 drop-shadow-2xl">
              {current.title}
            </h3>
            <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-lg">
              {current.text}
            </p>
            <button
              onClick={() => onNavigate?.(current.page)}
              className="group inline-flex items-center gap-2.5 bg-white hover:bg-emerald-400 text-slate-950 px-7 py-3.5 rounded-full font-black text-sm tracking-tight transition-colors duration-500"
            >
              Case ansehen
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Card rail ---- */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pb-4 md:pb-8">
        {/*
          The vertical padding is inside the scroller, not around it.

          `overflow-x: auto` does not stay on one axis -- the computed
          overflow-y becomes auto with it -- so the rail is a clipping box in
          both directions. The active card lifts and grows, and its shadow
          spreads well past its own box, and all of that was being sliced off
          at the top and bottom edges. Padding within the scroll box is room
          the card can actually use; a margin outside it would not be.
        */}
        <div
          ref={railRef}
          className="case-rail flex items-end gap-3 md:gap-5 overflow-x-auto pt-12 pb-12 -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CASES.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.page}
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => setActive(i)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${c.title} anzeigen`}
                className={`group relative shrink-0 w-[136px] sm:w-[158px] md:w-[184px] aspect-[3/4] rounded-[22px] overflow-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? '-translate-y-3 scale-[1.05] shadow-[0_38px_70px_-24px_rgba(0,0,0,0.9)]'
                    : 'shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)] hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.85)]'
                }`}
              >
                {c.card || c.image ? (
                  <img
                    src={c.card ?? c.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <FallbackGround />
                )}

                {/*
                  Inactive cards are held back with a wash over the artwork
                  rather than with `opacity`. Opacity fades the card toward the
                  backdrop it sits on, which drains the colour out of a row of
                  game artwork and is what made these read as flat and grey.
                  A dark wash keeps every card fully opaque -- the artwork stays
                  saturated, it is just in shadow until it is picked.
                */}
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive ? 'bg-transparent' : 'bg-[#020617]/55 group-hover:bg-[#020617]/25'
                  }`}
                />

                {/* Foot scrim, so the title holds against any artwork. */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                <span
                  className={`absolute inset-x-0 bottom-0 p-3 md:p-3.5 text-left text-[11px] md:text-xs font-black uppercase tracking-tight leading-tight transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-white/75'
                  }`}
                >
                  {c.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`.case-rail::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};
