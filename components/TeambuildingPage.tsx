import React from 'react';
import {
  Brush,
  ClipboardList,
  Cpu,
  Flame,
  Handshake,
  MapPin,
  MessageCircle,
  Mic,
  PartyPopper,
  Target,
  Trophy,
  Users,
  UtensilsCrossed
} from 'lucide-react';
import { Reveal } from './Reveal';
import { MoneyPage } from './money/AutoReveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { PAGE_META, headFor } from './pageMeta';
import { ClosingCTA, CONTAINER, DarkPanel, InlineList, MoneyHero, Section, TealCard, Tile } from './money/ui';
import { BLOCK_GAP } from './spacing';

// ---------------------------------------------------------------------------
// Money Page: Teambuilding mit Gaming & eSport
// ---------------------------------------------------------------------------
// Aufbau wie die uebrigen Money Pages: dunkler Kopf, Einleitung darunter,
// dann die Abschnitte der Vorlage und der Abschluss.
// ---------------------------------------------------------------------------

interface TeambuildingPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

const PATH = '/teambuilding-gaming-esport';

const WERTE = [
  { icon: MessageCircle, title: 'Kommunikation', text: 'Informationen schnell und verständlich weitergeben.' },
  { icon: Users, title: 'Teamspirit', text: 'Gemeinsam auf ein Ziel hinarbeiten.' },
  { icon: Target, title: 'Strategie', text: 'Aufgaben verteilen und Entscheidungen treffen.' },
  { icon: Handshake, title: 'Vertrauen', text: 'Sich auf die eigenen Teammitglieder verlassen.' },
  { icon: Flame, title: 'Ehrgeiz', text: 'Gemeinsam besser werden wollen.' },
  { icon: PartyPopper, title: 'Spaß', text: 'Denn nicht jedes Teambuilding braucht anschließend ein Flipchart.' }
];

const SCHRITTE = [
  { title: 'Verstehen', text: 'Wir erklären Spiel, Steuerung und Aufgabe.' },
  { title: 'Ausprobieren', text: 'Das Team lernt das Game gemeinsam kennen.' },
  { title: 'Taktik entwickeln', text: 'Wer übernimmt welche Rolle? Wie wollen wir spielen?' },
  { title: 'Antreten', text: 'Das Team stellt sich gemeinsam der Challenge.' },
  { title: 'Reflektieren', text: 'Was hat funktioniert? Wo musste kommuniziert werden? Wer hat welche Rolle übernommen?' }
];

const GAMES = [
  {
    title: 'League of Legends',
    lead: '5 Personen. Unterschiedliche Rollen. Ein gemeinsames Ziel.',
    text: 'Strategie, Abstimmung und klare Aufgabenverteilung stehen im Mittelpunkt.'
  },
  {
    title: 'Rocket League',
    lead: '3 Personen. Schnelle Entscheidungen. Permanente Kommunikation.',
    text: 'Niedrige Einstiegshürde und trotzdem viel Raum für Zusammenarbeit und Wettbewerb.'
  },
  {
    title: 'EA SPORTS FC',
    lead: 'Vom kleinen Team bis zur kompletten Mannschaft.',
    text: 'Gerade im Clubs-Modus lassen sich Rollen, Positionen, Taktik und Teamplay sehr direkt mit klassischem Mannschaftssport verbinden.'
  },
  {
    title: 'Racing',
    lead: 'Team-Challenges, Fahrerwechsel, Qualifying oder gemeinsame Punktewertung.',
    text: ''
  },
  {
    title: 'Party & Casual Games',
    lead: 'Nicht jedes Team möchte direkt in den eSport einsteigen.',
    text: 'Auch niedrigschwellige Multiplayer- und Party-Games können hervorragend funktionieren.'
  }
];

const KOMBI = [
  { title: 'Gaming Night', text: 'Gaming Stations, kleine Turniere, Snacks, Drinks und ein entspannter gemeinsamer Abend.' },
  { title: 'Gaming meets Cooking', text: 'Gemeinsam kochen, Aufgaben verteilen, Challenges lösen und anschließend in einen Gaming-Abend übergehen.' },
  { title: 'Digital meets Analog', text: 'Gaming-Challenges werden mit physischen Aufgaben, Quiz, Geschicklichkeit oder Teamspielen kombiniert.' },
  { title: 'Team Olympiade', text: 'Mehrere Stationen sammeln Punkte für ein gemeinsames Ranking.' },
  { title: 'Hybrid Challenge', text: 'Digitale und reale Aufgaben greifen ineinander und führen zu einem gemeinsamen Finale.' }
];

const FORMATE = [
  { title: 'Casual Gaming Night', text: 'Einfach gemeinsam spielen, essen und eine gute Zeit haben.' },
  { title: 'Moderiertes Gaming-Teambuilding', text: 'Einführung, Coaching, Rollenverteilung, Training und Wettbewerb.' },
  { title: 'eSport Team Challenge', text: 'Teams treten in einem strukturierten Wettbewerb gegeneinander an.' },
  { title: 'Hybrid Team Experience', text: 'Gaming, analoge Challenges und weitere Aktivitäten werden miteinander verbunden.' },
  { title: 'Individuelles Team-Event', text: 'Ein komplett auf Unternehmen, Team und Ziel zugeschnittenes Format.' }
];

const ABLAUF = [
  'Welcome & Briefing',
  'Game- & Steuerungserklärung',
  'Teamaufteilung',
  'Rollenverteilung',
  'Taktikphase',
  'Training',
  'Challenge / Turnier',
  'Moderation',
  'Finale',
  'Siegerehrung'
];

const FRAGEN = [
  'Wie groß ist das Team?',
  'Wie Gaming-affin sind die Teilnehmer?',
  'Soll der Fokus stärker auf Spaß oder Zusammenarbeit liegen?',
  'Wie viel Wettbewerb passt zur Gruppe?',
  'Soll das Event einen fachlichen Teambuilding-Charakter haben oder einfach ein außergewöhnlicher gemeinsamer Abend werden?',
  'Welche Location und welcher Zeitrahmen stehen zur Verfügung?'
];

const LEISTUNGEN = [
  { icon: ClipboardList, title: 'Konzept', text: 'Format, Games, Challenges und Ablauf.' },
  { icon: Cpu, title: 'Gaming-Technik', text: 'Konsolen, PCs, Displays, Racing und benötigte Peripherie.' },
  { icon: MapPin, title: 'Location & Setup', text: 'Auf Wunsch unterstützen wir bei Location, Aufbau und Eventgestaltung.' },
  { icon: Mic, title: 'Moderation & Coaching', text: 'Von der Einführung bis zum Finale.' },
  { icon: Trophy, title: 'Turniermanagement', text: 'Teams, Spielplan, Ranking und Ergebnisse.' },
  { icon: UtensilsCrossed, title: 'Food & Experience', text: 'Auf Wunsch mit Catering, Cooking oder weiteren Eventbausteinen kombiniert.' },
  { icon: Brush, title: 'Branding', text: 'Auch interne Events können vollständig im Unternehmensdesign inszeniert werden.' }
];

const BOLD = 'text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl';

export const TeambuildingPage: React.FC<TeambuildingPageProps> = ({ onOpenBooking, onOpenContact }) => {
  useDocumentHead(headFor(PATH));
  useStructuredData(PATH);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('Teambuilding');

  return (
    <MoneyPage>
      <MoneyHero
        eyebrow="Teambuilding & Gaming"
        title="Teambuilding durch"
        accent="Gaming & eSport."
        tagline="Gemeinsam spielen. Kommunizieren. Taktik entwickeln. Als Team gewinnen."
        // Kopfbild = Vorschaubild beim Teilen; beides steht in pageMeta.json.
        image={PAGE_META[PATH].ogImage!}
        imageAlt="Team beim gemeinsamen Gaming-Teambuilding"
        label="Teambuilding besprechen"
        onBooking={booking}
        onContact={contact}
      />

      {/* Einleitung unter dem Kopf, wie auf der Turnierseite. */}
      <div className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p>
            Ob League of Legends im 5er-Team, Rocket League in der 3er-Crew oder EA SPORTS FC mit einer kompletten
            Mannschaft: Wir entwickeln Gaming- und eSport-Teambuildings, die Menschen gemeinsam vor eine Aufgabe stellen.
          </p>
          <p className="text-[#0b0f2a] font-black text-lg md:text-2xl tracking-tight leading-snug">
            Dabei geht es nicht darum, wer schon zocken kann.
          </p>
          <p>
            Wir erklären Steuerung und Spielprinzip, entwickeln gemeinsam Taktiken und schaffen ein Umfeld, in dem
            Kommunikation, Ehrgeiz, Teamspirit und vor allem der gemeinsame Spaß im Mittelpunkt stehen.
          </p>
          <p className="text-[#0b0f2a] font-bold">Für Gamer. Für Nicht-Gamer. Für Teams.</p>
        </div>
      </div>

      <Section
        title="Gaming ist"
        accent="Teamarbeit."
        intro={
          <>
            <p>
              Wer gemeinsam spielt, muss miteinander sprechen. Entscheidungen treffen. Rollen verteilen. Strategien
              entwickeln. Auf Veränderungen reagieren. Mit Erfolgen und Niederlagen umgehen.
            </p>
            <p>
              Genau daraus entsteht ein Teambuilding, bei dem Fähigkeiten sichtbar werden, die im normalen Arbeitsalltag
              vielleicht gar nicht auffallen.
            </p>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WERTE.map((w) => (
            <Tile key={w.title} {...w} />
          ))}
        </div>
      </Section>

      <Section
        title="Keine Gaming-Erfahrung"
        accent="nötig."
        intro={
          <>
            <p className="text-[#0b0f2a] font-bold">Das ist uns besonders wichtig.</p>
            <p>
              Unsere Teambuildings richten sich nicht nur an erfahrene Gamer. Wir holen alle Teilnehmer dort ab, wo sie
              stehen.
            </p>
          </>
        }
      >
        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SCHRITTE.map((s, i) => (
            <li key={s.title} className="h-full p-6 rounded-card bg-white/50 border border-white/70">
              <span className="block text-[#0e958e] font-black text-3xl tracking-tighter mb-3">0{i + 1}</span>
              <h3 className="text-[#0b0f2a] font-black text-sm md:text-base uppercase tracking-tight mb-1.5">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className={`mt-8 ${BOLD}`}>So wird aus „Wir spielen eine Runde“ eine echte gemeinsame Experience.</p>
      </Section>

      <Section title="Das passende Game" accent="für dein Team.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMES.map((g) => (
            <TealCard key={g.title} title={g.title}>
              <p className="font-bold">{g.lead}</p>
              {g.text && <p>{g.text}</p>}
            </TealCard>
          ))}
          <div className="h-full p-6 md:p-8 rounded-card border-2 border-dashed border-[#0e958e]/40 flex items-center">
            <p className="text-[#0b0f2a] font-black text-base md:text-lg tracking-tight">
              Und wenn ihr schon ein Lieblingsspiel habt, bauen wir das Format darum.
            </p>
          </div>
        </div>
      </Section>

      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <DarkPanel>
          <h2 className="text-[clamp(26px,3.4vw,46px)] font-black uppercase tracking-tighter leading-[1.02]">
            Aber Teambuilding muss <span className="text-[#2dd4bf] italic">nicht nur eSport sein.</span>
          </h2>
          <p className="mt-4 text-white/65 text-base md:text-lg font-medium max-w-2xl">
            Gaming ist für uns größer als Konsole und PC. Deshalb können wir digitale, physische und klassische
            Teambuilding-Elemente miteinander kombinieren.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KOMBI.map((k) => (
              <div key={k.title}>
                <h3 className="text-[#2dd4bf] font-black text-sm uppercase tracking-tight mb-2">{k.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-medium">{k.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-white/60 text-sm font-black uppercase tracking-[0.2em]">Der gemeinsame Nenner:</p>
          <p className="mt-2 text-white font-black text-lg md:text-xl tracking-tight">
            Das Format passt sich dem Team an und nicht das Team dem Format.
          </p>
        </DarkPanel>
      </section>

      <Section
        title="Vom Gaming-Abend bis zum"
        accent="kompletten Team-Event."
        intro={<p>Nicht jedes Unternehmen braucht dasselbe Teambuilding.</p>}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FORMATE.map((f) => (
            <TealCard key={f.title} title={f.title}>
              <p>{f.text}</p>
            </TealCard>
          ))}
        </div>
      </Section>

      <Section
        title="Wir moderieren."
        accent="Nicht nur die Technik."
        intro={
          <p>
            Das unterscheidet das Format von einem Raum mit ein paar Konsolen. Wir begleiten die Teilnehmer aktiv durch
            die Experience.
          </p>
        }
      >
        <InlineList items={ABLAUF} />
        <p className="mt-8 text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
          Optional können anschließend einzelne Learnings oder Teambeobachtungen gemeinsam reflektiert werden.
        </p>
      </Section>

      <Section
        title="Individuell auf"
        accent="euer Team abgestimmt."
        intro={<p>Bevor wir ein Format vorschlagen, wollen wir wissen:</p>}
      >
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FRAGEN.map((f) => (
            <li key={f} className="p-5 rounded-card bg-white/50 border border-white/70 text-[#0b0f2a] font-bold text-sm md:text-base tracking-tight">
              {f}
            </li>
          ))}
        </ul>
        <p className={`mt-8 ${BOLD}`}>Auf dieser Basis stellen wir Games, Challenges, Moderation und Ablauf zusammen.</p>
      </Section>

      <Section title="Alles aus" accent="einer Hand.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEISTUNGEN.map((l) => (
            <Tile key={l.title} {...l} />
          ))}
        </div>
      </Section>

      <Section
        title="Der wichtigste KPI:"
        accent="Gemeinsame Erinnerung."
        accentBreak
        intro={
          <>
            <p>Natürlich können wir Gewinner küren, Punkte zählen und Rankings erstellen.</p>
            <p>Das eigentliche Ziel ist aber ein anderes:</p>
            <p className="text-[#0b0f2a] font-bold">
              Dass Kollegen miteinander sprechen, lachen, sich gegenseitig helfen, plötzlich Ehrgeiz entwickeln und
              gemeinsam etwas erleben, über das am Montag noch gesprochen wird.
            </p>
          </>
        }
      />

      <ClosingCTA
        title="Manchmal braucht Teambuilding kein Seminar."
        accent="Sondern ein gutes Game und die richtigen Mitmenschen."
        label="Teambuilding besprechen"
        onBooking={booking}
        onContact={contact}
      >
        <p>Gemeinsam entwickeln wir das Format, das zu eurem Team passt.</p>
      </ClosingCTA>
    </MoneyPage>
  );
};
