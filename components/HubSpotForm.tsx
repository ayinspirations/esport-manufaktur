
import React, { useEffect, useId, useRef, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    hbspt: any;
  }
}

// ---------------------------------------------------------------------------
// Das Formularskript: einmal je Seite, mit Wiederholung
// ---------------------------------------------------------------------------
// Vorher lud jede Instanz fuer sich, und ein einziger Fehlversuch war
// endgueltig: kein zweiter Anlauf, und im Fehlerfall stand an der Stelle des
// Formulars ein leerer Kasten. Ein Handy, das gerade die Funkzelle wechselt,
// reicht dafuer -- und danach half nur noch, die Seite neu zu laden.
//
// Jetzt gibt es genau ein Versprechen fuer die ganze Seite, das sich beide
// Einbauorte teilen, und drei Anlaeufe mit wachsender Pause. Schlaegt auch
// der dritte fehl, faellt das Versprechen zurueck, damit ein spaeterer Klick
// es erneut versuchen kann statt den alten Fehler zu erben.
// ---------------------------------------------------------------------------

const HUBSPOT_SRC = 'https://js-eu1.hsforms.net/forms/v2.js';

let scriptPromise: Promise<void> | null = null;

const loadScriptOnce = (): Promise<void> => {
  if (window.hbspt) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  const attempt = (left: number, wait: number): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      // Ein bereits haengendes Element wiederverwenden -- sonst stapeln sich
      // bei mehreren Versuchen die Tags im Kopf des Dokuments.
      const existing = document.querySelector<HTMLScriptElement>(`script[data-hs-forms]`);
      const el = existing ?? document.createElement('script');
      if (!existing) {
        el.src = `${HUBSPOT_SRC}?r=${left}`;
        el.async = true;
        el.setAttribute('data-hs-forms', '');
      }
      const done = () => (window.hbspt ? resolve() : reject(new Error('hbspt fehlt')));
      el.addEventListener('load', done, { once: true });
      el.addEventListener('error', () => reject(new Error('Skript blockiert')), { once: true });
      if (!existing) document.head.appendChild(el);
    }).catch((err) => {
      document.querySelector('script[data-hs-forms]')?.remove();
      if (left <= 0) throw err;
      return new Promise<void>((r) => setTimeout(r, wait)).then(() => attempt(left - 1, wait * 2));
    });

  scriptPromise = attempt(2, 800).catch((err) => {
    // Zuruecksetzen, damit der naechste Klick wieder von vorn beginnt.
    scriptPromise = null;
    throw err;
  });

  return scriptPromise;
};

interface HubSpotFormProps {
  /**
   * Sofort laden statt erst beim Hereinscrollen. Das Fenster hinter einem
   * Kontakt-Knopf ist genau der Fall: dort wartet jemand schon.
   */
  eager?: boolean;
}

export const HubSpotForm: React.FC<HubSpotFormProps> = ({ eager = false }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error' | 'submitted'>('idle');
  // HubSpot injects the form by CSS selector, so the container needs an id that
  // is unique to this instance rather than the fixed `hs_form_target` it used
  // to carry. There are two mount points now -- the section at the foot of the
  // homepage and the popup the subpages open -- and the popup stays mounted
  // once it has been opened. Navigate from a subpage back to the homepage after
  // opening it and both were live at once under the same id, at which point
  // HubSpot renders into whichever the document happens to hold first.
  const targetId = `hs-form-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const initializedRef = useRef(false);
  // Zaehlt hoch, wenn jemand "Erneut versuchen" drueckt -- das startet den
  // Effekt unten neu.
  const [retry, setRetry] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const injectCustomStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      .hs-form input:focus, 
      .hs-form textarea:focus,
      .hs-form select:focus,
      .hs-form input:not(:placeholder-shown),
      .hs-form textarea:not(:placeholder-shown),
      .hs-form select:not(:placeholder-shown),
      .hs-form input:-webkit-autofill,
      .hs-form input:-webkit-autofill:hover, 
      .hs-form input:-webkit-autofill:focus {
        background-color: white !important;
        color: #0f172a !important;
        -webkit-text-fill-color: #0f172a !important;
        box-shadow: 0 0 0px 1000px white inset !important;
      }
      .hs-form input[type="checkbox"] {
        appearance: none !important;
        -webkit-appearance: none !important;
        width: 20px !important;
        height: 20px !important;
        border: 2px solid #ffffff !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        position: relative !important;
        background: white !important;
      }
      .hs-form input[type="checkbox"]:checked {
        background-color: white !important;
      }
      .hs-form input[type="checkbox"]:checked::after {
        content: '' !important;
        position: absolute !important;
        left: 6px !important;
        top: 2px !important;
        width: 5px !important;
        height: 10px !important;
        border: solid #10b981 !important;
        border-width: 0 2px 2px 0 !important;
        transform: rotate(45deg) !important;
      }
      .hs-error-msgs {
        display: block !important;
      }
      .hs-form input, 
      .hs-form textarea,
      .hs-form select {
        transition: background-color 0.2s ease-in-out !important;
      }
    `;
    const iframe = containerRef.current?.querySelector('iframe');
    if (iframe) {
      try {
        iframe.contentDocument?.head.appendChild(style);
      } catch (e) {
        document.head.appendChild(style);
      }
    } else {
      document.head.appendChild(style);
    }
  };

  useEffect(() => {
    let isMounted = true;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const safeSetStatus = (s: 'idle' | 'loading' | 'ready' | 'error' | 'submitted') => {
      if (isMounted) setStatus(s);
    };

    const createFormSafe = () => {
      if (!window.hbspt || initializedRef.current) return;
      try {
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '144588019',
          formId: '1100960a-23d3-4104-9ba4-03dcd952f909',
          target: `#${targetId}`,
          css: '',
          inlineMessage: 'Vielen Dank!',
          onFormReady: () => {
            safeSetStatus('ready');
            if (isMounted) injectCustomStyles();
          },
          onFormSubmitted: () => {
            // Nicht scrollen, sondern die Hoehe halten.
            //
            // Hier stand ein Sprung zu `#contact`, berechnet aus dessen
            // `offsetTop`. Das misst aber den Abstand zum naechsten
            // positionierten Vorfahren, nicht zum Seitenanfang -- bei einem
            // Element, das tief in verschachtelten Kaesten sitzt, kommt dabei
            // eine kleine Zahl heraus. Die Seite sprang also nach oben, statt
            // beim Formular zu bleiben.
            //
            // Auch ohne den Sprung waere die Seite gerutscht: die Danksagung
            // ist kuerzer als das Formular, das Dokument schrumpft, und der
            // Browser zieht die Ansicht mit. Also behaelt der Rahmen die Hoehe,
            // die das Formular hatte -- dann bleibt alles darunter, wo es war,
            // und die Danksagung steht genau dort, wo eben noch die Felder
            // standen.
            if (wrapperRef.current) {
              wrapperRef.current.style.minHeight = `${wrapperRef.current.offsetHeight}px`;
            }
            safeSetStatus('submitted');
          },
        });
        // Erst wenn `create` durch ist, gilt dieser Einbauort als besetzt.
        // Stand der Merker vorher, blockierte ein misslungener Versuch jeden
        // weiteren.
        initializedRef.current = true;
      } catch (err) {
        console.warn('HubSpot-Formular konnte nicht erzeugt werden:', err);
        initializedRef.current = false;
        safeSetStatus('error');
      }
    };

    const startLoading = async () => {
      safeSetStatus('loading');
      timeout = setTimeout(() => safeSetStatus('error'), 10000);
      try {
        await loadScriptOnce();
        if (isMounted) setTimeout(createFormSafe, 100);
      } catch (err) {
        safeSetStatus('error');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !initializedRef.current) {
          observer.disconnect();
          startLoading();
        }
      },
      { threshold: 0.1 }
    );

    // Im Fenster hinter dem Kontakt-Knopf wird nicht auf das Hereinscrollen
    // gewartet -- dort steht der Besucher schon davor.
    if (eager) startLoading();
    else if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      isMounted = false;
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [eager, retry]);

  const showSpinner = status === 'idle' || status === 'loading';
  const showSuccess = status === 'submitted';
  const showError = status === 'error';
  const showForm = status === 'ready';

  return (
    <div ref={wrapperRef} className="relative min-h-[400px] w-full">
      {showSpinner && (
        <div className="absolute inset-0 flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
          <p className="text-white/60 font-black uppercase tracking-widest text-xs">Lade Formular...</p>
        </div>
      )}

      {showSuccess && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-4xl font-black mb-4 text-white tracking-tighter">Vielen Dank!</h3>
          <p className="text-white/80 font-bold text-xl">Wir melden uns in Kürze.</p>
        </div>
      )}

      {/* Der Fehlerfall stand vorher nirgends: bei `error` wurde derselbe
          leere Kasten gezeigt wie beim Erfolg, nur ohne Formular darin. Wer
          das sah, hielt die Seite fuer kaputt -- zu Recht. Jetzt steht da,
          was los ist, ein Knopf fuer den zweiten Anlauf und ein Weg, der
          ohne HubSpot funktioniert. */}
      {showError && (
        <div className="flex flex-col items-start gap-5 py-6">
          <div>
            <h3 className="text-white font-black text-xl tracking-tight mb-2">Das Formular kam nicht durch.</h3>
            <p className="text-white/70 font-medium leading-relaxed max-w-md">
              Meist liegt es an der Verbindung oder an einem Inhaltsblocker im Browser. Du erreichst uns auch direkt.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { initializedRef.current = false; setRetry((n) => n + 1); }}
              className="px-6 py-3 rounded-full bg-[#0e958e] hover:bg-[#22bdb5] text-white text-xs font-black uppercase tracking-[0.2em] transition-colors"
            >
              Erneut versuchen
            </button>
            <a
              href="mailto:info@esport-manufaktur.com"
              className="px-6 py-3 rounded-full border border-white/25 hover:border-white/50 text-white text-xs font-black uppercase tracking-[0.2em] transition-colors"
            >
              E-Mail schreiben
            </a>
          </div>
        </div>
      )}

      <div className={`hs-form-wrapper ${showForm ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <div id={targetId} ref={containerRef} className="w-full" />
      </div>
    </div>
  );
};
