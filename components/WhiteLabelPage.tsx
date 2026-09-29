import React, { useEffect } from 'react';
import {
  FileSpreadsheet,
  KeyRound,
  Lock,
  Mail,
  MailCheck,
  MessageSquare,
  MonitorSmartphone,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
  Users,
  Webhook,
  Workflow,
  FileSignature
} from 'lucide-react';
import { Reveal } from './Reveal';
import { MoneyPage } from './money/AutoReveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { PAGE_META, headFor, serviceSchema } from './pageMeta';
import { BLOCK_GAP } from './spacing';
import { CONTAINER, Chips, ClosingCTA, DarkPanel, ImageCard, InlineList, MoneyHero, PlatformShowcase, Section, ShowcaseTile, TealCard, Tile } from './money/ui';

// ---------------------------------------------------------------------------
// Money Page: White-Label Plattform
// ---------------------------------------------------------------------------
// Aufbau nach Vorgabe (15 Abschnitte). Zusaetzlich direkt unter dem Kopf die
// Plattform-Buehne mit den Mockups unserer Kunden.
// ---------------------------------------------------------------------------

interface WhiteLabelPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

const PATH = '/white-label-turnierplattform';

// Plattformen, die wir im Look unserer Kunden gebaut haben. Die gewaehlte
// Kachel erscheint gross. Reihenfolge wie vorgegeben.
const HERO_TILES: ShowcaseTile[] = [
  { id: 'eintracht', title: 'Eintracht Frankfurt', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/eintracht_whitelabel.jpeg' },
  { id: 'vfb', title: 'VfB Stuttgart', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/vfb_whitelabel.jpeg' },
  { id: 'xpdays', title: 'XP Days', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/xpdays_whitelabel.jpeg' },
  { id: 'rewe', title: 'REWE', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/rewe_whitelabel.jpeg' },
  { id: 'interwetten', title: 'Interwetten', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/interwetten_whitelabel.jpeg' },
  { id: 'hsv', title: 'HSV', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/hsv_whitelabel.jpeg' },
  { id: 'winamax', title: 'Winamax', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/winamax_whitelabel.jpeg' },
  { id: 'bfv', title: 'BFV', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/bfv_whitelabel.jpeg' },
  { id: 'garnier', title: 'Garnier', text: 'Die Turnierplattform im Look von', image: '/images/white-label-turnierplattform/garnier_whitelabel.jpeg' }
];

const HERO_LEAD =
  'Eigens entwickelt. Aus dem eSport entstanden. Für nahezu jede digitale Competition-, Gaming- und Aktivierungslogik gebaut. Und ständig weiterentwickelt.';

const HeroBody = () => (
  <>
    <p>
      Ob Turnierplattform, Online-Qualifier, Liga, Live-Finale, Gameshow, Gewinnspiel, Lead-Registrierung oder individuelle
      Gamification-Lösung: Unsere modulare Plattform bildet unterschiedlichste Formate vollständig im Look &amp; Feel deiner
      Marke ab.
    </p>
    <p>Von der kompakten Microsite bis zum komplexen Plattform-Ökosystem.</p>
  </>
);

const HERKUNFT = [
  { title: 'eSport & Gaming', text: 'Turniere, Qualifier, Ligen, Rankings und Finals für unterschiedlichste Spieletitel.' },
  { title: 'Sport & Competition', text: 'Fußball, eFootball, Dart, Golf, Padel, Racing und weitere Wettbewerbsformate.' },
  { title: 'Gamification', text: 'Challenges, Punkte, Rankings, Quiz, Voting, Badges und Rewards.' },
  { title: 'Lead-Generierung', text: 'Landingpages, Registrierungsflows, Messe-Leads, Opt-ins und individuelle Datenstrecken.' },
  { title: 'Gewinnspiele', text: 'Registrierung, Sofortgewinne, Auslosungen und mehrstufige Gewinnspielmechaniken.' },
  { title: 'Gameshows & Events', text: 'Voting, Challenges, Scores und digitale Verlängerungen für Live-Formate.' }
];

const STUFEN = [
  { title: 'Microsite & Landingpage', text: 'Kompakte Projektseite mit Content, Registrierung, Lead-Flow oder Teilnahmeformular.' },
  { title: 'Turnierplattform', text: 'Teilnehmer, Teams, Matches, Brackets, Rankings und Ergebnisse.' },
  { title: 'Qualifier & Live-Finale', text: 'Digitale Qualifikation mit anschließendem physischen Finale.' },
  { title: 'Liga & Circuit', text: 'Mehrere Spieltage, Gruppen, Tabellen, Playoffs und saisonale Wettbewerbe.' },
  { title: 'Community-Plattform', text: 'Profile, Rankings, Challenges, Kommunikation und wiederkehrende Aktivierung.' },
  { title: 'Plattform-Ökosystem', text: 'Mehrere Projekte, Marken, Wettbewerbe und Nutzergruppen innerhalb einer gemeinsamen Infrastruktur.' }
];

const LOGIKEN = [
  'K.O.-System',
  'Double Elimination',
  'Round Robin',
  'Gruppenphase',
  'Gruppenphase + Playoffs',
  'Qualifier',
  'Ligasystem',
  'Ranking-System',
  'Best of One',
  'Best of Three',
  'Best of Five',
  'Einzelwettbewerb',
  'Teamwettbewerb',
  'Punktesystem',
  'Challenges',
  'Mehrstufige Wettbewerbe'
];

const BACKEND = [
  { title: 'User & Profile', text: 'Accounts, Profile, Teams, Rollen und individuelle Berechtigungen.' },
  { title: 'Competition Engine', text: 'Turniere, Matches, Gruppen, Brackets, Tabellen, Qualifier und Playoffs.' },
  { title: 'Registration Engine', text: 'Individuelle Registrierungsstrecken, Formulare, Teilnahmebedingungen, Check-ins und Validierungen.' },
  { title: 'Gamification Engine', text: 'Punkte, XP, Rankings, Challenges, Quiz, Voting, Badges und Rewards.' },
  { title: 'Lead & Data', text: 'Lead-Erfassung, Marketing-Opt-ins, Eventdaten und strukturierte Datenübergaben.' },
  { title: 'Communication', text: 'E-Mail-Kommunikation, Notifications und eigenes integriertes Chat-System.' }
];

const ANPASSBAR = [
  'Domain / Subdomain',
  'Farben',
  'Typografie',
  'Logos',
  'Navigation',
  'Landingpages',
  'User Flows',
  'Formulare',
  'E-Mails',
  'Profile',
  'Rankings',
  'Sponsorenintegrationen',
  'Content',
  'Individuelle Module'
];

const ENTWICKLER = ['Backend-Architektur', 'Datenbanklogik', 'User- & Rollenmodelle', 'Competition-Logik', 'APIs', 'Integrationen', 'Individuelle Erweiterungen'];

const DATENSCHUTZ = [
  { icon: Server, title: 'Hosting in Deutschland', text: 'Unsere Infrastruktur wird über Hetzner in Deutschland betrieben.' },
  { icon: ShieldCheck, title: 'DSGVO-konform', text: 'Datenflüsse, Einwilligungen und Berechtigungen werden projektspezifisch konzipiert.' },
  { icon: MailCheck, title: 'Double-Opt-In', text: 'Newsletter- und Marketingeinwilligungen können sauber in die User Journey integriert werden.' },
  { icon: FileSignature, title: 'AVV', text: 'Auftragsverarbeitung kann entsprechend der Projektanforderungen abgebildet werden.' },
  { icon: Lock, title: 'Rollen & Berechtigungen', text: 'Unterschiedliche Zugriffsebenen für Nutzer, Teams, Admins oder Partner.' },
  {
    icon: MessageSquare,
    title: 'Eigenes Chat-System',
    text: 'Kommunikation kann direkt innerhalb der Plattform stattfinden. Teilnehmer müssen dadurch nicht zwingend auf externe Systeme wie Discord ausweichen.'
  }
];

const JOURNEY = [
  { title: 'Attract', items: ['Landingpage', 'Kampagne', 'QR-Code', 'Social Traffic'] },
  { title: 'Register', items: ['Account', 'Registrierung', 'Profil', 'Teilnahme', 'Opt-in'] },
  { title: 'Engage', items: ['Turnier', 'Challenge', 'Quiz', 'Ranking', 'Voting'] },
  { title: 'Communicate', items: ['Chat', 'E-Mail', 'Reminder', 'Statusmeldungen'] },
  { title: 'Convert', items: ['Lead', 'Bewerbung', 'Newsletter', 'Eventbesuch', 'Teilnahme'] },
  { title: 'Reactivate', items: ['Nurture Flow', 'Weitere Challenges', 'Neue Turniere', 'Content', 'Community'] }
];

const LEAD_DATEN = [
  'Kontaktdaten',
  'Teilnehmerdaten',
  'Newsletter-Opt-ins',
  'Interessen',
  'Event-Check-ins',
  'Bewerberdaten',
  'Challenge-Ergebnisse',
  'Scores',
  'Profilinformationen',
  'Conversion-Daten'
];

const INTEGRATIONEN = [
  { icon: KeyRound, title: 'Single Sign-On', text: 'Bestehende Account-Systeme können angebunden werden.' },
  { icon: Users, title: 'CRM', text: 'Teilnehmer- und Lead-Daten können an bestehende CRM-Systeme übergeben werden.' },
  { icon: Plug, title: 'API', text: 'Individuelle Schnittstellen für bestehende Anwendungen und Plattformen.' },
  { icon: Webhook, title: 'Webhooks', text: 'Automatisierte Daten- und Eventübergaben.' },
  { icon: FileSpreadsheet, title: 'Import & Export', text: 'CSV, Excel und individuelle Datenstrukturen.' },
  { icon: Mail, title: 'E-Mail-Marketing', text: 'Newsletter, automatisierte Mails und Nurture-Flows können integriert werden.' }
];

const AUSSPIELUNG = [
  { icon: MonitorSmartphone, title: 'Responsive Web', text: 'Optimiert für Desktop, Tablet und Smartphone.' },
  { icon: Workflow, title: 'PWA', text: 'Installierbare Web-App mit appähnlicher Experience.' },
  { icon: Smartphone, title: 'Native App', text: 'Je nach Projekt kann die Lösung auch als eigene iOS- und Android-App umgesetzt werden.' }
];

const USE_CASES = [
  {
    title: 'eSport & Gaming',
    text: 'EA SPORTS FC, Counter-Strike, Rocket League, Fortnite, Valorant, League of Legends, Mobile Games und weitere Titel.',
    image: '/images/showcase/sonax-rocket-league.jpg'
  },
  { title: 'Sport', text: 'Fußball, eFootball, Dart, Golf, Padel, Racing und weitere Competition-Formate.', image: '/images/interwetten.jpeg' },
  { title: 'Messe & Event', text: 'Lead-Registrierung, Challenges, Rankings, Check-ins und Follow-up.', image: '/images/showcase/hhn-gamingland-meetit.jpg' },
  { title: 'Gewinnspiele', text: 'Teilnahme, Sofortgewinn, Auslosung und automatisierte Kommunikation.', image: '/images/showcase/winamax-gluecksgefuehle.jpg' },
  { title: 'Gameshows', text: 'Voting, Quiz, Scores, Rankings und Live-Interaktion.', image: '/images/white-label-turnierplattform/garnier_whitelabel.jpeg' },
  { title: 'Recruiting', text: 'Gamifizierte Candidate Journeys, Challenges und Bewerberflows.', image: '/images/Hagebau1.jpg' },
  { title: 'Community', text: 'Profile, Rankings, Content und wiederkehrende Aktivierung.', image: '/images/showcase/allianz-juniorcup.jpg' }
];

const WACHSEN = [
  'Du brauchst eine einfache Landingpage mit Registrierung?',
  'Du brauchst ein eSport-Turnier mit mehreren Online-Qualifiern?',
  'Du brauchst ein Liga-System mit Teams, Profilen, Rankings und Chat?',
  'Du brauchst ein Online-Dart-Format oder einen Sportwettbewerb mit individuellem Scoring?',
  'Du möchtest Messe-Lead-Gen, Gamification, Gewinnspiel und CRM miteinander verbinden?',
  'Du benötigst eine Plattform mit Single Sign-on und individueller API-Anbindung?'
];

const Label: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <p className={`font-black text-[11px] md:text-xs uppercase tracking-[0.2em] mb-3 ${dark ? 'text-[#2dd4bf]' : 'text-[#0e958e]'}`}>{children}</p>
);

const Statement: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl">
    {children}
  </Reveal>
);

export const WhiteLabelPage: React.FC<WhiteLabelPageProps> = ({ onOpenBooking, onOpenContact }) => {
  useDocumentHead(headFor(PATH));

  // Leistung als strukturierte Daten (siehe EsportTurnierPage).
  useEffect(() => {
    const id = 'ld-service';
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      el.textContent = JSON.stringify(serviceSchema(PATH));
      document.head.appendChild(el);
    }
    return () => el?.remove();
  }, []);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('White-Label Plattform');

  return (
    <MoneyPage>
      {/* ============ 1. Kopf ============ */}
      <MoneyHero
        eyebrow="White-Label Plattform"
        title="Die White-Label-Plattform"
        accent="für eSport, Gaming & mehr."
        titleSize="text-[clamp(28px,4.6vw,66px)]"
        tagline="100 % White-Label · Eigenentwickelt · DSGVO-konform · Hosted in Germany"
        // Kopfbild = Vorschaubild beim Teilen; beides steht in pageMeta.json.
        image={PAGE_META[PATH].ogImage!}
        imageAlt="White-Label Turnierplattform im Look des BFV"
        label="Plattform Projekt besprechen"
        onBooking={booking}
        onContact={contact}
      />

      {/* Einleitung: steht auf allen Geraeten unter dem Kopf; der Hero traegt
          nur Ueberschrift, Siegel-Zeile und CTA. */}
      <div className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="max-w-3xl space-y-3">
          <p className="text-[#0b0f2a] font-black text-lg md:text-2xl tracking-tight leading-snug">{HERO_LEAD}</p>
          <div className="text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
            <HeroBody />
          </div>
        </div>
      </div>

      {/* ============ Plattformen unserer Kunden ============ */}
      <Section title="Turnierplattformen." accent="Im Look unserer Kunden." accentBreak>
        <PlatformShowcase tiles={HERO_TILES} />
      </Section>

      {/* ============ 2. Herkunft ============ */}
      <Section
        title="Aus eSport entstanden."
        accent="Mit jedem Projekt weitergedacht."
        accentBreak
        intro="Was als Plattform für eSport- und Gaming-Turniere begonnen hat, ist heute eine flexible technologische Basis für digitale Wettbewerbe, Aktivierungen und User Journeys."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HERKUNFT.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(i, 5) * 0.05}>
              <TealCard title={c.title}>
                <p>{c.text}</p>
              </TealCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 3. Microsite bis Oekosystem ============ */}
      <Section
        title="Von der Microsite bis zum"
        accent="Plattform-Ökosystem."
        intro="Nicht jedes Projekt braucht dieselbe technische Tiefe."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STUFEN.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(i, 5) * 0.05}>
              <div className="h-full p-6 md:p-7 rounded-card bg-white/50 border border-white/70">
                <span className="block text-[#0e958e] font-black text-sm tabular-nums mb-3">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[#0b0f2a] font-black text-base md:text-lg uppercase tracking-tight mb-2">{c.title}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 4. Wettbewerbslogik ============ */}
      <Section
        title="Fast jede"
        accent="Wettbewerbslogik."
        intro="Unsere Plattform passt sich dem Wettbewerb an und nicht umgekehrt."
      >
        <Chips items={LOGIKEN} />
        <Statement>Braucht dein Projekt eine eigene Competition-Logik, entwickeln wir sie passend zum Use Case.</Statement>
      </Section>

      {/* ============ 5. Backend ============ */}
      <Section title="Ein Backend." accent="Viele Möglichkeiten." accentBreak>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BACKEND.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(i, 5) * 0.05}>
              <DarkPanel className="h-full !p-7">
                <h3 className="text-[#2dd4bf] font-black uppercase tracking-tight text-base md:text-lg mb-2">{c.title}</h3>
                <p className="text-white/75 text-sm md:text-base leading-relaxed font-medium">{c.text}</p>
              </DarkPanel>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 6. Deine Marke ============ */}
      <Section
        title="Deine Marke."
        accent="Nicht unsere."
        accentBreak
        intro={
          <>
            <p>White-Label bedeutet für uns nicht, eine Standardplattform mit deinem Logo zu versehen.</p>
            <p className="text-[#0b0f2a] font-bold">Die komplette User Experience wird auf deine Marke zugeschnitten.</p>
          </>
        }
      >
        <Label>Anpassbar sind unter anderem</Label>
        <InlineList items={ANPASSBAR} />
        <div className="mt-8 space-y-1 text-[#0b0f2a] text-base md:text-lg font-bold">
          <p>Keine sichtbare Fremdplattform.</p>
          <p>Keine Zwischenstufe zwischen deiner Marke und deinen Nutzern.</p>
          <p className="text-[#0e958e]">Die Plattform sieht aus wie deine Plattform.</p>
        </div>
      </Section>

      {/* ============ 7. Eigenentwickelt ============ */}
      <Section title="Eigenentwickelt." accent="Nicht zusammengebaut." accentBreak>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div className="text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-4">
            <p className="text-[#0e958e] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Made by humans. Made in Germany.</p>
            <p>Unsere Plattform basiert auf einer über Jahre entwickelten eigenen Software-, Backend- und Datenbankarchitektur.</p>
            <p>
              Wir setzen nicht auf eine externe Turnierplattform und bauen unsere Kernlogik nicht aus beliebig
              zusammengesetzten Drittanbieter-Tools zusammen.
            </p>
            <p>
              AI nutzen wir heute selbstverständlich unterstützend, insbesondere um Entwicklungsprozesse und Frontend-Arbeit
              effizienter zu gestalten.
            </p>
            <p className="text-[#0b0f2a] font-bold">
              Die zentrale Backend-, Daten- und Geschäftslogik basiert jedoch auf unserer eigenen technologischen Basis und
              dem Know-how unserer Entwickler.
            </p>
          </div>
          <Reveal>
            <TealCard title="Unsere in Deutschland ansässigen Entwickler verantworten insbesondere">
              <ul className="divide-y divide-white/20">
                {ENTWICKLER.map((e) => (
                  <li key={e} className="py-2.5 font-black uppercase tracking-tight text-white">
                    {e}
                  </li>
                ))}
              </ul>
            </TealCard>
          </Reveal>
        </div>
      </Section>

      {/* ============ 8. Datenschutz ============ */}
      <Section
        title="DSGVO & Hosting"
        accent="in Deutschland."
        intro="Datenschutz wird nicht nachträglich ergänzt, sondern von Beginn an mitgedacht."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATENSCHUTZ.map((t, i) => (
            <Reveal key={t.title} delay={Math.min(i, 5) * 0.05}>
              <Tile {...t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 9. User Journey ============ */}
      <Section
        title="Von der Registrierung bis"
        accent="zum Nurture Flow."
        intro="Unsere Plattform kann die gesamte digitale User Journey abbilden."
      >
        <Reveal>
          <DarkPanel>
            <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
              {JOURNEY.map((j, i) => (
                <li key={j.title}>
                  <span className="block text-[#2dd4bf] font-black text-xs tabular-nums mb-1">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-black uppercase tracking-tight text-lg mb-3">{j.title}</h3>
                  <ul className="space-y-1.5 text-white/70 text-sm font-medium">
                    {j.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </DarkPanel>
        </Reveal>
      </Section>

      {/* ============ 10. Lead-Generierung ============ */}
      <Section
        title="Lead-Generierung"
        accent="direkt integriert."
        intro={
          <>
            <p className="text-[#0b0f2a] font-bold">Die Plattform kann gleichzeitig Competition- und Marketingplattform sein.</p>
            <p>Je nach Projekt können zum Beispiel erfasst werden:</p>
          </>
        }
      >
        <InlineList items={LEAD_DATEN} />
        <Statement>Die Daten können anschließend exportiert oder direkt an bestehende Systeme übergeben werden.</Statement>
      </Section>

      {/* ============ 11. Integrationen ============ */}
      <Section title="Integrationen, die zu deiner" accent="Infrastruktur passen.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTEGRATIONEN.map((t, i) => (
            <Reveal key={t.title} delay={Math.min(i, 5) * 0.05}>
              <Tile {...t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 12. Web / PWA / App ============ */}
      <Section title="Web. PWA." accent="App." intro="Die Plattform endet nicht bei einer klassischen Website.">
        <div className="grid md:grid-cols-3 gap-4">
          {AUSSPIELUNG.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <Tile {...t} />
            </Reveal>
          ))}
        </div>
        <Statement>So kann aus einer einzelnen Kampagne langfristig eine eigene digitale Plattform entstehen.</Statement>
      </Section>

      {/* ============ 13. Use Cases ============ */}
      <Section title="Eine Technologie." accent="Viele Use Cases." accentBreak>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {USE_CASES.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(i, 5) * 0.05}>
              <ImageCard {...c} textClass="sm:min-h-[6.5em] lg:min-h-[8.2em]" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 14. Mitwachsen ============ */}
      <Section title="Mit deinem Projekt" accent="wachsen.">
        <ul className="border-t border-[#0b0f2a]/12">
          {WACHSEN.map((q) => (
            <li key={q} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6 py-4 md:py-5 border-b border-[#0b0f2a]/12">
              <span className="text-[#0b0f2a] font-bold text-base md:text-lg">{q}</span>
              <span className="shrink-0 text-[#0e958e] font-black uppercase tracking-tight text-base md:text-lg">Machen wir.</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-3xl space-y-2">
          <p className="text-[#0b0f2a] font-bold">Die technologische Basis wird nicht auf einen einzelnen Use Case begrenzt.</p>
          <p>Sie entwickelt sich mit den Anforderungen unserer Projekte kontinuierlich weiter.</p>
        </div>
      </Section>

      {/* ============ 15. Abschluss ============ */}
      <ClosingCTA
        title="Deine Idee. Deine Marke."
        accent="Unsere Technologie."
        label="Plattform Projekt besprechen"
        onBooking={booking}
        onContact={contact}
      >
        <p>
          Vom schnellen Registrierungsflow bis zur komplexen Plattform mit Competition, Gamification, Kommunikation und
          Datenlogik: Wir entwickeln die Lösung passend zu deinem Projekt.
        </p>
        <p className="text-[#2dd4bf] font-black uppercase tracking-[0.15em] text-sm">100 % White-Label. Eigenentwickelt. Skalierbar.</p>
      </ClosingCTA>
    </MoneyPage>
  );
};
