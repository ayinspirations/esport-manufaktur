import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseSliderProps {
  /** Bildpfade in der Reihenfolge, in der sie gezeigt werden sollen. */
  images: string[];
  /** Wofuer die Bilder stehen -- wird je Bild um die Nummer ergaenzt. */
  alt: string;
}

// ---------------------------------------------------------------------------
// Der Bilderwechsler einer Best-Case-Seite
// ---------------------------------------------------------------------------
// Stand dreimal fast wortgleich in drei Dateien, und zwei davon zeigten auf
// Bilder, die es im Projekt nicht gibt. Der alte Umgang damit war ein
// onError, das eine Stockfotografie von Unsplash nachlud -- eine fremde
// Halle als Beleg fuer die Arbeit eines Kunden.
//
// Hier faellt ein fehlendes Bild einfach aus der Reihe. Fehlen alle, gibt es
// keinen Wechsler: die Seite hat dann keinen Bildteil, und das ist ehrlicher
// als ein Platzhalter. Sobald die echten Bilder unter public/images liegen,
// erscheint er von selbst.
// ---------------------------------------------------------------------------

export const CaseSlider: React.FC<CaseSliderProps> = ({ images, alt }) => {
  const [failed, setFailed] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const shown = images.filter((src) => !failed.includes(src));
  if (shown.length === 0) return null;

  const current = index % shown.length;
  const next = () => setIndex((prev) => (prev + 1) % shown.length);
  const prev = () => setIndex((prev) => (prev - 1 + shown.length) % shown.length);

  return (
    <div className="relative group rounded-shell overflow-hidden aspect-video bg-[#badeda] shadow-2xl">
      <div className="absolute inset-0">
        {shown.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            onError={() => setFailed((f) => (f.includes(src) ? f : [...f, src]))}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}
      </div>

      {shown.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Vorheriges Bild"
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-30 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            aria-label="Nächstes Bild"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-30 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {shown.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                aria-label={`Bild ${i + 1} anzeigen`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current ? 'w-8 bg-white' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
