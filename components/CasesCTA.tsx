import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
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
 * Zwei Wege, ein Anliegen: ein Termin im Kalender oder eine geschriebene
 * Anfrage -- beide als Popup, damit niemand die Seite verlässt, um zu fragen.
 */
export const CasesCTA: React.FC<CasesCTAProps> = ({ onOpenBooking, onOpenContact, onScroll }) => (
  <section className={`w-full bg-[#badeda] ${SECTION_PADDING} px-6 md:px-14`}>
    <Reveal delay={0.1} y={24} className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
      <p className="text-[#0b0f2a] font-black text-xl md:text-2xl tracking-tight max-w-xl leading-snug text-balance">
        Genug gesehen? Dann sprechen wir über dein Projekt.
      </p>
      <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={() => (onOpenBooking ? onOpenBooking() : onScroll?.('contact-section'))}
          className="spring group inline-flex items-center gap-2.5 bg-[#0b0f2a] hover:bg-[#0e958e] text-white px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight transition-colors duration-500"
        >
          Termin vereinbaren
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
        </button>
        <button
          onClick={() => (onOpenContact ? onOpenContact('Best Cases') : onScroll?.('contact-section'))}
          className="spring inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0b0f2a]/[0.06] text-[#0b0f2a] border border-[#0b0f2a]/25 hover:border-[#0b0f2a]/40 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight transition-colors duration-500"
        >
          Kontakt aufnehmen
        </button>
      </div>
    </Reveal>
  </section>
);
