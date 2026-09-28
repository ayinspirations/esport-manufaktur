import React, { useEffect } from 'react';
import {
  ArrowRight,
  Boxes,
  Cpu,
  Database,
  FileSpreadsheet,
  KeyRound,
  Layers,
  MonitorSmartphone,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow
} from 'lucide-react';
import { Reveal } from './Reveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { headFor, serviceSchema } from './pageMeta';
import { CellGrid, Chips, ClosingCTA, DarkPanel, ImageCard, InlineList, MoneyHero, PlatformShowcase, Section, ShowcaseTile, TealCard, Tile } from './money/ui';

// ---------------------------------------------------------------------------
// Money Page: White-Label Turnierplattform
// ---------------------------------------------------------------------------

interface WhiteLabelPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

const PATH = '/white-label-turnierplattform';

// Die Kacheln im Kopf: Plattformen, die wir im Look unserer Kunden gebaut
// haben. Die gewaehlte Kachel wird zum Hintergrund. Reihenfolge wie vorgegeben.
const HERO_TILES: ShowcaseTile[] = [
  { id: 'eintracht', title: 'Eintracht Frankfurt', text: 'Die Turnierplattform im Look von Eintracht Frankfurt.', image: '/images/white-label-turnierplattform/eintracht_whitelabel.jpeg' },
  { id: 'vfb', title: 'VfB Stuttgart', text: 'Die Turnierplattform im Look von VfB Stuttgart.', image: '/images/white-label-turnierplattform/vfb_whitelabel.jpeg' },
  { id: 'xpdays', title: 'XP Days', text: 'Die Turnierplattform im Look von XP Days.', image: '/images/white-label-turnierplattform/xpdays_whitelabel.jpeg' },
  { id: 'rewe', title: 'REWE', text: 'Die Turnierplattform im Look von REWE.', image: '/images/white-label-turnierplattform/rewe_whitelabel.jpeg' },
  { id: 'interwetten', title: 'Interwetten', text: 'Die Turnierplattform im Look von Interwetten.', image: '/images/white-label-turnierplattform/interwetten_whitelabel.jpeg' },
  { id: 'hsv', title: 'HSV', text: 'Die Turnierplattform im Look von HSV.', image: '/images/white-label-turnierplattform/hsv_whitelabel.jpeg' },
  { id: 'winamax', title: 'Winamax', text: 'Die Turnierplattform im Look von Winamax.', image: '/images/white-label-turnierplattform/winamax_whitelabel.jpeg' },
  { id: 'bfv', title: 'BFV', text: 'Die Turnierplattform im Look von BFV.', image: '/images/white-label-turnierplattform/bfv_whitelabel.jpeg' },
  { id: 'garnier', title: 'Garnier', text: 'Die Turnierplattform im Look von Garnier.', image: '/images/white-label-turnierplattform/garnier_whitelabel.jpeg' }
];

const BRANDING = [
  'Eigene Farben',
  'Eigene Typografie',
  'Eigene Domain oder Subdomain',
  'Individuelle Landingpages',
  'Eigenes Wording',
  'Eigene User Journey',
  'Individuelle Module',
  'Eigene Kommunikationslogik'
];

const TECHNIK = [
  { icon: Cpu, title: 'Eigene Technologie', text: 'Keine Abhängigkeit von fremden Turniersystemen.' },
  { icon: Server, title: 'Hosting in Deutschland', text: 'Hosting über Hetzner in Deutschland.' },
  { icon: ShieldCheck, title: 'DSGVO-konform', text: 'Datenschutz, AVV und Einwilligungsprozesse werden bereits in der technischen Konzeption berücksichtigt.' },
  { icon: Layers, title: 'Multi-Tenant-fähig', text: 'Mehrere Marken, Projekte oder Wettbewerbe können getrennt innerhalb einer Infrastruktur betrieben werden.' },
  { icon: Boxes, title: 'Modular erweiterbar', text: 'Neue Mechaniken, Module und Schnittstellen können projektspezifisch ergänzt werden.' }
];

const REG_GRUPPEN = ['Einzelspieler', 'Teams', 'Vereine', 'Unternehmen', 'Mitarbeiter', 'Communitys', 'Eingeladene Teilnehmer', 'Öffentliche Wettbewerbe'];
const REG_OPTIONEN = ['Double-Opt-In', 'Teilnahmebedingungen', 'Altersabfragen', 'Codes', 'Einladungen', 'Wartelisten', 'Qualifikationen'];

const MODI = [
  'K.O.-System',
  'Double Elimination',
  'Round Robin',
  'Gruppenphase',
  'Gruppenphase + Playoffs',
  'Qualifier + Finale',
  'Ligasystem',
  'Ranking-System',
  'Best-of-One',
  'Best-of-Three',
  'Best-of-Five',
  'Einzelwettbewerb',
  'Teamwettbewerb',
  'Mehrstufige Qualifikation'
];

const GAMES = ['EA Sports FC', 'Rocket League', 'Fortnite', 'Valorant', 'League of Legends', 'Counter-Strike', 'Mario Kart', 'Sim Racing', 'Mobile Gaming'];

const SPORT = [
  'Dart',
  'Golf',
  'Padel',
  'Tennis',
  'Tischtennis',
  'Fußball',
  'Basketball',
  'Handball',
  'Beachvolleyball',
  'Running',
  'Cycling',
  'Corporate Games',
  'Fun Challenges',
  'Vereins- und Firmenligen'
];

const LEADS = ['Messe-Leads', 'Eventregistrierung', 'Bewerberkontakte', 'Newsletter-Opt-ins', 'Gewinnspielteilnahme', 'Sponsoraktivierungen', 'CRM-Anreicherung'];

const GAMIFICATION = [
  'Quiz',
  'XP-Systeme',
  'Challenges',
  'Leaderboards',
  'Stempelkarten',
  'Codes',
  'Scratch / Rubbelmechaniken',
  'Gewinnspiele',
  'Sofortgewinne',
  'Hauptverlosungen',
  'Profilfortschritt',
  'Badges'
];

const FLOWS = [
  { title: 'Messe & Event', steps: ['QR-Code scannen', 'Registrieren', 'Challenge absolvieren', 'Lead erfassen', 'Follow-up auslösen'] },
  { title: 'Gewinnspiel', steps: ['Registrierung', 'Teilnahme', 'Sofortgewinn oder Hauptverlosung', 'Automatisierte Kommunikation'] },
  { title: 'Recruiting', steps: ['Registrierung', 'Challenge', 'Profil vervollständigen', 'Bewerberdaten strukturiert erfassen'] },
  { title: 'Markenaktivierung', steps: ['Interaktionen sammeln', 'Punkte vergeben', 'Ranking aufbauen', 'Preise oder Benefits freischalten'] }
];

const ROLLEN = ['Teilnehmer', 'Teams', 'Community', 'Admins', 'Promoter', 'Turnierleitung', 'Partner', 'Sponsoren', 'Recruiter', 'Content Manager'];

const INTEGRATIONEN = [
  { icon: KeyRound, title: 'Single Sign-On', text: 'Integration bestehender Login-Systeme.' },
  { icon: Plug, title: 'API-Schnittstellen', text: 'Datenaustausch mit bestehenden Plattformen und Anwendungen.' },
  { icon: Users, title: 'CRM-Integration', text: 'Übergabe relevanter Leads und Nutzerdaten an bestehende CRM-Systeme.' },
  { icon: FileSpreadsheet, title: 'Import & Export', text: 'CSV- und Excel-Import bzw. Export.' },
  { icon: Database, title: 'Externe Datenquellen', text: 'Integration bestehender Systeme oder Datenbanken.' }
];

const KOMMUNIKATION = [
  'Internes Nachrichtensystem',
  'Match-Kommunikation',
  'Team-Kommunikation',
  'Support',
  'Admin-Nachrichten',
  'Automatisierte E-Mails',
  'Statusinformationen',
  'Push-Nachrichten'
];

const AUSSPIELUNG = [
  { icon: MonitorSmartphone, title: 'Responsive Web-Plattform', text: 'Optimiert für Desktop, Tablet und Smartphone.' },
  { icon: Workflow, title: 'PWA', text: 'Installierbare Web-App mit appähnlicher User Experience.' },
  { icon: Smartphone, title: 'Native App', text: 'Projektbezogen kann die Plattform auch als eigene iOS- und Android-App umgesetzt werden.' }
];

const PHASEN = [
  { title: 'Vor dem Event', items: ['Registrierung', 'Teilnehmergewinnung', 'Qualifikation', 'Kommunikation', 'Lead-Generierung'] },
  { title: 'Während des Events', items: ['Check-in', 'Matches', 'Scores', 'Rankings', 'Challenges', 'Content', 'Live-Ergebnisse'] },
  { title: 'Nach dem Event', items: ['Gewinner', 'Auslosungen', 'Content', 'Reporting', 'Follow-up', 'CRM-Übergabe', 'Community-Aktivierung'] }
];

const KPIS = [
  'Registrierungen',
  'Aktive Teilnehmer',
  'Check-ins',
  'Matches',
  'Scores',
  'Interaktionen',
  'Leads',
  'Opt-ins',
  'Profilvervollständigungen',
  'Verweildauer',
  'Wiederkehrende Nutzer',
  'Conversions'
];

const EINSATZ = [
  { title: 'eSport Turniere', text: 'Gaming Cups, Ligen und Qualifier.', image: '/images/showcase/sonax-rocket-league.jpg' },
  { title: 'Sport Turniere', text: 'Dart, Golf, Padel, Fußball und weitere Sportarten.', image: '/images/interwetten.jpeg' },
  { title: 'Events & Messen', text: 'Registrierung, Lead-Gen und Aktivierung.', image: '/images/showcase/hhn-gamingland-meetit.jpg' },
  { title: 'Recruiting', text: 'Gamifizierte Candidate Journeys.', image: '/images/Hagebau1.jpg' },
  { title: 'Gewinnspiele', text: 'Sofortgewinn, Auslosung und Hauptpreise.', image: '/images/showcase/winamax-gluecksgefuehle.jpg' },
  { title: 'Community', text: 'Rankings, Challenges und langfristige Interaktion.', image: '/images/showcase/allianz-juniorcup.jpg' }
];

const AUSBAU = ['Gamification', 'Lead-Gen', 'CRM', 'Community', 'App', 'Weitere Wettbewerbe'];

const Label: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <p className={`font-black text-[11px] md:text-xs uppercase tracking-[0.2em] mb-3 ${dark ? 'text-[#2dd4bf]' : 'text-[#0e958e]'}`}>{children}</p>
);

export const WhiteLabelPage: React.FC<WhiteLabelPageProps> = ({ onOpenBooking, onOpenContact }) => {
  useDocumentHead(headFor(PATH));

  // Siehe EsportTurnierPage: Leistung als strukturierte Daten.
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
    <div className="w-full bg-[#badeda]">
      <MoneyHero
        eyebrow="White-Label Turnierplattform"
        title="Deine Marke. Dein Turnier."
        accent="Deine Plattform."
        image="/images/white-label-turnierplattform/xpdays_whitelabel.jpeg"
        imageAlt="White-Label Turnierplattform im Look der XP Days"
        label="Plattform Projekt besprechen"
        onBooking={booking}
        onContact={contact}
      />

      {/* ============ Plattformen im Look unserer Kunden ============ */}
      <Section
        title="Unsere Plattformen."
        accent="Im Look unserer Kunden."
        accentBreak
        intro={
          <>
            <p>
              Unsere eigens entwickelte White-Label-Plattform bildet Turniere, Wettbewerbe und Aktivierungen vollständig im
              Look &amp; Feel deiner Marke ab.
            </p>
            <p className="text-[#0b0f2a] font-bold">
              Von Registrierung und Teilnehmermanagement über Brackets, Rankings und Qualifier bis zu Lead-Gen,
              Gamification und automatisierter Kommunikation.
            </p>
          </>
        }
      >
        <PlatformShowcase tiles={HERO_TILES} />
      </Section>

      {/* ============ Kein Fremdtool ============ */}
      <Section
        title="Kein Fremdtool."
        accent="Kein Plattform-Branding."
        accentBreak
        intro={
          <>
            <p>Viele Turnierlösungen funktionieren nach demselben Prinzip: Ein externer Anbieter stellt die Infrastruktur – und deine Marke wird darin integriert.</p>
            <p className="text-[#0b0f2a] font-black">Bei uns ist es umgekehrt. Alles wird vollständig gebrandet.</p>
          </>
        }
      >
        <Label>Die Plattform wird auf dein Projekt zugeschnitten</Label>
        <Chips items={BRANDING} />
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl">
          Kein sichtbares Drittanbieter-Branding. Keine standardisierte Turnierplattform mit aufgesetztem Logo.
        </Reveal>
      </Section>

      {/* ============ Eigene Technik ============ */}
      <Section
        title="Entwickelt von uns."
        accent="Gehostet in Deutschland."
        accentBreak
        intro="Unsere Plattform ist eigenentwickelt und wird unabhängig von klassischen Turnierplattformen betrieben."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TECHNIK.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <TealCard title={t.title}>
                <p>{t.text}</p>
              </TealCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Registrierung + Turniermanagement ============ */}
      <Section title="Alles, was dein Turnier" accent="braucht.">
        <div className="grid lg:grid-cols-2 gap-4">
          <Reveal>
            <TealCard title="Registrierung">
              <p>
                <strong>Individuelle Registrierungsflows für:</strong> {REG_GRUPPEN.join(', ')}.
              </p>
              <p>
                <strong>Optional inklusive:</strong> {REG_OPTIONEN.join(', ')}.
              </p>
            </TealCard>
          </Reveal>
          <Reveal delay={0.08}>
            <TealCard title="Turniermanagement">
              <p>
                <strong>Unterschiedlichste Wettbewerbslogiken, projektspezifisch abgebildet:</strong> {MODI.join(', ')}.
              </p>
              <p>Auch komplexere Kombinationen können projektbezogen umgesetzt werden.</p>
            </TealCard>
          </Reveal>
        </div>
      </Section>

      {/* ============ Gaming + Sport ============ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-14 pt-20 md:pt-32 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tighter uppercase text-[#0b0f2a]">
            Perfekt für <span className="text-[#0e958e] italic">Gaming &amp; eSport.</span>
          </h2>
          <p className="mt-4 mb-6 text-slate-600 text-base md:text-lg font-medium leading-relaxed">
            Die Plattform ist aus dem Gaming- und eSport-Umfeld entstanden. Dementsprechend eignet sie sich für praktisch
            alle gängigen Wettbewerbstitel. Beispielsweise:
          </p>
          <InlineList items={GAMES} />
          <p className="mt-2 text-slate-600 font-medium">und weitere Titel.</p>
          <p className="mt-6 text-[#0b0f2a] font-bold">
            Von kleinen Community Cups bis zu mehrstufigen Qualifikationen und großen Live-Finals.
          </p>
        </div>
        <div>
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tighter uppercase text-[#0b0f2a]">
            Aber längst nicht mehr <span className="text-[#0e958e] italic">nur für eSport.</span>
          </h2>
          <p className="mt-4 mb-6 text-slate-600 text-base md:text-lg font-medium leading-relaxed">
            Die technische Logik hinter einem Turnier ist nicht an Gaming gebunden. Deshalb können wir dieselbe Plattform
            auch für klassische Sport- und Competition-Formate einsetzen. Zum Beispiel:
          </p>
          <InlineList items={SPORT} />
          <p className="mt-6 text-[#0b0f2a] font-bold">
            Ob Match, Runde, Qualifier, Score oder Ranking – die Wettbewerbslogik wird an das Projekt angepasst.
          </p>
        </div>
      </section>

      {/* ============ Mehr als Turniermanagement ============ */}
      <Section
        title="Mehr als"
        accent="Turniermanagement."
        intro={
          <>
            <p>Hier liegt einer der größten Unterschiede unserer Lösung.</p>
            <p className="text-[#0b0f2a] font-bold">Die Plattform kann gleichzeitig zur Marketing- und Aktivierungsplattform werden.</p>
          </>
        }
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <Reveal>
            <Tile title="Lead-Generierung" text="Registrierungsflows können gezielt für Lead-Gen aufgebaut werden. Beispielsweise:">
              <div className="mt-5">
                <p className="text-[#0b0f2a] font-bold leading-relaxed">{LEADS.join(', ')}</p>
              </div>
            </Tile>
          </Reveal>
          <Reveal delay={0.08}>
            <Tile title="Gamification" text="Zusätzliche Mechaniken können direkt in die Plattform integriert werden. Zum Beispiel:">
              <div className="mt-5">
                <Chips items={GAMIFICATION} />
              </div>
            </Tile>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold">
          So entsteht aus einem Turnier eine deutlich größere digitale Aktivierung.
        </Reveal>
      </Section>

      {/* ============ Use-Case-Flows ============ */}
      <Section
        title="Von der Messe bis zur"
        accent="Gewinnspielplattform."
        intro="Die Plattform eignet sich deshalb auch für Projekte, bei denen das Turnier gar nicht im Mittelpunkt steht."
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {FLOWS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <DarkPanel className="h-full !p-7">
                <h3 className="text-[#2dd4bf] font-black uppercase tracking-tight text-lg mb-4">{f.title}</h3>
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-white/85 text-sm font-bold">
                  {f.steps.map((s, j) => (
                    <li key={s} className="flex items-center gap-2">
                      {j > 0 && <ArrowRight className="w-3.5 h-3.5 text-[#2dd4bf]" aria-hidden="true" />}
                      {s}
                    </li>
                  ))}
                </ol>
              </DarkPanel>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Rollen ============ */}
      <Section
        title="Ein Account."
        accent="Unterschiedliche Experiences."
        accentBreak
        intro="Über individuelle Rollen und Berechtigungen können unterschiedliche Nutzergruppen innerhalb derselben Plattform arbeiten. Beispielsweise:"
      >
        <InlineList items={ROLLEN} />
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold">
          Damit kann die Plattform weit über eine reine Teilnehmerseite hinausgehen.
        </Reveal>
      </Section>

      {/* ============ Integrationen ============ */}
      <Section
        title="Login &"
        accent="Integrationen."
        intro="Auch beim Zugang muss sich nicht alles nach unserem System richten. Projektabhängig können wir unter anderem umsetzen:"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {INTEGRATIONEN.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <Tile {...t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Kommunikation ============ */}
      <Section
        title="Kommunikation direkt"
        accent="in der Plattform."
        intro="Teilnehmer müssen nicht zwischen verschiedenen Tools wechseln. Wir können projektspezifisch Kommunikationsfunktionen integrieren, zum Beispiel:"
      >
        <Chips items={KOMMUNIKATION} />
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold">
          Dadurch bleibt die komplette User Journey innerhalb der gebrandeten Plattform.
        </Reveal>
      </Section>

      {/* ============ Web / PWA / App ============ */}
      <Section title="Web. PWA." accent="App." intro="Die Plattform kann auf unterschiedlichen Ebenen ausgespielt werden.">
        <div className="grid md:grid-cols-3 gap-4">
          {AUSSPIELUNG.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <Tile {...t} />
            </Reveal>
          ))}
        </div>
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl">
          Damit lässt sich aus einer einzelnen Aktivierung bei Bedarf eine langfristige digitale Plattform entwickeln.
        </Reveal>
      </Section>

      {/* ============ Vorher / Währenddessen / Danach ============ */}
      <Section title="Vorher. Währenddessen." accent="Danach.">
        <Reveal>
          <DarkPanel>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {PHASEN.map((p, i) => (
                <div key={p.title}>
                  <div className="text-[#2dd4bf] font-black text-sm tabular-nums mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-black uppercase tracking-tight text-lg md:text-xl mb-4">{p.title}</h3>
                  <ul className="space-y-2 text-white/75 font-medium">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-10 text-white font-bold max-w-3xl">
              Die Plattform begleitet damit nicht nur den Turniertag, sondern die komplette User Journey.
            </p>
          </DarkPanel>
        </Reveal>
      </Section>

      {/* ============ Daten ============ */}
      <Section title="Daten, die" accent="weiterarbeiten." intro="Je nach Projekt können unter anderem ausgewertet werden:">
        <CellGrid items={KPIS} />
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold max-w-3xl">
          Daten können live exportiert oder über entsprechende Schnittstellen weitergegeben werden.
        </Reveal>
      </Section>

      {/* ============ Einsatzmöglichkeiten ============ */}
      <Section title="Eine Plattform." accent="Viele Einsatzmöglichkeiten." accentBreak>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EINSATZ.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(i, 5) * 0.05}>
              <ImageCard {...c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Modular ============ */}
      <Section
        title="Modular statt"
        accent="Plug-and-Play."
        intro={
          <>
            <p>Wir verkaufen keine starre Standardsoftware. Wir kombinieren bestehende Module mit individuellen Entwicklungen.</p>
          </>
        }
      >
        <div className="grid md:grid-cols-12 gap-4 items-stretch">
          <Reveal className="md:col-span-4">
            <DarkPanel className="h-full !p-7">
              <Label dark>Klein starten</Label>
              <p className="text-xl md:text-2xl font-black uppercase tracking-tight">Registrierung + Turnierbaum</p>
            </DarkPanel>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-8">
            <div className="h-full p-7 rounded-card bg-white/50 border border-white/70">
              <Label>Später erweitern um</Label>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-3 text-[#0b0f2a] font-black uppercase text-sm tracking-tight">
                {AUSBAU.map((s, j) => (
                  <li key={s} className="flex items-center gap-2">
                    {j > 0 && <ArrowRight className="w-4 h-4 text-[#0e958e]" aria-hidden="true" />}
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.1} className="mt-8 text-[#0b0f2a] text-base md:text-lg font-bold">
          Die technische Basis wächst mit dem Use Case.
        </Reveal>
      </Section>

      {/* ============ Abschluss ============ */}
      <ClosingCTA
        title="Deine Marke bleibt"
        accent="im Mittelpunkt."
        label="White-Label Projekt besprechen"
        onBooking={booking}
        onContact={contact}
      >
        <p className="text-white font-bold">
          Keine fremde Plattform. Keine sichtbaren Drittanbieter. Keine Standardlösung, die deine Marke in ein vorgegebenes
          System zwingt.
        </p>
        <p>Wir entwickeln die Plattform um deine Marke, dein Projekt und deine User Journey herum.</p>
        <p className="text-[#2dd4bf] font-black uppercase tracking-[0.15em] text-sm">Von der Registrierung bis zum Finale.</p>
      </ClosingCTA>
    </div>
  );
};
