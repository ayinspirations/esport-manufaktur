import React from 'react';
import {
  CalendarDays,
  Gift,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  MonitorSmartphone,
  Network,
  Sparkles,
  Trophy,
  UserPlus,
  Users
} from 'lucide-react';
import { MoneyPage } from './money/AutoReveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { PAGE_META, headFor } from './pageMeta';
import { Chips, ClosingCTA, CONTAINER, DarkPanel, InlineList, MoneyHero, Section, TealCard, Tile } from './money/ui';
import { BLOCK_GAP } from './spacing';

// ---------------------------------------------------------------------------
// Money Page: Gaming & eSport als Betriebssport
// ---------------------------------------------------------------------------
// Aufbau wie die uebrigen Money Pages: dunkler Kopf, Einleitung darunter,
// dann die Abschnitte der Vorlage und der Abschluss.
// ---------------------------------------------------------------------------

interface BetriebssportPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

const PATH = '/gaming-esport-betriebssport';

const BETRIEBSSPORT = ['Lauftreff', 'Fußballgruppe', 'After-Work-Sport', 'Minigolf', 'Gemeinsames Training'];

const ZIELE = [
  { icon: Sparkles, title: 'Employer Branding', text: 'Ein modernes internes Angebot schaffen, das zu den Interessen der Mitarbeitenden passt.' },
  { icon: UserPlus, title: 'Recruiting', text: 'Gaming als authentischen Kontaktpunkt zu jungen und gaming-affinen Talenten nutzen.' },
  { icon: Users, title: 'Teambuilding', text: 'Kommunikation, Wettbewerb und gemeinsames Erleben fördern.' },
  { icon: HeartHandshake, title: 'Mitarbeiterbindung', text: 'Menschen mit gemeinsamen Interessen zusammenbringen.' },
  { icon: Network, title: 'Community Building', text: 'Standorte, Abteilungen und Hierarchieebenen miteinander vernetzen.' },
  { icon: Gift, title: 'Incentivierung', text: 'Turniere, Ligen und Challenges als zusätzlichen Benefit etablieren.' }
];

const FRAGEN = [
  'Was möchtest du erreichen?',
  'Wer soll teilnehmen?',
  'Welche Gaming-Interessen gibt es bereits im Unternehmen?',
  'Passt Competition zur Unternehmenskultur?',
  'Welche Spiele passen zu Marke und Werten?',
  'Soll das Format intern oder auch extern sichtbar sein?',
  'Wie viel Zeit und Ressourcen stehen zur Verfügung?',
  'Welche Chancen entstehen?',
  'Welche Risiken und organisatorischen Herausforderungen müssen berücksichtigt werden?'
];

const KNOW_HOW = [
  { title: 'Gaming Insights', text: 'Wer spielt eigentlich was und warum?' },
  { title: 'Game Know-how', text: 'Wie funktionieren relevante Spieletitel, Communities und Wettbewerbe?' },
  { title: 'eSport-Ökosystem', text: 'Ligen, Turniere, Teams, Publisher, Plattformen und Wettbewerbsstrukturen.' },
  { title: 'Zielgruppen', text: 'Welche Games passen zu welchen Mitarbeiter- und Bewerbergruppen?' },
  { title: 'Chancen & Risiken', text: 'Was funktioniert und wo können Herausforderungen entstehen?' }
];

const FORMATE = [
  { title: 'Gaming Community', text: 'Interner Treffpunkt für Mitarbeitende mit gemeinsamen Gaming-Interessen.' },
  { title: 'Gaming Abend', text: 'Regelmäßige oder einmalige gemeinsame Gaming-Sessions.' },
  { title: 'Internes Turnier', text: 'Teams oder Einzelspieler treten innerhalb des Unternehmens gegeneinander an.' },
  { title: 'Unternehmensliga', text: 'Mehrere Spieltage, Teams, Standorte und Rankings.' },
  { title: 'Corporate eSport Team', text: 'Aufbau eines festen Teams für externe Wettbewerbe oder Unternehmensligen.' },
  { title: 'Intercompany Competition', text: 'Das eigene Team tritt gegen andere Unternehmen an.' },
  { title: 'Hybrides Format', text: 'Online spielen und Finals oder Gaming-Treffen physisch im Unternehmen durchführen.' }
];

const KRITERIEN = [
  'Zielgruppe',
  'Unternehmenswerte',
  'Teamgröße',
  'Einstiegshürde',
  'Altersstruktur',
  'Wettbewerbscharakter',
  'Zeitaufwand',
  'Publisher- und Lizenzbedingungen',
  'Außenwirkung'
];

const GAMES = [
  { title: 'EA SPORTS FC', text: 'Fußball, Teamplay und niedrige Einstiegshürde.' },
  { title: 'Rocket League', text: 'Schnell verständlich, teamorientiert und dynamisch.' },
  { title: 'League of Legends', text: 'Strategie, Rollenverteilung und langfristiges Teamplay.' },
  { title: 'Valorant / Counter-Strike', text: 'Taktische Teamkommunikation und hohe Competition-Tiefe.' },
  { title: 'Racing', text: 'Leicht zugänglich und gut für standortübergreifende Challenges.' },
  { title: 'Mobile Games', text: 'Niedrige technische Einstiegshürde und hohe Verfügbarkeit.' }
];

const STAKEHOLDER = [
  'HR',
  'Employer Branding',
  'Recruiting',
  'Interne Kommunikation',
  'Marketing',
  'Betriebssport',
  'IT',
  'Mitarbeiter-Vertreter'
];

const WORKSHOP = [
  { title: 'Status quo', text: 'Welche Angebote und Interessen existieren bereits?' },
  { title: 'Ziel', text: 'Was soll Corporate Gaming erreichen?' },
  { title: 'Zielgruppe', text: 'Für wen soll das Angebot entstehen?' },
  { title: 'Format', text: 'Community, Turnier, Liga oder Team?' },
  { title: 'Spiel', text: 'Welche Titel passen?' },
  { title: 'Organisation', text: 'Wie viel interne Betreuung wird benötigt?' },
  { title: 'Kommunikation', text: 'Wie wird das Angebot intern und gegebenenfalls extern sichtbar?' },
  { title: 'Roadmap', text: 'Wie kann ein Pilot starten und später wachsen?' }
];

const STUFEN = [
  { title: 'Pilot', text: 'Gaming-Abend oder internes Turnier.' },
  { title: 'Community', text: 'Interessierte Mitarbeitende zusammenbringen.' },
  { title: 'Liga', text: 'Regelmäßige Wettbewerbe etablieren.' },
  { title: 'Team', text: 'Feste Teams und Trainingsstrukturen entwickeln.' },
  { title: 'Externe Competition', text: 'Gegen andere Unternehmen antreten.' },
  { title: 'Employer Branding', text: 'Corporate Gaming auch nach außen nutzen.' }
];

const LEITPLANKEN = [
  { title: 'Zugänglichkeit', text: 'Wie vermeiden wir, dass nur erfahrene Gamer teilnehmen?' },
  { title: 'Spieleauswahl', text: 'Welche Inhalte passen zu Unternehmen und Zielgruppe?' },
  { title: 'Zeitaufwand', text: 'Wie lässt sich Gaming sinnvoll in den Unternehmensalltag integrieren?' },
  { title: 'Community Management', text: 'Wie schaffen wir ein positives und respektvolles Umfeld?' },
  { title: 'Technik & Datenschutz', text: 'Welche Systeme und Daten werden tatsächlich benötigt?' },
  { title: 'Außenwirkung', text: 'Soll Corporate Gaming intern bleiben oder Teil des Employer Brandings werden?' }
];

const LEISTUNGEN = [
  { icon: Lightbulb, title: 'Strategie & Workshop', text: 'Ziele, Zielgruppe und Potenziale definieren.' },
  { icon: GraduationCap, title: 'Gaming-Beratung', text: 'Spiele, Communities und Wettbewerbe verstehen.' },
  { icon: Sparkles, title: 'Konzept', text: 'Das passende Corporate-Gaming-Modell entwickeln.' },
  { icon: MonitorSmartphone, title: 'Plattform', text: 'Registrierung, Teams, Matches, Rankings und Kommunikation abbilden.' },
  { icon: Trophy, title: 'Turnier- & Ligamanagement', text: 'Wettbewerbe organisieren und betreuen.' },
  { icon: CalendarDays, title: 'Events', text: 'Gaming-Abende, Finals und interne Aktivierungen realisieren.' },
  { icon: Megaphone, title: 'Kommunikation', text: 'Interne Aktivierung und auf Wunsch Employer-Branding-Kommunikation begleiten.' }
];

const BOLD = 'text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl';
const QUESTION = 'p-5 rounded-card bg-white/50 border border-white/70 text-[#0b0f2a] font-bold text-sm md:text-base tracking-tight';
const PANEL_H2 = 'text-[clamp(26px,3.4vw,46px)] font-black uppercase tracking-tighter leading-[1.02]';

/** Titel-Text-Paare auf dunkler Flaeche. */
const DarkGrid: React.FC<{ items: { title: string; text: string }[] }> = ({ items }) => (
  <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((k) => (
      <div key={k.title}>
        <h3 className="text-[#2dd4bf] font-black text-sm uppercase tracking-tight mb-2">{k.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed font-medium">{k.text}</p>
      </div>
    ))}
  </div>
);

export const BetriebssportPage: React.FC<BetriebssportPageProps> = ({ onOpenBooking, onOpenContact }) => {
  useDocumentHead(headFor(PATH));
  useStructuredData(PATH);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('Corporate Gaming');

  return (
    <MoneyPage>
      <MoneyHero
        eyebrow="Corporate Gaming & Betriebssport"
        title="Gaming & eSport"
        accent="als Betriebssport."
        tagline="Betriebssport · Incentive · Community"
        // Kopfbild = Vorschaubild beim Teilen; beides steht in pageMeta.json.
        image={PAGE_META[PATH].ogImage!}
        imageAlt="Mitarbeitende beim gemeinsamen Gaming im Unternehmen"
        label="Corporate Gaming besprechen"
        onBooking={booking}
        onContact={contact}
      />

      {/* Einleitung unter dem Kopf, wie auf der Turnierseite. */}
      <div className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p className="text-[#0b0f2a] font-black text-lg md:text-2xl tracking-tight leading-snug">
            Du möchtest Gaming im Unternehmen verankern, weißt aber noch nicht, welches Format wirklich zu euch passt?
          </p>
          <p>
            Wir unterstützen Unternehmen dabei, Gaming und eSport als Betriebssport, Incentive oder langfristiges
            Community-Format aufzubauen.
          </p>
          <p>
            Von den ersten Gaming-Insights über die Auswahl passender Spieletitel bis zur Frage, ob ein eigenes
            eSport-Team, eine interne Liga oder ein regelmäßiger Gaming-Treff sinnvoll ist.
          </p>
          <p className="text-[#0b0f2a] font-bold">
            Gemeinsam entwickeln wir ein Konzept, das zu Unternehmen, Mitarbeitenden und Zielen passt.
          </p>
        </div>
      </div>

      <Section title="Warum nicht" accent="Gaming?">
        <InlineList items={BETRIEBSSPORT} />
        <div className="mt-8 max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p>Betriebssport und gemeinsame Freizeitaktivitäten sind längst Teil vieler Unternehmenskulturen.</p>
          <p className="text-[#0b0f2a] font-black text-lg md:text-2xl tracking-tight">Warum also nicht auch Gaming?</p>
          <p>
            Für Millionen Menschen ist Gaming ein selbstverständliches Hobby. Ein internes Gaming-Angebot kann ihnen einen
            Treffpunkt bieten, Teams zusammenbringen und neue Kontakte über Abteilungen und Standorte hinweg schaffen.
          </p>
          <p className="text-[#0b0f2a] font-bold">
            Gaming ersetzt dabei bestehende Angebote nicht. Es ergänzt sie um eine weitere Community.
          </p>
        </div>
      </Section>

      <Section title="Was kann Corporate Gaming" accent="erreichen?">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ZIELE.map((z) => (
            <Tile key={z.title} {...z} />
          ))}
        </div>
      </Section>

      <Section
        title="Nicht jedes Unternehmen braucht"
        accent="ein eSport-Team."
        intro={
          <>
            <p className="text-[#0b0f2a] font-bold">Und genau das ist Teil unserer Beratung.</p>
            <p>
              Wir starten nicht mit der Antwort: „Ihr braucht jetzt ein eSport-Team.“ Sondern mit den richtigen Fragen:
            </p>
          </>
        }
      >
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FRAGEN.map((f) => (
            <li key={f} className={QUESTION}>
              {f}
            </li>
          ))}
        </ul>
        <p className={`mt-8 ${BOLD}`}>Erst danach entscheiden wir gemeinsam, welches Format sinnvoll ist.</p>
      </Section>

      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <DarkPanel>
          <h2 className={PANEL_H2}>
            Wir schaffen <span className="text-[#2dd4bf] italic">Gaming-Know-how.</span>
          </h2>
          <p className="mt-4 text-white/65 text-base md:text-lg font-medium max-w-2xl">
            Nicht jeder relevante Stakeholder im Unternehmen muss Gamer sein. Wir vermitteln verständlich, wie Gaming und
            eSport funktionieren.
          </p>
          <DarkGrid items={KNOW_HOW} />
          <p className="mt-10 text-white/65 text-base md:text-lg font-medium">
            Ziel ist nicht, Stakeholder zu Gamern zu machen.
          </p>
          <p className="mt-1 text-white font-black text-lg md:text-xl tracking-tight">
            Sondern sie in die Lage zu versetzen, fundierte Entscheidungen zu treffen.
          </p>
        </DarkPanel>
      </section>

      <Section title="Welches Gaming-Format" accent="passt zu euch?">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FORMATE.map((f) => (
            <TealCard key={f.title} title={f.title}>
              <p>{f.text}</p>
            </TealCard>
          ))}
        </div>
      </Section>

      <Section
        title="Das passende Game"
        accent="zum Unternehmen."
        intro={<p>Nicht jeder Titel eignet sich für jedes Unternehmen. Wir betrachten unter anderem:</p>}
      >
        <InlineList items={KRITERIEN} />
        <p className="mt-10 mb-6 text-slate-600 text-base md:text-lg font-medium">
          Daraus entwickeln wir eine sinnvolle Auswahl. Beispielsweise:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMES.map((g) => (
            <Tile key={g.title} {...g} />
          ))}
        </div>
      </Section>

      <Section
        title="Gemeinsam entwickeln,"
        accent="statt etwas überzustülpen."
        accentBreak
        intro={
          <p>
            Unser bevorzugter Einstieg ist ein gemeinsamer Workshop mit den relevanten Stakeholdern. Zum Beispiel mit:
          </p>
        }
      >
        <Chips items={STAKEHOLDER} />
        <p className="mt-10 mb-6 text-slate-600 text-base md:text-lg font-medium">Gemeinsam betrachten wir:</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKSHOP.map((w) => (
            <Tile key={w.title} {...w} />
          ))}
        </div>
      </Section>

      <Section
        title="Klein starten. Erfahrung sammeln."
        accent="Weiterentwickeln."
        accentBreak
        intro={<p>Ein Corporate-Gaming-Programm muss nicht sofort groß sein.</p>}
      >
        <ol className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {STUFEN.map((s, i) => (
            <li key={s.title} className="relative h-full p-6 rounded-card bg-white/50 border border-white/70">
              <span className="block text-[#0e958e] font-black text-3xl tracking-tighter mb-3">0{i + 1}</span>
              <h3 className="text-[#0b0f2a] font-black text-sm md:text-base uppercase tracking-tight mb-1.5">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{s.text}</p>
              {i < STUFEN.length - 1 && (
                <span aria-hidden="true" className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-[#0e958e] font-black text-xl">→</span>
              )}
            </li>
          ))}
        </ol>
        <p className={`mt-8 ${BOLD}`}>
          So lässt sich zunächst testen, ob das Format angenommen wird, bevor größere Strukturen aufgebaut werden.
        </p>
      </Section>

      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <DarkPanel>
          <h2 className={PANEL_H2}>
            Chancen und Risiken <span className="text-[#2dd4bf] italic">gehören zusammen.</span>
          </h2>
          <p className="mt-4 text-white/65 text-base md:text-lg font-medium max-w-2xl">
            Corporate Gaming kann viel bewirken. Aber wie jedes interne Angebot braucht es klare Leitplanken. Wir
            betrachten deshalb gemeinsam unter anderem:
          </p>
          <DarkGrid items={LEITPLANKEN} />
          <p className="mt-10 text-white/65 text-base md:text-lg font-medium">
            Das Ziel ist keine Gaming-Lösung um jeden Preis.
          </p>
          <p className="mt-1 text-white font-black text-lg md:text-xl tracking-tight">
            Sondern eine Lösung, die langfristig funktioniert.
          </p>
        </DarkPanel>
      </section>

      <Section title="Wir begleiten von der Idee" accent="bis zum Spielbetrieb.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEISTUNGEN.map((l) => (
            <Tile key={l.title} {...l} />
          ))}
        </div>
      </Section>

      <ClosingCTA
        title="Warum sollte Betriebssport"
        accent="nicht auch Gaming sein?"
        label="Corporate Gaming besprechen"
        onBooking={booking}
        onContact={contact}
      >
        <p>
          Wenn Gaming bereits ein Hobby deiner Mitarbeitenden ist, kann daraus eine Community entstehen, die Menschen
          verbindet, Teams schafft und neue Begegnungen im Unternehmen ermöglicht.
        </p>
        <p>
          Wir helfen dir herauszufinden, ob, wie und mit welchem Format Gaming und eSport zu deinem Unternehmen passen.
        </p>
      </ClosingCTA>
    </MoneyPage>
  );
};
