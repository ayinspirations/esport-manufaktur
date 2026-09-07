// ---------------------------------------------------------------------------
// Wer wirklich durchkommt
// ---------------------------------------------------------------------------
// In der robots.txt steht die Regel, hier wird sie durchgesetzt. Der
// Unterschied ist nicht theoretisch: robots.txt ist eine Bitte an gutwillige
// Programme. Scraper, die eine Website ausschlachten, lesen sie entweder gar
// nicht oder ignorieren sie -- die halten nur Antworten auf, keine Wünsche.
//
// Die Regel, in dieser Reihenfolge:
//
//   1. Kein Programm, sondern ein Mensch mit Browser -> durch. Das ist der
//      Normalfall und wird zuerst geprüft, damit kein Besucher je in dieser
//      Funktion hängenbleibt.
//   2. Ein zugelassenes Programm (Google-Suche, ChatGPT) -> durch, mit einer
//      Bremse für ChatGPT.
//   3. Alles andere, das sich als Programm zu erkennen gibt -> 403.
//
// Was diese Funktion bewusst NICHT tut: jemanden aussperren, der sich als
// gewöhnlicher Browser ausgibt. Das ginge nur über Fingerabdrücke und
// Verhaltensmuster, träfe unweigerlich auch echte Menschen und gehört auf
// diese Ebene nicht. Wer sich verstellt, kommt durch -- der Rest nicht.
// ---------------------------------------------------------------------------

/** Programme, die durchdürfen. Kleingeschrieben, wird als Teilstring gesucht. */
const ALLOWED = [
  // Google-Suche und ihre Werkzeuge
  'googlebot',
  'google-inspectiontool',
  'storebot-google',
  'google favicon',
  'adsbot-google',
  // ChatGPT: Suchindex und der Abruf auf Nachfrage einer Person
  'oai-searchbot',
  'chatgpt-user'
];

/**
 * Programme, die sich zu erkennen geben. Ein Browser nennt keines dieser
 * Wörter, ein Crawler fast immer mindestens eines -- auch die freundlichen,
 * die wir hier trotzdem abweisen, weil sie nicht auf der Liste stehen.
 */
const BOTLIKE = [
  'bot', 'crawler', 'crawl', 'spider', 'scrape', 'scraper', 'fetch',
  'http-client', 'httpclient', 'python-requests', 'curl/', 'wget',
  'go-http-client', 'java/', 'okhttp', 'axios', 'node-fetch', 'libwww',
  'headless', 'phantomjs', 'selenium', 'puppeteer', 'playwright',
  'archive', 'semrush', 'ahrefs', 'mj12', 'dotbot', 'petalbot', 'bytespider',
  'dataforseo', 'serpstat', 'screaming frog', 'seokicks', 'megaindex',
  'gptbot', 'ccbot', 'claudebot', 'anthropic-ai', 'perplexitybot',
  'google-extended', 'applebot-extended', 'facebookbot', 'meta-externalagent',
  'amazonbot', 'youbot', 'diffbot', 'imagesiftbot', 'omgili', 'timpibot'
];

/**
 * Ausnahmen von der Bremse: die Adresse, unter der die Regel selbst steht,
 * und das, was jede Vorschau braucht, um eine geteilte Adresse darzustellen.
 */
const ALWAYS_OPEN = ['/robots.txt', '/sitemap.xml', '/favicon.ico'];

/** Merkt sich je Programm den letzten Abruf -- die Bremse für ChatGPT. */
const lastSeen = new Map<string, number>();
const THROTTLE_MS = 2000;

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const url = new URL(request.url);
  if (ALWAYS_OPEN.includes(url.pathname)) return;

  const ua = (request.headers.get('user-agent') ?? '').toLowerCase();

  // 1. Kein Kennzeichen eines Programms: das ist ein Mensch. Durch.
  if (!ua || !BOTLIKE.some((needle) => ua.includes(needle))) return;

  // 2. Zugelassen?
  const allowed = ALLOWED.find((needle) => ua.includes(needle));
  if (!allowed) {
    return new Response('Dieser Zugriff ist nicht zugelassen. Siehe /robots.txt.\n', {
      status: 403,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex' }
    });
  }

  // 3. ChatGPT darf, aber im Schritttempo. Eine Anfrage alle zwei Sekunden je
  //    Instanz dieser Funktion; wer schneller ist, bekommt 429 mit der Bitte,
  //    es gleich noch einmal zu versuchen. Google bleibt ungebremst -- eine
  //    gedrosselte Google-Suche ist eine schlechter indexierte Website.
  if (allowed === 'oai-searchbot' || allowed === 'chatgpt-user') {
    const now = Date.now();
    const previous = lastSeen.get(allowed) ?? 0;
    if (now - previous < THROTTLE_MS) {
      return new Response('Zu viele Anfragen. Bitte langsamer.\n', {
        status: 429,
        headers: { 'content-type': 'text/plain; charset=utf-8', 'retry-after': '10' }
      });
    }
    lastSeen.set(allowed, now);
  }

  return context.next();
};

export const config = { path: '/*' };
