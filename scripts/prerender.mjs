// ---------------------------------------------------------------------------
// Eigene HTML-Datei je Unterseite
// ---------------------------------------------------------------------------
// Die Seite setzt Titel, Beschreibung und Vorschaubild erst im Browser. Google
// fuehrt das aus, LinkedIn, WhatsApp, Slack und Co. nicht: die sahen bei jeder
// geteilten Adresse den Kopf der Startseite. Deshalb bekommt jede Adresse aus
// components/pageMeta.json nach `vite build` ihre eigene dist/<pfad>/index.html
// -- dieselbe Anwendung, nur mit dem richtigen Kopf. Netlify liefert die Datei
// vor der SPA-Weiche aus.
// ---------------------------------------------------------------------------

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SITE = readFileSync('components/site.ts', 'utf8').match(/SITE_URL = '([^']+)'/)[1];
const PAGES = JSON.parse(readFileSync('components/pageMeta.json', 'utf8'));
const shell = readFileSync('dist/index.html', 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Ersetzt den content-Wert eines vorhandenen meta-Elements; fehlt es, bricht der Build ab. */
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: <meta ${attr}="${key}"> fehlt in index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
};

let count = 0;
for (const [path, meta] of Object.entries(PAGES)) {
  const url = `${SITE}${path}`;
  let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'property', 'og:title', meta.title);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', meta.title);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  if (meta.ogImage) {
    html = setMeta(html, 'property', 'og:image', `${SITE}${meta.ogImage}`);
    html = setMeta(html, 'name', 'twitter:image', `${SITE}${meta.ogImage}`);
    html = setMeta(html, 'property', 'og:image:alt', meta.title);
  }
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: meta.breadcrumb, item: url }
      ]
    }
  ];
  let extra = `<script type="application/ld+json">${JSON.stringify(ld[0])}</script>`;
  if (meta.service) {
    const service = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: meta.service.name,
      serviceType: meta.service.serviceType,
      description: meta.service.description,
      url,
      areaServed: { '@type': 'Country', name: 'Deutschland' },
      provider: { '@type': 'Organization', name: 'GG Manufaktur', url: SITE }
    };
    // Dieselbe id wie im Browser, damit die Seite den Block uebernimmt statt ihn zu verdoppeln.
    extra += `\n    <script id="ld-service" type="application/ld+json">${JSON.stringify(service)}</script>`;
  }
  if (meta.faq?.length) {
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    };
    extra += `\n    <script id="ld-faq" type="application/ld+json">${JSON.stringify(faq)}</script>`;
  }
  html = html.replace('</head>', `    ${extra}\n  </head>`);

  mkdirSync(`dist${path}`, { recursive: true });
  writeFileSync(`dist${path}/index.html`, html);
  count++;
}

console.log(`prerender: ${count} Seiten mit eigenem Kopf`);
