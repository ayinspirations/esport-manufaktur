
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  scrollToSection?: (id: string) => void;
  onOpenBooking?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenBooking }) => {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-[#020617] flex items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" />

        <div
          className="absolute -top-[10%] -left-[5%] w-[60%] h-[70%] opacity-60"
          style={{
            background: 'radial-gradient(circle at 20% 20%, #00818d 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />

        <div
          className="absolute top-0 right-0 w-[75%] h-full opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(20, 184, 166, 0.5) 38px, rgba(20, 184, 166, 0.5) 39.5px)`,
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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[72px] xl:text-[88px] font-black text-white leading-[0.95] tracking-tighter"
        >
          WIR WOLLEN <br />
          MENSCHEN <br />
          <span className="bg-gradient-to-r from-[#2dd4bf] to-[#84cc16] bg-clip-text text-transparent">
            BEGEISTERN
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 md:mt-8 text-white text-lg sm:text-xl xl:text-2xl font-bold max-w-xl mx-auto leading-[1.3] tracking-tight opacity-90"
        >
          Live. Digital. Kreativ. Gamifiziert. Immer Authentisch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-6 sm:gap-8 pt-8 md:pt-10"
        >
          <button
            onClick={() => onOpenBooking?.()}
            className="bg-emerald-400 hover:bg-emerald-300 text-slate-900 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-black text-base sm:text-lg transition-all shadow-[0_0_50px_rgba(52,211,153,0.3)] hover:scale-105 active:scale-95 tracking-tighter"
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
