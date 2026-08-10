
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_REVEAL_EASE, HERO_GROUP_DELAY, HERO_GROUP_DURATION } from './heroIntro';

interface NavbarProps {
  onNavigate: (page: 'home' | 'services' | 'ueber-uns') => void;
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
    // "ueber-uns" is a real page (own route), not an anchor on the homepage.
    if (target === 'home' || target === 'ueber-uns') {
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
      className="fixed top-0 left-0 right-0 z-[100] md:px-14 md:py-8 pointer-events-none"
    >
      {/* Desktop bar -- unchanged pill/blur chrome */}
      <div
        className={`hidden md:flex relative max-w-[1440px] mx-auto items-center justify-between pointer-events-auto h-[62px] px-8 rounded-[28px] transition-all duration-500 ease-in-out ${
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
            <img src="/logos/Esport-Manufaktur_Logo-weiss.png" alt="eSport Manufaktur" className="h-8 w-auto object-contain" />
          </button>
        </div>

        {/* Desktop Navigation -- absolutely centered so logo/Kontakt width never skews it */}
        <div className="flex items-center gap-14 px-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
            onClick={(e) => handleLinkClick(e, 'ueber-uns')}
            className="text-sm font-medium tracking-tight transition-colors duration-300 text-white/70 hover:text-emerald-400"
          >
            Über uns
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'best-cases')}
            className="text-sm font-medium tracking-tight transition-colors duration-300 text-white/70 hover:text-emerald-400"
          >
            Best Cases
          </button>
        </div>

        <div className="flex items-center shrink-0">
          <button
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="bg-emerald-400/15 hover:bg-emerald-400/25 text-emerald-300 hover:text-white border border-emerald-400/30 hover:border-emerald-400/50 px-5 h-9 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            Kontakt
          </button>
        </div>
      </div>

      {/* Mobile header -- no bar chrome at rest, just logo + menu button. When
          opened, this same block (not a separate floating card) grows a dark
          panel flush with the top edge, so the nav visibly emerges from the
          burger button instead of popping up elsewhere. The toggle button
          never moves -- it just swaps icon -- so it doubles as the close (X)
          button in the exact top-right spot where it always sits. */}
      <div
        className={`md:hidden pointer-events-auto transition-colors duration-300 ${
          isOpen ? 'bg-[#020617] border border-white/10 overflow-hidden' : ''
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <button
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center text-white"
            aria-label="eSport Manufaktur"
          >
            <img src="/logos/Esport-Manufaktur_Logo-weiss.png" alt="eSport Manufaktur" className="h-9 w-auto object-contain" />
          </button>
          <button
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-7 text-lg font-bold text-white text-center px-8 pt-2 pb-8">
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
                  onClick={(e) => handleLinkClick(e, 'ueber-uns')}
                  className="transition-all tracking-tighter text-white hover:text-emerald-400"
                >
                  Über uns
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
          )}
        </AnimatePresence>
      </div>

      {/* Dim backdrop behind the open mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 z-[-1] bg-black/40 backdrop-blur-sm pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
