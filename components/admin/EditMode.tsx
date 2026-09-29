import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Eye, Image as ImageIcon, LogOut, RotateCcw, Type } from 'lucide-react';
import { clearEditSession } from './editSession';

// ---------------------------------------------------------------------------
// Vorschau-Modus
// ---------------------------------------------------------------------------
// Nur nach Anmeldung unter /admin sichtbar. Bearbeitet die angezeigte Seite
// direkt im Browser: Texte werden editierbar, Bilder lassen sich per Klick
// durch eine Datei vom eigenen Geraet ersetzen. Es wird nichts hochgeladen
// und nichts gespeichert -- neu laden oder "Zuruecksetzen" stellt alles wieder
// her. Andere Besucher sehen davon nie etwas.
//
// Ersetzte Bilder gelten fuer dieselbe Datei ueberall auf der Seite (etwa
// Kachel und grosses Bild) und bleiben beim Wechsel auf eine andere Seite
// erhalten, bis neu geladen wird. Textaenderungen gelten fuer die gerade
// angezeigte Seite.
// ---------------------------------------------------------------------------

type Mode = 'view' | 'text' | 'image';

const STYLE = `
body.gg-edit-text main [contenteditable="true"] :is(h1,h2,h3,h4,p,li,span,a,button):hover {
  outline: 2px dashed #0e958e; outline-offset: 3px; cursor: text;
}
body.gg-edit-text main [contenteditable="true"] { outline: none; }
body.gg-edit-image img { cursor: pointer; }
img.gg-img-target { outline: 4px solid #2dd4bf !important; outline-offset: -4px; }
`;

const TOOLBAR_ID = 'gg-edit-toolbar';

/** Das oberste Bild unter einem Punkt -- auch wenn Verlaeufe oder Text darueber liegen. */
const imageAt = (x: number, y: number): HTMLImageElement | null => {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest(`#${TOOLBAR_ID}`)) return null;
    if (el instanceof HTMLImageElement) return el;
  }
  return null;
};

const originalSrc = (img: HTMLImageElement) => img.dataset.ggOrig || img.src;

export const EditMode: React.FC = () => {
  const [mode, setMode] = useState<Mode>('view');
  const [count, setCount] = useState(0);
  const replacements = useRef(new Map<string, string>());
  const target = useRef<HTMLImageElement | null>(null);
  const hover = useRef<HTMLImageElement | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Ersetzte Bilder ueberall anwenden -- auch auf Bilder, die erst spaeter
  // erscheinen (Seitenwechsel, Karussell).
  const applyAll = useCallback(() => {
    if (!replacements.current.size) return;
    document.querySelectorAll('img').forEach((img) => {
      const orig = originalSrc(img);
      const next = replacements.current.get(orig);
      if (next && img.src !== next) {
        img.dataset.ggOrig = orig;
        img.removeAttribute('srcset');
        img.src = next;
      }
    });
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => applyAll());
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
    return () => observer.disconnect();
  }, [applyAll]);

  // Modus umsetzen
  useEffect(() => {
    const body = document.body;
    body.classList.toggle('gg-edit-text', mode === 'text');
    body.classList.toggle('gg-edit-image', mode === 'image');
    const main = document.querySelector('main');
    if (main) {
      if (mode === 'text') main.setAttribute('contenteditable', 'true');
      else main.removeAttribute('contenteditable');
      main.setAttribute('spellcheck', 'false');
    }
    if (mode !== 'image' && hover.current) {
      hover.current.classList.remove('gg-img-target');
      hover.current = null;
    }

    if (mode === 'view') return;

    // Klicks abfangen, bevor die Seite sie bekommt: im Textmodus navigieren
    // Links und Knoepfe nicht, im Bildmodus oeffnet ein Klick die Dateiauswahl.
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      // Eigene Bedienelemente und der ausgeloeste Klick auf das Dateifeld
      // (kein echter Nutzerklick) laufen ungehindert durch.
      if (!e.isTrusted || t === fileInput.current || t?.closest(`#${TOOLBAR_ID}`)) return;
      if (mode === 'image') {
        const img = imageAt(e.clientX, e.clientY);
        if (!img) return;
        e.preventDefault();
        e.stopPropagation();
        target.current = img;
        fileInput.current?.click();
      } else if (t?.closest('a,button')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onMove = (e: PointerEvent) => {
      if (mode !== 'image') return;
      const img = imageAt(e.clientX, e.clientY);
      if (img === hover.current) return;
      hover.current?.classList.remove('gg-img-target');
      img?.classList.add('gg-img-target');
      hover.current = img;
    };

    window.addEventListener('click', onClick, true);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('pointermove', onMove);
    };
  }, [mode]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const img = target.current;
    e.target.value = '';
    if (!file || !img) return;
    const url = URL.createObjectURL(file);
    replacements.current.set(originalSrc(img), url);
    setCount(replacements.current.size);
    applyAll();
  };

  const reset = () => window.location.reload();

  const logout = async () => {
    try {
      await fetch('/api/admin-logout', { method: 'POST', credentials: 'same-origin' });
    } catch {
      /* Cookie laeuft ohnehin ab */
    }
    clearEditSession();
    window.location.href = '/';
  };

  const modeBtn = (m: Mode, label: string, Icon: React.ElementType) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      aria-pressed={mode === m}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-black transition-colors ${
        mode === m ? 'bg-[#2dd4bf] text-[#0b0f2a]' : 'text-white/80 hover:bg-white/10'
      }`}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );

  return (
    <>
      <style>{STYLE}</style>
      <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={onFile} />
      <div
        id={TOOLBAR_ID}
        className="fixed z-[10000] bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-2xl rounded-3xl bg-[#0b0f2a]/95 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] p-2.5 text-white"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {modeBtn('view', 'Ansehen', Eye)}
            {modeBtn('text', 'Texte', Type)}
            {modeBtn('image', 'Bilder', ImageIcon)}
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black text-white/80 hover:bg-white/10">
              <RotateCcw className="w-4 h-4" /> Zurücksetzen
            </button>
            <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black text-white/80 hover:bg-white/10">
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>
        </div>
        <p className="px-2 pt-2 text-[11px] text-white/55 font-medium">
          {mode === 'text' && 'Texte anklicken und direkt ändern. '}
          {mode === 'image' && 'Bild anklicken und eine Datei auswählen. '}
          {mode === 'view' && 'Vorschau-Modus aktiv. '}
          Nur Vorschau – es wird nichts gespeichert.{count > 0 && ` ${count} Bild${count > 1 ? 'er' : ''} ersetzt.`}
        </p>
      </div>
    </>
  );
};
