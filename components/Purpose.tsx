
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SECTION_PADDING } from './spacing';
import { Reveal, RevealText } from './Reveal';
import { STAGGER, DUR } from './motion';
import { TEAM_PHOTO } from './teamPhoto';

interface PurposeProps {
  onNavigate?: (page: any) => void;
}

const blocks = [
  'Die GG Manufaktur bringt Strategie, Kreation, Technologie und operative Umsetzung zusammen. Wir begleiten Marken, Unternehmen, Vereine, Verbände und Veranstalter von der ersten Zielsetzung bis zum fertigen Erlebnis – physisch, digital oder als nahtlos verbundenes Hybridformat.',
  'Dafür kombinieren wir eigene Kompetenzen mit einem gewachsenen Netzwerk spezialisierter Partner. So stellen wir für jedes Projekt genau das Team zusammen, das es für eine kreative, technisch stabile und professionell gesteuerte Umsetzung braucht.',
  'Wir tun das, weil Markenkommunikation dann am stärksten wirkt, wenn Menschen nicht nur zuschauen, sondern selbst Teil des Erlebnisses werden.'
];

export const Purpose: React.FC<PurposeProps> = ({ onNavigate }) => {
  return (
    <div className={`w-full flex items-center justify-center px-4 sm:px-6 md:px-14 ${SECTION_PADDING}`} id="purpose">
      {/* The dark panel is a tile in its own right, so it fades in like every
          other one instead of appearing hard behind content that fades. */}
      <Reveal
        as="section"
        y={28}
        duration={DUR.slow}
        data-nav-ground="dark"
        className="relative w-full max-w-[1440px] mx-auto rounded-shell md:rounded-shell overflow-hidden shadow-2xl bg-[#020617] border border-white/10"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#020617]" />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 20% 16%, rgba(0,129,141,0.42) 0%, rgba(0,129,141,0.20) 26%, rgba(0,129,141,0.06) 46%, transparent 64%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />
        </div>

        {/* Das Team -- auf dem Telefon anders gezeigt als am Desktop.

            Als Vollflaechen-Hintergrund funktioniert das Foto nur, solange die
            Kachel breit ist. Auf einem schmalen Schirm ist sie 356 Pixel breit
            und 1233 hoch; ein Cover-Ausschnitt aus einem Querformat zeigt dort
            rund zwei Prozent der Bildbreite -- einen senkrechten Streifen, auf
            dem niemand zu erkennen ist, und den der seitliche Verlauf (fuer
            eine breite Kachel gemacht, links dicht) zusaetzlich fast
            vollstaendig zudeckt.

            Deshalb bekommt das Foto dort ein eigenes Band am Kopf der Kachel.
            In 220 Pixel Hoehe passt bei dieser Breite fast das ganze Bild --
            alle fuenf, statt eines Ausschnitts von keinem -- und es darf auch
            deutlich staerker durchkommen, weil darunter kein Text liegt,
            dessen Kontrast es kosten wuerde. Der Verlauf laeuft dort nach
            unten statt zur Seite und uebergibt an die dunkle Flaeche, auf der
            die Headline steht. */}
        <img
          src={TEAM_PHOTO.src}
          srcSet={TEAM_PHOTO.srcSet}
          // Auf dem Telefon ein Band ueber die Kachelbreite, ab md die volle
          // Flaeche -- der Browser waehlt danach seine Datei.
          sizes="(min-width: 768px) 1440px, 100vw"
          alt={TEAM_PHOTO.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-x-0 top-0 h-[220px] md:inset-0 md:h-full w-full object-cover object-[center_32%] md:object-center opacity-60 md:opacity-25 z-0 pointer-events-none"
        />
        {/* Telefon: nach unten ins Dunkle. */}
        <div
          aria-hidden="true"
          className="md:hidden absolute inset-x-0 top-0 h-[240px] z-0 pointer-events-none bg-gradient-to-b from-[#020617]/10 via-[#020617]/55 to-[#020617]"
        />
        {/* Ab md: zur Seite, damit die Headline auf der dunkelsten Stelle
            steht und das Bild nach rechts ausklingt. */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#020617] via-[#020617]/85 to-[#020617]/55"
        />

        {/* Contents follow the panel rather than fading with it: the panel
            lands first, then headline and copy build on top of it. */}
        <div className="relative z-10 pt-[200px] pb-20 md:py-28 px-6 md:px-14 lg:px-20">
          <RevealText
            as="h2"
            by="word"
            text="Das ist die GG Manufaktur."
            delay={0.15}
            className="text-[clamp(38px,6.5vw,90px)] font-black text-white leading-[0.9] tracking-tighter"
          />
          <Reveal
            as="p"
            delay={0.28}
            className="text-white/60 font-medium text-base md:text-lg lg:text-xl mt-6 max-w-3xl leading-relaxed tracking-tight"
          >
            Viele Disziplinen, ein zentraler Ansprechpartner und ein gemeinsames Ziel: Menschen begeistern.
          </Reveal>

          {/* Three columns now, not two: the body is three paragraphs, and a
              two-column grid would have left the last one alone on a row of
              its own. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 lg:gap-12 mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/10">
            {blocks.map((text, i) => (
              <Reveal key={i} delay={i * STAGGER.card} y={28}>
                <p className="text-white/70 font-medium text-base md:text-lg leading-relaxed tracking-tight">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>

          {/* The closing line carries the section, so it is set as display
              type on its own rule rather than as a fourth paragraph. */}
          <Reveal delay={0.3} className="mt-14 md:mt-16 pt-10 md:pt-12 border-t border-white/10">
            <p className="text-white font-bold text-xl md:text-2xl lg:text-3xl leading-snug tracking-tight max-w-3xl">
              Von der Idee bis zur Realisierung. Aus einer Hand gesteuert und auf Wirkung ausgerichtet.
            </p>
          </Reveal>

          <Reveal delay={0.34} className="mt-10 md:mt-12">
            <button
              onClick={() => onNavigate?.('ueber-uns')}
              className="spring group inline-flex items-center gap-2.5 bg-emerald-400 text-slate-900 px-6 py-3.5 rounded-full font-black text-sm tracking-tighter"
            >
              GG Manufaktur kennenlernen
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
};
