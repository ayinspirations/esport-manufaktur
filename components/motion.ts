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

/**
 * Calm ease-out-quart. Content reveals, page-load beats.
 *
 * This was an ease-out-expo (0.16, 1, 0.3, 1), which spends ~87% of its travel
 * in the first third of its time: however long the duration says, the movement
 * itself is over almost immediately and the rest of the curve is an invisible
 * crawl. That is what made the reveals read as snapping into place rather than
 * arriving. Quart keeps the soft landing but spreads the motion across the
 * whole duration, so a longer duration actually reads as slower.
 */
export const EASE_REVEAL = [0.22, 1, 0.36, 1] as const;
export const EASE_REVEAL_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** Springy, slightly overshooting. Interactive elements only. */
export const EASE_SPRING = [0.67, 0.13, 0.14, 1.04] as const;
export const EASE_SPRING_CSS = 'cubic-bezier(0.67, 0.13, 0.14, 1.04)';

/** Durations in seconds. */
// Both registers are unhurried now. They stay separate in *curve* -- hover
// keeps the springy overshoot, content keeps the calm quart -- but a hover
// that snapped in 0.3s next to a reveal that unfolds over a second read as
// two different websites. Half a second is still an immediate answer to the
// pointer; it just no longer arrives before the eye does.
export const DUR = {
  micro: 0.25,    // underlines, colour swaps
  interact: 0.5,  // hover lifts, arrow nudges, icon swaps
  panel: 0.55,    // panels and menus opening, view swaps
  reveal: 1.05,   // standard content reveal
  slow: 1.5,      // large surfaces, hero-scale moments
} as const;

/** Stagger steps in seconds. */
export const STAGGER = {
  char: 0.038,  // per character in a split headline
  word: 0.075,  // per word in a split headline
  line: 0.12,   // per line / paragraph block
  card: 0.11,   // per card in a grid or carousel
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

/**
 * Scrolls the window to `targetY` over a distance-aware duration.
 *
 * The browser's own `behavior: 'smooth'` runs for a fixed time no matter how
 * far it has to travel. Jumping from the hero to Best Cases is ~4700px, which
 * it covers in roughly half a second -- around 9000px/s, which reads as the
 * page being fired at you rather than scrolled. Scaling the duration with the
 * distance keeps short hops snappy and makes long ones legible.
 *
 * Returns immediately under prefers-reduced-motion, landing on the target.
 */
export function smoothScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;

  if (prefersReducedMotion() || Math.abs(distance) < 8) {
    window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
    return;
  }

  // ~1.6px per ms, clamped so a short hop still animates and a full-page
  // traverse never drags.
  const duration = Math.min(1500, Math.max(420, Math.abs(distance) / 1.6));
  // easeInOutCubic: symmetric acceleration and deceleration.
  //
  // Deliberately NOT the ease-out-expo used for reveals. That curve puts ~87%
  // of the travel into the first 30% of its time, which on a 4700px jump is
  // indistinguishable from the native behaviour this replaces -- the page
  // still appears to be fired at you. Scrolling wants an even pace with a
  // gentle start and a soft landing.
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  let start: number | null = null;
  const step = (now: number) => {
    if (start === null) start = now;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: startY + distance * ease(t), behavior: 'instant' as ScrollBehavior });
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Scrolls an element into view, honouring its `scroll-margin-top` so the
 * sticky navigation never lands on top of the thing you asked for.
 */
export function smoothScrollToElement(el: HTMLElement) {
  const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - offset);
}
