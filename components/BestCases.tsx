
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

// Die Kacheln sind Verweise, keine anklickbaren Kaesten.
//
// Sie waren <div onClick>: fuer eine Maus dasselbe, fuer alles andere nichts.
// Eine Suchmaschine findet in einem div keinen Weg zur Unterseite -- die elf
// Case-Seiten waren aus der Startseite heraus schlicht nicht verlinkt. Und wer
// mit der Tastatur navigiert oder einen Verweis in einem neuen Tab oeffnen
// will, kam ebenfalls nicht weiter.
//
// Jetzt ist es ein <a href> auf die echte Adresse. Der Klick wird abgefangen
// und geht weiterhin durch den Router, damit die Seite nicht neu laedt; alles
// andere -- Mittelklick, Tastatur, Crawler -- folgt dem Verweis.

// Stagger restarts on each row of the mosaic, so no tile waits on the delay of
// one sitting above it in a different row. Die letzte Reihe traegt nur noch
// eine Kachel und faengt deshalb wieder bei null an.
const TILE_DELAY = [0, STAGGER.card, 0, 0, STAGGER.card, 0, STAGGER.card, 0, STAGGER.card, 0, STAGGER.card];

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
            tiles exactly: rows 1-3 die breite Kachel und die hochkante
            daneben, rows 4-6 die schmale und die breite daneben, rows 7-8
            das Quadrat und das Panorama, rows 9-11 hochkant und breit, rows
            12-13 noch einmal Quadrat und Panorama, rows 14-16 ein Abschluss
            ueber die volle Breite. No gaps, no dense-packing
            heuristics, no tile left orphaned on its own row at a smaller
            width.

            Roughly, at a 1200px container: 4x3 reads 16:10, 2x3 portrait,
            2x2 square, 4x2 panorama, 6x3 ein breiter Abschluss.

            Kommt ein neuer Best Case dazu, bekommt er hier eine Kachel --
            nach denselben Regeln, damit das Mosaik ein Mosaik bleibt:

              1. Ein Band ist voll, wenn die Spalten darin sechs ergeben.
                 Erlaubte Paare: 4+2 (breit neben hochkant), 2+4
                 (quadratisch neben Panorama) und 3+3 (zwei gleich
                 breite Haelften); 6 allein traegt ein Band ueber die
                 volle Breite.
              2. Die Form wechselt: nie zweimal hintereinander dasselbe
                 Format. Reihenfolge im Zweifel 4x3 -> 2x3 -> 2x2 -> 4x2
                 -> 6x3 und von vorn.
              3. Jede Kachel traegt zwei Groessen: die Spalten- und
                 Reihenspanne ab lg, und darunter ein aspect-* fuer die
                 einspaltige Ansicht (aspect-[4/3] breit, aspect-[3/4]
                 hochkant, aspect-square quadratisch, aspect-[16/9]
                 Panorama).
              4. Die Schriftgroesse der Ueberschrift folgt der Flaeche:
                 grosse Kacheln clamp(24px,3.2vw,38px), Panorama
                 clamp(26px,3.4vw,42px), halbe Baender und volle Breite
                 clamp(22px,2.8vw,34px), kleine clamp(20px,2.2vw,30px).
              5. TILE_DELAY bekommt einen Eintrag je Kachel und faengt in
                 jedem Band wieder bei 0 an.
              6. Bringt eine Aufnahme ein Format mit, das keiner dieser
                 Zuschnitte trifft, bekommt sie ihren eigenen: vier Spalten
                 neben fuenf Reihen ergeben ein Quadrat, drei neben vier ein
                 stehendes Rechteck. Die Kachel folgt dem Bild, nicht
                 umgekehrt -- siehe DEKRA. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 lg:auto-rows-[9.5rem]">
          {/* Rows 1-3 — T-Systems breit, hagebau hochkant daneben */}
          <div className="col-span-1 aspect-[4/3] lg:col-span-4 lg:row-span-3 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[0]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/tsystems`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('tsystems'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
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
              </a>
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
              <a
                href={`/best-cases/hagebau`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('hagebau'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
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
              </a>
            </motion.div>
          </div>

          {/* Rows 4-6 — DEKRA schmal, BFV breit daneben.
              Die DEKRA-Aufnahme ist quadratisch, das Raster kennt kein
              Quadrat: eine Zelle ist breiter als hoch, also ist jede Kachel
              breiter als hoch, sobald sie mehr Spalten als Reihen hat. Ein
              quadratisches Bild formatfuellend in eine solche Kachel zu
              legen heiszt, unten ein Viertel abzuschneiden.
              Zwei Spalten neben drei Reihen ergibt 427 zu 504 -- schmaler als
              hoch. Das Bild steht darin an der Oberkante in voller Breite und
              voller Hoehe, 427 zu 427, ohne dass irgendwo etwas wegfaellt.
              Was unter ihm bleibt, sind 77 Pixel, und dort steht ohnehin der
              Name. Die Kachel ist damit genau so hoch wie die von T-Systems
              und die schmalste im Mosaik. */}
          <div className="col-span-1 aspect-square lg:col-span-2 lg:row-span-3 lg:aspect-auto">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[2]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/dekra`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('dekra'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
              >
                <img
                  src="/images/dekra/hero.jpg"
                  alt="Digitaler Event-Pass für DEKRA an sechs DTM-Standorten"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full object-contain object-top transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-xs uppercase tracking-widest">
                    Case ansehen <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 pointer-events-none">
                  <div>
                    <h3 className="text-white text-[clamp(24px,3.2vw,38px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      DEKRA Motorsport
                    </h3>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          <div className="col-span-1 aspect-[16/9] lg:col-span-4 lg:row-span-3 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[3]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/bfv`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('bfv'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
              >
                <LazyVideo
                  src="/videos/case-bfv.mp4"
                  poster="/images/bfv/hero.jpg"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-xs uppercase tracking-widest">
                    Case ansehen <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 pointer-events-none">
                  <div>
                    <h3 className="text-white text-[clamp(20px,2.2vw,30px)] font-black leading-[0.9] tracking-tighter uppercase mb-3 drop-shadow-2xl">
                      BFV eFootball
                    </h3>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Rows 7-8 — 0711 quadratisch, INTERSPORT als Panorama daneben */}
          <div className="col-span-1 aspect-square lg:col-span-2 lg:row-span-2 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[4]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/showdown-0711`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('showdown-0711'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
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
              </a>
            </motion.div>
          </div>

          <div className="col-span-1 aspect-[16/9] lg:col-span-4 lg:row-span-2 lg:aspect-auto">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[5]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/intersport`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('intersport'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
              >
                <img
                  src="/images/intersport/hero.jpg"
                  alt="Gaming-Wall im INTERSPORT Clubhouse Berlin – Pop-up-Aktivierung von GG Manufaktur"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
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
                    <h3 className="text-white text-[clamp(26px,3.4vw,42px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      Intersport
                    </h3>
                  </div>
                </motion.div>
              </a>
            </motion.div>
          </div>

          {/* Rows 9-11 — REWE hochkant, Bayern zockt breit daneben */}
          <div className="col-span-1 aspect-[3/4] lg:col-span-2 lg:row-span-3 lg:aspect-auto">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[6]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/rewe`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('rewe'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
              >
                <img
                  src="/images/rewe/hero.jpg"
                  alt="eSport-Sponsoring-Aktivierung für REWE mit dem 1. FC Köln"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
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
                    <h3 className="text-white text-[clamp(20px,2.2vw,30px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      REWE
                    </h3>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          <div className="col-span-1 aspect-[4/3] lg:col-span-4 lg:row-span-3 lg:aspect-auto">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[7]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/bayern-zockt`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('bayern-zockt'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
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
                    <h3 className="text-white text-[clamp(24px,3.2vw,38px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      Bayern Zockt
                    </h3>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Rows 12-13 — Interwetten quadratisch, XP Days als Panorama daneben */}
          <div className="col-span-1 aspect-square lg:col-span-2 lg:row-span-2 lg:aspect-auto">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[8]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/interwetten`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('interwetten'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
              >
                <img
                  src="/images/interwetten/hero.jpg"
                  alt="Virtual-Tennis-Aktivierung für Interwetten beim BOSS OPEN"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
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
                    <h3 className="text-white text-[clamp(20px,2.2vw,30px)] font-black leading-[0.9] tracking-tighter uppercase mb-3 drop-shadow-2xl">
                      Interwetten
                    </h3>
                  </div>
                </motion.div>
              </a>
            </motion.div>
          </div>

          <div className="col-span-1 aspect-[16/9] lg:col-span-4 lg:row-span-2 lg:aspect-auto">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[9]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/xp-days`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('xp-days'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
              >
                <img
                  src="/images/xp-days/hero.jpg"
                  alt="XP Days – gamifizierte Karrieremesse der GG Manufaktur in Stuttgart"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
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
                    <h3 className="text-white text-[clamp(26px,3.4vw,42px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      XP Days
                    </h3>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Rows 14-16 — Consumenta ueber die volle Breite. Drei Marken in
              einer Kachel brauchen die ganze Zeile fuer ihren Namen. */}
          <div className="col-span-1 aspect-[4/3] lg:col-span-6 lg:row-span-3 lg:aspect-auto">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[10]}
              initial="hidden"
              whileInView="show"
              viewport={TILE_VIEWPORT}
            >
              <a
                href={`/best-cases/consumenta`}
                onClick={(e) => { e.preventDefault(); onNavigate?.('consumenta'); }}
                className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
              >
                <img
                  src="/images/consumenta/hero.jpg"
                  alt="Markenaktivierungen für NIVEA MEN, EFFECT und CRACKZ auf der Consumenta in Nürnberg"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
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
                    <h3 className="text-white text-[clamp(22px,2.8vw,34px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl text-balance">
                      NIVEA MEN // EFFECT // CRACKZ
                    </h3>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>




        </div>

      </div>
    </section>
  );
};
