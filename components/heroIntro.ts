// Shared premium entrance timing between Hero.tsx (GSAP timeline) and
// Navbar.tsx (Framer Motion), so the nav's own fade-in reads as one beat of
// the same choreographed sequence rather than a separate animation.
export const HERO_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

// Nav arrives early -- Phase 2 of the intro, well before the headline lands.
export const HERO_NAV_DELAY = 0.1;
export const HERO_NAV_DURATION = 0.85;

// Kept in sync with the CTA beat inside Hero.tsx's GSAP timeline.
export const HERO_CTA_DELAY = 2.0;
export const HERO_CTA_DURATION = 0.65;
