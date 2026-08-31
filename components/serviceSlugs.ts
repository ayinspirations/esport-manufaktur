// The four service subpages that have real pathnames (/services/<slug>).
//
// Kept in its own module, separate from `servicesContent`, because the router
// needs the *list* on every page load while the *content* -- ~17 kB of copy,
// FAQs and card decks for all four pages -- is only ever needed once one of
// them is actually opened. Importing the list from the content module meant
// the whole thing rode along in the entry bundle.
//
// `servicesContent` asserts against this list in development, so the two
// cannot drift apart unnoticed.
export const serviceSlugs = [
  'strategie-konzeption',
  'content-streaming',
  'messen-events',
  'digitale-loesungen'
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
