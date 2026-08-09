export const HERO_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
// Kept in sync with the GSAP timeline in Hero.tsx: the CTA row (`.hero-cta`)
// starts its own fade-in at this offset (seconds) into the hero timeline, so
// Navbar's separate framer-motion fade-in fires at the same moment.
export const HERO_NAV_CTA_DELAY = 4.35;
export const HERO_NAV_CTA_DURATION = 0.9;
