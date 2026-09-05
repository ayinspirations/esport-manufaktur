import React, { useEffect } from 'react';
import { Trophy, Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface IntersportDetailProps {
  onBack: () => void;
}

// Liegen die Bilder unter public/images/intersport, erscheinen sie von
// selbst -- fehlt eines, faellt es aus der Reihe (siehe CaseSlider).
const images = [
  '/images/intersport/slide-1.jpg',
  '/images/intersport/slide-2.jpg',
  '/images/intersport/slide-3.jpg',
  '/images/intersport/slide-4.jpg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei den anderen Best Cases: alles, was auf der Seite steht, steht hier
// oben, in der freigegebenen Reihenfolge.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie integriert man ein hochwertiges Gaming-Erlebnis in einen räumlich stark begrenzten Pop-up-Store? Für das INTERSPORT Clubhouse in Berlin entwickelten wir eine kompakte, vollständig gebrandete Gaming-Wall, die Besucherinnen und Besucher über sechs Wochen zum freien Spielen einlud.',
  'Als Höhepunkt ergänzten wir die dauerhafte Aktivierung um ein eigenes EA SPORTS FC 26-Turnier. Eine gebrandete Online-Plattform, acht Konsolen, eine Main Stage, ein Kommentator und die gemeinsame Liveübertragung eines Fußballspiels machten daraus eine ganzheitliche Fußball- und Digital-Fußball-Aktivierung.'
];

const PROJEKTBESCHREIBUNG = [
  'Im Umfeld der Fußball-WM eröffnete INTERSPORT auf dem Ravelinplatz hinter dem ALEXA in Berlin einen eigenen Pop-up-Store. Das INTERSPORT Clubhouse sollte Fußballfans nicht nur als Verkaufs- und Begegnungsfläche dienen, sondern ihnen auch interaktive Erlebnisse rund um den digitalen Fußball bieten.',
  'Die zentrale Herausforderung lag in den räumlichen Bedingungen: Die EA SPORTS FC-Aktivierung musste in einen engen Container integriert werden, ohne den Store zu überladen oder wichtige Lauf- und Aufenthaltsflächen zu blockieren.',
  'Dafür konzipierten wir eine besonders platzsparende Gaming-Wall, die Technik, Screens, Konsolen und Branding in einem kompakten Aufbau vereinte. Die gesamte Installation wurde auf den INTERSPORT-Auftritt abgestimmt und vollständig gebrandet in den Pop-up-Store integriert.',
  'Über einen Zeitraum von sechs Wochen konnten Besucherinnen und Besucher die Gaming-Wall nutzen, spontan gegeneinander antreten und EA SPORTS FC 26 direkt im Clubhouse erleben. So entstand innerhalb des Stores ein dauerhafter Aktivierungspunkt, der zum Mitmachen einlud und die Verweildauer erhöhte.',
  'Als Höhepunkt der Aktivierung entwickelten wir zusätzlich ein eigenes EA SPORTS FC 26-Turnier für Jugendliche, Fußballfans und Gaming-Interessierte aus Berlin.',
  'Für die Ankündigung und Organisation des Wettbewerbs setzten wir eine individuelle Turnierplattform im Look and Feel von INTERSPORT auf. Diese wurde direkt über die Hauptseite von INTERSPORT verlinkt und bildete den gesamten Prozess von der Information und Anmeldung bis zur strukturierten Turnierdurchführung digital ab.',
  'Vor Ort realisierten wir das Turnier trotz der anspruchsvollen Platzverhältnisse mit insgesamt acht Konsolen, vollständig gebrandetem Gaming-Equipment und einer eigenen Main Stage. Ein professioneller Kommentator begleitete die Begegnungen und sorgte dafür, dass auch Zuschauerinnen und Zuschauer in das Turniergeschehen eingebunden wurden.',
  'Ergänzt wurde das Gaming-Event durch die Liveübertragung des Fußballspiels zwischen Argentinien und Marokko. Dadurch verband das Clubhouse den realen und den digitalen Fußball zu einem gemeinsamen Erlebnis.',
  'Von der kompakten Gaming-Wall über die digitale Turnierplattform bis zur technischen und operativen Umsetzung vor Ort verantworteten wir die vollständige EA SPORTS FC-Aktivierung. So wurde aus einer begrenzten Pop-up-Fläche ein vielseitiger Touchpoint für Gaming, Fußball und persönliche Markeninteraktion.'
];

const FACTS = [
  {
    title: 'Sechs Wochen Pop-up-Gaming',
    icon: <Target className="w-6 h-6" />,
    text: 'Konzeption, Branding und technische Ausstattung einer besonders platzsparenden Gaming-Wall für die sechswöchige Aktivierung im INTERSPORT Clubhouse.'
  },
  {
    title: 'Turnierplattform × Live-Event',
    icon: <Users className="w-6 h-6" />,
    text: 'Individuelle Online-Plattform, digitaler Anmeldeprozess und vollständige Turnierumsetzung mit acht Konsolen, Main Stage, Kommentator und gebrandetem Equipment.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Flächen- & Aktivierungskonzept',
    desc: 'Konzeption einer hochwertigen EA SPORTS FC-Aktivierung für die räumlich begrenzten Bedingungen des Pop-up-Stores.'
  },
  {
    title: 'Gaming-Wall & Branding',
    desc: 'Planung, Ausstattung und Integration einer kompakten Gaming-Wall inklusive Screens, Konsolen, Technik und vollständigem INTERSPORT-Branding.'
  },
  {
    title: 'Plattform & Teilnehmermanagement',
    desc: 'Aufbau einer individuellen Turnierplattform für Information, Anmeldung und Organisation des EA SPORTS FC 26-Turniers.'
  },
  {
    title: 'Turnier- & Eventproduktion',
    desc: 'Umsetzung des Wettbewerbs mit acht Konsolen, Main Stage, Bracketing, Spielleitung, Kommentator und technischer Betreuung vor Ort.'
  },
  {
    title: 'Live-Kommunikation',
    desc: 'Verbindung des Turniergeschehens mit der gemeinsamen Liveübertragung des Fußballspiels zwischen Argentinien und Marokko.'
  }
];

const IMPACT = [
  { label: 'Zielgruppe', value: 'Jugendliche, Gaming-Interessierte und Fußballfans aus Berlin sowie Besucherinnen und Besucher des INTERSPORT Clubhouse.' },
  { label: 'Aktivierung', value: 'Sechs Wochen frei zugängliches Gaming und ein abschließendes Turnier-Highlight statt einer rein statischen Pop-up-Fläche.' },
  { label: 'Markenwirkung', value: 'INTERSPORT wurde als aktiver Bestandteil der Fußball- und Gaming-Kultur erlebbar.' }
];

export const IntersportDetail: React.FC<IntersportDetailProps> = () => {
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
        image="/images/intersport/hero.jpg"
        alt="INTERSPORT Clubhouse – EA SPORTS FC 26-Aktivierung in Berlin"
        title="Intersport Clubhouse"
        accent="EA Sports FC 26 × WM-Edition."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Fußball- und Gaming-Fans mit einer sechswöchigen Pop-up-Aktivierung für INTERSPORT begeistern."
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

            <CaseSlider images={images} alt="Eindruck aus dem INTERSPORT Clubhouse" />

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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Pop-up-Gaming-Aktivierung mit Turnier-Event</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Retail + Digital + Live | sechs Wochen | acht Konsolen | vollständig gebrandet
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
                      <h4 className="text-white font-black leading-snug">Vom Pop-up-Store zur interaktiven Fußball-Erlebniswelt</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Eine ganzheitliche Aktivierung, die Retail-Fläche, EA SPORTS FC 26, digitale Turnierplattform,
                        Live-Event und reale Fußballbegeisterung miteinander verband.
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
                        <div className="text-lg font-black text-white leading-tight">Erfolgreich umgesetzt</div>
                        <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                          Sechswöchige Aktivierung mit abschließendem EA SPORTS FC 26-Turnier im INTERSPORT Clubhouse in
                          Berlin.
                        </div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Auf begrenzter Fläche entstand ein vollständiges Fußball- und Gaming-Erlebnis – vom freien Spiel
                      bis zum Turnierfinale.“
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
