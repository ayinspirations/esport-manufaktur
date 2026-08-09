import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { ServiceContent } from './servicesContent';
import { useDocumentHead } from '../hooks/useDocumentHead';

// Two dark tones sections alternate between -- a tonal shift, not a hard
// color change, matching the "Apple product page" brief.
const TONE_A = 'bg-[#020617]';
const TONE_B = 'bg-[#060c1a]';

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
    className={`group inline-flex items-center gap-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight shadow-[0_0_50px_rgba(52,211,153,0.3)] hover:shadow-[0_0_70px_rgba(52,211,153,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
  >
    {children}
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
  </button>
);

const SecondaryButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/15 hover:border-white/25 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-all duration-300 hover:scale-[1.02]"
  >
    {children}
  </button>
);

const GhostLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="group inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-sm tracking-tight transition-colors duration-300"
  >
    {children}
    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
  </button>
);

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
    <div className="w-full bg-[#020617] text-white">
      {/* ============ 1. HERO ============ */}
      <section className="relative w-full min-h-[85vh] md:min-h-[92vh] flex items-end overflow-hidden">
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

        <div className={`relative z-10 w-full ${CONTAINER} pb-16 md:pb-24 pt-32`}>
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
      <section className={`${TONE_B} ${SECTION}`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <Reveal className="md:col-span-5" as="div">
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-black leading-[1.05] tracking-tighter">
                {content.pain.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">{content.pain.text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 3. LEISTUNGEN IM DETAIL ============ */}
      <section className={`${TONE_A} ${SECTION}`}>
        <div className={CONTAINER}>
          <Reveal className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter">
              {content.leistungenHeading}
            </h2>
          </Reveal>

          <div className="flex flex-col gap-16 md:gap-20">
            {content.leistungen.map((group, gi) => (
              <div key={gi}>
                {group.heading && (
                  <Reveal className="max-w-2xl mb-10 md:mb-12">
                    <h3 className="text-[clamp(22px,2.6vw,32px)] font-black tracking-tighter mb-4">{group.heading}</h3>
                    {group.text && <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium">{group.text}</p>}
                  </Reveal>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                  {group.cards.map((card, ci) => (
                    <Reveal key={ci} delay={ci * 0.1} duration={0.65}>
                      <div className="h-full p-7 md:p-8 rounded-[20px] bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.05] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
                        <div className="w-9 h-9 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center justify-center text-xs font-black mb-6">
                          {String(ci + 1).padStart(2, '0')}
                        </div>
                        <h4 className="text-base md:text-lg font-black tracking-tight mb-3 leading-snug">{card.title}</h4>
                        <p className="text-white/55 text-sm leading-relaxed font-medium">{card.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

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

      {/* ============ 4. UNSER VORGEHEN ============ */}
      <section className={`${TONE_B} ${SECTION}`}>
        <div className={CONTAINER}>
          <Reveal className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter">
              {content.vorgehenHeading}
            </h2>
          </Reveal>

          <div className="relative flex flex-col md:flex-row md:items-start gap-10 md:gap-6">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-white/10" />
            {content.vorgehen.map((step, i) => (
              <Reveal key={i} delay={i * 0.1} className="relative flex-1 flex flex-col items-start md:items-center md:text-center">
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#020617] border border-white/15 flex items-center justify-center text-sm font-black text-emerald-300 mb-5 shrink-0">
                  {i + 1}
                </div>
                <h3 className="text-lg font-black tracking-tight mb-2">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed font-medium max-w-[220px]">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. FÜR WEN ============ */}
      <section className={`${TONE_A} ${SECTION}`}>
        <div className={CONTAINER}>
          <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter">
              {content.fuerWenHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3 md:gap-4">
            {content.fuerWen.map((chip, i) => (
              <span
                key={i}
                className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/80 text-sm font-bold tracking-tight"
              >
                {chip}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ 6. BEST-CASE-TEASER ============ */}
      <section className={`${TONE_B} ${SECTION}`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <Reveal className="md:col-span-5">
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-black leading-[1.05] tracking-tighter mb-5">
                {content.bestCase.heading}
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium mb-8">{content.bestCase.text}</p>
              <GhostLink onClick={goToBestCases}>Alle Best Cases ansehen</GhostLink>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <div
                onClick={goToBestCases}
                className="group cursor-pointer relative aspect-[16/10] rounded-[20px] overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] flex items-center justify-center"
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
      <section className={`${TONE_A} ${SECTION}`}>
        <div className={`${CONTAINER} max-w-[900px]`}>
          <Reveal className="text-center mb-12 md:mb-16">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter">FAQ</h2>
          </Reveal>

          <div className="flex flex-col gap-3">
            {content.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="rounded-[20px] bg-white/[0.03] border border-white/10 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-8 py-6"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-base md:text-lg tracking-tight">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 md:px-8 pb-6 text-white/60 text-sm md:text-base leading-relaxed font-medium">
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
      <section className={`${TONE_B} ${SECTION} pb-28 md:pb-36`}>
        <div className={`${CONTAINER} text-center`}>
          <Reveal className="max-w-2xl mx-auto">
            <h2 className="text-[clamp(30px,4.5vw,56px)] font-black leading-[1.05] tracking-tighter mb-10">
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
