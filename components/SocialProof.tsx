
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollToCasesCTA } from './ScrollToCasesCTA';

const logos = [
  { name: 'DAZN', url: '/logos/DAZN_Logo_Master.svg.png', link: 'https://www.dazn.com/de-DE/welcome' },
  { name: 'Nivea', url: '/logos/nivea-men-logo-png_seeklogo-323961.png', blend: true, link: 'https://www.nivea.de' },
  { name: 'T-Systems', url: '/logos/T-Systems_Logo_2024.svg.png', link: 'https://www.t-systems.com/' },
  { name: 'Sparkasse', url: '/logos/Sparkasse.svg.png', link: 'https://www.sparkasse.de' },
  { name: 'Indeed', url: '/logos/indeed-logo.png', link: 'https://www.indeed.com' },
  { name: 'Mercedes Benz', url: '/logos/mercedes-benz-logo-png_seeklogo-91081.png' },
  { name: 'Bayerischer Fussballverband', url: '/logos/Bayerischer_Fussballverband.svg.png', link: 'https://www.bfv.de' },
  { name: 'Rewe', url: '/logos/a2dec73e456eae1312e702710b3cb5c5.jpg' },
  { name: 'Schalke 04', url: '/logos/sc3377fe86-schalke-04-logo-fc-schalke-04-liblogo.png', blend: true },
  { name: 'RB Leipzig', url: '/logos/RB-Leipzig-Logo-500x281.png' },
  { name: 'Eintracht Frankfurt', url: '/logos/Eintracht-Frankfurt-logo-500x325.png' },
  { name: 'Techniker Krankenkasse', url: '/logos/Techniker_Krankenkasse_2016_logo.svg.png' },
  { name: '1. FC Köln', url: '/logos/1-fc-koln-logo-png_seeklogo-505047.png' },
  { name: 'Holstein Kiel', url: '/logos/kieler-sv-holstein-logo-png_seeklogo-295846.png' },
  { name: 'VfB Stuttgart', url: '/logos/VfB-Stuttgart-logo-2014-500x281.png' },
  { name: 'VfL Bochum', url: '/logos/VfL_Bochum_logo.svg.png' },
  { name: 'OneFootball', url: '/logos/onefootball-logo-png_seeklogo-458889.png' },
  { name: 'Betano', url: '/logos/Betano-Symbol-500x281.png' },
  { name: 'Effect Energy', url: '/logos/effect-energy-drink-logo-png-transparent.png' },
  { name: 'Tailormade', url: '/logos/Tailormade.png' },
  { name: 'B2Sports', url: '/logos/B2Sports_Logo_digital_hor_green-e1607446064766.webp' },
  { name: 'Naspa', url: '/logos/naspa-logo-apriori.png' },
  { name: 'Mingle', url: '/logos/mingle.png' },
  { name: 'ITCS', url: '/logos/ITCS_MESSE_LOGO_SCHWARZ-WEISS-RGBR.png' },
  { name: 'Logo HHN', url: '/logos/Logo_HHN.png' }
];

interface SocialProofProps {
  scrollToSection?: (id: string) => void;
}

// A few logos from the end of the list, prepended so the strip already has
// content to the left of DAZN at rest instead of a hard, empty start edge.
const leadIn = logos.slice(-4);
const trackLogos = [...leadIn, ...logos];

const LogoItem: React.FC<{ logo: (typeof logos)[number]; copyKey: string }> = ({ logo, copyKey }) => (
  <a
    key={copyKey}
    href={logo.link || '#'}
    target={logo.link ? '_blank' : undefined}
    rel={logo.link ? 'noopener noreferrer' : undefined}
    className={`flex items-center justify-center transition-all duration-500 shrink-0 pointer-events-auto ${logo.link ? 'cursor-pointer' : 'cursor-default'}`}
    onClick={(e) => !logo.link && e.preventDefault()}
  >
    <img
      src={logo.url}
      alt={logo.name}
      className={`w-auto object-contain ${
        logo.name === 'Indeed' || logo.name === 'Mercedes Benz'
          ? 'h-16 md:h-20 lg:h-24 max-w-[180px] md:max-w-[260px]'
          : 'h-12 md:h-16 lg:h-20 max-w-[140px] md:max-w-[220px]'
      }`}
      loading="eager"
      decoding="async"
    />
  </a>
);

export const SocialProof: React.FC<SocialProofProps> = ({ scrollToSection }) => {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center gap-16 md:gap-20 select-none bg-[#d1dbd2] overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      <style>{`
        .marquee-track {
          --marquee-start: -236px;
        }
        @media (min-width: 768px) {
          .marquee-track { --marquee-start: -472px; }
        }
        @media (min-width: 1024px) {
          .marquee-track { --marquee-start: -290px; }
        }
        @keyframes marquee-scroll {
          from { transform: translate3d(var(--marquee-start), 0, 0); }
          to { transform: translate3d(calc(var(--marquee-start) - 50%), 0, 0); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 22s linear infinite;
          display: flex;
          width: fit-content;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Block 1: Headline */}
      <div className="px-6 md:px-14">
        <div className="max-w-[1440px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[clamp(44px,7.5vw,110px)] font-black leading-[0.85] tracking-tighter uppercase flex flex-col items-center">
              <span className="text-slate-950">Brands we</span>
              <span className="text-slate-400/90">leveling up.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Block 2: Infinite Logo Band */}
      <div className="relative flex w-full overflow-hidden group py-0 z-20">
        <div className="marquee-track animate-marquee-scroll flex items-center whitespace-nowrap px-0 py-4">
          <div className="flex items-center gap-9 md:gap-32 lg:gap-40 px-8 md:px-16 lg:px-20 shrink-0">
            {trackLogos.map((logo, i) => (
              <LogoItem key={`copy-1-${logo.name}-${i}`} logo={logo} copyKey={`copy-1-${logo.name}-${i}`} />
            ))}
          </div>
          <div className="flex items-center gap-9 md:gap-32 lg:gap-40 px-8 md:px-16 lg:px-20 shrink-0" aria-hidden="true">
            {trackLogos.map((logo, i) => (
              <LogoItem key={`copy-2-${logo.name}-${i}`} logo={logo} copyKey={`copy-2-${logo.name}-${i}`} />
            ))}
          </div>
        </div>

        {/* Linear-inspired Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-[200px] lg:w-[400px] bg-gradient-to-r from-[#d1dbd2] via-[#d1dbd2]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-[200px] lg:w-[400px] bg-gradient-to-l from-[#d1dbd2] via-[#d1dbd2]/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Block 3: CTA to Best Cases */}
      <ScrollToCasesCTA onScroll={scrollToSection} />
    </section>
  );
};
