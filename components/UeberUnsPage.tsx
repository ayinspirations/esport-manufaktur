import React, { useState } from 'react';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { PageHero } from './PageHero';
import { BLOCK_GAP } from './spacing';
import { STAGGER } from './motion';

interface UeberUnsPageProps {
  onNavigate: (page: any) => void;
  scrollToSection: (id: string) => void;
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

/**
 * Das Portraet des Gruenders fuer die Geschichten-Kachel.
 *
 * Dieselbe Datei, die auch seine Team-Kachel traegt -- eine Aufnahme, ein Pfad,
 * und ein Austausch wirkt an beiden Stellen.
 *
 * Leer gelassen zeigt die Kachel einen sichtbar markierten Platzhalter statt
 * eines kaputten Bildes; so war sie presentabel, bis das Foto da war.
 */
const GIANLUCA_IMAGE = '/team/gianluca.jpg';

/** The team photograph, behind the page header. Purpose.tsx carries its own
    copy of the path on purpose -- this module is lazily loaded, and importing
    from it would pull the whole "Über uns" chunk into the homepage bundle. */
const TEAM_IMAGE = '/Sportmanufaktur_team.jpg';

// The same three constants the service pages are built on, so this page
// inherits their rhythm rather than inventing its own. BLOCK_GAP is top
// padding only -- see spacing.ts for why.
const CANVAS = 'bg-[#badeda]';
const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';

const intro = [
  'Die GG Manufaktur ist aus der eSport Manufaktur entstanden. Unsere Wurzeln liegen in Gaming und eSport – in einer Welt, in der Beteiligung, Gemeinschaft und echte Begeisterung entscheidend sind.',
  'Mit unseren Projekten und den Anforderungen unserer Kunden ist auch unser Leistungsfeld gewachsen. Heute entwickeln wir weit über Gaming und eSport hinaus Lösungen für Aktivierung, Engagement und Kommunikation. Denn nicht jede Aufgabe braucht ein digitales Tool, ein Turnier oder eine Gaming-Mechanik. Manchmal ist ein Kartenspiel, ein Quiz, eine Live-Challenge oder ein ganz anderer Ansatz die bessere Lösung.',
  'Entscheidend ist für uns nicht, welche Leistung wir verkaufen können, sondern was das jeweilige Vorhaben wirklich braucht.'
];

/** "Wie wir arbeiten" -- a lead line, then the body. */
const ARBEIT_LEAD = 'Wir starten nicht mit einem fertigen Produkt, sondern mit dem Ziel.';

const arbeit = [
  'Was soll erreicht werden? Wen wollen wir einbeziehen? Und welches Format passt wirklich zur Aufgabe? Auf dieser Grundlage entwickeln wir die passende Lösung – unabhängig davon, ob daraus ein Event, eine Kampagne, ein digitales Tool oder eine ganz andere Form der Aktivierung entsteht.',
  'Dabei verbinden wir Strategie, Kreation, Technologie und operative Umsetzung. Unser Kernteam übernimmt die zentrale Steuerung und ergänzt die benötigten Kompetenzen durch ein gewachsenes Netzwerk spezialisierter Partner.',
  'So erhalten unsere Kunden einen festen Ansprechpartner, klare Verantwortlichkeiten und genau die Expertise, die das jeweilige Projekt benötigt. Und wenn wir für ein Vorhaben nicht der richtige Partner sind, sagen wir das offen.'
];

/** "Das Team dahinter" -- same shape: a lead line, then the body. */
const TEAM_LEAD = 'Unterschiedliche Kompetenzen. Ein gemeinsames Verständnis.';

const teamIntro = [
  'Hinter der GG Manufaktur stehen Menschen aus Strategie, Projektmanagement, Entwicklung, Design, Produktion, Content und Community Management. Was uns verbindet, ist der Anspruch, gute Ideen nicht nur zu entwickeln, sondern sie auch zuverlässig in die Realität zu bringen.',
  'Wir arbeiten direkt, verbindlich und auf Augenhöhe – untereinander genauso wie mit unseren Kunden und Partnern. Die Menschen, die ein Projekt konzipieren, bleiben auch während der Umsetzung ansprechbar. So gehen keine Informationen verloren und aus einer ersten Idee kann Schritt für Schritt ein funktionierendes Ergebnis entstehen.'
];

interface Member {
  name: string;
  role: string;
  /** Drop a file in here when a portrait exists; the monogram is the fallback. */
  image?: string;
  /**
   * Wo im Bild die Person steht, als object-position.
   *
   * Voreingestellt ist die Mitte auf einem Viertel Hoehe -- das passt fuer ein
   * Portraet. Nicht jede Aufnahme ist eines: Gianlucas Foto ist eine
   * Buehnensituation im Querformat, auf der er rechts steht, und ein
   * mittiger Zuschnitt zeigt die Wand hinter ihm.
   */
  focus?: string;
}

// Founders first, then the rest of the team. Plain array -- reorder here.
//
// Die Portraets liegen unter /team/<vorname>.jpg -- klein geschrieben, ohne
// Umlaute und ohne Leerzeichen. Dateinamen wie "Sandra Weiser.JPG" gehen in
// einer URL zwar auch, aber das Leerzeichen muss kodiert werden und die
// Groszschreibung der Endung ist auf manchen Servern signifikant; beides ist
// ein Fehler, den niemand sucht. Wer kein Bild hat, bekommt sein Monogramm --
// dafuer ist nichts weiter zu tun als die Zeile hier ohne `image` zu lassen.
const team: Member[] = [
  { name: 'Gianluca', role: 'Founder & CEO', image: '/team/gianluca.jpg', focus: '68% 16%' },
  { name: 'Sandro', role: 'Co-Founder & Operations' },
  { name: 'Patrick', role: 'Sales & Partnerships' },
  { name: 'Sandra', role: 'Operations', image: '/team/sandra.jpg' },
  { name: 'Manuela', role: 'Backoffice' },
  { name: 'Shayan', role: 'Developer' },
  { name: 'Akan', role: 'Website', image: '/team/akan.jpg' },
  { name: 'Mark', role: 'Graphics & Designs', image: '/team/mark.jpg' },
  { name: 'Yannik', role: 'Bilder & Videomacher', image: '/team/yannik.jpg' },
  { name: 'Chris', role: 'Community Support', image: '/team/chris.jpg' },
  { name: 'Silas', role: 'Helping Hand' }
];

// Monogram avatars until real portraits exist. Two tones from the CI, alternating
// so a row of eleven discs has some rhythm without turning into a colour wheel.
// Both carry their initial well above contrast minimum.
const AVATAR_TONES = [
  'bg-[#0b0f2a] text-white',
  'bg-[#0e958e] text-[#0b0f2a]'
];

/**
 * Eine Person als Kachel.
 *
 * Vorher war es ein rundes Bildchen mit Name und Rolle darunter -- elf Zeilen
 * Text in einem Raster, das dadurch mehr nach Adressbuch aussah als nach Team.
 * Jetzt traegt die Kachel das Bild in voller Flaeche, und der Name liegt darin:
 * beim Zeigen faehrt das Bild eine Spur heran und der Name kommt mit dem
 * Schleier von unten herauf.
 *
 * Auf dem Telefon gibt es kein Zeigen, also steht dort beides von Anfang an --
 * ein Name, den man nur mit einer Maus sehen kann, ist auf einem Touchgeraet
 * kein Name.
 *
 * Wer kein Portraet hat, bekommt sein Monogramm auf demselben Zuschnitt. Die
 * Kachel bleibt dieselbe Form, damit das Raster nicht auseinanderfaellt.
 */
const MemberTile: React.FC<{ member: Member; index: number }> = ({ member, index }) => {
  // Faellt auf das Monogramm zurueck, wenn die Datei fehlt oder anders heiszt.
  // Ohne das steht in der Kachel ein kaputtes Bildsymbol mit dem Alt-Text
  // daneben -- und zwar so lange, bis es jemandem auffaellt.
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(member.image) && !failed;

  return (
  <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-card ring-1 ring-[#0b0f2a]/10">
    {showImage ? (
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        style={{ objectPosition: member.focus ?? 'center 25%' }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-reveal group-hover:scale-[1.06]"
      />
    ) : (
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center font-black text-5xl md:text-6xl tracking-tighter select-none transition-transform duration-700 ease-reveal group-hover:scale-[1.06] ${
          AVATAR_TONES[index % AVATAR_TONES.length]
        }`}
      >
        {member.name.charAt(0)}
      </div>
    )}

    {/* Der Schleier traegt die Schrift. Auf dem Telefon steht er, am Desktop
        kommt er mit dem Zeiger. */}
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020617] via-[#020617]/55 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-reveal"
    />

    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-left md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-[transform,opacity] duration-500 ease-reveal">
      <div className="font-black text-lg md:text-xl tracking-tighter text-white leading-none">
        {member.name}
      </div>
      <div className="mt-1.5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em] text-white/70 leading-snug">
        {member.role}
      </div>
    </div>
  </div>
  );
};

export const UeberUnsPage: React.FC<UeberUnsPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* ============ 1. HERO ============ */}
      {/* The same header every other route carries now -- homepage ground,
          white type -- with the team photograph behind it. */}
      <PageHero
        eyebrow="GG Manufaktur"
        title="Über"
        accent="uns."
        subline="Wir kommen aus Gaming und eSport. Geblieben ist, was uns von Anfang an antreibt: Wir wollen Menschen begeistern."
        image={TEAM_IMAGE}
        imageAlt="Das Team der GG Manufaktur"
      />

      {/* ============ 2. DER AUFSCHLAG ============ */}
      {/* The one paragraph that says what the company is, before any of the
          history. It runs the page's width rather than a column, so it reads
          as the answer to the headline above it. */}
      <section className={`${CANVAS} ${BLOCK_GAP}`}>
        <div className={CONTAINER}>
          <Reveal as="p" className="text-[#0b0f2a] text-xl md:text-2xl lg:text-[28px] font-bold leading-snug tracking-tight max-w-4xl">
            Die GG Manufaktur entwickelt Gamification, Events und Markenaktivierungen, die Menschen einbeziehen und in
            Erinnerung bleiben. Dabei verbinden wir Strategie, Kreation, Technologie und Umsetzung – mit einem klaren
            Blick auf das Ziel und die Menschen, die erreicht werden sollen.
          </Reveal>
        </div>
      </section>

      {/* ============ 3. WO WIR HERKOMMEN ============ */}
      <section className={`${CANVAS} ${BLOCK_GAP}`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]">
                <RevealText as="span" by="word" text="Wo wir" />
                <RevealText as="span" by="word" text="herkommen." className="text-[#0e958e] italic" delay={0.14} />
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

      {/* ============ 4. WIE WIR ARBEITEN ============ */}
      <section className={`${CANVAS} ${BLOCK_GAP}`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]">
                <RevealText as="span" by="word" text="Wie wir" />
                <RevealText as="span" by="word" text="arbeiten." className="text-[#0e958e] italic" delay={0.14} />
              </h2>
            </div>
            <div className="md:col-span-7">
              <Reveal as="p" className="text-[#0b0f2a] font-bold text-xl md:text-2xl leading-snug tracking-tight mb-6">
                {ARBEIT_LEAD}
              </Reveal>
              <div className="space-y-6">
                {arbeit.map((paragraph, i) => (
                  <Reveal
                    key={i}
                    as="p"
                    delay={(i + 1) * STAGGER.line}
                    className="text-[#0b0f2a]/75 text-lg md:text-xl leading-relaxed font-medium tracking-tight"
                  >
                    {paragraph}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. DAS TEAM ============ */}
      <section className={`${CANVAS} ${BLOCK_GAP}`}>
        <div className={CONTAINER}>
          <div className="max-w-3xl mb-10 md:mb-14">
            <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.05] tracking-tighter text-[#0b0f2a]">
              <RevealText as="span" by="word" text="Das Team" />
              <RevealText as="span" by="word" text="dahinter." className="text-[#0e958e] italic" delay={0.14} />
            </h2>
            <Reveal as="p" delay={0.24} className="text-[#0b0f2a] font-bold text-xl md:text-2xl mt-5 leading-snug tracking-tight">
              {TEAM_LEAD}
            </Reveal>
            <div className="mt-5 space-y-5">
              {teamIntro.map((paragraph, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={0.3 + i * STAGGER.line}
                  className="text-[#0b0f2a]/75 text-base md:text-lg leading-relaxed font-medium tracking-tight"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {team.map((member, i) => (
              <Reveal
                as="li"
                key={member.name}
                // Stagger by column so a row arrives together instead of the
                // grid unzipping one tile at a time down eleven people.
                delay={(i % 4) * STAGGER.card}
                y={24}
              >
                <MemberTile member={member} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 6. MEINE GESCHICHTE ============ */}
      {/*
        The founder's story, as a tile on the site's own dark ground -- the
        same surface as the Blog panel on the homepage, so it reads as part of
        the set rather than as a banner dropped onto the page.

        One deliberate difference from that panel: the type here is white and
        white/80 rather than white/60. This is a piece of writing somebody is
        meant to read, not a label on a card, and 60% white over the dark
        ground is below what carries a paragraph.
      */}
      <section className={`${CANVAS} ${BLOCK_GAP} pb-20 md:pb-28`}>
        <div className={CONTAINER}>
          <Reveal
            y={28}
            data-nav-ground="dark"
            className="relative w-full rounded-shell overflow-hidden shadow-2xl bg-[#020617] border border-white/10"
          >
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[#020617]" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 20% 16%, rgba(0,129,141,0.42) 0%, rgba(0,129,141,0.20) 26%, rgba(0,129,141,0.06) 46%, transparent 64%)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />
              <div
                className="absolute top-0 right-0 w-[75%] h-full opacity-50"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(20, 184, 166, 0.6) 38px, rgba(20, 184, 166, 0.6) 40px)',
                  maskImage:
                    'linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%), linear-gradient(to left, white 0%, white 55%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%), linear-gradient(to left, white 0%, white 55%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in'
                }}
              />
            </div>

            {/* Two columns from md, photograph above the text below that. */}
            <div className="relative z-10 grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 p-6 sm:p-8 md:p-10 lg:p-14 items-center">
              <div className="md:col-span-5">
                {GIANLUCA_IMAGE ? (
                  <img
                    src={GIANLUCA_IMAGE}
                    alt="Gianluca Crepaldi, Gründer und Geschäftsführer der GG Manufaktur"
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: '68% 16%' }}
                    className="w-full aspect-[4/5] object-cover rounded-card"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] rounded-card border border-white/15 bg-white/[0.04] flex flex-col items-center justify-center gap-3 text-center px-6">
                    <ImageIcon className="w-8 h-8 text-white/25" />
                    <span className="text-white/45 text-[9px] font-black uppercase tracking-[0.25em] border border-white/15 rounded-full px-2.5 py-1">
                      Foto folgt
                    </span>
                    <span className="text-white/35 text-xs font-medium leading-snug max-w-[22ch]">
                      Porträt von Gianluca Crepaldi
                    </span>
                  </div>
                )}
              </div>

              <div className="md:col-span-7">
                <Reveal className="text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-5">
                  Meine Geschichte
                </Reveal>
                <RevealText
                  as="h2"
                  by="word"
                  text="Von FIFA-Turnieren mit Stift und Papier zur GG Manufaktur."
                  className="text-white text-[clamp(24px,3vw,38px)] font-black leading-[1.08] tracking-tighter"
                />
                <Reveal as="p" delay={0.16} className="mt-5 md:mt-6 text-white/80 text-base md:text-lg leading-relaxed font-medium tracking-tight">
                  Vor rund 15 Jahren begann alles in einer Garage: mit Beamer, Leinwand, Stift und Papier – und mit der
                  Idee, Gaming-Wettbewerbe einfacher zu machen. Daraus entstanden eine App, die eSport Manufaktur,
                  zahlreiche Projekte und schließlich die GG Manufaktur. Ich erzähle, welche Zufälle Türen geöffnet
                  haben, was wir aus Rückschlägen gelernt haben und warum nach fünf Jahren der richtige Zeitpunkt für
                  einen neuen Namen und den nächsten Schritt gekommen ist.
                </Reveal>
                <Reveal delay={0.24} className="mt-7 md:mt-9">
                  <button
                    onClick={() => onNavigate('meine-geschichte')}
                    className="spring group inline-flex items-center gap-2.5 bg-emerald-400 hover:bg-white text-slate-900 px-7 py-4 rounded-full font-black text-sm sm:text-base tracking-tight transition-colors duration-500"
                  >
                    Mehr lesen
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </button>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};
