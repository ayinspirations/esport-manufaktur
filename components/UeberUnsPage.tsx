import React from 'react';
import { Reveal, RevealText } from './Reveal';
import { PageHero } from './PageHero';
import { STAGGER } from './motion';

interface UeberUnsPageProps {
  onNavigate: (page: any) => void;
  scrollToSection: (id: string) => void;
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

/** The team photograph, behind the page header. Purpose.tsx carries its own
    copy of the path on purpose -- this module is lazily loaded, and importing
    from it would pull the whole "Über uns" chunk into the homepage bundle. */
const TEAM_IMAGE = '/Sportmanufaktur_team.jpg';

// Same three constants the service detail pages are built on, so this page
// inherits their rhythm rather than inventing its own.
const CANVAS = 'bg-[#badeda]';
const SECTION = 'py-12 md:py-16 lg:py-20';
const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';

const intro = [
  'Die GG Manufaktur ist eine Agentur für Gaming, eSport, Gamification und interaktive Markenaktivierung. Wir entwickeln Lösungen für Unternehmen, Marken, Vereine, Verbände und Veranstalter, die ihre Zielgruppen nicht nur erreichen, sondern aktiv einbinden wollen. Dabei denken wir physische und digitale Touchpoints von Anfang an gemeinsam.',
  'Von der ersten strategischen Idee über Konzeption, Design und Technologie bis zur Umsetzung vor Ort begleiten wir Projekte ganzheitlich. Das kann ein einzelnes gamifiziertes Messemodul sein, ein digitaler Eventpass, ein eSport-Turnier, eine Recruiting-Kampagne oder die vollständige Konzeption und Umsetzung eines Events.'
];

const capabilities = [
  {
    heading: 'Eigene Software, angepasst statt von der Stange',
    body: 'Unsere modularen Software-Komponenten ermöglichen es uns, digitale Lösungen flexibel auf Marken, Zielgruppen und Anwendungsfälle anzupassen. Wo Standardmodule nicht ausreichen, entwickeln wir individuelle Funktionen und Experiences.'
  },
  {
    heading: 'Operative Erfahrung vor Ort',
    body: 'Gemeinsam mit spezialisierten Partnern realisieren wir Gaming-Setups, Messebau, Veranstaltungstechnik, Streaming, Foto- und Videoproduktion sowie komplette Event-Infrastrukturen. Konzepte bleiben bei uns nicht auf der Folie.'
  },
  {
    heading: 'Content, der aktiviert statt begleitet',
    body: 'Wir übersetzen Produkte und Markenbotschaften in interaktive und gamifizierte Formate, die unterhalten, aktivieren und im Gedächtnis bleiben. Creator, Hosts und eSport-Talents integrieren wir dort, wo sie einen echten Mehrwert für Zielgruppe und Kampagne schaffen.'
  },
  {
    heading: 'Scouting, Talente und Employer Branding',
    body: 'Für Vereine und Verbände entwickeln wir digitale und physische Scouting- und Talent-Development-Lösungen. Unternehmen unterstützen wir dabei, Gaming, eSport und Gamification für Employer Branding und Recruiting einzusetzen und neue Zugänge zu jungen, digital affinen Zielgruppen zu schaffen.'
  }
];

interface Member {
  name: string;
  role: string;
  /** Drop a file in here when a portrait exists; the monogram is the fallback. */
  image?: string;
}

// Founders first, then the rest of the team. Plain array -- reorder here.
const team: Member[] = [
  { name: 'Gianluca', role: 'Founder & CEO' },
  { name: 'Sandro', role: 'Co-Founder & Operations' },
  { name: 'Patrick', role: 'Sales & Partnerships' },
  { name: 'Sandra', role: 'Operations' },
  { name: 'Manuela', role: 'Backoffice' },
  { name: 'Shayan', role: 'Developer' },
  { name: 'Akan', role: 'Website' },
  { name: 'Mark', role: 'Graphics & Designs' },
  { name: 'Yannik', role: 'Bilder & Videomacher' },
  { name: 'Chris', role: 'Community Support' },
  { name: 'Silas', role: 'Helping Hand' }
];

// Monogram avatars until real portraits exist. Two tones from the CI, alternating
// so a row of eleven discs has some rhythm without turning into a colour wheel.
// Both carry their initial well above contrast minimum.
const AVATAR_TONES = [
  'bg-[#0b0f2a] text-white',
  'bg-[#0e958e] text-[#0b0f2a]'
];

const Avatar: React.FC<{ member: Member; index: number }> = ({ member, index }) =>
  member.image ? (
    <img
      src={member.image}
      alt={member.name}
      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-1 ring-[#0b0f2a]/10"
    />
  ) : (
    <div
      aria-hidden="true"
      className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-black text-2xl md:text-3xl tracking-tighter select-none ring-1 ring-[#0b0f2a]/10 ${
        AVATAR_TONES[index % AVATAR_TONES.length]
      }`}
    >
      {member.name.charAt(0)}
    </div>
  );

export const UeberUnsPage: React.FC<UeberUnsPageProps> = () => {
  return (
    <div className="w-full">
      {/* ============ 1. HERO ============ */}
      {/* The same header every other route carries now -- homepage ground,
          white type -- with the team photograph behind it. */}
      <PageHero
        eyebrow="GG Manufaktur"
        title="Über"
        accent="uns."
        subline="Wir machen Marken und Botschaften erlebbar."
        image={TEAM_IMAGE}
        imageAlt="Das Team der GG Manufaktur"
      />

      {/* ============ 2. WER WIR SIND ============ */}
      <section className={`${CANVAS} ${SECTION} pt-16 md:pt-20`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]">
                <RevealText as="span" by="word" text="Wer wir" />
                <RevealText as="span" by="word" text="sind." className="text-[#0e958e] italic" delay={0.14} />
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6">
              {intro.map((paragraph, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={i * STAGGER.line}
                  className="text-[#0b0f2a]/75 text-lg md:text-xl leading-relaxed font-medium tracking-tight"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. WIE WIR ARBEITEN ============ */}
      <section className={`${CANVAS} ${SECTION} pt-0`}>
        <div className={CONTAINER}>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a] mb-8 md:mb-12">
            <RevealText as="span" by="word" text="Wie wir" />
            <RevealText as="span" by="word" text="arbeiten." className="text-[#0e958e] italic" delay={0.14} />
          </h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12">
            {capabilities.map((item, i) => (
              <Reveal key={item.heading} delay={(i % 2) * STAGGER.card} y={28}>
                <h3 className="text-[clamp(20px,2.4vw,28px)] font-black tracking-tighter text-[#0b0f2a] mb-4 leading-tight">
                  {item.heading}
                </h3>
                <p className="text-[#0b0f2a]/70 text-base md:text-lg leading-relaxed font-medium tracking-tight">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-12 md:mt-14 pt-8 border-t border-[#0b0f2a]/15">
            <p className="text-[#0b0f2a] font-bold text-xl md:text-2xl leading-snug tracking-tight max-w-3xl">
              Unser Anspruch: Strategie, Technologie und Erlebnis so miteinander zu verbinden, dass aus
              Aufmerksamkeit echte Interaktion entsteht.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ 4. DAS TEAM ============ */}
      <section className={`${CANVAS} ${SECTION} pt-0 pb-20 md:pb-28`}>
        <div className={CONTAINER}>
          <div className="max-w-2xl mb-8 md:mb-12">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]">
              <RevealText as="span" by="word" text="Das Team" />
              <RevealText as="span" by="word" text="dahinter." className="text-[#0e958e] italic" delay={0.14} />
            </h2>
            <Reveal as="p" delay={0.3} className="text-[#0b0f2a]/70 text-base md:text-lg mt-5 leading-relaxed font-medium tracking-tight">
              Strategie, Technik, Produktion und Content sitzen bei uns am selben Tisch.
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-12">
            {team.map((member, i) => (
              <Reveal
                as="li"
                key={member.name}
                // Stagger by column so a row arrives together instead of the
                // grid unzipping one tile at a time down eleven people.
                delay={(i % 4) * STAGGER.card}
                y={24}
                className="flex flex-col items-center text-center"
              >
                <Avatar member={member} index={i} />
                <div className="mt-5 font-black text-lg md:text-xl tracking-tighter text-[#0b0f2a]">
                  {member.name}
                </div>
                <div className="mt-1 text-[#0a6f6a] text-[11px] md:text-xs font-black uppercase tracking-[0.18em] leading-snug">
                  {member.role}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
};
