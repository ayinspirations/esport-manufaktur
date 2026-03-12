
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Trophy, ArrowRight } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'Live Performance',
    title: 'Final Arena 2024',
    progress: 88,
    icon: <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-black" />,
    img: '/images/avatars/user-1.jpg' 
  },
  {
    id: 2,
    type: 'Live Scouting',
    title: 'E-Talent Hub',
    progress: 75,
    icon: <Target className="w-3 h-3 md:w-3.5 md:h-3.5 text-black" />,
    img: '/images/avatars/user-2.jpg'
  },
  {
    id: 3,
    type: 'Event Match',
    title: 'Masters Series',
    progress: 95,
    icon: <Trophy className="w-3 h-3 md:w-3.5 md:h-3.5 text-black" />,
    img: '/images/avatars/user-3.jpg'
  }
];

interface HeroProps {
  scrollToSection?: (id: string) => void;
  onOpenBooking?: () => void;
}

const heroImages = [
  '/hero-rewe.jpg',
  '/hero-gamechanger.jpg',
  '/hero-hagebau.jpg',
  '/hero-bayernzockt.png'
];

const avatarImages = [
  '/images/avatars/user-1.jpg',
  '/images/avatars/user-2.jpg',
  '/images/avatars/user-3.jpg'
];

// Preload critical images immediately
if (typeof window !== 'undefined') {
  [...heroImages, ...avatarImages].forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenBooking }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentImgIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 50,
    damping: 22,
    mass: 1.2
  };

  return (
    <section className="relative w-full flex items-center justify-center p-3 md:p-5 lg:p-6 pb-0">
      <div className="relative w-full min-h-[85vh] md:min-h-[90vh] lg:h-[94vh] rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden shadow-[0_50px_120px_-30px_rgba(0,0,0,0.6)] bg-[#020617] border border-black/10 flex flex-col">
        
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#020617]" />
          
          {/* Preload images */}
          <div className="hidden">
            {heroImages.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
          </div>

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

        <div className="relative z-10 flex-1 w-full px-6 sm:px-10 md:px-20 lg:px-28 py-20 lg:py-24 flex flex-col justify-center overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="flex flex-col h-full justify-center mt-8 lg:mt-0">
              <div className="space-y-6 md:space-y-8">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10vw] sm:text-[7vw] md:text-[6vw] lg:text-[72px] xl:text-[88px] font-black text-white leading-[0.9] tracking-tighter text-left"
                >
                  Events und <br />
                  Aktivierungen, <br />
                  <span className="bg-gradient-to-r from-[#2dd4bf] to-[#84cc16] bg-clip-text text-transparent">
                    die in Erinnerung <br />
                    bleiben.
                  </span>
                </motion.h1>

                {/* Mobile-only slider position */}
                <div className="lg:hidden w-full">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-video w-full rounded-[2rem] overflow-hidden group shadow-2xl touch-pan-y"
                  >
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.img
                        key={currentImgIndex}
                        src={heroImages[currentImgIndex]}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "tween", duration: 0.4, ease: "easeInOut" },
                          opacity: { duration: 0.3 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                          if (swipe && offset.x > 0) {
                            prevSlide();
                          } else if (swipe && offset.x < 0) {
                            nextSlide();
                          }
                        }}
                        className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                      />
                    </AnimatePresence>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-white text-lg sm:text-xl xl:text-2xl font-bold max-w-lg leading-[1.3] tracking-tight text-left opacity-90"
                >
                  Wir entwickeln Erlebnisse, die Marken erlebbar machen, Zielgruppen einbinden und messbare Ergebnisse liefern.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center gap-6 sm:gap-8 w-full pt-4"
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
            </div>

            {/* Right Column: Image Slider (Desktop Only) */}
            <div className="hidden lg:block w-full h-full flex items-center">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square w-full rounded-[4rem] overflow-hidden group shadow-2xl"
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={currentImgIndex}
                    src={heroImages[currentImgIndex]}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "tween", duration: 0.4, ease: "easeInOut" },
                      opacity: { duration: 0.3 }
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="absolute inset-0 flex items-center justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentImgIndex ? 1 : -1);
                        setCurrentImgIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentImgIndex ? 'w-10 bg-white' : 'w-2 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
