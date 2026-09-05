import React, { useEffect } from 'react';
import { Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface CaseDetailProps {
  onBack: () => void;
}

// Liegen die Bilder unter public/images/showdown-0711, erscheinen sie von
// selbst -- fehlt eines, faellt es aus der Reihe (siehe CaseSlider). Bis eben
// standen hier zwei Stockfotografien von Unsplash als Platzhalter.
const images = [
  '/images/showdown-0711/slide-1.jpg',
  '/images/showdown-0711/slide-2.jpg',
  '/images/showdown-0711/slide-3.jpg',
  '/images/showdown-0711/slide-4.jpg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei den anderen Best Cases: alles, was auf der Seite steht, steht hier
// oben, in der freigegebenen Reihenfolge.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie schafft man ein Recruiting-Event, bei dem junge Menschen und Unternehmen nicht in formellen Gesprächssituationen aufeinandertreffen, sondern über ein gemeinsames Erlebnis miteinander in Kontakt kommen? Mit dem 0711 SHOWDOWN entwickelten wir ein gamifiziertes Recruiting-Format, das Employer Branding, Gaming und persönliche Begegnungen miteinander verband.',
  'In der CLUTCH23 eArena in Fellbach brachten wir 64 ausgewählte, ausbildungsinteressierte Jugendliche mit ZÜBLIN, FI-TS, hagebau Bolay, Klingele Paper & Packaging und der Techniker Krankenkasse zusammen. Ein professionelles Gaming-Turnier, frei zugängliche Spielstationen und aktivierende Unternehmensflächen schufen den Rahmen für einen Austausch ohne klassische Bewerbungssituation.'
];

const PROJEKTBESCHREIBUNG = [
  'Ausgangspunkt für den 0711 SHOWDOWN war eine zentrale Herausforderung im Ausbildungsrecruiting: Viele Unternehmen möchten junge Menschen frühzeitig erreichen, erleben aber, dass klassische Karrieremessen und formelle Recruiting-Formate nur begrenzt zu einem offenen und persönlichen Austausch führen.',
  'Gleichzeitig ist Gaming ein selbstverständlicher Bestandteil der Lebenswelt vieler Jugendlicher. Genau diese gemeinsame Leidenschaft nutzten wir als verbindendes Element – nicht als Selbstzweck, sondern als authentischen Einstieg in Gespräche über Ausbildung, Karriere und Zukunftsperspektiven.',
  'Mit dem 0711 SHOWDOWN entwickelten wir ein eigenes Eventformat, das junge Talente und regionale Arbeitgeber in einem professionellen Gaming-Umfeld zusammenbrachte.',
  'Als Partner beteiligten sich ZÜBLIN, FI-TS, hagebau Bolay, Klingele Paper & Packaging sowie die Techniker Krankenkasse. Damit trafen unterschiedliche Branchen und Berufsbilder auf eine gemeinsame Zielgruppe aus ausbildungsinteressierten Jugendlichen und jungen Gaming-Fans.',
  'Über eine zielgerichtete Kommunikations- und Bewerbungsphase wurden 64 Teilnehmende für das Event ausgewählt. Der Fokus lag darauf, junge Menschen einzuladen, die sich sowohl für Gaming als auch für ihre beruflichen Perspektiven interessierten.',
  'Austragungsort war die CLUTCH23 eArena in Fellbach. Die professionelle Gaming-Location bot den passenden Rahmen, um aus einem Recruiting-Event ein hochwertiges Erlebnis zu machen und den teilnehmenden Unternehmen eine glaubwürdige Präsentationsplattform innerhalb der Gaming-Kultur zu bieten.',
  'Im Mittelpunkt stand ein professionell organisiertes EA SPORTS FC-Turnier. Der Wettbewerb sorgte für Spannung, gemeinsame Erlebnisse und wiederkehrende Kontaktmomente zwischen Jugendlichen, Unternehmensvertreterinnen und Unternehmensvertretern.',
  'Ergänzend standen frei zugängliche Gaming-Stationen zur Verfügung. Dadurch konnten auch abseits des Turniers gemeinsame Spielsituationen entstehen, in denen Gespräche deutlich natürlicher begannen als in einer klassischen Bewerbungssituation.',
  'Die beteiligten Unternehmen wurden aktiv in das Event eingebunden. Sie konnten sich und ihre Ausbildungsangebote präsentieren, eigene Impulse setzen und gleichzeitig direkt am Veranstaltungsgeschehen teilnehmen. So entstand keine räumliche Trennung zwischen Ausstellern und Zielgruppe, sondern eine gemeinsame Erlebnisfläche.',
  'Die Techniker Krankenkasse ergänzte das Format mit Impulsen rund um Gesundheit, Ernährung und Leistungsfähigkeit. Damit wurde das Event um Themen erweitert, die sowohl für Gaming als auch für Ausbildung und Berufsalltag relevant sind.',
  'Für die Jugendlichen entstand ein Tag mit Wettbewerb, Unterhaltung und konkreten beruflichen Perspektiven. Die Unternehmen erhielten Zugang zu einer Zielgruppe, die über klassische Recruiting-Kanäle häufig nur schwer erreichbar ist, und konnten sich in einem authentischen und emotionalen Umfeld als potenzielle Arbeitgeber präsentieren.',
  'Die Reaktionen, Gespräche und Emotionen auf beiden Seiten zeigten, wie wirkungsvoll die Verbindung von Gaming und Recruiting sein kann. Der 0711 SHOWDOWN wurde dadurch zum Proof of Concept für einen größeren Ansatz.',
  'Die gewonnenen Erkenntnisse bildeten die Grundlage für die Entwicklung der XP Days. Was beim 0711 SHOWDOWN erstmals mit fünf Unternehmen und 64 jungen Talenten erprobt wurde, entwickelten wir anschließend zu einer umfassenden gamifizierten Karriere- und Erlebnismesse weiter.'
];

const FACTS = [
  {
    title: '5 Unternehmen × 64 Talente',
    icon: <Users className="w-6 h-6" />,
    text: 'ZÜBLIN, FI-TS, hagebau Bolay, Klingele Paper & Packaging und die Techniker Krankenkasse trafen auf 64 ausgewählte, ausbildungsinteressierte Jugendliche.'
  },
  {
    title: 'Turnier × Recruiting Experience',
    icon: <Target className="w-6 h-6" />,
    text: 'Ein professionelles EA SPORTS FC-Turnier, freie Gaming-Stationen und aktivierende Unternehmensflächen schufen Raum für persönliche Gespräche und authentisches Employer Branding.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Strategie & Formatentwicklung',
    desc: 'Entwicklung eines eigenen Recruiting-Formats, das Gaming als authentischen Zugang zu jungen und ausbildungsinteressierten Zielgruppen nutzt.'
  },
  {
    title: 'Partner- & Unternehmensintegration',
    desc: 'Einbindung von fünf Unternehmen mit unterschiedlichen Ausbildungsangeboten in eine gemeinsame Event- und Aktivierungsstruktur.'
  },
  {
    title: 'Teilnehmergewinnung & Eventkommunikation',
    desc: 'Zielgerichtete Ansprache, Bewerbung und Auswahl von 64 interessierten Jugendlichen für das Recruiting-Event.'
  },
  {
    title: 'Gaming- & Turnierkonzept',
    desc: 'Konzeption und Durchführung eines professionellen EA SPORTS FC-Turniers sowie Integration frei zugänglicher Gaming-Stationen.'
  },
  {
    title: 'Eventplanung & Produktion',
    desc: 'Ganzheitliche Organisation und operative Umsetzung des Events in der CLUTCH23 eArena in Fellbach.'
  },
  {
    title: 'Employer-Branding-Aktivierung',
    desc: 'Entwicklung eines Umfelds, in dem Unternehmen ihre Arbeitgebermarken und Ausbildungsangebote ohne klassische Messesituation präsentieren konnten.'
  },
  {
    title: 'Analyse & Formatweiterentwicklung',
    desc: 'Auswertung der Erfahrungen, Reaktionen und qualitativen Insights als Grundlage für die anschließende Entwicklung der XP Days.'
  }
];

const IMPACT = [
  { label: 'Zielgruppe', value: 'Ausbildungsinteressierte Jugendliche und junge Gaming-Fans aus der Region Stuttgart.' },
  { label: 'Aktivierung', value: 'Gemeinsames Spielen, Wettbewerb und persönliche Begegnungen statt formeller Erstgespräche.' },
  { label: 'Arbeitgeberwirkung', value: 'Fünf Unternehmen konnten ihre Ausbildungsangebote in einem authentischen und emotionalen Umfeld präsentieren.' },
  { label: 'Formatwirkung', value: 'Die Erkenntnisse aus dem 0711 SHOWDOWN bildeten die konzeptionelle Grundlage für die Entwicklung der XP Days.' }
];

export const Showdown0711Detail: React.FC<CaseDetailProps> = () => {
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
        image="/videos/case-showdown.jpg"
        alt="0711 SHOWDOWN – gamifiziertes Recruiting-Event in der CLUTCH23 eArena"
        title="0711 Showdown"
        accent="Recruiting. Gamified."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Fünf Arbeitgeber mit 64 jungen Talenten über Gaming auf Augenhöhe zusammenbringen."
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

            <CaseSlider images={images} alt="Eindruck vom 0711 SHOWDOWN" />

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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Gamifiziertes Recruiting-Event</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Employer Branding + Gaming + persönliche Begegnung | fünf Unternehmen | 64 junge Talente
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
                      <h4 className="text-white font-black leading-snug">Der Proof of Concept für gamifiziertes Recruiting</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Der 0711 SHOWDOWN zeigte, dass Gaming echte Begegnungen zwischen jungen Menschen und Unternehmen
                        ermöglichen kann. Aus dem erfolgreichen Pilotformat entstand die Grundlage für eine umfassende
                        gamifizierte Karrieremesse.
                      </p>
                    </div>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="mb-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                      <div className="text-lg font-black text-white leading-tight">Erfolgreich umgesetzt</div>
                      <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                        Eigenentwickeltes Recruiting-Event und konzeptionelle Vorstufe der XP Days.
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Der 0711 SHOWDOWN hat gezeigt, wie aus gemeinsamem Spielen echte Gespräche entstehen – und aus
                      einer Eventidee ein neues Messekonzept wachsen kann.“
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
