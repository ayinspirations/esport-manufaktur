import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EASE_REVEAL, SPRING_SHELL } from '../motion';

// ---------------------------------------------------------------------------
// Die aufklappende Handlungsaufforderung
// ---------------------------------------------------------------------------
// Auf der Seite standen ueberall zwei Knoepfe nebeneinander: "Termin
// vereinbaren" und "Kontakt aufnehmen", in der Leistung "Projekt anfragen" und
// "Kostenloses Erstgespraech vereinbaren". Zwei gleichzeitig gestellte Fragen,
// an jeder Station der Seite -- und die laengere von beiden gewann optisch,
// obwohl sie der Nebenweg ist.
//
// Hier steht eine Frage: die Pille nennt das Anliegen. Erst wer sie antippt,
// waehlt den Weg -- Termin oder Nachricht -- und bekommt beide dort, wo eben
// noch das Label stand. Die Pille dehnt sich dafuer, sie oeffnet nichts
// daneben: der Klickpunkt bleibt derselbe.
//
// ---------------------------------------------------------------------------
// Die Choreografie, und warum sie so und nicht anders ist
// ---------------------------------------------------------------------------
// Drei Dinge passieren gleichzeitig, und genau ihre Gleichzeitigkeit ist der
// Effekt:
//
//   1. Die Schale geht auf ihre neue Breite -- eine Feder, kein Ablaufplan,
//      und eine ueberdaempfte: sie kommt an, statt ueber die Zielbreite
//      hinauszuschieszen. Eine Feder kennt kein Ende ihrer Dauer; das laesst
//      die Bewegung getragen wirken statt abgezaehlt.
//   2. Das Label steigt nach oben aus der Pille heraus.
//   3. Die beiden Wege kommen aus einer Spur kleiner heraus hoch, einen
//      Hauch spaeter, sodass sie in die schon oeffnende Schale hineinwachsen.
//
// Auf jeder Breite dieselbe Bewegung: die Wege stehen immer nebeneinander,
// die Schale dehnt sich immer nur zur Seite. Ein Umbruch auf dem Telefon
// haette daraus zwei Bewegungen gemacht -- Breite und Hoehe zugleich.
//
// Ein Zwischenversuch liesz die Schale per Zeitplan laufen und blendete die
// Inhalte per CSS gegeneinander. Das war korrekt und leblos: eine Kurve mit
// festem Ende bremst sichtbar ab, und zwei ineinander verblassende Bloecke
// bewegen sich nicht, sie werden nur durchsichtig.
//
// `mode="popLayout"` ist das Stueck, das beides zusammenhaelt: es nimmt den
// abtretenden Inhalt aus dem Fluss, sodass allein der neue die Breite
// bestimmt, die die Schale gerade anfaehrt. Ohne das misst die Schale
// waehrend des Wechsels beide zugleich und faehrt eine Breite an, die es nie
// geben wird.
// ---------------------------------------------------------------------------

interface ExpandingCTAProps {
  /** Was die geschlossene Pille sagt -- der Ort waehlt den Wortlaut. */
  label: string;
  /** Oeffnet die Terminbuchung. */
  onBooking: () => void;
  /** Oeffnet das Kontaktformular, moeglichst mit dem Betreff der Stelle. */
  onContact: () => void;
  /** Beschriftung der beiden Wege, falls eine Stelle sie anders nennt. */
  bookingLabel?: string;
  contactLabel?: string;
  /**
   * 'ink' steht auf heller Leinwand, 'light' auf dunklem Grund. Beide tragen
   * die Farben der Seite -- Tinte, Teal, Weisz -- und keine geliehenen.
   */
  tone?: 'ink' | 'light';
  className?: string;
}

/**
 * Der Wechsel der Inhalte.
 *
 * Laenger und mit kleinerem Weg als in der Vorlage (0.2s, 20px, scale 0.9):
 * deren Betrag gehoert zu einer Feder, die selbst schnappt. Unter einer
 * ruhigen Schale wirkt ein Inhalt, der 20 Pixel weit springt und aus 90
 * Prozent aufzieht, wie ein zweiter, schnellerer Vorgang im selben Knopf.
 */
const SWAP = { duration: 0.32, ease: EASE_REVEAL } as const;

export const ExpandingCTA: React.FC<ExpandingCTAProps> = ({
  label,
  onBooking,
  onContact,
  bookingLabel = 'Termin vereinbaren',
  contactLabel = 'Kontakt aufnehmen',
  tone = 'ink',
  className = ''
}) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Zu, sobald daneben getippt oder Escape gedrueckt wird. Eine Pille, die nur
  // ihr eigener Knopf wieder schlieszt, faengt den naechsten Klick ab.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = useCallback((run: () => void) => {
    setOpen(false);
    run();
  }, []);

  const light = tone === 'light';

  // Die Schale traegt die Fuellung, damit sich beim Dehnen eine Flaeche
  // aufzieht statt zwei Knoepfe nebeneinanderzutreten.
  const shell = light
    ? 'bg-white text-[#0b0f2a] shadow-[0_18px_50px_-28px_rgba(0,0,0,0.65)]'
    : 'bg-[#0b0f2a] text-white shadow-[0_18px_50px_-28px_rgba(11,15,42,0.6)]';
  // Auf dem Telefon enger gesetzt und eine Spur kleiner: zwei ausgeschriebene
  // Wege nebeneinander muessen in die Breite eines schmalen Schirms passen,
  // ohne dass einer von beiden zu "Termin" verkuerzt werden muss.
  const wayBase =
    'inline-flex items-center justify-center rounded-full px-3.5 py-2.5 text-[11.5px] sm:px-6 sm:py-3 sm:text-sm font-black tracking-tight transition-colors duration-500 whitespace-nowrap';
  const wayPrimary = light
    ? 'bg-[#0b0f2a] text-white hover:bg-[#0e958e]'
    : 'bg-white text-[#0b0f2a] hover:bg-emerald-400';
  const waySecondary = light
    ? 'text-[#0b0f2a]/75 hover:text-[#0b0f2a] hover:bg-[#0b0f2a]/[0.06]'
    : 'text-white/75 hover:text-white hover:bg-white/10';

  return (
    <div ref={boxRef} className={`inline-flex ${className}`}>
      <motion.div
        layout
        transition={SPRING_SHELL}
        // Eine Zeile, auf jeder Breite. Die beiden Wege standen auf dem
        // Telefon uebereinander, und damit dehnte sich die Pille nicht mehr
        // zur Seite, sondern klappte nach unten auf: statt einer Bewegung
        // zwei, Breite und Hoehe zugleich, und die Feder arbeitete gegen den
        // Umbruch. Nebeneinander bleibt es dieselbe Bewegung wie am Desktop --
        // die Schrift wird kleiner, nicht der Aufbau ein anderer.
        className={`relative flex items-center overflow-hidden rounded-full ${shell}`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {!open ? (
            <motion.button
              key="label"
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={false}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={SWAP}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 text-[13px] sm:text-base font-black tracking-tight"
            >
              {label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
            </motion.button>
          ) : (
            <motion.div
              key="ways"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              // Einen Hauch spaeter als die Schale, damit die Wege in eine
              // bereits oeffnende Flaeche hineinwachsen statt gegen ihren Rand
              // zu laufen.
              transition={{ ...SWAP, delay: 0.08 }}
              className="flex flex-row items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5"
            >
              <button type="button" onClick={() => choose(onBooking)} className={`${wayBase} ${wayPrimary}`}>
                {bookingLabel}
              </button>
              <span
                aria-hidden="true"
                className={`w-px h-5 sm:h-6 mx-0.5 sm:mx-1 ${light ? 'bg-[#0b0f2a]/15' : 'bg-white/20'}`}
              />
              <button type="button" onClick={() => choose(onContact)} className={`${wayBase} ${waySecondary}`}>
                {contactLabel}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
