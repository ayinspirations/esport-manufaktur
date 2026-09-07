import React from 'react';
import { Reveal } from './Reveal';
import { ExpandingCTA } from './ui/expanding-cta';
import { SECTION_PADDING } from './spacing';

interface CasesCTAProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
  /** Rückfallweg, wenn kein Popup gereicht wird: das Formular am Seitenfuß. */
  onScroll?: (id: string) => void;
}

/**
 * Der Schritt nach den Cases: sprich mit uns.
 *
 * Stand bis eben unter dem Mosaik, also mitten in den Cases -- zwischen der
 * Übersicht und demselben Material im Großformat. Die Frage "Genug gesehen?"
 * kam damit, bevor man alles gesehen hatte. Sie steht jetzt hinter beiden
 * Case-Sektionen, wo sie beantwortbar ist.
 *
 * Ein Anliegen, zwei Wege: die Pille fragt, der Klick wählt -- ein Termin im
 * Kalender oder eine geschriebene Anfrage, beide als Popup, damit niemand die
 * Seite verlässt, um zu fragen.
 */
export const CasesCTA: React.FC<CasesCTAProps> = ({ onOpenBooking, onOpenContact, onScroll }) => (
  <section className={`w-full bg-[#badeda] ${SECTION_PADDING} px-6 md:px-14`}>
    <Reveal delay={0.1} y={24} className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
      {/* Der Umbruch steht fest, er wird nicht dem Browser ueberlassen.
          `text-balance` verteilt eine Zeile auf gleich lange Haelften, und das
          traf hier zwischen Frage und Antwort: "Genug gesehen? Dann" stand
          oben, "sprechen wir ueber dein Projekt." darunter. Die Frage gehoert
          auf die erste Zeile, die Antwort auf die zweite. */}
      <p className="text-[#0b0f2a] font-black text-xl md:text-2xl tracking-tight max-w-xl leading-snug">
        <span className="block">Genug gesehen?</span>
        <span className="block text-balance">Dann sprechen wir über dein Projekt.</span>
      </p>
      <div className="mt-7">
        <ExpandingCTA
          label="Jetzt dein Projekt anfragen"
          onBooking={() => (onOpenBooking ? onOpenBooking() : onScroll?.('contact-section'))}
          onContact={() => (onOpenContact ? onOpenContact('Best Cases') : onScroll?.('contact-section'))}
        />
      </div>
    </Reveal>
  </section>
);
