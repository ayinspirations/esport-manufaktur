
import React, { useEffect, useRef, useState } from 'react';
import { HubSpotForm } from './HubSpotForm';
import { Reveal, RevealText } from './Reveal';
import { LazyVideo } from './LazyVideo';
import { DUR, EASE_REVEAL_CSS, STAGGER } from './motion';

// The three steps between a first message and a project. Numbered because the
// order is the point: nobody is asked to commit to anything before step three.
const STEPS = [
  {
    no: '01',
    title: 'Kostenloses Erstgespräch',
    text: 'Wir sprechen über dein Vorhaben, deine Ziele und die wichtigsten Rahmenbedingungen.'
  },
  {
    no: '02',
    title: 'Erste Ideenskizze',
    text: 'Auf dieser Grundlage zeigen wir dir erste mögliche Ansätze und eine passende Richtung für dein Projekt.'
  },
  {
    no: '03',
    title: 'Zusammenarbeit',
    text: 'Wenn die Richtung überzeugt, starten wir gemeinsam in den Strategy-Workshop, die konkrete Konzeption oder die vollständige Umsetzung.'
  }
];

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
              className="max-w-3xl mx-auto"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity ${DUR.slow}s ${EASE_REVEAL_CSS} 0.3s, transform ${DUR.slow}s ${EASE_REVEAL_CSS} 0.3s`,
              }}
            >
              <p className="text-slate-600 text-base md:text-lg font-medium tracking-tight leading-relaxed">
                Ob du für dein Unternehmen ein eSport-Team aufbauen, ein fertiges Eventkonzept mit einem
                zuverlässigen Partner umsetzen, dich strategisch beraten lassen oder eine erste Idee mit uns
                besprechen möchtest: Am Anfang steht immer ein offener Austausch.
              </p>
              <p className="text-slate-900 text-base md:text-lg font-bold tracking-tight leading-snug mt-5">
                Unser Erstgespräch ist kostenlos und unverbindlich. Wir lernen dein Vorhaben kennen, sprechen über
                Ziele und Rahmenbedingungen und finden gemeinsam heraus, ob wir der passende Partner sind.
              </p>
            </div>
          </div>

          {/* The three steps, between the invitation and the form: what
              actually happens after the message is sent. Rules over the
              columns rather than boxes -- the canvas carries enough surfaces
              already, and the numbers do the ordering work a card would. */}
          <div className="mb-12 md:mb-16">
            <RevealText
              as="h3"
              by="word"
              text="So starten wir gemeinsam"
              className="text-center text-[clamp(20px,2.6vw,30px)] font-black tracking-tighter uppercase text-[#0b0f2a] mb-9 md:mb-12"
            />
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-12">
              {STEPS.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.no}
                  delay={i * STAGGER.card}
                  y={24}
                  className="border-t border-[#0b0f2a]/20 pt-5 md:pt-6 text-left"
                >
                  <div className="text-[#0a6f6a] font-black text-xs tracking-[0.25em]">{step.no}</div>
                  <h4 className="mt-3 text-[#0b0f2a] font-black text-lg md:text-xl tracking-tight leading-tight">
                    {step.title}
                  </h4>
                  <p className="mt-2.5 text-slate-600 font-medium text-sm md:text-base leading-relaxed tracking-tight">
                    {step.text}
                  </p>
                </Reveal>
              ))}
            </ol>
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
                src="/videos/contact-bg.mp4"
                poster="/videos/contact-bg.jpg"
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
