
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_REVEAL_EASE, HERO_GROUP_DELAY, HERO_GROUP_DURATION } from './heroIntro';
import { EASE_REVEAL, EASE_REVEAL_CSS, EASE_SPRING_CSS, DUR } from './motion';
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
//
// Text only. The logo and the burger carried the same halo as a drop-shadow
// and it read as a glow bleeding out from behind them -- fine under a word,
// wrong under a mark. They sit on the glass unaided; the tone switch already
// puts the right ink under them.
const GLASS = {
  light: {
    fill: 'rgba(255,255,255,0.20)',
    filter: 'blur(10px) saturate(180%) brightness(1.06)',
    border: 'rgba(11,15,42,0.10)',
    shadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 18px 50px -28px rgba(11,15,42,0.35)',
    textShadow: '0 1px 2px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.85)',
  },
  dark: {
    fill: 'rgba(2,6,23,0.20)',
    filter: 'blur(10px) saturate(160%) brightness(0.82)',
    border: 'rgba(255,255,255,0.12)',
    shadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 18px 50px -24px rgba(0,0,0,0.6)',
    textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.65)',
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
  const scrolledRef = useRef(false);

  const desktopBarRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const ground = useNavGround([desktopBarRef, mobileBarRef], scrolled);
  const glass = GLASS[ground];
  // Only the scrolled *desktop* bar has a ground of its own; unscrolled it is a
  // bare strip over the dark hero, so the white chrome holds there either way.
  const inkOnGlass = ground === 'light' && scrolled;
  // The phone bar carries its own dark band at every scroll position, so its
  // chrome is white throughout and needs no tone switch -- only the open menu,
  // which is the light canvas, takes ink.
  const navLinkTone = inkOnGlass
    ? 'text-[#0b0f2a]/80 hover:text-[#0e958e]'
    : 'text-white/75 hover:text-[#5fd6cf]';
  const ctaTone = inkOnGlass
    ? 'bg-[#0b0f2a] hover:bg-[#0e958e] text-white border border-transparent'
    // The accent lightened one step for the dark tone: #0e958e is mixed for
    // display type on a dark ground but thin for a 12px pill label.
    : 'bg-[#0e958e]/20 hover:bg-[#0e958e]/30 text-[#5fd6cf] hover:text-white border border-[#0e958e]/45 hover:border-[#0e958e]/70';

  useEffect(() => {
    // Passive: this listener never calls preventDefault, and saying so up front
    // lets the browser scroll without first waiting to find out. A non-passive
    // scroll listener on `window` blocks the compositor on the main thread for
    // every event, which is felt as lag on touch even when the handler itself
    // is trivial.
    //
    // The read is also gated on the value actually changing. `window.scrollY`
    // is compared against a ref rather than going straight to setState on every
    // event: React does bail out of an identical value, but only after the
    // update has been queued and a render scheduled, and this fires hundreds of
    // times per fling.
    const handleScroll = () => {
      const next = window.scrollY > 30;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    window.addEventListener('resize', handleResize, { passive: true });
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
            aria-label="GG Manufaktur"
          >
            {/* The two logo files are the same artwork in two inks on the same
                transparent ground, so the pair can be stacked and cross-faded.
                Swapping the `src` instead would cut hard in the middle of the
                glass's own 600ms transition. The white one vanishes on the
                light glass, the blue one on the dark. */}
            <span className="relative block h-8">
              <img
                src="/logos/Esport-Manufaktur_Logo-weiss.png"
                alt="GG Manufaktur"
                className="h-8 w-auto object-contain transition-opacity duration-500"
                style={{ opacity: inkOnGlass ? 0 : 1 }}
              />
              <img
                src="/logos/Esport-Manufaktur_Logo-blau.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-8 w-auto object-contain transition-opacity duration-500"
                style={{ opacity: inkOnGlass ? 1 : 0 }}
              />
            </span>
          </button>
        </div>

        {/* Desktop Navigation -- absolutely centered so logo/Kontakt width never skews it */}
        <div className="flex items-center flex-nowrap whitespace-nowrap gap-10 lg:gap-14 px-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={(e) => handleLinkClick(e, 'competencies')}
            className={`nav-link shrink-0 text-sm font-medium tracking-tight transition-colors duration-500 ${navLinkTone}`}
          >
            Services
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'ueber-uns')}
            className={`nav-link shrink-0 text-sm font-medium tracking-tight transition-colors duration-500 ${navLinkTone}`}
          >
            Über uns
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'best-cases')}
            className={`nav-link shrink-0 text-sm font-medium tracking-tight transition-colors duration-500 ${navLinkTone}`}
          >
            Best Cases
          </button>
          <button
            onClick={(e) => handleLinkClick(e, 'blog')}
            className={`nav-link shrink-0 text-sm font-medium tracking-tight transition-colors duration-500 ${navLinkTone}`}
          >
            Blog &amp; Wissen
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
          opened, this same block (not a separate floating card) grows a panel
          flush with the top edge, so the nav visibly emerges from the burger
          button instead of popping up elsewhere. The toggle button never
          moves -- it just swaps icon -- so it doubles as the close (X) button
          in the exact top-right spot where it always sits.

          The open panel is the site's canvas with ink chrome, the same three
          colours as everything behind it. It used to be a dark slab, which
          was the last surface still running the old palette. */}
      <div
        ref={mobileBarRef}
        className={`md:hidden pointer-events-auto relative ${
          isOpen ? 'bg-[#badeda] border border-[#0b0f2a]/10 overflow-hidden' : ''
        }`}
        style={
          // The open menu stays opaque. It covers most of the viewport rather
          // than skimming across it, so there is no ground behind it worth
          // showing -- and a full menu list needs one of its own.
          isOpen ? undefined : { background: 'transparent', boxShadow: 'none' }
        }
      >
        {/*
          The band, as its own layer behind the row rather than a fill on the
          bar itself.

          That is what lets it be shorter than it looks and still end softly:
          the layer is taller than the row it sits behind, and a mask fades it
          out downward, so there is no edge anywhere -- it thins into the page.
          A background alone could not do that, because the frost would still
          stop dead on a straight line; masking the layer takes the blur with
          it.

          It is translucent at every scroll position, not just once scrolled.
          Whatever is behind stays readable through it, and the mark and the
          burger can be white throughout -- including at the top of a subpage,
          where the canvas is light and white chrome had nothing to sit on.
        */}
        {!isOpen && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[160%] pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.62) 38%, rgba(2,6,23,0.28) 70%, rgba(2,6,23,0) 100%)',
              backdropFilter: 'blur(10px) saturate(150%)',
              WebkitBackdropFilter: 'blur(10px) saturate(150%)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.55) 68%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.55) 68%, transparent 100%)'
            }}
          />
        )}

        <div className="relative flex items-center justify-between px-6 py-3.5">
          <button
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center"
            aria-label="GG Manufaktur"
          >
            <span className="relative block h-9">
              <img
                src="/logos/Esport-Manufaktur_Logo-weiss.png"
                alt="GG Manufaktur"
                className="h-9 w-auto object-contain transition-opacity duration-500"
                style={{ opacity: isOpen ? 0 : 1 }}
              />
              <img
                src="/logos/Esport-Manufaktur_Logo-blau.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-9 w-auto object-contain transition-opacity duration-500"
                style={{ opacity: isOpen ? 1 : 0 }}
              />
            </span>
          </button>
          <button
            className={`p-2 rounded-full transition-colors ${
              isOpen
                ? 'text-[#0b0f2a] hover:bg-[#0b0f2a]/10'
                : 'text-white hover:bg-white/10'
            }`}
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
              transition={{ duration: DUR.panel, ease: EASE_REVEAL }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-7 text-lg font-bold text-[#0b0f2a] text-center px-8 pt-2 pb-8">
                <button
                  onClick={(e) => handleLinkClick(e, 'competencies')}
                  className="transition-all tracking-tighter text-[#0b0f2a] hover:text-[#0e958e]"
                >
                  Services
                </button>
                <button
                  onClick={(e) => handleLinkClick(e, 'ueber-uns')}
                  className="transition-all tracking-tighter text-[#0b0f2a] hover:text-[#0e958e]"
                >
                  Über uns
                </button>
                <button
                  onClick={(e) => handleLinkClick(e, 'best-cases')}
                  className="transition-all tracking-tighter text-[#0b0f2a] hover:text-[#0e958e]"
                >
                  Best Cases
                </button>
                <button
                  onClick={(e) => handleLinkClick(e, 'blog')}
                  className="transition-all tracking-tighter text-[#0b0f2a] hover:text-[#0e958e]"
                >
                  Blog &amp; Wissen
                </button>
                <div className="h-px bg-[#0b0f2a]/15 w-1/3 mx-auto" />
                <button
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="spring mx-auto bg-[#0b0f2a] hover:bg-[#0e958e] text-white px-5 py-3 sm:px-7 sm:py-3.5 rounded-full font-black text-sm sm:text-base tracking-tighter"
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
            className="md:hidden fixed inset-0 z-[-1] bg-[#0b0f2a]/45 backdrop-blur-sm pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
