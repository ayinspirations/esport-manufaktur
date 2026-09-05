// ---------------------------------------------------------------------------
// Welches Layout die Leistungen-Seite benutzt
// ---------------------------------------------------------------------------
// Es gibt zwei, und beide sind vollstaendig im Code:
//
//   'sidebar'  Die Auswahl steht links in einer Spalte, die beim Scrollen
//              stehen bleibt, der Inhalt laeuft rechts im Panel durch. Ab
//              Ende des Panels scrollt die Seite normal weiter.
//
//   'pills'    Das bisherige System: zwei Gruppen Filter-Pillen ueber der
//              Ansicht, darunter die ausgewaehlte Leistung ueber die volle
//              Breite.
//
// Umschalten heiszt: den Wert hier aendern. Sonst nichts -- beide Layouts
// teilen sich dieselbe Auswahl-Logik, dieselbe URL und dieselbe ServiceView,
// und keines der beiden weisz vom anderen.
// ---------------------------------------------------------------------------

export type ServicesLayout = 'sidebar' | 'pills';

export const SERVICES_LAYOUT: ServicesLayout = 'sidebar';
