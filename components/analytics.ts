import { CONSENT_EVENT, hasConsentFor } from './cookieConsent';

// ---------------------------------------------------------------------------
// Umami
// ---------------------------------------------------------------------------
// Reichweitenmessung ohne Cookies und ohne personenbezogene Daten. Drei Dinge
// regelt diese Datei:
//
//   1. Das Skript. Es wird genau einmal eingehaengt -- und erst, wenn die
//      Statistik im Cookie-Hinweis zugelassen wurde. Die Seite fragt das
//      ohnehin ab; es unaufgefordert zu laden waere ein Widerspruch zum
//      eigenen Dialog.
//   2. Die Ereignisse. `track` ist die einzige Stelle, an der etwas gesendet
//      wird, und sie tut nichts, solange das Skript nicht da ist.
//   3. Die Klickerkennung. Ein einziger Zuhoerer am Dokument statt eines
//      Handlers je Knopf -- was gezaehlt wird, entscheidet sich an den
//      Elementen selbst (siehe unten).
//
// Seitenaufrufe zaehlt Umami von sich aus, auch die Wechsel innerhalb dieser
// Anwendung: sein Skript haengt sich in `history.pushState` ein, und genau das
// nutzt der Router hier. Deshalb wird ein Seitenaufruf nirgends von Hand
// gemeldet -- das waere die doppelte Zaehlung.
// ---------------------------------------------------------------------------

const WEBSITE_ID = '20654bd2-7e14-40fc-a113-537dc613099b';
const SCRIPT_SRC = 'https://cloud.umami.is/script.js';

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void };
  }
}

/**
 * Entwicklungsrechner zaehlen nicht mit.
 *
 * Alles andere schon, auch die Vorschau-Adressen der Deploys -- sonst laesst
 * sich vor dem Livegang nicht pruefen, ob ueberhaupt etwas ankommt. Soll die
 * Zaehlung strikt auf die Livedomain begrenzt sein, traegt man sie unten am
 * Skript als `data-domains` ein; Umami verwirft dann alles andere.
 */
const DEBUG_KEY = 'gg-analytics-debug';

const isMeasurableHost = () => {
  // Zum Pruefen laesst sich die Sperre aufheben:
  //   localStorage.setItem('gg-analytics-debug', '1')
  // Danach zaehlt auch der Entwicklungsrechner mit -- bewusst nur von Hand,
  // damit es niemandem versehentlich passiert.
  try {
    if (window.localStorage.getItem(DEBUG_KEY) === '1') return true;
  } catch {
    /* privates Fenster, gesperrter Speicher */
  }
  const h = window.location.hostname;
  return !(h === 'localhost' || h === '127.0.0.1' || h === '::1' || h.endsWith('.local'));
};

let loading = false;

/** Haengt das Skript ein -- einmal, und nur mit Einwilligung. */
const loadUmami = () => {
  if (loading || window.umami || document.querySelector('script[data-umami]')) return;
  if (!isMeasurableHost() || !hasConsentFor('statistics')) return;

  loading = true;
  const el = document.createElement('script');
  el.src = SCRIPT_SRC;
  el.defer = true;
  el.setAttribute('data-website-id', WEBSITE_ID);
  el.setAttribute('data-umami', '');
  document.head.appendChild(el);
};

/**
 * Meldet ein Ereignis. Ohne geladenes Skript passiert nichts -- kein Fehler,
 * keine Warteschlange: was vor der Einwilligung geklickt wurde, wird auch
 * nicht nachtraeglich gezaehlt.
 */
export const track = (event: string, props: Record<string, string> = {}) => {
  try {
    window.umami?.track(event, { page: window.location.pathname, ...props });
  } catch {
    /* Messung darf nie eine Interaktion kaputtmachen. */
  }
};

// ---------------------------------------------------------------------------
// Was gezaehlt wird
// ---------------------------------------------------------------------------
// Ein Element wird gezaehlt, wenn eine der beiden Bedingungen gilt:
//
//   Es traegt `data-track="<ereignis>"`. Dann gilt, was dort steht, dazu
//   optional `data-track-label`, `-location`, `-destination`, `-service`,
//   `-project`.
//
//   Es ist ein Verweis (<a href>). Dann entscheidet das Ziel: mailto, tel,
//   soziales Netz, fremde Domain, Datei -- oder intern, dann nach Bereich.
//
// Ein Knopf ohne Angabe wird *nicht* gezaehlt. Das ist Absicht: sonst landet
// jeder Schalter, jeder Pfeil und jedes Aufklappen in der Auswertung und
// begraebt das, worum es geht.
// ---------------------------------------------------------------------------

const SOCIAL_HOSTS: Record<string, string> = {
  'instagram.com': 'instagram',
  'linkedin.com': 'linkedin',
  'youtube.com': 'youtube',
  'youtu.be': 'youtube',
  'facebook.com': 'facebook',
  'tiktok.com': 'tiktok',
  'x.com': 'x',
  'twitter.com': 'x'
};

const DOWNLOAD_RE = /\.(pdf|zip|docx?|xlsx?|pptx?|csv|txt)(\?|$)/i;

/** Aus Beschriftungen wird ein kurzer, stabiler Bezeichner. */
const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 48);

/** Der Bereich der Seite: eigene Angabe, sonst der naechste Abschnitt mit id. */
/** Behaelter der ganzen Anwendung -- als Ortsangabe wertlos. */
const NON_PLACES = new Set(['root', 'app', 'main']);

const locationOf = (el: Element): string => {
  const named = el.closest<HTMLElement>('[data-track-location]');
  if (named?.dataset.trackLocation) return named.dataset.trackLocation;
  let node: HTMLElement | null = el.closest<HTMLElement>('section[id], div[id], header[id], footer[id]');
  while (node && NON_PLACES.has(node.id)) {
    node = node.parentElement?.closest<HTMLElement>('section[id], div[id], header[id], footer[id]') ?? null;
  }
  return node?.id ? slug(node.id) : 'page';
};

const labelOf = (el: Element): string => {
  const explicit = el.closest<HTMLElement>('[data-track-label]')?.dataset.trackLabel;
  if (explicit) return explicit;
  const aria = el.getAttribute('aria-label');
  const text = (aria || (el as HTMLElement).innerText || '').trim();
  return text ? slug(text) : 'ohne_beschriftung';
};

interface Hit {
  event: string;
  props: Record<string, string>;
}

const fromAnchor = (a: HTMLAnchorElement, el: Element): Hit | null => {
  const raw = a.getAttribute('href') || '';
  if (!raw) return null;

  // Ein Sprung innerhalb der Seite ist auch Navigation -- im Fusz stehen die
  // Verweise so.
  if (raw.startsWith('#')) {
    return { event: 'navigation_click', props: { label: labelOf(a), destination: raw, location: locationOf(el) } };
  }

  if (raw.startsWith('mailto:')) {
    // Nur der Postfachname, nicht die ganze Adresse -- und es ist unsere,
    // nicht die des Besuchers.
    return { event: 'email_click', props: { label: slug(raw.slice(7).split('@')[0]), location: locationOf(el) } };
  }
  if (raw.startsWith('tel:')) {
    return { event: 'phone_click', props: { label: 'telefon', location: locationOf(el) } };
  }

  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) {
    const host = url.hostname.replace(/^www\./, '');
    const network = SOCIAL_HOSTS[host];
    if (network) {
      return { event: 'social_click', props: { label: network, location: locationOf(el) } };
    }
    return { event: 'external_link_click', props: { label: slug(host), destination: host, location: locationOf(el) } };
  }

  if (DOWNLOAD_RE.test(url.pathname)) {
    const file = url.pathname.split('/').pop() || url.pathname;
    return { event: 'file_download', props: { label: slug(file), destination: url.pathname, location: locationOf(el) } };
  }

  const path = url.pathname;
  const caseMatch = path.match(/^\/best-cases\/([a-z0-9-]+)$/);
  if (caseMatch) {
    return { event: 'project_click', props: { project: caseMatch[1], label: caseMatch[1], destination: path, location: locationOf(el) } };
  }
  const serviceMatch = path.match(/^\/services\/([a-z0-9-]+)$/);
  if (serviceMatch) {
    return { event: 'service_click', props: { service: serviceMatch[1], label: serviceMatch[1], destination: path, location: locationOf(el) } };
  }
  // Die Adresse ist die stabilere Beschriftung als der Text: eine Blogkachel
  // traegt Datum, Lesezeit und Titel, und daraus wuerde ein unbrauchbar
  // langer Bezeichner.
  const leaf = path.split('/').filter(Boolean).pop();
  return {
    event: 'navigation_click',
    props: { label: leaf ? slug(leaf) : 'startseite', destination: path, location: locationOf(el) }
  };
};

const fromMarked = (node: HTMLElement, el: Element): Hit => {
  const d = node.dataset;
  const props: Record<string, string> = {
    label: d.trackLabel || labelOf(node),
    location: d.trackLocation || locationOf(el)
  };
  if (d.trackDestination) props.destination = d.trackDestination;
  if (d.trackService) props.service = d.trackService;
  if (d.trackProject) props.project = d.trackProject;
  return { event: d.track as string, props };
};

/**
 * Haengt die Klickerkennung ans Dokument. Gibt die Abmeldung zurueck.
 *
 * Ein Zuhoerer fuer die ganze Seite: er ueberlebt jedes Nachladen einer Route
 * und muss nicht in jeder Komponente wiederholt werden.
 */
export const startClickTracking = () => {
  let lastKey = '';
  let lastAt = 0;

  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    if (!target || !target.closest) return;

    const marked = target.closest<HTMLElement>('[data-track]');
    const anchor = target.closest<HTMLAnchorElement>('a[href]');

    // Die eigene Angabe hat Vorrang, aber nur wenn sie naeher steht als der
    // Verweis -- sonst gewaenne eine Markierung am Umfeld gegen den Link.
    let hit: Hit | null = null;
    if (marked && (!anchor || marked.contains(anchor) === false || anchor.contains(marked))) {
      hit = fromMarked(marked, target);
    } else if (anchor) {
      hit = fromAnchor(anchor, target);
    } else if (marked) {
      hit = fromMarked(marked, target);
    }
    if (!hit || !hit.event) return;

    // Derselbe Klick kann in verschachtelten Elementen zweimal ankommen, und
    // ein Doppeltipp ist keine zweite Absicht.
    const key = `${hit.event}|${hit.props.label}|${hit.props.location}`;
    const now = Date.now();
    if (key === lastKey && now - lastAt < 500) return;
    lastKey = key;
    lastAt = now;

    track(hit.event, hit.props);
  };

  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
};

/**
 * Startet die Messung: Skript laden, sobald es erlaubt ist, und auf eine
 * spaetere Entscheidung im Cookie-Hinweis warten.
 */
export const startAnalytics = () => {
  loadUmami();
  const onConsent = () => loadUmami();
  window.addEventListener(CONSENT_EVENT, onConsent);
  const stopClicks = startClickTracking();
  return () => {
    window.removeEventListener(CONSENT_EVENT, onConsent);
    stopClicks();
  };
};
