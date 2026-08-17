
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { DUR, STAGGER, EASE_REVEAL } from './motion';

interface UeberUnsPageProps {
  onNavigate: (page: any) => void;
  scrollToSection: (id: string) => void;
}

const paragraphs = [
  'Die eSport Manufaktur ist eine Agentur für Gaming, eSport, Gamification und interaktive Markenaktivierung. Wir entwickeln Lösungen für Unternehmen, Marken, Vereine, Verbände und Veranstalter, die ihre Zielgruppen nicht nur erreichen, sondern aktiv einbinden wollen. Dabei denken wir physische und digitale Touchpoints von Anfang an gemeinsam.',
  'Von der ersten strategischen Idee über Konzeption, Design und Technologie bis zur Umsetzung vor Ort begleiten wir Projekte ganzheitlich. Das kann ein einzelnes gamifiziertes Messemodul sein, ein digitaler Eventpass, ein eSport-Turnier, eine Recruiting-Kampagne oder die vollständige Konzeption und Umsetzung eines Events.',
  'Unsere eigenen modularen Software-Komponenten ermöglichen es uns, digitale Lösungen flexibel auf Marken, Zielgruppen und Anwendungsfälle anzupassen. Wo Standardmodule nicht ausreichen, entwickeln wir individuelle Funktionen und Experiences.',
  'Gleichzeitig verfügen wir über die operative Erfahrung, diese Konzepte auch physisch zum Leben zu bringen. Gemeinsam mit spezialisierten Partnern realisieren wir Gaming-Setups, Messebau, Veranstaltungstechnik, Streaming, Foto- und Videoproduktion sowie komplette Event-Infrastrukturen.',
  'Content verstehen wir dabei nicht als reine Begleitkommunikation. Wir übersetzen Produkte und Markenbotschaften in interaktive und gamifizierte Formate, die unterhalten, aktivieren und im Gedächtnis bleiben. Creator, Hosts und eSport-Talents integrieren wir dort, wo sie einen echten Mehrwert für Zielgruppe und Kampagne schaffen.',
  'Für Vereine und Verbände entwickeln wir darüber hinaus digitale und physische Scouting- und Talent-Development-Lösungen. Unternehmen unterstützen wir dabei, Gaming, eSport und Gamification für Employer Branding und Recruiting einzusetzen und neue Zugänge zu jungen, digital affinen Zielgruppen zu schaffen.',
  'Unser Anspruch: Strategie, Technologie und Erlebnis so miteinander zu verbinden, dass aus Aufmerksamkeit echte Interaktion entsteht.'
];

export const UeberUnsPage: React.FC<UeberUnsPageProps> = ({ onNavigate, scrollToSection }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-14 pt-32 md:pt-48 pb-24 md:pb-40">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          <h1 className="text-[clamp(44px,8vw,110px)] font-black leading-[0.9] tracking-tighter uppercase">
            Über uns.
          </h1>
          <p className="text-white/60 font-bold text-xl md:text-2xl mt-8 max-w-2xl leading-snug tracking-tight">
            Wir machen Marken und Botschaften erlebbar.
          </p>
        </motion.div>

        <div className="mt-24 md:mt-32 space-y-14 md:space-y-16">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              // Staggered and on the shared reveal curve, so this page lands
              // on the same rhythm as the tile grids elsewhere.
              transition={{ duration: DUR.slow, delay: i * STAGGER.line, ease: EASE_REVEAL }}
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl font-medium tracking-tight"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="mt-24 md:mt-32 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-sm tracking-tight transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </button>

          <button
            onClick={() => scrollToSection('contact-section')}
            className="bg-emerald-400 text-slate-900 px-6 py-3.5 rounded-full font-black text-sm tracking-tighter transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            Kontakt aufnehmen
          </button>
        </div>
      </div>
    </div>
  );
};
