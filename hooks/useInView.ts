import { useEffect, useRef, useState } from 'react';

// Shared scroll-reveal primitive: IntersectionObserver-based, fires once,
// and resolves immediately (no animation) when the user prefers reduced
// motion. Used by <Reveal> so every section/card across the site's detail
// pages shares one observer implementation instead of each page rolling
// its own.
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/**
 * Like `useInView`, but it keeps watching: the flag goes back to false when the
 * element leaves the viewport again.
 *
 * For things that cost something continuously rather than once. The logo
 * marquee is the case this exists for -- it is a CSS transform animation on a
 * strip of ~56 images, and `useInView` unobserves after the first entry, so
 * once a visitor had scrolled past it the animation kept running (and kept the
 * compositor working on it) for the rest of the session, several screens above
 * whatever they were actually reading.
 *
 * Under prefers-reduced-motion this reports false permanently, so the caller
 * leaves the animation paused -- the opposite of `useInView`, whose job there
 * is to resolve reveals immediately.
 */
export function useInViewContinuous<T extends HTMLElement>(
  options?: IntersectionObserverInit,
  /**
   * What to report when the visitor prefers reduced motion, where this stops
   * observing entirely.
   *
   * `false` (the default) is right when the flag drives an animation -- the
   * marquee stays paused. Pass `true` when it drives whether *content* is
   * shown: the content then simply appears, which is what reduced motion asks
   * for, rather than becoming unreachable.
   */
  reducedMotionValue = false
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(reducedMotionValue);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
