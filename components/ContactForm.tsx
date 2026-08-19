
import React, { useEffect, useRef, useState } from 'react';
import { HubSpotForm } from './HubSpotForm';
import { RevealText } from './Reveal';
import { LazyVideo } from './LazyVideo';
import { DUR, EASE_REVEAL_CSS } from './motion';

export const ContactForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '-100px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-14 scroll-mt-32" id="contact">
      <div
        ref={sectionRef}
        className="w-full max-w-5xl mx-auto py-12 md:py-20 relative"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="relative z-10">
          <div className="text-center mb-12 md:mb-16">
            {/* This headline and its subline were the only reveals on the
                homepage still running on the browser's default `ease` curve
                rather than the shared reveal curve, which made the closing
                section land on a subtly different rhythm from everything
                above it. Now on the same vocabulary as the rest of the page. */}
            <RevealText
              as="h2"
              by="word"
              text="Lass uns sprechen."
              className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-[#0b0f2a] uppercase"
            />
            <div
              className="max-w-2xl mx-auto"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity ${DUR.slow}s ${EASE_REVEAL_CSS} 0.3s, transform ${DUR.slow}s ${EASE_REVEAL_CSS} 0.3s`,
              }}
            >
              <p className="text-slate-600 text-lg md:text-xl font-bold tracking-tight leading-snug">
                Du hast eine Idee, ein konkretes Projekt oder suchst nach dem richtigen Ansatz?
              </p>
              <p className="text-slate-600 text-base md:text-lg font-medium tracking-tight leading-relaxed mt-4">
                Erzähl uns kurz, was du vorhast. Gemeinsam schauen wir, wie wir deine Zielgruppe mit Gaming, eSport und Gamification erreichen und deine Marke digital wie physisch erlebbar machen können.
              </p>
              <p className="text-slate-900 text-sm md:text-base font-black tracking-tight mt-6">
                Unverbindlich. Persönlich. Auf dein Projekt zugeschnitten.
              </p>
            </div>
          </div>

          <div data-nav-ground="dark" className="relative rounded-shell overflow-hidden shadow-2xl bg-[#020617] border border-white/10 min-h-[600px]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-[#020617]" />
              <div
                className="absolute -top-[10%] -left-[5%] w-[80%] h-[80%] opacity-40"
                style={{
                  background: 'radial-gradient(circle at 20% 20%, #00818d 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              <div
                className="absolute top-0 right-0 w-full h-full opacity-30"
                style={{
                  backgroundImage: `repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(20, 184, 166, 0.4) 38px, rgba(20, 184, 166, 0.4) 39.5px)`,
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%), linear-gradient(to left, black 0%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%), linear-gradient(to left, black 0%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}
              />
              <LazyVideo
                src="/videos/hero-bg.mp4"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-overlay"
              />
            </div>

            <div className="relative z-10 p-8 sm:p-12 md:p-20">
              <HubSpotForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
