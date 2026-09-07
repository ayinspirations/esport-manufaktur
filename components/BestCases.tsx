import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SECTION_PADDING } from './spacing';
import { Reveal, RevealText } from './Reveal';
import { DUR, EASE_REVEAL, STAGGER } from './motion';
import { LazyVideo } from './LazyVideo';
import { asset } from './site';

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

// ---------------------------------------------------------------------------
// Das Mosaik
// ---------------------------------------------------------------------------
// Es liegt nicht mehr in einem Spaltenraster, sondern in Baendern.
//
// Das Raster konnte nur ganze Sechstel: eine Kachel war zwei, drei oder vier
// Spalten breit, und ob das Bild darin aufging, war Glueckssache. Ein
// hochkantes Video neben einem Querformat ergab zwei verschieden hohe Kacheln
// mit einem Loch darunter -- oder ein beschnittenes Bild.
//
// Jetzt gibt jedes Band seinen Kacheln dieselbe Hoehe und teilt die Breite im
// Verhaeltnis ihrer Bilder auf. Das ist eine Zeile Rechnung: liegen alle
// Kacheln eines Bandes auf derselben Hoehe h, ist jede so breit wie h mal ihr
// Seitenverhaeltnis. Genau das macht `flex-grow: ar` bei `flex-basis: 0` --
// die Breiten verhalten sich wie die Verhaeltnisse, und weil jede Kachel ihr
// Verhaeltnis auch als `aspect-ratio` traegt, kommt fuer alle dieselbe Hoehe
// heraus. Kein Bild wird beschnitten, kein Band bleibt rechts offen, und
// zwischen den Baendern darf die Hoehe springen. Das ist das Mosaik.
//
// Eine neue Kachel braucht deshalb nur ihr Seitenverhaeltnis (Breite geteilt
// durch Hoehe des Materials, nicht der Wunschkachel) und ein Band, in das sie
// passt. Faustregel fuers Band: ein Hochformat neben ein Querformat. Zwei
// Hochformate nebeneinander werden sehr hoch, zwei Querformate sehr flach.
//
// Auf schmalen Schirmen faellt das Band in eine Spalte; dort steht jede Kachel
// fuer sich, und `arMobile` darf ein ruhigeres Verhaeltnis vorgeben.
// ---------------------------------------------------------------------------

interface Tile {
  slug: string;
  title: string;
  /** Breite geteilt durch Hoehe des Materials. Gibt Breite *und* Hoehe im Band. */
  ar: number;
  /** Abweichendes Verhaeltnis fuer die einspaltige Ansicht. */
  arMobile?: number;
  video?: string;
  poster?: string;
  image?: string;
  alt?: string;
  /** Schriftgroesse der Ueberschrift -- folgt der Flaeche, nicht dem Namen. */
  head: string;
  /** Zusatz fuers Medium, etwa ein Bildausschnitt. */
  media?: string;
}

const BANDS: Tile[][] = [
  [
    {
      slug: 'tsystems',
      title: 'T-Systems',
      ar: 877 / 504,
      arMobile: 4 / 3,
      video: '/videos/case-tsystems.mp4',
      poster: '/videos/case-tsystems.jpg',
      head: 'clamp(24px,3.2vw,38px)'
    },
    {
      slug: 'hagebau',
      title: 'Hagebau Bolay',
      ar: 427 / 504,
      arMobile: 3 / 4,
      video: '/videos/case-hagebau.mp4',
      poster: '/videos/case-hagebau.jpg',
      head: 'clamp(24px,3.2vw,38px)'
    }
  ],
  [
    {
      slug: 'bfv',
      title: 'BFV eFootball',
      // 576 x 1024 -- das Video laeuft in voller Hoehe, ohne Schnitt.
      ar: 9 / 16,
      video: '/videos/case-bfv.mp4',
      poster: '/images/bfv/hero.jpg',
      head: 'clamp(20px,2.2vw,30px)',
      media: 'object-top'
    },
    {
      slug: 'intersport',
      title: 'Intersport',
      // 2000 x 1333. Neben dem hochkanten Video wird die Kachel dadurch breit
      // genug, um das Band rechts zu schlieszen.
      ar: 3 / 2,
      image: '/images/intersport/hero.jpg',
      alt: 'Gaming-Wall im INTERSPORT Clubhouse Berlin – Pop-up-Aktivierung von GG Manufaktur',
      head: 'clamp(22px,2.8vw,34px)'
    }
  ],
  [
    {
      slug: 'dekra',
      title: 'DEKRA Motorsport',
      // 1166 x 1166 -- quadratisch, also auch die Kachel.
      ar: 1,
      image: '/images/dekra/hero.jpg',
      alt: 'Digitaler Event-Pass für DEKRA an sechs DTM-Standorten',
      head: 'clamp(24px,3.2vw,38px)'
    },
    {
      slug: 'bayern-zockt',
      title: 'Bayern Zockt',
      ar: 16 / 9,
      video: '/videos/case-bayern-zockt.mp4',
      poster: '/videos/case-bayern-zockt.jpg',
      head: 'clamp(26px,3.4vw,42px)'
    }
  ],
  [
    {
      slug: 'rewe',
      title: 'REWE',
      ar: 2 / 3,
      image: '/images/rewe/hero.jpg',
      alt: 'eSport-Sponsoring-Aktivierung für REWE mit dem 1. FC Köln',
      head: 'clamp(20px,2.2vw,30px)'
    },
    {
      slug: 'showdown-0711',
      title: '0711 Showdown',
      ar: 16 / 9,
      video: '/videos/case-showdown.mp4',
      poster: '/videos/case-showdown.jpg',
      head: 'clamp(22px,2.8vw,34px)'
    },
    {
      slug: 'interwetten',
      title: 'Interwetten',
      ar: 3 / 4,
      image: '/images/interwetten/hero.jpg',
      alt: 'Virtual-Tennis-Aktivierung für Interwetten beim BOSS OPEN',
      head: 'clamp(20px,2.2vw,30px)'
    }
  ],
  [
    {
      slug: 'xp-days',
      title: 'XP Days',
      // 4000 x 2667, auf 2000 gerechnet.
      ar: 3 / 2,
      image: '/images/xp-days/hero.jpg',
      alt: 'XP Days – gamifizierte Karrieremesse der GG Manufaktur in Stuttgart',
      head: 'clamp(22px,2.8vw,34px)'
    },
    {
      slug: 'consumenta',
      title: 'NIVEA MEN // EFFECT // CRACKZ',
      // 1080 x 1920 -- hochkant, also eine schmale Kachel neben den XP Days.
      ar: 9 / 16,
      image: '/images/consumenta/hero.jpg',
      alt: 'Markenaktivierungen für NIVEA MEN, EFFECT und CRACKZ auf der Consumenta in Nürnberg',
      head: 'clamp(22px,2.8vw,34px)'
    }
  ]
];

interface BestCasesProps {
  onNavigate?: (page: any) => void;
}

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
const MosaicTile: React.FC<{ tile: Tile; delay: number; onNavigate?: (page: any) => void }> = ({ tile, delay, onNavigate }) => (
  <div
    className="w-full aspect-[var(--ar-m)] lg:w-auto lg:basis-0 lg:aspect-[var(--ar)]"
    style={{ '--ar': `${tile.ar}`, '--ar-m': `${tile.arMobile ?? tile.ar}`, flexGrow: tile.ar } as React.CSSProperties}
  >
    <motion.div
      className="h-full w-full"
      variants={TILE_VARIANTS}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={TILE_VIEWPORT}
    >
      <a
        href={`/best-cases/${tile.slug}`}
        onClick={(e) => { e.preventDefault(); onNavigate?.(tile.slug); }}
        className="relative group block overflow-hidden rounded-shell bg-slate-900 h-full w-full cursor-pointer"
      >
        {tile.video ? (
          <LazyVideo
            src={asset(tile.video)!}
            poster={asset(tile.poster)}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none ${tile.media ?? ''}`}
          />
        ) : (
          <img
            src={asset(tile.image)}
            alt={tile.alt ?? ''}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none ${tile.media ?? ''}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-xs uppercase tracking-widest">
            Case ansehen <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
        <motion.div variants={TILE_TEXT_VARIANTS} className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
          <div>
            <h3
              className="text-white font-black leading-[0.9] tracking-tighter uppercase mb-3 drop-shadow-2xl text-balance"
              style={{ fontSize: tile.head }}
            >
              {tile.title}
            </h3>
          </div>
        </motion.div>
      </a>
    </motion.div>
  </div>
);

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

        {/* Ein Band je Zeile. Der Versatz faengt in jedem Band wieder bei null
            an -- keine Kachel wartet auf eine, die zwei Baender weiter oben
            steht. */}
        <div className="flex flex-col gap-4 md:gap-6">
          {BANDS.map((band, bi) => (
            <div key={bi} className="flex flex-col lg:flex-row items-start gap-4 md:gap-6">
              {band.map((tile, ti) => (
                <MosaicTile key={tile.slug} tile={tile} delay={ti * STAGGER.card} onNavigate={onNavigate} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
