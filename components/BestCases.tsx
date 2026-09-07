
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

        {/* Das Mosaik.
            Sechs Spalten, und jede Kachel traegt das Seitenverhaeltnis ihres
            Bildes. Das ist die Umkehrung des vorigen Aufbaus: dort gab ein
            Raster aus festen Reihen die Zuschnitte vor, und was nicht
            hineinpasste -- ein quadratisches Foto, ein hochkantes Video --
            wurde beschnitten. Jetzt gibt das Material die Hoehe vor, und die
            Baender duerfen unterschiedlich tief sein. Genau das macht ein
            Mosaik aus.

            Kommt ein neuer Best Case dazu:

              1. Ein Band ist voll, wenn die Spalten darin sechs ergeben --
                 4+2, 2+4, 3+3, 2+2+2 oder 6 allein.
              2. Das Seitenverhaeltnis ist das des Bildes, nicht das der
                 Kachel: `lg:aspect-[9/16]` fuer ein hochkantes Video,
                 `lg:aspect-[3/2]` fuer ein Querformat, `lg:aspect-square`
                 fuer ein Quadrat. Dann fuellt das Bild die Kachel aus und
                 nichts wird beschnitten.
              3. Darunter, einspaltig, steht dasselbe Verhaeltnis noch einmal
                 ohne Praefix -- das gilt fuer schmale Schirme.
              4. Die Schriftgroesse folgt der Flaeche: breite Kacheln
                 clamp(26px,3.4vw,42px), halbe Baender clamp(22px,2.8vw,34px),
                 schmale clamp(20px,2.2vw,30px).
              5. TILE_DELAY bekommt einen Eintrag je Kachel und faengt in
                 jedem Band wieder bei 0 an.

            `items-start` haelt die Kacheln eines Bandes an der Oberkante.
            Unterschiedlich hohe Nachbarn lassen darunter Seitenflaeche
            stehen -- das ist der Preis dafuer, dass kein Bild beschnitten
            wird, und er ist der guenstigere. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 lg:items-start">
          {/* Band 1 — T-Systems breit, hagebau hochkant daneben */}
          <div className="col-span-1 aspect-[4/3] lg:col-span-4 lg:aspect-[877/504]">
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

          <div className="col-span-1 aspect-[3/4] lg:col-span-2 lg:aspect-[427/504]">
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

          {/* Band 2 — DEKRA quadratisch, BFV hochkant, Interwetten stehend.
              Drei Kacheln zu je zwei Spalten, drei verschiedene Hoehen. */}
          <div className="col-span-1 aspect-square lg:col-span-2 lg:aspect-[1/1]">
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
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
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

          <div className="col-span-1 aspect-[9/16] lg:col-span-2 lg:aspect-[9/16]">
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

          <div className="col-span-1 aspect-[3/4] lg:col-span-2 lg:aspect-[3/4]">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[4]}
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

          {/* Band 3 — 0711 und INTERSPORT, zwei Haelften */}
          <div className="col-span-1 aspect-[16/9] lg:col-span-3 lg:aspect-[16/9]">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[5]}
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
                    <h3 className="text-white text-[clamp(22px,2.8vw,34px)] font-black leading-[0.95] tracking-tighter uppercase mb-3 drop-shadow-2xl">
                      0711 Showdown
                    </h3>
                  </div>
                </motion.div>
              </a>
            </motion.div>
          </div>

          <div className="col-span-1 aspect-[3/2] lg:col-span-3 lg:aspect-[3/2]">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[6]}
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
                    <h3 className="text-white text-[clamp(22px,2.8vw,34px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      Intersport
                    </h3>
                  </div>
                </motion.div>
              </a>
            </motion.div>
          </div>

          {/* Band 4 — REWE hochkant, Bayern zockt als Panorama daneben */}
          <div className="col-span-1 aspect-[2/3] lg:col-span-2 lg:aspect-[2/3]">
            <motion.div
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[7]}
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

          <div className="col-span-1 aspect-[16/9] lg:col-span-4 lg:aspect-[16/9]">
            <motion.div 
              className="h-full w-full"
              variants={TILE_VARIANTS}
              custom={TILE_DELAY[8]}
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
                    <h3 className="text-white text-[clamp(26px,3.4vw,42px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      Bayern Zockt
                    </h3>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Band 5 — XP Days und Consumenta, zwei Haelften */}
          <div className="col-span-1 aspect-[16/9] lg:col-span-3 lg:aspect-[16/9]">
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
                    <h3 className="text-white text-[clamp(22px,2.8vw,34px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      XP Days
                    </h3>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          <div className="col-span-1 aspect-[16/9] lg:col-span-3 lg:aspect-[16/9]">
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
