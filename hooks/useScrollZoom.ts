import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

// ---------------------------------------------------------------------------
// Das langsame Heranfahren auf dem Telefon
// ---------------------------------------------------------------------------
// Auf dem Desktop lebt jede Kachel von einer Bewegung, die es auf einem
// Telefon nicht gibt: `group-hover:scale-105`. Ein Finger schwebt nicht, also
// liegen die Bilder dort vollkommen still, waehrend die Seite an ihnen
// vorbeizieht.
//
// Diesen Platz nimmt jetzt der Bildlauf selbst ein. Waehrend eine Kachel durch
// den Schirm wandert, waechst ihr Bild von 1,00 auf 1,08 -- so wenig, dass man
// es nicht als Effekt bemerkt, und genug, dass die Flaeche lebt. Es ist
// dieselbe Geste wie beim Zeigen mit der Maus, nur an den Bildlauf gehaengt
// statt an den Zeiger.
//
// Zwei Bedingungen:
//
//   Nur auf schmalen Schirmen. Auf dem Desktop wuerde die Skalierung aus dem
//   Bildlauf mit der aus dem Hover kollidieren -- beides sind Transformationen
//   auf demselben Element, und die zuletzt gesetzte gewinnt. Dort bleibt es
//   beim Zeigen.
//
//   Nur, wenn Bewegung erwuenscht ist. Wer `prefers-reduced-motion` gesetzt
//   hat, bekommt ein stehendes Bild.
//
// Die Kosten sind eine `transform`, also Sache der Grafikkarte: kein Layout,
// kein Neuzeichnen. Framer haengt alle Kacheln an denselben Bildlauf-Zuhoerer,
// es kommt also nicht einer je Kachel dazu.
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
 * Gibt die Skalierung fuer das Medium einer Kachel zurueck -- oder nichts,
 * wenn hier nicht herangefahren werden soll. Der Rueckgabewert geht direkt in
 * `style` eines `motion`-Elements.
 */
export function useScrollZoom(from = 1, to = 1.08) {
  const ref = useRef<HTMLDivElement>(null);
  const active = usePhoneMotion();

  // "start end" bis "end start": von dem Moment, in dem die Oberkante der
  // Kachel die Unterkante des Schirms erreicht, bis ihre Unterkante oben
  // hinauslaeuft. Das ist der ganze Weg, den sie sichtbar zuruecklegt.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);

  return {
    ref: ref as RefObject<HTMLDivElement>,
    /** In `style` geben; ausserhalb des Telefons steht hier nichts. */
    zoom: (active ? { scale } : undefined) as { scale: MotionValue<number> } | undefined
  };
}
