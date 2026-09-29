import React from 'react';
import {
  Boxes,
  Code2,
  Compass,
  Cpu,
  Gamepad2,
  Lightbulb,
  Puzzle,
  Rocket,
  Settings,
  Store,
  Trophy
} from 'lucide-react';
import { Reveal } from './Reveal';
import { MoneyPage } from './money/AutoReveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { PAGE_META, headFor } from './pageMeta';
import { Chips, ClosingCTA, CONTAINER, DarkPanel, InlineList, MoneyHero, Section, TealCard, Tile } from './money/ui';
import { BLOCK_GAP } from './spacing';

// ---------------------------------------------------------------------------
// Money Page: Gaming Dienstleister fuer Agenturen
// ---------------------------------------------------------------------------
// Aufbau wie "eSport Turnier organisieren": dunkler Kopf, Einleitung darunter,
// dann die Abschnitte der Vorlage und der Abschluss.
// ---------------------------------------------------------------------------

interface AgenturenPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

const PATH = '/gaming-dienstleister-fuer-agenturen';

const KNOW_HOW = [
  { icon: Compass, title: 'Strategie', text: 'Passt Gaming überhaupt zur Aufgabe und Zielgruppe?' },
  { icon: Lightbulb, title: 'Idee', text: 'Welche Mechanik oder welches Format zahlt auf die Kampagne ein?' },
  { icon: Settings, title: 'Machbarkeit', text: 'Was funktioniert technisch, organisatorisch und innerhalb des Budgets?' },
  { icon: Rocket, title: 'Umsetzung', text: 'Welche Spezialisten, Technik und Systeme werden benötigt?' }
];

const AGENTUREN = [
  'Creative Agenturen',
  'Eventagenturen',
  'Live-Communication-Agenturen',
  'Media-Agenturen',
  'PR-Agenturen',
  'Employer-Branding-Agenturen',
  'Sportmarketing-Agenturen',
  'Digitalagenturen',
  'Messeagenturen',
  'Social- & Creator-Agenturen'
];

const LEISTUNGEN = [
  { icon: Compass, title: 'Gaming Strategie & Konzeption', text: 'Zielgruppen, Games, Plattformen, Communities und geeignete Aktivierungsmechaniken.' },
  { icon: Gamepad2, title: 'Gaming & eSport Events', text: 'Turniere, Gaming Areas, Fanzonen, Pop-ups, Roadshows und Live-Aktivierungen.' },
  { icon: Puzzle, title: 'Gamification', text: 'Challenges, Quiz, Rankings, Rewards, Minigames und interaktive Mechaniken.' },
  { icon: Store, title: 'Messe & Brand Activation', text: 'Von der einzelnen Gaming Station bis zur kompletten Aktivierungsfläche.' },
  { icon: Trophy, title: 'Turnier & Competition', text: 'Online, offline oder hybrid inklusive Turniermanagement und technischer Plattform.' },
  { icon: Code2, title: 'Software & White-Label', text: 'Registrierung, Lead-Gen, Rankings, Gamification, Gewinnspiele und individuelle Plattformlösungen.' },
  { icon: Boxes, title: 'Branded Games', text: 'Minigames, Serious Games, Recruiting Games sowie Fortnite- und Roblox-Experiences.' },
  { icon: Cpu, title: 'Technology & Production', text: 'Gaming-Hardware, Eventtechnik, Streaming, digitale Systeme und technische Projektsteuerung.' }
];

const EINSTIEGE = [
  {
    title: 'Früh im Projekt',
    quote: '„Unser Kunde möchte etwas mit Gaming machen. Habt ihr Ideen?“',
    answer: 'Dann steigen wir bereits in Strategie und Konzeption ein.'
  },
  {
    title: 'Idee steht',
    quote: '„Das Konzept ist fertig. Wir brauchen jemanden, der uns sagt, wie wir es technisch umsetzen.“',
    answer: 'Dann übernehmen wir Machbarkeit und Realisierung.'
  },
  {
    title: 'Einzelnes Gewerk',
    quote: '„Wir benötigen vier Gaming Stations und jemanden für den Betrieb.“',
    answer: 'Auch das funktioniert.'
  }
];

const ROLLEN = [
  { title: 'White-Label', text: 'Wir arbeiten vollständig im Hintergrund.' },
  { title: 'Subdienstleister', text: 'Ihr führt das Kundenprojekt, wir verantworten unseren Gaming-Part.' },
  { title: 'Gemeinsames Projektteam', text: 'Wir treten gemeinsam gegenüber dem Kunden auf und ergänzen eure Kompetenz.' },
  { title: 'Fachlicher Sparringspartner', text: 'Wir unterstützen bereits bei Pitch, Strategie oder Konzeptentwicklung.' }
];

const PITCH = [
  'Gaming Insights',
  'Zielgruppenargumentation',
  'Ideation',
  'Konzeptmechaniken',
  'Game-Auswahl',
  'Machbarkeitsprüfung',
  'Budgetindikation',
  'Technisches Setup',
  'Plattformlogik',
  'Produktionsplanung',
  'Visualisierung von User Journeys'
];

const KRITERIEN = ['Marke', 'Zielgruppe', 'Kampagnenziel', 'Touchpoint', 'Budget', 'Zeitraum', 'Messbarkeit'];

const TECHNOLOGIE = [
  'White-Label Landingpages',
  'Teilnehmerregistrierung',
  'Turnierplattformen',
  'Lead-Generierung',
  'Gamification',
  'Rankings',
  'Gewinnspiele',
  'Quiz',
  'Challenges',
  'CRM-Übergaben',
  'Newsletter-Opt-ins',
  'Community-Plattformen'
];

const GEWERKE = [
  'Strategie',
  'Game Know-how',
  'Software',
  'Hardware',
  'Eventtechnik',
  'Turniermanagement',
  'Streaming',
  'Development',
  'Creator',
  'Messebau',
  'Produktion'
];

const IHR = ['Kundenverständnis', 'Markenstrategie', 'Kampagnenidee', 'Creative Direction', 'Kundenbeziehung'];
const WIR = ['Gaming Expertise', 'Community Know-how', 'Technologie', 'Event & Production', 'Competition', 'Gamification', 'Specialist Network'];

export const AgenturenPage: React.FC<AgenturenPageProps> = ({ onOpenBooking, onOpenContact }) => {
  useDocumentHead(headFor(PATH));
  useStructuredData(PATH);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('Agentur-Projekt');

  return (
    <MoneyPage>
      <MoneyHero
        eyebrow="Gaming Expertise for Agencies"
        title="Dein Gaming-Partner"
        accent="für Brand-Projekte."
        tagline="Sparringspartner · Spezialdienstleister · Umsetzungspartner"
        // Kopfbild = Vorschaubild beim Teilen; beides steht in pageMeta.json.
        image={PAGE_META[PATH].ogImage!}
        imageAlt="Gaming-Aktivierung für eine Marke auf einem Event"
        label="Projekt besprechen"
        onBooking={booking}
        onContact={contact}
      />

      {/* Einleitung unter dem Kopf, wie auf der Turnierseite. */}
      <div className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p>
            Dein Kunde möchte Gaming, eSport oder Gamification in seine Kampagne integrieren, aber euch fehlt intern das
            spezifische Know-how oder die passende Umsetzungsstruktur?
          </p>
          <p className="text-[#0b0f2a] font-black text-lg md:text-2xl tracking-tight leading-snug">
            Dann steigen wir genau dort ein, wo ihr uns braucht.
          </p>
          <p>
            Wir unterstützen Agenturen bei Strategie, Konzeption und Umsetzung von Gaming-Projekten für ihre Brand-Kunden
            und integrieren uns flexibel in bestehende Projektteams.
          </p>
          <p className="text-[#0b0f2a] font-bold">
            Als Sparringspartner. Spezialdienstleister. Umsetzungspartner. Oder komplett im Hintergrund.
          </p>
        </div>
      </div>

      <Section
        title="Ihr habt den Kunden."
        accent="Wir bringen Gaming-Know-how."
        accentBreak
        intro={
          <>
            <p>Ihr kennt die Marke, die Kampagne und den Kunden.</p>
            <p>
              Wir kennen Gaming, eSport, Gamification und die Besonderheiten der jeweiligen Communities, Technologien und
              Formate.
            </p>
            <p>
              Gemeinsam entsteht daraus eine Aktivierung, die nicht einfach Gaming „draufklebt“, sondern wirklich zur Marke
              und zum Kommunikationsziel passt.
            </p>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KNOW_HOW.map((k, i) => (
            <Reveal key={k.title} delay={i * 0.05}>
              <Tile {...k} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Gaming muss nicht eure"
        accent="Kernkompetenz sein."
        intro={
          <>
            <p>
              Ihr müsst kein eigenes Gaming-Team aufbauen, um euren Kunden professionelle Gaming-Lösungen anbieten zu
              können.
            </p>
            <p>Wir erweitern eure vorhandene Agenturkompetenz um unsere. Zum Beispiel für:</p>
          </>
        }
      >
        <InlineList items={AGENTUREN} />
      </Section>

      <Section title="Was wir für eure" accent="Brand-Kunden einbringen.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEISTUNGEN.map((l, i) => (
            <Reveal key={l.title} delay={Math.min(i, 4) * 0.05}>
              <Tile {...l} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Von „Können wir Gaming machen?“"
        accent="bis zur fertigen Aktivierung."
        accentBreak
      >
        <div className="grid md:grid-cols-3 gap-4">
          {EINSTIEGE.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.06}>
              <TealCard title={e.title}>
                <p className="italic">{e.quote}</p>
                <p className="font-black">{e.answer}</p>
              </TealCard>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold">
          Wir passen unseren Scope an euer Projekt an und nicht euer Projekt an unseren Scope.
        </Reveal>
      </Section>

      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <DarkPanel>
          <h2 className="text-[clamp(26px,3.4vw,46px)] font-black uppercase tracking-tighter leading-[1.02]">
            Wir können sichtbar sein. <span className="text-[#2dd4bf] italic">Müssen es aber nicht.</span>
          </h2>
          <p className="mt-4 text-white/65 text-base md:text-lg font-medium max-w-2xl">
            Wir verstehen bestehende Kundenbeziehungen. Deshalb können wir je nach Projekt unterschiedlich auftreten:
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLLEN.map((r) => (
              <div key={r.title}>
                <h3 className="text-[#2dd4bf] font-black text-sm uppercase tracking-tight mb-2">{r.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-medium">{r.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-white font-black text-lg md:text-xl tracking-tight">
            Eure Kundenbeziehung bleibt eure Kundenbeziehung.
          </p>
        </DarkPanel>
      </section>

      <Section
        title="Pitch-Support,"
        accent="wenn es schnell gehen muss."
        intro={
          <p>Gerade in Pitches entstehen Gaming-Ideen oft unter Zeitdruck. Wir können kurzfristig unterstützen bei:</p>
        }
      >
        <Chips items={PITCH} />
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl">
          So bekommt ihr Gaming-Kompetenz in den Pitch, ohne sie intern erst aufbauen zu müssen.
        </Reveal>
      </Section>

      <Section
        title="Kein Gaming um des"
        accent="Gamings willen."
        intro={
          <>
            <p>
              Nicht jede Marke braucht eSport. Nicht jede Kampagne braucht Fortnite. Und nicht jede junge Zielgruppe
              braucht einen Gaming-PC auf dem Messestand.
            </p>
            <p>Wir betrachten deshalb zuerst:</p>
          </>
        }
      >
        <InlineList items={KRITERIEN} />
        <Reveal as="div" delay={0.1} className="mt-8 max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p className="text-[#0b0f2a] font-bold">Erst dann entwickeln wir die passende Gaming-Mechanik.</p>
          <p>
            Das schützt sowohl euch als Agentur als auch euren Kunden vor Konzepten, die zwar trendy klingen, aber keinen
            strategischen Mehrwert liefern.
          </p>
        </Reveal>
      </Section>

      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <DarkPanel>
          <h2 className="text-[clamp(26px,3.4vw,46px)] font-black uppercase tracking-tighter leading-[1.02]">
            Unsere Technologie kann direkt <span className="text-[#2dd4bf] italic">Teil eurer Idee werden.</span>
          </h2>
          <p className="mt-4 mb-8 text-white/65 text-base md:text-lg font-medium max-w-2xl">
            Neben Beratung und Produktion bringen wir eine eigene technologische Basis mit. Damit können wir
            beispielsweise realisieren:
          </p>
          <Chips items={TECHNOLOGIE} dark />
          <p className="mt-10 text-white font-black text-lg md:text-xl tracking-tight">
            So muss nicht für jedes Projekt bei null entwickelt werden.
          </p>
        </DarkPanel>
      </section>

      <Section
        title="Ein Spezialist statt"
        accent="viele Einzeldienstleister."
        intro={<p>Gaming-Projekte können schnell viele Gewerke benötigen:</p>}
      >
        <InlineList items={GEWERKE} />
        <Reveal as="div" delay={0.1} className="mt-8 max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p>
            Wir bündeln die für das Projekt relevanten Bereiche und steuern bei Bedarf weitere spezialisierte Partner.
          </p>
          <p className="text-[#0b0f2a] font-bold">Für euch bleibt ein zentraler Ansprechpartner für den Gaming-Part.</p>
        </Reveal>
      </Section>

      <Section title="Gemeinsam stärker" accent="im Pitch.">
        <div className="grid md:grid-cols-2 gap-4">
          <Reveal>
            <div className="h-full p-6 md:p-8 rounded-card bg-white/50 border border-white/70">
              <h3 className="text-[#0b0f2a] font-black text-base md:text-lg uppercase tracking-tight mb-4">Ihr bringt</h3>
              <Chips items={IHR} />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <TealCard title="Wir ergänzen">
              <ul className="flex flex-wrap gap-2 pt-2">
                {WIR.map((w) => (
                  <li key={w} className="rounded-full px-4 py-2 text-[11px] md:text-xs font-black uppercase tracking-wider bg-white/15 border border-white/20">
                    {w}
                  </li>
                ))}
              </ul>
            </TealCard>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl">
          So könnt ihr euren Kunden Gaming anbieten, ohne daraus intern erst eine neue Unit machen zu müssen.
        </Reveal>
      </Section>

      <ClosingCTA
        title="Ihr habt die Idee."
        accent="Wir machen den Gaming-Part möglich."
        label="Gemeinsames Projekt besprechen"
        onBooking={booking}
        onContact={contact}
      >
        <p>
          Ob Pitch-Support, einzelne Gaming-Aktivierung oder komplette technische Umsetzung: Wir integrieren uns so in
          euer Projekt, wie es für euch und euren Kunden am besten funktioniert.
        </p>
        <p className="text-white font-bold">
          Partnerschaftlich. White-Label-fähig. Ohne eure Kundenbeziehung infrage zu stellen.
        </p>
      </ClosingCTA>
    </MoneyPage>
  );
};
