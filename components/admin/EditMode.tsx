import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, Download, Eye, Image as ImageIcon, LogOut, Move, RotateCcw, Share2, Type, X } from 'lucide-react';
import { clearEditSession } from './editSession';

// ---------------------------------------------------------------------------
// Vorschau-Modus
// ---------------------------------------------------------------------------
// Nur nach Anmeldung unter /admin sichtbar. Bearbeitet die angezeigte Seite
// direkt im Browser; es wird nichts hochgeladen und nichts gespeichert.
//
//   Texte       -- Text anklicken und tippen
//   Bilder      -- Bild oder Video-Kachel anklicken, Datei vom Geraet waehlen
//   Verschieben -- Bild mit gedrueckter Maus / dem Finger verschieben
//                  (Bildausschnitt, object-position)
//   Snapshot    -- die ganze Seite als Bild speichern oder teilen
//
// Ausgenommen ist alles in [data-admin-lock] (der Kopf der Startseite).
// Ersetzte Bilder und Ausschnitte gelten fuer dieselbe Datei ueberall und
// bleiben beim Seitenwechsel erhalten, bis neu geladen wird.
// ---------------------------------------------------------------------------

type Mode = 'view' | 'text' | 'image' | 'move';
type Media = HTMLImageElement | HTMLVideoElement;

const TOOLBAR_ID = 'gg-edit-toolbar';
const OVERLAY_ID = 'gg-edit-overlay';

const STYLE = `
body.gg-edit-text main [contenteditable="true"] :is(h1,h2,h3,h4,p,li,span,a,button):hover {
  outline: 2px dashed #0e958e; outline-offset: 3px; cursor: text;
}
body.gg-edit-text main [contenteditable="true"] { outline: none; }
body.gg-edit-image :is(img,video) { cursor: pointer; }
body.gg-edit-move :is(img,video) { cursor: grab; touch-action: none; }
body.gg-edit-move.gg-dragging, body.gg-edit-move.gg-dragging * { cursor: grabbing !important; user-select: none; }
.gg-media-target { outline: 4px solid #2dd4bf !important; outline-offset: -4px; }
`;

const isOurs = (el: Element | null) => Boolean(el?.closest(`#${TOOLBAR_ID}, #${OVERLAY_ID}`));

const isMedia = (el: Element): el is Media => el instanceof HTMLImageElement || el instanceof HTMLVideoElement;

const covers = (el: Element, x: number, y: number) => {
  const r = el.getBoundingClientRect();
  if (r.width < 8 || r.height < 8 || x < r.left || x > r.right || y < r.top || y > r.bottom) return false;
  const cs = getComputedStyle(el);
  return cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0.05;
};

/**
 * Das Bild oder Video unter einem Punkt -- auch unter Verlaeufen und Text.
 *
 * Videos und manche Bilder tragen pointer-events: none und tauchen in
 * elementsFromPoint gar nicht auf. Deshalb wird zusaetzlich in den
 * getroffenen Containern gesucht, vom obersten nach aussen.
 */
const mediaAt = (x: number, y: number): Media | null => {
  const stack = document.elementsFromPoint(x, y);
  if (stack.length && isOurs(stack[0])) return null;
  let found: Media | null = null;
  for (const el of stack) {
    if (isMedia(el)) {
      found = el;
      break;
    }
    const inner = Array.from(el.querySelectorAll('img,video')).filter((m) => covers(m, x, y));
    if (inner.length) {
      found = inner[inner.length - 1] as Media;
      break;
    }
  }
  return found && !found.closest('[data-admin-lock]') ? found : null;
};

/** Schluessel, unter dem Ersatz und Ausschnitt gemerkt werden. */
const keyOf = (m: Media) => {
  if (m instanceof HTMLImageElement) return m.dataset.ggOrig || m.src;
  if (!m.dataset.ggKey) m.dataset.ggKey = `video-${Math.random().toString(36).slice(2)}`;
  return m.dataset.ggKey;
};

const parsePos = (value: string): [number, number] => {
  const parts = value.split(' ').map((p) => parseFloat(p));
  return [Number.isFinite(parts[0]) ? parts[0] : 50, Number.isFinite(parts[1]) ? parts[1] : 50];
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

export const EditMode: React.FC = () => {
  const [mode, setMode] = useState<Mode>('view');
  const [count, setCount] = useState(0);
  const [snapshot, setSnapshot] = useState<{ url: string; blob: Blob; name: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const replacements = useRef(new Map<string, string>());
  const positions = useRef(new Map<string, string>());
  const target = useRef<Media | null>(null);
  const hover = useRef<Media | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Ersatz und Ausschnitte auf alles anwenden, auch auf spaeter erscheinende Bilder.
  const applyAll = useCallback(() => {
    if (!replacements.current.size && !positions.current.size) return;
    document.querySelectorAll('img').forEach((img) => {
      const key = keyOf(img);
      const next = replacements.current.get(key);
      if (next && img.src !== next) {
        img.dataset.ggOrig = key;
        img.removeAttribute('srcset');
        img.src = next;
      }
      const pos = positions.current.get(key);
      if (pos && img.style.objectPosition !== pos) img.style.objectPosition = pos;
    });
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => applyAll());
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'style'] });
    return () => observer.disconnect();
  }, [applyAll]);

  // Modus umsetzen
  useEffect(() => {
    const body = document.body;
    body.classList.toggle('gg-edit-text', mode === 'text');
    body.classList.toggle('gg-edit-image', mode === 'image');
    body.classList.toggle('gg-edit-move', mode === 'move');
    const main = document.querySelector('main');
    if (main) {
      if (mode === 'text') main.setAttribute('contenteditable', 'true');
      else main.removeAttribute('contenteditable');
      main.setAttribute('spellcheck', 'false');
    }
    const clearHover = () => {
      hover.current?.classList.remove('gg-media-target');
      hover.current = null;
    };
    clearHover();
    if (mode === 'view') return;

    let drag: { media: Media; key: string; x: number; y: number; start: [number, number]; moved: boolean } | null = null;
    let suppressClick = false;

    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      // Eigene Bedienelemente und der ausgeloeste Klick auf das Dateifeld laufen durch.
      if (!e.isTrusted || t === fileInput.current || isOurs(t)) return;
      if (mode === 'image') {
        const m = mediaAt(e.clientX, e.clientY);
        if (!m) {
          if (t?.closest('a,button')) {
            e.preventDefault();
            e.stopPropagation();
          }
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        target.current = m;
        fileInput.current?.click();
      } else if (mode === 'move') {
        // Im Verschiebe-Modus loest kein Klick etwas aus.
        if (suppressClick || t?.closest('a,button') || mediaAt(e.clientX, e.clientY)) {
          e.preventDefault();
          e.stopPropagation();
        }
        suppressClick = false;
      } else if (t?.closest('a,button')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onDown = (e: PointerEvent) => {
      if (mode !== 'move' || isOurs(e.target as Element)) return;
      const m = mediaAt(e.clientX, e.clientY);
      if (!m) return;
      e.preventDefault();
      const key = keyOf(m);
      drag = { media: m, key, x: e.clientX, y: e.clientY, start: parsePos(getComputedStyle(m).objectPosition), moved: false };
      document.body.classList.add('gg-dragging');
    };

    const onMove = (e: PointerEvent) => {
      if (drag) {
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) < 4) return;
        drag.moved = true;
        const r = drag.media.getBoundingClientRect();
        // Ziehen nach rechts zeigt mehr vom linken Bildteil -- wie ein Foto unter einem Rahmen.
        const pos = `${clamp(drag.start[0] - (dx / r.width) * 100).toFixed(1)}% ${clamp(drag.start[1] - (dy / r.height) * 100).toFixed(1)}%`;
        drag.media.style.objectPosition = pos;
        positions.current.set(drag.key, pos);
        applyAll();
        return;
      }
      if (mode !== 'image' && mode !== 'move') return;
      const m = mediaAt(e.clientX, e.clientY);
      if (m === hover.current) return;
      hover.current?.classList.remove('gg-media-target');
      m?.classList.add('gg-media-target');
      hover.current = m;
    };

    const onUp = () => {
      if (!drag) return;
      suppressClick = drag.moved;
      drag = null;
      document.body.classList.remove('gg-dragging');
    };

    window.addEventListener('click', onClick, true);
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      document.body.classList.remove('gg-dragging');
      clearHover();
    };
  }, [mode, applyAll]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const m = target.current;
    e.target.value = '';
    if (!file || !m) return;
    const url = URL.createObjectURL(file);
    const key = keyOf(m);
    replacements.current.set(key, url);
    if (m instanceof HTMLVideoElement) {
      // Video-Kachel: Video anhalten, das Foto erscheint als Standbild.
      m.pause();
      m.removeAttribute('src');
      m.querySelectorAll('source').forEach((s) => s.remove());
      m.load();
      m.poster = url;
    }
    setCount(replacements.current.size);
    applyAll();
  };

  // -------------------------------------------------------------------------
  // Snapshot der ganzen Seite
  // -------------------------------------------------------------------------
  const takeSnapshot = async () => {
    setBusy(true);
    const prevMode = mode;
    setMode('view');
    const startY = window.scrollY;
    try {
      // Alles laden und alle Einblendungen ausloesen: einmal durch die Seite scrollen.
      document.querySelectorAll('img').forEach((img) => {
        img.loading = 'eager';
      });
      const step = Math.max(300, window.innerHeight * 0.8);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
        await new Promise((r) => setTimeout(r, 140));
      }
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      await Promise.all(
        Array.from(document.images).map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined)))
      );
      await new Promise((r) => setTimeout(r, 1300));

      const { domToBlob } = await import('modern-screenshot');
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.scrollHeight;
      // Unter der Flaechengrenze mobiler Browser bleiben (~16 Mio. Pixel).
      const scale = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(15_000_000 / (width * height)));
      const blob = await domToBlob(document.body, {
        width,
        height,
        scale,
        type: 'image/jpeg',
        quality: 0.9,
        backgroundColor: '#badeda',
        style: { overflow: 'visible' },
        filter: (node) => {
          if (!(node instanceof Element)) return true;
          return !(node.id === TOOLBAR_ID || node.id === OVERLAY_ID || node.getAttribute('aria-labelledby') === 'cookie-title');
        }
      });
      if (!blob) throw new Error('leer');
      const page = window.location.pathname.replace(/\//g, '-').replace(/^-|-$/g, '') || 'startseite';
      const date = new Date().toISOString().slice(0, 10);
      setSnapshot({ url: URL.createObjectURL(blob), blob, name: `gg-vorschau-${page}-${date}.jpg` });
    } catch {
      alert('Der Snapshot konnte nicht erstellt werden. Bitte erneut versuchen.');
    } finally {
      window.scrollTo({ top: startY, behavior: 'instant' as ScrollBehavior });
      setMode(prevMode);
      setBusy(false);
    }
  };

  const download = () => {
    if (!snapshot) return;
    const a = document.createElement('a');
    a.href = snapshot.url;
    a.download = snapshot.name;
    a.click();
  };

  const share = async () => {
    if (!snapshot) return;
    const file = new File([snapshot.blob], snapshot.name, { type: 'image/jpeg' });
    try {
      await navigator.share({ files: [file], title: 'Website-Vorschau' });
    } catch {
      /* abgebrochen */
    }
  };

  const canShare = typeof navigator !== 'undefined' && 'canShare' in navigator && snapshot
    ? navigator.canShare({ files: [new File([snapshot.blob], snapshot.name, { type: 'image/jpeg' })] })
    : false;

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

  const pill = 'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black transition-colors';
  const modeBtn = (m: Mode, label: string, Icon: React.ElementType) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      aria-pressed={mode === m}
      className={`${pill} ${mode === m ? 'bg-[#2dd4bf] text-[#0b0f2a]' : 'text-white/80 hover:bg-white/10'}`}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );

  const hint = {
    view: 'Vorschau-Modus aktiv.',
    text: 'Text anklicken und direkt ändern.',
    image: 'Bild oder Video-Kachel anklicken und eine Datei auswählen.',
    move: 'Bild gedrückt halten und verschieben, um den Ausschnitt anzupassen.'
  }[mode];

  return (
    <>
      <style>{STYLE}</style>
      <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={onFile} />

      <div
        id={TOOLBAR_ID}
        className="fixed z-[10000] bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-3xl rounded-3xl bg-[#0b0f2a]/95 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] p-2.5 text-white"
      >
        <div className="flex flex-wrap items-center justify-between gap-1">
          <div className="flex flex-wrap items-center gap-0.5">
            {modeBtn('view', 'Ansehen', Eye)}
            {modeBtn('text', 'Texte', Type)}
            {modeBtn('image', 'Bilder', ImageIcon)}
            {modeBtn('move', 'Verschieben', Move)}
          </div>
          <div className="flex flex-wrap items-center gap-0.5">
            <button type="button" onClick={takeSnapshot} disabled={busy} className={`${pill} text-white/80 hover:bg-white/10 disabled:opacity-50`}>
              <Camera className="w-4 h-4" /> Snapshot
            </button>
            <button type="button" onClick={reset} className={`${pill} text-white/80 hover:bg-white/10`}>
              <RotateCcw className="w-4 h-4" /> Zurücksetzen
            </button>
            <button type="button" onClick={logout} className={`${pill} text-white/80 hover:bg-white/10`}>
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>
        </div>
        <p className="px-2 pt-2 text-[11px] text-white/55 font-medium">
          {hint} Nur Vorschau – es wird nichts gespeichert.
          {count > 0 && ` ${count} Bild${count > 1 ? 'er' : ''} ersetzt.`}
        </p>
      </div>

      {(busy || snapshot) && (
        <div id={OVERLAY_ID} className="fixed inset-0 z-[10001] bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center p-4">
          {busy ? (
            <p className="text-white font-black tracking-tight text-lg">Snapshot wird erstellt …</p>
          ) : (
            snapshot && (
              <div className="w-full max-w-3xl max-h-full flex flex-col rounded-3xl bg-[#0b0f2a] border border-white/10 p-4 text-white">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-black text-sm">Snapshot der Seite</p>
                  <button
                    type="button"
                    aria-label="Schließen"
                    onClick={() => {
                      URL.revokeObjectURL(snapshot.url);
                      setSnapshot(null);
                    }}
                    className="p-2 rounded-full hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl bg-white/5">
                  <img src={snapshot.url} alt="Snapshot der Seite" className="w-full h-auto block" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2 justify-end">
                  {canShare && (
                    <button type="button" onClick={share} className={`${pill} bg-white/10 hover:bg-white/20 px-5 py-3`}>
                      <Share2 className="w-4 h-4" /> Teilen
                    </button>
                  )}
                  <button type="button" onClick={download} className={`${pill} bg-[#2dd4bf] text-[#0b0f2a] px-5 py-3`}>
                    <Download className="w-4 h-4" /> Als Bild speichern
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};
