import { useEffect } from 'react';

// ---------------------------------------------------------------------------
// Eine Sperre statt fünf
// ---------------------------------------------------------------------------
// `document.body.style.overflow` ist eine einzige Eigenschaft, und fünf
// Komponenten haben unabhängig voneinander daran geschrieben: beide Popups,
// der Cookie-Hinweis und -- ohne jeden Grund -- jede der elf Case-Seiten.
//
// Wer zuletzt aufräumt, gewinnt. Schließt ein Popup, während der Cookie-
// Hinweis noch steht, setzt es die Sperre auf `unset` und der Hinweis lässt
// sich hinterscrollen. Umgekehrt schlimmer: räumt eine Seite beim Verlassen
// nicht auf, während eine andere gerade gesperrt hat, bleibt `hidden` stehen.
// Der Rumpf ist dann auf einen Bildschirm beschnitten, und wer mit dem
// Zurück-Knopf an eine Scrollposition weiter unten zurückkehrt, sieht die
// dunkle Fläche unter dem Inhalt -- eine Seite, die aussieht, als wäre nichts
// geladen. Genau dieser Fehler.
//
// Also zählt die Sperre. Sie greift, sobald der Erste sie anfordert, und löst
// sich erst, wenn der Letzte sie freigibt. Wer währenddessen aufräumt, kann
// niemandem mehr die Sperre wegnehmen.
// ---------------------------------------------------------------------------

let holders = 0;
/** Der Wert, den die Seite ohne Sperre hatte -- meist der leere String. */
let released = '';

const acquire = () => {
  if (holders === 0) {
    released = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  holders += 1;
};

const release = () => {
  holders = Math.max(0, holders - 1);
  if (holders === 0) document.body.style.overflow = released;
};

/** Hält den Seitenlauf an, solange `active` gilt. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    acquire();
    return release;
  }, [active]);
}
