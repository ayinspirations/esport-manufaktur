import React, { useEffect } from 'react';
import { Trophy, Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface InterwettenDetailProps {
  onBack: () => void;
}

// Liegen die Bilder unter public/images/interwetten, erscheinen sie von selbst
// -- fehlt eines, faellt es aus der Reihe (siehe CaseSlider).
const images = [
  '/images/interwetten/slide-1.jpg',
  '/images/interwetten/slide-2.jpg',
  '/images/interwetten/slide-3.jpg',
  '/images/interwetten/slide-4.jpg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei den anderen Best Cases: alles, was auf der Seite steht, steht hier
// oben, in der freigegebenen Reihenfolge.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie wird aus einem klassischen Sponsorenstand beim BOSS OPEN ein interaktives Markenerlebnis? Für Interwetten entwickelten wir eine ganzheitliche Virtual-Tennis-Aktivierung, die Standdesign, Virtual Reality, Gamification und digitale Lead-Generierung miteinander verband.',
  'Wir verwandelten ein Pagodenzelt in einen vollständig gebrandeten Tennis-Court, integrierten die VR-Aktivierung und entwickelten ein niedrigschwelliges Registrierungs- und Live-Ranking-Tool im Interwetten-Design. So konnten Besucherinnen und Besucher selbst antreten, ihre Ergebnisse vergleichen und aktiv mit der Marke interagieren.'
];

const PROJEKTBESCHREIBUNG = [
  'Interwetten kam mit der Anfrage auf uns zu, die Marke beim BOSS OPEN in Stuttgart mit einer Virtual-Tennis-Aktivierung zu unterstützen. Aufgrund unserer regionalen Nähe und unserer Erfahrung an der Schnittstelle von Event, Technologie und Gamification konnten wir kurzfristig in das Projekt einsteigen.',
  'Die grundsätzliche Idee stand bereits fest: Besucherinnen und Besucher sollten Tennis in Virtual Reality erleben können. Offen war jedoch, wie sich die Aktivierung räumlich, gestalterisch und technisch überzeugend in den vorhandenen Stand integrieren lässt.',
  'Deshalb betrachteten wir nicht nur das einzelne VR-Modul, sondern entwickelten den gesamten Markenauftritt am Standort weiter.',
  'Wir übernahmen das vollständige Standdesign und verwandelten das bestehende Pagodenzelt in eine konsequent gebrandete Interwetten-Fläche. Im Inneren integrierten wir ein visuell inszeniertes Tennisfeld, das die reale Sportart aufgriff und den passenden Rahmen für das virtuelle Spielerlebnis schuf.',
  'Das Zelt wurde erstmals umfassend in das Interwetten-Design übertragen. Damit entstand ein klar erkennbarer Markenraum, der sich deutlich von einem klassischen, funktional ausgestatteten Promotionzelt abhob.',
  'Anschließend integrierten wir die Virtual-Tennis-Aktivierung in die Fläche. Besucherinnen und Besucher konnten selbst zum virtuellen Schläger greifen, gegeneinander antreten und Tennis aus einer neuen Perspektive erleben.',
  'Um aus der einzelnen Spielerfahrung einen fortlaufenden Wettbewerb zu machen, ergänzten wir die Aktivierung um eine digitale Gamification-Mechanik.',
  'Auf Basis unserer White-Label-Lösung entwickelten wir ein niedrigschwelliges Registrierungstool im Look and Feel von Interwetten. Der Anmeldeprozess wurde bewusst kompakt gehalten, damit Interessierte schnell teilnehmen konnten und keine langen Wartezeiten am Stand entstanden.',
  'Die erzielten Spielergebnisse wurden anschließend in einem vollständig gebrandeten Live-Ranking dargestellt. Dadurch konnten sich die Teilnehmenden direkt mit anderen Gästen vergleichen und erhielten einen zusätzlichen Anreiz, ihre Leistung zu verbessern.',
  'Das Ranking erhöhte nicht nur den Wettbewerbscharakter, sondern verlängerte auch die Aufmerksamkeit innerhalb der Aktivierung. Aus einem kurzen VR-Erlebnis wurde ein nachvollziehbarer Wettbewerb mit sichtbaren Ergebnissen.',
  'Gleichzeitig ermöglichte das Registrierungstool eine strukturierte Lead-Generierung für Interwetten. So verband die Aktivierung Unterhaltung und Markeninszenierung mit einem messbaren digitalen Mehrwert.',
  'Durch das Zusammenspiel von Standdesign, Tennis-Court, Virtual Reality, Registrierung und Live-Ranking entstand eine durchgängige Customer Journey: vom ersten visuellen Kontakt über die aktive Teilnahme bis zur digitalen Erfassung des Ergebnisses.',
  'Die Aktivierung zeigte, wie sich eine einzelne Technologie zu einem vollständigen Markenerlebnis weiterentwickeln lässt, wenn Gestaltung, Gamification und digitale Tools von Beginn an gemeinsam gedacht werden.'
];

const FACTS = [
  {
    title: 'Gebrandeter Tennis-Court',
    icon: <Target className="w-6 h-6" />,
    text: 'Ganzheitliche Gestaltung des Interwetten-Stands und Integration eines vollständig gebrandeten Tennisfelds in das bestehende Pagodenzelt.'
  },
  {
    title: 'Registrierung × Live-Ranking',
    icon: <Users className="w-6 h-6" />,
    text: 'Ein niedrigschwelliges Registrierungstool und ein digitales Live-Ranking auf Basis unserer White-Label-Lösung verbanden Wettbewerb, Lead-Generierung und Markeninteraktion.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Aktivierungs- & Flächenkonzept',
    desc: 'Entwicklung einer ganzheitlichen Aktivierung, die Virtual Tennis überzeugend in den bestehenden Interwetten-Stand integrierte.'
  },
  {
    title: 'Standdesign & Branding',
    desc: 'Gestaltung eines vollständig gebrandeten Pagodenzeltes inklusive Tennis-Court und konsequenter visueller Übertragung des Interwetten-Auftritts.'
  },
  {
    title: 'VR-Integration',
    desc: 'Technische und räumliche Einbindung der Virtual-Tennis-Aktivierung in die Standfläche.'
  },
  {
    title: 'Registrierungstool',
    desc: 'Entwicklung eines niedrigschwelligen digitalen Anmeldeprozesses im Look and Feel von Interwetten.'
  },
  {
    title: 'Live-Ranking',
    desc: 'Umsetzung eines vollständig gebrandeten Ranking-Tools zur Darstellung und Vergleichbarkeit der erzielten Spielergebnisse.'
  },
  {
    title: 'Lead-Generierung',
    desc: 'Verbindung der spielerischen Aktivierung mit einer strukturierten digitalen Erfassung interessierter Teilnehmerinnen und Teilnehmer.'
  }
];

const IMPACT = [
  { label: 'Zielgruppe', value: 'Tennisfans sowie Besucherinnen und Besucher des BOSS OPEN in Stuttgart.' },
  { label: 'Aktivierung', value: 'Die Gäste wurden selbst Teil des Wettbewerbs, statt den Sponsorenauftritt nur passiv wahrzunehmen.' },
  { label: 'Markenwirkung', value: 'Interwetten wurde als sichtbarer, moderner und interaktiver Bestandteil des Turniererlebnisses inszeniert.' },
  { label: 'Lead-Wirkung', value: 'Das Registrierungstool verband die Teilnahme an der Aktivierung mit einer strukturierten und messbaren Lead-Generierung.' }
];

export const InterwettenDetail: React.FC<InterwettenDetailProps> = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#badeda] text-slate-900">
      <CaseHero
        image="/images/interwetten/hero.jpg"
        alt="Interwetten – Virtual-Tennis-Aktivierung beim BOSS OPEN"
        title="Interwetten"
        accent="Virtual Tennis × BOSS OPEN."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Mit Virtual Reality Tennisfans am Stand aktivieren und qualifizierte Leads für Interwetten gewinnen."
                className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic text-[#0e958e]"
              />
              <div className="space-y-6">
                {EINLEITUNG.map((para, i) => (
                  <Reveal key={i} as="p" delay={0.08 + i * 0.08} className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                    {para}
                  </Reveal>
                ))}
              </div>
            </section>

            <CaseSlider images={images} alt="Eindruck aus der Interwetten-Aktivierung" />

            <section className="space-y-6">
              {PROJEKTBESCHREIBUNG.map((para, i) => (
                <Reveal key={i} as="p" y={20} className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  {para}
                </Reveal>
              ))}
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FACTS.map((item, i) => (
                <Reveal key={item.title} delay={i * STAGGER.card} y={26} className="bg-white/50 backdrop-blur-xl p-8 rounded-surface border border-slate-900/5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Projekt-Steckbrief */}
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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Virtual-Reality-Markenaktivierung</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Standdesign + VR Tennis + Registrierung + Live-Ranking | BOSS OPEN Stuttgart
                      </p>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Leistungen</h3>
                    </div>
                    <ul className="space-y-6">
                      {LEISTUNGEN.map((item) => (
                        <li key={item.title}>
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
                      {IMPACT.map((item) => (
                        <li key={item.label}>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{item.label}</div>
                          <div className="text-white font-black leading-snug">{item.value}</div>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Ergebnis</h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-black leading-snug">Vom Promotionzelt zum spielbaren Markenerlebnis</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Eine ganzheitliche Tennis-Aktivierung, die Standdesign, Virtual Reality, Wettbewerb,
                        Live-Ranking und Lead-Generierung konsequent miteinander verband.
                      </p>
                    </div>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                        <div className="text-lg font-black text-white leading-tight">Erfolgreich beim BOSS OPEN umgesetzt</div>
                        <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                          Ganzheitliche Konzeption und Realisierung des Interwetten-Stands inklusive
                          Virtual-Tennis-Aktivierung und digitaler White-Label-Tools.
                        </div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Wir haben Virtual Tennis nicht nur in einen Stand integriert, sondern daraus ein vollständig
                      spielbares Markenerlebnis für Interwetten entwickelt.“
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
