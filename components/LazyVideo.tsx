import React from 'react';
import { useInView } from '../hooks/useInView';

interface LazyVideoProps {
  src: string;
  /** Still shown until the video element is mounted and has painted. */
  poster?: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * A background video that does not exist until its tile is near the viewport.
 *
 * `preload="none"` is not enough on its own: `autoPlay` makes the browser
 * fetch the file anyway, so every video on the page downloaded during the
 * initial load. On this site that was 91 MB before the visitor had scrolled
 * anywhere -- and three of those files downloaded twice over, because the
 * mobile carousel and the desktop grid are both in the DOM with only CSS
 * hiding one of them, so both copies loaded.
 *
 * Mounting the <video> only once its wrapper is in view fixes both: offscreen
 * tiles never request anything, and a `display: none` layout never intersects,
 * so the hidden duplicate never loads either.
 *
 * rootMargin starts the fetch shortly before the tile arrives, so the video is
 * usually playing by the time it is actually looked at.
 */
export const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  className = '',
  'aria-label': ariaLabel
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.01,
    rootMargin: '300px 0px 300px 0px'
  });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      {inView && (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={ariaLabel}
          className={className}
        />
      )}
    </div>
  );
};
