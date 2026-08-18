
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SECTION_PADDING } from './spacing';
import { Reveal, RevealText } from './Reveal';
import { STAGGER, DUR } from './motion';

interface PurposeProps {
  onNavigate?: (page: any) => void;
}

const blocks = [
  'Unser Leistungsspektrum reicht von individuellen Gaming- und eSport-Konzepten, Turnieren und Eventformaten über digitale Messe- und Eventpässe, Games, Quests und interaktive Plattformlösungen bis hin zu Content-Produktion, Streaming, Messebau, Eventtechnik, Creator-Aktivierung, Scouting sowie Recruiting- und Employer-Branding-Kampagnen.',
  'Dabei entwickeln wir keine Standardlösungen, sondern Formate, die auf Zielgruppe, Marke und Kommunikationsziel zugeschnitten sind. Online und offline greifen dabei nahtlos ineinander.'
];

export const Purpose: React.FC<PurposeProps> = ({ onNavigate }) => {
  return (
    <div className={`w-full flex items-center justify-center px-4 sm:px-6 md:px-14 ${SECTION_PADDING}`} id="purpose">
      {/* The dark panel is a tile in its own right, so it fades in like every
          other one instead of appearing hard behind content that fades. */}
      <Reveal
        as="section"
        y={28}
        duration={DUR.slow}
        className="relative w-full max-w-[1440px] mx-auto rounded-shell md:rounded-shell overflow-hidden shadow-2xl bg-[#020617] border border-white/10"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#020617]" />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 20% 16%, rgba(0,129,141,0.42) 0%, rgba(0,129,141,0.20) 26%, rgba(0,129,141,0.06) 46%, transparent 64%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />
        </div>

        {/* Contents follow the panel rather than fading with it: the panel
            lands first, then headline and copy build on top of it. */}
        <div className="relative z-10 py-20 md:py-28 px-6 md:px-14 lg:px-20">
          <RevealText
            as="h2"
            by="word"
            text="Was uns antreibt."
            delay={0.15}
            className="text-[clamp(38px,6.5vw,90px)] font-black text-white leading-[0.9] tracking-tighter"
          />
          <Reveal
            as="p"
            delay={0.28}
            className="text-white/60 font-medium text-base md:text-lg lg:text-xl mt-6 max-w-3xl leading-relaxed tracking-tight"
          >
            Die eSport Manufaktur entwickelt ganzheitliche Aktivierungen, Erlebnisse und digitale Lösungen an der Schnittstelle von Gaming, eSport und Gamification. Wir verbinden Strategie, Kreation, Technologie, Content und Eventproduktion zu physischen, digitalen und hybriden Formaten, die Zielgruppen aktivieren, Marken erlebbar machen und messbare Ergebnisse schaffen.
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/10">
            {blocks.map((text, i) => (
              <Reveal key={i} delay={i * STAGGER.card} y={28}>
                <p className="text-white/70 font-medium text-base md:text-lg leading-relaxed tracking-tight">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.34} className="mt-16 md:mt-20">
            <button
              onClick={() => onNavigate?.('ueber-uns')}
              className="spring group inline-flex items-center gap-2.5 bg-emerald-400 text-slate-900 px-6 py-3.5 rounded-full font-black text-sm tracking-tighter"
            >
              Mehr über uns
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
};
