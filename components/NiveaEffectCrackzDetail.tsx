import React, { useEffect } from 'react';
import { Trophy, Target, Users, Gamepad2 } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface NiveaEffectCrackzDetailProps {
  onBack: () => void;
}

// Liegen die Bilder unter public/images/consumenta, erscheinen sie von selbst
// -- fehlt eines, faellt es aus der Reihe (siehe CaseSlider).
const images = [
  '/images/consumenta/slide-1.jpg',
  '/images/consumenta/slide-2.jpg',
  '/images/consumenta/slide-3.jpg',
  '/images/consumenta/slide-4.jpg',
];

// Die Logos, die im Projekt liegen. CRACKZ hat keines -- die Zeile nennt die
// Marke deshalb im Text und nicht als Bild.
const LOGOS = [
  { src: '/logos/nivea-men-logo-png_seeklogo-323961.png', alt: 'NIVEA MEN Logo', href: 'https://www.nivea.de/nivea-men' },
  { src: '/logos/effect-energy-drink-logo-png-transparent.png', alt: 'EFFECT Energy Logo', href: 'https://www.effect-energy.com' }
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei den anderen Best Cases: alles, was auf der Seite steht, steht hier
// oben, in der freigegebenen Reihenfolge. Einziger Unterschied im Aufbau:
// dieser Case hat drei Facts-Kacheln statt zwei, weil er drei Marken traegt.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie aktiviert man Messebesucherinnen und Messebesucher für drei unterschiedliche Marken auf einer gemeinsamen Fläche? Auf der Consumenta in Nürnberg entwickelten wir für NIVEA MEN, EFFECT und CRACKZ jeweils eine eigene Aktivierungsmechanik – abgestimmt auf Marke, Produkt und Kommunikationsziel.',
  'Sponsorship Activation und Marktforschung, Gaming-Challenges, Gewinnspiele, Product Sampling und ein gemeinsamer Twitch-Livestream verbanden die drei Markenwelten zu einem interaktiven Messeerlebnis und verwandelten Besucherinnen und Besucher in aktive Teilnehmende und qualifizierte Leads.'
];

const PROJEKTBESCHREIBUNG = [
  'Im Rahmen der Consumenta in Nürnberg betreuten wir eine vielseitige Aktivierungsfläche mit drei unterschiedlichen Markenwelten für NIVEA MEN, EFFECT und CRACKZ.',
  'Die besondere Herausforderung bestand darin, für jede Marke eine eigenständige und glaubwürdige Aktivierung zu entwickeln und gleichzeitig ein zusammenhängendes Gesamterlebnis zu schaffen. Gaming und Gamification bildeten dabei die verbindenden Elemente, wurden jedoch für jede Marke individuell übersetzt.',
  'Für NIVEA MEN entwickelten wir eine Sponsorship Activation rund um eine besondere Money-can’t-buy Experience: Tickets für ein Spiel von Real Madrid.',
  'Um an der Verlosung teilnehmen zu können, beantworteten die Besucherinnen und Besucher zunächst einige von NIVEA MEN entwickelte Fragen. Auf diese Weise wurde die Gewinnspielteilnahme mit einer kompakten Marktforschung verbunden, die zusätzliche Einblicke in Interessen, Wahrnehmung und Verhalten der relevanten Zielgruppe ermöglichte.',
  'Anschließend konnten die Teilnehmenden an einer Gaming-Challenge auf der Aktionsfläche teilnehmen. Nach Abschluss der einzelnen Schritte qualifizierten sie sich für den Lostopf der Real-Madrid-Tickets.',
  'Die finale Auslosung wurde in einen Twitch-Livestream integriert. Dadurch erhielt die Aktivierung einen zusätzlichen digitalen Höhepunkt und die Spannung konnte über den eigentlichen Messekontakt hinaus verlängert werden.',
  'Auf derselben Gesamtfläche entstand für EFFECT eine eigenständige Produkt- und Markenaktivierung. Ein Ford Raptor wurde als aufmerksamkeitsstarkes zentrales Element in die Fläche integriert und für die Challenge genutzt.',
  'Aus einem Kühlschrank wurden gekühlte EFFECT-Dosen als Product Samples an die Besucherinnen und Besucher ausgegeben. Dadurch konnten sie das Produkt direkt erleben und die Marke unmittelbar mit der Aktivierung verbinden.',
  'Auf der Ladefläche des Ford Raptor realisierten wir eine spielerische Gewinnspielmechanik mit unterschiedlichen Dosen-Trays. Die Teilnehmenden konnten ihr Geschick unter Beweis stellen und sich für die Verlosung eines Airwheels im individuellen EFFECT-Branding qualifizieren.',
  'Auch dieses Gewinnspiel wurde in den Livestream eingebunden und dort final aufgelöst. So verband die EFFECT-Aktivierung Produktinszenierung, Sampling, Wettbewerb und digitale Kommunikation zu einem gemeinsamen Erlebnis.',
  'Für CRACKZ, eine Snack-Marke aus dem Haus MBG, integrierten wir eine weitere Gaming-Aktivierung. Das bestehende PC- beziehungsweise Online-Game der Marke wurde vor Ort spielbar gemacht und als Highscore-Challenge inszeniert.',
  'Die Messegäste konnten versuchen, den bestehenden Highscore zu knacken und sich dadurch für einen Gewinn zu qualifizieren. Gleichzeitig wurden die Nachos und Nuts von CRACKZ als Product Samples ausgegeben.',
  'Damit verband auch diese Aktivierung das digitale Spielerlebnis unmittelbar mit dem Produkt. Die Besucherinnen und Besucher beschäftigten sich aktiv mit der Marke, probierten die Produkte und hatten durch die Highscore-Mechanik einen klaren Anreiz zur Teilnahme.',
  'Gemeinsam bildeten NIVEA MEN, EFFECT und CRACKZ drei unterschiedliche Aktivierungsflächen innerhalb eines ganzheitlichen Messeauftritts. Ergänzt wurde dieser durch weitere von uns betreute Nebenflächen für die KKH und Mastercard.',
  'So entstand auf der Consumenta eine vielseitige Erlebniswelt, in der unterschiedliche Marken über Gaming, Gamification, Gewinnspiele und Product Sampling aktiviert wurden. Statt klassischer Produktpräsentation standen Mitmachen, Ausprobieren und gemeinsames Erleben im Mittelpunkt.',
  'Die Aktivierungsmechaniken erzeugten Aufmerksamkeit, verlängerten die Verweildauer und ermöglichten gleichzeitig die strukturierte Gewinnung von Leads und Zielgruppen-Insights.'
];

const FACTS = [
  {
    title: 'NIVEA MEN – Sponsorship Activation',
    icon: <Target className="w-6 h-6" />,
    text: 'Kompakte Marktforschung, Gaming-Challenge und Verlosung einer Money-can’t-buy Experience mit Tickets für ein Spiel von Real Madrid.'
  },
  {
    title: 'EFFECT – Product Experience',
    icon: <Users className="w-6 h-6" />,
    text: 'Ford Raptor, gekühltes Product Sampling, gamifizierte Dosen-Challenge und Verlosung eines Airwheels im individuellen EFFECT-Branding.'
  },
  {
    title: 'CRACKZ – Highscore Challenge',
    icon: <Gamepad2 className="w-6 h-6" />,
    text: 'Integration des markeneigenen Online-Games als spielbare Highscore-Challenge, kombiniert mit Product Sampling von Nachos und Nuts.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Strategie & Aktivierungskonzept',
    desc: 'Entwicklung individueller Gaming- und Gamification-Mechaniken für drei unterschiedliche Marken innerhalb einer gemeinsamen Messefläche.'
  },
  {
    title: 'NIVEA MEN Sponsorship Activation',
    desc: 'Verbindung einer Marktforschung mit Gaming-Challenge, Gewinnspiel und einer Money-can’t-buy Experience rund um Real Madrid.'
  },
  {
    title: 'EFFECT Marken- & Produktaktivierung',
    desc: 'Integration eines Ford Raptor, Entwicklung einer gamifizierten Challenge, Umsetzung des Product Samplings und Inszenierung des Hauptgewinns.'
  },
  {
    title: 'CRACKZ Gaming Activation',
    desc: 'Einbindung des bestehenden Markenspiels als Highscore-Challenge und Verbindung des digitalen Erlebnisses mit dem Sampling der Produkte.'
  },
  {
    title: 'Lead-Generierung & Zielgruppen-Insights',
    desc: 'Entwicklung niedrigschwelliger Teilnahmeprozesse zur strukturierten Gewinnung von Kontakten und zusätzlichen Erkenntnissen über die Zielgruppen.'
  },
  {
    title: 'Gewinnspielmanagement',
    desc: 'Konzeption und operative Begleitung der unterschiedlichen Gewinnspiel- und Qualifikationsmechaniken.'
  },
  {
    title: 'Livestream & Content',
    desc: 'Integration der Gewinnspielauflösungen in einen Twitch-Livestream zur digitalen Verlängerung der Aktivierungen.'
  },
  {
    title: 'Eventplanung & Produktion',
    desc: 'Planung, Ausstattung und operative Umsetzung der Aktivierungsflächen auf der Consumenta in Nürnberg.'
  }
];

const IMPACT = [
  { label: 'Zielgruppen', value: 'Besucherinnen und Besucher der Consumenta, Gaming-Interessierte sowie potenzielle Konsumentinnen und Konsumenten der beteiligten Marken.' },
  { label: 'Aktivierung', value: 'Gaming-Challenges, Gewinnspiele und Highscore-Mechaniken verwandelten passive Messebesucher in aktive Teilnehmende.' },
  { label: 'Produkterlebnis', value: 'Product Sampling integrierte die Produkte von EFFECT und CRACKZ unmittelbar in das spielerische Markenerlebnis.' },
  { label: 'Lead-Wirkung', value: 'Die Aktivierungen verbanden Unterhaltung mit strukturierter Lead-Generierung und zusätzlichen Zielgruppen-Insights.' }
];

export const NiveaEffectCrackzDetail: React.FC<NiveaEffectCrackzDetailProps> = () => {
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
        image="/images/consumenta/hero.jpg"
        alt="NIVEA MEN, EFFECT und CRACKZ – Markenaktivierungen auf der Consumenta"
        title="NIVEA MEN × EFFECT × CRACKZ"
        accent="Gaming. Sampling. Leads."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Drei Marken mit individuellen Gaming- und Gamification-Aktivierungen auf der Consumenta erlebbar machen."
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

            <CaseSlider images={images} alt="Eindruck von der Consumenta-Aktivierung" />

            <section className="space-y-6">
              {PROJEKTBESCHREIBUNG.map((para, i) => (
                <Reveal key={i} as="p" y={20} className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  {para}
                </Reveal>
              ))}
            </section>

            {/* Drei Marken, drei Kacheln -- deshalb dreispaltig statt
                zweispaltig wie auf den uebrigen Case-Seiten. */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FACTS.map((item, i) => (
                <Reveal key={item.title} delay={i * STAGGER.card} y={26} className="bg-white/50 backdrop-blur-xl p-7 rounded-surface border border-slate-900/5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-3 leading-tight">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">{item.text}</p>
                </Reveal>
              ))}
            </div>

            <div className="pt-12 flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {LOGOS.map((logo) => (
                <a
                  key={logo.src}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform"
                >
                  <img src={logo.src} alt={logo.alt} className="h-14 md:h-20 w-auto opacity-100 transition-opacity" />
                </a>
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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Multi-Brand-Messeaktivierung</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Gaming + Gamification + Product Sampling + Lead-Generierung | Consumenta Nürnberg
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
                      <h4 className="text-white font-black leading-snug">Drei Marken – drei Mechaniken – ein gemeinsames Erlebnis</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Eine ganzheitliche Messeaktivierung, die Sponsoring, Marktforschung, Gaming, Gamification,
                        Product Sampling, Lead-Generierung und Livestream-Kommunikation wirkungsvoll miteinander
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
                        <div className="text-lg font-black text-white leading-tight">Erfolgreich auf der Consumenta umgesetzt</div>
                        <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                          Drei individuelle Markenaktivierungen für NIVEA MEN, EFFECT und CRACKZ sowie zusätzliche
                          Nebenflächen für KKH und Mastercard.
                        </div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Jede Marke erhielt ihre eigene spielerische Mechanik – gemeinsam entstand eine
                      Aktivierungsfläche, die Aufmerksamkeit in Interaktion, Produkterlebnis und qualifizierte Kontakte
                      verwandelte.“
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
