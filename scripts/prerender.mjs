// ---------------------------------------------------------------------------
// Eigene HTML-Datei je Unterseite
// ---------------------------------------------------------------------------
// Die Seite setzt Titel, Beschreibung und Vorschaubild erst im Browser. Google
// fuehrt das aus, LinkedIn, WhatsApp, Slack und Co. nicht: die sahen bei jeder
// geteilten Adresse den Kopf der Startseite. Deshalb bekommt jede Unterseite
// nach `vite build` ihre eigene dist/<pfad>/index.html -- dieselbe Anwendung,
// nur mit dem richtigen Kopf.
//
// Das Vorschaubild (og:image) ist immer das Kopfbild der jeweiligen Seite und
// kommt aus derselben Quelle wie die Seite selbst:
//   Money Pages, Kontakt, Blog-Uebersicht -> components/pageMeta.json (ogImage)
//   Best Cases                             -> components/caseMeta.ts (image)
//   Blog-Artikel                           -> components/blogPosts.ts (image)
//   Leistungen                             -> components/servicesContent.ts (hero.image)
// Wer dort ein Bild tauscht, tauscht damit auch das Vorschaubild.
// ---------------------------------------------------------------------------

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const SITE = readFileSync('components/site.ts', 'utf8').match(/SITE_URL = '([^']+)'/)[1];
const PAGE_META = JSON.parse(readFileSync('components/pageMeta.json', 'utf8'));

// Woher Chats das Vorschaubild holen. Die kanonische Adresse bleibt immer
// SITE; das Bild muss aber von der Domain kommen, auf der dieser Build
// tatsaechlich liegt -- sonst zeigt ein geteilter Vorschau-Link (oder eine
// Domain, die noch auf einen aelteren Stand zeigt) Titel und Text, aber kein
// Bild. Vercel stellt die Domains als Umgebungsvariablen bereit.
const host = (h) => (h ? `https://${h.replace(/^https?:\/\//, '')}` : '');
const IMAGE_BASE =
  process.env.VERCEL_ENV === 'preview'
    ? host(process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL)
    : host(process.env.VERCEL_PROJECT_PRODUCTION_URL) || SITE;
const shell = readFileSync('dist/index.html', 'utf8');

// Die TypeScript-Daten einmal buendeln und laden.
const bundle = 'node_modules/.cache/og-data.mjs';
await build({
  entryPoints: ['scripts/og-entry.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: bundle,
  logLevel: 'silent',
  // Vite-Konstanten, die in den Datendateien abgefragt werden.
  define: { 'import.meta.env': JSON.stringify({ DEV: false, PROD: true, MODE: 'production' }) }
});
const { CASE_META, blogPosts, servicesContent } = await import(`${pathToFileURL(bundle).href}?t=${Date.now()}`);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Ersetzt den content-Wert eines vorhandenen meta-Elements; fehlt es, bricht der Build ab. */
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: <meta ${attr}="${key}"> fehlt in index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
};

// ---------------------------------------------------------------------------
// Alle Seiten mit eigenem Kopf
// ---------------------------------------------------------------------------
/** @type {{ path: string, title: string, description: string, image?: string, imageAlt?: string, crumbs: {name: string, path: string}[], service?: any, faq?: any[] }[]} */
const pages = [];

for (const [path, meta] of Object.entries(PAGE_META)) {
  // Noch nicht freigegebene Seiten bekommen keine eigene Datei.
  if (meta.hidden) continue;
  pages.push({
    path,
    title: meta.title,
    description: meta.description,
    image: meta.ogImage,
    crumbs: [{ name: meta.breadcrumb, path }],
    service: meta.service,
    faq: meta.faq
  });
}

for (const [slug, meta] of Object.entries(CASE_META)) {
  const path = `/best-cases/${slug}`;
  pages.push({
    path,
    title: meta.title,
    description: meta.description,
    image: meta.image,
    crumbs: [
      { name: 'Best Cases', path: '/#best-cases' },
      { name: meta.title.split(/[:|]/)[0].trim(), path }
    ]
  });
}

for (const post of blogPosts) {
  const path = `/blog/${post.slug}`;
  pages.push({
    path,
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    image: post.image,
    imageAlt: post.imageAlt,
    crumbs: [
      { name: 'Blog & Wissen', path: '/blog' },
      { name: post.title, path }
    ]
  });
}

for (const content of Object.values(servicesContent)) {
  pages.push({
    path: content.path,
    title: content.seo.title,
    description: content.seo.description,
    image: content.hero.image || content.seo.ogImage,
    imageAlt: content.hero.imageAlt,
    crumbs: [
      { name: 'Services', path: '/services' },
      { name: content.h1, path: content.path }
    ]
  });
}

// ---------------------------------------------------------------------------
// Schreiben
// ---------------------------------------------------------------------------
// Linkliste fuer Suchmaschinen. Das ausgelieferte HTML hat sonst einen leeren
// #root und damit keinen einzigen Link; Google faende die Unterseiten erst
// nach dem Ausfuehren des JavaScripts (verzoegert, bei junger Domain selten).
// Die Liste ist unsichtbar und verschwindet, sobald React den #root fuellt
// (createRoot ersetzt dessen Inhalt) -- fuer Besucher aendert sich nichts.
const HIDDEN = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
const linkNav = [{ path: '/', name: 'Startseite' }, { path: '/services', name: 'Services' }, { path: '/ueber-uns', name: 'Über uns' }, { path: '/ueber-uns/meine-geschichte', name: 'Meine Geschichte' }, { path: '/webdesign', name: 'Webdesign' }, ...pages.map((p) => ({ path: p.path, name: p.crumbs.at(-1).name }))]
  .filter((l, i, all) => all.findIndex((x) => x.path === l.path) === i)
  .map((l) => `<li><a href="${l.path}">${esc(l.name)}</a></li>`)
  .join('');
const withNav = (html) => {
  if (!html.includes('<div id="root"></div>')) throw new Error('prerender: <div id="root"></div> fehlt in index.html');
  return html.replace('<div id="root"></div>', `<div id="root"><nav aria-label="Seiten" style="${HIDDEN}"><ul>${linkNav}</ul></nav></div>`);
};
writeFileSync('dist/index.html', withNav(shell));

for (const page of pages) {
  const url = `${SITE}${page.path}`;
  let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  // Ein Vorschaubild, dessen Datei fehlt, waere beim Teilen ein leerer
  // Kasten -- dann lieber das Standardbild der Startseite behalten.
  if (page.image && !existsSync(`dist${page.image}`)) {
    console.warn(`prerender: Bild fehlt, Standardbild bleibt: ${page.path} -> ${page.image}`);
    page.image = undefined;
  }
  if (page.image) {
    const image = encodeURI(`${IMAGE_BASE || SITE}${page.image}`);
    html = setMeta(html, 'property', 'og:image', image);
    html = setMeta(html, 'name', 'twitter:image', image);
    html = setMeta(html, 'property', 'og:image:alt', page.imageAlt || page.title);
  }
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);

  const trail = [{ name: 'Startseite', path: '/' }, ...page.crumbs];
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE}${c.path}` }))
  };
  let extra = `<script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>`;
  if (page.service) {
    const service = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.service.name,
      serviceType: page.service.serviceType,
      description: page.service.description,
      url,
      areaServed: { '@type': 'Country', name: 'Deutschland' },
      provider: { '@type': 'Organization', name: 'GG Manufaktur', url: SITE }
    };
    // Dieselbe id wie im Browser, damit die Seite den Block uebernimmt statt ihn zu verdoppeln.
    extra += `\n    <script id="ld-service" type="application/ld+json">${JSON.stringify(service)}</script>`;
  }
  if (page.faq?.length) {
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    };
    extra += `\n    <script id="ld-faq" type="application/ld+json">${JSON.stringify(faq)}</script>`;
  }
  html = html.replace('</head>', `    ${extra}\n  </head>`);

  mkdirSync(`dist${page.path}`, { recursive: true });
  writeFileSync(`dist${page.path}/index.html`, withNav(html));
}

console.log(`prerender: ${pages.length} Seiten mit eigenem Kopf und Vorschaubild`);
