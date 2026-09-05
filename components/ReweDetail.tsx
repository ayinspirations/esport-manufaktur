import React, { useEffect } from 'react';
import { Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface ReweDetailProps {
  onBack: () => void;
}

// Liegen die Bilder unter public/images/rewe, erscheinen sie von selbst --
// fehlt eines, faellt es aus der Reihe (siehe CaseSlider).
const images = [
  '/images/rewe/slide-1.jpg',
  '/images/rewe/slide-2.jpg',
  '/images/rewe/slide-3.jpg',
  '/images/rewe/slide-4.jpg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei den anderen Best Cases: alles, was auf der Seite steht, steht hier
// oben, in der freigegebenen Reihenfolge.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie kann ein bestehendes eSport-Sponsoring mehr leisten als klassische Markenpräsenz? Gemeinsam mit REWE und dem 1. FC Köln entwickelten wir eine Aktivierung, die sportliches Scouting, Community-Building und Recruiting miteinander verband.',
  'Unter dem bestehenden Claim „Spiel dich ins Spiel“ entstand eine vollständig gebrandete Online- und Turnierkampagne. Sie suchte potenzielle Nachwuchsspieler für den 1. FC Köln und brachte gleichzeitig junge Menschen mit den Ausbildungs- und Studienmöglichkeiten der REWE Group in Kontakt.'
];

const PROJEKTBESCHREIBUNG = [
  'Als Partner des 1. FC Köln ist REWE nicht nur im klassischen Fußball präsent, sondern engagiert sich auch im eSport. Die zentrale Aufgabe bestand darin, dieses bestehende Sponsoring gezielt weiterzuentwickeln und zusätzliche Zielgruppen über die reine Markenreichweite hinaus zu aktivieren.',
  'Im Mittelpunkt standen zwei miteinander verbundene Ziele: Einerseits sollte ein neuer Nachwuchsspieler für den 1. FC Köln und die Virtual Bundesliga gefunden werden. Andererseits wollte REWE junge Gaming-Interessierte für die vielfältigen Ausbildungsberufe und dualen Studiengänge innerhalb der REWE Group erreichen.',
  'Als kommunikative Grundlage griffen wir die bereits etablierte Kampagnenidee „Spiel dich ins Spiel“ auf und übertrugen sie konsequent in den eSport. Dadurch entstand keine losgelöste Gaming-Kampagne, sondern eine authentische Verlängerung der bestehenden Sponsoring- und Markenkommunikation.',
  'Auf einer vollständig gebrandeten Online-Plattform konnten sich interessierte Nachwuchsspieler über das Projekt informieren, für die Scouting Cups anmelden und ihren Weg durch den Wettbewerb verfolgen. Gemeinsam mit dem 1. FC Köln wurde die Kampagne über digitale Kommunikationsmaßnahmen in die relevante Fußball- und Gaming-Community getragen.',
  'In mehreren Scouting-Turnieren suchten REWE und der 1. FC Köln nach talentierten Spielern für die VBL Club Championship. Die besten 16 Teilnehmer qualifizierten sich für das große Finale in der Facility von SK Gaming in Köln.',
  'Für das Finale entstand ein hochwertiges und vollständig gebrandetes Turnier-Setup. Ausgestattete Gaming-Stationen mit RECARO-Gaming-Stühlen, professionelle Turnierbedingungen und die besondere Location machten den Scouting-Abschluss zu einem echten Highlight für die Teilnehmenden.',
  'Sportlich ging es um die Chance, sich einen Platz beim 1. FC Köln für die Virtual Bundesliga zu erspielen. Dadurch erhielt der Wettbewerb eine klare Perspektive und ging deutlich über ein klassisches Sponsoren- oder Community-Turnier hinaus.',
  'Im Anschluss an die Scouting Cups erweiterten wir die Aktivierung um eine zusätzliche Community-Serie. Bereits etablierte eSport-Spieler waren von diesen Wettbewerben bewusst ausgeschlossen, damit auch Freizeitspieler und neue Community-Mitglieder realistische Gewinnchancen erhielten.',
  'Neben attraktiven REWE-Einkaufsgutscheinen bot die Community-Serie einen weiteren Mehrwert: Die Teilnehmenden konnten sich über Ausbildungsberufe, duale Studiengänge und Karrierewege innerhalb der REWE Group informieren.',
  'So wurde aus einem bestehenden eSport-Sponsoring eine vielseitige Aktivierungsplattform. Sportliches Scouting, Community-Wettbewerbe, Arbeitgeberkommunikation und ein hochwertiges Live-Finale griffen ineinander und schufen unterschiedliche Zugänge zu einer jungen, digitalaffinen Zielgruppe.'
];

const FACTS = [
  {
    title: 'Scouting für die Virtual Bundesliga',
    icon: <Target className="w-6 h-6" />,
    text: 'Mehrstufige Scouting Cups mit einem Finale der besten 16 Spieler in der SK-Gaming-Facility und der Chance auf einen Platz beim 1. FC Köln für die VBL Club Championship.'
  },
  {
    title: 'Community × Recruiting',
    icon: <Users className="w-6 h-6" />,
    text: 'Eine ergänzende Turnierserie für Freizeitspieler mit REWE-Einkaufsgutscheinen, spielerischer Community-Aktivierung und Informationen zu Ausbildung und dualem Studium bei der REWE Group.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Strategie & Sponsoring-Aktivierung',
    desc: 'Entwicklung eines integrierten Ansatzes, der das bestehende Engagement von REWE beim 1. FC Köln um Scouting, Community-Building und Recruiting erweitert.'
  },
  {
    title: 'Claim- & Kampagnenadaption',
    desc: 'Übertragung der bestehenden Kommunikationsidee „Spiel dich ins Spiel“ auf eine eigenständige eSport- und Gaming-Aktivierung.'
  },
  {
    title: 'Plattform & Teilnehmermanagement',
    desc: 'Aufbau einer vollständig gebrandeten Online-Plattform für Kommunikation, Anmeldung, Turnierorganisation und Teilnehmerführung.'
  },
  {
    title: 'Scouting & Turniermanagement',
    desc: 'Konzeption und Durchführung der Scouting Cups sowie Entwicklung einer sportlich nachvollziehbaren Qualifikationsstruktur bis zum großen Finale.'
  },
  {
    title: 'Live-Finale & Eventproduktion',
    desc: 'Planung und Umsetzung des Finales mit den besten 16 Teilnehmern in der Facility von SK Gaming inklusive Branding, Gaming-Stationen, Equipment und operativer Turnierbetreuung.'
  },
  {
    title: 'Community & Recruiting',
    desc: 'Entwicklung einer ergänzenden Community-Serie, die Freizeitspieler aktiviert und die Ausbildungs- und Studienmöglichkeiten der REWE Group vermittelt.'
  }
];

const IMPACT = [
  { label: 'Zielgruppen', value: 'Ambitionierte Nachwuchsspieler, Freizeitgamer sowie potenzielle Auszubildende und dual Studierende.' },
  { label: 'Aktivierung', value: 'Aktive Teilnahme an Scouting- und Community-Turnieren statt rein passiver Wahrnehmung des Sponsorings.' },
  { label: 'Sponsoring-Wirkung', value: 'REWE verband das Engagement beim 1. FC Köln mit sportlicher Perspektive, Community-Mehrwert und konkreter Arbeitgeberkommunikation.' }
];

export const ReweDetail: React.FC<ReweDetailProps> = () => {
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
        image="/images/rewe/hero.jpg"
        alt="REWE × 1. FC Köln – eSport-Sponsoring-Aktivierung"
        title="REWE × 1. FC Köln"
        accent="Spiel dich ins Spiel."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Mit eSport-Sponsoring Nachwuchstalente scouten und junge Menschen für REWE als Arbeitgeber begeistern."
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

            <CaseSlider images={images} alt="Eindruck aus der REWE-Aktivierung" />

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

            <div className="pt-12 flex justify-center">
              <a
                href="https://www.fc.de"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="/logos/1-fc-koln-logo-png_seeklogo-505047.png"
                  alt="1. FC Köln Logo"
                  className="h-16 md:h-24 w-auto opacity-100 transition-opacity"
                />
              </a>
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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">eSport-Sponsoring-Aktivierung</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Scouting + Community + Recruiting | Online-Plattform + Live-Finale | vollständig gebrandet
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
                      <h4 className="text-white font-black leading-snug">Ein Sponsoring mit sportlichem und unternehmerischem Mehrwert</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Eine durchgängige Aktivierung, die Nachwuchsscouting für den 1. FC Köln, Community-Building und
                        Recruiting für die REWE Group auf einer gemeinsamen Plattform zusammenführte.
                      </p>
                    </div>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="mb-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                      <div className="text-lg font-black text-white leading-tight">Erfolgreich umgesetzt</div>
                      <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                        Mehrstufige Online-Aktivierung mit Scouting Cups, Live-Finale und anschließender
                        Community-Serie.
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Spiel dich ins Spiel“ wurde vom Sponsoring-Claim zum aktiven Zugang für eSport-Talente, Community
                      und potenzielle Nachwuchskräfte.
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
