import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';

interface ShowcaseCase {
  /** Eindeutig, und zugleich der Dateiname des Bildes. */
  id: string;
  title: string;
  text: string;
  /** Full-bleed backdrop. Fehlt es, laeuft der Case auf der dunklen Flaeche. */
  image?: string;
  /** Die Kachel in der Reihe. Faellt auf `image` zurueck. */
  card?: string;
  imageAlt?: string;
}

// ---------------------------------------------------------------------------
// Was hier steht -- und was nicht
// ---------------------------------------------------------------------------
// Die Buehne zeigt die ganze Arbeit, nicht nur die elf Cases mit eigener
// Unterseite. Die uebrigen sind kurz erzaehlt: ein Titel, ein Satz, ein Bild.
// Wer mehr wissen will, findet die ausgearbeiteten Faelle im Mosaik darueber.
//
// Bilder: jeder Eintrag zeigt auf /images/showcase/<id>.jpg. Fehlt die Datei,
// laeuft der Case auf der dunklen Flaeche der Seite -- die Buehne bleibt also
// vollstaendig, waehrend die Bilder nachkommen. Siehe die README in dem
// Ordner.
// ---------------------------------------------------------------------------

/** Kuerzt die Wiederholung: aus der id werden beide Bildpfade. */
const shot = (id: string, title: string, text: string, over?: Partial<ShowcaseCase>): ShowcaseCase => ({
  id,
  title,
  text,
  image: `/images/showcase/${id}.jpg`,
  imageAlt: `${title} -- Aktivierung von GG Manufaktur`,
  ...over
});

/** Wie viele Aufmacher beim Naeherkommen vorgeladen werden. */
const WARM_COUNT = 6;

const CASES: ShowcaseCase[] = [
  // Die ausgearbeiteten Faelle zuerst -- sie haben eine eigene Unterseite und
  // teils eigenes Bildmaterial, das hier weiterverwendet wird.
  shot('tsystems', 'T-Systems', 'Eine deutschlandweite Gaming-Aktivierung, die junge Tech-Talente für den Arbeitgeber T-Systems gewinnt.', {
    image: '/images/t-systems/hero.jpg',
    card: '/videos/case-tsystems.jpg'
  }),
  shot('hagebau', 'Hagebau Bolay', 'Recruiting-Game, Messeaktivierung und eigene Gaming Days — ein Kreislauf, der bis zur Bewerbung führt.', {
    image: '/images/hagebau/gallery-1.jpg',
    card: '/videos/case-hagebau.jpg'
  }),
  shot('showdown-0711', '0711 Showdown', 'Fünf Arbeitgeber, 64 junge Talente, ein EA SPORTS FC-Turnier — und die Vorstufe der XP Days.', {
    image: '/videos/case-showdown.jpg'
  }),
  shot('bayern-zockt', 'Bayern zockt', 'Eine digitale EM im Originalmodus, mit Finale im Stadion des 1. FC Augsburg.', {
    image: '/images/bayern-zockt/hero.jpg',
    card: '/videos/case-bayern-zockt.jpg'
  }),
  shot('bfv', 'BFV eFootball', 'Die digitale Fußballplattform des Bayerischen Fußball-Verbands — Kunde seit unserer Gründung.', {
    image: '/images/bfv/hero.jpg'
  }),
  shot('intersport', 'INTERSPORT', 'Sechs Wochen Pop-up-Gaming im Clubhouse Berlin, mit eigenem EA SPORTS FC 26-Turnier.', {
    image: '/images/intersport/hero.jpg'
  }),
  shot('rewe', 'REWE', 'Scouting für den 1. FC Köln, Community-Turniere und Recruiting — aus einem Sponsoring wird eine Plattform.', {
    image: '/images/rewe/hero.jpg'
  }),
  shot('xp-days', 'XP Days', 'Unsere eigene Karrieremesse: Plattform, XP-System, Videocontent und Gaming-Erlebniswelt in einem Format.', {
    image: '/images/xp-days/hero.jpg'
  }),
  shot('dekra', 'DEKRA Motorsport', 'Digitaler Wallet-Pass statt Stempelkarte: sechs DTM-Standorte, QR-Tracking und messbare Leads.', {
    image: '/images/dekra/hero.jpg'
  }),
  shot('interwetten', 'Interwetten', 'Virtual Tennis beim BOSS OPEN: gebrandeter Court, Live-Ranking und Leads aus dem Spiel heraus.', {
    image: '/images/interwetten/hero.jpg'
  }),
  shot('consumenta', 'NIVEA MEN // EFFECT // CRACKZ', 'Drei Marken, drei Mechaniken, eine Messefläche — Gaming, Sampling und Leads auf der Consumenta.', {
    image: '/images/consumenta/hero.jpg'
  }),

  // Und die uebrige Arbeit, in der Reihenfolge, in der sie freigegeben wurde.
  shot('developer-akademie', 'Developer Akademie', 'Gamifizierte Lead-Generierung für IT-Weiterbildungen auf einer individuellen White-Label-Plattform durch zielgruppengerechte Online-Turniere.'),
  shot('hhn-techday', 'Hochschule Heilbronn – TechDay', 'Spielerische Aktivierung junger Tech- und Studieninteressierter durch Online- und Offline-Turniere in Mario Kart und EA SPORTS FC.'),
  shot('hhn-gamingland-meetit', 'Hochschule Heilbronn – Gamingland × MeetIT', 'Gaming-nahes Giveaway zur Aktivierung von Studieninteressierten inklusive digitaler Teilnahmeplattform und Mario-Kart-Aktivierung vor Ort.'),
  shot('naspa-svww', 'Naspa × SV Wehen Wiesbaden', 'Sponsorship Activation zur Neukundenakquise bei jungen Zielgruppen durch einen 2vs2 EA SPORTS FC Cup im Umfeld des SV Wehen Wiesbaden.'),
  shot('stadt-muenchen-bfv', 'Stadt München × BFV', 'Champions-League-Aktivierung für die Stadt München und den BFV mit einem öffentlich zugänglichen EA SPORTS FC Turnier im Pineapple Park.'),
  shot('erazer-expert', 'ERAZER × expert', 'Fortnite Gaming-Aktivierung für ERAZER und expert als Technikdienstleister im Auftrag der Lead-Agentur MYI.'),
  shot('sonax-rocket-league', 'SONAX × Rocket League', 'Rocket-League-Aktivierung für SONAX auf der Tuning World durch Bereitstellung, Aufbau und Installation des Gaming-Equipments im Auftrag von MYI.'),
  shot('ewe', 'EWE', 'Entwicklung einer ganzheitlichen Gaming-Strategie für den authentischen Markteintritt von EWE inklusive Positionierung, Zielgruppenanalyse und Aktivierungskonzept.'),
  shot('aok-fortuna-duesseldorf', 'AOK × Fortuna Düsseldorf', 'Regionale Markenaktivierung für die AOK durch Konzeption und Durchführung einer eSport-Stadtmeisterschaft mit Fortuna Düsseldorf.'),
  shot('allianz-juniorcup', 'Allianz × Mercedes-Benz JuniorCup', 'Aktivierung von Fußball- und Gaming-Fans beim Mercedes-Benz JuniorCup durch eine EA SPORTS FC Gaming-Area und eine Beat-the-Pro-Challenge.'),
  shot('kreissparkasse-esslingen', 'Kreissparkasse Esslingen', 'Gamifizierte Aktivierung des Familienfests durch eine gebrandete Turnierplattform, Mario Kart, EA SPORTS FC und ein WM-Turnier auf der Hauptbühne.'),
  shot('kreissparkasse-boeblingen', 'Kreissparkasse Böblingen', 'Spielerische Messeaktivierung auf der Karrieremesse im eigenen Forum durch Mario Kart und ein zielgruppengerechtes Giveaway am Messestand.'),
  shot('vfb-season-opening', 'VfB Stuttgart eSports – Season Opening', 'Interaktive Community-Aktivierung zum Season Opening durch unsere hauseigene KI-Fotolösung, eine Beat-the-Pro-Challenge und drei gebrandete Gaming-Stationen.'),
  shot('vfb-turnierplattform', 'VfB Stuttgart eSports – Turnierplattform', 'Digitale Durchführung von Creator Cups und VBL Open Wildcard Cups auf einer individuellen White-Label-Plattform im Design des VfB Stuttgart.'),
  shot('vr-bank-starnberg-bfv', 'VR Bank Starnberg-Zugspitze × BFV', 'Fußball- und Gaming-Aktivierung gemeinsam mit dem BFV durch ein öffentliches WM-Public-Viewing und ein begleitendes EA SPORTS FC Turnier.'),
  shot('winamax-gluecksgefuehle', 'Winamax × Glücksgefühle Festival', 'Gamifizierte Markenaktivierung für Winamax auf dem Glücksgefühle Festival durch eine digitale Live-Ranking-Plattform und Mario Kart vor Ort.'),
  shot('hamburger-sv', 'Hamburger SV', 'Digitale Durchführung des VBL Open Wildcard Cups auf einer vollständig gebrandeten Turnier-Microsite im Design des Hamburger SV.'),
  shot('eintracht-frankfurt-ambition', 'Eintracht Frankfurt – AMBITION', 'Digitale Aktivierung des eSports-Förderprogramms AMBITION durch individuelle Plattformlösungen und Online-Turniere in Rocket League und EA SPORTS FC.'),
  shot('1822direkt-blacki-cups', '1822direkt × BLACKI CUPS', 'Sponsorship Activation und Lead-Generierung für 1822direkt durch eine digitale Turnierserie mit integrierten Werbeflächen im Umfeld der BLACKI CUPS.'),
  shot('itcs', 'ITCS', 'Steigerung der Erlebnisqualität einer IT-Karrieremesse durch einen frei zugänglichen Gaming-Stand mit technischer Ausstattung und spielerischer Besucheraktivierung.'),
  shot('markenfestival', 'Markenfestival', 'Fachvortrag von Gründer und Geschäftsführer Gianluca Crepaldi über den strategischen Einsatz von Gaming und eSport für Recruiting und Brand Awareness.'),
  shot('spobis-brand-summit', 'SPOBIS Brand Summit', 'Fachvortrag von Gründer und Geschäftsführer Gianluca Crepaldi über Gaming und eSport als Instrumente für Recruiting, Sponsoring und Markenaktivierung.'),
  shot('holstein-kiel', 'Holstein Kiel', 'Digitale Durchführung von Online-Turnieren und VBL Open Wildcard Cups auf einer individuellen Turnier-Microsite im Design von Holstein Kiel.'),
  shot('plauen-park', 'Plauen Park', 'Technische Umsetzung einer zweitägigen Gaming-Aktivierung mit gebrandetem Mobiliar, Gaming-Equipment und Turnier-Microsite im Auftrag der eSport Reputation GmbH.'),
  shot('rb-leipzig', 'RB Leipzig', 'Skalierbare Durchführung unterschiedlicher eSport-Turniere auf einer individuellen White-Label-Plattform im Design von RB Leipzig.'),
  shot('vfl-bochum', 'VfL Bochum', 'Digitale Durchführung unterschiedlicher eSport-Wettbewerbe auf einer gebrandeten White-Label-Plattform mit Teilnehmer- und Turniermanagement.'),
  shot('tsg-hoffenheim', 'TSG Hoffenheim', 'Digitale Abbildung von Turnieren und eSport-Wettbewerben auf einer individuellen White-Label-Plattform im Vereinsdesign der TSG Hoffenheim.'),
  shot('esport-verband-schleswig-holstein', 'eSport-Verband Schleswig-Holstein', 'Digitale Abbildung des neuen Landesmeisterschaftsformats auf einer individuellen White-Label-Plattform mit Wettbewerbsstruktur und Teilnehmermanagement.'),
  shot('allianz-vfb-stuttgart', 'Allianz × VfB Stuttgart', 'Gaming-Aktivierung im Umfeld eines Bundesliga-Spiels zur Steigerung der Brand Awareness und zum Aufbau positiver Markenassoziationen bei jungen Zielgruppen.')
];

/** The dark ground a case without photography runs on. */
const FallbackGround: React.FC = () => (
  <div className="absolute inset-0 tile-gradient">
    <div
      className="absolute inset-0 opacity-50"
      style={{
        backgroundImage:
          'repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(45, 212, 191, 0.45) 38px, rgba(45, 212, 191, 0.45) 40px)',
        maskImage: 'radial-gradient(ellipse 70% 65% at 68% 45%, white 0%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 68% 45%, white 0%, transparent 78%)'
      }}
    />
  </div>
);

// ---------------------------------------------------------------------------

/**
 * The Best Cases again, as a full-viewport stage.
 *
 * One case fills the screen behind a rail of cards; picking a card swaps the
 * backdrop to it and brings that card to the front of the rail. The mosaic
 * above shows them all at once and is the way to compare them; this is the way
 * to look at one.
 *
 * Only the active backdrop is mounted -- five full-bleed photographs held in
 * the DOM at once is several megabytes of decoded bitmap sitting there for a
 * section most visitors will scroll past. They are prefetched into the HTTP
 * cache when the section comes into view instead, so the first switch is
 * instant without any of them being decoded up front.
 */
export const CaseShowcase: React.FC = () => {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.05, rootMargin: '200px' });

  const current = CASES[active];

  // Warm the first few backdrops once the stage is near. Fetched, not
  // rendered: sie landen im HTTP-Zwischenspeicher, damit der erste Wechsel
  // sofort steht, ohne dass eine decodierte Bitmap im Speicher haengt.
  //
  // Nur die ersten sechs. Bei elf Cases war "alle" vertretbar, bei vierzig
  // waeren es mehrere Megabyte fuer einen Abschnitt, den viele nur
  // vorbeiscrollen. Alles Weitere laedt beim Anklicken -- die Kacheln in der
  // Reihe haengen ohnehin an `loading="lazy"`.
  useEffect(() => {
    if (!inView) return;
    for (const c of CASES.slice(0, WARM_COUNT)) {
      if (!c.image) continue;
      const img = new Image();
      img.src = c.image;
    }
  }, [inView]);

  // Senkrechtes Raddrehen ueber der Reihe gehoert der Seite.
  //
  // `overflow-x: auto` macht den Kasten auch senkrecht zum Scrollbereich --
  // das laeszt sich nicht trennen, `overflow-y: clip` rechnet daneben zu
  // `hidden`. Der Browser haengt die Radgeste beim ersten Ereignis an den
  // naechstgelegenen Scrollbereich und bleibt fuer den Rest der Geste dort.
  // Ueber der Reihe war das die Reihe selbst: sie kann senkrecht nichts
  // bewegen, gibt die Geste aber auch nicht mehr her, und die Seite stand.
  // Genau das Bild, das man sieht -- der Zeiger muss die Kacheln verlassen,
  // damit es weitergeht.
  //
  // Also entscheiden wir selbst, wem die Geste gehoert: ueberwiegt die
  // senkrechte Bewegung, scrollt die Seite und das Ereignis ist erledigt.
  // Waagerechtes Wischen -- Trackpad, Schaltwippe, geneigtes Rad -- bleibt
  // bei der Reihe. Der Zeilenmodus wird umgerechnet, sonst kriecht ein
  // klassisches Mausrad in Dreier-Schritten.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const step = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      e.preventDefault();
      window.scrollBy({ top: e.deltaY * step });
    };
    rail.addEventListener('wheel', onWheel, { passive: false });
    return () => rail.removeEventListener('wheel', onWheel);
  }, []);

  // Bring the chosen card to the front of the rail.
  //
  // `scrollIntoView` is not used: it scrolls every scrollable ancestor,
  // including the page, so choosing a card would also drag the stage around
  // under the visitor. Setting scrollLeft moves the rail and nothing else.
  useEffect(() => {
    const rail = railRef.current;
    const card = cardRefs.current[active];
    if (!rail || !card) return;
    rail.scrollTo({
      left: Math.max(card.offsetLeft - rail.clientWidth * 0.06, 0),
      behavior: 'smooth'
    });
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="case-showcase"
      data-nav-ground="dark"
      aria-label="Best Cases im Überblick"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#020617] flex flex-col"
    >
      {/* ---- Hintergrund: dasselbe Bild, unscharf ---- */}
      {/*
        Die Buehne stand bisher formatfuellend im Bild, und das ging nicht auf:
        die meisten Aufnahmen sind hochkant (1200x1600, teils 900x1600), die
        Buehne ist quer. `object-cover` schnitt daraus einen senkrechten
        Streifen aus der Mitte -- vom Aufbau, vom Publikum, vom Raum blieb
        nichts uebrig -- und rechnete ein 900 Pixel breites Bild auf 1440
        hoch, was den Rest an Schaerfe kostete.

        Jetzt steht die Aufnahme vollstaendig in ihrem eigenen Format, und was
        formatfuellend laeuft, ist eine unscharfe, abgedunkelte Kopie
        derselben Datei. Sie gibt der Flaeche Farbe und Tiefe, ohne dass
        irgendetwas beschnitten wird -- und kostet nichts, weil es dieselbe
        Datei ist, die daneben ohnehin geladen wird.
      */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          {current.image ? (
            <img
              src={current.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
            />
          ) : (
            <FallbackGround />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nur so viel Abdunkelung, wie die Schrift braucht. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #020617 0%, rgba(2,6,23,0.88) 22%, rgba(2,6,23,0.55) 60%, rgba(2,6,23,0.6) 100%)'
        }}
      />

      {/* ---- Aufnahme und Text ---- */}
      {/*
        Nebeneinander ab grossen Schirmen, untereinander darunter. Der Text
        steht damit nie im Bild -- das war der zweite Fehler der alten
        Fassung: eine Ueberschrift in 68 Pixeln quer ueber der Aufnahme
        verdeckte genau das, was sie ankuendigte.
      */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pt-28 md:pt-32 pb-6 grow flex items-center">
        <div className="w-full grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={`shot-${current.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              // Auf dem Telefon randlos: die sechs Pixel Rand kosten dort acht
              // Prozent Bildbreite, und das Bild ist ohnehin das Kleinste, was
              // die Buehne zu bieten hat.
              className="lg:col-span-7 lg:order-2 flex justify-center -mx-6 sm:mx-0"
            >
              {current.image ? (
                <img
                  src={current.image}
                  alt={current.imageAlt ?? ''}
                  className="max-h-[52vh] sm:max-h-[50vh] lg:max-h-[58vh] w-auto max-w-full rounded-none sm:rounded-shell object-contain shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
                />
              ) : (
                <div className="relative w-full aspect-[16/10] rounded-shell overflow-hidden">
                  <FallbackGround />
                </div>
              )}
            </motion.figure>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:order-1"
            >
              <h3 className="text-white text-[clamp(26px,3.6vw,52px)] font-black leading-[0.95] tracking-tighter uppercase mb-4 text-balance">
                {current.title}
              </h3>
              <p className="text-white/70 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-lg">
                {current.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---- Card rail ---- */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pb-4 md:pb-6">
        {/*
          The vertical padding is inside the scroller, not around it.

          `overflow-x: auto` does not stay on one axis -- the computed
          overflow-y becomes auto with it -- so the rail is a clipping box in
          both directions. The active card lifts and grows, and its shadow
          spreads well past its own box, and all of that was being sliced off
          at the top and bottom edges. Padding within the scroll box is room
          the card can actually use; a margin outside it would not be.
        */}
        <div
          ref={railRef}
          className="case-rail flex items-end gap-3 md:gap-4 overflow-x-auto overscroll-x-contain pt-8 pb-8 -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CASES.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => setActive(i)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${c.title} anzeigen`}
                className={`group relative shrink-0 w-[92px] sm:w-[110px] md:w-[128px] aspect-[3/4] rounded-[22px] overflow-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? '-translate-y-2 scale-[1.05] shadow-[0_28px_54px_-20px_rgba(0,0,0,0.9)]'
                    : 'shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)] hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.85)]'
                }`}
              >
                {c.card || c.image ? (
                  <img
                    src={c.card ?? c.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <FallbackGround />
                )}

                {/*
                  Inactive cards are held back with a wash over the artwork
                  rather than with `opacity`. Opacity fades the card toward the
                  backdrop it sits on, which drains the colour out of a row of
                  game artwork and is what made these read as flat and grey.
                  A dark wash keeps every card fully opaque -- the artwork stays
                  saturated, it is just in shadow until it is picked.
                */}
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive ? 'bg-transparent' : 'bg-[#020617]/55 group-hover:bg-[#020617]/25'
                  }`}
                />

                {/* Foot scrim, so the title holds against any artwork. */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                <span
                  className={`absolute inset-x-0 bottom-0 p-2 md:p-2.5 text-left text-[9px] md:text-[10px] font-black uppercase tracking-tight leading-tight transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-white/75'
                  }`}
                >
                  {c.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`.case-rail::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};
