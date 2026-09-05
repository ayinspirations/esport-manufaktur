import React, { useEffect } from 'react';
import { Trophy, Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface DekraDetailProps {
  onBack: () => void;
}

// Liegen die Bilder unter public/images/dekra, erscheinen sie von selbst --
// fehlt eines, faellt es aus der Reihe (siehe CaseSlider).
const images = [
  '/images/dekra/slide-1.jpg',
  '/images/dekra/slide-2.jpg',
  '/images/dekra/slide-3.jpg',
  '/images/dekra/slide-4.jpg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei den anderen Best Cases: alles, was auf der Seite steht, steht hier
// oben, in der freigegebenen Reihenfolge. Umgesetzt haben wir hier als
// Technologie- und Gamification-Partner von TAILORMADE -- das steht so im
// Status und gehoert dorthin, nicht in eine Fussnote.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie wird aus einer klassischen Stempelkarte eine digitale und messbare Customer Journey? Als Umsetzungspartner von TAILORMADE entwickelten wir für DEKRA eine gamifizierte Plattform mit Landingpage, digitalem Wallet-Pass, QR-Code-Tracking und automatisierter E-Mail-Kommunikation.',
  'An sechs DTM-Standorten verband die Lösung unterschiedliche Promotionflächen zu einem gemeinsamen Erlebnis. Besucherinnen und Besucher absolvierten Aufgaben, sammelten digitale Fortschritte, sicherten sich Goodies und qualifizierten sich für die Verlosung exklusiver VIP-Tickets.'
];

const PROJEKTBESCHREIBUNG = [
  'Im Rahmen einer saisonübergreifenden Motorsport-Aktivierung wollte DEKRA die verschiedenen Promotionstände an den DTM-Standorten miteinander verbinden.',
  'Ursprünglich war dafür eine physische Stempelkarte vorgesehen. Besucherinnen und Besucher sollten an unterschiedlichen Stationen Aufgaben absolvieren, Stempel sammeln und sich dadurch für Goodies sowie ein übergeordnetes Gewinnspiel qualifizieren.',
  'Gemeinsam mit TAILORMADE prüften wir, wie sich dieser Mechanismus digital weiterentwickeln lässt. Das Ziel war nicht nur, Papier zu ersetzen, sondern eine komfortable, skalierbare und messbare Lösung zu schaffen, die den gesamten Besuch über mehrere Marken-Touchpoints hinweg begleitet.',
  'Dafür entwickelten wir eine zentrale digitale Plattform. Eine gebrandete Landingpage diente als Informationsquelle, erklärte die Aktivierung und führte die Teilnehmenden durch die Registrierung und den weiteren Ablauf.',
  'Nach der Anmeldung konnten die Besucherinnen und Besucher einen individuellen Pass zu ihrer Apple Wallet oder Google Wallet hinzufügen. Damit blieb der Zugang zur Aktivierung direkt auf dem Smartphone verfügbar – ohne zusätzliche App und jederzeit schnell erreichbar.',
  'Der Wallet-Pass enthielt einen persönlichen QR-Code. An den verschiedenen DEKRA-Promotionständen wurde dieser Code von den Promotorinnen und Promotoren gescannt, sobald eine Aufgabe erfolgreich absolviert war.',
  'Jeder Scan aktualisierte den persönlichen Fortschritt. Ein digitales Live-Barometer zeigte den Teilnehmenden, welche Stationen sie bereits abgeschlossen hatten, wie viele Aufgaben noch fehlten und wann sie sich für die nächste Belohnungsstufe oder das große Gewinnspiel qualifizierten.',
  'Über diese Gamification-Mechanik wurden die Besucherinnen und Besucher motiviert, mehrere DEKRA-Flächen zu entdecken und sich intensiver mit den dort angebotenen Inhalten und Aufgaben auseinanderzusetzen.',
  'Mit steigendem Fortschritt konnten unterschiedliche Goodies freigeschaltet werden. Wer die erforderlichen Stationen absolvierte, qualifizierte sich zusätzlich für die Verlosung exklusiver VIP-Tickets – eine besondere Money-can’t-buy Experience im Motorsportumfeld.',
  'Die Plattform wurde für jeden der sechs DTM-Standorte individuell angepasst. Inhalte, Aufgaben, Stationen und organisatorische Informationen konnten abhängig vom jeweiligen Veranstaltungsort ausgespielt werden, während die technische Grundstruktur über die gesamte Saison hinweg bestehen blieb.',
  'Ergänzend wurde die Aktivierung mit einer einwilligungsbasierten E-Mail-Kommunikation verbunden. Dadurch konnten Teilnehmende vor, während und nach dem jeweiligen Event mit relevanten Informationen angesprochen und die vor Ort gewonnenen Kontakte über den Veranstaltungstag hinaus weitergeführt werden.',
  'So entstand eine durchgängige Verbindung zwischen physischer Promotion, digitaler Gamification und Lead-Generierung. Jeder absolvierte Touchpoint wurde messbar, die Teilnahme transparent und der Fortschritt für die Nutzerinnen und Nutzer unmittelbar sichtbar.',
  'Gleichzeitig blieb der Wallet-Pass als digitales Erinnerungsstück auf dem Smartphone bestehen. Dadurch endete der Markenkontakt nicht automatisch mit dem Verlassen des DTM-Geländes, sondern konnte über die eigentliche Eventaktivierung hinaus verlängert werden.',
  'Über die sechs begleiteten Standorte hinweg generierte die Aktivierung eine hohe Zahl qualifizierter Leads und zeigte, wie sich ein analog gedachter Mechanismus in eine skalierbare Online-to-Onsite-Lösung überführen lässt.'
];

const FACTS = [
  {
    title: 'Sechs Standorte – ein System',
    icon: <Target className="w-6 h-6" />,
    text: 'Eine skalierbare Plattform, die für sechs DTM-Standorte jeweils mit individuellen Inhalten, Aufgaben, Stationen und Veranstaltungsinformationen angepasst wurde.'
  },
  {
    title: 'Wallet × QR × Rewards',
    icon: <Users className="w-6 h-6" />,
    text: 'Ein digitaler Wallet-Pass mit persönlichem QR-Code, Live-Fortschritt, mehreren Belohnungsstufen und Qualifikation für die Verlosung exklusiver VIP-Tickets.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Strategie & Digitalisierung',
    desc: 'Überführung einer ursprünglich physischen Stempelkarte in eine digitale, messbare und saisonübergreifend einsetzbare Aktivierung.'
  },
  {
    title: 'Plattform & Landingpage',
    desc: 'Konzeption und Entwicklung einer gebrandeten Informations-, Registrierungs- und Aktivierungsplattform für die teilnehmenden DTM-Standorte.'
  },
  {
    title: 'Apple & Google Wallet',
    desc: 'Integration eines individuellen digitalen Passes für Apple Wallet und Google Wallet als dauerhafter Zugang zur Aktivierung.'
  },
  {
    title: 'QR-Code-Tracking',
    desc: 'Entwicklung eines persönlichen QR-Code-Systems, über das absolvierte Aufgaben direkt an den DEKRA-Promotionständen erfasst wurden.'
  },
  {
    title: 'Gamification & Reward-System',
    desc: 'Konzeption eines Fortschrittsmodells mit Live-Barometer, verschiedenen Belohnungsstufen, Goodies und Qualifikation für das VIP-Gewinnspiel.'
  },
  {
    title: 'Standortindividualisierung',
    desc: 'Anpassung der Plattform, Inhalte, Stationen und Aufgaben an die jeweiligen Gegebenheiten der sechs DTM-Veranstaltungsorte.'
  },
  {
    title: 'Lead-Generierung & E-Mail-Kommunikation',
    desc: 'Verknüpfung der Eventaktivierung mit einwilligungsbasierter Datenerfassung und begleitender Kommunikation über den einzelnen Veranstaltungstag hinaus.'
  }
];

const IMPACT = [
  { label: 'Zielgruppe', value: 'Motorsportfans sowie Besucherinnen und Besucher der DEKRA-Promotionflächen an den DTM-Standorten.' },
  { label: 'Aktivierung', value: 'Spielerischer Fortschritt und attraktive Belohnungen motivierten dazu, mehrere Stationen und Marken-Touchpoints zu besuchen.' },
  { label: 'Messbarkeit', value: 'Absolvierte Aufgaben, Fortschritte und Teilnahmen konnten digital erfasst und standortbezogen ausgewertet werden.' },
  { label: 'Lead-Wirkung', value: 'Die Aktivierung generierte zahlreiche qualifizierte Kontakte und verlängerte die Kommunikation über das Live-Event hinaus.' }
];

export const DekraDetail: React.FC<DekraDetailProps> = () => {
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
        image="/images/dekra/hero.jpg"
        alt="DEKRA Motorsport – digitaler Event-Pass bei der DTM"
        title="DEKRA Motorsport"
        accent="Digital Event Pass × DTM."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word" stagger={0}
                text="DTM-Besucher standortübergreifend aktivieren, qualifizierte Leads gewinnen und Promotionflächen digital verbinden."
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

            <CaseSlider images={images} alt="Eindruck aus der DEKRA-Motorsport-Aktivierung" />

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
                href="https://www.tailormade-group.de"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="/logos/Tailormade.png"
                  alt="TAILORMADE Logo"
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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Gamifizierter digitaler Eventpass</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Landingpage + Wallet + QR-Tracking + E-Mail-Marketing | sechs DTM-Standorte | Online-to-Onsite
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
                      <h4 className="text-white font-black leading-snug">Vom analogen Stempelpass zur digitalen Customer Journey</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Eine skalierbare Online-to-Onsite-Plattform, die sechs DTM-Standorte, unterschiedliche
                        Promotionflächen, Gamification, Lead-Generierung und E-Mail-Kommunikation in einem System
                        verband.
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
                        <div className="text-lg font-black text-white leading-tight">Erfolgreich an sechs DTM-Standorten umgesetzt</div>
                        <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                          Realisierung als Technologie- und Gamification-Partner von TAILORMADE im Rahmen der saisonalen
                          DEKRA-Motorsport-Aktivierung.
                        </div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Jeder Scan machte Fortschritt sichtbar, verband die nächste Promotionfläche mit dem
                      Gesamterlebnis und verlängerte den Kontakt zu DEKRA über den Eventtag hinaus.“
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
