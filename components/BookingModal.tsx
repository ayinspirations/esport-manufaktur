import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { BOOKING_URL } from './site';
import { X, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'slow'>('loading');

  useScrollLock(isOpen);

  // ---------------------------------------------------------------------------
  // Der Kalender kommt jetzt ohne HubSpots Einbettungsskript
  // ---------------------------------------------------------------------------
  // Hier wurde bei jedem Oeffnen MeetingsEmbedCode.js nachgeladen und beim
  // Schlieszen wieder aus dem Dokument genommen. Das Skript sucht sich beim
  // Start die Behaelter mit `data-src` und haengt Iframes hinein -- ein
  // Vorgang, der genau einmal je Seitenaufruf zuverlaessig laeuft. Beim
  // zweiten Oeffnen, bei langsamer Verbindung oder wenn ein Blocker die Datei
  // abfaengt, blieb der Kasten leer. Genau das war "laedt oft nicht".
  //
  // Dabei ist die Einbettung nichts als ein Iframe auf dieselbe Adresse. Den
  // stellen wir selbst, und damit haengt das Buchen an nichts mehr auszer der
  // Seite von HubSpot: ein Klick, ein Iframe, fertig. Was das Skript sonst
  // noch tut -- die Hoehe des Rahmens nachfuehren -- brauchen wir nicht, weil
  // der Rahmen hier ohnehin die volle Hoehe des Fensters hat.
  //
  // Die Rueckmeldung nach der Buchung kommt weiterhin per postMessage aus dem
  // Iframe; die schickt die HubSpot-Seite von sich aus, dafuer braucht es das
  // Skript nicht.
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setLoadState('loading');
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      try {
        if (event.data.meetingBooked || (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted')) {
          setIsSuccess(true);
        }
      } catch (e) {
        // Fremde Nachrichten -- nicht unsere Sache.
      }
    };
    window.addEventListener('message', handleMessage);

    // Kommt binnen sieben Sekunden gar nichts, bekommt der Besucher den Weg im
    // neuen Tab angeboten, statt auf eine weisze Flaeche zu sehen.
    const slow = window.setTimeout(() => {
      setLoadState((s) => (s === 'loading' ? 'slow' : s));
    }, 7000);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.clearTimeout(slow);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 md:p-6 overscroll-contain">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />
          
            <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            /* Die Hoehe steht in index.css unter .modal-shell: erst vh, dann
               dvh. `vh` rechnet auf Telefonen mit dem Fenster ohne
               Browserleisten -- das echte ist kleiner, und der Fusz mit dem
               Buchen-Knopf lag darunter. `dvh` behebt das, gibt es aber erst
               ab iOS 15.4; deshalb bleibt vh als Boden darunter stehen, statt
               dass aeltere Geraete voellig ohne Hoehe dastehen. */
            className="modal-shell relative w-full max-w-[800px] bg-white rounded-shell shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6 border-b border-slate-100 shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-[#0b0f2a] leading-none">Termin buchen</h3>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Kostenloses Kennenlernen</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Der Ausweg steht immer da, nicht erst wenn etwas schiefgeht.
                    Ein Iframe kann in einem In-App-Browser oder hinter einem
                    Blocker leer bleiben, ohne dass die Seite davon erfaehrt --
                    dann ist dieser Verweis der Unterschied zwischen "geht
                    nicht" und "geht eben hier". */}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Im neuen Tab öffnen"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                >
                  <ExternalLink className="w-[18px] h-[18px]" />
                  <span className="sr-only">Termin im neuen Tab buchen</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                  aria-label="Schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Der Inhalt.
                Der Rahmen fuellt die Flaeche, die Seite darin scrollt selbst
                -- und das ist hier auch richtig so: die Knoepfe "Zurueck" und
                "Bestaetigen" liegen bei HubSpot in einer Leiste, die am
                unteren Rand des Fensters klebt. Im Rahmen heiszt das: am
                unteren Rand des Rahmens. Ist der so hoch wie die Flaeche,
                steht die Leiste sichtbar darin.
                Kurz stand hier eine Mechanik, die den Rahmen mit dem Inhalt
                wachsen liesz. Fuer Telefone gedacht, half sie dort nicht (die
                Leiste rutschte mit nach unten aus dem Bild) und schadete am
                Desktop, wo bis dahin alles stimmte. Telefone gehen jetzt
                ohnehin einen anderen Weg -- siehe openBooking in App.tsx --,
                also ist sie wieder weg. */}
            <div className="flex-1 relative bg-slate-50 min-h-0 overflow-hidden">
              {!isSuccess ? (
                <>
                  <iframe
                    key={String(isOpen)}
                    src={`${BOOKING_URL}?embed=true`}
                    title="Termin bei der GG Manufaktur buchen"
                    onLoad={() => setLoadState('ready')}
                    className="w-full h-full border-0 block"
                  />
                  {loadState !== 'ready' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-slate-50 px-8 text-center">
                      {loadState === 'loading' ? (
                        <>
                          <span className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-[#0e958e]" style={{ animation: 'gg-spin 700ms linear infinite' }} />
                          <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Kalender wird geladen</p>
                        </>
                      ) : (
                        <>
                          <p className="text-slate-600 font-medium max-w-xs leading-relaxed">
                            Der Kalender braucht ungewöhnlich lange. Du kannst ihn direkt öffnen:
                          </p>
                          <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full bg-[#0b0f2a] hover:bg-[#0e958e] text-white text-xs font-black uppercase tracking-[0.2em] transition-colors"
                          >
                            Termin im neuen Tab buchen
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px]"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0b0f2a] mb-4">
                    Vielen Dank!
                  </h2>
                  <p className="text-slate-600 text-lg max-w-md mx-auto mb-10 font-medium">
                    Deine Terminanfrage war erfolgreich. Wir haben dir eine Bestätigung per E-Mail gesendet und freuen uns auf unser Gespräch!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-10 py-5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-[0.25em] rounded-full transition-all shadow-lg"
                  >
                    Schließen
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
