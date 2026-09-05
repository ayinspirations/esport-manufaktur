
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SECTION_PADDING } from './spacing';
import { Reveal, RevealText } from './Reveal';
import { DUR, EASE_REVEAL, STAGGER } from './motion';
import { LazyVideo } from './LazyVideo';

// Same entry as the service tiles: a straight fade with a short rise, no 3D
// tilt. Keeping both tile grids on one gesture is what makes the page read as
// a single system -- the tilt made this section announce itself as a separate
// piece of work.
//
// Values mirror ServiceCard exactly (32px rise, DUR.reveal, EASE_REVEAL).
const TILE_FROM = { opacity: 0, y: 32 };
const TILE_TO = { opacity: 1, y: 0 };
const TILE_VIEWPORT = { once: true, margin: '-80px' } as const;

// The tile arrives, then the copy on it -- not both at once. A headline that is
// already painted while the tile under it is still sliding up reads as two
// things happening on top of each other.
//
// Done with variants rather than a second `whileInView`: a variant name
// propagates from a motion parent to its motion children automatically, so the
// overlay starts from the tile's own animation rather than from its own
// viewport test, and the two can never drift apart.
const TILE_VARIANTS = {
  hidden: TILE_FROM,
  show: (delay: number) => ({
    ...TILE_TO,
    transition: { duration: DUR.reveal, delay, ease: EASE_REVEAL, delayChildren: delay + 0.26 }
  })
};

const TILE_TEXT_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.interact, ease: EASE_REVEAL } }
};

// Stagger restarts on each row of the mosaic, so no tile waits on the delay of
// one sitting above it in a different row. Die letzte Reihe traegt nur noch
// eine Kachel und faengt deshalb wieder bei null an.
const TILE_DELAY = [0, STAGGER.card, 0, STAGGER.card, 0];

interface BestCasesProps {
  onNavigate?: (page: any) => void;
}

export const BestCases: React.FC<BestCasesProps> = ({ onNavigate }) => {
  return (
    <section id="best-cases" className={`w-full bg-[#badeda] ${SECTION_PADDING} px-6 md:px-14 scroll-mt-24`}>
      {/* The section wrapper no longer animates: it used to fade the whole
          block in while every tile inside was independently fading in too, so
          the two passes ran over each other and muddied both. */}
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(40px,7vw,100px)] font-black text-[#0b0f2a] leading-[0.85] tracking-tighter uppercase">
              <RevealText as="span" by="word" text="Best" />
              <RevealText as="span" by="word" text="Cases." className="text-[#0e958e] italic" delay={0.14} />
            </h2>
            <Reveal as="p" delay={0.32} className="text-slate-900 font-bold text-lg md:text-xl mt-6 max-w-xl leading-snug tracking-tight">
              Projekte, die wir gemeinsam mit unseren Kunden realisieren durften.
            </Reveal>
            <Reveal as="p" delay={0.4} className="text-slate-600 font-medium text-base md:text-lg mt-3 max-w-2xl leading-relaxed tracking-tight">
              Ob Konzern, Ministerium, bekannte Marke, Verband oder Verein: Unterschiedlichste Auftraggeber vertrauen uns ihre Projekte an. Gemeinsam entwickeln wir Lösungen, die zu ihren Zielen, Zielgruppen und Rahmenbedingungen passen.
            </Reveal>
            <Reveal as="p" delay={0.46} className="text-slate-600 font-medium text-base md:text-lg mt-4 max-w-2xl leading-relaxed tracking-tight">
              Eine Auswahl dieser Projekte zeigen wir hier. Weitere Arbeiten bleiben auf Wunsch unserer Kunden bewusst vertraulich.
            </Reveal>
          </div>
        </div>

        {/* Mosaic.
            Every tile used to be exactly 500px tall, so six different column
            spans still produced one flat band of equal-height boxes -- a table,
            not a mosaic.

            The grid is six columns of a uniform row unit instead, and each tile
            claims a different rectangle of it. Because every span is whole
            units of the same cell, the shapes vary while the layout still
            tiles exactly: rows 1-3 take the wide tile and the portrait beside
            it, rows 4-5 the square and the panorama, rows 6-8 eine Kachel
            ueber die volle Breite. No gaps, no dense-packing heuristics, no
            tile left orphaned on its own row at a smaller width.

            Die letzte Reihe trug bis eben zwei Quadrate: den BFV-Case und
            eine Abschlusskachel, die auf den Case-Viewer darunter zeigte.
            Ohne sie nimmt der Case die Reihe ganz, statt eine halbe Zeile
            leer stehen zu lassen.

            Roughly, at a 1200px container: 4x3 reads 16:10, 2x3 portrait,
            2x2 square, 4x2 panorama, 6x3 ein breiter Abschluss. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 lg:auto-rows-[9.5rem]">
          {/* Rows 1-3 — T-Systems 16:9, Hagebau portrait beside it */}
          <div className="col-span-1 aspect-[4/3] lg:col-span-4 lg:row-span-3 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[0]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <div
                className="relative group overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
                onClick={() => onNavigate?.('tsystems')}
              >
                <LazyVideo
                  src="/videos/case-tsystems.mp4"
                  poster="/videos/case-tsystems.jpg"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-sm uppercase tracking-widest">
                    Case ansehen <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <motion.div variants={TILE_TEXT_VARIANTS} className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
                  <div>
                    <h3 className="text-white text-[clamp(24px,3.2vw,38px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      T-Systems
                    </h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-1 aspect-[3/4] lg:col-span-2 lg:row-span-3 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[1]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <div
                className="relative group overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
                onClick={() => onNavigate?.('hagebau')}
              >
                <LazyVideo
                  src="/videos/case-hagebau.mp4"
                  poster="/videos/case-hagebau.jpg"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-sm uppercase tracking-widest">
                    Case ansehen <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <motion.div variants={TILE_TEXT_VARIANTS} className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
                  <div>
                    <h3 className="text-white text-[clamp(24px,3.2vw,38px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      Hagebau Bolay
                    </h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Rows 4-5 — Showdown square, Bayern zockt panorama beside it */}
          <div className="col-span-1 aspect-square lg:col-span-2 lg:row-span-2 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[2]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <div
                className="relative group overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
                onClick={() => onNavigate?.('showdown-0711')}
              >
                <LazyVideo
                  src="/videos/case-showdown.mp4"
                  poster="/videos/case-showdown.jpg"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-sm uppercase tracking-widest">
                    Case ansehen <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <motion.div variants={TILE_TEXT_VARIANTS} className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
                  <div>
                    <h3 className="text-white text-[clamp(20px,2.2vw,30px)] font-black leading-[0.95] tracking-tighter uppercase mb-3 drop-shadow-2xl">
                      0711 Showdown
                    </h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          
          <div className="col-span-1 aspect-[16/9] lg:col-span-4 lg:row-span-2 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[3]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <div
                className="relative group overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
                onClick={() => onNavigate?.('bayern-zockt')}
              >
                <LazyVideo
                  src="/videos/case-bayern-zockt.mp4"
                  poster="/videos/case-bayern-zockt.jpg"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-xs uppercase tracking-widest">
                    Case ansehen <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 pointer-events-none">
                  <div>
                    <h3 className="text-white text-[clamp(26px,3.4vw,42px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      Bayern Zockt
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Rows 6-8 — BFV and the closing tile, two large squares */}
          <div className="col-span-1 aspect-[4/3] lg:col-span-6 lg:row-span-3 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[4]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <div
                className="relative group overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
                onClick={() => onNavigate?.('bfv')}
              >
                <img
                  src="/images/cases/bfv.jpg"
                  alt="BFV eFootball"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-xs uppercase tracking-widest">
                    Case ansehen <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 pointer-events-none">
                  <div>
                    <h3 className="text-white text-[clamp(22px,2.8vw,34px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      BFV eFootball
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
