import { useEffect } from 'react';

interface DocumentHeadConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalPath?: string;
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
    if (config.ogImage) setMeta('property', 'og:image', config.ogImage);
    if (config.canonicalPath) setCanonical(`https://esport-manufaktur.de${config.canonicalPath}`);

    return () => {
      document.title = defaults.title;
      setMeta('name', 'description', defaults.description);
      setMeta('property', 'og:title', defaults.ogTitle);
      setMeta('property', 'og:description', defaults.ogDescription);
      if (defaults.ogImage) setMeta('property', 'og:image', defaults.ogImage);
      if (defaults.canonical) setCanonical(defaults.canonical);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.title, config.description, config.canonicalPath]);
}
