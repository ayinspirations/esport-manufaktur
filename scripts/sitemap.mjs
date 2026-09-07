// ---------------------------------------------------------------------------
// Die Sitemap
// ---------------------------------------------------------------------------
// Von Hand gepflegt wäre sie nach dem zweiten neuen Best Case falsch: eine
// Sitemap, die Seiten nennt, die es nicht gibt, oder Seiten verschweigt, die
// es gibt, ist schlechter als keine. Also wird sie aus denselben Dateien
// gelesen, aus denen die Seite selbst ihre Adressen bezieht.
//
// Läuft nach `vite build` und schreibt nach dist/. Kein Build-Schritt, der
// stillschweigend etwas anderes tut als die Anwendung.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync } from 'node:fs';

const SITE = readFileSync('components/site.ts', 'utf8').match(/SITE_URL = '([^']+)'/)[1];

/**
 * Zieht alle Werte eines Feldes aus einer Quelldatei.
 *
 * Ohne Zeilenanker, weil die Servicedaten teils mehrzeilig und teils einzeilig
 * notiert sind -- eine Regel, die nur am Zeilenanfang sucht, uebersieht die
 * Haelfte davon.
 */
const field = (file, name) =>
  [...readFileSync(file, 'utf8').matchAll(new RegExp(`\\b${name}: '([^']+)'`, 'g'))].map((m) => m[1]);

/** Die Schlüssel von CASE_META -- die Best Cases mit eigener Unterseite. */
const caseSlugs = [...readFileSync('components/caseMeta.ts', 'utf8').matchAll(/^ {2}'?([a-z0-9-]+)'?: \{$/gm)].map(
  (m) => m[1]
);

const serviceSlugs = field('components/serviceCatalogue.ts', 'slug');
const blogSlugs = field('components/blogPosts.ts', 'slug');

// priority sagt nur, was uns wichtiger ist als anderes auf derselben Website;
// changefreq ist ein Hinweis, keine Zusage. Beide bewusst sparsam gesetzt.
const urls = [
  ['/', '1.0', 'weekly'],
  ['/services', '0.9', 'monthly'],
  ...serviceSlugs.map((s) => [`/services/${s}`, '0.8', 'monthly']),
  ['/ueber-uns', '0.7', 'monthly'],
  ['/ueber-uns/meine-geschichte', '0.5', 'yearly'],
  ['/webdesign', '0.6', 'monthly'],
  ...caseSlugs.map((s) => [`/best-cases/${s}`, '0.8', 'monthly']),
  ...blogSlugs.map((s) => [`/blog/${s}`, '0.7', 'monthly'])
];

const today = new Date().toISOString().slice(0, 10);
const body = urls
  .map(
    ([path, priority, changefreq]) =>
      `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n');

writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
);

console.log(`sitemap.xml: ${urls.length} Adressen`);
