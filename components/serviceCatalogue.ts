// ---------------------------------------------------------------------------
// The service catalogue
// ---------------------------------------------------------------------------
// One list, and the only place that decides which services exist, what they
// are called, what order they appear in, and which four of them are the
// pillars shown on the homepage.
//
// It deliberately holds no page copy. The router needs this list on every
// single page load, while the copy for a service -- headline, Leistungen,
// Vorgehen, FAQ -- is only needed once someone actually opens the services
// page. Keeping the two apart is what stops ~30 kB of body text riding along
// in the entry bundle; `servicesContent` imports from here, never the reverse.
//
// To add a service: add an entry here, then add the matching entry in
// `servicesContent.ts`. That file asserts in development that the two lists
// agree, so a half-finished addition is caught immediately rather than
// rendering a blank page.

export interface ServiceListing {
  slug: string;
  /** Short label. Used on the homepage tile and on the filter pill. */
  title: string;
  /**
   * One of the four pillars the homepage shows. The rest are reachable only
   * through the filter on the services page.
   */
  pillar?: boolean;
  /**
   * Artwork for the homepage tile.
   *
   * ---- DROP YOUR GRAPHICS IN HERE ----
   * Put the file in `public/images/services/` and set the path below, e.g.
   *   tileImage: '/images/services/strategie-konzeption.svg'
   * Anything the browser can render works (SVG, WebP, JPG, PNG). The tiles are
   * portrait, 3:4, and are shown at roughly 340x450 CSS px on a desktop grid,
   * so 680x900 covers a 2x screen.
   *
   * Left undefined, the tile renders a clearly-marked branded placeholder
   * instead -- nothing breaks, and it is obvious at a glance which artwork is
   * still outstanding.
   */
  tileImage?: string;
  /** Alt text for `tileImage`. Required whenever a tileImage is set. */
  tileImageAlt?: string;
  /**
   * One-sentence summary, shown on the homepage tile. Only the four pillars
   * need one -- they are the only services the homepage shows.
   */
  tagline?: string;
}

export const services: ServiceListing[] = [
  // -- The four pillars, in the order they appear on the homepage ------------
  //
  // Two of these labels no longer match their slug: "Events & Erlebniswelten"
  // is now shown as "Markenaktivierung & Events" and "Digitale Lösungen" as
  // "Gamification & digitale Lösungen". Deliberate -- the slugs are indexed
  // and linked, and renaming a label is not worth moving a URL for. `title` is
  // what the site shows, the slug is only its address.
  {
    slug: 'strategie-konzeption',
    title: 'Strategie & Konzeption',
    pillar: true,
    tagline:
      'Wir entwickeln Aktivierungsstrategien und kreative Leitideen, die Marke, Zielgruppe und Kommunikationsziel präzise miteinander verbinden – mit klaren KPIs von Anfang an.'
  },
  {
    slug: 'events-erlebniswelten',
    title: 'Markenaktivierung & Events',
    pillar: true,
    tagline:
      'Vom interaktiven Messetool bis zur vollständigen Erlebniswelt: Wir konzipieren und realisieren Formate, die Menschen ins Mitmachen bringen und nachhaltig in Erinnerung bleiben.'
  },
  {
    slug: 'digitale-loesungen',
    title: 'Gamification & digitale Lösungen',
    pillar: true,
    tagline:
      'White-Label-Plattformen, Eventpässe, Games, Challenges und Turniersysteme – individuell anpassbar, modular skalierbar und DSGVO-konform.'
  },
  {
    slug: 'content-live-kommunikation',
    title: 'Content & Live-Kommunikation',
    pillar: true,
    tagline:
      'Streams, Showformate, Creator-Aktivierungen sowie Foto- und Videocontent, die Erlebnisse verlängern, Reichweite schaffen und Communities authentisch erreichen.'
  },

  // -- Everything else, reachable through the filter -------------------------
  { slug: 'eventtechnik-produktion', title: 'Eventtechnik & Produktion' },
  { slug: 'art-design-messebau', title: 'Art Design & Messebau' },
  { slug: 'foto-video', title: 'Foto & Video' },
  { slug: 'creator-talent-activation', title: 'Creator & Talent Activation' },
  { slug: 'scouting-talent-development', title: 'Scouting & Talent Development' },
  { slug: 'recruiting-employer-branding', title: 'Recruiting & Employer Branding' }
];

/** Every slug, in catalogue order. The router's copy of the list. */
export const serviceSlugs = services.map((s) => s.slug);

/** The four shown on the homepage. */
export const pillars = services.filter((s) => s.pillar);

/**
 * Slugs these pages used to live under, kept working after the rename.
 *
 * "Messen & Events" became "Events & Erlebniswelten" and "Content & Streaming"
 * became "Content & Live-Kommunikation", so their slugs moved with them. These
 * URLs are indexed and were linked from the homepage for months; the router
 * resolves them to the current slug rather than dropping anyone on a 404.
 * netlify.toml also 301s them at the edge, so a crawler is told properly that
 * the address changed instead of inferring it from a client-side rewrite.
 */
export const legacySlugAliases: Record<string, string> = {
  'messen-events': 'events-erlebniswelten',
  'content-streaming': 'content-live-kommunikation'
};

/** Resolves a slug from the URL, following a rename if there was one. */
export const resolveServiceSlug = (raw: string): string | undefined => {
  const slug = legacySlugAliases[raw] ?? raw;
  return serviceSlugs.includes(slug) ? slug : undefined;
};
