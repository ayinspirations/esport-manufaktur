
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HERO_REVEAL_EASE, HERO_NAV_CTA_DELAY, HERO_NAV_CTA_DURATION } from './heroIntro';

interface HeroProps {
  scrollToSection?: (id: string) => void;
  onOpenBooking?: () => void;
}

const WORD_DURATION = 0.55;
const WORD_STEP = 0.15;
const WORDS_START = 0.15;
const BEGEISTERN_DURATION = 0.8;

const Word: React.FC<{ children: string; delay: number }> = ({ children, delay }) => (
  <motion.span
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: WORD_DURATION, delay, ease: HERO_REVEAL_EASE }}
    className="inline-block"
    style={{ willChange: 'opacity, transform' }}
  >
    {children}
  </motion.span>
);

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenBooking }) => {
  const menschenDelay = WORDS_START + 2 * WORD_STEP;
  const begeisternDelay = menschenDelay + WORD_DURATION;
  const subtextDelay = begeisternDelay + BEGEISTERN_DURATION;

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[#020617] flex items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" />

        {/* Corner glow -- full-bleed div (inset-0) so it can never leave a hard-edged gap
            at any breakpoint/height; the "concentrated in one corner, soft falloff" look
            comes purely from the gradient's own stops, not from sizing the box smaller
            than the section. No filter:blur() here on purpose -- blurring a large element
            is expensive to rasterize and was causing a visible flicker/pop on first paint
            on mobile Safari; the extra gradient stop below gives an equally soft edge. */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 18%, rgba(0,129,141,0.55) 0%, rgba(0,129,141,0.28) 30%, rgba(0,129,141,0.08) 52%, transparent 70%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />

        {/* Diagonal line pattern -- single horizontal mask only (fades in from the left
            edge of this box), so it stays fully visible top-to-bottom at any hero height.
            Uses white-based alpha stops: gradients between black/transparent can render
            as a luminance mask in some browsers (black ~= invisible), which was cutting
            the pattern off well before the bottom of the section. */}
        <div
          className="absolute top-0 right-0 w-[75%] h-full opacity-60"
          style={{
            backgroundImage: `repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(20, 184, 166, 0.6) 38px, rgba(20, 184, 166, 0.6) 40px)`,
            maskImage: 'linear-gradient(to left, white 0%, white 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, white 0%, white 60%, transparent 100%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 flex flex-col items-center text-center">
        <h1 className="text-[12vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[82px] xl:text-[100px] font-black text-white leading-[0.95] tracking-tighter">
          <Word delay={WORDS_START}>WIR</Word>{' '}
          <Word delay={WORDS_START + WORD_STEP}>WOLLEN</Word>
          <br />
          <Word delay={menschenDelay}>MENSCHEN</Word>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 16, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: [1, 1.08, 1] }}
            transition={{ duration: BEGEISTERN_DURATION, delay: begeisternDelay, ease: 'easeInOut' }}
            style={{ willChange: 'opacity, transform' }}
            className="inline-block bg-gradient-to-r from-[#2dd4bf] to-[#84cc16] bg-clip-text text-transparent"
          >
            BEGEISTERN
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: subtextDelay, ease: HERO_REVEAL_EASE }}
          style={{ willChange: 'opacity, transform' }}
          className="mt-6 md:mt-8 text-white text-xl sm:text-2xl xl:text-3xl font-bold max-w-2xl mx-auto leading-[1.3] tracking-tight opacity-90"
        >
          Live. Digital. Kreativ. Gamifiziert. <br />
          Immer Authentisch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: HERO_NAV_CTA_DURATION, delay: HERO_NAV_CTA_DELAY, ease: HERO_REVEAL_EASE }}
          style={{ willChange: 'opacity, transform' }}
          className="flex items-center justify-center gap-6 sm:gap-8 pt-8 md:pt-10"
        >
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
        </motion.div>
      </div>
    </section>
  );
};
