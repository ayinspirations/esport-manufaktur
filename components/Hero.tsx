
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { HERO_NAV_CTA_DELAY, HERO_NAV_CTA_DURATION } from './heroIntro';

interface HeroProps {
  scrollToSection?: (id: string) => void;
  onOpenBooking?: () => void;
}

type LetterSpec = { char: string; shift?: boolean; scramble?: string };

const buildWord = (
  word: string,
  opts?: { shiftIndices?: number[]; scrambleMap?: Record<number, string> }
): LetterSpec[] =>
  word.split('').map((char, i) => ({
    char,
    shift: opts?.shiftIndices?.includes(i),
    scramble: opts?.scrambleMap?.[i]
  }));

// "MENSCHEN" gets two letters that do a brief, subtle shift once the word has
// landed (Phase 3). "BEGEISTERN" gets two letters that briefly show a
// placeholder glyph before resolving into the real character (Phase 5).
const WIR = buildWord('WIR');
const WOLLEN = buildWord('WOLLEN');
const MENSCHEN = buildWord('MENSCHEN', { shiftIndices: [3, 6] });
const BEGEISTERN = buildWord('BEGEISTERN', { scrambleMap: { 2: '◆', 7: '△' } });

const WordLetters: React.FC<{ word: LetterSpec[]; wordClass: string; letterClassName?: string }> = ({
  word,
  wordClass,
  letterClassName = ''
}) => (
  <span className={`hero-word ${wordClass} inline-block`}>
    {word.map((letter, i) =>
      letter.scramble ? (
        <span key={i} className="hero-letter relative inline-block">
          <span
            className={`hero-real inline-block scale-0 ${letterClassName}`}
            style={{ transformOrigin: '50% 50%' }}
          >
            {letter.char}
          </span>
          <span
            className="hero-scramble absolute inset-0 flex items-center justify-center text-lime-300/80"
            style={{ transformOrigin: '50% 50%' }}
            aria-hidden="true"
          >
            {letter.scramble}
          </span>
        </span>
      ) : (
        <span
          key={i}
          className={`hero-letter inline-block ${letterClassName}${letter.shift ? ' hero-shift-letter' : ''}`}
        >
          {letter.char}
        </span>
      )
    )}
  </span>
);

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenBooking }) => {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion: skip the sequence entirely, land directly on the final state.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.hero-letter, .hero-begeistern-word, .hero-subtext, .hero-cta', { opacity: 1, x: 0, y: 0 });
        // Note: `scale` must not share a call with `clearProps` -- clearProps wipes the
        // inline transform *after* applying the rest of that same call's properties, so
        // combining them here would erase the scale:1 we just set and leave these letters
        // back at their CSS-default scale-0 (invisible).
        gsap.set('.hero-real', { scale: 1 });
        gsap.set('.hero-scramble, .hero-accent-symbol', { opacity: 0, display: 'none' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Phase 2 -- headline arrives word by word, letters staggered within each word.
        tl.from('.word-wir .hero-letter', { opacity: 0, y: 40, duration: 0.9, stagger: 0.045 }, 0.15)
          .from('.word-wollen .hero-letter', { opacity: 0, y: 40, duration: 0.9, stagger: 0.045 }, 0.45)
          .from('.word-menschen .hero-letter', { opacity: 0, y: 40, duration: 0.9, stagger: 0.045 }, 0.8)

          // Phase 3 -- two letters in MENSCHEN drift slightly and settle back.
          .to(
            '.hero-shift-letter',
            { x: -6, y: 6, opacity: 0.55, duration: 0.22, ease: 'power2.inOut', stagger: 0.06 },
            2.05
          )
          .to(
            '.hero-shift-letter',
            { x: 0, y: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut', stagger: 0.06 },
            2.3

          )

          // Phase 4 -- a small accent mark flares in between the words, then recedes
          // as BEGEISTERN takes over. Purely decorative, absolutely positioned so it
          // never affects text layout.
          .fromTo(
            '.hero-accent-symbol',
            { opacity: 0, scale: 0.4, rotate: -25 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'expo.out' },
            2.35
          )
          .to('.hero-accent-symbol', { opacity: 0, scale: 0.6, duration: 0.35, ease: 'power2.in' }, 2.85)

          // Phase 5 -- BEGEISTERN assembles; two letters resolve from a placeholder
          // glyph into their real character partway through.
          //
          // Note: each letter carries its own gradient/background-clip:text (rather
          // than one shared gradient on a wrapper around many nested letter spans) --
          // background-clip:text through several layers of animated inline-block
          // descendants renders unreliably, so every letter self-clips its own slice
          // of the same two-stop gradient instead. `.hero-begeistern-word` still gets
          // one quick opacity fade as the overall "the word arrives" beat; individual
          // letters only ever get transform-based motion (y / scale), never opacity,
          // to stay clear of that same rendering pitfall.
          .from('.hero-begeistern-word', { opacity: 0, duration: 0.6, ease: 'power2.out' }, 2.75)
          .from(
            '.word-begeistern .hero-letter',
            { y: 40, duration: 0.85, stagger: 0.05 },
            2.75
          )
          .to('.hero-scramble', { scale: 0, duration: 0.3, ease: 'power1.in', stagger: 0.08 }, 3.45)
          .to('.hero-real', { scale: 1, duration: 0.3, ease: 'power1.out', stagger: 0.08 }, 3.45)

          // Phase 6 -- subheadline and CTA follow, gently offset from one another.
          .from('.hero-subtext', { opacity: 0, y: 30, duration: 0.9 }, 4.15)
          .from('.hero-cta', { opacity: 0, y: 30, duration: HERO_NAV_CTA_DURATION }, HERO_NAV_CTA_DELAY);
      });
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} className="relative w-full min-h-[100dvh] overflow-hidden bg-[#020617] flex items-center justify-center">
      <style>{`
        .hero-letter, .hero-real, .hero-scramble, .hero-accent-symbol, .hero-begeistern-word, .hero-subtext, .hero-cta {
          will-change: transform, opacity;
        }
      `}</style>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" />

        {/* Corner glow -- full-bleed div (inset-0) so it can never leave a hard-edged gap
            at any breakpoint/height; the "concentrated in one corner, soft falloff" look
            comes purely from the gradient's own stops, not from sizing the box smaller
            than the section. No filter:blur() here on purpose -- blurring a large element
            is expensive to rasterize and was causing a visible flicker/pop on first paint
            on mobile Safari; the extra gradient stops below give an equally soft edge.
            Left fully static (no entrance animation) for the same reason -- opacity/
            filter transitions on this layer previously read as a flash/flicker. */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 16%, rgba(0,129,141,0.42) 0%, rgba(0,129,141,0.20) 26%, rgba(0,129,141,0.06) 46%, transparent 64%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />

        {/* Diagonal line pattern -- masked on both axes: fades in vertically (invisible at
            the very top/bottom, fully visible through the middle band) and horizontally
            (fades out toward the left edge of this box). Uses white-based alpha stops on
            purpose: a gradient between black and transparent can render as a luminance
            mask in some browsers (black ~= invisible regardless of alpha), which previously
            wiped the pattern out entirely instead of giving a controlled fade. White reads
            correctly as "visible" under both luminance and alpha mask semantics. */}
        <div
          className="absolute top-0 right-0 w-[75%] h-full opacity-60"
          style={{
            backgroundImage: `repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(20, 184, 166, 0.6) 38px, rgba(20, 184, 166, 0.6) 40px)`,
            maskImage: 'linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%), linear-gradient(to left, white 0%, white 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%), linear-gradient(to left, white 0%, white 60%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in'
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 flex flex-col items-center text-center">
        <h1
          aria-label="Wir wollen Menschen begeistern"
          className="text-[12vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[82px] xl:text-[100px] font-black text-white leading-[0.95] tracking-tighter"
        >
          <WordLetters word={WIR} wordClass="word-wir" />{' '}
          <WordLetters word={WOLLEN} wordClass="word-wollen" />
          <br />
          <WordLetters word={MENSCHEN} wordClass="word-menschen" />
          <br />
          <span className="relative inline-block">
            <span
              className="hero-accent-symbol absolute -left-7 sm:-left-9 md:-left-11 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl text-lime-400 opacity-0 pointer-events-none select-none"
              aria-hidden="true"
            >
              ✦
            </span>
            <span className="hero-begeistern-word">
              <WordLetters
                word={BEGEISTERN}
                wordClass="word-begeistern"
                letterClassName="bg-gradient-to-r from-[#2dd4bf] to-[#84cc16] bg-clip-text text-transparent"
              />
            </span>
          </span>
        </h1>

        <p
          className="hero-subtext mt-6 md:mt-8 text-white text-xl sm:text-2xl xl:text-3xl font-bold max-w-2xl mx-auto leading-[1.3] tracking-tight opacity-90"
        >
          Live. Digital. Kreativ. Gamifiziert. <br />
          Immer Authentisch.
        </p>

        <div className="hero-cta flex items-center justify-center gap-6 sm:gap-8 pt-8 md:pt-10">
          <button
            onClick={() => onOpenBooking?.()}
            className="bg-emerald-400 hover:bg-emerald-300 text-slate-900 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-black text-base sm:text-lg transition-all shadow-[0_0_50px_rgba(52,211,153,0.3)] md:shadow-[0_0_60px_rgba(52,211,153,0.4)] lg:shadow-[0_0_80px_rgba(52,211,153,0.45)] hover:scale-105 active:scale-95 tracking-tighter"
          >
            Termin vereinbaren
          </button>
          <button
            onClick={() => scrollToSection?.('competencies')}
            className="group inline-flex items-center gap-2 text-white/90 hover:text-white font-bold text-sm sm:text-lg transition-all hover:translate-x-1 tracking-tighter"
          >
            Mehr erfahren
            <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
