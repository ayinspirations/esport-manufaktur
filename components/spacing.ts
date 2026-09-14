// Canonical inter-section vertical padding for the homepage.
//
// Symmetrical, so the gap between two neighbouring sections is twice the
// value -- and it is set to exactly half of BLOCK_GAP below, which makes
// that gap identical to the one the subpages use. Before this the homepage
// ran on py-16/24/28 (a 128px gap on a phone) while the subpages ran on
// 80px, and three sections carried their own values on top of that.
//
// Every homepage section uses this and nothing else; a section that needs a
// different distance is a decision to make here, once, not in the section.
export const SECTION_PADDING = 'py-10 md:py-16';

/**
 * The gap between two blocks on a subpage.
 *
 * One value, applied as top padding only. Sections used to carry padding on
 * both sides, so the gap between any two of them was the sum of two paddings
 * -- and wherever one section had been given `pt-0` to compensate, the gap
 * next to it was half the size of the one before it. Reading down the
 * services page the rhythm went 128, 192, 192, 96.
 *
 * Top padding only means the gap is the value itself, everywhere, and the
 * only section that needs a decision is the last one on the page (which adds
 * its own bottom padding).
 *
 * The value is the one the client picked out as correct: the distance between
 * the CTA closing a service hero and the "Ausgangslage" heading under it.
 */
export const BLOCK_GAP = 'pt-20 md:pt-32';

/**
 * Die Ueberschrift eines Abschnitts auf der Startseite.
 *
 * Sie stand in jedem Abschnitt einzeln, und entsprechend unterschiedlich fiel
 * sie aus: "Unsere Services." kam auf 56 Pixel, "Best Cases." auf 100, "Lass
 * uns sprechen." auf 96, der Rest auf 90. Beim Herunterscrollen wirkte das
 * wie vier verschiedene Ebenen, obwohl alle vier dasselbe sind: der Anfang
 * eines Abschnitts.
 *
 * Jetzt teilen sie sich diesen Wert. Groesze, Zeilenabstand und Laufweite
 * gehoeren dazu; Farbe und Versalien bleiben beim Abschnitt, weil sie sich
 * nach dem Grund richten, auf dem er steht.
 *
 * Eine Ausnahme gibt es bewusst: "Brands we level up." im Logoband ist keine
 * Abschnittsueberschrift, sondern die Aussage der Seite ueber sich selbst.
 * Sie steht weiterhin groeszer und bleibt davon unberuehrt.
 */
export const SECTION_HEADING = 'text-[clamp(38px,6.5vw,90px)] font-black leading-[0.9] tracking-tighter';
