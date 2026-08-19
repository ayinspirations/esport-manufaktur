import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { HeroGround } from './HeroGround';
import { STAGGER } from './motion';

interface UeberUnsPageProps {
  onNavigate: (page: any) => void;
  scrollToSection: (id: string) => void;
  onOpenBooking?: () => void;
}

// Same three constants the service detail pages are built on, so this page
// inherits their rhythm rather than inventing its own.
const CANVAS = 'bg-[#badeda]';
const SECTION = 'py-20 md:py-28 lg:py-32';
const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';

const intro = [
  'Die eSport Manufaktur ist eine Agentur für Gaming, eSport, Gamification und interaktive Markenaktivierung. Wir entwickeln Lösungen für Unternehmen, Marken, Vereine, Verbände und Veranstalter, die ihre Zielgruppen nicht nur erreichen, sondern aktiv einbinden wollen. Dabei denken wir physische und digitale Touchpoints von Anfang an gemeinsam.',
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

export const UeberUnsPage: React.FC<UeberUnsPageProps> = ({ onNavigate, scrollToSection, onOpenBooking }) => {
  const goToContact = () => {
    onNavigate('home');
    requestAnimationFrame(() => scrollToSection('contact-section'));
  };

  return (
    <div className="w-full">
      {/* ============ 1. HERO ============ */}
      {/* The other subpages open on a full-bleed photo. There is no photograph
          of the agency to run here, and a stock crowd shot would be a worse
          answer than none -- so this one opens on the homepage hero's own
          ground instead, which keeps the entrance recognisably ours. Swap in
          an <img> layer here the day a real team photo exists. */}
      <section
        data-nav-ground="dark"
        className="relative w-full min-h-[70vh] md:min-h-[78vh] flex items-end overflow-hidden bg-[#020617]"
      >
        <HeroGround />

        <div className={`relative z-10 w-full ${CONTAINER} pb-16 md:pb-24 pt-32 text-white`}>
          <Reveal duration={0.6}>
            <button
              onClick={() => onNavigate('home')}
              className="group inline-flex items-center gap-2 mb-10 md:mb-14 text-white/70 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Zur Startseite
            </button>
          </Reveal>

          <h1 className="text-[clamp(44px,8vw,110px)] font-black leading-[0.9] tracking-tighter uppercase">
            <RevealText as="span" by="word" text="Über" delay={0.05} />
            <RevealText as="span" by="word" text="uns." delay={0.18} className="text-[#0e958e] italic" />
          </h1>

          <Reveal duration={0.75} delay={0.3}>
            <p className="mt-6 md:mt-8 text-white/70 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-2xl tracking-tight">
              Wir machen Marken und Botschaften erlebbar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ 2. WER WIR SIND ============ */}
      <section className={`${CANVAS} ${SECTION}`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
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
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a] mb-12 md:mb-16">
            <RevealText as="span" by="word" text="Wie wir" />
            <RevealText as="span" by="word" text="arbeiten." className="text-[#0e958e] italic" delay={0.14} />
          </h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
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

          <Reveal delay={0.2} className="mt-16 md:mt-20 pt-10 border-t border-[#0b0f2a]/15">
            <p className="text-[#0b0f2a] font-bold text-xl md:text-2xl leading-snug tracking-tight max-w-3xl">
              Unser Anspruch: Strategie, Technologie und Erlebnis so miteinander zu verbinden, dass aus
              Aufmerksamkeit echte Interaktion entsteht.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ 4. DAS TEAM ============ */}
      <section className={`${CANVAS} ${SECTION} pt-0`}>
        <div className={CONTAINER}>
          <div className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]">
              <RevealText as="span" by="word" text="Das Team" />
              <RevealText as="span" by="word" text="dahinter." className="text-[#0e958e] italic" delay={0.14} />
            </h2>
            <Reveal as="p" delay={0.3} className="text-[#0b0f2a]/70 text-base md:text-lg mt-5 leading-relaxed font-medium tracking-tight">
              Strategie, Technik, Produktion und Content sitzen bei uns am selben Tisch.
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-14">
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

      {/* ============ 5. CTA-CLOSER ============ */}
      <section className={`${CANVAS} ${SECTION} pt-0 pb-28 md:pb-36`}>
        <div className={`${CONTAINER} text-center`}>
          <div className="max-w-2xl mx-auto">
            <RevealText
              as="h2"
              by="word"
              text="Lernen wir uns kennen."
              className="text-[clamp(30px,4.5vw,56px)] font-black leading-[1.05] tracking-tighter mb-10 text-[#0b0f2a]"
            />
          </div>
          <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => (onOpenBooking ? onOpenBooking() : goToContact())}
              className="spring group inline-flex items-center gap-2.5 bg-[#0b0f2a] hover:bg-[#0e958e] text-white px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight"
            >
              Termin vereinbaren
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={goToContact}
              className="spring inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0b0f2a]/[0.06] text-[#0b0f2a] border border-[#0b0f2a]/20 hover:border-[#0b0f2a]/35 px-7 py-4 rounded-full font-bold text-sm sm:text-base tracking-tight"
            >
              Zum Kontaktformular
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
