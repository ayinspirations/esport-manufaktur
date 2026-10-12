// ---------------------------------------------------------------------------
// Die Money Pages und wo sie verlinkt werden
// ---------------------------------------------------------------------------
// Eine neue Money Page kommt hier einmal dazu; die Leistungsseite zeigt sie
// dann als dunkle Kachel unter den Services.
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
    page: 'gaming-esport-dienstleister',
    eyebrow: 'Dienstleistung',
    title: 'Gaming & eSport Dienstleister',
    text: 'Hardware, Gaming-Flächen, Personal, Turnierdurchführung, Technik und Plattform – vom einzelnen Modul bis zur kompletten Umsetzung.'
  },
  {
    page: 'gaming-dienstleister-fuer-agenturen',
    eyebrow: 'Agenturen',
    title: 'Gaming Dienstleister für Agenturen',
    text: 'Gaming-Know-how für eure Brand-Kunden: Strategie, Pitch-Support, Events, Gamification und Technologie – partnerschaftlich und White-Label-fähig.'
  },
  {
    page: 'teambuilding-gaming-esport',
    eyebrow: 'Teambuilding',
    title: 'Teambuilding mit Gaming & eSport',
    text: 'Moderierte Gaming-Teambuildings für Unternehmen – von Rocket League und EA SPORTS FC bis Gaming Night und Hybrid Challenge.'
  },
  {
    page: 'gaming-esport-betriebssport',
    eyebrow: 'Corporate Gaming',
    title: 'Gaming & eSport als Betriebssport',
    text: 'Gaming-Community, interne Liga oder Corporate eSport Team – wir entwickeln mit dir das passende Corporate-Gaming-Konzept.'
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

/** Gruppen der Uebersichtsseite /loesungen -- nach Zielgruppe, nicht nach Technik. */
export const SOLUTION_GROUPS: { title: string; pages: string[] }[] = [
  { title: 'Für Unternehmen & HR', pages: ['teambuilding-gaming-esport', 'gaming-esport-betriebssport'] },
  { title: 'Für Marken & Agenturen', pages: ['gaming-esport-dienstleister', 'gaming-dienstleister-fuer-agenturen'] },
  { title: 'eSport-Turniere', pages: ['esport-turnier-organisieren', 'white-label-turnierplattform'] }
];

/**
 * "Passend dazu": welche Money Pages unter einer Seite verlinkt werden.
 * Schluessel sind Money Pages, Best-Case-Slugs und Service-Slugs. Die Links
 * aus dem Inhalt ersetzen die lange Liste im Footer.
 */
export const RELATED_SOLUTIONS: Record<string, string[]> = {
  // Money Pages untereinander
  'esport-turnier-organisieren': ['white-label-turnierplattform', 'gaming-esport-dienstleister'],
  'white-label-turnierplattform': ['esport-turnier-organisieren', 'gaming-dienstleister-fuer-agenturen'],
  'gaming-esport-dienstleister': ['gaming-dienstleister-fuer-agenturen', 'esport-turnier-organisieren'],
  'gaming-dienstleister-fuer-agenturen': ['gaming-esport-dienstleister', 'white-label-turnierplattform'],
  'teambuilding-gaming-esport': ['gaming-esport-betriebssport', 'esport-turnier-organisieren'],
  'gaming-esport-betriebssport': ['teambuilding-gaming-esport', 'esport-turnier-organisieren'],
  // Best Cases
  tsystems: ['esport-turnier-organisieren', 'white-label-turnierplattform'],
  hagebau: ['gaming-esport-dienstleister', 'teambuilding-gaming-esport'],
  'showdown-0711': ['esport-turnier-organisieren', 'white-label-turnierplattform'],
  'bayern-zockt': ['white-label-turnierplattform', 'esport-turnier-organisieren'],
  bfv: ['white-label-turnierplattform', 'esport-turnier-organisieren'],
  intersport: ['gaming-esport-dienstleister', 'gaming-dienstleister-fuer-agenturen'],
  rewe: ['esport-turnier-organisieren', 'gaming-esport-dienstleister'],
  'xp-days': ['teambuilding-gaming-esport', 'gaming-esport-betriebssport'],
  dekra: ['gaming-esport-dienstleister', 'gaming-dienstleister-fuer-agenturen'],
  interwetten: ['gaming-esport-dienstleister', 'gaming-dienstleister-fuer-agenturen'],
  consumenta: ['gaming-dienstleister-fuer-agenturen', 'gaming-esport-dienstleister'],
  'vfb-stuttgart': ['gaming-esport-dienstleister', 'esport-turnier-organisieren'],
  // Leistungen (/services/<slug>)
  'strategie-konzeption': ['gaming-esport-dienstleister', 'gaming-dienstleister-fuer-agenturen'],
  'events-erlebniswelten': ['esport-turnier-organisieren', 'teambuilding-gaming-esport'],
  'digitale-loesungen': ['white-label-turnierplattform', 'esport-turnier-organisieren'],
  'content-live-kommunikation': ['gaming-dienstleister-fuer-agenturen', 'esport-turnier-organisieren'],
  'eventtechnik-produktion': ['esport-turnier-organisieren', 'gaming-esport-dienstleister'],
  'art-design-messebau': ['gaming-esport-dienstleister', 'gaming-dienstleister-fuer-agenturen'],
  'foto-video': ['gaming-dienstleister-fuer-agenturen', 'gaming-esport-dienstleister'],
  'creator-talent-activation': ['gaming-dienstleister-fuer-agenturen', 'esport-turnier-organisieren'],
  'scouting-talent-development': ['gaming-esport-betriebssport', 'esport-turnier-organisieren'],
  'recruiting-employer-branding': ['teambuilding-gaming-esport', 'gaming-esport-betriebssport']
};
