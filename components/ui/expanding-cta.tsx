import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Mail } from 'lucide-react';

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

/** Die Feder, mit der sich die Pille dehnt: schnell am Anfang, kein Nachwippen. */
const SPRING = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 } as const;

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
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black tracking-tight transition-colors duration-500 whitespace-nowrap';
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
        transition={SPRING}
        // Rund, solange eine Zeile steht; auf dem Telefon stapeln sich die
        // beiden Wege, und eine Kapselform um zwei Zeilen sieht aus wie ein
        // Versehen -- dort wird die Pille zur Karte.
        className={`relative overflow-hidden rounded-[26px] sm:rounded-full ${shell}`}
      >
        <AnimatePresence initial={false} mode="wait">
          {!open ? (
            <motion.button
              key="label"
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={false}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="spring group inline-flex items-center gap-2.5 px-7 py-4 text-sm sm:text-base font-black tracking-tight"
            >
              {label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
            </motion.button>
          ) : (
            <motion.div
              key="ways"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.04 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 p-1.5"
            >
              <button type="button" onClick={() => choose(onBooking)} className={`${wayBase} ${wayPrimary}`}>
                <CalendarDays className="w-4 h-4" />
                {bookingLabel}
              </button>
              <span
                aria-hidden="true"
                className={`hidden sm:block w-px h-6 mx-0.5 ${light ? 'bg-[#0b0f2a]/15' : 'bg-white/20'}`}
              />
              <button type="button" onClick={() => choose(onContact)} className={`${wayBase} ${waySecondary}`}>
                <Mail className="w-4 h-4" />
                {contactLabel}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
