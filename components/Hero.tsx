
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { HERO_GROUP_DELAY, HERO_GROUP_DURATION } from './heroIntro';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  scrollToSection?: (id: string) => void;
  onOpenBooking?: () => void;
}

const BEGEISTERN_CHARS = 'BEGEISTERN'.split('');

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenBooking }) => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const belowRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion: skip the sequence entirely, land directly on the final state.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.hero-line-1, .hero-line-2, .hero-begeistern-char', { opacity: 1, y: 0 });
        gsap.set('.hero-subtext, .hero-cta-btn, .hero-cta-link', { opacity: 1, y: 0, x: 0, scale: 1 });
        gsap.set([gridRef.current, glowRef.current], { opacity: 1, x: 0, y: 0, scale: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        // Phase 1 -- atmosphere: grid + ambient glow settle into their final position.
        tl.from(gridRef.current, { opacity: 0, scale: 1.08, x: 22, y: -14, duration: 1.6, ease: 'power2.out' }, 0)
          .from(glowRef.current, { opacity: 0, scale: 1.12, duration: 1.9, ease: 'power2.out' }, 0)

          // Phase 3 -- "Wir wollen" / "Menschen": one clean, restrained fade+lift, not
          // a masked flip -- these two lines stay quiet so BEGEISTERN can stand out.
          .from('.hero-line-1', { opacity: 0, y: 28, duration: 0.9, ease: 'power2.out' }, 0.4)
          .from('.hero-line-2', { opacity: 0, y: 28, duration: 0.9, ease: 'power2.out' }, 0.55)

          // Phase 4 -- BEGEISTERN animates on its own, independent beat: a plain
          // per-character fade-in (opacity only, no follow-up), matching the
          // reference exactly. Gradient/colors are untouched.
          .from(
            '.hero-begeistern-char',
            { opacity: 0, duration: 0.5, stagger: 0.125, ease: 'power1.in' },
            0.75
          )

          // Phase 5 -- nav, subline, and both CTAs fade in together as one beat,
          // only once the full headline has landed.
          .from('.hero-subtext', { opacity: 0, y: 20, duration: HERO_GROUP_DURATION, ease: 'power2.out' }, HERO_GROUP_DELAY)
          .from(
            ctaBtnRef.current,
            { opacity: 0, y: 20, scale: 0.96, duration: HERO_GROUP_DURATION, ease: 'power2.out' },
            HERO_GROUP_DELAY
          )
          .from(
            '.hero-cta-link',
            { opacity: 0, y: 20, duration: HERO_GROUP_DURATION, ease: 'power2.out' },
            HERO_GROUP_DELAY
          );

        // Phase 10 -- natural scroll parallax exit (no pinning, no scroll-jacking).
        gsap.timeline({
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 }
        })
          .to(headlineRef.current, { yPercent: -8, opacity: 0.85, ease: 'none' }, 0)
          .to(gridRef.current, { yPercent: -14, ease: 'none' }, 0)
          .to(glowRef.current, { yPercent: 6, opacity: 0.7, ease: 'none' }, 0)
          .to(belowRef.current, { yPercent: -18, ease: 'none' }, 0);

        // Phase 7 -- pointer parallax wakes up once the intro has landed, so it never
        // fights the entrance tween for the same x/y transform on the same elements.
        // Desktop, fine-pointer only -- touch devices skip this entirely.
        if (window.matchMedia('(pointer: fine)').matches) {
          tl.eventCallback('onComplete', () => {
            const glowX = gsap.quickTo(glowRef.current, 'x', { duration: 1.1, ease: 'power3' });
            const glowY = gsap.quickTo(glowRef.current, 'y', { duration: 1.1, ease: 'power3' });
            const gridX = gsap.quickTo(gridRef.current, 'x', { duration: 0.9, ease: 'power3' });
            const gridY = gsap.quickTo(gridRef.current, 'y', { duration: 0.9, ease: 'power3' });
            const contentX = gsap.quickTo(contentRef.current, 'x', { duration: 0.7, ease: 'power3' });
            const contentY = gsap.quickTo(contentRef.current, 'y', { duration: 0.7, ease: 'power3' });

            const handlePointerMove = (e: PointerEvent) => {
              const nx = (e.clientX / window.innerWidth) * 2 - 1;
              const ny = (e.clientY / window.innerHeight) * 2 - 1;
              glowX(nx * 10);
              glowY(ny * 10);
              gridX(nx * 5);
              gridY(ny * 5);
              contentX(nx * 2);
              contentY(ny * 2);
            };

            window.addEventListener('pointermove', handlePointerMove);
            // matchMedia cleanup: called automatically when this branch's query
            // stops matching or the component unmounts.
            return () => window.removeEventListener('pointermove', handlePointerMove);
          });
        }
      });
    },
    { scope: heroRef }
  );

  const handleCtaEnter = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse' || !ctaBtnRef.current) return;
    gsap.to(ctaBtnRef.current, { scale: 1.03, duration: 0.35, ease: 'power3.out' });
  });

  const handleCtaMove = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse' || !ctaBtnRef.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    gsap.to(ctaBtnRef.current, { x: relX * 5, y: relY * 5, duration: 0.4, ease: 'power3.out' });
  });

  const handleCtaLeave = contextSafe(() => {
    if (!ctaBtnRef.current) return;
    gsap.to(ctaBtnRef.current, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
  });

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#020617] flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" />

        {/* Ambient light -- large, low-opacity radial gradient, no filter:blur() (see
            note below on grid) so it never triggers a first-paint flicker on mobile
            Safari. Volumetric feel comes purely from the gradient's own soft stops. */}
        <div
          ref={glowRef}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 16%, rgba(0,129,141,0.36) 0%, rgba(0,129,141,0.17) 26%, rgba(0,129,141,0.05) 46%, transparent 64%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />

        {/* Diagonal line pattern -- two layers at different spacing so it reads as
            depth rather than a flat repeating wallpaper, each masked with a radial
            (bright center-right, fading toward the edges) intersected with a vertical
            fade. White-based mask stops on purpose: black-to-transparent gradients can
            render as luminance masks in some browsers (black ~= invisible regardless
            of alpha), wiping the pattern out instead of giving a controlled fade. */}
        <div ref={gridRef} className="absolute inset-0">
          <div
            className="absolute top-0 right-0 w-[85%] h-full opacity-60"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(45, 212, 191, 0.55) 38px, rgba(45, 212, 191, 0.55) 40px)',
              maskImage:
                'radial-gradient(ellipse 70% 65% at 68% 45%, white 0%, white 35%, transparent 78%), linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 65% at 68% 45%, white 0%, white 35%, transparent 78%), linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          />
          <div
            className="absolute top-0 right-0 w-[60%] h-full opacity-25"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, transparent, transparent 78px, rgba(132, 204, 22, 0.4) 78px, rgba(132, 204, 22, 0.4) 80px)',
              maskImage: 'radial-gradient(ellipse 60% 60% at 72% 40%, white 0%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 72% 40%, white 0%, transparent 75%)'
            }}
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 sm:px-10 md:px-16 flex flex-col items-center text-center"
      >
        <h1
          ref={headlineRef}
          aria-label="Wir wollen Menschen begeistern"
          className="text-[12vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[82px] xl:text-[100px] font-black text-white leading-[0.95] tracking-tighter"
        >
          <span className="hero-line-1 block" aria-hidden="true">
            WIR WOLLEN
          </span>
          <span className="hero-line-2 block" aria-hidden="true">
            MENSCHEN
          </span>
          <span className="hero-line-3 block" aria-hidden="true">
            {BEGEISTERN_CHARS.map((char, i) => (
              <span
                key={i}
                className="hero-begeistern-char inline-block bg-gradient-to-r from-[#2dd4bf] to-[#84cc16] bg-clip-text text-transparent"
                style={{
                  backgroundSize: `${BEGEISTERN_CHARS.length * 100}% 100%`,
                  backgroundPosition: `${(i / (BEGEISTERN_CHARS.length - 1)) * 100}% 0`
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <div ref={belowRef}>
          <p className="hero-subtext mt-9 md:mt-11 text-white text-xl sm:text-2xl xl:text-3xl font-bold max-w-2xl mx-auto leading-[1.3] tracking-tight opacity-90">
            Mit Gaming, eSport &amp; Gamification. <br />
            Live. Digital. Messbar. Immer authentisch.
          </p>

          <div className="hero-cta flex items-center justify-center gap-6 sm:gap-8 pt-9 md:pt-11">
            <button
              ref={ctaBtnRef}
              onPointerEnter={handleCtaEnter}
              onPointerMove={handleCtaMove}
              onPointerLeave={handleCtaLeave}
              onClick={() => onOpenBooking?.()}
              className="hero-cta-btn group relative overflow-hidden bg-emerald-400 text-slate-900 px-5 py-3 sm:px-7 sm:py-3.5 rounded-full font-black text-sm sm:text-base shadow-[0_0_50px_rgba(52,211,153,0.3)] md:shadow-[0_0_60px_rgba(52,211,153,0.4)] lg:shadow-[0_0_80px_rgba(52,211,153,0.45)] tracking-tighter"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-px">
                Termin vereinbaren
              </span>
            </button>
            <button
              onClick={() => scrollToSection?.('competencies')}
              className="hero-cta-link group inline-flex items-center gap-2 text-white/90 hover:text-white font-bold text-sm sm:text-lg transition-colors duration-300 tracking-tighter"
            >
              Mehr erfahren
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
