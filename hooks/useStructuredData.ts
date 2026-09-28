import { useEffect } from 'react';
import { faqSchema, serviceSchema } from '../components/pageMeta';

/**
 * Service- und FAQ-Daten einer Money Page als JSON-LD im Kopf.
 *
 * Beim direkten Aufruf liegen die Bloecke schon im vorgerenderten HTML
 * (scripts/prerender.mjs, gleiche ids); dann werden sie uebernommen statt
 * verdoppelt. Beim Verlassen der Seite verschwinden sie wieder.
 */
export function useStructuredData(path: string) {
  useEffect(() => {
    const blocks: [string, object | null][] = [
      ['ld-service', serviceSchema(path)],
      ['ld-faq', faqSchema(path)]
    ];
    const els = blocks
      .filter(([, data]) => data)
      .map(([id, data]) => {
        let el = document.getElementById(id) as HTMLScriptElement | null;
        if (!el) {
          el = document.createElement('script');
          el.id = id;
          el.type = 'application/ld+json';
          el.textContent = JSON.stringify(data);
          document.head.appendChild(el);
        }
        return el;
      });
    return () => els.forEach((el) => el.remove());
  }, [path]);
}
