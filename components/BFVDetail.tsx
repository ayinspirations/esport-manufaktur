
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Award, Zap, Users, ShieldCheck, Trophy, Target, ChevronLeft, ChevronRight, Globe, Share2, Smartphone, Layout, HeartHandshake, Youtube, Play } from 'lucide-react';

interface CaseDetailProps {
  onBack: () => void;
}

const images = [
  '/images/cases/bfv.jpg',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=1200',
];

const videos = [
  {
    id: 'rbLU0nKoO-Y',
    title: 'BFV EFOOTBALL HIGHLIGHT 1',
    thumbnail: 'https://img.youtube.com/vi/rbLU0nKoO-Y/maxresdefault.jpg',
    url: 'https://youtu.be/rbLU0nKoO-Y'
  },
  {
    id: 'UdnMraIQ3UY',
    title: 'SCHULTAG DER SUPERLATIVE',
    thumbnail: 'https://img.youtube.com/vi/UdnMraIQ3UY/maxresdefault.jpg',
    url: 'https://youtu.be/UdnMraIQ3UY'
  }
];

export const BFVDetail: React.FC<CaseDetailProps> = ({ onBack }) => {
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
          src="/images/cases/bfv.jpg" 
          alt="BFV eFootball" 
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
                BFV <br /> <span className="text-white/40 italic">eFootball.</span>
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
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic text-slate-900/40">
                BFV eFootball – Die digitale Fußballplattform in Bayern
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                  Seit über drei Jahren gestalten wir gemeinsam mit der BFV Service GmbH die Zukunft des digitalen Fußballs. Der BFV eFootball verbindet Tradition und Innovation: Als Teil des Bayerischen Fußball-Verbandes – dem größten Landesverband im DFB – bringt die Plattform Fußball und Gaming zusammen.
                </p>
                <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                  Mit über 5.000 registrierten Nutzern, mehr als 100 Online-Turnieren, eigener App für iOS & Android und wachsender Social-Media-Reichweite ist BFV eFootball heute eine der führenden eFootball-Plattformen in Deutschland.
                </p>
                <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                  Neben Turnieren und digitalen Events bietet die Plattform auch Sponsoren attraktive Möglichkeiten zur Platzierung und übernimmt gesellschaftliche Verantwortung – etwa durch Aufklärung zu Medienkompetenz und Gaming-Sucht an Schulen und in Vereinen.
                </p>
              </div>
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

            {/* YouTube Videos Section */}
            <section className="space-y-8 mt-16">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Highlights & Eindrücke</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {videos.map((video) => (
                  <a 
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group rounded-[2.5rem] overflow-hidden aspect-video shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] block border-4 border-slate-950/10 hover:border-red-600/20 transition-all duration-500"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Authentic YouTube Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-14 bg-red-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:bg-red-700 group-hover:scale-110">
                        <Play className="w-8 h-8 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Authentic YouTube Title Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                      <h4 className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter leading-none mb-2">
                        {video.title}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {[
                { title: 'Content Creation', icon: <Share2 className="w-6 h-6" />, text: 'Wachstum der BFV-eFootball-Social-Media-Kanäle mit signifikanten Reichweitensteigerungen.' },
                { title: 'Plattformentwicklung', icon: <Globe className="w-6 h-6" />, text: 'Aufbau und kontinuierliche Optimierung des BFV-eFootball-Hubs inkl. Sponsorenintegration.' },
                { title: 'Mobile Apps', icon: <Smartphone className="w-6 h-6" />, text: 'Entwicklung der BFV-eFootball-App für iOS und Android für den digitalen Zugang.' },
                { title: 'Open Cups & Ligen', icon: <Layout className="w-6 h-6" />, text: 'Organisation von über 100 Turnieren sowie Verwaltung von eRegionalligen & Co.' },
                { title: 'Sponsoring System', icon: <Target className="w-6 h-6" />, text: 'Effektive Integration zahlreicher Partner und Generierung zusätzlicher Einnahmen.' },
                { title: 'Gesellschaftliche Begleitung', icon: <HeartHandshake className="w-6 h-6" />, text: 'Aufklärung über digitale Themen wie Gaming-Sucht und Medienkompetenz.' },
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12 order-last lg:order-none">
            <div className="sticky top-32">
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
                <div className="space-y-10">
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Format</h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-emerald-400 leading-tight">Digitale Fußballplattform</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">App + Web | Turniere | Association</p>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Leistungen</h3>
                    </div>
                    <ul className="space-y-6">
                      {[
                        { title: 'Full-Service Betreuung', desc: 'Technik, Organisation und Kommunikation aus einer Hand' },
                        { title: 'Mobile Ökosystem', desc: 'Eigene Apps für den direkten Draht zur Community' },
                        { title: 'Turnierbetrieb', desc: 'Management von über 130 Vereinen in diversen Ligen' },
                        { title: 'Media & Growth', desc: 'Strategische Social-Media-Entwicklung' }
                      ].map((item, i) => (
                        <li key={i}>
                          <h5 className="font-black uppercase tracking-widest text-[10px] text-emerald-400 mb-1">{item.title}</h5>
                          <p className="text-white/80 font-bold leading-snug">{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Impact</h3>
                    </div>
                    <ul className="space-y-4">
                      <li>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Registrierte Nutzer:</div>
                        <div className="text-white font-black">Über 5.000 aktive User</div>
                      </li>
                      <li>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Turniere:</div>
                        <div className="text-white font-black">Mehr als 100 Online-Events p.a.</div>
                      </li>
                      <li>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Vereine:</div>
                        <div className="text-white font-black">Über 130 teilnehmende Clubs</div>
                      </li>
                    </ul>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                        <div className="text-lg font-black text-white leading-tight">Langjährige Partnerschaft</div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      "Nachhaltig, innovativ und community-nah"
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
