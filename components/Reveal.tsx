import React from 'react';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds -- e.g. i * 0.1 for a card grid. */
  delay?: number;
  /** Transition duration in seconds, 0.6-0.8 per the design spec. */
  duration?: number;
  /** Starting vertical offset in px, resolves to 0. */
  y?: number;
  as?: React.ElementType;
}

// Single shared scroll-reveal primitive for the service detail pages:
// fade + slide-up on viewport entry, apple-style ease-out-expo, no library
// overhead beyond the IntersectionObserver hook. Every section and every
// staggered card across all 4 pages goes through this one component so the
// motion language stays identical everywhere instead of being rebuilt per
// page.
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  y = 24,
  as = 'div'
}) => {
  const { ref, inView } = useInView<HTMLElement>();

  return React.createElement(
    as,
    {
      ref,
      className,
      style: {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: 'transform, opacity'
      }
    },
    children
  );
};
