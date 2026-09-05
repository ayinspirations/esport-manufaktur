import React, { useEffect } from 'react';
import { Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface CaseDetailProps {
  onBack: () => void;
}

const images = [
  '/images/hagebau/slide-3.jpg',
  '/images/hagebau/slide-1.jpg',
  '/images/hagebau/slide-2.jpg',
  '/images/hagebau/slide-4.jpg',
  '/images/hagebau/slide-5.jpg',
  '/images/hagebau/slide-6.jpg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei T-Systems: alles, was auf der Seite steht, steht hier oben, in der
// freigegebenen Reihenfolge. Der frühere Text beschrieb einen einzelnen
// Gaming Day -- der Case ist aber eine mehrjährige Partnerschaft aus
// Recruiting-Game, Messeaktivierung und eigenen Turnieren im Markt.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie erreicht man junge Menschen für Ausbildungsberufe, wenn klassische Karrieremessen immer seltener zu echten Gesprächen führen? Gemeinsam mit hagebau Bolay haben wir Gaming zu einem langfristigen Instrument für Recruiting und Employer Branding entwickelt.',
  'Aus ersten gamifizierten Ansätzen entstand eine mehrjährige Partnerschaft mit einem individuellen Recruiting-Game, aktivierenden Messemodulen und eigenen Gaming Days im hagebau-Markt. So wurden wiederkehrende Touchpoints geschaffen, über die hagebau Bolay junge Menschen niedrigschwellig erreicht, persönliche Kontakte aufbaut und konkrete Bewerbungen generiert.'
];

const PROJEKTBESCHREIBUNG = [
  'Am Anfang der Zusammenarbeit stand die Idee, die verschiedenen Ausbildungsbereiche von hagebau Bolay auf eine neue Art erlebbar zu machen. Statt die Aufgaben und Stationen einer Ausbildung ausschließlich über Flyer oder klassische Informationsgespräche zu erklären, entstand der Ansatz für ein individuelles 2D-Retro-Recruiting-Game.',
  'In dem Spiel bewegen sich die Nutzerinnen und Nutzer mit einem Avatar durch den hagebau-Markt und lernen dabei verschiedene Abteilungen, Aufgabenbereiche und Stationen einer Ausbildung kennen. Das Game ist bewusst niedrigschwellig gestaltet: Es ersetzt keine umfassende Berufsorientierung, sondern schafft Aufmerksamkeit, weckt Neugier und erleichtert den Einstieg in ein persönliches Gespräch.',
  'Die Idee für den Einsatz des Recruiting-Games entstand im strategischen Austausch mit uns. Für die Feinkonzeption und technische Entwicklung vermittelten wir hagebau Bolay einen spezialisierten Umsetzungspartner, der das Spiel realisierte. Heute entwickeln und realisieren wir vergleichbare Gamification-Lösungen mit unserem eigenen Team und unserer eigenen technologischen Infrastruktur vollständig inhouse.',
  'Das Recruiting-Game wird bis heute bei Ausbildungsmessen, Schulbesuchen und weiteren Recruiting-Maßnahmen eingesetzt. Es hilft hagebau Bolay dabei, sich sichtbar von klassischen Informationsangeboten abzuheben und jungen Menschen einen zeitgemäßen ersten Kontakt mit der Arbeitgebermarke zu bieten.',
  'Aus diesem ersten Projekt entwickelte sich ein kontinuierlicher Austausch über die Frage, wie Gaming noch umfassender für das Recruiting genutzt werden kann. Gleichzeitig wurde deutlich, dass hagebau Bolay insbesondere junge männliche Ausbildungsinteressierte über klassische regionale Kanäle immer schwerer erreichte.',
  'Viele Schülerinnen und Schüler besuchen Ausbildungsmessen im Klassenverband, sammeln Pflichtstempel und führen nur kurze, oberflächliche Gespräche. Häufig fehlen zu diesem Zeitpunkt sowohl konkrete Berufsvorstellungen als auch ein persönlicher Bezug zum Unternehmen. Für regional verwurzelte Arbeitgeber entsteht dadurch die Herausforderung, überhaupt genügend Aufmerksamkeit und Zeit für einen echten Austausch zu gewinnen.',
  'Unsere Antwort darauf war eine konsequente Verknüpfung von Messeaktivierung und eigenen Gaming-Events. Auf regionalen Karriere- und Ausbildungsmessen setzten wir interaktive Gaming-Module ein, die Aufmerksamkeit erzeugten und einen natürlichen Einstieg in das Gespräch ermöglichten. Gleichzeitig nutzten wir diese Kontaktpunkte, um auf die Gaming Days im hagebau-Markt aufmerksam zu machen.',
  'Mit den Gaming Days schufen wir einen zusätzlichen Anlass, der die Zielgruppe aus eigenem Interesse vor Ort zusammenbrachte. Im Mittelpunkt standen EA SPORTS FC, gemeinsamer Wettbewerb und ein professionell organisiertes Gaming-Erlebnis – ohne unmittelbaren Bewerbungsdruck oder klassische Recruiting-Situation.',
  'Mitarbeitende und Verantwortliche von hagebau Bolay konnten sich authentisch unter die Teilnehmenden mischen, Gespräche führen und das Unternehmen in einem ungezwungenen Umfeld präsentieren. So entstanden Begegnungen auf Augenhöhe, bei denen zunächst das gemeinsame Erlebnis und nicht die unmittelbare Bewerbung im Vordergrund stand.',
  'Auf diese Weise entwickelte sich ein wiederkehrender Aktivierungskreislauf: Ausbildungsmessen und Schulbesuche schaffen erste Berührungspunkte, das Recruiting-Game vermittelt spielerisch Einblicke in das Unternehmen und die Gaming Days bringen potenzielle Talente direkt mit hagebau Bolay zusammen.',
  'Über die verschiedenen Touchpoints konnten zahlreiche qualifizierte Kontakte aufgebaut werden. Aus ersten Begegnungen entwickelten sich konkrete Bewerbungen und schließlich auch Einstellungen. Der Erfolg des Formats liegt dabei nicht ausschließlich in einer unmittelbaren Bewerbung, sondern vor allem darin, eine schwer erreichbare Zielgruppe frühzeitig und ohne hohe Einstiegshürden für hagebau Bolay zu öffnen.'
];

const FACTS = [
  {
    title: 'Gamifizierter Einstieg ins Recruiting',
    icon: <Target className="w-6 h-6" />,
    text: 'Strategische Initiierung eines individuellen 2D-Retro-Recruiting-Games und Vermittlung eines spezialisierten Partners für Feinkonzeption und technische Umsetzung. Heute realisieren wir vergleichbare Gamification-Lösungen vollständig inhouse.'
  },
  {
    title: 'Messeaktivierung × Gaming Days',
    icon: <Users className="w-6 h-6" />,
    text: 'Konzeption und Umsetzung interaktiver Gaming-Module für regionale Ausbildungsmessen sowie eigener EA SPORTS FC-Turniere direkt im hagebau-Markt.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Strategie & Aktivierungskonzept',
    desc: 'Entwicklung eines langfristigen Recruiting-Ansatzes, der Gaming mit den bestehenden Kommunikations-, Messe- und Ausbildungsmaßnahmen von hagebau Bolay verbindet.'
  },
  {
    title: 'Gamification & Partnervermittlung',
    desc: 'Strategischer Impuls für das 2D-Retro-Recruiting-Game und Vermittlung eines spezialisierten Partners für die damalige Feinkonzeption und technische Realisierung.'
  },
  {
    title: 'Messeaktivierung',
    desc: 'Konzeption und Integration modularer Gaming-Angebote auf regionalen Karriere- und Ausbildungsmessen als aktivierender Einstieg in den persönlichen Austausch.'
  },
  {
    title: 'Gaming Days & Turniermanagement',
    desc: 'Planung und Umsetzung eigener EA SPORTS FC-Turniere im hagebau-Markt inklusive Eventkonzept, Technik, Bracketing, Teilnehmermanagement und Betreuung vor Ort.'
  }
];

const IMPACT = [
  { label: 'Zielgruppe', value: 'Schülerinnen und Schüler, Ausbildungsinteressierte und junge Menschen aus der Region.' },
  { label: 'Aktivierung', value: 'Eigenmotivierte Teilnahme und persönlicher Austausch statt kurzer Pflichtgespräche am Messestand.' },
  { label: 'Recruiting-Wirkung', value: 'Qualifizierte Kontakte, konkrete Bewerbungen und daraus entstandene Einstellungen.' }
];

export const CaseDetail: React.FC<CaseDetailProps> = () => {
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
        image="/images/hagebau/hero-hagebau.jpg"
        alt="Messeaktivierung und Gaming Days für hagebau Bolay"
        title="Hagebau Bolay"
        accent="Messeaktivierung × Gaming Days."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Mit Gaming junge Talente auf Ausbildungsmessen und im eigenen Markt erreichen."
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

            <CaseSlider images={images} alt="Eindruck aus der Zusammenarbeit mit hagebau Bolay" />

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
                href="https://www.hagebau-bolay.de"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="/logos/hagebau-logo.png"
                  alt="hagebau Bolay Logo"
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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Gamifiziertes Recruiting-System</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Messe + Live-Event | regional | niedrigschwellig | langfristig
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
                      <h4 className="text-white font-black leading-snug">Vom ersten Messekontakt bis zur Bewerbung</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Ein langfristiger Recruiting-Kreislauf, der gamifizierte Berufsorientierung, regionale
                        Ausbildungsmessen und eigene Live-Events miteinander verbindet und hagebau Bolay kontinuierlich
                        mit jungen Talenten in Kontakt bringt.
                      </p>
                    </div>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="mb-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                      <div className="text-lg font-black text-white leading-tight">Langjährige Partnerschaft</div>
                      <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                        Das Recruiting-Game ist weiterhin im Einsatz und die Messe- und Gaming-Aktivierungen werden
                        fortlaufend weiterentwickelt.
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Gaming wurde vom einzelnen Kontaktpunkt zum langfristigen Zugang zu einer schwer erreichbaren
                      Recruiting-Zielgruppe.“
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
