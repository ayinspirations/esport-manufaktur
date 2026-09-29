// Einstieg fuer scripts/prerender.mjs: die Daten, aus denen die Seiten ihre
// Titel, Beschreibungen und Kopfbilder beziehen. Wird beim Build mit esbuild
// gebuendelt, damit das Vorschaubild beim Teilen immer dasselbe Bild ist wie
// im Kopf der Seite -- aus derselben Quelle, nicht abgeschrieben.
export { CASE_META } from '../components/caseMeta';
export { blogPosts } from '../components/blogPosts';
export { servicesContent } from '../components/servicesContent';
