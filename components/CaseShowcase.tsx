import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface ShowcaseCase {
  page: string;
  category: string;
  title: string;
  text: string;
  /** Full-bleed backdrop. Omitted where no photograph exists for the case. */
  image?: string;
  /** The card in the rail. Falls back to `image`. */
  card?: string;
  imageAlt?: string;
}

// The photography each case actually has. BFV has none -- /images/cases/bfv.jpg
// is referenced elsewhere in the site but has never existed in the repository --
// so it runs on the site's own dark ground rather than borrowing a photo from
// another project and captioning it as BFV.
const CASES: ShowcaseCase[] = [
  {
    page: 'tsystems',
    category: 'Employer Branding',
    title: 'T-Systems',
    text: 'Eine maßgeschneiderte Gaming-Plattform, die technikaffine Schüler für IT-Berufe begeistert.',
    image: '/images/t-systems/hero.jpg',
    card: '/videos/case-tsystems.jpg',
    imageAlt: 'Gaming-Aktivierung für T-Systems von eSport Manufaktur'
  },
  {
    page: 'hagebau',
    category: 'Retail Activation',
    title: 'Hagebau',
    text: 'Gaming Days am Point of Sale — ein Erlebnis, das Zielgruppen in den Markt holt.',
    image: '/images/hagebau/hero-hagebau.jpg',
    card: '/videos/case-hagebau.jpg',
    imageAlt: 'Gaming Day Aktivierung für Hagebau von eSport Manufaktur'
  },
  {
    page: 'showdown-0711',
    category: 'Recruiting Event',
    title: '0711 Showdown',
    text: 'Ein EA FC25-Turnier als Recruiting-Format: über 100 Teilnehmende, Arbeitgeber auf Augenhöhe.',
    image: '/videos/case-showdown.jpg',
    imageAlt: '0711 Showdown eSport Recruiting Event von eSport Manufaktur'
  },
  {
    page: 'bayern-zockt',
    category: 'Verbandsformat',
    title: 'Bayern zockt',
    text: 'Digitale Qualifier und ein physisches Finale — Talentsichtung über einen ganzen Freistaat.',
    image: '/images/bayern-zockt/hero.jpg',
    card: '/videos/case-bayern-zockt.jpg',
    imageAlt: 'Bayern zockt eSport Turnierserie von eSport Manufaktur'
  },
  {
    page: 'bfv',
    category: 'eFootball',
    title: 'BFV eFootball',
    text: 'Die digitale Fußballplattform des Bayerischen Fußball-Verbands.',
    imageAlt: 'BFV eFootball Plattform von eSport Manufaktur'
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
 * above shows all five at once and is the way to compare them; this is the way
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
          transition={{ opacity: { duration: 0.6 }, scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
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

      {/* Legibility scrim: dark at the foot where the copy and the rail sit,
          and along the left where the headline runs. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/55 to-[#020617]/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-transparent to-transparent pointer-events-none" />

      {/* ---- Copy for the active case ---- */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pt-32 pb-8 md:pb-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">
              {current.category}
            </span>
            <h3 className="text-white text-[clamp(34px,5.5vw,68px)] font-black leading-[0.92] tracking-tighter uppercase mb-5 drop-shadow-2xl">
              {current.title}
            </h3>
            <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-lg">
              {current.text}
            </p>
            <button
              onClick={() => onNavigate?.(current.page)}
              className="group inline-flex items-center gap-2.5 bg-white hover:bg-emerald-400 text-slate-950 px-7 py-3.5 rounded-full font-black text-sm tracking-tight transition-colors duration-300"
            >
              Case ansehen
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Card rail ---- */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pb-10 md:pb-16">
        <div
          ref={railRef}
          className="case-rail flex gap-3 md:gap-4 overflow-x-auto pb-3 -mx-6 px-6 md:mx-0 md:px-0"
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
                className={`relative shrink-0 w-[112px] sm:w-[132px] md:w-[152px] aspect-[3/4] rounded-2xl overflow-hidden transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? 'scale-[1.06] opacity-100 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)] ring-2 ring-white/80'
                    : 'scale-100 opacity-55 hover:opacity-85 ring-1 ring-white/15'
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-3 text-left text-white text-[11px] md:text-xs font-black uppercase tracking-tight leading-tight">
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
