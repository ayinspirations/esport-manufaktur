
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SECTION_PADDING } from './spacing';

interface PurposeProps {
  onNavigate?: (page: any) => void;
}

const blocks = [
  'Unser Leistungsspektrum reicht von individuellen Gaming- und eSport-Konzepten, Turnieren und Eventformaten über digitale Messe- und Eventpässe, Games, Quests und interaktive Plattformlösungen',
  'bis hin zu Content-Produktion, Streaming, Messebau, Eventtechnik, Creator-Aktivierung, Scouting sowie Recruiting- und Employer-Branding-Kampagnen.',
  'Dabei entwickeln wir keine Standardlösungen, sondern Formate, die auf Zielgruppe, Marke und Kommunikationsziel zugeschnitten sind. Online und offline greifen dabei nahtlos ineinander.'
];

export const Purpose: React.FC<PurposeProps> = ({ onNavigate }) => {
  return (
    <div className={`w-full flex items-center justify-center px-4 sm:px-6 md:px-14 ${SECTION_PADDING}`} id="purpose">
      <section className="relative w-full max-w-[1440px] mx-auto rounded-[3rem] md:rounded-[3.2rem] overflow-hidden shadow-2xl bg-[#020617] border border-white/10">
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

        {/* No fly-in / slide -- a quiet opacity-only fade, matching the calm
            Apple-style page build the brief asks for. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative z-10 py-20 md:py-28 px-6 md:px-14 lg:px-20"
        >
          <h2 className="text-[clamp(38px,6.5vw,90px)] font-black text-white leading-[0.9] tracking-tighter">
            Was uns antreibt.
          </h2>
          <p className="text-white/60 font-medium text-base md:text-lg lg:text-xl mt-6 max-w-3xl leading-relaxed tracking-tight">
            Die eSport Manufaktur entwickelt ganzheitliche Aktivierungen, Erlebnisse und digitale Lösungen an der Schnittstelle von Gaming, eSport und Gamification. Wir verbinden Strategie, Kreation, Technologie, Content und Eventproduktion zu physischen, digitalen und hybriden Formaten, die Zielgruppen aktivieren, Marken erlebbar machen und messbare Ergebnisse schaffen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/10">
            {blocks.map((text, i) => (
              <p key={i} className="text-white/70 font-medium text-base md:text-lg leading-relaxed tracking-tight">
                {text}
              </p>
            ))}
          </div>

          <div className="mt-16 md:mt-20">
            <button
              onClick={() => onNavigate?.('ueber-uns')}
              className="group inline-flex items-center gap-2.5 bg-emerald-400 text-slate-900 px-6 py-3.5 rounded-full font-black text-sm tracking-tighter transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              Mehr über uns
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
