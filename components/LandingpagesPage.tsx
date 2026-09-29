import React from 'react';
import { ArrowUpRight, Building2, Check, Landmark, Trophy, Users } from 'lucide-react';
import { Reveal } from './Reveal';
import { MoneyPage } from './money/AutoReveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { PAGE_META, headFor } from './pageMeta';
import { Chips, ClosingCTA, Faq, MoneyHero, Section, Tile } from './money/ui';

// ---------------------------------------------------------------------------
// Money Page: Landingpages
// ---------------------------------------------------------------------------

interface LandingpagesPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
  scrollToSection: (id: string) => void;
}

const PATH = '/landingpages';

const BEISPIELE = [
  {
    title: 'SSB Gaming Cup',
    tags: ['Recruiting', 'Azubi-Cup', 'Öffentlicher Verkehr'],
    text: 'Recruiting-Landingpage der Stuttgarter Straßenbahnen für ihren Gaming Cup. Anmeldung, Feedback-Channel und Ausbildungs-Infos auf einer Seite.',
    url: 'https://ssb-gaming-cup.de/'
  },
  {
    title: 'Sparkassen eSport-Cup',
    tags: ['Sparkassen-CD', 'Multi-Region', 'Filial-Cup'],
    text: 'Dachseite für die Cups der teilnehmenden Sparkassen. Aktuelle Turniere, Anmeldungen und Termin-Übersicht zentral verwaltet.',
    url: 'https://sparkasse.esport-event.de/'
  },
  {
    title: 'VR eSports Cup',
    tags: ['VR-CD', 'Genossenschaft', 'Multi-Bank'],
    text: 'Zentrale Landingpage der Volks- und Raiffeisenbanken. Spielpläne, Tabellen und Livestreams aller laufenden Bank-Cups an einem Ort.',
    url: 'https://vr-esports-cup.de/'
  },
  {
    title: 'TSG eChampion',
    tags: ['Bundesliga-CD', 'Fan-Engagement', 'eFootball'],
    text: 'Turnierseite der TSG Hoffenheim für die Fan-Cup-Serie. Im Vereins-Look mit Sponsoren-Integration und Live-Brackets.',
    url: 'https://tsg.esport-event.de/'
  },
  {
    title: 'Centrum Galerie Dresden',
    tags: ['Retail-Frequenz', 'Gaming Days', 'Zonen-Konzept'],
    text: 'Frequenz-Treiber fürs Shopping-Center: zweitägige Gaming Days mit Zonen, Challenges und Programm. Anmeldung direkt auf der Seite.',
    url: 'https://centrum-galerie-dresden.esport-event.de/'
  },
  {
    title: 'AOK Gaming Tour',
    tags: ['Krankenkasse', 'Firmenliga', 'Recruiting'],
    text: 'Firmenteam-Cup im Borussia-Park für die AOK Rheinland/Hamburg. Team-Anmeldung, Spielort-Info und FAQ kompakt aufbereitet.',
    url: 'https://aok.esport-event.de/'
  }
];

const ANLAESSE = [
  {
    icon: Landmark,
    title: 'Regionalbanken',
    text: 'Community-Turnier mit Filialübersicht, Anmeldungen und Live-Tabellen. Alles auf einer Seite.',
    points: ['Filial-Brackets', 'Anmelde-Formular', 'Live-Tabellen']
  },
  {
    icon: Trophy,
    title: 'Sportvereine',
    text: 'Fan-Engagement-Aktion mit Sponsoren-Integration im Vereins-Design.',
    points: ['Fan-Aktion', 'Sponsoren-Slots', 'Vereins-Branding']
  },
  {
    icon: Building2,
    title: 'Arbeitgebermarken',
    text: 'Recruiting-Event mit Lead-Funnel, von der Anmeldung bis zum Bewerber-Eintrag im ATS.',
    points: ['Recruiting-Funnel', 'ATS-Schnittstelle', 'Employer Branding']
  },
  {
    icon: Users,
    title: 'Kommunen',
    text: 'Jugendprojekt mit niedrigschwelliger Anmeldung, auch ohne Account.',
    points: ['Public-Event', 'Jugendarbeit', 'Niedrige Hürde']
  }
];

export const LandingpagesPage: React.FC<LandingpagesPageProps> = ({ onOpenBooking, onOpenContact, scrollToSection }) => {
  useDocumentHead(headFor(PATH));
  useStructuredData(PATH);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('Landingpage');
  const toBeispiele = () => document.getElementById('beispiele')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <MoneyPage>
      <MoneyHero
        eyebrow="Landingpages · Conversion-optimiert"
        title="Maximale Sichtbarkeit, reibungslose Abläufe und deine"
        accent="maßgeschneiderte Gaming-Landingpage."
        body={
          <>
            <p>
              Ein erstklassiges Gaming-Event verdient eine erstklassige digitale Bühne. Wir erstellen für dein Unternehmen
              performante Landingpages, die mehr sind als nur eine Informationsquelle.
            </p>
            <p>
              Im Entertainment-Sektor erreichen optimierte Landingpages eine mediane Conversion-Rate von 12,3 % (Unbounce
              Conversion Benchmark Report).
            </p>
          </>
        }
        image="/images/showcase/kreissparkasse-boeblingen.jpg"
        imageAlt="Gaming Cup einer Sparkasse mit eigener Event-Landingpage"
        label="Jetzt anfragen"
        onBooking={booking}
        onContact={contact}
        secondary={{ label: 'Beispiele ansehen', href: '#beispiele', onClick: toBeispiele }}
      />

      {/* ============ Live-Beispiele ============ */}
      <Section
        id="beispiele"
        title="Sechs Landingpages,"
        accent="die wir gebaut haben."
        intro={
          <>
            <p className="text-[#0e958e] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Live-Beispiele</p>
            <p>
              Vom Bundesliga-Verein über die Konzern-Bank bis zum Retail-Riesen: jede Page individuell, im Corporate Design
              und mit allen Tools, die der Veranstalter braucht. Klicke dich rein, alle Beispiele öffnen sich live.
            </p>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BEISPIELE.map((b, i) => (
            <Reveal key={b.title} delay={Math.min(i, 5) * 0.05}>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                data-track="outbound_click"
                data-track-label={`landingpage_${b.title}`}
                className="group h-full flex flex-col tile-gradient text-white rounded-card border border-white/10 p-7 transition-transform duration-500 hover:scale-[1.02]"
              >
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{b.title}</h3>
                <Chips items={b.tags} dark />
                <p className="mt-5 text-white/70 text-sm leading-relaxed font-medium flex-1">{b.text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[#2dd4bf] font-black text-xs uppercase tracking-widest">
                  Live ansehen <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Anlässe ============ */}
      <Section
        title="Vier Anlässe, in denen sich eine"
        accent="Event-Landingpage auszahlt."
        intro={<p className="text-[#0e958e] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Für wen wir Landingpages bauen</p>}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ANLAESSE.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <Tile icon={a.icon} title={a.title} text={a.text}>
                <ul className="mt-5 space-y-2">
                  {a.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-[#0b0f2a] text-sm font-bold">
                      <Check className="w-4 h-4 text-[#0e958e]" /> {pt}
                    </li>
                  ))}
                </ul>
              </Tile>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ FAQ ============ */}
      <Section title="FAQ zu" accent="Landingpages.">
        <Faq items={PAGE_META[PATH].faq ?? []} />
      </Section>

      {/* ============ Abschluss ============ */}
      <ClosingCTA
        title="Lass uns deine"
        accent="Event-Bühne bauen."
        label="Jetzt anfragen"
        onBooking={booking}
        onContact={contact}
        secondary={{ label: 'Beispiele in der Praxis', href: '/#best-cases', onClick: () => scrollToSection('best-cases') }}
      >
        <p className="text-[#2dd4bf] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Bereit für deine Landingpage?</p>
        <p>Conversion-optimiert. DSGVO-konform. Mobile-First. Im Look deiner Marke.</p>
      </ClosingCTA>
    </MoneyPage>
  );
};
