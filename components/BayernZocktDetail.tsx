import React, { useEffect } from 'react';
import { Trophy, Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface BayernZocktDetailProps {
  onBack: () => void;
}

const images = [
  '/images/bayern-zockt/Bayern-zockt-Finale-FOKUS-Robi-080823.jpg',
  '/images/bayern-zockt/Bayern-zockt-Mehring-Kern-150724 - Copy.jpg',
  '/images/bayern-zockt/1721048106661.jpeg',
  '/images/bayern-zockt/1721048106955.jpeg',
  '/images/bayern-zockt/1721378807857.jpeg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei den anderen Best Cases: alles, was auf der Seite steht, steht hier
// oben, in der freigegebenen Reihenfolge.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie lässt sich die Begeisterung rund um die UEFA EURO 2024 in einen digitalen Wettbewerb für die bayerische Gaming-Community übertragen? Gemeinsam mit dem Bayerischen Staatsministerium für Digitales und dem BFV entwickelten wir „Bayern zockt“.',
  'Auf Basis unserer White-Label-Lösung entstand eine bayernweite Turnierplattform, auf der die Teilnehmenden den originalen Spielmodus der Europameisterschaft digital nachspielen konnten. Von der Formatidee über Claim und Key Visual bis zur technischen Umsetzung und Turnierdurchführung verantworteten wir die zentralen Bausteine des Wettbewerbs.'
];

const PROJEKTBESCHREIBUNG = [
  'Aus unserer langjährigen Zusammenarbeit mit dem BFV eFootball entstand zur UEFA EURO 2024 ein gemeinsames Aktivierungsprojekt mit dem Bayerischen Staatsministerium für Digitales.',
  'Das Ziel war, die besondere Aufmerksamkeit rund um die Heim-Europameisterschaft zu nutzen und bayerischen eSport- und Gaming-Enthusiasten einen eigenen digitalen Wettbewerb zu bieten. Dabei sollte die Community nicht nur kommunikativ erreicht, sondern aktiv in das Turniergeschehen eingebunden werden.',
  'Unter dem Namen „Bayern zockt“ entwickelten wir ein digitales Turnierformat, das den originalen Modus der Europameisterschaft auf dem virtuellen Rasen nachbildete. Die Teilnehmenden spielten sich durch eine strukturierte Online-EM und konnten den Verlauf des Wettbewerbs über die zentrale Plattform verfolgen.',
  'Für die technische Umsetzung griffen wir auf unsere eigene White-Label-Lösung zurück. Diese wurde an das Projekt angepasst und bildete Informationen, Anmeldung, Spielpläne, Ergebnisse, Rankings und die gesamte digitale Turnierstruktur in einem gemeinsamen Hub ab.',
  'Neben der Plattform entwickelten wir den Claim und das zentrale Key Visual für „Bayern zockt“. Damit schufen wir die kreative Grundlage für einen eigenständigen Auftritt, der die Themen Bayern, Fußball, Gaming und Europameisterschaft miteinander verband.',
  'Die weitere gestalterische Ausarbeitung und kommunikative Umsetzung rund um das Projekt übernahmen der BFV eFootball beziehungsweise die BFV Service GmbH. Durch diese klare Aufgabenteilung konnten die technologische und kreative Grundlage aus unserem Haus mit der Verbandskommunikation des BFV verbunden werden.',
  'Ergänzend wurden die BFV Team Nights an die Aktivierung angedockt und erweiterten den digitalen Wettbewerb um zusätzliche Begegnungs- und Erlebnisformate.',
  'Den Höhepunkt bildete das große Finale der Online-EM im Stadion des 1. FC Augsburg. Dort kamen die erfolgreichsten Teilnehmenden zusammen, um den Titel vor Ort auszuspielen und den zuvor digitalen Wettbewerb in ein gemeinsames Live-Erlebnis zu überführen.',
  'Wir verantworteten die vollständige Turnierdurchführung und Spielleitung und unterstützten die Umsetzung des Finales operativ vor Ort. So entstand eine durchgängige Aktivierung von der digitalen Qualifikation bis zur finalen Entscheidung im Stadion.',
  '„Bayern zockt“ zeigte, wie sich ein sportliches Großereignis mit einer eigenen digitalen Plattform, einer authentischen Wettbewerbsmechanik und einem emotionalen Live-Finale für eine regionale Gaming-Community verlängern lässt.'
];

const FACTS = [
  {
    title: 'Digitale EM im Originalmodus',
    icon: <Target className="w-6 h-6" />,
    text: 'Entwicklung einer bayernweiten Turnierstruktur, die den Spielmodus der Europameisterschaft digital nachbildete – inklusive Anmeldung, Spielplänen, Ergebnissen und Rankings auf einer individuellen White-Label-Plattform.'
  },
  {
    title: 'Online-Qualifikation × Stadionfinale',
    icon: <Users className="w-6 h-6" />,
    text: 'Voll virtuelle Vorausscheidungen mit vollständiger Spielleitung und ein großes Live-Finale im Stadion des 1. FC Augsburg als gemeinsamer Abschluss der Online-EM.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Format- & Wettbewerbskonzeption',
    desc: 'Entwicklung einer digitalen Europameisterschaft auf Basis des originalen EM-Spielmodus.'
  },
  {
    title: 'Plattform & Technologie',
    desc: 'Bereitstellung und Individualisierung unserer White-Label-Plattform für Anmeldung, Wettbewerb, Spielpläne, Ergebnisse und Rankings.'
  },
  {
    title: 'Claim & Key Visual',
    desc: 'Entwicklung des Claims und der visuellen Leitidee für den eigenständigen Auftritt von „Bayern zockt“.'
  },
  {
    title: 'Turniermanagement & Spielleitung',
    desc: 'Operative Durchführung des gesamten Online-Wettbewerbs sowie Steuerung und Begleitung der einzelnen Turnierphasen.'
  },
  {
    title: 'Live-Finale & Vor-Ort-Support',
    desc: 'Turnierdurchführung und operative Unterstützung beim großen Finale im Stadion des 1. FC Augsburg.'
  }
];

const IMPACT = [
  { label: 'Zielgruppe', value: 'eSport- und Gaming-Enthusiasten aus ganz Bayern.' },
  { label: 'Aktivierung', value: 'Aktive Teilnahme an einer eigenen digitalen Europameisterschaft statt ausschließlich passiver Begleitung der UEFA EURO 2024.' },
  { label: 'Community-Wirkung', value: 'Ein gemeinsamer Wettbewerb verband digitale Qualifikation, regionale Gaming-Community und emotionales Stadionerlebnis.' }
];

export const BayernZocktDetail: React.FC<BayernZocktDetailProps> = () => {
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
        image="/images/bayern-zockt/hero.jpg"
        alt="Bayern zockt – digitale EM-Aktivierung mit Live-Finale"
        title="Bayern zockt"
        accent="Die EM auf dem virtuellen Rasen."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word" stagger={0}
                text="Mit einem digitalen EM-Format Bayerns Gaming-Community verbinden und aktivieren."
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

            <CaseSlider images={images} alt="Eindruck aus Bayern zockt" />

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
                href="https://www.bfv.de"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="/logos/Bayerischer_Fussballverband.svg.png"
                  alt="Bayerischer Fußball-Verband Logo"
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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Digitale EM-Aktivierung mit Live-Finale</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Online + Stadion | bayernweit | White-Label | Community-Wettbewerb
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
                      <h4 className="text-white font-black leading-snug">Die UEFA EURO 2024 digital für Bayern verlängert</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Ein durchgängiges Turnierformat, das eine individuelle White-Label-Plattform, den originalen
                        EM-Spielmodus und ein großes Live-Finale im Stadion miteinander verband.
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
                        <div className="text-lg font-black text-white leading-tight">Erfolgreich zur UEFA EURO 2024 umgesetzt</div>
                        <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                          Gemeinschaftsprojekt mit dem Bayerischen Staatsministerium für Digitales, dem BFV eFootball
                          und der BFV Service GmbH.
                        </div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Mit Bayern zockt wurde aus der Begeisterung für die Europameisterschaft ein eigener digitaler
                      Wettbewerb für die bayerische Gaming-Community.“
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
