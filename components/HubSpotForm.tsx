
import React, { useEffect, useId, useRef, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    hbspt: any;
  }
}

export const HubSpotForm: React.FC = () => {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const loadHubSpotScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.hbspt) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js-eu1.hsforms.net/forms/v2.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => {
        if (window.hbspt) resolve();
        else reject(new Error('hbspt not found'));
      };
      script.onerror = () => reject(new Error('Script blocked'));
      document.head.appendChild(script);
    });
  };

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
        initializedRef.current = true;
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
            safeSetStatus('submitted');
            if (isMounted) {
              window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' });
            }
          },
        });
      } catch (err) {
        console.warn('HubSpot could not be initialized (likely AdBlock)');
        safeSetStatus('error');
      }
    };

    const startLoading = async () => {
      safeSetStatus('loading');
      timeout = setTimeout(() => safeSetStatus('error'), 10000);
      try {
        await loadHubSpotScript();
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

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      isMounted = false;
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const showSpinner = status === 'idle' || status === 'loading';
  const showSuccess = status === 'submitted';
  const showForm = status === 'ready' || status === 'error';

  return (
    <div ref={wrapperRef} className="relative min-h-[400px] w-full">
      {showSpinner && (
        <div className="absolute inset-0 flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
          <p className="text-white/60 font-black uppercase tracking-widest text-xs">Lade Formular...</p>
        </div>
      )}

      {showSuccess && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-4xl font-black mb-4 text-white tracking-tighter">Vielen Dank!</h3>
          <p className="text-white/80 font-bold text-xl">Wir melden uns in Kürze.</p>
        </div>
      )}

      <div className={`hs-form-wrapper ${showForm ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <div id={targetId} ref={containerRef} className="w-full" />
      </div>
    </div>
  );
};
