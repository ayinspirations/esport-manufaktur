import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { STAGGER, DUR } from './motion';

interface TSystemsDetailProps {
  onBack: () => void;
}

const images = [
  '/images/t-systems/slide-1.jpg',
  '/images/t-systems/slide-2.jpg',
  '/images/t-systems/slide-3.jpg',
  '/images/t-systems/slide-4.jpg',
  '/images/t-systems/slide-5.jpg',
  '/images/t-systems/slide-6.jpg',
];

export const TSystemsDetail: React.FC<TSystemsDetailProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-[#badeda] text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="/images/t-systems/hero.jpg"
          alt="T-Systems Gaming Platform"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(186,222,218,0) 34%, rgba(186,222,218,0.9) 60%, #badeda 76%)'
          }}
        />
        {/* Tells the nav where the photograph ends and the canvas begins. The
            bar crosses both halves of this hero on the way down, and the img
            underneath would otherwise report "dark" for the canvas half too.
            Decorative and empty -- it exists to be hit-tested. */}
        <div data-nav-ground="dark" aria-hidden="true" className="absolute inset-x-0 top-0 h-[52%]" />


        <div className="absolute bottom-16 left-6 right-6 md:left-14 md:right-14 z-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 md:gap-8">
            <div className="flex flex-col w-full md:w-auto">
              <h1 className="text-[clamp(36px,9vw,120px)] font-black leading-[0.85] tracking-tighter uppercase text-[#0b0f2a]">
                <RevealText as="span" by="word" text="T-Systems" delay={0.1} />
                <RevealText as="span" by="word" text="Gaming." delay={0.24} className="text-[#0e958e] italic" />
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText as="h2" by="word" text="Gaming-Plattform für T-Systems - Employer Branding für Tech-Talente" className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic text-[#0e958e]" />
              <Reveal as="p" delay={0.08} className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                Für T-Systems haben wir eine maßgeschneiderte Gaming-Plattform entwickelt, um das Unternehmen als attraktiven Arbeitgeber im technischen Umfeld zu positionieren. Ziel war es, technikaffine Schüler anzusprechen und sie auf spielerische Weise für IT und technische Berufe zu begeistern.
              </Reveal>
              <Reveal as="p" delay={0.16} className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700 mt-6">
                Die Plattform bot digitale Qualifikationsturniere, spannende Inhalte und gezielte Interaktionen - perfekt zugeschnitten auf die junge Zielgruppe. Unser Team der GG Manufaktur kümmerte sich um die gesamte Umsetzung: von der Konzeption und Gestaltung bis hin zur technischen Umsetzung und Betreuung.
              </Reveal>
            </section>

            {/* Image Slider — pure CSS, no AnimatePresence */}
            <div className="relative group rounded-shell overflow-hidden aspect-video bg-[#badeda] shadow-2xl">
              <div className="absolute inset-0">
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Slide ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ opacity: i === currentIndex ? 1 : 0 }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200';
                    }}
                  />
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-30 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-30 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <section className="space-y-8">
              <Reveal as="p" delay={0.24} className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Neben der digitalen Aktivierung organisierten wir am 10. Dezember 2024 ein großes Live-Finale, bei dem die Besucher nicht nur zuschauen, sondern an Spielstationen auch selbst aktiv werden und die Gaming-Welt hautnah erleben konnten. Mit hochwertigen Setups, großen Screens und interaktiven Elementen wurde ein echtes Erlebnis geschaffen, das Marke, Technologie und Community nachhaltig verbindet.
              </Reveal>
              <Reveal as="p" delay={0.24} className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Durch ein umfassendes Eventpaket haben wir es T-Systems ermöglicht, potenzielle Talente auf eine moderne und interaktive Weise anzusprechen.
              </Reveal>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {[
                { title: 'Konzept und Umsetzung', icon: <Target className="w-6 h-6" />, text: 'Entwicklung einer Gaming-Plattform, die speziell auf die Zielgruppe zugeschnitten ist.' },
                { title: 'Finale vor Ort', icon: <Users className="w-6 h-6" />, text: 'Spannendes Live-Finale mit aktiven Gaming-Stationen für Zuschauer und Community-Erlebnisse.' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * STAGGER.card} y={26} className="bg-white/50 backdrop-blur-xl p-8 rounded-surface border border-slate-900/5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                </Reveal>
              ))}
            </div>

            <div className="pt-12 flex justify-center">
              <a
                href="https://www.t-systems.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="/logos/T-Systems_Logo_2024.svg.png"
                  alt="T-Systems Logo"
                  className="h-16 md:h-24 w-auto opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12 order-last lg:order-none">
            <div className="sticky top-32">
              <Reveal y={28} duration={DUR.slow} className="bg-slate-900 text-white p-10 rounded-shell shadow-2xl">
                <div className="space-y-10">
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Format</h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Gaming- & Tech-Activation Plattform</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Digital + Live | skalierbar | employer-ready</p>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Leistungen</h3>
                    </div>
                    <ul className="space-y-6">
                      {[
                        { title: 'Konzeption & Strategie', desc: 'Employer-Branding-Format speziell für Tech-Talente' },
                        { title: 'Plattform & Tech', desc: 'Eigene Gaming- & Turnierplattform inkl. Registrierung, Challenges & Tracking' },
                        { title: 'Content & Experience', desc: 'Gamifizierte Qualifikation, interaktive Touchpoints, Event-Inszenierung' },
                        { title: 'Live-Event Umsetzung', desc: 'Setup, Technik, Screens, Spielstationen, Betreuung vor Ort' },
                      ].map((item, i) => (
                        <li key={i}>
                          <h5 className="font-black uppercase tracking-widest text-[10px] text-[#0e958e] mb-1">{item.title}</h5>
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
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Zielgruppe erreicht:</div>
                        <div className="text-white font-black">Schüler:innen & Young Tech Talents</div>
                      </li>
                      <li>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Engagement:</div>
                        <div className="text-white font-black">Aktive Teilnahme statt passiver Werbung</div>
                      </li>
                      <li>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Markenwahrnehmung:</div>
                        <div className="text-white font-black">Innovativ · technologisch · nahbar</div>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Ergebnis</h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-black">Digitale Aktivierung + Live-Finale</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">Ein konsistentes Erlebnis von Online bis On-Site</p>
                    </div>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                        <div className="text-lg font-black text-white leading-tight">Erfolgreich umgesetzt – Live-Event</div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      "Marke, Technologie & Community nachhaltig verbunden"
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
