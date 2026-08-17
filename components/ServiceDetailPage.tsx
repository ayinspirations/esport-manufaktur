import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft } from 'lucide-react';
import { Reveal } from './Reveal';
import { ServiceContent } from './servicesContent';
import { useDocumentHead } from '../hooks/useDocumentHead';

// The site's homepage canvas is light (#d1dbd2) -- dark is reserved for
// accents and tiles only. Sections alternate between this and a slightly
// deeper tone of the same color for a subtle tonal shift, never a hard
// jump in contrast.
const CANVAS_A = 'bg-[#d1dbd2]';
const CANVAS_B = 'bg-[#c5d0c6]';
// Same glow + vignette gradient as the homepage Hero's dark background,
// just without its diagonal grid lines -- richer than a flat slate fill.
const TILE = 'tile-gradient text-white';

const SECTION = 'py-20 md:py-28 lg:py-32';
const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';

interface ServiceDetailPageProps {
  content: ServiceContent;
  onNavigate: (page: any) => void;
  scrollToSection: (id: string) => void;
  onOpenBooking: () => void;
}

const PrimaryButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({
  onClick,
  children,
  className = ''
}) => (
  <button
    onClick={onClick}
    className={`group inline-flex items-center gap-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight shadow-[0_10px_40px_-10px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_50px_-10px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
  >
    {children}
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
  </button>
);

const SecondaryButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2.5 bg-slate-900/[0.04] hover:bg-slate-900/[0.08] text-slate-900 border border-slate-900/15 hover:border-slate-900/25 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-all duration-300 hover:scale-[1.02]"
  >
    {children}
  </button>
);

const GhostLink: React.FC<{ onClick: () => void; children: React.ReactNode; tone?: 'light' | 'dark' }> = ({
  onClick,
  children,
  tone = 'dark'
}) => (
  <button
    onClick={onClick}
    className={`group inline-flex items-center gap-2 font-bold text-sm tracking-tight transition-colors duration-300 ${
      tone === 'dark' ? 'text-slate-500 hover:text-slate-900' : 'text-white/70 hover:text-white'
    }`}
  >
    {children}
    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
  </button>
);

// Apple-style horizontal card row: fixed-width snap-scrolling tiles + a
// prev/next arrow pair that disables itself at either end. Used everywhere
// this template needs "several tiles side by side."
const TileCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    // Step by exactly one card's rendered width + gap (not a hardcoded px
    // value) so it lands precisely on a snap point at every breakpoint --
    // a fixed offset that doesn't match the actual mobile card width was
    // what left cards partially cut off instead of fully in view.
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(window.getComputedStyle(el).columnGap || '0') || 0;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <style>{`.tile-carousel-track::-webkit-scrollbar{display:none}`}</style>
      <div
        ref={trackRef}
        className="tile-carousel-track flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      <div className="flex items-center justify-end gap-3 mt-6">
        <button
          onClick={() => scrollByCard(-1)}
          disabled={!canLeft}
          aria-label="Zurück"
          className="w-10 h-10 rounded-full border border-slate-900/20 flex items-center justify-center text-slate-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-slate-900 hover:enabled:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          disabled={!canRight}
          aria-label="Weiter"
          className="w-10 h-10 rounded-full border border-slate-900/20 flex items-center justify-center text-slate-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-slate-900 hover:enabled:text-white"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Apple-style interactive process card: a left-hand expandable list (click
// a step, its description opens, the others collapse) paired with a visual
// panel on the right that updates to reflect whichever step is active.
const ProcessInteractive: React.FC<{ steps: { title: string; text: string }[] }> = ({ steps }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center rounded-surface ${TILE} p-8 md:p-14`}>
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const isOpen = active === i;
          return (
            <div key={i} className={i > 0 ? 'border-t border-white/10' : ''}>
              <button
                onClick={() => setActive(i)}
                className="w-full flex items-center justify-between gap-6 text-left py-5 md:py-6"
                aria-expanded={isOpen}
              >
                <span className="font-black text-lg md:text-xl tracking-tight">{step.title}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 md:pb-6 text-white/60 text-sm md:text-base leading-relaxed font-medium max-w-md">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative aspect-[4/3] rounded-card bg-white/[0.04] border border-white/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
        <div key={active} className="relative z-10 flex flex-col items-center text-center px-8" style={{ animation: 'processFade 0.4s ease-out' }}>
          <style>{`@keyframes processFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
          <span className="text-6xl md:text-7xl font-black text-emerald-300 tracking-tighter mb-4">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="text-white text-lg md:text-xl font-black tracking-tight">{steps[active].title}</span>
        </div>
      </div>
    </div>
  );
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  content,
  onNavigate,
  scrollToSection,
  onOpenBooking
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useDocumentHead({
    title: content.seo.title,
    description: content.seo.description,
    ogImage: content.seo.ogImage,
    canonicalPath: content.path
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const goToBestCases = () => {
    onNavigate('home');
    requestAnimationFrame(() => scrollToSection('best-cases'));
  };

  const goToContact = () => {
    onNavigate('home');
    requestAnimationFrame(() => scrollToSection('contact-section'));
  };

  return (
    <div className="w-full">
      {/* ============ 1. HERO -- full-bleed photo + dark overlay for legibility ============ */}
      <section className="relative w-full min-h-[85vh] md:min-h-[92vh] flex items-end overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <img
            src={content.hero.image}
            alt={content.hero.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-transparent to-transparent" />
        </div>

        <div className={`relative z-10 w-full ${CONTAINER} pb-16 md:pb-24 pt-32 text-white`}>
          <Reveal duration={0.6}>
            <button
              onClick={() => onNavigate('home')}
              className="group inline-flex items-center gap-2 mb-10 md:mb-14 text-white/70 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Zur Startseite
            </button>
          </Reveal>

          <Reveal duration={0.75} delay={0.05}>
            <h1 className="text-[clamp(32px,6.2vw,72px)] font-black leading-[1.02] tracking-tighter max-w-4xl">
              {content.hero.headline}
            </h1>
          </Reveal>

          <Reveal duration={0.75} delay={0.15}>
            <p className="mt-6 md:mt-8 text-white/70 text-lg sm:text-xl font-medium leading-relaxed max-w-xl">
              {content.hero.subline}
            </p>
          </Reveal>

          <Reveal duration={0.7} delay={0.25} className="mt-9 md:mt-11">
            <PrimaryButton onClick={onOpenBooking}>{content.hero.ctaLabel}</PrimaryButton>
          </Reveal>
        </div>
      </section>

      {/* ============ 2. AUSGANGSLAGE ============ */}
      <section className={`${CANVAS_B} ${SECTION}`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <Reveal className="md:col-span-5" as="div">
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-black leading-[1.05] tracking-tighter text-slate-900">
                {content.pain.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">{content.pain.text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 3. LEISTUNGEN IM DETAIL -- Apple-style tile carousel ============ */}
      <section className={`${CANVAS_A} ${SECTION}`}>
        <div className={CONTAINER}>
          <Reveal className="max-w-2xl mb-14 md:mb-20">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-slate-900">
              {content.leistungenHeading}
            </h2>
          </Reveal>

          <div className="flex flex-col gap-16 md:gap-20">
            {content.leistungen.map((group, gi) => (
              <div key={gi}>
                {group.heading && (
                  <Reveal className="max-w-2xl mb-10 md:mb-12">
                    <h3 className="text-[clamp(22px,2.6vw,32px)] font-black tracking-tighter mb-4 text-slate-900">
                      {group.heading}
                    </h3>
                    {group.text && <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">{group.text}</p>}
                  </Reveal>
                )}

                <Reveal>
                  <TileCarousel>
                    {group.cards.map((card, ci) => (
                      <div
                        key={ci}
                        className={`snap-start shrink-0 w-[260px] sm:w-[300px] h-full p-7 md:p-8 rounded-card ${TILE} border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]`}
                      >
                        <div className="w-9 h-9 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center justify-center text-xs font-black mb-6">
                          {String(ci + 1).padStart(2, '0')}
                        </div>
                        <h4 className="text-base md:text-lg font-black tracking-tight mb-3 leading-snug">{card.title}</h4>
                        <p className="text-white/55 text-sm leading-relaxed font-medium">{card.text}</p>
                      </div>
                    ))}
                  </TileCarousel>
                </Reveal>

                {group.groupCta && (
                  <Reveal delay={0.2} className="mt-10 md:mt-12">
                    <SecondaryButton onClick={onOpenBooking}>{group.groupCta}</SecondaryButton>
                  </Reveal>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. UNSER VORGEHEN -- interactive accordion + visual ============ */}
      <section className={`${CANVAS_B} ${SECTION}`}>
        <div className={CONTAINER}>
          <Reveal className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-slate-900">
              {content.vorgehenHeading}
            </h2>
          </Reveal>

          <Reveal>
            <ProcessInteractive steps={content.vorgehen} />
          </Reveal>
        </div>
      </section>

      {/* ============ 5. FÜR WEN ============ */}
      <section className={`${CANVAS_A} ${SECTION}`}>
        <div className={CONTAINER}>
          <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-slate-900">
              {content.fuerWenHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3 md:gap-4">
            {content.fuerWen.map((chip, i) => (
              <span
                key={i}
                className="px-5 py-2.5 rounded-full bg-white border border-slate-900/10 text-slate-700 text-sm font-bold tracking-tight shadow-sm"
              >
                {chip}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ 6. BEST-CASE-TEASER ============ */}
      <section className={`${CANVAS_B} ${SECTION}`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <Reveal className="md:col-span-5">
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-black leading-[1.05] tracking-tighter mb-5 text-slate-900">
                {content.bestCase.heading}
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-8">{content.bestCase.text}</p>
              <GhostLink onClick={goToBestCases}>Alle Best Cases ansehen</GhostLink>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <div
                onClick={goToBestCases}
                className={`group cursor-pointer relative aspect-[16/10] rounded-card overflow-hidden ${TILE} border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                <span className="relative z-10 text-white/30 text-xs font-black uppercase tracking-[0.25em]">
                  Referenz-Case folgt
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 7. FAQ ============ */}
      <section className={`${CANVAS_A} ${SECTION}`}>
        <div className={`${CONTAINER} max-w-[900px]`}>
          <Reveal className="text-center mb-12 md:mb-16">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-slate-900">FAQ</h2>
          </Reveal>

          <div className="flex flex-col gap-3">
            {content.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="rounded-card bg-white border border-slate-900/10 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-8 py-6"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-base md:text-lg tracking-tight text-slate-900">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 md:px-8 pb-6 text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 8. CTA-CLOSER ============ */}
      <section className={`${CANVAS_B} ${SECTION} pb-28 md:pb-36`}>
        <div className={`${CONTAINER} text-center`}>
          <Reveal className="max-w-2xl mx-auto">
            <h2 className="text-[clamp(30px,4.5vw,56px)] font-black leading-[1.05] tracking-tighter mb-10 text-slate-900">
              {content.ctaCloser.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <PrimaryButton onClick={onOpenBooking}>{content.ctaCloser.primaryLabel}</PrimaryButton>
            {content.ctaCloser.secondaryLabel && (
              <SecondaryButton onClick={onOpenBooking}>{content.ctaCloser.secondaryLabel}</SecondaryButton>
            )}
          </Reveal>
          <Reveal delay={0.2}>
            <GhostLink onClick={goToContact}>Oder direkt zum Kontaktformular</GhostLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
