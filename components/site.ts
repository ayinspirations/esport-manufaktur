// ---------------------------------------------------------------------------
// Wo diese Website steht
// ---------------------------------------------------------------------------
// Die Adresse stand an fuenf Stellen im Quelltext: im kanonischen Link der
// index.html, in useDocumentHead, in BlogDetail. Bei einem Domainwechsel
// haette man eine davon vergessen -- und eine kanonische Adresse, die auf die
// alte Domain zeigt, weist Suchmaschinen genau dorthin zurueck.
//
// Steht die Umfirmierung auf gg-manufaktur.de an, ist es diese eine Zeile.
// ---------------------------------------------------------------------------

export const SITE_URL = 'https://esport-manufaktur.de';

/** Absolute Adresse aus einem Pfad -- fuer canonical, og:url und die Sitemap. */
export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

// ---------------------------------------------------------------------------
// Versionsstempel fuer Medien
// ---------------------------------------------------------------------------
// Bilder und Videos liegen an festen Adressen (/images/rewe/hero.jpg), und die
// netlify.toml laesst sie lange im Browsercache liegen. Das ist richtig, hatte
// aber eine Falle: Wer eine dieser Adressen aufrief, *bevor* die Datei da war,
// bekam nicht 404, sondern die SPA-Weiche -- also index.html mit Status 200,
// und darauf die lange Cache-Regel fuer /images/*. Der Browser hat sich damit
// Wochen lang gemerkt, unter dieser Bildadresse liege HTML. Kam die Datei
// spaeter dazu, fragte er gar nicht mehr nach: das <img> bekam HTML, meldete
// einen Fehler, und die Kachel blieb schwarz. Genau das ist mit den Kacheln
// DEKRA, REWE, Interwetten und INTERSPORT passiert.
//
// Die Ursache ist in der netlify.toml behoben (fehlende Medien antworten jetzt
// mit 404 statt mit der Seite). Das raeumt aber nicht auf, was in fremden
// Browsern schon liegt -- ein Cache-Eintrag haengt an der Adresse. Deshalb
// tragen Medienadressen einen Stempel: ?v=2 ist eine andere Adresse als die
// vergiftete, und der Browser holt sie neu.
//
// Hochzaehlen, wenn eine Datei unter gleichem Namen ausgetauscht wurde und
// alte Kopien verschwinden sollen -- und immer dann, wenn eine Datei an einer
// Adresse *neu dazukommt*, die es vorher schon gab.
//
// v4: Patricks Portraet wurde ausgetauscht.
//
// Genau daran hing v3. Der Stempel kam mit einem Deploy, die Bilder fuer XP
// Days und NIVEA erst mit dem naechsten. Dazwischen fragte die Seite
// /images/xp-days/hero.jpg?v=2 ab, bekam die neue 404-Antwort -- und die trug
// die Cache-Regel fuer /images/* mit sieben Tagen. Der Browser hat sich also
// gemerkt: unter dieser Adresse liegt nichts, und zwar eine Woche lang. Kam
// die Datei dann, fragte er nicht mehr nach.
//
// Zwei Konsequenzen: die Regel in der netlify.toml haelt Medien nur noch eine
// Stunde fest (mit Hintergrund-Auffrischung danach), und der Stempel steht auf
// 3, weil das eine Adresse ist, unter der noch nie eine Fehlantwort lag.
// ---------------------------------------------------------------------------

export const ASSET_VERSION = '4';

/** Medienpfad mit Versionsstempel. Fremde Adressen bleiben unberuehrt. */
export function asset(path: string): string;
export function asset(path: string | undefined): string | undefined;
export function asset(path?: string): string | undefined {
  if (!path || /^(https?:|data:|blob:)/.test(path) || path.includes('?')) return path;
  return `${path}?v=${ASSET_VERSION}`;
}

// ---------------------------------------------------------------------------
// Die Terminseite
// ---------------------------------------------------------------------------
// Steht hier und nicht in BookingModal, obwohl sie dort gebraucht wird: App
// braucht sie auch -- auf Telefonen wird sie direkt geoeffnet statt in einem
// Fenster gezeigt -- und ein Import aus der Fensterdatei zoege deren ganzen
// Code ins Startbuendel. Diese Datei kostet nichts.
// ---------------------------------------------------------------------------

export const BOOKING_URL = 'https://esport-manufaktur.com/meetings/gianluca-crepaldi/kennenlernen';
