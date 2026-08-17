// ---------------------------------------------------------------------------
// Motion design system
// ---------------------------------------------------------------------------
// One vocabulary for the whole site. Before this file, each section invented
// its own timing -- some used Framer Motion's whileInView, some a bare
// IntersectionObserver, some nothing at all -- so the polish of the hero
// intro was never carried through the rest of the page.
//
// The model is two clearly separated registers:
//
//   CONTENT   slow, calm, plays once, never replays on scroll-back.
//             Headlines, paragraphs, cards, images.
//
//   INTERACT  fast and springy. Hover, press, arrows, CTAs.
//             The overshoot is what makes controls feel physical.
//
// Keeping those registers apart is the point. When reveals and hovers share
// one curve, everything reads as the same soft mush; when they differ, the
// page feels authored.
// ---------------------------------------------------------------------------

/** Calm ease-out-expo. Content reveals, page-load beats. */
export const EASE_REVEAL = [0.16, 1, 0.3, 1] as const;
export const EASE_REVEAL_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Springy, slightly overshooting. Interactive elements only. */
export const EASE_SPRING = [0.67, 0.13, 0.14, 1.04] as const;
export const EASE_SPRING_CSS = 'cubic-bezier(0.67, 0.13, 0.14, 1.04)';

/** Durations in seconds. */
export const DUR = {
  micro: 0.15,    // underlines, colour swaps
  interact: 0.3,  // hover lifts, arrow nudges, icon swaps
  reveal: 0.75,   // standard content reveal
  slow: 1.1,      // large surfaces, hero-scale moments
} as const;

/** Stagger steps in seconds. */
export const STAGGER = {
  char: 0.028,  // per character in a split headline
  word: 0.055,  // per word in a split headline
  line: 0.09,   // per line / paragraph block
  card: 0.08,   // per card in a grid or carousel
} as const;

/**
 * True when the visitor asked for reduced motion. Every primitive in
 * Reveal.tsx checks this and resolves straight to the final state.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Shared viewport config for Framer Motion `whileInView`. `once: true` is
 * deliberate -- reveals that replay every time you scroll back up read as a
 * gimmick, not as craft.
 */
export const VIEWPORT_ONCE = { once: true, margin: '-100px' } as const;
