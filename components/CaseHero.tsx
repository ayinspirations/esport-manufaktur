import React, { useState } from 'react';
import { RevealText } from './Reveal';

interface CaseHeroProps {
  /** Das Aufmacherbild. Querformat, weil es hier fast quadratisch beschnitten wird. */
  image: string;
  alt: string;
  /** Erste Zeile, in Tinte -- meist der Kundenname. */
  title: string;
  /** Zweite Zeile, im Akzent und kursiv -- der Anspruch, nicht die Wiederholung. */
  accent: string;
}

// ---------------------------------------------------------------------------
// Der Aufmacher einer Best-Case-Seite
// ---------------------------------------------------------------------------
// Stand fuenfmal wortgleich in fuenf Dateien. Jetzt einmal hier -- was heiszt,
// dass eine neue Best-Case-Seite den Aufmacher nicht mehr abschreibt, sondern
// vier Angaben uebergibt.
//
// Die eigentliche Aenderung ist die Hoehe des Bildes. Bisher begann die
// Ueberblendung zur Seitenflaeche schon bei 34 Prozent und war bei 60 Prozent
// praktisch durch: vom Foto blieb ein Streifen, und was darauf zu sehen war --
// Menschen, Aufbau, Stimmung -- verschwand, bevor man es gelesen hatte. Jetzt
// bleibt das Bild bis rund 70 Prozent seiner Hoehe unangetastet und blendet
// erst auf dem letzten Drittel ab.
//
// Die Ueberschrift liegt deshalb nicht mehr im Bild, sondern wird per
// negativem Aussenabstand in den bereits deckenden Fusz des Aufmachers
// gezogen. Das ist derselbe Anblick wie vorher -- Titel unten links, Bild
// darueber --, nur steht die Zeile jetzt garantiert auf der Seitenflaeche und
// darf in Tinte gesetzt sein, statt gegen ein Foto anzuleuchten.
// ---------------------------------------------------------------------------

export const CaseHero: React.FC<CaseHeroProps> = ({ image, alt, title, accent }) => {
  // Fehlt das Bild, bleibt die dunkle Flaeche darunter stehen. Ohne das
  // stuende hier ein zerbrochenes Bildsymbol ueber dem Alternativtext --
  // fuer eine Seite, deren erster Eindruck der Aufmacher ist, der schlechtere
  // von beiden Ausfaellen.
  const [failed, setFailed] = useState(false);

  return (
  <header className="relative">
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-[#0b0f2a]">
      {!failed && (
        <img
          src={image}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0) 24%, rgba(186,222,218,0) 68%, rgba(186,222,218,0.96) 87%, #badeda 95%)'
        }}
      />
      {/* Sagt der Navigationsleiste, wo das Foto aufhoert und die Flaeche
          anfaengt. Die Leiste kreuzt auf dem Weg nach unten beide Haelften,
          und das Bild darunter wuerde sonst auch fuer die helle Haelfte
          "dunkel" melden. Leer und dekorativ -- es existiert, um getroffen
          zu werden. */}
      <div data-nav-ground="dark" aria-hidden="true" className="absolute inset-x-0 top-0 h-[62%]" />
    </div>

    <div className="relative z-20 -mt-[7vh] md:-mt-[8vh] px-6 md:px-14 pb-2 md:pb-4">
      <h1 className="text-[clamp(36px,9vw,120px)] font-black leading-[0.85] tracking-tighter uppercase text-[#0b0f2a]">
        <RevealText as="span" by="word" text={title} delay={0.1} />
        <RevealText as="span" by="word" stagger={0} text={accent} delay={0.24} className="text-[#0e958e] italic" />
      </h1>
    </div>
  </header>
  );
};
