// ---------------------------------------------------------------------------
// Die Money Pages und wo sie verlinkt werden
// ---------------------------------------------------------------------------
// Eine neue Money Page kommt hier einmal dazu; die Leistungsseite zeigt sie
// dann in der Uebersicht und unter jedem Service, zu dem sie passt.
// ---------------------------------------------------------------------------

export interface MoneyPageLink {
  page: string;
  eyebrow: string;
  title: string;
  text: string;
}

/**
 * Fertig gebaut, aber noch nicht freigegeben: nicht erreichbar, nicht
 * verlinkt, nicht in Sitemap oder Prerender. Zum Freischalten hier entfernen
 * und in pageMeta.json "hidden" loeschen.
 */
export const HIDDEN_MONEY_PAGES = ['livestreams', 'landingpages', 'gaming-areas', 'eventmodule'];

const ALL_MONEY_PAGES: MoneyPageLink[] = [
  {
    page: 'esport-turnier-organisieren',
    eyebrow: 'eSport Turniere',
    title: 'eSport Turnier organisieren',
    text: 'Von der digitalen Anmeldung über Turniermanagement und Technik bis zum Live-Finale – online, offline oder hybrid.'
  },
  {
    page: 'white-label-turnierplattform',
    eyebrow: 'Plattform',
    title: 'White-Label Turnierplattform',
    text: 'Deine Marke. Dein Turnier. Deine Plattform. Registrierung, Brackets, Lead-Gen und Gamification im Look & Feel deiner Marke.'
  },
  {
    page: 'gaming-dienstleister-fuer-agenturen',
    eyebrow: 'Agenturen',
    title: 'Gaming Dienstleister für Agenturen',
    text: 'Gaming-Know-how für eure Brand-Kunden: Strategie, Pitch-Support, Events, Gamification und Technologie – partnerschaftlich und White-Label-fähig.'
  },
  {
    page: 'livestreams',
    eyebrow: 'Livestreams',
    title: 'Livestreams in TV-Qualität',
    text: 'Professionelles Livestreaming für eSport & Gaming Events – vor Ort oder online, mit eigener Technik, Regie und Moderation.'
  },
  {
    page: 'landingpages',
    eyebrow: 'Landingpages',
    title: 'Gaming-Landingpages',
    text: 'Conversion-optimierte Event-Landingpages im Look deiner Marke – mit Anmeldung, Brackets, Live-Tabellen und Livestream.'
  },
  {
    page: 'gaming-areas',
    eyebrow: 'Gaming Areas',
    title: 'Gaming Areas',
    text: 'Das interaktive Highlight für Center, Fanzonen, Firmenevents und Messen – Full-Service von der Planung bis zur Betreuung.'
  },
  {
    page: 'eventmodule',
    eyebrow: 'Eventmodule',
    title: 'Eventmodule',
    text: 'Gaming Modul, Cube, Bühne, Fotobox, Simulatoren, VR und mehr – Maßanfertigungen aus eigener Entwicklung, frei kombinierbar.'
  }
];

export const MONEY_PAGES = ALL_MONEY_PAGES.filter((m) => !HIDDEN_MONEY_PAGES.includes(m.page));

const TURNIER = 'esport-turnier-organisieren';
const PLATTFORM = 'white-label-turnierplattform';
const AGENTUR = 'gaming-dienstleister-fuer-agenturen';
const STREAM = 'livestreams';
const LANDING = 'landingpages';
const AREAS = 'gaming-areas';
const MODULE = 'eventmodule';

/** Service-Slug -> passende Money Pages. Services ohne Eintrag zeigen keinen Block. */
export const SERVICE_MONEY_PAGES: Record<string, string[]> = {
  'strategie-konzeption': [TURNIER, PLATTFORM, LANDING, AGENTUR],
  'events-erlebniswelten': [AREAS, MODULE, TURNIER, STREAM, PLATTFORM],
  'art-design-messebau': [MODULE, AREAS, LANDING],
  'digitale-loesungen': [PLATTFORM, LANDING, TURNIER],
  'content-live-kommunikation': [STREAM, TURNIER],
  'eventtechnik-produktion': [MODULE, AREAS, STREAM, TURNIER],
  'creator-talent-activation': [STREAM, TURNIER],
  'scouting-talent-development': [TURNIER, PLATTFORM],
  'recruiting-employer-branding': [PLATTFORM, LANDING, TURNIER, AREAS]
};

export const moneyPagesFor = (serviceSlug: string) =>
  (SERVICE_MONEY_PAGES[serviceSlug] ?? [])
    .map((page) => MONEY_PAGES.find((m) => m.page === page))
    .filter((m): m is MoneyPageLink => Boolean(m));
