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
// Der Verlauf ist ein Uebergang, kein Schleier. Er lag bis eben ueber dem
// unteren Drittel und hat das Foto schon dort aufgehellt, wo es noch etwas zu
// zeigen hatte -- Gesichter, Aufbau, Raum. Jetzt beginnt er erst bei 76
// Prozent: darueber ist das Bild unberuehrt, darunter loest es sich in die
// Seitenflaeche auf.
//
// Die Ueberschrift wandert mit. Sie sitzt auf der Naht: die obere Haelfte im
// Bild, die untere schon auf der Flaeche. Sie klebt damit weder als
// Bildunterschrift unter dem Foto noch schwimmt sie mitten darin.
//
// Damit sie das ueberstehen kann, ist sie deutlich kleiner als zuvor -- 64
// statt 120 Pixel im Groeszten. Eine Zeile, die ueber die halbe Bildhoehe
// laeuft, verdeckt genau das, was das Bild zeigen soll. Und sie traegt einen
// Lichthof in der Farbe der Seitenflaeche -- eng gehalten, damit er die Tinte
// traegt, ohne selbst als Dunst ueber dem Bild zu liegen.
// ---------------------------------------------------------------------------

export const CaseHero: React.FC<CaseHeroProps> = ({ image, alt, title, accent }) => {
  // Fehlt das Bild, bleibt die dunkle Flaeche darunter stehen. Ohne das
  // stuende hier ein zerbrochenes Bildsymbol ueber dem Alternativtext --
  // fuer eine Seite, deren erster Eindruck der Aufmacher ist, der schlechtere
  // von beiden Ausfaellen.
  const [failed, setFailed] = useState(false);

  return (
  <header className="relative">
    <div className="relative h-[68vh] md:h-[78vh] overflow-hidden bg-[#0b0f2a]">
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
            'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 15%, rgba(186,222,218,0) 76%, rgba(186,222,218,0.62) 88%, rgba(186,222,218,0.97) 96%, #badeda 100%)'
        }}
      />
      {/* Sagt der Navigationsleiste, wo das Foto aufhoert und die Flaeche
          anfaengt. Die Leiste kreuzt auf dem Weg nach unten beide Haelften,
          und das Bild darunter wuerde sonst auch fuer die helle Haelfte
          "dunkel" melden. Leer und dekorativ -- es existiert, um getroffen
          zu werden. */}
      <div data-nav-ground="dark" aria-hidden="true" className="absolute inset-x-0 top-0 h-[74%]" />
    </div>

    <div className="relative z-20 -mt-[15vh] md:-mt-[16vh] px-6 md:px-14 pb-6 md:pb-10">
      <h1
        className="text-[clamp(28px,5vw,64px)] font-black leading-[0.92] tracking-tighter uppercase text-[#0b0f2a]"
        style={{ filter: 'drop-shadow(0 1px 6px rgba(186,222,218,0.7)) drop-shadow(0 1px 2px rgba(186,222,218,0.55))' }}
      >
        <RevealText as="span" by="word" text={title} delay={0.1} />
        <RevealText as="span" by="word" text={accent} delay={0.24} className="text-[#0e958e] italic" />
      </h1>
    </div>
  </header>
  );
};
