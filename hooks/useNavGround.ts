import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export type NavGround = 'light' | 'dark';

/**
 * The attribute that marks a section as a dark ground. Put it on the wrapper
 * of anything the nav has to cross that is dark enough to need white chrome
 * -- the hero, the dark panels, the photo headers on the case pages.
 *
 * Deliberately section-scale only. The dark *tiles* sitting inside the light
 * sections are not marked: they pass behind the bar constantly, and marking
 * them would leave the nav flipping tone every few hundred pixels of scroll.
 * The light glass stays legible over them anyway (~6:1 for the ink text),
 * which is what makes ignoring them safe rather than merely convenient.
 */
export const NAV_GROUND_ATTR = 'data-nav-ground';

/**
 * Reports whether the nav bar is currently sitting over a dark section or a
 * light one, so it can carry glass and text that suit what is behind it.
 *
 * It hit-tests three points across the bar rather than tracking scroll
 * offsets, so it needs no knowledge of the page's layout and keeps working on
 * routes it has never seen -- any section that marks itself dark is honoured.
 * A single dark hit wins: a bar straddling the seam between two sections gets
 * the treatment that stays readable over both.
 *
 * `refs` may hold several candidate bars (desktop, mobile); the first one
 * actually rendered at the current breakpoint is the one probed.
 */
export function useNavGround(
  refs: Array<RefObject<HTMLElement | null>>,
  active: boolean
): NavGround {
  const [ground, setGround] = useState<NavGround>('dark');

  // The individual refs are stable, but the array holding them is rebuilt on
  // every render. Reading it through a ref keeps the listeners from being torn
  // down and re-attached on each pass.
  const refsRef = useRef(refs);
  refsRef.current = refs;

  useEffect(() => {
    // Unscrolled the bar has no ground of its own -- it is a bare strip over
    // the hero -- so its chrome stays white regardless of what is below.
    if (!active) {
      setGround('dark');
      return;
    }

    let frame = 0;

    const probe = () => {
      frame = 0;
      const bar = refsRef.current
        .map((r) => r.current)
        .find((el) => el && el.getBoundingClientRect().width > 0);
      if (!bar) return;

      const rect = bar.getBoundingClientRect();
      const y = rect.top + rect.height / 2;
      const xs = [0.2, 0.5, 0.8].map((f) => rect.left + rect.width * f);

      const overDark = xs.some((x) =>
        document
          .elementsFromPoint(x, y)
          .some((el) => el.closest(`[${NAV_GROUND_ATTR}="dark"]`))
      );

      setGround(overDark ? 'dark' : 'light');
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(probe);
    };

    probe();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [active]);

  return ground;
}
