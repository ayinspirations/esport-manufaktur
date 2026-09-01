import React from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Reveal } from './Reveal';
import type { ServiceContent } from './servicesContent';

interface ServiceViewProps {
  content: ServiceContent;
  /** Opens the booking popup. */
  onOpenBooking: () => void;
  /** Opens the contact-form popup, told which service it is about. */
  onOpenContact: (subject?: string) => void;
}

const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';

// ---------------------------------------------------------------------------
// One service, as three rows
// ---------------------------------------------------------------------------
// This used to be an eight-section page per service: a full-bleed photo band,
// the Ausgangslage, a horizontal Leistungen carousel, an interactive Vorgehen
// accordion, "Für wen", a Best-Case teaser, an FAQ and a closer. Read one after
// another through a filter, that is a lot of page between one service and the
// next, and most of it answered questions nobody had asked yet.
//
// Three rows now, the same three for every service: what it is, what is in it,
// what it does for you. Laid out as a definition table -- label on the left,
// content on the right, a rule between rows -- so the eye can jump straight to
// the row it wants and so two services compare to each other line by line.
//
// The photo band is gone with it. It sat directly beneath the filter, so the
// artwork butted into the menu above it, and it pushed the actual answer half a
// screen down on every switch.
// ---------------------------------------------------------------------------

/**
 * One labelled row of the table.
 *
 * The label sticks while its own row is on screen, so on a long Leistungsumfang
 * the reader can still see which row they are in. It is scoped to the row, so
 * it can never travel over the next one.
 */
const Row: React.FC<{ label: string; children: React.ReactNode; delay?: number }> = ({
  label,
  children,
  delay = 0
}) => (
  <Reveal delay={delay} className="border-t border-[#0b0f2a]/12 py-10 md:py-14">
    <div className="grid md:grid-cols-12 gap-4 md:gap-10">
      <div className="md:col-span-3">
        <h2 className="md:sticky md:top-28 text-[11px] font-black uppercase tracking-[0.22em] text-[#0b0f2a]/45">
          {label}
        </h2>
      </div>
      <div className="md:col-span-9">{children}</div>
    </div>
  </Reveal>
);

export const ServiceView: React.FC<ServiceViewProps> = ({ content, onOpenBooking, onOpenContact }) => (
  <div className={`${CONTAINER} pb-24 md:pb-32`}>
    {/* --- Heading ------------------------------------------------------- */}
    <Reveal className="pt-12 md:pt-16 pb-10 md:pb-14">
      <h2 className="text-[clamp(28px,4.4vw,52px)] font-black leading-[1.02] tracking-tighter text-[#0b0f2a] max-w-4xl">
        {content.hero.headline}
      </h2>
    </Reveal>

    {/* --- 1. What it is -------------------------------------------------- */}
    <Row label="Was es ist">
      <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-medium max-w-3xl">
        {content.hero.subline}
      </p>
    </Row>

    {/* --- 2. What is in it ----------------------------------------------- */}
    {/* A grid, not the horizontal carousel this used to be: with at most eight
        entries they all fit, and a track you have to page through hides half of
        the answer to "what do I actually get". */}
    <Row label="Leistungsumfang" delay={0.06}>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        {content.leistungen.flatMap((group) => group.cards).map((card, i) => (
          <div key={i}>
            <h3 className="text-[15px] md:text-base font-black tracking-tight text-[#0b0f2a] mb-1.5">
              {card.title}
            </h3>
            <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-medium">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </Row>

    {/* --- 3. What it does for you ---------------------------------------- */}
    {content.wirkung && (
      <Row label="Was es bewirkt" delay={0.12}>
        <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-medium max-w-3xl">
          {content.wirkung}
        </p>
      </Row>
    )}

    {/* --- Closer --------------------------------------------------------- */}
    {/* Both routes open in place. Sending someone back to the homepage and then
        scrolling them to the form at the bottom of it lost the service they
        were asking about, and the popup carries it along as the subject. */}
    <Reveal delay={0.16} className="border-t border-[#0b0f2a]/12 pt-10 md:pt-14">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => onOpenContact(content.h1)}
          className="group inline-flex items-center gap-2.5 bg-[#0b0f2a] hover:bg-[#0e958e] text-white px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {content.hero.ctaLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
        <button
          onClick={onOpenBooking}
          className="group inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0b0f2a]/[0.06] text-[#0b0f2a] border border-[#0b0f2a]/20 hover:border-[#0b0f2a]/35 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-all duration-300"
        >
          <CalendarDays className="w-4 h-4" />
          Termin vereinbaren
        </button>
      </div>
    </Reveal>
  </div>
);
