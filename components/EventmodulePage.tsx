import React from 'react';
import { ArrowRight, Camera, Car, Gamepad2, Glasses, Joystick, Lock, Mic2, Monitor, Box } from 'lucide-react';
import { Reveal } from './Reveal';
import { MoneyPage } from './money/AutoReveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { headFor } from './pageMeta';
import { ClosingCTA, MoneyHero, Section } from './money/ui';

// ---------------------------------------------------------------------------
// Money Page: Eventmodule
// ---------------------------------------------------------------------------
// Zu den Modulen gibt es (noch) keine eigenen Seiten; "Modul anfragen" oeffnet
// deshalb das Kontaktformular mit dem Modul als Betreff.
// ---------------------------------------------------------------------------

interface EventmodulePageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
  scrollToSection: (id: string) => void;
}

const PATH = '/eventmodule';

const MODULE = [
  {
    icon: Monitor,
    title: 'Gaming Modul',
    text: 'Eine kompakte Spielstation für bis zu 8 Spieler, die in nahezu jedes Eventsetup passt. Es eignet sich für Turniere, Free Gaming und einfache Challenges, bei denen viele Teilnehmende schnell ins Spiel kommen sollen. Bildschirme, Konsolen und Sitzplätze sind klar angeordnet, damit der Ablauf sauber bleibt und der Einstieg ohne Erklärung funktioniert. Ideal für Firmenevents, Recruiting-Aktionen, Shopping-Center-Promotions und Aktivierungen, die ein attraktives Gaming-Angebot brauchen.'
  },
  {
    icon: Box,
    title: 'Gaming Cube',
    text: 'Der Gaming Cube ist ein großes Eventmodul mit vier Spielflächen, an denen bis zu 8 Spieler gleichzeitig zocken können. Durch die hohe Bauweise ist er stark sichtbar und eignet sich besonders für Messeauftritte und große Gaming Areas. Natürlich kann der Cube auch für Turniere eingesetzt werden, da er viel Platz und klare Struktur bietet. Ein Eventmodul, das sofort Aufmerksamkeit zieht und jedes Event aufwertet.'
  },
  {
    icon: Mic2,
    title: 'Gaming Bühne',
    text: 'Die Gaming Bühne ist der Mittelpunkt unserer Turniere und gibt den Teilnehmenden ein besonderes Erlebnis. Sie bietet Moderatoren die ideale Fläche, um Matches sauber zu begleiten und das Publikum mitzunehmen. Die Bühne eignet sich auch perfekt für Aktivierungen wie Beat the Pro oder kurze Showmatches. Dank modularer Bauweise kann sie mit vorhandenen Elementen der Location kombiniert werden, etwa mit Beamer, Leinwand oder bestehenden Setups, und fügt sich so nahtlos ins Event ein.'
  },
  {
    icon: Camera,
    title: 'Interaktive Fotobox',
    text: 'Unser Eventupgrade Nummer eins, das bei jeder Art von Veranstaltung funktioniert. Dank eigener Software erstellen wir komplett individuelle Karten-Designs, passend zum Anlass. Ob personalisierte Ultimate-Team-Karten für ein EA-FC-Turnier, Weihnachtskarten für die Winterzeit oder Mission-Badge-Karten für einen Messestand: alles lässt sich genau nach euren Vorgaben gestalten. Die Gäste können ihre Karten sofort ausdrucken und nehmen ein persönliches Erinnerungsstück mit nach Hause. Ein Selbstläufer, der immer für Andrang sorgt.'
  },
  {
    icon: Joystick,
    title: 'Simulatoren',
    text: 'Echtes Fahr- oder Fluggefühl bei eurem Event und ein Erlebnis, das sofort für Aufmerksamkeit bei den Teilnehmenden und Besuchern sorgt. Mit Formaten wie der Fast-Lap-Challenge, der Strohballen-Challenge oder unserem neuen Flight-Simulator lassen sich Highscore-Wettbewerbe aufbauen oder einfach Free-Gaming-Stationen für Einkaufscenter, Side-Aktivierungen oder Produktlaunches einrichten. Vielseitig einsetzbar und sorgt immer für Aktivierung.'
  },
  {
    icon: Car,
    title: 'Mario Kart Live Circuit',
    text: 'Das bekannte Mario-Kart-Gefühl direkt in der realen Welt – besonders bei Kindern sorgt das für Begeisterung. Die Spieler fahren auf einer echten Strecke, während die digitale Erweiterung das typische Rennspiel-Erlebnis erzeugt. Ideal für Aktivierungen in Einkaufszentren oder überall dort, wo viele Familien und Kinder unterwegs sind. Das einzigartige Setup gibt es in dieser Form praktisch nur bei uns und sorgt zuverlässig für viel Andrang und Energie auf der Fläche.'
  },
  {
    icon: Gamepad2,
    title: 'Retro Gaming',
    text: 'Unsere Klassiker-Area, von Pacman und Tetris bis zu Street Fighter und Mortal Kombat. Dazu kommen kultige Konsolen wie die PlayStation 1 oder die legendäre NES mit einer großen Auswahl an Spielen. Die ältere Zielgruppe feiert die Nostalgie und Kinder lieben die Retro-Automaten genauso. Das Modul passt zu jedem Event und bringt eine entspannte Mischung aus Erinnerungen, Spaß und einfachem Einstieg.'
  },
  {
    icon: Lock,
    title: 'Tresor',
    text: 'Ideale Side-Aktivierung, um die Verweildauer der Besucher zu erhöhen. Die Gäste versuchen, den Code zu knacken, und können dabei an einem Gewinnspiel teilnehmen. Der Tresor sieht cool aus, fällt sofort auf und eignet sich perfekt für Promotions, Produktaktionen oder jedes Event, bei dem zusätzliche Interaktion gewünscht ist.'
  },
  {
    icon: Glasses,
    title: 'VR Experience',
    text: 'Virtual-Reality-Erlebnis mit einfachen Highscore-Challenges oder kurzen Spielszenen. Teilnehmende setzen die Brille auf und sind sofort mittendrin, ohne große Erklärzeit. Das Modul eignet sich für Messen, Promotions oder Gaming Areas und zieht zuverlässig Aufmerksamkeit. Eine Station, die schnell funktioniert und für Abwechslung sorgt.'
  }
];

export const EventmodulePage: React.FC<EventmodulePageProps> = ({ onOpenBooking, onOpenContact, scrollToSection }) => {
  useDocumentHead(headFor(PATH));
  useStructuredData(PATH);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('Eventmodule');
  const toModule = () => document.getElementById('module')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <MoneyPage>
      <MoneyHero
        eyebrow="Eventmodule · Maßanfertigung"
        title="Eventmodule für"
        accent="jedes Format."
        body={
          <>
            <p>
              Alle Eventmodule sind Maßanfertigungen aus unserer eigenen Entwicklung und lassen sich komplett individuell
              gestalten. Brandingflächen und optional integrierte LED-Beleuchtung machen jedes Modul passend für deinen
              Auftritt.
            </p>
            <p>
              Die Module können frei kombiniert werden, egal ob für ein Turnier, einen Messeauftritt, eine Gaming Area, eine
              Fan Zone oder eine Aktivierung vor Ort. Durch die modulare Bauweise und unseren eigenen Materialpark bleiben
              wir flexibel in Größe, Aufbau und Skalierung.
            </p>
          </>
        }
        image="/images/showcase/erazer-expert.jpg"
        imageAlt="Gebrandete Gaming-Eventmodule bei einer Aktivierung"
        label="Jetzt anfragen"
        onBooking={booking}
        onContact={contact}
        secondary={{ label: 'Module entdecken', href: '#module', onClick: toModule }}
      />

      {/* ============ Module ============ */}
      <Section
        id="module"
        title="Module, die sich deinem"
        accent="Event anpassen."
        intro={<p className="text-[#0e958e] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Unsere Module</p>}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULE.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={Math.min(i % 3, 2) * 0.06}>
              <article className="h-full flex flex-col tile-gradient text-white rounded-card border border-white/10 p-7">
                <div className="w-12 h-12 rounded-full bg-emerald-400/15 text-[#2dd4bf] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" strokeWidth={1.6} />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-3">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed font-medium flex-1">{text}</p>
                <button
                  onClick={() => onOpenContact?.(`Eventmodul: ${title}`)}
                  data-track="contact_click"
                  data-track-label={`eventmodul_${title}`}
                  className="mt-6 self-start inline-flex items-center gap-1.5 text-[#2dd4bf] font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                >
                  Modul anfragen <ArrowRight className="w-4 h-4" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Abschluss ============ */}
      <ClosingCTA
        title="Lass uns dein"
        accent="Event planen."
        label="Jetzt anfragen"
        onBooking={booking}
        onContact={contact}
        secondary={{ label: 'Referenzen ansehen', href: '/#best-cases', onClick: () => scrollToSection('best-cases') }}
      >
        <p className="text-[#2dd4bf] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Lust auf dein eigenes Setup?</p>
        <p>Wir beraten dich, welche Module zu deiner Fläche, deiner Zielgruppe und deinem Budget passen.</p>
      </ClosingCTA>
    </MoneyPage>
  );
};
