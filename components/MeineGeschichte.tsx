import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { PageHero } from './PageHero';
import { ExpandingCTA } from './ui/expanding-cta';
import { DUR, EASE_REVEAL } from './motion';
import { BLOCK_GAP } from './spacing';
import { STORY_LEAD, STORY_INTRO, STORY_CHAPTERS } from './gruenderstory';
import { useDocumentHead } from '../hooks/useDocumentHead';

interface MeineGeschichteProps {
  /** Öffnet das Kontaktformular -- der zweite Weg hinter der Pille. */
  onOpenContact?: (subject?: string) => void;
  onNavigate: (page: any) => void;
  onOpenBooking?: () => void;
}

const CANVAS = 'bg-[#badeda]';
// Narrower than the rest of the site on purpose. This is 5.000 words of prose,
// and the container everywhere else is built for grids of tiles; at 1200px a
// paragraph runs to 150 characters a line, which is roughly twice what anyone
// reads comfortably.
const PROSE = 'max-w-[720px] mx-auto px-6 md:px-8';

/** Ab wie vielen Pixeln eine Wischbewegung als Blättern zählt. */
const SWIPE_THRESHOLD = 60;

// ---------------------------------------------------------------------------
// Die Gründerstory, Kapitel für Kapitel
// ---------------------------------------------------------------------------
// Sechzehn Kapitel und rund fünftausend Wörter standen hier untereinander --
// eine Seite, die man nicht liest, sondern an der man vorbeiscrollt. Wie weit
// es noch ist, sah man nur am Scrollbalken, und der sagte: sehr weit.
//
// Ein Kapitel je Ansicht dreht das um. Jeder Abschnitt ist so lang, wie er
// gelesen wird, und am Fuß steht nicht die restliche Seite, sondern der Name
// des nächsten Kapitels -- eine Einladung statt einer Strecke. Geblättert wird
// mit den Pfeilen, mit den Pfeiltasten oder, auf dem Telefon, mit dem Daumen.
// ---------------------------------------------------------------------------

export const MeineGeschichte: React.FC<MeineGeschichteProps> = ({ onNavigate, onOpenBooking, onOpenContact }) => {
  const [index, setIndex] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  // Der erste Aufbau darf nicht scrollen -- da steht die Seite ohnehin oben,
  // und ein Sprung an den Kapitelkopf würde den Seitenkopf überspringen.
  const turned = useRef(false);

  const chapter = STORY_CHAPTERS[index];
  const previous = index > 0 ? STORY_CHAPTERS[index - 1] : null;
  const next = index < STORY_CHAPTERS.length - 1 ? STORY_CHAPTERS[index + 1] : null;

  useDocumentHead({
    title: 'Meine Geschichte | GG Manufaktur',
    description:
      'Von FIFA-Turnieren in einer Garage über die eSport Manufaktur zur GG Manufaktur: Gianluca Crepaldi erzählt die Gründungsgeschichte.',
    canonicalPath: '/ueber-uns/meine-geschichte'
  });

  const turn = useCallback((to: number) => {
    if (to < 0 || to >= STORY_CHAPTERS.length) return;
    turned.current = true;
    setIndex(to);
  }, []);

  // Nach dem Blättern an den Kopf des Kapitels -- sofort, nicht animiert.
  //
  // Dieselbe Lehre wie bei den Leistungen: wird erst getauscht und dann
  // gescrollt, ist die Seite einen Moment kürzer als die Scrollposition
  // erlaubt und der Browser reiszt sie nach oben. Ein Sprung vor dem Zeichnen
  // ist unsichtbar, eine Fahrt über tausend Pixel Text ist es nicht.
  useEffect(() => {
    if (!turned.current) return;
    const el = topRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    if (window.scrollY > top) window.scrollTo({ top: Math.max(top, 0), behavior: 'instant' as ScrollBehavior });
  }, [index]);

  // Pfeiltasten blättern -- solange niemand gerade in ein Feld schreibt.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') turn(index + 1);
      if (e.key === 'ArrowLeft') turn(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, turn]);

  // Wischen auf dem Telefon. Nur waagerechte Gesten zählen: eine Bewegung, die
  // mehr rauf als zur Seite geht, ist Scrollen und darf kein Kapitel drehen.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    turn(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <div className={`w-full ${CANVAS}`}>
      <PageHero
        eyebrow="Meine Geschichte"
        title="Von Stift und Papier"
        accent="zur GG Manufaktur."
        subline={STORY_LEAD}
      />

      <div ref={topRef} className={`${PROSE} ${BLOCK_GAP} scroll-mt-28`}>
        {/* Wo im Text man steht: eine Zeile und ein Strich, der mitwächst.
            Ohne das ist ein Kapitel je Ansicht ein Text ohne Umfang -- man
            weisz nicht, ob noch zwei kommen oder zwanzig. */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="shrink-0 text-[#0a6f6a] font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px]">
            Kapitel {index + 1} / {STORY_CHAPTERS.length}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#0b0f2a]/12 overflow-hidden">
            <motion.span
              className="block h-full bg-[#0e958e]"
              initial={false}
              animate={{ width: `${((index + 1) / STORY_CHAPTERS.length) * 100}%` }}
              transition={{ duration: DUR.panel, ease: EASE_REVEAL }}
            />
          </span>
        </div>

        {/* Der Vorspann steht nur vor dem ersten Kapitel: er ist die Übergabe
            von der Überschrift in den Text, kein Teil der Geschichte. */}
        {index === 0 &&
          STORY_INTRO.map((para, i) => (
            <Reveal
              as="p"
              key={i}
              delay={i * 0.06}
              className="text-[#0b0f2a] text-xl md:text-2xl font-medium leading-relaxed tracking-tight mb-10 md:mb-14"
            >
              {para}
            </Reveal>
          ))}

        <article onPointerDown={onPointerDown} onPointerUp={onPointerUp} className="touch-pan-y">
          {/* Dieselbe Blende wie beim Wechsel einer Leistung: der abtretende
              Text geht neben dem Fluss, der neue trägt schon die Höhe. */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.section
              key={chapter.heading}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.22, ease: EASE_REVEAL } }}
              transition={{ duration: DUR.reveal, ease: EASE_REVEAL }}
            >
              <RevealText
                as="h2"
                by="word"
                text={chapter.heading}
                className="text-[clamp(26px,3.4vw,38px)] font-black leading-[1.1] tracking-tighter text-[#0b0f2a] mb-5 md:mb-6"
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
            </motion.section>
          </AnimatePresence>
        </article>

        {/* Blättern. Der Knopf nennt das Ziel, nicht die Richtung: "Nächstes
            Kapitel" sagt, dass es weitergeht, der Titel darunter sagt wohin --
            das ist der Unterschied zwischen einer Strecke und einer
            Einladung. */}
        <nav className="mt-12 md:mt-16 pt-8 border-t border-[#0b0f2a]/15 flex items-stretch justify-between gap-4">
          {previous ? (
            <button
              onClick={() => turn(index - 1)}
              className="group flex-1 min-w-0 text-left rounded-card px-4 py-3 -ml-4 hover:bg-[#0b0f2a]/[0.05] transition-colors duration-500"
            >
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#0a6f6a] mb-1.5">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-500" />
                Vorheriges Kapitel
              </span>
              <span className="block truncate text-[#0b0f2a] font-black text-sm md:text-base tracking-tight">
                {previous.heading}
              </span>
            </button>
          ) : (
            <span className="flex-1" />
          )}

          {next ? (
            <button
              onClick={() => turn(index + 1)}
              className="group flex-1 min-w-0 text-right rounded-card px-4 py-3 -mr-4 hover:bg-[#0b0f2a]/[0.05] transition-colors duration-500"
            >
              <span className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#0a6f6a] mb-1.5">
                Nächstes Kapitel
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
              </span>
              <span className="block truncate text-[#0b0f2a] font-black text-sm md:text-base tracking-tight">
                {next.heading}
              </span>
            </button>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      </div>

      {/* Der Abschluss steht am Ende der Geschichte, nicht unter jedem
          Kapitel: was folgt, ist die Seite wieder, nicht das nächste Kapitel. */}
      <section className={`${PROSE} ${BLOCK_GAP} pb-24 md:pb-32`}>
        {next === null ? (
          <div className="border-t border-[#0b0f2a]/15 pt-10 md:pt-12 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
            <ExpandingCTA
              label="Kostenloses Erstgespräch vereinbaren"
              onBooking={() => onOpenBooking?.()}
              onContact={() => onOpenContact?.('Meine Geschichte')}
            />
            <button
              onClick={() => onNavigate('ueber-uns')}
              className="spring inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0b0f2a]/[0.06] text-[#0b0f2a] border border-[#0b0f2a]/25 hover:border-[#0b0f2a]/40 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-colors duration-500"
            >
              Zurück zu Über uns
            </button>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('ueber-uns')}
            className="text-[#0b0f2a]/60 hover:text-[#0b0f2a] font-bold text-sm tracking-tight transition-colors duration-500"
          >
            Zurück zu Über uns
          </button>
        )}
      </section>
    </div>
  );
};
