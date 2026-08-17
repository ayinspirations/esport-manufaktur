
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, Trophy, Monitor, Cpu, Camera, 
  CheckCircle2, ArrowRight, ExternalLink, Layers, Globe, ShieldCheck, Zap, Target, Users
} from 'lucide-react';

interface ServicesDetailProps {
  onNavigate: (page: 'home' | 'services') => void;
}

const serviceData = [
  {
    id: 'gamification',
    icon: Gamepad2,
    shortTitle: "GAMIFICATION",
    title: "Gamification & Marketing",
    text: "Wir nutzen spielerische Mechaniken, um Aufmerksamkeit in echte Interaktion zu verwandeln. Gamification wird dabei gezielt als Marketing-, Recruiting- oder Aktivierungsinstrument eingesetzt.",
    capabilities: [
      { name: "Gamification-Strategie", desc: "Strategische Planung für Marken" },
      { name: "Interaktive Kampagnen", desc: "Digital & Analog verbunden" },
      { name: "Recruiting Formate", desc: "Talentgewinnung spielerisch" },
      { name: "Branded Games", desc: "Individuelle Game-Development" },
      { name: "Sponsorship Activation", desc: "Sponsoring erlebbar machen" },
      { name: "Lead Mechaniken", desc: "Datenbasierte Interaktion" }
    ]
  },
  {
    id: 'gaming',
    icon: Trophy,
    shortTitle: "GAMING",
    title: "Gaming & eSports Events",
    text: "Von Community-Turnieren bis zu professionellen Wettbewerben – wir planen, organisieren und betreiben Gaming- und eSports-Events online und offline.",
    capabilities: [
      { name: "Online-Turniere & Ligen", desc: "Vom Community-Cup bis Pro-Level" },
      { name: "Offline-Events & Arenen", desc: "Full-Scale Event-Produktion" },
      { name: "Scouting-Wettkämpfe", desc: "Talent-Sichtung & Formate" },
      { name: "Creator-Events", desc: "Influencer & Streamer Events" },
      { name: "Community-Formate", desc: "Langfristiger Beziehungsaufbau" },
      { name: "Eventbetrieb", desc: "Regie & Administration" }
    ]
  },
  {
    id: 'eventtech',
    icon: Monitor,
    shortTitle: "EVENTTECHNIK",
    title: "Eventtechnik & Messe",
    text: "Wir sind kein klassischer Messebauer. Wir liefern die Technik und Aktivierung, die Markenauftritte erlebbar macht.",
    capabilities: [
      { name: "LED-Wände & Würfel", desc: "Visuelle High-End Setups" },
      { name: "Rigging & Traversen", desc: "Sicherer Aufbau & Statik" },
      { name: "Licht & Sound", desc: "Atmosphäre & Akustik" },
      { name: "Streaming & Broadcast", desc: "TV-Level Übertragungen" },
      { name: "Gaming-Setups", desc: "PC, Konsole & Netzwerk" },
      { name: "Technische Planung", desc: "CAD & Vorort-Betreuung" }
    ]
  },
  {
    id: 'software',
    icon: Cpu,
    shortTitle: "SOFTWARE",
    title: "Software & Plattformen",
    text: "Digitale Systeme bilden das Rückgrat moderner Aktivierungen. Wir entwickeln und betreiben skalierbare Plattformlösungen.",
    capabilities: [
      { name: "Turnier- & Ligensysteme", desc: "Automatisierte Abläufe" },
      { name: "Gamification-Module", desc: "Flexible Plug-in Lösungen" },
      { name: "Community-Plattformen", desc: "Digitale Markenhäuser" },
      { name: "White-Label-Lösungen", desc: "Full Branding für Firmen" },
      { name: "DSGVO-konform", desc: "Maximale Datensicherheit" },
      { name: "Lead- & Voting-Tools", desc: "Echtzeit Interaktionstools" }
    ]
  },
  {
    id: 'content',
    icon: Camera,
    shortTitle: "CONTENT",
    title: "Content Creation & Streaming",
    text: "Content ist Verstärker – vor, während und nach dem Event. Wir fangen Emotionen ein und machen sie nachhaltig teilbar.",
    capabilities: [
      { name: "Social-Media-Videos", desc: "Short-Form Vertical Content" },
      { name: "Event-Highlights", desc: "Die besten Momente im Fokus" },
      { name: "Livestream-Produktion", desc: "Professionelles Studio-Level" },
      { name: "Recruiting Content", desc: "Authentische Einblicke" },
      { name: "Creator-Formate", desc: "Inhaltliche Kooperationen" },
      { name: "Aftermovies", desc: "Kino-Feeling für Ihre Events" }
    ]
  }
];

export const ServicesDetail: React.FC<ServicesDetailProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(serviceData[0].id);
  const activeService = serviceData.find(s => s.id === activeTab)!;

  return (
    <div className="pt-24 md:pt-40 pb-20 bg-[#d1dbd2]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">
        {/* Intro Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <h1 className="text-6xl md:text-[110px] font-bold mb-6 tracking-tighter leading-[0.85] text-slate-950">
            Leistungen mit <br />
            <span className="text-slate-900/40 italic">System.</span>
          </h1>
          <p className="text-slate-700 text-xl md:text-2xl font-bold leading-snug tracking-tight max-w-2xl">
            Wir entwickeln Konzepte, setzen sie technisch um und begleiten Projekte operativ – von der Idee bis zur Auswertung.
          </p>
        </motion.div>

        {/* Tabbed Component inspired by provided image */}
        <div className="relative">
          {/* Tab Selection Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 bg-white/30 rounded-t-[2.5rem] overflow-hidden border-x border-t border-black/5">
            {serviceData.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`relative py-10 px-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
                  activeTab === s.id 
                  ? 'bg-white shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.05)] z-10' 
                  : 'hover:bg-white/40'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === s.id ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-center ${activeTab === s.id ? 'text-slate-950' : 'text-slate-400'}`}>
                  {s.shortTitle}
                </span>
                {activeTab === s.id && (
                  <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="bg-white rounded-b-[2.5rem] p-8 md:p-24 shadow-2xl border-x border-b border-black/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 gap-16 lg:gap-32"
              >
                {/* Left Side: Category Description */}
                <div className="lg:col-span-5">
                  <div className="px-4 py-2 bg-emerald-100 rounded-lg text-emerald-700 text-[10px] font-black uppercase tracking-[0.25em] w-fit mb-10">
                    Capability 0{serviceData.findIndex(s => s.id === activeTab) + 1}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-slate-950 tracking-tighter mb-8 leading-[0.95]">
                    {activeService.title}
                  </h2>
                  <p className="text-slate-500 text-xl font-medium leading-relaxed mb-12">
                    {activeService.text}
                  </p>
                  <button className="flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">
                    Termin vereinbaren <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Right Side: Specific Capabilities */}
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {activeService.capabilities.map((cap, i) => (
                      <div key={i} className="p-8 bg-slate-50 rounded-shell border border-black/[0.03] group hover:bg-white hover:shadow-xl transition-all">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <CheckCircle2 className="w-5 h-5 opacity-30 group-hover:opacity-100" />
                        </div>
                        <h4 className="text-sm font-black text-slate-950 tracking-widest mb-2 uppercase">{cap.name}</h4>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{cap.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Section: Event Management */}
        <div className="py-24 md:py-40">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                 <div className="text-emerald-700 font-black tracking-[0.4em] uppercase text-[10px] mb-6">Experience Design</div>
                 <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10 text-slate-950 leading-[0.9]">Events als <br /> Kommunikationsanlass.</h2>
                 <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-xl">
                   Events stellen Menschen in den Mittelpunkt der Kommunikation. Wir nutzen Events als Bühne für Marken, Interaktion und Emotion.
                 </p>
              </div>
              <div className="space-y-6">
                 {[
                   { title: "B2B-Events", desc: "Strategisch vorbereitet, kreativ umgesetzt und technisch sauber realisiert.", icon: Users },
                   { title: "Red Carpet & Premieren", desc: "Perfekte Abläufe, klare Inszenierung, professionelle Technik.", icon: Zap },
                   { title: "Promotions & Activations", desc: "Marken greifbar machen – am POS, auf Messen oder im öffentlichen Raum.", icon: Target }
                 ].map((item, i) => (
                    <div key={i} className="p-8 bg-white rounded-shell border border-black/5 shadow-xl flex gap-6 items-center">
                      <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-950 tracking-tighter mb-1 uppercase">{item.title}</h4>
                        <p className="text-slate-500 font-medium tracking-tight text-sm">{item.desc}</p>
                      </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Section: Technology & Platforms */}
        <div className="mb-24">
           <section className="bg-slate-950 rounded-shell p-10 md:p-24 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
              <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
                 <div className="lg:w-1/2">
                   <div className="text-emerald-400 font-black tracking-[0.4em] uppercase text-[10px] mb-8">Infrastructure</div>
                   <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-10 leading-[0.9]">Skalierbare <br /> Software.</h2>
                   <p className="text-white/40 text-lg font-medium leading-relaxed mb-12 max-w-xl">
                     Unsere Plattformen haben jeweils eine eigene Website, um Zielgruppen klar anzusprechen. Wir liefern das digitale Rückgrat.
                   </p>
                   <div className="space-y-6">
                      <div className="flex items-center gap-5 text-white/80 text-lg font-bold group cursor-pointer p-6 bg-white/5 rounded-surface border border-white/5 hover:bg-white/10 transition-all">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <Globe className="w-6 h-6" />
                        </div>
                        <span>Community- & Turnierplattform</span>
                        <ExternalLink className="w-5 h-5 ml-auto opacity-20 group-hover:opacity-100" />
                      </div>
                      <div className="flex items-center gap-5 text-white/80 text-lg font-bold group cursor-pointer p-6 bg-white/5 rounded-surface border border-white/5 hover:bg-white/10 transition-all">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <Layers className="w-6 h-6" />
                        </div>
                        <span>White-Label-Engine für Unternehmen</span>
                        <ExternalLink className="w-5 h-5 ml-auto opacity-20 group-hover:opacity-100" />
                      </div>
                   </div>
                   <button className="mt-12 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl tracking-tighter hover:scale-105 transition-all">
                     Zur Plattform-Übersicht
                   </button>
                 </div>
                 <div className="lg:w-1/2 relative w-full">
                    <div className="relative glass bg-white/5 border-white/10 p-5 rounded-shell shadow-3xl">
                       <img 
                        src="https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=1200" 
                        className="w-full h-auto rounded-shell shadow-2xl opacity-50" 
                        alt="Software Platform" 
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                         <ShieldCheck className="w-10 h-10 text-white" />
                      </div>
                    </div>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};
