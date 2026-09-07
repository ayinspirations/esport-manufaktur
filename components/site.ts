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
// alte Kopien verschwinden sollen. Sonst in Ruhe lassen.
// ---------------------------------------------------------------------------

export const ASSET_VERSION = '2';

/** Medienpfad mit Versionsstempel. Fremde Adressen bleiben unberuehrt. */
export function asset(path: string): string;
export function asset(path: string | undefined): string | undefined;
export function asset(path?: string): string | undefined {
  if (!path || /^(https?:|data:|blob:)/.test(path) || path.includes('?')) return path;
  return `${path}?v=${ASSET_VERSION}`;
}
