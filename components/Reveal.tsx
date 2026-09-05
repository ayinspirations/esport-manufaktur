import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { EASE_REVEAL_CSS, DUR } from './motion';

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
  /**
   * `data-*` attributes are forwarded to the rendered element. Until this was
   * added the wrapper swallowed them, which is an easy failure to miss: the
   * markup reads as if the attribute is set and the DOM never receives it.
   */
  [attr: `data-${string}`]: unknown;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.reveal,
  y = 24,
  as = 'div',
  ...rest
}) => {
  const { ref, inView } = useInView<HTMLElement>();

  return React.createElement(
    as,
    {
      ...rest,
      ref,
      className,
      style: {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}s ${EASE_REVEAL_CSS} ${delay}s, transform ${duration}s ${EASE_REVEAL_CSS} ${delay}s`
        // No `will-change` -- see RevealText's inner span. This wraps text as
        // often as it wraps boxes, and promoting text to its own compositing
        // layer is what clips ink that falls outside the layer bounds.
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
   * Sekunden zwischen zwei Einheiten. Standard ist 0: die ganze Zeile kommt
   * als eine Bewegung von unten herein, die Maske je Wort bleibt.
   *
   * Der Wort-fuer-Wort-Aufbau war einmal der Standard und ist an der
   * Hausschrift gescheitert. Die Ueberschriften hier sind kursiv, fett und
   * eng gesetzt; jedes Wort haengt nach rechts ueber. Kommen die Woerter
   * nacheinander an, steht der Ueberhang des einen neben der Luecke des
   * naechsten, und die Zeile bricht optisch auseinander, statt als Satz zu
   * landen. Ueber mehrere Zeilen liest sich derselbe Effekt als Text, der
   * Zeile fuer Zeile eintrudelt -- fuer einen Aufmacher genau falsch.
   *
   * Der Rhythmus zwischen zwei Zeilen kommt weiterhin ueber `delay`: erst
   * die Tinte, dann der Akzent. Das ist ein Takt, kein Aufbau.
   *
   * Ein Wert groeszer 0 ist damit die Ausnahme und braucht einen Grund.
   */
  stagger?: number;
  as?: React.ElementType;
}

/**
 * Masked build-in for display headlines: every unit starts fully below its own
 * clipping box and slides up into view, staggered. This is the effect that
 * makes a headline feel authored rather than faded in.
 *
 * The mask clips only its bottom edge (see below), so descenders, umlauts and
 * italic overhang all paint freely and line wrapping is untouched.
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
  stagger = 0,
  as = 'span'
}) => {
  const { ref, inView } = useInView<HTMLElement>();

  const lines = text.split('\n');
  const step = stagger;
  let unitIndex = 0;

  const mask = (content: React.ReactNode, key: string) => {
    const d = delay + unitIndex * step;
    unitIndex += 1;
    return (
      <span
        key={key}
        aria-hidden="true"
        // The reveal only ever needs to hide what sits BELOW the word, so the
        // mask clips one edge instead of all four.
        //
        // `overflow: hidden` clips every side, which meant padding each edge
        // to keep descenders, umlauts and the italic slant from being sliced.
        // That padding had to be cancelled by a negative margin, and the
        // negative margin is what broke line wrapping: layout measured each
        // word narrower than it paints, so a word at the end of a line was
        // treated as fitting and then painted past the container edge, where
        // an ancestor's overflow clipped it.
        //
        // clip-path cuts only at the bottom. The other three insets are
        // negative, so the glyph paints freely upward and sideways, and no
        // padding or margin trickery is involved at all.
        //
        // They are -100% rather than a tuned em value on purpose. How far a
        // glyph paints outside its box depends on the font: an italic's slant,
        // a diacritic's height and an overshooting round all differ per
        // typeface, and the display face here is a webfont. -100% of the box
        // on each free side is far past anything a text face can produce, so
        // there is no value left to get wrong. Only the bottom edge, the one
        // doing the actual work, is a real measurement.
        style={{ clipPath: 'inset(-100% -100% -0.14em -100%)' }}
        className="inline-block align-bottom"
      >
        <span
          className="inline-block"
          style={{
            // 130% rather than 110%: the mask's bottom edge is cut slightly
            // below the box so descenders survive, and the resting position
            // has to clear that gap or a sliver of the word shows through
            // before the reveal starts.
            transform: inView ? 'translateY(0)' : 'translateY(130%)',
            opacity: inView ? 1 : 0,
            transition: `transform ${duration}s ${EASE_REVEAL_CSS} ${d}s, opacity ${duration}s ${EASE_REVEAL_CSS} ${d}s`
            // Deliberately no `will-change` here.
            //
            // It promotes each word to its own compositing layer, and a
            // composited layer is rasterised to its own bounds -- ink that
            // falls outside them, which is exactly what an italic's slant
            // produces at the end of a word, can be dropped. That artefact
            // only appears on a GPU-composited browser, which is why the
            // headings looked clipped in the real browser while rendering
            // byte-identical here with and without the mask.
            //
            // These are a handful of short-lived transitions on text, so the
            // hint bought nothing measurable to begin with.
          }}
        >
          {content}
        </span>
      </span>
    );
  };

  // -------------------------------------------------------------------------
  // Kursiv wird nicht in Woerter zerlegt, sondern in Zeilen
  // -------------------------------------------------------------------------
  // Der Aufbau zerschneidet eine Zeile sonst in ein inline-block je Wort. Bei
  // aufrechter Schrift ist das folgenlos; beim kursiven Schnitt nicht. Jedes
  // Wort haengt nach rechts aus seinem Kasten heraus, der Umbruch rechnet aber
  // mit dem Kasten: das letzte Wort einer Zeile gilt als passend und wird dann
  // ueber den Rand hinaus gemalt, wo der naechste Container es abschneidet.
  // Steht die Zeile still, stimmt alles wieder -- der Fehler gehoert allein
  // dem Moment des Erscheinens, und genau der ist das Erste, was jemand sieht.
  //
  // Dagegen hilft kein besserer Zuschnitt der Maske: solange die Zeile aus
  // Kaesten besteht, rechnet der Umbruch mit Kaesten. Die Maske sitzt deshalb
  // eine Ebene hoeher -- um die ganze Zeile statt um jedes Wort. Innen steht
  // gewoehnlicher Fliesztext, der umbricht wie jeder andere auch, und darum
  // ein Kasten, der unten abschneidet. Die Bewegung bleibt damit exakt die
  // von vorher: die Zeile faehrt hinter ihrer eigenen Unterkante hervor nach
  // oben, nur eben als ein Stueck.
  //
  // Die Regel greift ueber die Klasse, nicht ueber ein Extra-Attribut: was
  // `italic` traegt, faehrt als Zeile herein. Damit gilt sie auch fuer jede
  // kursive Ueberschrift, die es hier noch nicht gibt.
  // -------------------------------------------------------------------------
  if (/(^|\s)italic(\s|$)/.test(className)) {
    return React.createElement(
      as,
      { ref, className },
      lines.map((line, li) => (
        <span
          key={`l-${li}`}
          className="block"
          // Schneidet nur unten. Die drei anderen Seiten stehen auf -100%,
          // damit Oberlaengen, Umlaute und der kursive Ueberhang frei malen.
          style={{ clipPath: 'inset(-100% -100% -0.14em -100%)' }}
        >
          <span
            className="block"
            style={{
              transform: inView ? 'translateY(0)' : 'translateY(115%)',
              opacity: inView ? 1 : 0,
              transition: `transform ${duration}s ${EASE_REVEAL_CSS} ${delay}s, opacity ${duration}s ${EASE_REVEAL_CSS} ${delay}s`
            }}
          >
            {line}
          </span>
        </span>
      ))
    );
  }

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
  // `will-change` is a promise about the near future, and this one is kept
  // only until the tilt has landed.
  //
  // Unlike the two reveals above, this one does need it: it animates a 3D
  // rotation on a large media surface, and without the hint the first frame
  // is where the layer gets rasterised, which is exactly where the animation
  // can least afford it. But it was being left on afterwards, permanently, on
  // every tilted tile on the page -- and a standing `will-change: transform`
  // is a compositor layer held open for good, with the GPU memory and the
  // extra composite pass that implies, for an animation that ran once and is
  // never replayed.
  const [settled, setSettled] = useState(false);

  return (
    <div ref={ref} style={{ perspective: '1200px' }} className={className}>
      <div
        className={innerClassName}
        onTransitionEnd={() => setSettled(true)}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView
            ? 'rotateX(0deg) translateY(0)'
            : `rotateX(${rotate}deg) translateY(${y}px)`,
          transformOrigin: '50% 100%',
          transition: `opacity ${duration}s ${EASE_REVEAL_CSS} ${delay}s, transform ${duration}s ${EASE_REVEAL_CSS} ${delay}s`,
          willChange: settled ? undefined : 'transform, opacity'
        }}
      >
        {children}
      </div>
    </div>
  );
};
