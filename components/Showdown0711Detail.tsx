
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SimpleSlider } from './SimpleSlider';
import { ArrowLeft, Award, Zap, Users, ShieldCheck, Trophy, Target, Lightbulb } from 'lucide-react';

interface CaseDetailProps {
  onBack: () => void;
}

const images = [
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200',
];

export const Showdown0711Detail: React.FC<CaseDetailProps> = ({ onBack }) => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);




  return (
    <div className="min-h-screen bg-[#d1dbd2] text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1920" 
          alt="0711 Showdown" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920'; }}
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
                0711 <br /> <span className="text-white/40 italic">Showdown.</span>
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
                Innovatives Recruiting durch Gaming - Employer Branding für Tech-Talente
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                  Über 200 Bewerbungen, 64 Spieler:innen und 2.000 € Preisgeld für die besten Gamer. Wer junge Talente heute erreichen möchte, muss ihre Lebenswelt verstehen: Gaming, Gamification und persönliche Begegnung auf Augenhöhe.
                </p>
                <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                  Am 29. März 2025 haben wir mit dem 0711 Showdown in der CLUTCH23 eArena Fellbach gezeigt, wie innovatives Recruiting funktioniert: Über 100 Teilnehmende erwarteten ein professionell organisiertes EA FC25-Turnier, persönliche Gespräche mit Top-Arbeitgebern aus der Region und ein zielgerichtetes Gesundheitsangebot der Techniker Krankenkasse (TK).
                </p>
                <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                  Die Generation Z sucht nach Arbeitgeber:innen, die Haltung zeigen, flexibel agieren und mehr bieten als Floskeln und Flyer. Statt formeller Bewerbungsgespräche setzten wir auf echte Begegnung bei einem gemeinsamen Spiel oder im partnerschaftlichen Austausch am Spielfeldrand.
                </p>
              </div>
            </section>

            {/* Image Slider */}
            <SimpleSlider images={images} />

            <section className="space-y-8">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                Arbeitgeber präsentierten sich nahbar, glaubwürdig und einprägsam durch interaktive Formate, Challenges und authentische Markenkommunikation. Durch ein umfassendes Eventpaket haben wir beim 0711 Showdown ermöglicht, potenzielle Talente auf eine moderne und interaktive Weise anzusprechen.
              </p>
              
              <div className="mt-12">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Unsere Partner</h3>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Als Partner waren mit dabei: ZÜBLIN, FI-TS, hagebau Bolay, Klingele Paper & Packaging sowie die Techniker Krankenkasse, die mit Vorträgen, Brainfood und konkreten Impulsen zur Leistungsfähigkeit und gesunder Ernährung beitrug.
                </p>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {[
                { title: 'Konzept und Umsetzung', icon: <Target className="w-6 h-6" />, text: 'Entwicklung einer Gaming-Plattform, die speziell auf die Zielgruppe zugeschnitten ist.' },
                { title: 'Qualifikationsturniere', icon: <Award className="w-6 h-6" />, text: 'Organisation und Durchführung der digitalen Turniere zur Steigerung des Engagements.' },
                { title: 'Finale vor Ort', icon: <Users className="w-6 h-6" />, text: 'Spannendes Live-Finale mit aktiven Gaming-Stationen für Zuschauer und Community-Erlebnisse.' },
                { title: 'Employer Branding', icon: <Lightbulb className="w-6 h-6" />, text: 'Modernes Eventformat, das Partner als innovative Arbeitgebermarken positioniert.' },
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
                  {/* Format Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Format</h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-emerald-400 leading-tight">Gaming- & Recruiting-Plattform</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Digital + Live-Arena | 0711 Showdown</p>
                    </div>
                  </section>

                  {/* Leistungen Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Leistungen</h3>
                    </div>
                    <ul className="space-y-6">
                      {[
                        { title: 'Konzeption & Strategie', desc: 'Recruiting-Format auf Augenhöhe für die Gen Z' },
                        { title: 'Turnier-Management', desc: 'Vollständige Organisation von Qualifikation bis zum Finale' },
                        { title: 'Employer Branding', desc: 'Nahbare Präsentation von Top-Arbeitgebern' },
                        { title: 'Event-Logistik', desc: 'Live-Finale in der CLUTCH23 eArena Fellbach' }
                      ].map((item, i) => (
                        <li key={i}>
                          <h5 className="font-black uppercase tracking-widest text-[10px] text-emerald-400 mb-1">{item.title}</h5>
                          <p className="text-white/80 font-bold leading-snug">{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Impact Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Impact</h3>
                    </div>
                    <ul className="space-y-4">
                      <li>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Bewerbungen:</div>
                        <div className="text-white font-black">Über 200 Teilnehmeranfragen</div>
                      </li>
                      <li>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Live-Teilnehmer:</div>
                        <div className="text-white font-black">Über 100 Gamer & Partner vor Ort</div>
                      </li>
                      <li>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Recruiting:</div>
                        <div className="text-white font-black">Echte Begegnungen statt Flyer</div>
                      </li>
                    </ul>
                  </section>

                  {/* Status Section */}
                  <div className="pt-10 border-t border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                        <div className="text-lg font-black text-white leading-tight">Event-Serie erfolgreich gestartet</div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      "Innovatives Recruiting auf Augenhöhe"
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
