import React, { useLayoutEffect, useRef } from 'react';
import { RevealOff } from '../Reveal';
import { EASE_REVEAL_CSS } from '../motion';

// ---------------------------------------------------------------------------
// Scroll-Animation der Money Pages
// ---------------------------------------------------------------------------
// Alles unterhalb des Kopfs -- Ueberschriften, Texte, Kacheln, Listen -- kommt
// beim Scrollen einzeln von unten herein, in Leserichtung nacheinander. Die
// einzelnen <Reveal> auf den Seiten sind hier abgeschaltet (RevealOff), sonst
// liefen zwei Animationen uebereinander. Der Kopf behaelt seine eigene
// (data-reveal-skip).
// ---------------------------------------------------------------------------

const TARGETS = 'h2, h3, p, li, details, img, button, .rounded-card, a.rounded-full';
const STEP = 0.08;
const MAX_DELAY = 0.64;
const DURATION = 0.9;

/** Ein Element wird als Ganzes animiert, ausser es ist eine Flaeche mit eigener Ueberschrift. */
function collect(root: HTMLElement): HTMLElement[] {
  const picked: HTMLElement[] = [];
  root.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
    if (el.closest('[data-reveal-skip], details > *')) return;
    // Eigene Deckkraft/Bewegung (z. B. Bild-Ueberblendung der Plattform-Buehne) nicht anfassen.
    if (el.style.opacity || el.style.transform) return;
    if (el.classList.contains('rounded-card') && el.querySelector('h2')) return;
    if (picked.some((p) => p.contains(el))) return;
    picked.push(el);
  });
  return picked;
}

export const MoneyPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = collect(root);
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        // Was gleichzeitig sichtbar wird, kommt in Leserichtung nacheinander.
        let n = 0;
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((e) => {
            const el = e.target as HTMLElement;
            observer.unobserve(el);
            // Schon oberhalb (uebersprungen): sofort, ohne einen Platz in der Reihe.
            const above = e.boundingClientRect.bottom < 0;
            const delay = above ? 0 : Math.min(n++ * STEP, MAX_DELAY);
            el.style.transition = `opacity ${DURATION}s ${EASE_REVEAL_CSS} ${delay}s, transform ${DURATION}s ${EASE_REVEAL_CSS} ${delay}s`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            // Danach aufraeumen, damit Hover-Effekte der Elemente wieder greifen.
            window.setTimeout(() => {
              el.style.transition = '';
              el.style.transform = '';
              el.style.opacity = '';
            }, (delay + DURATION) * 1000 + 50);
          });
      },
      // Oben weit offen: Was beim schnellen Scrollen uebersprungen wurde und
      // schon oberhalb liegt, gilt als gesehen und wird trotzdem eingeblendet.
      { threshold: 0.1, rootMargin: '100000px 0px -60px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <RevealOff.Provider value={true}>
      <div ref={ref} className="w-full bg-[#badeda]">{children}</div>
    </RevealOff.Provider>
  );
};

/** Bereich mit eigener Animation (Kopf): die Seitenanimation laesst ihn aus. */
export const OwnReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RevealOff.Provider value={false}>{children}</RevealOff.Provider>
);
