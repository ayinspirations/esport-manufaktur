
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ChevronLeft, Camera } from 'lucide-react';
import { SECTION_PADDING } from './spacing';

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

const titleFontSize = "text-[clamp(20px,5vw,28px)] lg:text-[clamp(17px,1.4vw,22px)]";

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

const VISIBLE_COUNT = 4;

// -- Desktop: diagonal, seamless image band -------------------------------
// 4 fixed slots stay in place at all times; only their content pages
// through the full 10-item list. Slot position (not the data item) decides
// clip-path shape, corner rounding and flex-basis, so paging never causes a
// layout jump -- only the content inside a slot crossfades.
const DiagonalSegment: React.FC<{
  item: ServiceItem;
  slotIndex: number;
  direction: number;
  onNavigate?: (page: any) => void;
}> = ({ item, slotIndex, direction, onNavigate }) => {
  const isFirst = slotIndex === 0;
  const isLast = slotIndex === VISIBLE_COUNT - 1;
  const clipPath = isFirst
    ? 'polygon(0% 0%, 100% 0%, calc(100% - var(--skew)) 100%, 0% 100%)'
    : isLast
    ? 'polygon(var(--skew) 0%, 100% 0%, 100% 100%, 0% 100%)'
    : 'polygon(var(--skew) 0%, 100% 0%, calc(100% - var(--skew)) 100%, 0% 100%)';
  const flexBasis = isFirst || isLast ? 'calc(25% + var(--skew) * 0.5)' : 'calc(25% + var(--skew))';
  const roundedClass = isFirst
    ? 'rounded-l-[2rem] lg:rounded-l-[2.5rem] overflow-hidden'
    : isLast
    ? 'rounded-r-[2rem] lg:rounded-r-[2.5rem] overflow-hidden'
    : '';
  // First/last slots are narrower (25% + skew/2) and have only ONE diagonal
  // edge instead of two, so their safe (unclipped) text corridor is tighter
  // than the middle slots' -- text needs a narrower cap there to never reach
  // into the diagonal-clipped wedge, at rest or lifted on hover.
  const textMaxWidth = isFirst || isLast ? 'max-w-[120px] lg:max-w-[170px]' : 'max-w-[170px] lg:max-w-[230px]';

  const clickable = Boolean(item.page);

  return (
    <div
      className={`h-full ${roundedClass}`}
      style={{ flex: `0 0 ${flexBasis}`, marginLeft: isFirst ? 0 : 'calc(var(--skew) * -1)' }}
    >
      <div
        role={clickable ? 'link' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? () => onNavigate?.(item.page) : undefined}
        onKeyDown={clickable ? (e) => (e.key === 'Enter' || e.key === ' ') && onNavigate?.(item.page) : undefined}
        className={`diagonal-segment group relative w-full h-full select-none ${clickable ? 'cursor-pointer' : ''}`}
        style={{ clipPath, WebkitClipPath: clipPath }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={item.title}
            custom={direction}
            initial={{ opacity: 0, x: direction * 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {item.placeholder ? (
              // Icon + label both centered horizontally -- the segment's own
              // diagonal clip removes a corner wedge whose side depends on
              // slot position (first/middle/last), so only the horizontal
              // center is a safe zone for every slot this tile could land in.
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center gap-3">
                <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-white/25" />
                <span className="text-white/50 text-[9px] lg:text-[10px] font-black uppercase tracking-widest border border-white/20 rounded-full px-2.5 py-1">
                  Platzhalter
                </span>
              </div>
            ) : (
              <>
                {/* CSS background-image on its own layer (rather than an <img>)
                    so the photo always shows even if the <video> on top of it
                    fails to load -- a broken video never leaves the segment blank. */}
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
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Title: sits at rest just above the arrow button, then lifts on
            hover (transform only, no reflow) to make room for the
            description fading in underneath it. */}
        <div className="absolute inset-x-0 bottom-20 lg:bottom-24 px-6 lg:px-8 text-center pointer-events-none z-10">
          <h3 className={`diagonal-title mx-auto ${textMaxWidth} text-white font-black text-[13px] lg:text-[15px] tracking-tight uppercase leading-[1.15]`}>
            {item.title}
          </h3>
        </div>

        {/* Description: hidden by default, reveals on hover (desktop /
            mouse) directly below the title's lifted position. Devices
            without real hover (touch) get it permanently visible via the
            (hover: none) rule in the scoped stylesheet, since there's no
            hover state to reveal it with there. line-clamp + a narrow,
            centered max-width keep it safely inside this segment's own
            diagonal-clipped area, never bleeding into the neighbor tile. */}
        <div className="absolute inset-x-0 bottom-10 lg:bottom-12 px-6 lg:px-8 text-center pointer-events-none z-10">
          <p className={`diagonal-desc mx-auto ${textMaxWidth} text-white/70 text-[10px] lg:text-[11px] font-medium leading-snug line-clamp-4 break-words [overflow-wrap:break-word]`}>
            {item.description}
          </p>
        </div>

        <div className="absolute bottom-5 left-5 lg:bottom-6 lg:left-6 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:scale-110 z-10">
          <ArrowUpRight className="w-4 h-4 lg:w-[18px] lg:h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-950" />
        </div>
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

const MobileCard: React.FC<{ item: ServiceItem; onNavigate?: (page: any) => void }> = ({ item, onNavigate }) => {
  const clickable = Boolean(item.page);
  return (
    <div
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? () => onNavigate?.(item.page) : undefined}
      onKeyDown={clickable ? (e) => (e.key === 'Enter' || e.key === ' ') && onNavigate?.(item.page) : undefined}
      className={`group relative shrink-0 snap-center w-[80%] sm:w-[55%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl select-none ${clickable ? 'cursor-pointer' : ''}`}
    >
      {item.placeholder ? (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
          <Camera className="w-10 h-10 text-white/25" />
          <span className="absolute top-5 left-5 text-white/50 text-[10px] font-black uppercase tracking-widest border border-white/20 rounded-full px-2.5 py-1">
            Platzhalter
          </span>
        </div>
      ) : (
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
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
};

interface CompetenciesProps {
  onNavigate?: (page: any) => void;
}

export const Competencies: React.FC<CompetenciesProps> = ({ onNavigate }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const maxStart = data.length - VISIBLE_COUNT;
  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStart;

  const goNext = () => {
    if (!canNext) return;
    setDirection(1);
    setStartIndex((i) => Math.min(i + 1, maxStart));
  };
  const goPrev = () => {
    if (!canPrev) return;
    setDirection(-1);
    setStartIndex((i) => Math.max(i - 1, 0));
  };

  const visibleItems = data.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <div className="w-full flex items-center justify-center" id="competencies">
      <section className={`w-full ${SECTION_PADDING} bg-transparent relative overflow-hidden`}>
        <style>{`
          .services-band { --skew: 100px; }
          @media (min-width: 1024px) {
            .services-band { --skew: 140px; }
          }
          /* Title lift + description reveal on hover for real (mouse) hover
             devices; both are permanently in their "revealed" state on touch
             devices, which have no hover state to trigger them with. */
          .diagonal-title { transition: none; }
          .diagonal-desc { opacity: 0; }
          @media (hover: hover) {
            .diagonal-title { transition: transform 280ms ease; }
            .diagonal-desc { transition: opacity 280ms ease; }
            .group:hover .diagonal-title { transform: translateY(-20px); }
            .group:hover .diagonal-desc { opacity: 1; }
          }
          @media (min-width: 1024px) {
            .group:hover .diagonal-title { transform: translateY(-24px); }
          }
          @media (hover: none) {
            .diagonal-title { transform: translateY(-20px); }
            .diagonal-desc { opacity: 1; }
          }
          @media (hover: none) and (min-width: 1024px) {
            .diagonal-title { transform: translateY(-24px); }
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

          {/* Desktop / tablet: diagonal continuous image band, paging through
              all 10 services 4 at a time. */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="services-band hidden md:block relative"
          >
            <div className="flex w-full h-[380px] lg:h-[520px]">
              {visibleItems.map((item, slotIndex) => (
                <DiagonalSegment
                  key={slotIndex}
                  item={item}
                  slotIndex={slotIndex}
                  direction={direction}
                  onNavigate={onNavigate}
                />
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <button onClick={goPrev} disabled={!canPrev} aria-label="Vorherige Services"
                className="w-11 h-11 rounded-full border border-slate-900/20 flex items-center justify-center text-slate-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-emerald-400 hover:enabled:border-emerald-400 hover:enabled:text-slate-950">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={goNext} disabled={!canNext} aria-label="Nächste Services"
                className="w-11 h-11 rounded-full border border-slate-900/20 flex items-center justify-center text-slate-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-emerald-400 hover:enabled:border-emerald-400 hover:enabled:text-slate-950">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Mobile: Apple-style horizontally scrolling snap carousel, all 10 services */}
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
