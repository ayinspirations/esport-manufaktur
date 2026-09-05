import React from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { BLOCK_GAP } from './spacing';
import type { ServiceContent } from './servicesContent';

interface ServiceViewProps {
  content: ServiceContent;
  /** Opens the booking popup. */
  onOpenBooking: () => void;
  /** Opens the contact-form popup, told which service it is about. */
  onOpenContact: (subject?: string) => void;
}

const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';

const TILE = 'tile-gradient text-white';

// ---------------------------------------------------------------------------
// One service
// ---------------------------------------------------------------------------
// Four sections: the headline with its subline and the calls to action, the
// Ausgangslage as a two-column spread, "Leistungen im Detail" as dark tiles,
// and the closer.
//
// Deliberately not here, and not coming back: the FAQ, the "Unser Vorgehen"
// accordion, "Was es bewirkt" and "Für wen". They were kept unread in
// servicesContent for a while in case they were wanted back; the rewrite of
// all ten services made that copy stale rather than dormant, so it is gone
// from the content file and from its interface with it.
//
// Two things from the interim version are kept. The Leistungen are a grid
// rather than the horizontal carousel they were: with at most eight entries
// they all fit, and a track you have to page through hides half the answer to
// "what do I actually get". And there is no full-bleed photo band at the top --
// it sat directly under the menu and pushed the actual answer half a screen
// down on every switch.
//
// No rules between the sections. Section boundaries are carried by whitespace
// and by the dark Leistungen tiles; a hairline across the canvas at every
// break read as a stack of pale stripes down the page.
// ---------------------------------------------------------------------------

export const ServiceView: React.FC<ServiceViewProps> = ({
  content,
  onOpenBooking,
  onOpenContact
}) => {
  const requestProject = () => onOpenContact(content.h1);

  return (
    <div className="w-full">
      {/* ============ 1. Headline, subline, call to action ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <RevealText
          as="h2"
          by="word"
          stagger={0}
          text={content.hero.headline}
          className="text-[clamp(32px,5.6vw,68px)] font-black leading-[1.02] tracking-tighter max-w-4xl text-[#0b0f2a]"
        />

        <Reveal duration={0.75} delay={0.15}>
          <p className="mt-6 md:mt-8 text-[#0b0f2a]/70 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
            {content.hero.subline}
          </p>
        </Reveal>

        {/* Desktop only. On a phone the headline, the subline and this pair of
            buttons stack into one column, so the calls to action land directly
            under the heading and then again at the foot of a page that is not
            long enough to have forgotten them -- the same ask twice, a screen
            apart. The closer keeps them; up here they are dropped. */}
        <Reveal duration={0.7} delay={0.25} className="mt-9 md:mt-11 hidden md:flex flex-wrap items-center gap-4">
          <button
            onClick={requestProject}
            className="group inline-flex items-center gap-2.5 bg-[#0b0f2a] hover:bg-[#0e958e] text-white px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            {content.hero.ctaLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </button>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0b0f2a]/[0.06] text-[#0b0f2a] border border-[#0b0f2a]/20 hover:border-[#0b0f2a]/35 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-all duration-500"
          >
            <CalendarDays className="w-4 h-4" />
            Kostenloses Erstgespräch vereinbaren
          </button>
        </Reveal>
      </section>

      {/* ============ 2. Ausgangslage ============ */}
      {content.pain && (
        <section className={`${CONTAINER} ${BLOCK_GAP}`}>
          <div className="grid md:grid-cols-12 gap-6 md:gap-16">
            <div className="md:col-span-5">
              <RevealText
                as="h2"
                by="word"
                text={content.pain.heading}
                className="text-[clamp(26px,3.2vw,40px)] font-black leading-[1.08] tracking-tighter text-[#0b0f2a]"
              />
            </div>
            <Reveal delay={0.1} className="md:col-span-7 space-y-5 md:space-y-6">
              {(Array.isArray(content.pain.text) ? content.pain.text : [content.pain.text]).map((para, i) => (
                <p key={i} className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                  {para}
                </p>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ 3. Leistungen im Detail ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="max-w-2xl mb-8 md:mb-10">
          <RevealText
            as="h2"
            by="word"
            text={content.leistungenHeading}
            className="text-[clamp(28px,3.8vw,48px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]"
          />
        </div>

        <div className="flex flex-col gap-14 md:gap-16">
          {content.leistungen.map((group, gi) => (
            <div key={gi}>
              {(group.heading || group.text) && (
                <Reveal className="max-w-3xl mb-8 md:mb-10">
                  {group.heading && (
                    <h3 className="text-[clamp(20px,2.4vw,28px)] font-black tracking-tighter mb-3 text-[#0b0f2a]">
                      {group.heading}
                    </h3>
                  )}
                  {group.text && (
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                      {group.text}
                    </p>
                  )}
                </Reveal>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {group.cards.map((card, ci) => (
                  <Reveal key={ci} delay={Math.min(ci, 5) * 0.05}>
                    <div className={`h-full p-7 md:p-8 rounded-card ${TILE} border border-white/10 transition-transform duration-500 hover:scale-[1.02]`}>
                      <div className="w-9 h-9 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center justify-center text-xs font-black mb-6">
                        {String(ci + 1).padStart(2, '0')}
                      </div>
                      <h4 className="text-base md:text-lg font-black tracking-tight mb-3 leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-white/55 text-sm leading-relaxed font-medium">{card.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {group.groupCta && (
                <Reveal delay={0.2} className="mt-9 md:mt-11">
                  <button
                    onClick={requestProject}
                    className="inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0b0f2a]/[0.06] text-[#0b0f2a] border border-[#0b0f2a]/20 hover:border-[#0b0f2a]/35 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-all duration-500"
                  >
                    {group.groupCta}
                  </button>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============ 4. Abschluss ============ */}
      {/* Both routes open in place. Sending someone back to the homepage and
          then scrolling them to the form at the bottom of it lost the service
          they were asking about; the popup carries it along as the subject. */}
      <section className={`${CONTAINER} ${BLOCK_GAP} pb-20 md:pb-28 text-center`}>
        <div className="max-w-2xl mx-auto">
          <RevealText
            as="h2"
            by="word"
            text={content.ctaCloser.headline}
            className="text-[clamp(28px,4vw,50px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]"
          />
          {content.ctaCloser.text && (
            <Reveal as="p" delay={0.12} className="mt-5 md:mt-6 text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              {content.ctaCloser.text}
            </Reveal>
          )}
        </div>
        <div className="h-9 md:h-11" />
        <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={requestProject}
            className="group inline-flex items-center gap-2.5 bg-[#0b0f2a] hover:bg-[#0e958e] text-white px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            {content.ctaCloser.primaryLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </button>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0b0f2a]/[0.06] text-[#0b0f2a] border border-[#0b0f2a]/20 hover:border-[#0b0f2a]/35 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-all duration-500"
          >
            <CalendarDays className="w-4 h-4" />
            Kostenloses Erstgespräch vereinbaren
          </button>
        </Reveal>
      </section>
    </div>
  );
};
