// Shared premium entrance timing between Hero.tsx (GSAP timeline) and
// Navbar.tsx (Framer Motion), so the nav's own fade-in reads as one beat of
// the same choreographed sequence rather than a separate animation.
export const HERO_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

// Nav, subline, and both CTAs fade in together as one beat -- only once the
// full headline (including BEGEISTERN) has landed. Kept in sync with the
// group beat inside Hero.tsx's GSAP timeline.
//
// The headline finishes at 2.375s: the per-character build starts at 0.75s,
// staggers 0.125s across the ten letters of BEGEISTERN (last one starts at
// 0.75 + 9 x 0.125 = 1.875s) and each character runs for 0.5s. The old value
// of 2.45 left a 0.075s gap, which reads as simultaneous -- the subline and
// CTAs appeared to race the headline rather than answer it. 2.75 leaves a
// clear beat of held headline before anything else moves.
export const HERO_GROUP_DELAY = 2.75;
export const HERO_GROUP_DURATION = 0.75;
