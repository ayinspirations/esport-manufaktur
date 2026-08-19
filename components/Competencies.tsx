
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronLeft, Camera } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { STAGGER, DUR, EASE_REVEAL_CSS } from './motion';
import { useInView } from '../hooks/useInView';
import { LazyVideo } from './LazyVideo';

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  video?: string;
  page?: string;
  /** True when no real project/stock photo is available yet -- renders a
      clearly-labelled placeholder instead of a photo. */
  placeholder?: boolean;
}

const data: ServiceItem[] = [
  {
    title: "Strategie & Konzeption",
    image: "/Strategie.jpg",
    imageAlt: "Strategie-Workshop für eSport Marketing bei eSport Manufaktur",
    description: "Wir entwickeln Aktivierungskonzepte, die Gaming, eSport und Gamification gezielt verbinden – von digitalen Challenges und Quests bis zu physischen Events und Markenerlebnissen.",
    page: "strategie-konzeption"
  },
  {
    title: "Content & Streaming",
    video: "/videos/BestCase4.mov",
    image: "/REWExfckoln_1770162125933.jpg",
    imageAlt: "Professionelle Streaming-Produktion für Gaming-Content bei eSport Manufaktur",
    description: "Wir übersetzen Produkte und Markenbotschaften in interaktive und gamifizierte Erlebnisse, die authentisch unterhalten, aktivieren und im Gedächtnis bleiben.",
    page: "content-streaming"
  },
  {
    title: "Digitale Lösungen",
    video: "/videos/Gamification.MOV",
    image: "/Gamification.jpg",
    imageAlt: "Gamification-Plattform für digitale Markenaktivierung bei eSport Manufaktur",
    description: "Digitale Messe- & Eventpässe, Quizformate, Games, eSport-Turniere oder komplette digitale Eventformate: Auf Basis unserer modularen Software-Komponenten und individueller Entwicklung schaffen wir maßgeschneiderte Lösungen, die aktivieren, begeistern und messbar wirken.",
    page: "digitale-loesungen"
  },
  {
    title: "Messen & Events",
    video: "/videos/Eventtechnik.mov",
    image: "/images/competencies/eventtechnik.jpg",
    imageAlt: "Eventtechnik-Setup für Gaming-Messen und Live-Events bei eSport Manufaktur",
    description: "Wir entwickeln zielgruppenrelevante Aktivierungen und ganzheitliche Eventkonzepte – vom einzelnen Erlebnis am Messestand bis zur Konzeption, Organisation und Umsetzung kompletter Messen und Events.",
    page: "messen-events"
  },
  {
    title: "Foto & Video",
    image: "",
    imageAlt: "Platzhalterbild für den Bereich Foto & Video bei eSport Manufaktur",
    description: "Wir begleiten Gaming- und eSport-Events mit erfahrenen Foto- und Videoteams und produzieren authentischen Content, der Atmosphäre, Emotionen und Markenbotschaften hochwertig einfängt.",
    placeholder: true
  },
  {
    title: "Art Design & Messebau",
    image: "/hero-rewe.jpg",
    imageAlt: "Individuell gestalteter Gaming-Messestand mit Custom-Branding bei eSport Manufaktur",
    description: "Du brauchst individuelle Möbel, Setups oder Infrastruktur für dein Gaming- und eSport-Event? Wir entwickeln maßgeschneiderte Raum- und Ausstattungskonzepte und realisieren diese gemeinsam mit erfahrenen Messebau-Partnern."
  },
  {
    title: "Eventtechnik & Produktion",
    image: "/images/hagebau/slide-2.jpg",
    imageAlt: "Eventtechnik und Produktionsequipment bei einer Gaming-Aktivierung von eSport Manufaktur",
    description: "Von Gaming-Hardware und Netzwerktechnik bis zu Regie, Streaming- und Veranstaltungstechnik: Wir planen die technische Infrastruktur und sorgen gemeinsam mit unseren Partnern für einen reibungslosen Betrieb vor Ort."
  },
  {
    title: "Creator & Talent Activation",
    image: "/images/hagebau/slide-1.jpg",
    imageAlt: "Creator-Aktivierung mit Moderation auf einer Gaming-Bühne bei eSport Manufaktur",
    description: "Wir integrieren passende Creator, Hosts, Moderatoren und eSport-Talents in Kampagnen und Events – von der Auswahl und Konzeption bis zur authentischen Aktivierung der jeweiligen Community."
  },
  {
    title: "Scouting & Talent Development",
    image: "/images/status-quo/rewe-event.jpg",
    imageAlt: "Bühne des Scouting Cup Finales einer eSport-Talentförderung bei eSport Manufaktur",
    description: "Wir entwickeln ganzheitliche Scouting-Lösungen für Vereine und Verbände – von digitalen Qualifiern und Turnierserien bis zu physischen Scouting-Events und Finals. Online und offline greifen dabei nahtlos ineinander, um Talente gezielt zu erreichen, zu identifizieren und langfristig zu entwickeln."
  },
  {
    title: "Recruiting & Employer Branding",
    image: "/hero-gamechanger.jpg",
    imageAlt: "Employer-Branding-Aktivierung im Gaming-Umfeld bei eSport Manufaktur",
    description: "Wir nutzen Gaming, eSport und Gamification, um Arbeitgebermarken erlebbar zu machen und junge Zielgruppen authentisch zu erreichen – von digitalen Challenges und Recruiting-Games bis zu Turnieren, Messeaktivierungen und hybriden Kampagnen."
  }
];

// -- Card: shared by mobile and desktop -- rounded card, image background,
// title + arrow cluster at rest, description reveals on hover by growing
// underneath the title (which pushes the title upward since the text
// column is bottom-anchored to the same row as the arrow). No shadow/
// border on the card itself, only the bottom readability gradient.
const ServiceCard: React.FC<{
  item: ServiceItem;
  onNavigate?: (page: any) => void;
  /** Stagger offset in seconds for the entry reveal. */
  delay?: number;
  /** Sizing/placement classes. Supplied by whichever layout renders the card
      -- the mobile carousel wants a fixed track width, the desktop grid wants
      a column span and its own aspect ratio. */
  sizing?: string;
  /** Overrides the card's own visibility check.
   *
   *  Inside the mobile carousel the card must not decide for itself. Only the
   *  first two cards are ever within the viewport horizontally; the rest sit
   *  hundreds of pixels off to the right, so their observer never fires and
   *  they stay at opacity 0 until swiped to -- eight of ten services were
   *  effectively invisible. The carousel watches its own track instead and
   *  reveals the whole row at once. */
  visible?: boolean;
}> = ({ item, onNavigate, delay = 0, sizing = '', visible }) => {
  const clickable = Boolean(item.page);
  // The reveal lives on the card's own root rather than in a wrapper element:
  // these cards are direct children of a flex + scroll-snap track, and an
  // extra box between the track and the card would break both the snap
  // alignment and the per-card width basis.
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const shown = visible ?? inView;

  return (
    <div
      ref={ref}
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? () => onNavigate?.(item.page) : undefined}
      onKeyDown={clickable ? (e) => (e.key === 'Enter' || e.key === ' ') && onNavigate?.(item.page) : undefined}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity ${DUR.reveal}s ${EASE_REVEAL_CSS} ${delay}s, transform ${DUR.reveal}s ${EASE_REVEAL_CSS} ${delay}s`
      }}
      className={`group relative rounded-surface overflow-hidden select-none ${sizing} ${clickable ? 'cursor-pointer' : ''}`}
    >
      {item.placeholder ? (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center gap-3 transition-transform duration-500 ease-out group-hover:scale-105">
          <Camera className="w-10 h-10 text-white/25" />
          <span className="text-white/50 text-[10px] font-black uppercase tracking-widest border border-white/20 rounded-full px-2.5 py-1">
            Platzhalter
          </span>
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105 md:group-hover:scale-[1.08]"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          {item.video && (
            <LazyVideo
              src={item.video}
              poster={item.image}
              aria-label={item.imageAlt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 md:group-hover:scale-[1.08]"
            />
          )}
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-3">
        <div className="min-w-0 card-text-col">
          <h3 className="text-white font-black text-lg lg:text-[19px] tracking-tight uppercase leading-[1.1]">
            {item.title}
          </h3>
          <div className="card-desc-wrap overflow-hidden">
            <p className="mt-2 text-white/70 text-[13px] lg:text-sm font-medium leading-snug break-words [overflow-wrap:break-word]">
              {item.description}
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

const ARROW_BUTTON =
  'spring w-11 h-11 rounded-full border border-[#0b0f2a]/20 flex items-center justify-center ' +
  'text-[#0b0f2a] disabled:opacity-30 disabled:cursor-not-allowed ' +
  'hover:enabled:bg-[#0e958e] hover:enabled:border-[#0e958e] hover:enabled:text-white';

// -- Carousel: shared scroll-snap track + prev/next buttons for both mobile
// and desktop. Native smooth scrolling gives the clean horizontal slide
// (no jump-cut), and the peek-padding percentages are tuned per breakpoint
// to match each card width so the active card centers with neighbors
// peeking on both sides, same mechanic across all screen sizes.
const ServicesCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(window.getComputedStyle(el).columnGap || '0') || 0;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <style>{`.services-carousel-track::-webkit-scrollbar{display:none}`}</style>
      <div
        ref={trackRef}
        // Phone keeps the centred single card with its neighbours peeking, so
        // the percentage padding stays there. From md the track runs flush
        // with the container and simply holds three or four cards at a time --
        // a peek offset would only push the row out of alignment with the
        // heading above it.
        className="services-carousel-track flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-6 px-[10%] sm:px-[22.5%] md:mx-0 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
      <div className="flex items-center justify-end gap-3 mt-8">
        <button onClick={() => scrollByCard(-1)} disabled={!canLeft} aria-label="Zurück"
          className={ARROW_BUTTON}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={() => scrollByCard(1)} disabled={!canRight} aria-label="Weiter"
          className={ARROW_BUTTON}>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface CompetenciesProps {
  onNavigate?: (page: any) => void;
}

export const Competencies: React.FC<CompetenciesProps> = ({ onNavigate }) => {
  // Drives the reveal for every card in the carousel at once -- see the
  // `visible` prop on ServiceCard for why the cards cannot decide this alone.
  const { ref: trackWrapRef, inView: trackInView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    // scroll-mt clears the sticky bar (56px pill + 32px top inset = 88px), so
    // jumping to this section never parks its heading or the first row of
    // tiles underneath the navigation.
    <div className="w-full flex items-center justify-center scroll-mt-28" id="competencies">
      <section className={`w-full pt-6 md:pt-8 lg:pt-10 pb-16 md:pb-24 lg:pb-28 bg-transparent relative overflow-hidden`}>
        {/* Closed at rest, opens on hover -- and the hover rule is fenced
            behind a real pointer on purpose.

            There used to be a `(hover: none)` rule pinning the description
            permanently open, so the same card showed its full paragraph on a
            phone and only its title on a desktop. Deleting that was right;
            letting the `:hover` rule through to touch alongside it was not.
            Touch browsers emulate hover on the first tap and hold the click
            back until the second, which is what stopped the cards opening
            their service pages. On touch the description simply stays closed
            and a tap navigates, first time. */}
        <style>{`
          .card-desc-wrap { max-height: 0; opacity: 0; }
          @media (hover: hover) and (pointer: fine) {
            .card-desc-wrap { transition: max-height 350ms ease, opacity 300ms ease; }
            .group:hover .card-desc-wrap,
            .group:focus-within .card-desc-wrap { max-height: 420px; opacity: 1; }
          }
        `}</style>

        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          {/* Section intro on the shared motion vocabulary: the headline
              builds character by character, then the two support lines follow
              as their own staggered beat -- one authored sequence rather than
              the whole block fading in at once. */}
          <div className="mb-16 md:mb-24 lg:mb-28">
            <div className="max-w-3xl">
              <h2 className="text-[clamp(28px,4.5vw,56px)] font-black text-[#0b0f2a] leading-[0.9] tracking-tighter uppercase">
                <RevealText as="span" by="word" text="Unsere" />
                <RevealText as="span" by="word" text="Services." className="text-[#0e958e] italic" delay={0.16} />
              </h2>
              <Reveal as="p" delay={0.34} className="text-slate-900 font-bold text-lg md:text-xl mt-5 max-w-xl leading-snug tracking-tight">
                Von der digitalen Experience bis zum physischen Erlebnis.
              </Reveal>
              <Reveal as="p" delay={0.42} className="text-slate-600 font-medium text-base md:text-lg mt-3 max-w-xl leading-tight tracking-tight">
                Wir verbinden Strategie, Kreation, Technologie und Content zu ganzheitlichen Gaming-, eSport- und Gamification-Lösungen – digital, vor Ort und nahtlos miteinander verknüpft.
              </Reveal>
            </div>
          </div>

          {/* One carousel at every width. Desktop used to get an offset
              editorial grid with a "Mehr anzeigen" gate, which put four of the
              ten services on screen and hid the rest behind a click. The track
              shows them as a row you page through, so all ten are reachable
              the same way on a phone and on a desktop.

              Card widths are exact thirds and quarters of the track rather
              than round percentages, so a page lands flush instead of leaving
              a sliver of the next card cut off at the edge. */}
          <div ref={trackWrapRef}>
            <ServicesCarousel>
              {data.map((item, i) => (
                <ServiceCard
                  key={item.title}
                  item={item}
                  onNavigate={onNavigate}
                  // Stagger only across the cards that are actually on screen
                  // at rest; the ones further along the track would otherwise
                  // finish their delay long before anyone pages to them.
                  delay={Math.min(i, 3) * STAGGER.card}
                  sizing={
                    'shrink-0 snap-center aspect-[3/4] w-[80%] sm:w-[55%] ' +
                    'md:snap-start md:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)]'
                  }
                  visible={trackInView}
                />
              ))}
            </ServicesCarousel>
          </div>

        </div>
      </section>
    </div>
  );
};
