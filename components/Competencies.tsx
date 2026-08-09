
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ChevronLeft } from 'lucide-react';
import { SECTION_PADDING } from './spacing';

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  video?: string;
  page: string;
}

const titleFontSize = "text-[clamp(20px,5vw,28px)] lg:text-[clamp(17px,1.4vw,22px)]";

const data: ServiceItem[] = [
  {
    title: "Strategie & Konzeption",
    image: "/Strategie.jpg",
    imageAlt: "Strategie-Workshop für eSport Marketing bei eSport Manufaktur",
    description: "Von der Zielgruppenanalyse bis zur kreativen Idee — maßgeschneiderte eSport- und Gaming-Strategien für eure Marke.",
    page: "strategie-konzeption"
  },
  {
    title: "Content & Streaming",
    video: "/videos/BestCase4.mov",
    image: "/REWExfckoln_1770162125933.jpg",
    imageAlt: "Professionelle Streaming-Produktion für Gaming-Content bei eSport Manufaktur",
    description: "Professionelle Live-Produktionen und Streaming-Formate, die eure Marke authentisch im Gaming-Umfeld positionieren.",
    page: "content-streaming"
  },
  {
    title: "Messen & Events",
    video: "/videos/Eventtechnik.mov",
    image: "/images/competencies/eventtechnik.jpg",
    imageAlt: "Eventtechnik-Setup für Gaming-Messen und Live-Events bei eSport Manufaktur",
    description: "Gaming-Aktivierungen auf Messen und Events — von der Standkonzeption bis zur Umsetzung vor Ort.",
    page: "messen-events"
  },
  {
    title: "Digitale Lösungen",
    video: "/videos/Gamification.MOV",
    image: "/Gamification.jpg",
    imageAlt: "Gamification-Plattform für digitale Markenaktivierung bei eSport Manufaktur",
    description: "Individuelle digitale Tools und Gamification-Lösungen für nachhaltige Zielgruppenbindung.",
    page: "digitale-loesungen"
  }
];

// -- Desktop: diagonal, seamless image band -------------------------------
// Segments are flex children pulled into each other with a negative left
// margin equal to the shared --skew custom property, clipped so the
// clipped-away wedge of segment N is exactly what segment N+1 slides
// underneath -- the seam lines up with no gap. First/last keep a straight
// outer edge (so the band's outer boundary stays flush, no corner notch),
// while middle segments are diagonal on both edges. A trapezoid (one
// straight edge) reads wider than a parallelogram (both edges diagonal) at
// the same box width, so first/last get a smaller flex-basis --
// (25% + skew/2) vs middle's (25% + skew) -- which makes their *average*
// visible width come out exactly equal to the middle segments' constant
// visible width, keeping all four perceptually the same size.
const DiagonalSegment: React.FC<{ item: ServiceItem; index: number; total: number; onNavigate?: (page: any) => void }> = ({ item, index, total, onNavigate }) => {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const clipPath = isFirst
    ? 'polygon(0% 0%, 100% 0%, calc(100% - var(--skew)) 100%, 0% 100%)'
    : isLast
    ? 'polygon(var(--skew) 0%, 100% 0%, 100% 100%, 0% 100%)'
    : 'polygon(var(--skew) 0%, 100% 0%, calc(100% - var(--skew)) 100%, 0% 100%)';
  const flexBasis = isFirst || isLast ? 'calc(25% + var(--skew) * 0.5)' : 'calc(25% + var(--skew))';

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => onNavigate?.(item.page)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigate?.(item.page)}
      className="group relative h-full select-none cursor-pointer"
      style={{
        clipPath,
        WebkitClipPath: clipPath,
        flex: `0 0 ${flexBasis}`,
        marginLeft: isFirst ? 0 : 'calc(var(--skew) * -1)'
      }}
    >
      {/* CSS background-image on its own layer (rather than an <img>) so the
          photo always shows even if the <video> on top of it fails to load --
          a broken video never leaves the segment blank. */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      {item.video && (
        <video
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={item.image}
          aria-label={item.imageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/30 to-transparent" />

      {/* Title + description sit in one bottom-anchored block. The
          description wrapper has a fixed reserved height (not collapsed
          when hidden) so the block's total height -- and therefore the
          title's position -- is identical across every segment regardless
          of how long each description text is, and never shifts between
          the hover / non-hover state. */}
      <div className="absolute inset-x-0 bottom-20 lg:bottom-24 px-10 lg:px-12 text-center">
        <h3 className="mx-auto max-w-[200px] lg:max-w-[240px] text-white font-black text-[13px] lg:text-[15px] tracking-tight uppercase leading-[1.15] mb-2">
          {item.title}
        </h3>
        {/* Description: hidden by default and revealed on hover (desktop /
            mouse). Devices without real hover (touch, e.g. an iPad at this
            breakpoint) get it permanently visible via the (hover: none)
            rule in the scoped stylesheet below, since there is no hover
            state to reveal it there. */}
        <div className="diagonal-desc mx-auto max-w-[210px] lg:max-w-[250px] h-[42px] lg:h-[52px] overflow-hidden">
          <p className="text-white/70 text-[11px] lg:text-xs font-medium leading-snug">
            {item.description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 lg:bottom-6 lg:left-6 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:scale-110">
        <ArrowUpRight className="w-4 h-4 lg:w-[18px] lg:h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-950" />
      </div>
    </div>
  );
};

// -- Mobile: Apple-style horizontal scroll-snap carousel ------------------
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
        className="services-carousel-track flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-6 px-[10%] sm:px-[22.5%]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
      <div className="flex items-center gap-3 mt-8">
        <button onClick={() => scrollByCard(-1)} disabled={!canLeft} aria-label="Zurück"
          className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-emerald-400 hover:enabled:border-emerald-400 hover:enabled:text-slate-950">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={() => scrollByCard(1)} disabled={!canRight} aria-label="Weiter"
          className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-emerald-400 hover:enabled:border-emerald-400 hover:enabled:text-slate-950">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const MobileCard: React.FC<{ item: ServiceItem; onNavigate?: (page: any) => void }> = ({ item, onNavigate }) => (
  <div
    role="link"
    tabIndex={0}
    onClick={() => onNavigate?.(item.page)}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigate?.(item.page)}
    className="group relative shrink-0 snap-center w-[80%] sm:w-[55%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl cursor-pointer select-none"
  >
    <img
      src={item.image}
      alt={item.imageAlt}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/25 to-transparent" />

    <div className="absolute bottom-8 left-6 right-16">
      <h3 className={`${titleFontSize} font-black text-white tracking-tight uppercase leading-[1.1] mb-2.5`}>
        {item.title}
      </h3>
      <p className="text-white/70 text-sm font-medium leading-snug">
        {item.description}
      </p>
    </div>

    <div className="absolute bottom-7 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:scale-110">
      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-950" />
    </div>
  </div>
);

interface CompetenciesProps {
  onNavigate?: (page: any) => void;
}

export const Competencies: React.FC<CompetenciesProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex items-center justify-center" id="competencies">
      <section className={`w-full ${SECTION_PADDING} bg-transparent relative overflow-hidden`}>
        <style>{`
          .services-band { --skew: 100px; }
          @media (min-width: 1024px) {
            .services-band { --skew: 140px; }
          }
          /* Description reveal: hidden + revealed on hover for real
             (mouse) hover devices; permanently visible on touch devices,
             which have no hover state to reveal it with. */
          .diagonal-desc { opacity: 0; transform: translateY(6px); }
          @media (hover: hover) {
            .diagonal-desc { transition: opacity 280ms ease, transform 280ms ease; }
            .group:hover .diagonal-desc { opacity: 1; transform: translateY(0); }
          }
          @media (hover: none) {
            .diagonal-desc { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24 lg:mb-28"
          >
            <div className="max-w-3xl">
              <h2 className="text-[clamp(28px,4.5vw,56px)] font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
                Unsere <br /> <span className="text-slate-900/40 italic">Services.</span>
              </h2>
              <p className="text-slate-900 font-bold text-lg md:text-xl mt-5 max-w-xl leading-snug tracking-tight">
                Von der digitalen Experience bis zum physischen Erlebnis.
              </p>
              <p className="text-slate-600 font-medium text-base md:text-lg mt-3 max-w-xl leading-tight tracking-tight">
                Wir verbinden Strategie, Kreation, Technologie und Content zu ganzheitlichen Gaming-, eSport- und Gamification-Lösungen – digital, vor Ort und nahtlos miteinander verknüpft.
              </p>
            </div>
          </motion.div>

          {/* Desktop / tablet: diagonal continuous image band */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="services-band hidden md:block relative"
          >
            <div className="flex w-full h-[380px] lg:h-[520px]">
              {data.map((item, i) => (
                <DiagonalSegment key={item.title} item={item} index={i} total={data.length} onNavigate={onNavigate} />
              ))}
            </div>
          </motion.div>

          {/* Mobile: Apple-style horizontally scrolling snap carousel */}
          <div className="md:hidden">
            <ServicesCarousel>
              {data.map((item) => (
                <MobileCard key={item.title} item={item} onNavigate={onNavigate} />
              ))}
            </ServicesCarousel>
          </div>
        </div>
      </section>
    </div>
  );
};
