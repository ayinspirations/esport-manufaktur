
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Trophy, Target, Lightbulb, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseDetailProps {
  onBack: () => void;
}

const images = [
  '/images/hagebau/slide-3.jpg',
  '/images/hagebau/slide-1.jpg',
  '/images/hagebau/slide-2.jpg',
  '/images/hagebau/slide-4.jpg',
  '/images/hagebau/slide-5.jpg',
  '/images/hagebau/slide-6.jpg',
];

export const CaseDetail: React.FC<CaseDetailProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  /* Removed auto-slide effect */
  /* useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]); */

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    
    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      nextSlide();
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      prevSlide();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
    })
  };

  return (
    <div className="min-h-screen bg-[#d1dbd2] text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="/images/hagebau/hero-hagebau.jpg" 
          alt="Hagebau Bolay Gaming Day Recruiting Event" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#d1dbd2]" />
        
        <div className="absolute bottom-16 left-6 right-6 md:left-14 md:right-14 z-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 md:gap-8">
            <div className="flex flex-col w-full md:w-auto mb-2 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[clamp(36px,9vw,120px)] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl"
              >
                Hagebau <br /> <span className="text-white/40 italic">Bolay.</span>
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-end gap-3 w-full md:w-auto"
            >
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onBack();
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white text-[11px] md:text-base font-black uppercase tracking-[0.2em] transition-all group w-fit md:w-auto min-w-[150px] md:min-w-0"
              >
                Boost Your Idea
              </button>
              <button 
                onClick={onBack}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white text-[11px] md:text-base font-black uppercase tracking-[0.2em] transition-all group w-fit md:w-auto min-w-[150px] md:min-w-0"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Zurück
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic text-slate-900/40">
                Hagebau Bolay Case Study: Gaming Day 1.0 & 2.0
              </h2>
              <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                Für Hagebau Bolay haben wir mit dem Gaming Day 1.0 und Gaming Day 2.0 ein einzigartiges Eventformat geschaffen, das Gaming, Esport und interaktives Entertainment zu einem unvergesslichen Erlebnis verschmelzen ließ.
              </p>
              <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700 mt-6">
                Ziel war es, eine Gaming-Welt zu erschaffen, in der Spaß, Teamgeist und Wettkampf sowohl für Neulinge als auch fortgeschrittene Spielende aufeinandertrafen.
              </p>
            </section>

            {/* Image Slider */}
            <div 
              className="relative group rounded-[2.5rem] overflow-hidden aspect-video bg-[#d1dbd2] shadow-2xl touch-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-[#d1dbd2]">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ 
                      x: { type: "spring", stiffness: 300, damping: 30 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                  >
                    <img
                      src={images[currentIndex]}
                      alt={`Slide ${currentIndex + 1}`}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Preload next and previous images */}
              <div className="hidden">
                <img src={images[(currentIndex + 1) % images.length]} alt="" />
                <img src={images[(currentIndex - 1 + images.length) % images.length]} alt="" />
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-30 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-30 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {images.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <section className="space-y-8">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Hochwertige Gaming-Setups, riesige Leinwände für Zuschauende und eine Atmosphäre voller Spannung – unser Team von der eSport Manufaktur setzte das Event mit höchster Präzision und Leidenschaft um. Wir konzipierten packende Turniere, installierten interaktive Gaming-Stationen und schufen eine professionelle Bühne für mitreißende Matches und unvergessliche Erlebnisse.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {[
                { title: 'Challenge', icon: <Target className="w-6 h-6" />, text: 'hagebau bolay suchte nach einer innovativen Lösung, um potenzielle Auszubildende und Young Professionals für sich als attraktiven Arbeitgeber zu gewinnen.' },
                { title: 'Solution', icon: <Lightbulb className="w-6 h-6" />, text: 'Ein Gaming-Event, das hagebau bolay in ein neues Licht rückte: Hochwertige Gaming-Stationen, aufregende Turniere und eine Atmosphäre, die zum Mitfiebern einlud.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-900/5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Desktop Logo positioning - outside the black box and below challenge/solution cards */}
            <div className="pt-12 flex justify-center">
              <a 
                href="https://www.hagebau-bolay.de" 
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img 
                  src="/logos/hagebau-logo.png" 
                  alt="Hagebau Bolay Logo" 
                  className="h-16 md:h-24 w-auto opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12 order-last lg:order-none">
            <div className="sticky top-32">
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
                <div className="space-y-10">
                  {/* Format Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Format</h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-emerald-400 leading-tight">Employer Branding Gaming Event</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">On-Site · Interaktiv · Zielgruppenfokussiert</p>
                    </div>
                  </section>

                  {/* Kernleistungen Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Kernleistungen</h3>
                    </div>
                    <ul className="space-y-6">
                      {[
                        { title: 'Strategie & Konzept', desc: 'Zielgruppengerechtes Eventformat für Nachwuchs & Young Professionals' },
                        { title: 'Event & Infrastruktur', desc: 'Gaming-Setups, Turnierbühnen, Großbildtechnik' },
                        { title: 'Turnier- & Ablaufmanagement', desc: 'Professionelles Matchmaking & Spielsysteme' },
                        { title: 'Experience & Kommunikation', desc: 'Live-Interaktion, Moderation & Community-Erlebnis' }
                      ].map((item, i) => (
                        <li key={i}>
                          <h5 className="font-black uppercase tracking-widest text-[10px] text-emerald-400 mb-1">{item.title}</h5>
                          <p className="text-white/80 font-bold leading-snug">{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Ergebnis Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Ergebnis</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Trophy className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white font-black">+450 aktive Spieler:innen</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white font-black">Hohe Verweildauer & Interaktion</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white font-black">Starke Positionierung als moderner Arbeitgeber</span>
                      </li>
                    </ul>
                    <p className="mt-6 text-white/40 text-[10px] font-black uppercase tracking-widest italic">
                      2 Editionen erfolgreich umgesetzt
                    </p>
                  </section>

                  {/* Status Section */}
                  <div className="pt-10 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                        <div className="text-lg font-black text-white leading-tight uppercase tracking-tighter">Erfolgreich umgesetzt</div>
                      </div>
                    </div>
                    <p className="mt-4 text-emerald-400 text-sm font-bold italic">
                      Skalierbares Format
                    </p>
                  </div>
                </div>
              </div>

              {/* Removed Mobile Logo positioning - now handled by unified logo placement below sidebar */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
