import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Trophy, Target, Lightbulb, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface BayernZocktDetailProps {
  onBack: () => void;
}

const images = [
  '/images/bayern-zockt/Bayern-zockt-Finale-FOKUS-Robi-080823.jpg',
  '/images/bayern-zockt/Bayern-zockt-Mehring-Kern-150724 - Copy.jpg',
  '/images/bayern-zockt/1721048106661.jpeg',
  '/images/bayern-zockt/1721048106955.jpeg',
  '/images/bayern-zockt/1721378807857.jpeg',
];

export const BayernZocktDetail: React.FC<BayernZocktDetailProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
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
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="/images/bayern-zockt/hero.jpg" 
          alt="Bayern Zockt Gaming Event" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#d1dbd2]" />
        
        <div className="absolute bottom-16 left-6 right-6 md:left-14 md:right-14 z-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 md:gap-8">
            <div className="flex flex-col w-full md:w-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[clamp(36px,9vw,120px)] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl"
              >
                GAMING IN <br /> <span className="text-white italic">BAYERN</span>
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-end gap-3 w-full md:w-auto"
            >
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
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic text-slate-900/40">
                Über das Projekt
              </h2>
              <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                Die Kooperation mit Bayern Zockt hat die Gaming-Community in Bayern zusammengebracht und das Gaming in der Region auf eine neue Ebene gehoben. Das Turnier adressierte neue Zielgruppen mit einer digitalen Plattform, in der diese mit verschiedenen Spielen ihr Können unter Beweis stellen konnten.
              </p>
              <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700 mt-6">
                Den Höhepunkt des Events stellte das spektakuläre, live ausgetragene Finale dar, das von interaktiven Spielstationen und hochmodernen Gaming-Setups begleitet wurde. Diese setzten nicht nur die Teilnehmenden ins Zentrum, sondern boten auch den Zuschauer:innen die Möglichkeit, direkt in die Action einzutauchen.
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
                      className="w-full h-full object-cover object-[center_20%] pointer-events-none"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200';
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

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
                Die Verbindung von digitalen Turnieren und einem eindrucksvollen regionalen Finale trug maßgeblich zur Etablierung der Marke Bayern Zockt als dynamischer, zukunftsorientierter Akteur in der Gaming-Welt bei. 
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {[
                { title: 'Konzeptentwicklung', icon: <Target className="w-6 h-6" />, text: 'Entwicklung eines detaillierten Eventplans mit strategischer Zielgruppenausrichtung.' },
                { title: 'Plattform', icon: <Users className="w-6 h-6" />, text: 'Original nachgebauter EM-Modus von EA FC25.' },
                { title: 'Turniermanagement', icon: <Trophy className="w-6 h-6" />, text: 'Umsetzung von Wettkämpfen für verschiedene Leistungsniveaus.' },
                { title: 'Content Creation', icon: <Lightbulb className="w-6 h-6" />, text: 'News der EM2024 gepaart mit EA FC25 News in prägnanten Short-Formaten.' },
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
                href="https://www.bfv.de" 
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img 
                  src="/logos/Bayerischer_Fussballverband.svg.png" 
                  alt="BFV Logo" 
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
                      <h4 className="text-lg font-black text-emerald-400 leading-tight">Digitale Turnierplattform + Live-Finale</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Regional · Community-driven · Hybrid</p>
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
                        { title: 'Konzeptentwicklung', desc: 'Strategische Zielgruppenansprache & Eventdramaturgie' },
                        { title: 'Individuelle Turnierplattform', desc: 'Eigene Gaming-Plattform mit EM-Modus (EA FC25)' },
                        { title: 'Turniermanagement', desc: 'Mehrstufige Wettbewerbe & faire Bewertungssysteme' },
                        { title: 'Content Creation', desc: 'Gaming- & Event-Content im Short-Form-Format' }
                      ].map((item, i) => (
                        <li key={i}>
                          <h5 className="font-black uppercase tracking-widest text-[10px] text-emerald-400 mb-1">{item.title}</h5>
                          <p className="text-white/80 font-bold leading-snug">{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Impact Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Impact</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white font-black">Bayernweite Community-Aktivierung</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white font-black">Neue Zielgruppen digital erreicht</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Trophy className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white font-black">Starke Markenpositionierung im Gaming-Umfeld</span>
                      </li>
                    </ul>
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
                      Hybrid-Event
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};