import React from 'react';
import { Reveal, RevealText } from './Reveal';
import { PageHero } from './PageHero';
import { ExpandingCTA } from './ui/expanding-cta';
import { BLOCK_GAP } from './spacing';
import { useDocumentHead } from '../hooks/useDocumentHead';

interface WebdesignPageProps {
  onNavigate: (page: any) => void;
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

const CONTAINER = 'max-w-[1100px] mx-auto px-6 md:px-14';
const TILE = 'tile-gradient text-white';

// ---------------------------------------------------------------------------
// Die Seite hinter der Zeile im Footer
// ---------------------------------------------------------------------------
// Am Fuß jeder Seite steht, wer sie gebaut hat. Bisher führte das nach
// auszen -- zu einem Studio, das mit dieser Website nichts mehr zu tun hat.
// Jetzt führt es nach innen: diese Seite hier ist gebaut, was sie anbietet,
// und das ist das ehrlichste Beispiel, das es gibt.
// ---------------------------------------------------------------------------

/** Was wir bauen. Vier Felder, weil vier zusammen einen Auftritt ergeben. */
const LEISTUNGEN = [
  {
    title: 'Webdesign & Entwicklung',
    text: 'Von der ersten Skizze bis zur fertigen Seite: Aufbau, Gestaltung, Text und Technik aus einer Hand. Kein Baukasten, kein gekauftes Template -- gebaut auf das, was dein Auftritt leisten soll.'
  },
  {
    title: 'Gamification-Tools',
    text: 'Gewinnspiele, Quiz, Tippspiele, Punktestände, Ranglisten. Mechaniken, die aus Besuchern Teilnehmer machen -- eingebaut in deine Seite oder als eigene Anwendung daneben.'
  },
  {
    title: 'Landingpages & Kampagnen',
    text: 'Eine Seite für ein Ziel: Anmeldung, Anfrage, Teilnahme. Schnell gebaut, sauber messbar, und wieder abgeschaltet, wenn die Kampagne vorbei ist.'
  },
  {
    title: 'Betreuung & Weiterbau',
    text: 'Eine Website ist mit dem Livegang nicht fertig. Wir pflegen Inhalte, bauen nach, was dazukommt, und halten Technik und Tempo in Ordnung.'
  }
];

/** Wie es abläuft. Drei Schritte, damit niemand raten muss, was ihn erwartet. */
const ABLAUF = [
  { step: 'Gespräch', text: 'Wir klären, was der Auftritt leisten soll, für wen er da ist und woran sich messen lässt, ob er es tut.' },
  { step: 'Entwurf', text: 'Struktur und Gestaltung am konkreten Inhalt, nicht an Platzhaltern. Du siehst früh, was du bekommst.' },
  { step: 'Umsetzung', text: 'Gebaut, getestet, live gestellt -- und danach weiterentwickelt, statt eingefroren.' }
];

export const WebdesignPage: React.FC<WebdesignPageProps> = ({ onNavigate, onOpenBooking, onOpenContact }) => {
  useDocumentHead({
    title: 'Website & Gamification | GG Manufaktur',
    description:
      'Du brauchst einen neuen Webauftritt? Wir bauen Websites, Landingpages und Gamification-Tools – von der ersten Idee bis zur Umsetzung.',
    canonicalPath: '/webdesign'
  });

  const requestProject = () => onOpenContact?.('Neuer Webauftritt');

  return (
    <div className="w-full bg-[#badeda]">
      <PageHero
        eyebrow="Website & Gamification"
        title="Du brauchst einen"
        accent="neuen Webauftritt?"
        subline="Diese Seite hier ist unsere Arbeit. Deine könnte die nächste sein."
      />

      <div className={`${CONTAINER} ${BLOCK_GAP}`}>
        <Reveal as="p" delay={0.1} className="text-slate-600 font-medium text-base md:text-lg max-w-3xl leading-relaxed tracking-tight">
          Diese Website ist bei uns entstanden – Aufbau, Gestaltung, Text und Technik. Wir bauen sie nicht nur für uns
          selbst: Wenn dein Auftritt in die Jahre gekommen ist, nie richtig fertig wurde oder schlicht nicht das tut,
          wofür er da ist, machen wir das für dich.
        </Reveal>
        <Reveal as="p" delay={0.18} className="text-[#0b0f2a] font-bold text-base md:text-lg mt-5 tracking-tight">
          Und weil Gaming und Gamification unsere Herkunft sind, bleibt es selten bei einer Seite, auf der man nur liest.
        </Reveal>
      </div>

      {/* ============ Was wir bauen ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="max-w-2xl mb-8 md:mb-10">
          <RevealText
            as="h2"
            by="word"
            text="Was wir bauen"
            className="text-[clamp(28px,3.8vw,48px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {LEISTUNGEN.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i, 4) * 0.05}>
              <div className={`h-full p-7 md:p-8 rounded-card ${TILE} border border-white/10 transition-transform duration-500 hover:scale-[1.02]`}>
                <div className="w-9 h-9 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center justify-center text-xs font-black mb-6">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base md:text-lg font-black tracking-tight mb-3 leading-snug">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed font-medium">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Wie es läuft ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="grid md:grid-cols-12 gap-6 md:gap-16">
          <div className="md:col-span-5">
            <RevealText
              as="h2"
              by="word"
              text="Wie es abläuft"
              className="text-[clamp(26px,3.2vw,40px)] font-black leading-[1.08] tracking-tighter text-[#0b0f2a]"
            />
          </div>
          <div className="md:col-span-7 space-y-8">
            {ABLAUF.map((item, i) => (
              <Reveal key={item.step} delay={0.08 + i * 0.06} className="flex gap-5">
                <span className="shrink-0 text-[#0a6f6a] font-black text-sm tabular-nums pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-[#0b0f2a] font-black text-lg tracking-tight mb-1.5">{item.step}</span>
                  <span className="block text-slate-600 text-base md:text-lg leading-relaxed font-medium">{item.text}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Abschluss ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP} pb-20 md:pb-28 text-center`}>
        <div className="max-w-2xl mx-auto">
          <RevealText
            as="h2"
            by="word"
            text="Erzähl uns von deinem Vorhaben."
            className="text-[clamp(28px,4vw,50px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]"
          />
          <Reveal as="p" delay={0.12} className="mt-5 md:mt-6 text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            Ein Gespräch reicht, um einzuschätzen, was dein Auftritt braucht – und was er nicht braucht.
          </Reveal>
        </div>
        <div className="h-9 md:h-11" />
        <Reveal delay={0.1} className="flex flex-col items-center gap-6">
          <ExpandingCTA label="Webauftritt anfragen" onBooking={() => onOpenBooking?.()} onContact={requestProject} />
          <button
            onClick={() => onNavigate('home')}
            className="text-[#0b0f2a]/60 hover:text-[#0b0f2a] font-bold text-sm tracking-tight transition-colors duration-500"
          >
            Zurück zur Startseite
          </button>
        </Reveal>
      </section>
    </div>
  );
};
