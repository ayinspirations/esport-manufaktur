import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export type NavGround = 'light' | 'dark';

/**
 * Optional override. Put `data-nav-ground="dark"` (or `"light"`) on anything
 * the detection below reads wrongly -- a light photograph on a dark section,
 * say. Nothing needs it by default; the probe works these out on its own.
 */
export const NAV_GROUND_ATTR = 'data-nav-ground';

/** Relative luminance, sRGB. */
const luminance = (r: number, g: number, b: number) => {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

/**
 * What tone is painted at one point, or null if this element paints nothing
 * there and the one behind it should be asked instead.
 */
const toneOf = (el: Element): NavGround | null => {
  const override = el.closest(`[${NAV_GROUND_ATTR}]`);
  if (override) {
    const value = override.getAttribute(NAV_GROUND_ATTR);
    if (value === 'dark' || value === 'light') return value;
  }

  // Photographs, video and canvases: no colour to sample, and every one of
  // them on this site is dark or dark-overlaid. Treated as dark rather than
  // guessed at.
  if (/^(IMG|VIDEO|CANVAS|SVG)$/.test(el.tagName)) return 'dark';

  const cs = getComputedStyle(el);
  // A background image is a gradient or a photo; same reasoning as above.
  if (cs.backgroundImage && cs.backgroundImage !== 'none') return 'dark';

  const match = cs.backgroundColor.match(/[\d.]+/g);
  if (!match) return null;
  const [r, g, b] = match.map(Number);
  const alpha = match.length > 3 ? Number(match[3]) : 1;
  // Anything this sheer is a tint over whatever is behind it, not a ground of
  // its own -- keep walking rather than judging the page by a 4% overlay.
  if (alpha < 0.85) return null;

  return luminance(r, g, b) > 0.45 ? 'light' : 'dark';
};

/**
 * Reports whether the nav bar is currently over a dark backdrop or a light
 * one, so it can carry glass and text that suit what is behind it.
 *
 * It hit-tests three points across the bar and reads the first thing that
 * actually paints at each, so it needs no map of the page and keeps working on
 * routes it has never seen. It follows the real backdrop rather than the
 * section: the dark tiles inside the light sections pass behind the bar
 * constantly, and once the glass became thin enough to see through, they stop
 * being something the veil can paper over -- ink text on an unlifted dark tile
 * is unreadable. The bar has to answer to what is actually there.
 *
 * Majority of three rather than first-dark-wins, so a tile clipping one end of
 * the bar does not flip the whole thing; it takes half the width to count.
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

      let dark = 0;
      for (const x of xs) {
        for (const el of document.elementsFromPoint(x, y)) {
          if (bar.contains(el)) continue;
          const tone = toneOf(el);
          if (tone) {
            if (tone === 'dark') dark++;
            break;
          }
        }
      }

      setGround(dark >= 2 ? 'dark' : 'light');
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
