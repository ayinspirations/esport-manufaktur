import pageMeta from './pageMeta.json';
import { SITE_URL, absoluteUrl } from './site';

// ---------------------------------------------------------------------------
// Kopfdaten der eigenstaendigen Seiten, an einer Stelle
// ---------------------------------------------------------------------------
// Dieselbe JSON-Datei liest scripts/prerender.mjs beim Build und schreibt
// daraus fuer jede Adresse eine eigene HTML-Datei mit Titel, Beschreibung und
// Vorschaubild. Crawler ohne JavaScript (LinkedIn, WhatsApp, Slack ...) sehen
// sonst nur den Kopf der Startseite.
// ---------------------------------------------------------------------------

export interface PageMeta {
  title: string;
  description: string;
  breadcrumb: string;
  ogImage?: string;
  service?: { name: string; serviceType: string; description: string };
}

export const PAGE_META = pageMeta as Record<string, PageMeta>;

/** Die Angaben fuer useDocumentHead. */
export const headFor = (path: string) => {
  const meta = PAGE_META[path];
  return {
    title: meta.title,
    description: meta.description,
    canonicalPath: path,
    ogImage: meta.ogImage,
    breadcrumbs: [{ name: meta.breadcrumb, path }]
  };
};

/** Schema.org-Service fuer eine Leistungsseite, sonst null. */
export const serviceSchema = (path: string) => {
  const s = PAGE_META[path]?.service;
  if (!s) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: absoluteUrl(path),
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    provider: { '@type': 'Organization', name: 'GG Manufaktur', url: SITE_URL }
  };
};
