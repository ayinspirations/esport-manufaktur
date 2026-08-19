
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_REVEAL_EASE, HERO_GROUP_DELAY, HERO_GROUP_DURATION } from './heroIntro';
import { EASE_REVEAL_CSS, EASE_SPRING_CSS, DUR } from './motion';
import { useNavGround } from '../hooks/useNavGround';

// Two glasses, one per ground the bar crosses. Which one is showing is decided
// by `useNavGround` -- see there for why it goes by section and not by what
// literally sits behind the bar.
//
// Both are built to be *seen through*: a thin veil and a modest blur, so a
// headline or a photograph passing behind the bar stays recognisable rather
// than dissolving into a tinted strip. Earlier passes bought contrast by
// piling on the fill and then by compressing the backdrop's range with
// `contrast()` -- both worked, and both turned the bar back into a slab laid
// over the page, which is the thing it is not supposed to be.
//
// So the legibility is carried by the text instead of the panel: each tone
// pairs its glass with a halo in the opposite value, tight enough to stay
// invisible against the glass itself and strong enough to hold the letterforms
// apart from whatever slides underneath. That is the trade this makes
// deliberately -- against a worst-case backdrop the measured text-to-backdrop
// ratio is lower than the old slab's, and the halo is what keeps it readable.
const GLASS = {
  light: {
    fill: 'rgba(255,255,255,0.20)',
    filter: 'blur(10px) saturate(180%) brightness(1.06)',
    border: 'rgba(11,15,42,0.10)',
    shadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 18px 50px -28px rgba(11,15,42,0.35)',
    textShadow: '0 1px 2px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.85)',
    iconShadow: 'drop-shadow(0 1px 2px rgba(255,255,255,0.95)) drop-shadow(0 0 8px rgba(255,255,255,0.8))',
  },
  dark: {
    fill: 'rgba(2,6,23,0.20)',
    filter: 'blur(10px) saturate(160%) brightness(0.82)',
    border: 'rgba(255,255,255,0.12)',
    shadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 18px 50px -24px rgba(0,0,0,0.6)',
    textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.65)',
    iconShadow: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(0,0,0,0.6))',
  },
} as const;

interface NavbarProps {
  onNavigate: (page: 'home' | 'services' | 'ueber-uns') => void;
  scrollToSection: (id: string) => void;
  activePage: 'home' | 'services';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, scrollToSection, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const desktopBarRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const ground = useNavGround([desktopBarRef, mobileBarRef], scrolled);
  const glass = GLASS[ground];
  // Only the scrolled bar has a ground of its own; unscrolled it is a bare
  // strip over the dark hero, so the white chrome holds there either way.
  const inkOnGlass = ground === 'light' && scrolled;
  const navLinkTone = inkOnGlass
    ? 'text-[#0b0f2a]/80 hover:text-[#0e958e]'
    : 'text-white/70 hover:text-emerald-400';
  const ctaTone = inkOnGlass
    ? 'bg-[#0b0f2a] hover:bg-[#0e958e] text-white border border-transparent'
    : 'bg-emerald-400/15 hover:bg-emerald-400/25 text-emerald-300 hover:text-white border border-emerald-400/30 hover:border-emerald-400/50';

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
      // Neither a `filter` nor a `will-change` here, deliberately -- both make
      // this wrapper a backdrop root, and a backdrop root stops
      // `backdrop-filter` anywhere inside it from ever sampling the page. The
      // nav used to blur in from 8px and settle at `blur(0px)`, with
      // `will-change: opacity, transform` left standing afterwards; between
      // them the bar below was translucent but its frost never engaged, so
      // content slid behind it perfectly sharp. Opacity, offset and scale
      // carry the entrance on their own, and Framer promotes the layer for
      // the duration of the animation without being told to.
      initial={{ opacity: 0, y: -10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: HERO_GROUP_DURATION, delay: HERO_GROUP_DELAY, ease: HERO_REVEAL_EASE }}
      className="fixed top-0 left-0 right-0 z-[100] md:px-14 md:py-8 pointer-events-none"
    >
      {/* Desktop bar -- morphs from a full-width, near-transparent strip over
          the hero into a compact floating pill of frosted glass once scrolling
          starts: the page stays visible through it, blurred, and the glass
          switches with the section behind it (see GLASS above).

          The blur is what makes the transparency read as glass rather than as
          a smear. An earlier pass tried 0.92 alpha with no backdrop filter at
          all, and the tiles passing behind looked like they were dissolving. */}
      <div
        ref={desktopBarRef}
        className={`hidden md:flex relative mx-auto items-center justify-between pointer-events-auto rounded-full ${
          scrolled ? 'max-w-[1040px] h-[56px] px-6' : 'max-w-[1440px] h-[62px] px-8'
        }`}
        style={{
          background: scrolled ? glass.fill : 'rgba(255,255,255,0.03)',
          backdropFilter: scrolled ? glass.filter : 'blur(16px) saturate(120%)',
          WebkitBackdropFilter: scrolled ? glass.filter : 'blur(16px) saturate(120%)',
          border: `1px solid ${scrolled ? glass.border : 'rgba(255,255,255,0)'}`,
          // Inner top highlight: the lit edge that makes a translucent panel
          // read as a pane of glass rather than as a hole in the page.
          boxShadow: scrolled ? glass.shadow : 'none',
          // text-shadow inherits, so declaring the halo once here puts it on
          // every label inside. The filled Kontakt pill opts out below.
          textShadow: scrolled ? glass.textShadow : GLASS.dark.textShadow,
          transition: `background 600ms ${EASE_REVEAL_CSS}, backdrop-filter 600ms ${EASE_REVEAL_CSS}, border-color 600ms ${EASE_REVEAL_CSS}, box-shadow 600ms ${EASE_REVEAL_CSS}, max-width 700ms ${EASE_REVEAL_CSS}, height 700ms ${EASE_REVEAL_CSS}, padding 700ms ${EASE_REVEAL_CSS}`
        }}
      >
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2.5 group"
            aria-label="eSport Manufaktur"
          >
            {/* The two logo files are the same artwork in two inks on the same
                transparent ground, so the pair can be stacked and cross-faded.
                Swapping the `src` instead would cut hard in the middle of the
                glass's own 600ms transition. The white one vanishes on the
                light glass, the blue one on the dark. */}
            <span className="relative block h-8">
              <img
                src="/logos/Esport-Manufaktur_Logo-weiss.png"
                alt="eSport Manufaktur"
                className="h-8 w-auto object-contain transition-opacity duration-500"
                style={{ opacity: inkOnGlass ? 0 : 1, filter: GLASS.dark.iconShadow }}
              />
              <img
                src="/logos/Esport-Manufaktur_Logo-blau.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-8 w-auto object-contain transition-opacity duration-500"
                style={{ opacity: inkOnGlass ? 1 : 0, filter: GLASS.light.iconShadow }}
              />
            </span>
          </button>
        </div>

        {/* Desktop Navigation -- absolutely centered so logo/Kontakt width never skews it */}
        <div className="flex items-center gap-14 px-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={(e) => handleLinkClick(e, 'home')}
            className={`nav-link text-sm font-medium tracking-tight transition-colors duration-300 ${navLinkTone}`}
          >
            Startseite
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'competencies')}
            className={`nav-link text-sm font-medium tracking-tight transition-colors duration-300 ${navLinkTone}`}
          >
            Services
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'ueber-uns')}
            className={`nav-link text-sm font-medium tracking-tight transition-colors duration-300 ${navLinkTone}`}
          >
            Über uns
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'best-cases')}
            className={`nav-link text-sm font-medium tracking-tight transition-colors duration-300 ${navLinkTone}`}
          >
            Best Cases
          </button>
        </div>

        <div className="flex items-center shrink-0">
          <button
            onClick={(e) => handleLinkClick(e, 'contact')}
            className={`spring px-5 h-9 rounded-full text-xs font-semibold tracking-tight ${ctaTone}`}
            style={{ textShadow: 'none' }}
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
        ref={mobileBarRef}
        className={`md:hidden pointer-events-auto ${
          isOpen ? 'bg-[#020617] border border-white/10 overflow-hidden' : ''
        }`}
        style={
          // The open menu keeps a solid dark panel. It covers most of the
          // viewport rather than skimming across it, so there is no ground
          // behind it worth showing -- and a full menu list needs its own.
          isOpen
            ? undefined
            : {
                // Same two glasses as the desktop bar, chosen the same way.
                background: scrolled ? glass.fill : 'transparent',
                backdropFilter: scrolled ? glass.filter : 'none',
                WebkitBackdropFilter: scrolled ? glass.filter : 'none',
                boxShadow: scrolled
                  ? (inkOnGlass
                      ? 'inset 0 -1px 0 rgba(11,15,42,0.10), 0 14px 40px -30px rgba(11,15,42,0.4)'
                      : 'inset 0 -1px 0 rgba(255,255,255,0.10), 0 14px 40px -26px rgba(0,0,0,0.6)')
                  : 'none',
                textShadow: scrolled ? glass.textShadow : GLASS.dark.textShadow,
                transition: `background 500ms ${EASE_REVEAL_CSS}, backdrop-filter 500ms ${EASE_REVEAL_CSS}, box-shadow 500ms ${EASE_REVEAL_CSS}`
              }
        }
      >
        <div className="flex items-center justify-between px-6 py-5">
          <button
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center"
            aria-label="eSport Manufaktur"
          >
            <span className="relative block h-9">
              <img
                src="/logos/Esport-Manufaktur_Logo-weiss.png"
                alt="eSport Manufaktur"
                className="h-9 w-auto object-contain transition-opacity duration-500"
                style={{ opacity: inkOnGlass && !isOpen ? 0 : 1, filter: GLASS.dark.iconShadow }}
              />
              <img
                src="/logos/Esport-Manufaktur_Logo-blau.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-9 w-auto object-contain transition-opacity duration-500"
                style={{ opacity: inkOnGlass && !isOpen ? 1 : 0, filter: GLASS.light.iconShadow }}
              />
            </span>
          </button>
          <button
            className={`p-2 rounded-full transition-colors ${
              inkOnGlass && !isOpen
                ? 'text-[#0b0f2a] hover:bg-[#0b0f2a]/10'
                : 'text-white hover:bg-white/10'
            }`}
            style={{ filter: isOpen ? 'none' : glass.iconShadow }}
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
