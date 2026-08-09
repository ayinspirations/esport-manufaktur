// Shared premium entrance timing between Hero.tsx (GSAP timeline) and
// Navbar.tsx (Framer Motion), so the nav's own fade-in reads as one beat of
// the same choreographed sequence rather than a separate animation.
export const HERO_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

// Nav, subline, and both CTAs fade in together as one beat -- only once the
// full headline (including BEGEISTERN) has landed. Kept in sync with the
// group beat inside Hero.tsx's GSAP timeline.
export const HERO_GROUP_DELAY = 2.45;
export const HERO_GROUP_DURATION = 0.75;
