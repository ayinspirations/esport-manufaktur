import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DUR, EASE_REVEAL } from '../motion';

// ---------------------------------------------------------------------------
// Die aufklappende Handlungsaufforderung
// ---------------------------------------------------------------------------
// Auf der Seite standen ueberall zwei Knoepfe nebeneinander: "Termin
// vereinbaren" und "Kontakt aufnehmen", in der Leistung "Projekt anfragen" und
// "Kostenloses Erstgespraech vereinbaren". Zwei gleichzeitig gestellte Fragen,
// an jeder Station der Seite -- und die laengere von beiden gewann optisch,
// obwohl sie der Nebenweg ist.
//
// Hier steht eine Frage: die Pille nennt das Anliegen ("Jetzt dein Projekt
// anfragen"). Erst wer sie antippt, waehlt den Weg -- Termin oder Nachricht --
// und bekommt beide dort, wo eben noch das Label stand. Die Pille dehnt sich
// dafuer, sie oeffnet nichts daneben: der Klickpunkt bleibt derselbe.
//
// Das Muster ist ueberall gleich, der Wortlaut nicht: welche Frage die Pille
// stellt, entscheidet die Stelle, an der sie steht.
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
 * Wie sich die Pille dehnt.
 *
 * Eine Feder war es zuerst, und eine Feder federt: sie schieszt ueber die
 * Zielbreite hinaus und kommt zurueck. Das ist verspielt, und verspielt ist
 * hier das Gegenteil des Gemeinten. Dieselbe ruhige Kurve wie alles andere auf
 * der Seite, ueber dieselbe Dauer -- die Pille gleitet auf ihre Breite und
 * bleibt dort.
 */
const OPEN_TRANSITION = { duration: DUR.panel, ease: EASE_REVEAL } as const;

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
  const wayBase =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-black tracking-tight transition-colors duration-500 whitespace-nowrap';
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
        transition={OPEN_TRANSITION}
        // Rund, solange eine Zeile steht; auf dem Telefon stapeln sich die
        // beiden Wege, und eine Kapselform um zwei Zeilen sieht aus wie ein
        // Versehen -- dort wird die Pille zur Karte.
        className={`relative overflow-hidden rounded-[26px] sm:rounded-full ${shell}`}
      >
        {/*
          Beide Zustaende sind immer da; welcher zaehlt, entscheidet allein,
          welcher im Fluss steht und welcher darueber liegt.

          Mit AnimatePresence und `mode="wait"` verschwand erst das Label,
          dann kamen die Wege -- dazwischen war die Pille leer und fiel auf
          ihre Mindestbreite zusammen, was als Zucken vor der eigentlichen
          Bewegung zu sehen war. So blendet das eine ins andere, waehrend die
          Schale in einem Zug auf ihre neue Breite gleitet.
        */}
        <motion.button
          layout="position"
          transition={OPEN_TRANSITION}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-hidden={open}
          tabIndex={open ? -1 : 0}
          className={`group inline-flex items-center gap-2.5 px-7 py-4 text-sm sm:text-base font-black tracking-tight transition-opacity duration-500 ease-reveal ${
            open ? 'absolute inset-0 justify-center opacity-0 pointer-events-none' : 'relative opacity-100'
          }`}
        >
          {label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
        </motion.button>

        <motion.div
          layout="position"
          transition={OPEN_TRANSITION}
          aria-hidden={!open}
          className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-1 p-1.5 transition-opacity duration-500 ease-reveal ${
            open ? 'relative opacity-100' : 'absolute inset-0 opacity-0 pointer-events-none'
          }`}
        >
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => choose(onBooking)}
            className={`${wayBase} ${wayPrimary}`}
          >
            {bookingLabel}
          </button>
          <span
            aria-hidden="true"
            className={`hidden sm:block w-px h-6 mx-1 ${light ? 'bg-[#0b0f2a]/15' : 'bg-white/20'}`}
          />
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => choose(onContact)}
            className={`${wayBase} ${waySecondary}`}
          >
            {contactLabel}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
