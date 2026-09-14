import { useEffect } from 'react';
import { SITE_URL, absoluteUrl } from '../components/site';

interface DocumentHeadConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalPath?: string;
  /**
   * Der Wert fuer <meta name="robots">, etwa 'noindex'.
   *
   * Ohne Angabe bleibt die Seite indexierbar -- das ist der Normalfall und
   * braucht keine Angabe, weil eine fehlende Angabe dasselbe bedeutet.
   * Gesetzt wird das nur dort, wo eine Adresse zwar ausgeliefert wird, aber
   * nichts in einer Trefferliste zu suchen hat: die Fehlerseite.
   */
  robots?: string;
  /**
   * Der Weg von der Startseite zu dieser Seite, ohne die Startseite selbst.
   *
   * Google zeigt daraus in der Trefferliste den Pfad statt der nackten
   * Adresse: "GG Manufaktur > Services > Events & Erlebniswelten" anstelle von
   * "gg-manufaktur.de/services/events-erlebniswelten". Das kostet nichts und
   * macht aus einem Treffer eine Angabe darueber, wo man landet.
   */
  breadcrumbs?: { name: string; path: string }[];
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

// This is a client-only SPA (no SSR), so there's no per-route document per
// request -- every "page" is the same index.html with its default meta tags.
// This hook is the pragmatic way to still give each route its own
// title/description/OG tags for any crawler that executes JS: it patches
// document.head on mount and puts the SITE DEFAULTS (captured once, not
// per-mount, since the previous page's mutation would otherwise leak in)
// back on unmount so navigating away doesn't leave stale tags behind.
let siteDefaults: { title: string; description: string; ogTitle: string; ogDescription: string; ogImage: string; canonical: string } | null = null;

const captureDefaultsOnce = () => {
  if (siteDefaults) return siteDefaults;
  siteDefaults = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
    ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
  };
  return siteDefaults;
};

export function useDocumentHead(config: DocumentHeadConfig) {
  useEffect(() => {
    const defaults = captureDefaultsOnce();

    document.title = config.title;
    setMeta('name', 'description', config.description);
    setMeta('property', 'og:title', config.ogTitle || config.title);
    setMeta('property', 'og:description', config.ogDescription || config.description);
    setMeta('property', 'og:type', 'website');
    // Absolut, immer. Ein Vorschaubild mit relativem Pfad zeigt in jedem
    // Chat und jedem sozialen Netz ins Leere -- dort gibt es keine Seite, zu
    // der "/images/..." relativ waere.
    if (config.ogImage) setMeta('property', 'og:image', absoluteUrl(config.ogImage));
    if (config.canonicalPath) {
      setCanonical(absoluteUrl(config.canonicalPath));
      setMeta('property', 'og:url', absoluteUrl(config.canonicalPath));
    }
    // Das Element wird angelegt und wieder entfernt, statt einen Wert zu
    // setzen und zurueckzusetzen: "kein robots-Element" ist die Aussage, die
    // jede andere Seite treffen soll, und ein leer geraeumtes Element trifft
    // sie nicht zuverlaessig.
    let robotsEl: HTMLMetaElement | null = null;
    if (config.robots) {
      robotsEl = document.createElement('meta');
      robotsEl.setAttribute('name', 'robots');
      robotsEl.setAttribute('content', config.robots);
      document.head.appendChild(robotsEl);
    }

    // Die Startseite steht immer vorn und wird deshalb nicht uebergeben --
    // sonst haette jede Seite sie noch einmal aufzuschreiben.
    let crumbEl: HTMLScriptElement | null = null;
    if (config.breadcrumbs?.length) {
      const trail = [{ name: 'Startseite', path: '/' }, ...config.breadcrumbs];
      crumbEl = document.createElement('script');
      crumbEl.type = 'application/ld+json';
      crumbEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: absoluteUrl(crumb.path)
        }))
      });
      document.head.appendChild(crumbEl);
    }

    return () => {
      crumbEl?.remove();
      robotsEl?.remove();
      document.title = defaults.title;
      setMeta('name', 'description', defaults.description);
      setMeta('property', 'og:title', defaults.ogTitle);
      setMeta('property', 'og:description', defaults.ogDescription);
      if (defaults.ogImage) setMeta('property', 'og:image', defaults.ogImage);
      if (defaults.canonical) {
        setCanonical(defaults.canonical);
        setMeta('property', 'og:url', SITE_URL);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.title, config.description, config.canonicalPath, config.robots]);
}
