import React, { useEffect } from 'react';
import { Users, Target } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface VfbDetailProps {
  onBack: () => void;
}

// Fehlt eines, faellt es aus der Reihe (siehe CaseSlider).
const images = [
  '/images/vfb/slide-1.jpeg',
  '/images/vfb/slide-2.jpeg',
  '/images/vfb/slide-3.jpeg',
  '/images/vfb/slide-4.jpeg',
  '/images/vfb/slide-5.jpeg',
  '/images/vfb/slide-6.jpeg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases -- in der freigegebenen Reihenfolge
// ---------------------------------------------------------------------------

const LEAD = 'Eine aufmerksamkeitsstarke Aktivierung auf kompakter Fläche für das VfB Season Opening 2026/27.';

const EINLEITUNG = [
  'Beim VfB Season Opening 2026/27 verwandelten wir ein Pagodenzelt auf der Mercedesstraße vor der MHP Arena in eine kompakte Gaming- und Erlebniswelt.',
  'EA SPORTS FC, Beat the Pro, freies Gaming und die KI-Fotoaktivierung des VfB Stuttgart wurden zu einem gemeinsamen Fan-Erlebnis verbunden. Von der Flächenplanung über individuell gebrandetes Mobiliar und Gaming-Equipment bis zur Integration der einzelnen Aktivierungsmodule entstand ein Stand, der den gesamten Veranstaltungstag über stark frequentiert war.'
];

const ABSCHNITTE: { title: string; paras: string[] }[] = [
  {
    title: 'Die Herausforderung: viele Erlebnisse auf kleiner Fläche',
    paras: [
      'Die begrenzte Fläche des Pagodenzeltes sollte gleich mehrere Aktivierungen ermöglichen: Jugendliche und Fans sollten gegen die VfB-E-Sportler und Content Creator Niklas Luginsland und Fabienne antreten, miteinander spielen und zusätzlich die KI-Fotoaktivierung des VfB erleben können.',
      'Gleichzeitig musste die Fläche offen, hochwertig und aufmerksamkeitsstark wirken – trotz der schmalen räumlichen Gegebenheiten.'
    ]
  },
  {
    title: 'Die Lösung: ein modulares Gaming-Setup im VfB-Look',
    paras: [
      'Für die optimale Nutzung der Fläche integrierten wir unsere platzsparende Gaming Wall direkt an der Rückseite des Pagodenzeltes. Dadurch konnten vier Personen gleichzeitig spielen, ohne dass wertvolle Bewegungsfläche verloren ging.',
      'Ergänzt wurde das Setup durch einen von vier Seiten bespielbaren Gaming Tower sowie ein kompaktes Bühnenmodul als visuellen Mittelpunkt der Aktivierung.',
      'Unsere neu entwickelten Gaming-Möbel wurden vollständig an das Erscheinungsbild des VfB Stuttgart angepasst. Von den Tischplatten bis zu den Seitenwänden war jedes Detail individuell gebrandet. So entstand keine gewöhnliche Gaming-Ecke, sondern eine durchgängige Markenwelt mit hoher Sichtbarkeit.'
    ]
  },
  {
    title: 'Beat the Pro und freies Gaming',
    paras: [
      'Bei der Beat-the-Pro-Challenge konnten Fans in EA SPORTS FC gegen Niklas Luginsland und Fabienne vom VfB Stuttgart antreten und ihr Können direkt unter Beweis stellen.',
      'Abseits der Challenges standen die Gaming-Stationen für freie Matches zur Verfügung. Besuchende konnten gegeneinander oder miteinander spielen und so ohne Zugangshürden Teil der Aktivierung werden.',
      'Aus Zuschauenden wurden aktive Teilnehmende – und aus einem klassischen Eventstand wurde ein lebendiger Treffpunkt für die VfB-Community.'
    ]
  },
  {
    title: 'Personalisierte Fan-Momente durch KI',
    paras: [
      'Zusätzlich integrierten wir die KI-Fotoaktivierung des VfB Stuttgart in das Flächenkonzept. Besuchende konnten den Jubel eines VfB-Stars nachstellen. Auf der digitalen Stele erschien der passende Spieler – anschließend erhielten die Teilnehmenden eine personalisierte Karte mit ihrem eigenen Motiv.',
      'Für eine hochwertige Inszenierung der Fotostation fertigten wir eine passgenaue Spannrahmenrückwand an und integrierten sie nahtlos in das Gesamtdesign.',
      'So entstand neben dem Gaming ein weiterer interaktiver Touchpoint mit einem persönlichen Erinnerungsstück zum Mitnehmen.'
    ]
  },
  {
    title: 'Vom Veranstaltungsbeginn bis zum Anpfiff ausgelastet',
    paras: [
      'Die Kombination aus Gaming, E-Sport, KI und hochwertigem Standdesign entwickelte sich zu einem der sichtbaren Anziehungspunkte auf der Veranstaltungsfläche.',
      'Der Stand war vom Beginn des Season Openings bis zum anschließenden Spiel des VfB Stuttgart gegen den FC Everton durchgehend stark besucht. Die Aktivierung erzeugte Aufmerksamkeit, Interaktion und persönliche Markenerlebnisse – auf einer vergleichsweise kompakten Fläche.'
    ]
  }
];

const FACTS = [
  {
    title: 'Vier Personen gleichzeitig',
    icon: <Users className="w-6 h-6" />,
    text: 'Die platzsparende Gaming Wall ermöglichte vier parallele Spielplätze entlang der Rückwand des Pagodenzeltes.'
  },
  {
    title: 'Von vier Seiten bespielbar',
    icon: <Target className="w-6 h-6" />,
    text: 'Der Gaming Tower schuf zusätzliche Spielmöglichkeiten und machte die Aktivierung aus mehreren Blickrichtungen sichtbar und zugänglich.'
  }
];

const PARTNERSCHAFT = [
  'Nach ersten gemeinsamen Aktivierungen mit League of Legends auf unseren XP Days und einer Mario-Kart-Aktivierung am Stand des VfB Stuttgart war das Season Opening der nächste Schritt unserer Zusammenarbeit.',
  'Mit EA SPORTS FC, Beat the Pro und der integrierten KI-Fotoaktivierung konnten wir das gemeinsame Erlebnisangebot konsequent erweitern. Wir freuen uns über das Vertrauen und auf die nächsten Projekte.'
];

const UEBERSICHT = [
  { label: 'Kunde', value: 'VfB Stuttgart' },
  { label: 'Projekt', value: 'VfB Season Opening 2026/27' },
  { label: 'Ort', value: 'Mercedesstraße vor der MHP Arena, Stuttgart' },
  { label: 'Format', value: 'E-Sport-, Gaming- und KI-Fanaktivierung' },
  { label: 'Aktivierungen', value: 'EA SPORTS FC, Beat the Pro, freies Gaming und personalisierte KI-Fotoaktivierung' }
];

const LEISTUNGEN =
  'Flächen- und Aktivierungskonzept, Gaming Wall, vierseitiger Gaming Tower, Bühnenmodul, individuell gebrandetes Gaming-Mobiliar, Gaming-Equipment, technische Integration, passgenaue Spannrahmenrückwand sowie Auf- und Abbau';

const IMPACT = 'Hohe Sichtbarkeit, kontinuierliche Interaktion und ein stark frequentierter Fan-Touchpoint auf kompakter Fläche';

const ERGEBNIS = 'Eine durchgängig besuchte Gaming-Area und ein aufmerksamkeitsstarkes Markenerlebnis bis zum Anpfiff gegen den FC Everton';

const SidebarHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
    <h3 className="text-xl font-black uppercase tracking-tighter">{children}</h3>
  </div>
);

export const VfbDetail: React.FC<VfbDetailProps> = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#badeda] text-slate-900">
      <CaseHero
        image="/images/vfb/hero.jpeg"
        alt="Gaming-Aktivierung des VfB Stuttgart beim Season Opening 2026/27 vor der MHP Arena"
        title="VfB STUTTGART"
        keepCase
        accent="Gaming, E-Sport und KI als interaktives Fan-Erlebnis"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <Reveal as="p" className="text-xl md:text-3xl font-bold leading-snug text-slate-900 mb-10 md:mb-12">
                {LEAD}
              </Reveal>
              <RevealText
                as="h2"
                by="word"
                text="Maximale Aktivierung auf begrenztem Raum"
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

            <CaseSlider images={images} alt="Eindruck vom VfB Season Opening 2026/27" />

            {ABSCHNITTE.map((block) => (
              <section key={block.title} className="space-y-6">
                <Reveal as="h3" y={20} className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900">
                  {block.title}
                </Reveal>
                {block.paras.map((para, i) => (
                  <Reveal key={i} as="p" y={20} className="text-lg md:text-xl text-slate-600 leading-relaxed">
                    {para}
                  </Reveal>
                ))}
              </section>
            ))}

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

            <section className="space-y-6">
              <Reveal as="h3" y={20} className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900">
                Eine Partnerschaft, die weiter wächst
              </Reveal>
              {PARTNERSCHAFT.map((para, i) => (
                <Reveal key={i} as="p" y={20} className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  {para}
                </Reveal>
              ))}
              <Reveal as="p" y={20} className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-[#0e958e]">
                More to come.
              </Reveal>
            </section>
          </div>

          {/* Projektuebersicht */}
          <div className="lg:col-span-4 space-y-12 order-last lg:order-none">
            <div className="sticky top-32">
              <Reveal y={28} duration={DUR.slow} className="bg-slate-900 text-white p-10 rounded-shell shadow-2xl">
                <div className="space-y-10">
                  <section>
                    <SidebarHead>Projektübersicht</SidebarHead>
                    <ul className="space-y-4">
                      {UEBERSICHT.map((item) => (
                        <li key={item.label}>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{item.label}</div>
                          <div className="text-white font-black leading-snug">{item.value}</div>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <SidebarHead>Unsere Leistungen</SidebarHead>
                    <p className="text-white/80 font-bold leading-snug">{LEISTUNGEN}</p>
                  </section>

                  <section>
                    <SidebarHead>Impact</SidebarHead>
                    <p className="text-white font-black leading-snug">{IMPACT}</p>
                  </section>

                  <section className="pt-10 border-t border-white/10">
                    <SidebarHead>Ergebnis</SidebarHead>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">{ERGEBNIS}</p>
                  </section>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
