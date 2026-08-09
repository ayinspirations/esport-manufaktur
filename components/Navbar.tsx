
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_REVEAL_EASE, HERO_GROUP_DELAY, HERO_GROUP_DURATION } from './heroIntro';

interface NavbarProps {
  onNavigate: (page: 'home' | 'services') => void;
  scrollToSection: (id: string) => void;
  activePage: 'home' | 'services';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, scrollToSection, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (target === 'home') {
      onNavigate(target as any);
    } else {
      scrollToSection(target);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10, scale: 0.985, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: HERO_GROUP_DURATION, delay: HERO_GROUP_DELAY, ease: HERO_REVEAL_EASE }}
      style={{ willChange: 'opacity, transform, filter' }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-14 py-6 md:py-8 pointer-events-none"
    >
      <div
        className={`relative max-w-[1440px] mx-auto flex items-center justify-between pointer-events-auto h-[56px] md:h-[62px] px-5 md:px-8 rounded-[28px] transition-all duration-500 ease-in-out ${
          scrolled ? 'scale-[0.99]' : 'scale-100'
        }`}
        style={{
          background: scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(16px) saturate(120%)',
          WebkitBackdropFilter: 'blur(16px) saturate(120%)',
          boxShadow: scrolled ? '0 8px 24px -18px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2.5 text-white group"
            aria-label="eSport Manufaktur"
          >
            <img src="/logos/Esport-Manufaktur_Logo-weiss.png" alt="eSport Manufaktur" className="h-6 md:h-7 w-auto object-contain" />
          </button>
        </div>

        {/* Desktop Navigation -- absolutely centered so logo/Kontakt width never skews it */}
        <div className="hidden md:flex items-center gap-14 px-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={(e) => handleLinkClick(e, 'home')}
            className="text-sm font-medium tracking-tight transition-colors duration-300 text-white/70 hover:text-emerald-400"
          >
            Startseite
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'competencies')}
            className="text-sm font-medium tracking-tight transition-colors duration-300 text-white/70 hover:text-emerald-400"
          >
            Services
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'best-cases')}
            className="text-sm font-medium tracking-tight transition-colors duration-300 text-white/70 hover:text-emerald-400"
          >
            Best Cases
          </button>
        </div>

        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="bg-emerald-400/15 hover:bg-emerald-400/25 text-emerald-300 hover:text-white border border-emerald-400/30 hover:border-emerald-400/50 px-5 h-9 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            Kontakt
          </button>
        </div>

        <button
          className="md:hidden text-white p-1.5 rounded-full hover:bg-white/10 transition-colors pointer-events-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 z-[-1] bg-black/40 backdrop-blur-sm pointer-events-auto"
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden absolute top-24 left-4 right-4 tile-gradient rounded-[2rem] p-8 border border-white/10 shadow-2xl backdrop-blur-3xl pointer-events-auto"
            >
              <div className="flex flex-col gap-8 text-lg font-bold text-white text-center">
                <button
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="transition-all tracking-tighter text-white hover:text-emerald-400"
                >
                  Startseite
                </button>
                <button
                  onClick={(e) => handleLinkClick(e, 'competencies')}
                  className="transition-all tracking-tighter text-white hover:text-emerald-400"
                >
                  Services
                </button>
                <button
                  onClick={(e) => handleLinkClick(e, 'best-cases')}
                  className="transition-all tracking-tighter text-white hover:text-emerald-400"
                >
                  Best Cases
                </button>
                <div className="h-px bg-white/10 w-1/3 mx-auto" />
                <button
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="mx-auto bg-emerald-400 text-slate-900 px-5 py-3 sm:px-7 sm:py-3.5 rounded-full font-black text-sm sm:text-base shadow-[0_0_50px_rgba(52,211,153,0.3)] tracking-tighter"
                >
                  Kontakt aufnehmen
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
