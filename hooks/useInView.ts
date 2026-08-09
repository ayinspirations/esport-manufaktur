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
