import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { BOOKING_URL } from './site';
import { X, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Warum hier wieder HubSpots Einbettungsskript laeuft
// ---------------------------------------------------------------------------
// Der Kalender steckt in einem Rahmen auf fremder Seite, und drei Anlaeufe
// haben gezeigt, dass es genau eine Anordnung gibt, die auf dem Telefon
// funktioniert.
//
// Die Knoepfe "Zurueck" und "Bestaetigen" liegen bei HubSpot in einer Leiste
// am unteren Rand ihres Fensters. Im Rahmen ist ihr Fenster der Rahmen. Also:
//
//   Rahmen so hoch wie die Flaeche, Seite scrollt innen -- die Leiste klebt
//   unten am Rahmen und ist sichtbar, aber der innere Bildlauf endet auf dem
//   Telefon mitten im Formular. Nicht erreichbar.
//
//   Rahmen fest hoeher gemacht -- die Leiste wandert mit nach unten aus dem
//   Bild, und der innere Bildlauf nimmt die Wischgeste weiterhin an, bevor
//   der Kasten auszen sie bekommt. Schlimmer.
//
//   Rahmen genau so hoch wie sein Inhalt -- dann hat er innen nichts mehr zu
//   scrollen, die Wischgeste geht zwangslaeufig an den Kasten auszen, und die
//   Leiste steht am Ende des Inhalts. Das ist die Anordnung, die traegt.
//
// Die dritte kann man nicht selbst herstellen: die Hoehe des Inhalts steht
// hinter einer fremden Domain, und ohne sie bleibt jede Zahl geraten. HubSpot
// meldet sie per postMessage, und ihr Skript ist der Empfaenger, der sie
// kennt -- es setzt die Hoehe des Rahmens bei jedem Schritt neu.
//
// Deshalb laeuft es wieder mit, aber anders als zuvor: es wird bei jedem
// Oeffnen frisch eingehaengt (nur so durchsucht es das Dokument erneut nach
// dem Behaelter), es wird bei Fehlschlag wiederholt, und wenn nach dreieinhalb
// Sekunden kein Rahmen steht, stellen wir selbst einen -- lieber ein Kalender
// mit innerem Bildlauf als gar keiner. Der Verweis auf die Terminseite im
// neuen Tab steht ohnehin die ganze Zeit im Kopf des Fensters.
//
// Wichtig fuer spaeter: dem Behaelter niemals eine Hoehe geben. Genau daran
// ist die urspruengliche Fassung gescheitert -- sie hatte h-[1200px], und
// damit lief die Nachfuehrung des Skripts ins Leere.
// ---------------------------------------------------------------------------

const MEETINGS_SRC = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

/**
 * Haengt das Einbettungsskript neu ein und meldet, wenn es geladen ist.
 *
 * Neu eingehaengt, nicht wiederverwendet: das Skript durchsucht das Dokument
 * beim Ausfuehren, und der Behaelter entsteht erst, wenn das Fenster aufgeht.
 * Aus dem Zwischenspeicher kostet das nichts.
 */
const runMeetingsScript = (attempt = 0): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    document.querySelectorAll('script[data-hs-meetings]').forEach((el) => el.remove());
    const el = document.createElement('script');
    el.src = MEETINGS_SRC;
    el.async = true;
    el.setAttribute('data-hs-meetings', '');
    el.addEventListener('load', () => resolve(), { once: true });
    el.addEventListener('error', () => reject(new Error('Skript blockiert')), { once: true });
    document.body.appendChild(el);
  }).catch((err: unknown) => {
    if (attempt >= 2) throw err;
    return new Promise<void>((r) => setTimeout(() => r(), 600 * (attempt + 1))).then(() =>
      runMeetingsScript(attempt + 1)
    );
  });

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  /** 'script' = HubSpot stellt den Rahmen, 'self' = wir stellen ihn. */
  const [mode, setMode] = useState<'script' | 'self'>('script');
  const [hasFrame, setHasFrame] = useState(false);
  /** Der selbst gestellte Rahmen hat geladen. */
  const [selfLoaded, setSelfLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setMode('script');
      setHasFrame(false);
      setSelfLoaded(false);
      setSlow(false);
      return;
    }

    // Die Rueckmeldung nach der Buchung. Kommt aus dem Rahmen und braucht das
    // Skript nicht.
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

    // Der Behaelter steht im Dokument, sobald dieser Effekt laeuft; jetzt darf
    // das Skript ihn suchen.
    let cancelled = false;
    runMeetingsScript().catch(() => {
      if (!cancelled) setMode('self');
    });

    // Ob wirklich ein Rahmen entstanden ist, sagt uns nicht das Skript,
    // sondern das Dokument.
    const observer = new MutationObserver(() => {
      if (containerRef.current?.querySelector('iframe')) setHasFrame(true);
    });
    if (containerRef.current) observer.observe(containerRef.current, { childList: true, subtree: true });

    const selfHelp = window.setTimeout(() => {
      if (!cancelled && !containerRef.current?.querySelector('iframe')) setMode('self');
    }, 3500);

    const slowNote = window.setTimeout(() => {
      if (!cancelled) setSlow(true);
    }, 8000);

    return () => {
      cancelled = true;
      window.removeEventListener('message', handleMessage);
      observer.disconnect();
      window.clearTimeout(selfHelp);
      window.clearTimeout(slowNote);
    };
  }, [isOpen]);

  // Fertig heiszt: es steht wirklich ein Rahmen da -- entweder der vom
  // Skript, oder unserer, und der erst, wenn er geladen hat. Sonst bliebe im
  // Fehlerfall eine weisze Flaeche ohne jeden Hinweis stehen.
  const ready = hasFrame || selfLoaded;

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
               Browserleisten -- das echte ist kleiner, und der Fusz lag
               darunter. `dvh` behebt das, gibt es aber erst ab iOS 15.4;
               deshalb bleibt vh als Boden darunter stehen. */
            className="modal-shell relative w-full max-w-[800px] bg-white rounded-shell shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Kopf */}
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
                    Ein Rahmen kann in einem In-App-Browser oder hinter einem
                    Blocker leer bleiben, ohne dass die Seite davon erfaehrt. */}
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

            {/* Der Bildlauf gehoert diesem Kasten -- und nur ihm, sobald der
                Rahmen die Hoehe seines Inhalts hat. `overscroll-contain` haelt
                die Geste hier, statt sie an die Seite dahinter durchzureichen. */}
            <div
              className="flex-1 relative bg-slate-50 min-h-0 overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              {!isSuccess ? (
                <>
                  {mode === 'script' ? (
                    /* Ohne Hoehenangabe. Die setzt das Skript, und zwar bei
                       jedem Schritt neu. */
                    <div
                      ref={containerRef}
                      className="meetings-iframe-container w-full"
                      data-src={`${BOOKING_URL}?embed=true`}
                    />
                  ) : (
                    <iframe
                      src={`${BOOKING_URL}?embed=true`}
                      title="Termin bei der GG Manufaktur buchen"
                      onLoad={() => setSelfLoaded(true)}
                      className="w-full h-full border-0 block"
                    />
                  )}

                  {!ready && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-slate-50 px-8 text-center">
                      {!slow ? (
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
