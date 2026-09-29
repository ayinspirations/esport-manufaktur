import React from 'react';
import { Cpu, Gamepad2, LayoutGrid, MonitorSpeaker, Puzzle, Code2, Trophy, Truck, Users, Workflow } from 'lucide-react';
import { Reveal } from './Reveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { PAGE_META, headFor } from './pageMeta';
import { Chips, ClosingCTA, CONTAINER, DarkPanel, InlineList, MoneyHero, Section, TealCard, Tile } from './money/ui';
import { BLOCK_GAP } from './spacing';

// ---------------------------------------------------------------------------
// Money Page: Gaming & eSport Dienstleister
// ---------------------------------------------------------------------------
// Aufbau wie "eSport Turnier organisieren": dunkler Kopf, Einleitung darunter,
// dann die Abschnitte der Vorlage und der Abschluss.
// ---------------------------------------------------------------------------

interface DienstleisterPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

const PATH = '/gaming-esport-dienstleister';

const LIEFERN = [
  { icon: Gamepad2, title: 'Gaming-Hardware liefert', text: 'Konsolen, Gaming-PCs, Screens, Controller, Racing-Setups, VR und Peripherie.' },
  { icon: LayoutGrid, title: 'Die Fläche betreibt', text: 'Aufbau, Einrichtung, technische Betreuung und laufender Eventbetrieb.' },
  { icon: Users, title: 'Personal stellt', text: 'Promoter, Gaming-Betreuer, Hosts, Turnieradmins, Moderation oder Caster.' },
  { icon: Trophy, title: 'Das Turnier durchführt', text: 'Check-in, Brackets, Spielplan, Ergebnisse und Turnierleitung.' },
  { icon: Code2, title: 'Die digitale Lösung baut', text: 'Landingpage, Registrierung, Turnierplattform, Ranking oder Lead-Flow.' },
  { icon: Workflow, title: 'Die Umsetzung koordiniert', text: 'Logistik, Branding, Technik und die benötigten Gewerke.' }
];

const UMFANG = [
  { title: 'Einzelnes Gaming-Setup', q: 'Eine Konsole, ein Screen, zwei Controller?', a: 'Kein Problem.' },
  { title: 'Gaming-Fläche', q: 'Mehrere Setups, Branding, Mobiliar und Betreuung?', a: 'Übernehmen wir.' },
  { title: 'Eventmodul', q: 'Turnier, Racing Challenge, Retro Area, VR oder Gaming-Aktivierung innerhalb eines bestehenden Events?', a: 'Setzen wir um.' },
  { title: 'Komplettes Gaming-Event', q: 'Technik, Personal, Software, Produktion und Durchführung aus einer Hand?', a: 'Können wir ebenfalls abbilden.' }
];

const LEISTUNGEN = [
  { icon: Gamepad2, title: 'Gaming Hardware', text: 'Konsolen, PCs, Screens, Controller und Peripherie.' },
  { icon: LayoutGrid, title: 'Gaming Areas', text: 'Komplette Gaming-Flächen für Events, Messen und Veranstaltungen.' },
  { icon: Trophy, title: 'Turniere', text: 'Online, offline oder hybrid inklusive operativer Durchführung.' },
  { icon: MonitorSpeaker, title: 'Eventtechnik', text: 'Netzwerk, Screens, Ton, Licht und technische Infrastruktur.' },
  { icon: Users, title: 'Personal', text: 'Promoter, Hosts, Turnierleitung, Techniker und Moderation.' },
  { icon: Code2, title: 'Software', text: 'White-Label-Plattformen, Landingpages, Registrierung und Rankings.' },
  { icon: Puzzle, title: 'Gamification', text: 'Quiz, Challenges, Leaderboards, Gewinnspiele und Minigames.' },
  { icon: Truck, title: 'Produktion', text: 'Logistik, Aufbau, Abbau, Branding und Projektkoordination.' }
];

const UMFELDER = [
  'Messen',
  'Sportveranstaltungen',
  'Fanzonen',
  'Recruiting-Events',
  'Firmenveranstaltungen',
  'Roadshows',
  'Shopping Center',
  'Retail-Aktivierungen',
  'Festivals',
  'Sponsoring-Aktivierungen',
  'Community Events',
  'eSport Turniere'
];

const FRAGEN = [
  'Welches Game eignet sich?',
  'Wie viele Setups brauchen wir?',
  'Wie viel Fläche benötigen wir?',
  'Welche Internetleitung ist notwendig?',
  'Wie viele Betreuer brauchen wir?',
  'Wie kann ein Turnier organisiert werden?',
  'Wie lässt sich die Aktivierung branden?',
  'Wie können Teilnehmer registriert werden?',
  'Wie integrieren wir Leads oder ein Gewinnspiel?'
];

const DIGITAL = [
  'Landingpages',
  'Teilnehmerregistrierung',
  'White-Label Turnierplattformen',
  'Brackets & Rankings',
  'Lead-Generierung',
  'Newsletter-Opt-ins',
  'Gewinnspiele',
  'Gamification',
  'Quiz & Challenges',
  'CRM-Übergaben'
];

const GEWERKE = ['Hardware', 'Software', 'Personal', 'Eventtechnik', 'Logistik', 'Messebau', 'Streaming', 'Branding', 'Development'];

const MACHEN_WIR = [
  ['Du brauchst zwei Konsolen für einen Messestand?', 'Machen wir.'],
  ['Du brauchst zehn Gaming-Setups inklusive Personal?', 'Machen wir.'],
  ['Du brauchst jemanden, der dein Turnier durchführt?', 'Machen wir.'],
  ['Du brauchst eine Landingpage für ein bereits geplantes Turnier?', 'Machen wir.'],
  ['Du brauchst Hardware, Plattform, Personal und komplette Durchführung?', 'Machen wir auch.']
];

export const DienstleisterPage: React.FC<DienstleisterPageProps> = ({ onOpenBooking, onOpenContact }) => {
  useDocumentHead(headFor(PATH));
  useStructuredData(PATH);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('Gaming-Dienstleistung');

  return (
    <div className="w-full bg-[#badeda]">
      <MoneyHero
        eyebrow="Gaming & eSport Dienstleistung"
        title="Dein Dienstleister für"
        accent="Gaming & eSport."
        tagline="Vom einzelnen Modul bis zur kompletten Umsetzung."
        // Kopfbild = Vorschaubild beim Teilen; beides steht in pageMeta.json.
        image={PAGE_META[PATH].ogImage!}
        imageAlt="Gaming-Setups mit Betreuung auf einem Event"
        label="Projekt besprechen"
        onBooking={booking}
        onContact={contact}
      />

      {/* Einleitung unter dem Kopf, wie auf der Turnierseite. */}
      <div className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p className="text-[#0b0f2a] font-black text-lg md:text-2xl tracking-tight leading-snug">
            Du hast dein Projekt bereits geplant und brauchst jetzt jemanden, der es umsetzt?
          </p>
          <p>
            Ob einzelne Konsole, komplette Gaming-Fläche, Turnierdurchführung, Personal, Technik oder digitale Plattform:
            Wir liefern genau die Gaming- und eSport-Dienstleistung, die dein Projekt braucht.
          </p>
        </div>
      </div>

      <Section
        title="Du weißt, was du brauchst?"
        accent="Wir liefern."
        intro={
          <>
            <p>Nicht jedes Projekt braucht zuerst einen Strategieprozess. Vielleicht steht dein Konzept längst.</p>
            <p>Du brauchst einfach jemanden, der:</p>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LIEFERN.map((l, i) => (
            <Reveal key={l.title} delay={Math.min(i, 4) * 0.05}>
              <Tile {...l} />
            </Reveal>
          ))}
        </div>
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold">
          Genau dafür sind wir da.
        </Reveal>
      </Section>

      <Section title="Vom einzelnen Setup bis zum" accent="kompletten Event.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {UMFANG.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.06}>
              <TealCard title={u.title}>
                <p>{u.q}</p>
                <p className="font-black">{u.a}</p>
              </TealCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Unsere" accent="Dienstleistungen.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEISTUNGEN.map((l, i) => (
            <Reveal key={l.title} delay={Math.min(i, 4) * 0.05}>
              <Tile {...l} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Für fast jedes"
        accent="Umfeld."
        intro={<p>Wir unterstützen Projekte beispielsweise bei:</p>}
      >
        <InlineList items={UMFELDER} />
        <Reveal as="p" delay={0.1} className="mt-8 text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
          Dabei kann Gaming der Mittelpunkt des Events sein oder einfach ein einzelnes Modul innerhalb eines größeren
          Projekts.
        </Reveal>
      </Section>

      <Section
        title="Technik allein reicht"
        accent="manchmal nicht."
        intro={
          <>
            <p>
              Du weißt, dass du „etwas mit Gaming“ machen möchtest, aber einzelne Details sind noch offen? Auch dann
              unterstützen wir. Zum Beispiel bei Fragen wie:
            </p>
          </>
        }
      >
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FRAGEN.map((f) => (
            <li key={f} className="p-5 rounded-card bg-white/50 border border-white/70 text-[#0b0f2a] font-bold text-sm md:text-base tracking-tight">
              {f}
            </li>
          ))}
        </ul>
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl">
          Wir lösen die operativen Fragen so, dass dein Konzept am Ende funktioniert.
        </Reveal>
      </Section>

      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <DarkPanel>
          <h2 className="text-[clamp(26px,3.4vw,46px)] font-black uppercase tracking-tighter leading-[1.02]">
            Auch <span className="text-[#2dd4bf] italic">digital.</span>
          </h2>
          <p className="mt-4 mb-8 text-white/65 text-base md:text-lg font-medium max-w-2xl">
            Nicht jede Gaming-Dienstleistung endet bei Hardware. Mit unserer eigenen technologischen Basis können wir
            zusätzlich umsetzen:
          </p>
          <Chips items={DIGITAL} dark />
          <p className="mt-10 text-white font-black text-lg md:text-xl tracking-tight">
            Damit können physische und digitale Aktivierung direkt miteinander verbunden werden.
          </p>
        </DarkPanel>
      </section>

      <Section
        title="Ein Projekt."
        accent="Ein Ansprechpartner."
        intro={<p>Ein Gaming-Projekt kann schnell mehrere Gewerke benötigen:</p>}
      >
        <InlineList items={GEWERKE} />
        <Reveal as="div" delay={0.1} className="mt-8 max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p>
            Wir übernehmen die Leistungen selbst oder koordinieren die passenden spezialisierten Partner aus unserem
            Netzwerk.
          </p>
          <p className="text-[#0b0f2a] font-bold">
            Für dich entsteht daraus eine koordinierte Umsetzung statt vieler einzelner Dienstleister.
          </p>
        </Reveal>
      </Section>

      <ClosingCTA
        title="Du hast das Projekt."
        accent="Wir liefern den Gaming-Part."
        label="Projekt besprechen"
        onBooking={booking}
        onContact={contact}
      >
        <ul className="space-y-2">
          {MACHEN_WIR.map(([q, a]) => (
            <li key={q}>
              {q} <span className="text-[#2dd4bf] font-black">{a}</span>
            </li>
          ))}
        </ul>
        <p className="pt-3 text-white font-black uppercase tracking-tight">
          Genau so viel Dienstleistung, wie dein Projekt braucht.
        </p>
      </ClosingCTA>
    </div>
  );
};
