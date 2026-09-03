import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { PageHero } from './PageHero';
import { STORY_LEAD, STORY_INTRO, STORY_CHAPTERS } from './gruenderstory';
import { useDocumentHead } from '../hooks/useDocumentHead';

interface MeineGeschichteProps {
  onNavigate: (page: any) => void;
  onOpenBooking?: () => void;
}

const CANVAS = 'bg-[#badeda]';
// Narrower than the rest of the site on purpose. This is 5.000 words of prose,
// and the container everywhere else is built for grids of tiles; at 1200px a
// paragraph runs to 150 characters a line, which is roughly twice what anyone
// reads comfortably.
const PROSE = 'max-w-[720px] mx-auto px-6 md:px-8';

export const MeineGeschichte: React.FC<MeineGeschichteProps> = ({ onNavigate, onOpenBooking }) => {
  useDocumentHead({
    title: 'Meine Geschichte | GG Manufaktur',
    description:
      'Von FIFA-Turnieren in einer Garage über die eSport Manufaktur zur GG Manufaktur: Gianluca Crepaldi erzählt die Gründungsgeschichte.',
    canonicalPath: '/ueber-uns/meine-geschichte'
  });

  return (
    <div className={`w-full ${CANVAS}`}>
      <PageHero
        eyebrow="Meine Geschichte"
        title="Von Stift und Papier"
        accent="zur GG Manufaktur."
        subline={STORY_LEAD}
      />

      <article className={`${PROSE} pt-14 md:pt-20 pb-8`}>
        {/* The opening paragraph is set larger than the body: it is the
            handover from the headline into the text, and it carries the
            whole piece's tone. */}
        {STORY_INTRO.map((para, i) => (
          <Reveal
            as="p"
            key={i}
            delay={i * 0.06}
            className="text-[#0b0f2a] text-xl md:text-2xl font-medium leading-relaxed tracking-tight mb-10 md:mb-14"
          >
            {para}
          </Reveal>
        ))}

        {STORY_CHAPTERS.map((chapter) => (
          <section key={chapter.heading} className="mb-12 md:mb-16 last:mb-0">
            <RevealText
              as="h2"
              by="word"
              text={chapter.heading}
              className="text-[clamp(24px,3vw,34px)] font-black leading-[1.1] tracking-tighter text-[#0b0f2a] mb-5 md:mb-6"
            />
            <div className="space-y-5">
              {chapter.paras.map((para, i) => (
                <Reveal
                  as="p"
                  key={i}
                  y={18}
                  className="text-[#0b0f2a]/80 text-base md:text-lg leading-[1.75] font-medium tracking-tight"
                >
                  {para}
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </article>

      {/* Closer. The story ends on "Das ist meine Story." -- what follows is
          the site again, not another chapter, so it sits on its own rule. */}
      <section className={`${PROSE} pt-10 md:pt-14 pb-24 md:pb-32`}>
        <div className="border-t border-[#0b0f2a]/15 pt-10 md:pt-12 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
          <button
            onClick={() => onOpenBooking?.()}
            className="spring group inline-flex items-center gap-2.5 bg-[#0b0f2a] hover:bg-[#0e958e] text-white px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight transition-colors duration-300"
          >
            Kostenloses Erstgespräch vereinbaren
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => onNavigate('ueber-uns')}
            className="spring inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0b0f2a]/[0.06] text-[#0b0f2a] border border-[#0b0f2a]/25 hover:border-[#0b0f2a]/40 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-colors duration-300"
          >
            Zurück zu Über uns
          </button>
        </div>
      </section>
    </div>
  );
};
