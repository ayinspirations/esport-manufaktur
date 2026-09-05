import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { DUR, EASE_REVEAL } from './motion';
import { PageHero } from './PageHero';
import { HeroGround } from './HeroGround';
import { BLOCK_GAP } from './spacing';
import { ServiceView } from './ServiceView';
import { BlogSection } from './BlogSection';
import { servicesContent } from './servicesContent';
import { services, pillars, serviceSlugs } from './serviceCatalogue';
import { SERVICES_LAYOUT } from './servicesLayout';
import { useDocumentHead } from '../hooks/useDocumentHead';

interface ServicesPageProps {
  /**
   * The service that is open. Comes from the URL and is the single source of
   * truth -- this page holds no selection state of its own.
   */
  slug?: string;
  onNavigate: (target: string) => void;
  /** Selects a service: updates the URL and the router, without a page change. */
  onSelectService: (slug: string) => void;
  onOpenBooking: () => void;
  onOpenContact: (subject?: string) => void;
  /** Opens a blog article, for the Blog section at the foot of the page. */
  onOpenPost: (slug: string) => void;
}

const CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-14';
/** Das Sidebar-Layout darf breiter laufen: es traegt zwei Spalten statt einer. */
const WIDE_CONTAINER = 'max-w-[1440px] mx-auto px-6 md:px-14';

/**
 * How much room the floating navigation needs above the sticky filter. Read at
 * the moment it is used rather than once at module load, so a rotate or a
 * resize does not leave it holding the other breakpoint's value.
 *
 * The matching CSS variable is `--nav-clearance` in index.css; keep the two
 * together.
 */
const navClearance = () => (window.innerWidth >= 768 ? 96 : 78);


/**
 * The filter, as the client describes the offering: four central fields, then
 * everything else. Both groups come from the one catalogue, so a service added
 * there appears here without a second edit.
 */
const PILL_GROUPS = [
  { label: 'Zentrale Leistungsbereiche', items: pillars },
  { label: 'Weitere Kompetenzen', items: services.filter((s) => !s.pillar) }
];

/** Was beide Layouts brauchen, um die Auswahl zu zeigen und zu aendern. */
interface LayoutProps {
  active: string;
  select: (slug: string) => void;
  /**
   * Die Scroll-Anker: worauf die Seite nach einem Wechsel zielt.
   *
   * Zwei, weil die Auswahl je nach Breite woanders steht -- ab lg als Spalte
   * neben dem Panel, darunter als Knopf darueber. Gezielt wird immer auf die
   * Klebeposition der Auswahl, damit sie beim Wechsel exakt stehen bleibt.
   */
  anchorRef: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  /** Die ausgewaehlte Leistung, fertig gerendert. */
  panel: React.ReactNode;
}

// ---------------------------------------------------------------------------

const FilterPill: React.FC<{
  label: string;
  active: boolean;
  onSelect: () => void;
}> = ({ label, active, onSelect }) => (
  <button
    data-pill
    onClick={onSelect}
    // aria-current rather than aria-pressed: these behave as a set of related
    // links through the same page, and only one is ever the current one.
    aria-current={active ? 'true' : undefined}
    className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 md:px-5 md:py-2.5 text-[10.5px] md:text-[13px] font-black uppercase tracking-[0.06em] md:tracking-[0.08em] transition-colors duration-500 border ${
      active
        ? 'bg-[#0b0f2a] text-white border-[#0b0f2a]'
        : 'bg-white/50 text-[#0b0f2a]/70 border-[#0b0f2a]/10 hover:bg-white hover:text-[#0b0f2a] hover:border-[#0b0f2a]/25'
    }`}
  >
    {label}
  </button>
);

// ---------------------------------------------------------------------------
// Layout A -- Filter-Pillen (das bisherige System)
// ---------------------------------------------------------------------------
/*
  A menu bar, and deliberately not a sticky one: pinned under the navigation it
  sat over whatever was being read, and on a narrow window two rows of pills ate
  a third of the viewport for the whole length of the page. A menu belongs at
  the top of what it controls -- you go to it, it does not follow you.

  Two labelled groups rather than one strip. The four central fields and the six
  further competencies are not a flat list of ten, and saying so costs one line
  of type each. This also replaced a horizontal scroll rail on the phone -- with
  edge fades, paging arrows and a centring effect -- that hid seven of the ten
  entries behind a gesture nothing announced. The pills wrap at every width now:
  everything the page offers is on screen, which is the whole job of a filter.
*/
const PillsLayout: React.FC<LayoutProps> = ({ active, select, anchorRef, panel }) => (
  <>
    <div ref={anchorRef} className={`${CONTAINER} pt-12 md:pt-16 scroll-mt-28`}>
      {PILL_GROUPS.map((group) => (
        <div key={group.label} className="mb-7 md:mb-8 last:mb-0">
          <Reveal className="text-[#0a6f6a] font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] mb-3.5 md:mb-4">
            {group.label}
          </Reveal>
          <div role="tablist" aria-label={group.label} className="flex flex-wrap gap-x-2 gap-y-2 md:gap-x-2.5">
            {group.items.map((item) => (
              <FilterPill
                key={item.slug}
                label={item.title}
                active={item.slug === active}
                onSelect={() => select(item.slug)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>

    {panel}
  </>
);

// ---------------------------------------------------------------------------
// Layout B -- Sidebar und Panel
// ---------------------------------------------------------------------------

const SidebarItem: React.FC<{
  label: string;
  active: boolean;
  onSelect: () => void;
  /** 'ink' steht auf der hellen Flaeche, 'light' auf dem dunklen Hero-Grund. */
  tone?: 'ink' | 'light';
}> = ({ label, active, onSelect, tone = 'ink' }) => {
  const ink = active
    ? 'bg-[#0b0f2a] text-white'
    : 'text-[#0b0f2a]/65 hover:bg-white/60 hover:text-[#0b0f2a]';
  const light = active
    ? 'bg-white text-[#0b0f2a]'
    : 'text-white/70 hover:bg-white/10 hover:text-white';

  return (
    <button
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      className={`w-full text-left rounded-card px-4 py-3 text-[13.5px] font-black tracking-tight transition-colors duration-500 ${
        tone === 'light' ? light : ink
      }`}
    >
      {label}
    </button>
  );
};

// ---------------------------------------------------------------------------

/*
  Die Sidebar auf dem Telefon: eingeklappt auf eine Zeile, die mitlaeuft.

  Ein Streifen aus zehn Pillen und zwei Gruppenzeilen ueber dem Inhalt ist
  auf einem schmalen Schirm keine Auswahl, sondern eine Wand: er fuellt den
  halben ersten Bildschirm, schiebt die Leistung darunter aus dem Bild und
  ist, sobald man liest, weg. Eine Sidebar loest genau das -- sie steht immer
  bereit, ohne Platz vom Inhalt zu nehmen. Neben dem Text ist dafuer kein
  Platz, also darunter: ein Knopf, der die aktuelle Leistung nennt, unter der
  Navigation kleben bleibt und die volle Liste ueber den Inhalt legt.

  Der aufgeklappte Zustand liegt bewusst UEBER dem Inhalt statt ihn zu
  schieben: sonst springt beim Auf- und Zuklappen die halbe Seite.
*/
const MobileServiceMenu: React.FC<{
  active: string;
  select: (slug: string) => void;
}> = ({ active, select }) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const activeTitle = services.find((s) => s.slug === active)?.title ?? '';

  // Zu, sobald daneben getippt oder Escape gedrueckt wird -- ein Menue, das
  // nur der eigene Knopf wieder schlieszt, faengt den naechsten Tipp ab.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={boxRef}
      className="lg:hidden sticky top-[calc(var(--nav-clearance,78px)+8px)] z-30 mb-8"
    >
      {/* Der Knopf ist das Einzige, was beim Lesen stehen bleibt -- also traegt
          er denselben Grund wie das Menue, das aus ihm herauskommt, und nicht
          eine flache Tintenflaeche daneben. Der Grund liegt im Rahmen, nicht
          im Knopf: ein <button> darf nur Text und Inline-Inhalt umschlieszen,
          keine Ebenen. */}
      <div className="relative rounded-card overflow-hidden border border-white/15 shadow-lg shadow-[#0b0f2a]/15">
        <HeroGround />
        <div aria-hidden="true" className="absolute inset-0 bg-[#020617]/35" />

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="relative z-10 w-full flex items-center justify-between gap-4 text-white px-5 py-3.5 text-left"
        >
          <span className="min-w-0">
            <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-white/50">
              Leistung
            </span>
            <span className="block truncate text-[15px] font-black tracking-tight">
              {activeTitle}
            </span>
          </span>
          <ChevronDown
            className={`w-5 h-5 shrink-0 transition-transform duration-500 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR.panel, ease: EASE_REVEAL }}
            className="absolute inset-x-0 top-full mt-2 rounded-card border border-white/15 shadow-2xl overflow-hidden"
          >
            {/* Derselbe Grund wie der Hero der Startseite, voll deckend, mit
                einem leichten Schleier aus der Grundfarbe darueber. */}
            <HeroGround />
            <div aria-hidden="true" className="absolute inset-0 bg-[#020617]/55" />

            {/* Der Grund haengt am stehenden Rahmen, das Scrollen passiert
                eine Ebene tiefer -- sonst deckt er nur die erste Bildhoehe
                der Liste ab und scrollt darunter weg. */}
            <div className="relative z-10 max-h-[62vh] overflow-y-auto p-3">
              {PILL_GROUPS.map((group, gi) => (
                <div key={group.label} className={gi > 0 ? 'mt-5' : undefined}>
                  <p className="text-[#2dd4bf] font-black uppercase tracking-[0.2em] text-[9.5px] mb-2 px-3">
                    {group.label}
                  </p>
                  <div role="menu" aria-label={group.label} className="flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <SidebarItem
                        key={item.slug}
                        label={item.title}
                        active={item.slug === active}
                        tone="light"
                        onSelect={() => {
                          setOpen(false);
                          select(item.slug);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/*
  Die Auswahl steht links und bleibt stehen, der Inhalt laeuft rechts durch.

  Das ist bewusst `position: sticky` und kein abgefangenes Scrollen: die Spalte
  klebt, solange das Raster laeuft -- also genau so lange, wie die Leistung
  daneben zu lesen ist -- und loest sich an dessen Ende von selbst, sodass die
  Seite ganz normal weiterscrollt. Wer stattdessen das Scrollrad umleitet,
  nimmt dem Besucher die Kontrolle ueber die Seite, bricht Tastatur- und
  Trackpad-Bedienung und faellt auf dem Telefon ohnehin in sich zusammen.

  Unter `lg` gibt es keine zweite Spalte, in die eine Sidebar passt: dort
  uebernimmt das eingeklappte Menue oben dieselbe Aufgabe.
*/
const SidebarLayout: React.FC<LayoutProps> = ({ active, select, anchorRef, menuRef, panel }) => (
  <div className={`${WIDE_CONTAINER} pt-12 md:pt-16 scroll-mt-28`}>
    {/* Bis lg: die Auswahl als mitlaufender Knopf ueber dem Inhalt. Sie steht
        auszerhalb des Rasters, damit sie ueber dessen ganze Hoehe klebt und
        nicht nur ueber die Hoehe der Spalte, in der sie sonst saesze. */}
    {/* Der Anker fuer den Sprung auf dem Telefon: eine Marke im Fluss, genau
        dort, wo das Menue steht.
        Nicht das Menue selbst -- das klebt, und ein klebendes Element meldet
        auch ueber offsetTop seine Klebeposition, nicht seine Position im
        Dokument. Ein daraus gerechnetes Ziel ist immer die Stelle, an der man
        ohnehin schon steht, und der Sprung faellt still aus. */}
    <div ref={menuRef} aria-hidden="true" className="lg:hidden" />
    <MobileServiceMenu active={active} select={select} />

    {/* Der Anker sitzt am Raster, nicht am Container darum: gezielt wird die
        Oberkante der Spalte, nicht die des Kopfabstands ueber ihr. */}
    <div ref={anchorRef} className="lg:grid lg:grid-cols-[268px_minmax(0,1fr)] lg:gap-10 xl:gap-14 lg:items-start">
      {/* ---- Auswahl ---- */}
      <aside className="hidden lg:block lg:sticky lg:top-[calc(var(--nav-clearance,96px)+16px)] lg:max-h-[calc(100dvh-var(--nav-clearance,96px)-40px)] lg:overflow-y-auto lg:pr-1 lg:pb-2">
        <nav aria-label="Leistungen">
          {PILL_GROUPS.map((group, gi) => (
            <div key={group.label} className={gi > 0 ? 'mt-8' : undefined}>
              <p className="text-[#0a6f6a] font-black uppercase tracking-[0.2em] text-[10px] mb-3 px-4">
                {group.label}
              </p>
              <div role="tablist" aria-label={group.label} className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.slug}
                    label={item.title}
                    active={item.slug === active}
                    onSelect={() => select(item.slug)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* ---- Panel ---- */}
      {/* `min-w-0`, sonst zwingt der breiteste Inhalt (eine Kachelreihe, eine
          lange Zeile) die Spalte ueber ihren Anteil hinaus -- ein Grid-Kind
          hat als Mindestbreite sonst seinen eigenen Inhalt. */}
      <div className="min-w-0 lg:min-h-[calc(100dvh-var(--nav-clearance,96px)-40px)]">
        {/* Die erste Sektion bringt den Seitenabstand von BLOCK_GAP mit --
            im Panel sitzt sie damit ein Drittel Bildschirmhoehe unter dem
            eigenen Rand. Hier wird nur ihr Kopfabstand zurueckgenommen, der
            Rhythmus zwischen den Sektionen bleibt. */}
        <div className="lg:rounded-shell lg:bg-white/45 lg:border lg:border-white/60 lg:px-12 pb-2 overflow-hidden [&_section:first-of-type]:pt-6 lg:[&_section:first-of-type]:pt-14">
          {panel}
        </div>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------

/**
 * The services page: one filter, one service shown at a time.
 *
 * This replaces both of the things that used to exist here -- a `/services`
 * overview with its own five-way tab taxonomy, and four separate
 * `/services/<slug>` pages -- which between them described the company's
 * offering in two lists that did not agree with each other. There is one list
 * now (`serviceCatalogue`), the homepage shows the four pillars from it, and
 * everything else is a filter click away.
 *
 * Switching is a content swap, not a route change, but it still writes the URL:
 * every service keeps its own address, so a service can be linked, shared and
 * indexed exactly as before, and the browser's back button walks back through
 * the services someone looked at rather than leaving the page entirely.
 *
 * Wie die Auswahl aussieht, entscheidet `SERVICES_LAYOUT` in
 * `servicesLayout.ts` -- Sidebar mit Panel oder die bisherigen Filter-Pillen.
 * Beide bekommen dieselbe Auswahl, dieselbe URL und dieselbe ServiceView; sie
 * unterscheiden sich nur in der Anordnung.
 */
export const ServicesPage: React.FC<ServicesPageProps> = ({
  slug,
  onSelectService,
  onOpenBooking,
  onOpenContact,
  onOpenPost
}) => {
  // Derived from the URL, never stored.
  //
  // This did hold its own `active` state, with the filter writing the URL
  // directly and the router left none the wiser. The two then disagreed the
  // moment anyone pressed Back: the router's idea of the service had not
  // changed since the page opened, so the popstate it handled produced no new
  // prop, and the filter stayed where it was while the address bar moved.
  // With the URL as the only source of truth, back and forward walk the
  // services someone looked at, for free.
  const active = (slug && serviceSlugs.includes(slug) ? slug : serviceSlugs[0]) as string;
  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const content = servicesContent[active];
  const sidebar = SERVICES_LAYOUT === 'sidebar';

  useDocumentHead({
    title: content.seo.title,
    description: content.seo.description,
    ogImage: content.seo.ogImage,
    canonicalPath: content.path
  });

  // Erst springen, dann tauschen -- und zwar sofort, nicht animiert.
  //
  // Andersherum war beides falsch. Der Tausch zuerst macht die Seite kuerzer
  // (jede Leistung ist unterschiedlich lang), und eine Seite, die kuerzer wird
  // als die aktuelle Scrollposition erlaubt, klemmt der Browser nach oben: ein
  // Ruck, den niemand ausgeloest hat, und die klebende Spalte rutscht mit.
  // Erst danach lief die Animation ueber zweitausend Pixel Inhalt, den niemand
  // sehen wollte.
  //
  // Vom Kopf des Rasters aus gibt es nichts zu klemmen, egal wie kurz die neue
  // Leistung ist. Und der Sprung selbst ist unsichtbar: die Sidebar klebt
  // vorher wie nachher an derselben Stelle unter der Navigation -- sie steht
  // still, waehrend daneben die neue Leistung erscheint.
  const select = useCallback(
    (next: string) => {
      if (next === active) return;

      // Ab lg klebt die Spalte, darunter der Knopf -- gezielt wird auf das,
      // was gerade da ist.
      const wide = window.innerWidth >= 1024;
      const el = wide ? anchorRef.current : menuRef.current ?? anchorRef.current;
      if (el) {
        // Ziel ist die Stelle, an der die Auswahl klebt -- nicht irgendein
        // Abstand unter der Navigation.
        //
        // Vorher landete der Sprung 60 Pixel darueber, weil er den Kopfabstand
        // des Containers mitzaehlte: die Spalte stand danach unterhalb ihres
        // eigenen Klebepunkts und rutschte beim naechsten Scrollen erst dorthin
        // hoch. Wer sie ansieht, sieht sie wandern -- obwohl nur nebenan
        // getippt wurde. Auf ihren Klebepunkt gezielt, steht sie vor und nach
        // dem Wechsel exakt gleich.
        const stickyTop = sidebar ? navClearance() + (wide ? 16 : 8) : navClearance() + 12;
        const top = Math.max(el.getBoundingClientRect().top + window.scrollY - stickyTop, 0);
        // Nur nach oben. Wer die Auswahl von weiter oben trifft, steht schon
        // vor dem Anfang und soll nicht nach unten gerissen werden.
        if (window.scrollY > top) {
          window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
        }
      }

      onSelectService(next);
    },
    [active, onSelectService, sidebar]
  );

  /*
    Der Wechsel im Panel.

    Er war ein harter Schnitt: der alte Inhalt verschwand in dem Moment, in
    dem der neue erschien. Das lag an einem Problem, das es nicht mehr gibt --
    `mode="wait"` haelt den alten fest, bis er ausgeblendet ist, und dazwischen
    ist das Panel leer und die Seite kuerzer als die Scrollposition erlaubt.
    Weil die Seite inzwischen an den Kopf des Rasters springt, bevor getauscht
    wird, steht sie beim Wechsel ohnehin oben; da ist nichts mehr zu klemmen.

    Bleibt der Leerlauf selbst, und den loest `mode="popLayout"`: der
    abtretende Inhalt wird aus dem Fluss genommen und blendet dort aus,
    waehrend der neue schon die Hoehe des Panels bestimmt und aufsteigt. Nichts
    faellt auf null, nichts wartet -- die beiden ueberlagern sich fuer einen
    Moment, und genau das macht aus dem Schnitt eine Blende.

    Nur Deckkraft und ein kurzer Weg. Das sind lange Dokumente, und alles, was
    schwerer ist als eine Compositor-Eigenschaft, macht aus einem Klick ein
    Stottern.
  */
  const panel = (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        // Schneller hinaus als herein: der neue Inhalt ist das, was gelesen
        // werden soll, der alte nur noch im Weg.
        exit={{ opacity: 0, transition: { duration: 0.22, ease: EASE_REVEAL } }}
        transition={{ duration: DUR.reveal, ease: EASE_REVEAL }}
      >
        {/* Im Panel begrenzt und polstert schon die Spalte -- die Ansicht
            bekommt dort keinen zweiten Container. */}
        <ServiceView
          content={content}
          container={sidebar ? 'w-full' : undefined}
          cardColumns={sidebar ? 2 : 3}
          onOpenBooking={onOpenBooking}
          onOpenContact={onOpenContact}
        />
      </motion.div>
    </AnimatePresence>
  );

  const Layout = sidebar ? SidebarLayout : PillsLayout;

  return (
    <div className="w-full bg-[#badeda]">
      {/* ============ Page header ============ */}
      {/* The shared header: same dark ground and gradient accent as the
          homepage hero, so the services page opens the way every other route
          does instead of with ink type on the bare canvas. */}
      {/* Kein Eyebrow: "Leistungen" stand hier doppelt -- einmal als Kicker,
          einmal in der Headline selbst. */}
      <PageHero
        title="Unsere"
        accent="Leistungen."
        subline="Von der ersten Idee bis zur Umsetzung."
      />

      <div className={`${sidebar ? WIDE_CONTAINER : CONTAINER} ${BLOCK_GAP}`}>
        <Reveal as="p" delay={0.1} className="text-slate-600 font-medium text-base md:text-lg max-w-3xl leading-relaxed tracking-tight">
          Du kannst uns für einzelne Leistungen beauftragen oder als zentralen Partner für dein gesamtes Projekt.
          Gemeinsam klären wir, welche Kompetenzen dein Vorhaben benötigt und in welchen Bereichen wir dich sinnvoll
          unterstützen können.
        </Reveal>
        <Reveal as="p" delay={0.18} className="text-[#0b0f2a] font-bold text-base md:text-lg mt-5 tracking-tight">
          Wähle einen Leistungsbereich, um mehr zu erfahren.
        </Reveal>
      </div>

      <Layout active={active} select={select} anchorRef={anchorRef} menuRef={menuRef} panel={panel} />

      {/* The homepage's Blog section, at the foot of every service.
          Outside the layout on purpose: it is identical for all ten services,
          so it should stay put while the service above it swaps rather than
          tearing down and rebuilding its cards on every click. */}
      <BlogSection onOpenPost={onOpenPost} />

    </div>
  );
};
