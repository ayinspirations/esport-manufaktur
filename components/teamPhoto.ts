// ---------------------------------------------------------------------------
// Das Teamfoto, in den Groeszen, in denen es gebraucht wird
// ---------------------------------------------------------------------------
// Die Aufnahme liegt als 4000 x 2667 grosze JPEG-Datei im Repository und wog
// 8,2 MB -- ausgeliefert an jeden Besucher, auch an das Telefon, das davon ein
// 356 Pixel breites Band zeigt. Das war mit Abstand der schwerste Brocken der
// Seite und allein groeszer als alle Videos zusammen.
//
// Dieselbe Aufnahme in drei Breiten als WebP: 37, 111 und 214 kB. Welche davon
// geladen wird, entscheidet der Browser anhand von `sizes` -- auf dem Telefon
// die kleinste, auf einem breiten Schirm die grosze.
//
// Das Original liegt weiterhin im Repository, aber unter `attached_assets/`
// statt unter `public/`: Vite kopiert `public/` unveraendert in den Build, das
// Original waere also weiter mit ausgeliefert worden -- 8,2 MB auf dem Server,
// die niemand mehr abruft. Als Quelle fuer neue Groeszen bleibt es erhalten.
export const TEAM_PHOTO = {
  src: '/team-1200.webp',
  srcSet: '/team-640.webp 640w, /team-1200.webp 1200w, /team-1920.webp 1920w',
  alt: 'Das Team der GG Manufaktur'
} as const;
