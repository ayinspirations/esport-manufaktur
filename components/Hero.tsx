
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  scrollToSection?: (id: string) => void;
  onOpenBooking?: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const WORD_DURATION = 0.45;
const WORD_STEP = 0.1;
const WORDS_START = 0.35;

const Word: React.FC<{ children: string; delay: number }> = ({ children, delay }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: WORD_DURATION, delay, ease: EASE }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenBooking }) => {
  const punchDelay = WORDS_START + 3 * WORD_STEP + WORD_DURATION; // starts right after "BEGEISTERN" finishes revealing
  const subtextDelay = punchDelay + 0.35; // right after the glow-punch settles
  const buttonsDelay = subtextDelay + 0.15;

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[#020617] flex items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute -top-[10%] -left-[5%] w-[60%] h-[70%] opacity-60 md:w-[75%] md:h-[85%] md:opacity-70 lg:w-[90%] lg:h-[100%] lg:opacity-85"
          style={{
            background: 'radial-gradient(circle at 20% 20%, #00818d 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />

        <div
          className="absolute top-0 right-0 w-[75%] h-full opacity-60"
          style={{
            backgroundImage: `repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(20, 184, 166, 0.6) 38px, rgba(20, 184, 166, 0.6) 40px)`,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%), linear-gradient(to left, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%), linear-gradient(to left, black 0%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in'
          }}
        />

        <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 flex flex-col items-center text-center">
        <h1 className="text-[12vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[82px] xl:text-[100px] font-black text-white leading-[0.95] tracking-tighter">
          <Word delay={WORDS_START}>WIR</Word>{' '}
          <Word delay={WORDS_START + WORD_STEP}>WOLLEN</Word>
          <br />
          <Word delay={WORDS_START + 2 * WORD_STEP}>MENSCHEN</Word>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 1, filter: 'drop-shadow(0 0 0px rgba(132,204,22,0))' }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [1, 0.95, 1.06, 1],
              filter: [
                'drop-shadow(0 0 0px rgba(132,204,22,0))',
                'drop-shadow(0 0 4px rgba(132,204,22,0.3))',
                'drop-shadow(0 0 26px rgba(132,204,22,0.75))',
                'drop-shadow(0 0 8px rgba(132,204,22,0.35))'
              ]
            }}
            transition={{
              opacity: { duration: WORD_DURATION, delay: WORDS_START + 3 * WORD_STEP, ease: EASE },
              y: { duration: WORD_DURATION, delay: WORDS_START + 3 * WORD_STEP, ease: EASE },
              scale: { duration: 0.35, delay: punchDelay, times: [0, 0.4, 0.7, 1], ease: 'easeOut' },
              filter: { duration: 0.35, delay: punchDelay, times: [0, 0.4, 0.7, 1], ease: 'easeOut' }
            }}
            className="inline-block bg-gradient-to-r from-[#2dd4bf] to-[#84cc16] bg-clip-text text-transparent"
          >
            BEGEISTERN
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: subtextDelay, ease: EASE }}
          className="mt-6 md:mt-8 text-white text-xl sm:text-2xl xl:text-3xl font-bold max-w-2xl mx-auto leading-[1.3] tracking-tight opacity-90"
        >
          Live. Digital. Kreativ. Gamifiziert. <br />
          Immer Authentisch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: buttonsDelay, ease: EASE }}
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
