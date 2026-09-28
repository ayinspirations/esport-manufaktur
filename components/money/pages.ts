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

export const MONEY_PAGES: MoneyPageLink[] = [
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
    page: 'livestreams',
    eyebrow: 'Livestreams',
    title: 'Livestreams in TV-Qualität',
    text: 'Professionelles Livestreaming für eSport & Gaming Events – vor Ort oder online, mit eigener Technik, Regie und Moderation.'
  }
];

const TURNIER = 'esport-turnier-organisieren';
const PLATTFORM = 'white-label-turnierplattform';
const STREAM = 'livestreams';

/** Service-Slug -> passende Money Pages. Services ohne Eintrag zeigen keinen Block. */
export const SERVICE_MONEY_PAGES: Record<string, string[]> = {
  'strategie-konzeption': [TURNIER, PLATTFORM],
  'events-erlebniswelten': [TURNIER, PLATTFORM, STREAM],
  'digitale-loesungen': [PLATTFORM, TURNIER],
  'content-live-kommunikation': [STREAM, TURNIER],
  'eventtechnik-produktion': [STREAM, TURNIER],
  'creator-talent-activation': [STREAM, TURNIER],
  'scouting-talent-development': [TURNIER, PLATTFORM],
  'recruiting-employer-branding': [PLATTFORM, TURNIER]
};

export const moneyPagesFor = (serviceSlug: string) =>
  (SERVICE_MONEY_PAGES[serviceSlug] ?? [])
    .map((page) => MONEY_PAGES.find((m) => m.page === page))
    .filter((m): m is MoneyPageLink => Boolean(m));
