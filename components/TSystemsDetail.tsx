import React, { useEffect } from 'react';
import { Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
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

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Alles, was auf dieser Seite steht, steht hier -- in der Reihenfolge, in der
// es der Kunde freigegeben hat. Die frueheren Texte (Schuelerturniere,
// Live-Finale im Dezember) sind nicht ueberarbeitet, sondern ersetzt: sie
// beschrieben eine andere Fassung des Projekts.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie erreicht man junge, technikaffine Menschen nicht nur kommunikativ, sondern bringt sie dazu, sich aktiv mit einem Arbeitgeber auseinanderzusetzen? Genau vor dieser Herausforderung stand T-Systems.',
  'Gemeinsam entwickelten wir eine deutschlandweite Gaming- und Employer-Branding-Aktivierung, die digitale Turniere, relevante Karriereinhalte und ein hochwertiges Live-Erlebnis miteinander verband. Das Ergebnis: eine authentische Plattform für Wettbewerb, Austausch und persönliche Begegnungen mit der Arbeitgebermarke T-Systems.'
];

const PROJEKTBESCHREIBUNG = [
  'Bereits im Rahmen einer Hochschulroadshow hatte T-Systems erste Gaming-Elemente eingesetzt. Retro-Automaten und kleinere Aktivierungen sorgten zwar für Aufmerksamkeit, boten aber nur begrenzte Möglichkeiten für echte Interaktion und nachhaltigen Austausch.',
  'Die neue Aufgabenstellung ging deshalb deutlich weiter: Gesucht wurde ein Format, das Studierende an Hochschulen ebenso erreicht wie junge Tech-Talente im gesamten Bundesgebiet – und aus passiver Aufmerksamkeit aktive Teilnahme macht.',
  'In einem gemeinsamen Workshop analysierten wir die vorhandene Kommunikation und identifizierten mit „Be our Gamechanger“ einen bereits etablierten Employer-Branding-Claim, der eine ideale Grundlage für die Gaming-Aktivierung bot. Statt eine losgelöste Kampagne zu entwickeln, integrierten wir das neue Format konsequent in die bestehende Marken- und Kommunikationswelt von T-Systems.',
  'Auf Basis unserer White-Label-Lösung entstand eine digitale Plattform im Look and Feel von T-Systems. Sie bündelte Turnieranmeldung, Wettbewerbe, Employer-Branding-Inhalte und relevante Stellenangebote zu einem zentralen digitalen Touchpoint.',
  'Den aktivierenden Mittelpunkt bildete eine deutschlandweite Turnier- und Eventserie mit Mario Kart und EA SPORTS FC. Interessierte konnten online teilnehmen, sich mit anderen messen und attraktive Preise gewinnen. Begleitende Social-Media-Aktivitäten verlängerten die Reichweite und führten die Zielgruppe gezielt auf die Plattform.',
  'Der Abschluss der Aktivierung brachte die digitale Community und das Hochschulumfeld vor Ort zusammen. Im Rahmen einer Veranstaltung an der Hochschule Heilbronn fanden die Finalturniere statt. Gleichzeitig konnten auch weitere Besucherinnen und Besucher spontan an Gaming-Stationen teilnehmen und T-Systems in einem ungezwungenen Umfeld kennenlernen.',
  'Ein professioneller Kommentator, ein hochwertig gebrandetes Event-Setup und die Verbindung aus Hochschule, Arbeitgebermarke und Gaming-Kultur machten aus dem Finale mehr als ein Turnier: Es entstand ein gemeinsames Erlebnis, das Gespräche erleichterte, Nähe schuf und T-Systems als modernen Arbeitgeber erlebbar machte.'
];

const FACTS = [
  {
    title: 'White-Label-Plattform',
    icon: <Target className="w-6 h-6" />,
    text: 'Konzeption und Entwicklung eines digitalen T-Systems-Hubs mit Turnieranmeldung, Wettbewerbsinformationen, Employer-Branding-Content und integrierten Stellenangeboten.'
  },
  {
    title: 'Online-to-On-Site-Aktivierung',
    icon: <Users className="w-6 h-6" />,
    text: 'Deutschlandweite Online-Turniere in Mario Kart und EA SPORTS FC, begleitende Social-Media-Kommunikation und ein gemeinsam erlebbares Finale an der Hochschule Heilbronn.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Strategie & Konzeption',
    desc: 'Entwicklung einer integrierten Gaming-Aktivierung auf Basis der bestehenden Employer-Branding-Kommunikation von T-Systems.'
  },
  {
    title: 'Plattform & Technologie',
    desc: 'Aufbau einer individuellen White-Label-Plattform im Look and Feel von T-Systems inklusive Registrierung, Turniermanagement, Inhalten und Stellenangeboten.'
  },
  {
    title: 'Turniere & Kommunikation',
    desc: 'Konzeption und Durchführung deutschlandweiter Wettbewerbe in Mario Kart und EA SPORTS FC, begleitet durch aktivierende Social-Media-Maßnahmen.'
  },
  {
    title: 'Live-Event & Produktion',
    desc: 'Umsetzung der Finalveranstaltung mit gebrandetem Event-Setup, Gaming-Stationen, Turniertechnik, Kommentator und Betreuung vor Ort.'
  }
];

const IMPACT = [
  { label: 'Zielgruppe', value: 'Studierende und junge, technikaffine Talente in ganz Deutschland.' },
  { label: 'Aktivierung', value: 'Aktive Teilnahme, Wettbewerb und persönlicher Austausch statt passiver Markenpräsenz.' },
  { label: 'Markenwirkung', value: 'T-Systems wurde als innovativer, nahbarer und technologieorientierter Arbeitgeber erlebbar.' }
];

export const TSystemsDetail: React.FC<TSystemsDetailProps> = () => {
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
        image="/images/t-systems/hero.jpg"
        alt="Gaming- und Employer-Branding-Aktivierung für T-Systems"
        title="T-Systems"
        accent="Be our Gamechanger."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Mit Gaming Tech-Talente erreichen und aktiv für T-Systems begeistern."
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

            <CaseSlider images={images} alt="Eindruck aus der T-Systems-Aktivierung" />

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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Gaming- und Employer-Branding-Plattform</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Digital + Live | deutschlandweit | aktivierend | White-Label
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
                      <h4 className="text-white font-black leading-snug">Von digitaler Reichweite zu echter Begegnung</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Eine durchgängige Employer-Branding-Aktivierung, die Online-Turniere, Karrierekommunikation und ein
                        gemeinsames Live-Erlebnis wirkungsvoll miteinander verband.
                      </p>
                    </div>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="mb-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                      <div className="text-lg font-black text-white leading-tight">Erfolgreich umgesetzt</div>
                      <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                        Modular aufgebaut und für weitere Aktivierungen skalierbar.
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Aus einem digitalen Kontakt wurde ein gemeinsames Erlebnis mit der Arbeitgebermarke T-Systems.“
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
