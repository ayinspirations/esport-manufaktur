import React from 'react';
import { useInView } from '../hooks/useInView';
import { EASE_REVEAL_CSS, DUR, STAGGER } from './motion';

// ---------------------------------------------------------------------------
// Scroll-reveal primitives
// ---------------------------------------------------------------------------
// Three shapes of reveal, one timing vocabulary (see motion.ts):
//
//   <Reveal>      fade + rise. The default for anything that isn't special.
//   <RevealText>  masked word/character build for display headlines.
//   <RevealTilt>  3D "sheet laying flat" for large media surfaces.
//
// All three fire once on entry and never replay on scroll-back, and all three
// resolve instantly to their final state under prefers-reduced-motion --
// handled inside useInView, which reports inView immediately in that case.
// ---------------------------------------------------------------------------

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds -- e.g. i * STAGGER.card for a grid. */
  delay?: number;
  /** Transition duration in seconds. */
  duration?: number;
  /** Starting vertical offset in px, resolves to 0. */
  y?: number;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.reveal,
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
        transition: `opacity ${duration}s ${EASE_REVEAL_CSS} ${delay}s, transform ${duration}s ${EASE_REVEAL_CSS} ${delay}s`,
        willChange: 'transform, opacity'
      }
    },
    children
  );
};

// ---------------------------------------------------------------------------

interface RevealTextProps {
  /** Plain text. Use \n to force a line break -- each line masks separately. */
  text: string;
  /**
   * Split granularity. Words are the safe default and what every headline on
   * the site uses.
   *
   * 'char' puts each glyph in its own inline-block, which has two costs:
   * kerning pairs between adjacent glyphs are lost, and any slanted glyph
   * leans out of its own box and collides with the next one. On the display
   * headlines here -- italic, uppercase, tracking-tighter -- that produced
   * visibly overlapping letters ("SERVICES." colliding at the V/I pair).
   *
   * Only reach for 'char' on upright text at normal tracking.
   */
  by?: 'word' | 'char';
  className?: string;
  /** Delay before the first unit starts, in seconds. */
  delay?: number;
  duration?: number;
  /**
   * Seconds between units. Defaults to the shared per-word/per-character step.
   *
   * Pass 0 to move the whole string as one gesture while keeping the masked
   * slide-up. On a headline that wraps over several lines the default stagger
   * reads as the text arriving line by line, which is wrong for a hero -- the
   * statement should land in one piece.
   */
  stagger?: number;
  as?: React.ElementType;
}

/**
 * Masked build-in for display headlines: every unit starts fully below its own
 * clipping box and slides up into view, staggered. This is the effect that
 * makes a headline feel authored rather than faded in.
 *
 * The mask carries a little vertical padding (offset by an equal negative
 * margin) so descenders in g/j/p/y are not clipped by `overflow: hidden`.
 *
 * Accessibility: the full string stays on the wrapper as aria-label and every
 * split fragment is aria-hidden, so assistive tech reads one clean sentence
 * instead of a stream of loose characters.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  text,
  by = 'word',
  className = '',
  delay = 0,
  duration = DUR.slow,
  stagger,
  as = 'span'
}) => {
  const { ref, inView } = useInView<HTMLElement>();

  const lines = text.split('\n');
  const step = stagger ?? (by === 'char' ? STAGGER.char : STAGGER.word);
  let unitIndex = 0;

  const mask = (content: React.ReactNode, key: string) => {
    const d = delay + unitIndex * step;
    unitIndex += 1;
    return (
      <span
        key={key}
        aria-hidden="true"
        // The mask clips on both axes, so it needs breathing room on both.
        // Vertical padding keeps descenders (g/j/p/y) off the bottom edge.
        // Horizontal padding is for italics: a slanted glyph leans past its
        // own advance width, and without this the last letter of an italic
        // word is sliced off (visible on the case-study headings). Each pad
        // is cancelled by an equal negative margin, so layout is unchanged.
        className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] px-[0.14em] -mx-[0.14em]"
      >
        <span
          className="inline-block"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(110%)',
            opacity: inView ? 1 : 0,
            transition: `transform ${duration}s ${EASE_REVEAL_CSS} ${d}s, opacity ${duration}s ${EASE_REVEAL_CSS} ${d}s`,
            willChange: 'transform, opacity'
          }}
        >
          {content}
        </span>
      </span>
    );
  };

  return React.createElement(
    as,
    { ref, className, 'aria-label': text.replace(/\n/g, ' ') },
    lines.map((line, li) => (
      <span key={`l-${li}`} className="block">
        {line.split(' ').map((word, wi, arr) => (
          <React.Fragment key={`w-${li}-${wi}`}>
            {by === 'char'
              ? // Keep the word itself unbroken so it can never wrap mid-word;
                // only the characters inside it animate individually.
                <span className="inline-block whitespace-nowrap">
                  {word.split('').map((ch, ci) => mask(ch, `c-${li}-${wi}-${ci}`))}
                </span>
              : mask(word, `w-${li}-${wi}`)}
            {wi < arr.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </span>
    ))
  );
};

// ---------------------------------------------------------------------------

interface RevealTiltProps {
  children: React.ReactNode;
  className?: string;
  /** Classes for the inner transformed box -- needed when the child must
      inherit a height from the wrapper (e.g. `h-full w-full` inside a grid
      cell), since the perspective wrapper adds one level of nesting. */
  innerClassName?: string;
  delay?: number;
  duration?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Starting X rotation in degrees (negative tips the top away from you). */
  rotate?: number;
}

/**
 * The "sheet laying flat" reveal: the element starts tipped back in 3D and
 * below its resting place, then rights itself onto the page.
 *
 * Deliberately toned down from the reference (which uses -60deg / 300px):
 * at full strength on a page this dense the effect becomes seasick. Both
 * values are props, so a genuinely large hero surface can opt into the
 * full-strength version.
 *
 * Reserve this for large media -- case tiles, full-bleed images. Used on small
 * cards it reads as noise, and it stops being a special moment.
 */
export const RevealTilt: React.FC<RevealTiltProps> = ({
  children,
  className = '',
  innerClassName = '',
  delay = 0,
  duration = DUR.slow,
  y = 160,
  rotate = -48
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} style={{ perspective: '1200px' }} className={className}>
      <div
        className={innerClassName}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView
            ? 'rotateX(0deg) translateY(0)'
            : `rotateX(${rotate}deg) translateY(${y}px)`,
          transformOrigin: '50% 100%',
          transition: `opacity ${duration}s ${EASE_REVEAL_CSS} ${delay}s, transform ${duration}s ${EASE_REVEAL_CSS} ${delay}s`,
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </div>
    </div>
  );
};
