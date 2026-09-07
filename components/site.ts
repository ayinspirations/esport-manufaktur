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
