import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import { EASE_REVEAL_CSS } from '../components/motion';

// ---------------------------------------------------------------------------
// Das langsame Heranfahren auf dem Telefon
// ---------------------------------------------------------------------------
// Auf dem Desktop lebt jede Kachel von einer Bewegung, die es auf einem
// Telefon nicht gibt: `group-hover:scale`. Ein Finger schwebt nicht, also
// lagen die Bilder dort vollkommen still, waehrend die Seite an ihnen
// vorbeizog. Diesen Platz nimmt das Heranfahren ein.
//
// Die erste Fassung hing die Skalierung an den Bildlauf: jede Kachel las ihre
// Position, und daraus wurde ein Wert zwischen 1,00 und 1,08. Das sieht auf
// dem Schreibtisch gut aus und ist auf einem Telefon der falsche Handel.
// Fuenfundzwanzig Kacheln messen dabei in jedem Bild ihre Lage -- ein
// erzwungenes Layout je Kachel und Bild --, und iOS liefert waehrend des
// Nachschwingens ohnehin nur unregelmaeszig Bildlauf-Ereignisse. Das Ergebnis
// war genau das gemeldete Zittern.
//
// Jetzt entscheidet ein IntersectionObserver einmal, ob die Kachel im Bild
// ist, und der Rest ist eine CSS-Transition: der Browser rechnet sie im
// Compositor, ohne dass waehrend des Bildlaufs eine Zeile JavaScript laeuft.
// Man sieht praktisch dasselbe -- das Bild waechst langsam, waehrend die
// Kachel durchs Bild wandert --, es kostet nur nichts mehr.
//
// Zwei Bedingungen bleiben: nur auf schmalen Schirmen (darueber gehoert die
// Skalierung dem Zeiger, und zwei Transformationen auf einem Element
// ueberschreiben einander), und nur, wenn `prefers-reduced-motion` nicht
// gesetzt ist.
// ---------------------------------------------------------------------------

/** Schmaler Schirm und Bewegung erwuenscht -- beides zur Laufzeit beobachtet. */
const usePhoneMotion = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 639px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setOn(narrow.matches && !still.matches);
    sync();
    narrow.addEventListener('change', sync);
    still.addEventListener('change', sync);
    return () => {
      narrow.removeEventListener('change', sync);
      still.removeEventListener('change', sync);
    };
  }, []);

  return on;
};

/**
 * Gibt Ref und Stil fuer die Huelle um das Medium einer Kachel zurueck.
 * Auszerhalb des Telefons steht im Stil nichts -- dort bleibt es beim Hover.
 */
export function useScrollZoom(to = 1.06) {
  const ref = useRef<HTMLDivElement>(null);
  const active = usePhoneMotion();
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;

    // Ein einziger Rueckruf je Kachel, wenn sie den Schirm betritt -- und
    // keiner mehr danach. Der Rand von 15 Prozent laeszt die Bewegung
    // beginnen, waehrend die Kachel noch unter der Kante steht, sodass man
    // beim Hochscrollen in eine bereits laufende Bewegung hineinfaehrt statt
    // in einen Start.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '-15% 0px -15% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  const style: CSSProperties | undefined = active
    ? {
        transform: `scale(${near ? to : 1})`,
        // Lang und weich: die Bewegung soll unter dem Daumen liegen, nicht vor
        // ihm. Nur `transform` -- kein Layout, kein Neuzeichnen.
        transition: `transform 2200ms ${EASE_REVEAL_CSS}`
      }
    : undefined;

  return { ref: ref as RefObject<HTMLDivElement>, zoom: style };
}
