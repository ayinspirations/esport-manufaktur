import React, { useEffect } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  CalendarCheck,
  Handshake,
  Lightbulb,
  Megaphone,
  Monitor,
  Settings,
  Search,
  Trophy,
  UserPlus,
  Users,
  Video,
  Boxes
} from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { ExpandingCTA } from './ui/expanding-cta';
import { BLOCK_GAP } from './spacing';
import { asset } from './site';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { headFor, serviceSchema } from './pageMeta';

// ---------------------------------------------------------------------------
// Money Page: eSport Turnier organisieren
// ---------------------------------------------------------------------------
// Die erste von fuenf Leistungsseiten, die auf eine Suchanfrage hin gebaut
// sind (Eventmodule, Gaming-Areas, Landingpages, Livestreams, Turniere).
// Aufbau nach Vorlage: dunkler Kopf mit Bild, dann die Ziele, die Formate,
// die Bausteine, die Plattform, die Games, die Referenzen und der Abschluss.
// ---------------------------------------------------------------------------

interface EsportTurnierPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
  scrollToSection: (id: string) => void;
  onNavigate: (page: string) => void;
}

const PATH = '/esport-turnier-organisieren';

const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';
const H2 = 'text-[clamp(28px,4vw,52px)] font-black leading-[1.02] tracking-tighter uppercase text-[#0b0f2a]';
const SUBJECT = 'eSport Turnier';

const ZIELE = [
  { icon: Megaphone, title: 'Markenaktivierung', text: 'Zielgruppen aktiv mit der Marke verbinden.' },
  { icon: Users, title: 'Community Building', text: 'Wiederkehrende Interaktion und Wettbewerb schaffen.' },
  { icon: UserPlus, title: 'Recruiting & Employer Branding', text: 'Junge Zielgruppen über Gaming erreichen.' },
  { icon: Handshake, title: 'Sponsoring', text: 'Aus Sichtbarkeit aktive Beteiligung machen.' },
  { icon: CalendarCheck, title: 'Eventaktivierung', text: 'Besucher einbinden und Verweildauer erhöhen.' },
  { icon: Search, title: 'Scouting / Vereinsturnier', text: 'Nachwuchs im eSport-Bereich entdecken und fördern.' }
];

const FORMATE = [
  {
    title: 'Offline',
    image: '/images/REWE1.jpeg',
    text: 'Turnier direkt vor Ort, zum Beispiel auf Messen, Sportevents, Fanzonen, Firmenveranstaltungen oder im Retail.'
  },
  {
    title: 'Online',
    image: '/images/intersport/hero.jpg',
    text: 'Digitale Registrierung, Brackets, Matches und Ergebnisse für große oder bundesweite Teilnehmerfelder.'
  },
  {
    title: 'Hybrid',
    image: '/images/rewe/gallery-2.jpg',
    text: 'Online qualifizieren und anschließend vor Ort das Finale spielen, als eigenständiges Event oder als Modul in einem bestehenden Event.'
  },
  {
    title: 'Turnierserie',
    image: '/images/intersport.jpg',
    text: 'Mehrere Standorte, Qualifier oder Spieltage mit gemeinsamem Finale.'
  }
];

const BAUSTEINE = [
  { icon: Lightbulb, title: 'Strategie & Konzeption', text: 'Zielgruppe, Game, Turnierformat und User Journey.' },
  { icon: Settings, title: 'Turniermanagement', text: 'Regelwerk, Bracketing, Matchplanung und Turnierleitung.' },
  { icon: Boxes, title: 'Digitale Plattform', text: 'Registrierung, Spielpläne, Rankings, Ergebnisse und Kommunikation.' },
  { icon: Monitor, title: 'Eventtechnik', text: 'Gaming-Setups, Screens, Netzwerk, Bühne und Branding.' },
  { icon: Video, title: 'Content & Live-Kommunikation', text: 'Moderation, Caster, Livestream, Foto und Video.' },
  { icon: BarChart3, title: 'Reporting', text: 'Teilnehmer, Engagement, Leads, Reichweite und weitere relevante KPIs.' }
];

const PLATTFORM = [
  { title: 'Registrierung', text: 'Teilnehmer melden sich online an.' },
  { title: 'Brackets & Ergebnisse', text: 'Spielpläne und Rankings werden digital abgebildet.' },
  { title: 'Kommunikation', text: 'Teilnehmer erhalten relevante Informationen automatisiert.' },
  { title: 'Leadgenerierung', text: 'Auf Wunsch lassen sich Registrierung und Marketing-Opt-ins miteinander verbinden.' }
];

const GAMES = [
  'EA Sports FC',
  'Rocket League',
  'Fortnite',
  'Mario Kart',
  'Valorant',
  'League of Legends',
  'Counter-Strike',
  'Call of Duty',
  'Formel 1',
  'MotoGP',
  'GT',
  'Brawl Stars',
  'Clash Royale'
];

// Referenzen mit eigener Case-Seite sind verlinkt, die uebrigen bleiben Text.
const REFERENZEN: { name: string; slug?: string }[] = [
  { name: 'BFV', slug: 'bfv' },
  { name: 'VfB Stuttgart' },
  { name: '1. FC Köln' },
  { name: 'HSV' },
  { name: 'RBLZ' },
  { name: 'REWE', slug: 'rewe' },
  { name: 'T-Systems', slug: 'tsystems' },
  { name: 'DAZN' },
  { name: 'INTERSPORT', slug: 'intersport' },
  { name: 'Sparkassen' },
  { name: 'Volksbanken' },
  { name: 'Hagebau', slug: 'hagebau' }
];

export const EsportTurnierPage: React.FC<EsportTurnierPageProps> = ({ onOpenBooking, onOpenContact, scrollToSection, onNavigate }) => {
  useDocumentHead(headFor(PATH));

  // Leistung als strukturierte Daten. Beim direkten Aufruf liegt der Block
  // schon im vorgerenderten HTML (scripts/prerender.mjs); dann wird er nur
  // uebernommen und beim Verlassen der Seite mit entfernt.
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

  const requestProject = () => onOpenContact?.(SUBJECT);

  return (
    <div className="w-full bg-[#badeda]">
      {/* ============ Kopf ============ */}
      <section
        data-nav-ground="dark"
        className="relative w-full overflow-hidden bg-[#020617] flex items-end min-h-[78vh] md:min-h-[86vh] pt-40 md:pt-52 pb-14 md:pb-24"
      >
        <img
          src={asset('/images/rewe/hero.jpg')}
          alt="eSport Turnier mit Publikum und Gaming-Setups"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Telefon: gleichmaessig abgedunkelt, damit das Bild bis zur Unterkante sichtbar
            bleibt. Breite Schirme: Verlauf hinter dem Text, Bild rechts frei. */}
        <div className="sm:hidden absolute inset-0 bg-[#020617]/60" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-[#020617]/20" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent" />

        <div className={`${CONTAINER} relative z-10 w-full`}>
          <Reveal duration={0.6} className="text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-5 md:mb-7">
            eSport &amp; Gaming Turniere
          </Reveal>
          <h1 className="text-[clamp(30px,5vw,68px)] font-black leading-[0.92] tracking-tighter uppercase text-white max-w-5xl">
            {/* Der Suchbegriff steht fuer Suchmaschinen mit in der H1. */}
            <span className="sr-only">eSport Turnier organisieren: </span>
            <RevealText as="span" by="word" text="Dein Partner für" delay={0.05} className="block" />
            {' '}
            <RevealText as="span" by="word" text="eSport- & Gaming‑Turniere." delay={0.18} className="block text-[#2dd4bf] italic" />
          </h1>
          <Reveal as="p" delay={0.38} className="mt-5 text-[#2dd4bf] font-black uppercase tracking-[0.2em] text-xs md:text-sm">
            Online. Offline. Hybrid.
          </Reveal>
          <Reveal delay={0.44} className="mt-8 md:mt-10">
            <ExpandingCTA label="Turnier Projekt besprechen" tone="light" onBooking={() => onOpenBooking?.()} onContact={requestProject} />
          </Reveal>
        </div>
      </section>

      {/* Einleitung: steht auf allen Geraeten unter dem Kopf; der Hero traegt
          nur Ueberschrift, Formate und CTA. */}
      <div className={`${CONTAINER} ${BLOCK_GAP}`}>
        <div className="max-w-3xl text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-3">
          <p className="text-[#0b0f2a] font-black text-lg md:text-2xl tracking-tight leading-snug">
            Von der Idee bis zur professionellen Umsetzung.
          </p>
          <p>
            Du hast bereits ein konkretes Turnierkonzept und suchst einen erfahrenen Umsetzungspartner? Oder du möchtest
            ein eSport- oder Gaming-Turnier durchführen und brauchst noch das passende Format?
          </p>
          <p>
            Wir steigen genau dort ein, wo du uns brauchst und begleiten Marken, Unternehmen, Vereine, Verbände und
            Veranstalter von der Idee bis zur Umsetzung.
          </p>
        </div>
      </div>

      {/* ============ Mehr als nur ein Turnier ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <h2 className={H2}>
          Mehr als nur ein <span className="text-[#0e958e] italic">Turnier.</span>
        </h2>
        <Reveal as="p" delay={0.08} className="mt-4 text-slate-600 text-base md:text-lg font-medium">
          Ein eSport Turnier kann unterschiedliche Ziele erfüllen:
        </Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {ZIELE.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={Math.min(i, 4) * 0.05} className="text-center flex flex-col items-center">
              <Icon className="w-8 h-8 text-[#0e958e] mb-4" strokeWidth={1.6} />
              <h3 className="text-[#0b0f2a] font-black text-sm md:text-base tracking-tight leading-snug mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium max-w-[200px]">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Formate ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <h2 className={H2}>
          Das passende <span className="text-[#0e958e] italic">Format.</span>
        </h2>
        <Reveal as="p" delay={0.08} className="mt-4 text-slate-600 text-base md:text-lg font-medium">
          Das passende Format für dein Projekt.
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FORMATE.map((f, i) => (
            <Reveal key={f.title} delay={Math.min(i, 4) * 0.06}>
              <div className="group relative h-full min-h-[260px] sm:min-h-[340px] rounded-card overflow-hidden bg-[#020617] flex flex-col justify-end">
                <img
                  src={asset(f.image)}
                  alt={`eSport Turnier ${f.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/75 to-[#020617]/10" />
                <div className="relative p-6">
                  <h3 className="text-white font-black text-xl uppercase tracking-tight mb-2">{f.title}</h3>
                  {/* Mindesthoehe = laengster Text der Reihe, damit alle Titel auf einer Hoehe stehen. */}
                  <p className="text-white/70 text-sm leading-relaxed font-medium sm:min-h-[4.9em] lg:min-h-[9.8em]">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Alles aus einer Hand + Plattform ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <h2 className={H2}>
          Alles aus einer <span className="text-[#0e958e] italic">Hand.</span>
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BAUSTEINE.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={Math.min(i, 5) * 0.05}>
              <div className="h-full flex gap-4 p-6 rounded-card bg-white/50 border border-white/70">
                <Icon className="shrink-0 w-7 h-7 text-[#0e958e]" strokeWidth={1.6} />
                <div>
                  <h3 className="text-[#0b0f2a] font-black text-sm md:text-base uppercase tracking-tight mb-1.5">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-6">
          <div className="tile-gradient text-white rounded-card border border-white/10 p-7 md:p-12">
            <h3 className="text-[clamp(24px,3vw,40px)] font-black uppercase tracking-tighter leading-[1.05]">
              Dein Turnier bekommt ein <span className="text-[#2dd4bf] italic">digitales Zuhause.</span>
            </h3>
            <p className="mt-4 text-white/65 text-base md:text-lg font-medium max-w-2xl">
              Unsere White-Label-Lösungen verbinden das Turnier mit einer digitalen Plattform.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLATTFORM.map((p) => (
                <div key={p.title}>
                  <div className="flex items-center gap-2 text-[#2dd4bf] font-black text-sm uppercase tracking-tight mb-2">
                    <Trophy className="w-4 h-4" /> {p.title}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed font-medium">{p.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-white/80 font-black text-[11px] md:text-xs uppercase tracking-[0.2em]">
              White-Label · DSGVO-konform · Hosting in Deutschland · CRM/API
            </p>
            <a
              href="/white-label-turnierplattform"
              onClick={(e) => { e.preventDefault(); onNavigate('white-label-turnierplattform'); }}
              className="mt-6 inline-flex items-center gap-2 text-[#2dd4bf] font-black text-sm uppercase tracking-wider hover:text-white transition-colors"
            >
              Mehr zur White-Label Turnierplattform <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ============ Games ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <h2 className={H2}>
          Das richtige Game für die richtige <span className="text-[#0e958e] italic">Zielgruppe.</span>
        </h2>
        <Reveal as="p" delay={0.08} className="mt-4 text-slate-600 text-base md:text-lg font-medium">
          Wir entwickeln Turniere unter anderem für:
        </Reveal>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {GAMES.map((g, i) => (
            <Reveal key={g} delay={Math.min(i, 6) * 0.04}>
              <div className="tile-gradient h-28 md:h-36 rounded-card border border-white/10 flex items-end p-4">
                <span className="text-white font-black text-xs md:text-sm uppercase tracking-tight leading-tight">{g}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" delay={0.1} className="mt-6 text-[#0b0f2a] text-base md:text-lg font-bold">
          Dein Spiel ist nicht dabei? Dann sprich uns an. Unsere Expertise geht weit über diese Spieletitel hinaus.
        </Reveal>
      </section>

      {/* ============ Referenzen ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <h2 className={H2}>
          Erfahrung aus <span className="text-[#0e958e] italic">Sport, Gaming & Markenaktivierung.</span>
        </h2>
        <Reveal as="p" delay={0.08} className="mt-5 text-slate-600 text-base md:text-lg font-medium max-w-3xl leading-relaxed">
          Wir begleiten seit Jahren Gaming- und eSport-Projekte für Vereine, Verbände, Unternehmen und Marken.
        </Reveal>
        <Reveal as="p" delay={0.14} className="mt-4 text-[#0b0f2a] text-base md:text-lg font-bold max-w-4xl leading-relaxed">
          Referenzen unter anderem:{' '}
          {REFERENZEN.map((ref, i) => (
            <React.Fragment key={ref.name}>
              {ref.slug ? (
                <a
                  href={`/best-cases/${ref.slug}`}
                  onClick={(e) => { e.preventDefault(); onNavigate(ref.slug!); }}
                  className="underline decoration-[#0e958e]/50 underline-offset-4 hover:text-[#0e958e] transition-colors"
                >
                  {ref.name}
                </a>
              ) : (
                ref.name
              )}
              {' · '}
            </React.Fragment>
          ))}
          und viele mehr
        </Reveal>
        <Reveal delay={0.2} className="mt-8">
          <button
            onClick={() => scrollToSection('best-cases')}
            className="spring inline-flex items-center gap-2 rounded-full border border-[#0b0f2a]/25 px-6 py-3 text-[#0b0f2a] text-xs font-black uppercase tracking-widest hover:bg-[#0b0f2a] hover:text-white transition-colors duration-500"
          >
            Cases entdecken <ArrowUpRight className="w-4 h-4" />
          </button>
        </Reveal>
      </section>

      {/* ============ Abschluss ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP} pb-20 md:pb-28`}>
        <div data-nav-ground="dark" className="tile-gradient rounded-card border border-white/10 p-8 md:p-14 text-white">
          <p className="text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-5">
            Create. Engage. Empower.
          </p>
          <h2 className="text-[clamp(28px,4.4vw,58px)] font-black uppercase tracking-tighter leading-[1.02] max-w-3xl">
            Dein nächstes Turnier beginnt <span className="text-[#2dd4bf] italic">mit einem Ziel.</span>
          </h2>
          <p className="mt-5 text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
            Ob Community Cup, Recruiting-Turnier, Sponsoring-Aktivierung, Scouting-Format oder Live-Finale: Gemeinsam
            entwickeln wir das Format, das zu deiner Zielgruppe und deinem Projekt passt.
          </p>
          <div className="mt-8 md:mt-10">
            <ExpandingCTA label="Turnier Projekt besprechen" tone="light" onBooking={() => onOpenBooking?.()} onContact={requestProject} />
          </div>
        </div>
      </section>
    </div>
  );
};
