import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { HERO_GROUP_DELAY, HERO_GROUP_DURATION } from './heroIntro';
import { CATEGORIES, CONSENT_EVENT, getConsent, saveConsent } from './cookieConsent';
import { EASE_REVEAL } from './motion';

// The dialog waits until the hero timeline has finished and settled, so the
// intro animation is not covered at first impression.
const CONSENT_DELAY_MS = (HERO_GROUP_DELAY + HERO_GROUP_DURATION + 0.4) * 1000;

export const CookiePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Open when there is no valid decision yet. Also re-opens when the footer
  // link clears the stored decision, which dispatches the same event.
  useEffect(() => {
    const evaluate = () => {
      if (getConsent()) return;
      setIsVisible(true);
    };
    const timer = setTimeout(evaluate, CONSENT_DELAY_MS);
    const onChange = () => {
      if (!getConsent()) {
        setShowDetails(false);
        setStatistics(false);
        setMarketing(false);
        setIsVisible(true);
      }
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, onChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const decide = (choice: { statistics: boolean; marketing: boolean }) => {
    saveConsent(choice);
    setIsVisible(false);
  };

  const toggles: Record<string, [boolean, (v: boolean) => void]> = {
    statistics: [statistics, setStatistics],
    marketing: [marketing, setMarketing]
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_REVEAL }}
          className="fixed inset-0 flex items-center justify-center z-[9999] px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
        >
          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE_REVEAL }}
            className="relative overflow-hidden bg-[#badeda] border border-[#0b0f2a]/10 rounded-shell p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(11,15,42,0.3)] max-w-[560px] w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-[#0e958e]/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              {!showDetails ? (
                <>
                  <div className="flex flex-col items-center text-center mb-7">
                    {/* Two-tone like every other heading on the site: the
                        subject in ink, the qualifier in the accent. */}
                    <h3 id="cookie-title" className="font-black uppercase tracking-wider text-xl mb-1.5 text-[#0b0f2a]">
                      Cookie-<span className="text-[#0e958e]">Einstellungen</span>
                    </h3>
                    <p className="text-[#0b0f2a]/50 text-[11px] uppercase tracking-[0.3em] font-bold">
                      Privatsphäre &amp; Sicherheit
                    </p>
                  </div>

                  <p className="text-[#0b0f2a]/70 text-base leading-relaxed mb-8 font-medium text-center">
                    Wir nutzen Cookies, um die Seite zu betreiben und – mit deiner Einwilligung – ihre Nutzung
                    auszuwerten und eingebettete Dienste zu laden. Du entscheidest, was wir verwenden dürfen.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => decide({ statistics: true, marketing: true })}
                      // Ink on the accent rather than white: at 13px this text
                      // is well under the large-text threshold, and white on
                      // #0e958e only reaches 3.7:1. Ink on the same accent is
                      // 5.1:1 and keeps the CI colour exactly.
                      className="spring w-full py-4 bg-[#0e958e] hover:bg-[#0e958e]/85 text-[#0b0f2a] text-[13px] font-black uppercase tracking-[0.25em] rounded-full flex items-center justify-center gap-3"
                    >
                      <Check className="w-5 h-5" />
                      Alle akzeptieren
                    </button>
                    {/* Rejecting is given the same weight as accepting -- a
                        consent dialog where "no" is harder to find than "yes"
                        is not a valid choice. */}
                    <button
                      onClick={() => decide({ statistics: false, marketing: false })}
                      className="spring w-full py-4 bg-[#0b0f2a] hover:bg-[#0b0f2a]/85 text-white text-[13px] font-black uppercase tracking-[0.25em] rounded-full"
                    >
                      Nur notwendige
                    </button>
                    <button
                      onClick={() => setShowDetails(true)}
                      className="w-full py-3 text-[#0b0f2a]/60 hover:text-[#0e958e] text-[12px] font-black uppercase tracking-[0.2em] rounded-full transition-colors flex items-center justify-center gap-2"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      Einstellungen
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex items-center gap-2 text-[#0b0f2a]/60 hover:text-[#0e958e] text-[11px] font-black uppercase tracking-[0.2em] transition-colors mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Zurück
                  </button>

                  <h3 className="font-black uppercase tracking-wider text-lg mb-6 text-[#0b0f2a]">
                    Welche Cookies <span className="text-[#0e958e]">dürfen wir setzen?</span>
                  </h3>

                  <div className="flex flex-col gap-3 mb-8">
                    {CATEGORIES.map((cat) => {
                      const entry = toggles[cat.id];
                      const on = cat.locked ? true : entry[0];
                      return (
                        <div
                          key={cat.id}
                          className="rounded-card border border-[#0b0f2a]/10 bg-white/40 p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-[#0b0f2a] font-black text-sm uppercase tracking-wider mb-1.5">
                                {cat.label}
                              </div>
                              <p className="text-[#0b0f2a]/65 text-[13px] font-medium leading-snug">
                                {cat.description}
                              </p>
                            </div>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={on}
                              aria-label={cat.label}
                              disabled={cat.locked}
                              onClick={() => !cat.locked && entry[1](!entry[0])}
                              className={`shrink-0 w-12 h-7 rounded-full transition-colors duration-300 relative ${
                                on ? 'bg-[#0e958e]' : 'bg-[#0b0f2a]/20'
                              } ${cat.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <span
                                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                                  on ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => decide({ statistics, marketing })}
                    className="spring w-full py-4 bg-[#0b0f2a] hover:bg-[#0b0f2a]/85 text-white text-[13px] font-black uppercase tracking-[0.25em] rounded-full"
                  >
                    Auswahl speichern
                  </button>
                </>
              )}

              <p className="text-[#0b0f2a]/45 text-[11px] font-medium text-center mt-6">
                Details in unserer{' '}
                <a href="#privacy" onClick={() => setIsVisible(false)} className="underline hover:text-[#0e958e]">
                  Datenschutzerklärung
                </a>
                . Du kannst deine Auswahl jederzeit im Footer ändern.
              </p>
            </div>

            {/* Closing without choosing is not treated as consent: the dialog
                simply returns on the next visit. */}
            <button
              onClick={() => setIsVisible(false)}
              aria-label="Schließen"
              className="absolute top-6 right-6 text-[#0b0f2a]/35 hover:text-[#0b0f2a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
