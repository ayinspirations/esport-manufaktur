import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  /** Still shown until the video element is mounted and has painted. */
  poster?: string;
  className?: string;
  'aria-label'?: string;
}

/** How far outside the viewport a tile starts fetching its video. */
const MOUNT_MARGIN = '300px 0px 300px 0px';

/**
 * A background video that does not exist until its tile is near the viewport,
 * and that only decodes while it is actually on screen.
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
 *
 * Mounting is only half of it, though. A mounted `autoPlay loop` video keeps
 * decoding forever, on- or off-screen, and this page mounts six of them: by
 * the time a visitor reached the contact form every case tile above was still
 * decoding 720p in the background, all of it composited but none of it
 * visible. That is what made scrolling stutter -- the decoders, not the
 * layout. So the observer is kept alive after the mount and drives
 * play/pause: exactly the videos that are on screen run, and the rest hold a
 * still frame at no cost. `once`-style unobserving is deliberately not used.
 *
 * The play threshold is the bare edge of the viewport while the mount
 * threshold reaches 300px past it, so a tile has its first frames buffered
 * before it is asked to play and starts without a stall.
 */
export const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  className = '',
  'aria-label': ariaLabel
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  // Tracked in a ref as well as state: the observer callback needs the current
  // value without being torn down and rebuilt every time it changes.
  const visibleRef = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Reduced motion: mount the element so its poster paints, but never start
    // playback. An always-looping background video is exactly the kind of
    // motion this setting is asking us to stop.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMounted(true);
      return;
    }

    const sync = () => {
      const video = videoRef.current;
      if (!video) return;
      if (visibleRef.current) {
        // play() rejects when the element is torn down mid-call or when
        // autoplay is refused. Neither is actionable and neither is an app
        // error, so it is swallowed rather than left to surface as an
        // unhandled rejection.
        void video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    };

    // Two observers, because they are watching for two different edges and one
    // observer cannot report both.
    //
    // A rootMargin inflates the root box, so an observer that carries one only
    // ever fires as the element crosses the *inflated* boundary -- 300px out.
    // It says nothing more when the element later crosses the real viewport
    // edge, because from its point of view nothing changed. Trying to serve
    // both from a single observer (reading boundingClientRect at callback time
    // to decide whether the element was also on screen) fails exactly there:
    // the only callback arrives while the tile is still 300px below the fold,
    // it reads "not visible", and no further callback ever comes to correct it.
    // Every video mounted and none of them ever played.
    const mountObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setMounted(true);
      },
      { threshold: 0, rootMargin: MOUNT_MARGIN }
    );

    // No rootMargin: this one tracks the actual viewport, so it fires exactly
    // when the tile arrives on screen and again when it leaves.
    const playObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibleRef.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );

    mountObserver.observe(el);
    playObserver.observe(el);

    // A backgrounded tab already throttles timers, but a paused-then-restored
    // tab can leave a video that was mid-play stalled. Re-syncing on
    // visibilitychange puts it back in step with what is actually on screen.
    const onVisibility = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      } else {
        sync();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      mountObserver.disconnect();
      playObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Re-run the play/pause decision once the element actually exists: the
  // observer's first callback usually fires before `mounted` has rendered a
  // <video> for it to act on.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !visibleRef.current) return;
    void video.play().catch(() => {});
  }, [mounted]);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none">
      {mounted && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          // No `autoPlay`: playback is driven by the observer above, and
          // leaving autoPlay on would hand the browser a second, competing
          // opinion about when this should run.
          preload="metadata"
          aria-label={ariaLabel}
          // Keeps a phone from offering to fling a decorative background loop
          // at the living-room TV.
          disableRemotePlayback
          className={className}
        />
      )}
    </div>
  );
};
