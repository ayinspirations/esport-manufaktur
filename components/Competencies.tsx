import React from 'react';
import { ArrowUpRight, ImageIcon } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { STAGGER, DUR, EASE_REVEAL_CSS } from './motion';
import { SECTION_PADDING } from './spacing';
import { useInView, useInViewContinuous } from '../hooks/useInView';
import { pillars, type ServiceListing } from './serviceCatalogue';

/**
 * How long a tile's own text waits after the tile starts moving.
 *
 * Roughly two thirds of the tile's travel: long enough that the surface has
 * clearly arrived first, short enough that the two still read as one gesture
 * rather than two separate animations.
 */
const TEXT_LAG = 0.26;

// ---------------------------------------------------------------------------
// The four pillars
// ---------------------------------------------------------------------------
// This section used to be a ten-card carousel you paged through, with a video
// looping behind four of the cards. It is four tiles now: the four things the
// company sells, side by side, all four on screen at once at every width above
// a phone. Everything else moved to the services page, where a filter reaches
// all ten without anyone having to page a track to find them.
//
// The tiles carry artwork rather than video. That is a design decision, not a
// performance one, but it happens to remove the last four autoplaying video
// elements from the homepage.
//
// Which four appear, what they are called and what they say all come from
// `serviceCatalogue` -- this file renders the list, it does not own it.
// ---------------------------------------------------------------------------

/**
 * The tile's artwork.
 *
 * Set `tileImage` on the service in `serviceCatalogue.ts` and it renders here.
 * Until then the tile shows a branded placeholder built from the site's own
 * dark ground and diagonal grid -- it reads as an intentional surface rather
 * than a missing image, so the section is presentable while the artwork is
 * still being produced, and it is obvious which tiles are still waiting.
 */
const TileArt: React.FC<{ item: ServiceListing }> = ({ item }) =>
  item.tileImage ? (
    <img
      src={item.tileImage}
      alt={item.tileImageAlt ?? ''}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 md:group-hover:scale-[1.08]"
    />
  ) : (
    <div className="absolute inset-0 tile-gradient transition-transform duration-500 ease-out group-hover:scale-105 md:group-hover:scale-[1.08]">
      {/* Same diagonal pattern as the hero, at tile scale, so a placeholder
          still belongs to the page it sits on. */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, transparent, transparent 26px, rgba(45, 212, 191, 0.5) 26px, rgba(45, 212, 191, 0.5) 27.5px)',
          maskImage: 'radial-gradient(ellipse 75% 60% at 62% 38%, white 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 62% 38%, white 0%, transparent 78%)'
        }}
      />
      <div className="absolute inset-x-0 top-0 h-1/2 flex flex-col items-center justify-center gap-3">
        <ImageIcon className="w-8 h-8 text-white/20" />
        <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.25em] border border-white/15 rounded-full px-2.5 py-1">
          Grafik folgt
        </span>
      </div>
    </div>
  );

// ---------------------------------------------------------------------------

const PillarCard: React.FC<{
  item: ServiceListing;
  onNavigate?: (page: any) => void;
  delay?: number;
}> = ({ item, onNavigate, delay = 0 }) => {
  const { ref: revealRef, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  // A second, continuous observer for the phone, where there is no hover to
  // open the tile's description with. It reports while the tile is properly on
  // screen -- not merely clipping the edge -- so the text appears as a tile is
  // scrolled to and goes again as it is scrolled past.
  //
  // `true` for the reduced-motion case: this decides whether text is *shown*,
  // not whether something animates, and a visitor on that setting should get
  // the copy rather than a permanently empty tile.
  const { ref: dwellRef, inView: dwelling } = useInViewContinuous<HTMLDivElement>(
    { threshold: 0.6 },
    true
  );

  // Both observers watch the same element. A callback ref feeds them both; it
  // runs before either hook's effect, so each finds its `.current` set.
  const setCardRef = (el: HTMLDivElement | null) => {
    (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (dwellRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const open = () => onNavigate?.(`service:${item.slug}`);

  return (
    <div
      ref={setCardRef}
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity ${DUR.reveal}s ${EASE_REVEAL_CSS} ${delay}s, transform ${DUR.reveal}s ${EASE_REVEAL_CSS} ${delay}s`
      }}
      className="group relative rounded-surface overflow-hidden select-none cursor-pointer aspect-[3/4]"
    >
      <TileArt item={item} />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/25 to-transparent" />

      {/* The tile arrives, then its label -- not both at once.
          A card whose text is already painted while the card itself is still
          sliding up reads as two things happening on top of each other. Held
          back by a beat, the tile lands and the label settles onto it. */}
      <div
        className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(14px)',
          transition: `opacity ${DUR.interact}s ${EASE_REVEAL_CSS} ${delay + TEXT_LAG}s, transform ${DUR.interact}s ${EASE_REVEAL_CSS} ${delay + TEXT_LAG}s`
        }}
      >
        <div className="min-w-0 card-text-col">
          <h3 className="text-white font-black text-lg lg:text-[19px] tracking-tight uppercase leading-[1.1]">
            {item.title}
          </h3>
          <div className={`card-desc-wrap overflow-hidden ${dwelling ? 'is-visible' : ''}`}>
            <p className="mt-2 text-white/70 text-[13px] lg:text-sm font-medium leading-snug break-words [overflow-wrap:break-word]">
              {item.tagline}
            </p>
          </div>
        </div>

        <div className="shrink-0 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:scale-110">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-950" />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------

interface CompetenciesProps {
  onNavigate?: (page: any) => void;
}

export const Competencies: React.FC<CompetenciesProps> = ({ onNavigate }) => (
  // scroll-mt clears the sticky bar (56px pill + 32px top inset = 88px), so
  // jumping to this section never parks its heading or the first row of
  // tiles underneath the navigation.
  <div className="w-full flex items-center justify-center scroll-mt-28" id="competencies">
    <section className={`w-full ${SECTION_PADDING} bg-transparent relative overflow-hidden`}>
      {/* Closed at rest, opens on hover -- and the hover rule is fenced
          behind a real pointer on purpose.

          There used to be a `(hover: none)` rule pinning the description
          permanently open, so the same card showed its full paragraph on a
          phone and only its title on a desktop. Deleting that was right;
          letting the `:hover` rule through to touch alongside it was not.
          Touch browsers emulate hover on the first tap and hold the click
          back until the second, which is what stopped the cards opening
          their service pages. The :hover rule is still fenced behind a real
          pointer, so a tap navigates first time; on touch the description is
          opened by a class the scroll position drives instead. */}
      <style>{`
        .card-desc-wrap { max-height: 0; opacity: 0; transition: max-height 350ms ease, opacity 300ms ease; }
        @media (hover: hover) and (pointer: fine) {
          .group:hover .card-desc-wrap,
          .group:focus-within .card-desc-wrap { max-height: 420px; opacity: 1; }
        }
        /* Without a pointer there is no hover to open these with, so scroll
           position does the job: the description appears once its tile is
           properly on screen and closes again as it leaves. Fenced to coarse
           pointers so a desktop tile never opens on its own. */
        @media (hover: none), (pointer: coarse) {
          .card-desc-wrap.is-visible { max-height: 420px; opacity: 1; }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
        <div className="mb-10 md:mb-14">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(28px,4.5vw,56px)] font-black text-[#0b0f2a] leading-[0.9] tracking-tighter uppercase">
              <RevealText as="span" by="word" text="Unsere" />
              <RevealText as="span" by="word" text="Services." className="text-[#0e958e] italic" delay={0.16} />
            </h2>
            <Reveal as="p" delay={0.34} className="text-slate-900 font-bold text-lg md:text-xl mt-5 max-w-xl leading-snug tracking-tight">
              Wir entwickeln Lösungen, die aus Aufmerksamkeit echte Interaktion machen.
            </Reveal>
            <Reveal as="p" delay={0.42} className="text-slate-600 font-medium text-base md:text-lg mt-3 max-w-2xl leading-relaxed tracking-tight">
              Von der strategischen Idee bis zur Umsetzung im physischen und digitalen Raum: Wir verbinden Kreation, Technologie und Produktion zu Aktivierungen, die Menschen erreichen, Marken erlebbar machen und messbare Wirkung schaffen.
            </Reveal>
          </div>
        </div>

        {/* Four tiles, four columns from lg. No carousel: with exactly four
            they all fit, and a track you have to page through was only ever
            there to cope with ten. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((item, i) => (
            <PillarCard key={item.slug} item={item} onNavigate={onNavigate} delay={i * STAGGER.card} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 md:mt-16">
          <button
            onClick={() => onNavigate?.('services')}
            className="group inline-flex items-center gap-2.5 bg-[#0b0f2a] hover:bg-[#0e958e] text-white px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Alle Leistungen entdecken
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </Reveal>
      </div>
    </section>
  </div>
);
