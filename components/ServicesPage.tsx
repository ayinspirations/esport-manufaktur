import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { DUR, EASE_REVEAL } from './motion';
import { PageHero } from './PageHero';
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
const navClearance = () => (window.innerWidth >= 768 ? 96 : 64);

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
  /** Der Scroll-Anker: wohin die Seite nach einem Wechsel zurueckspringt. */
  anchorRef: React.RefObject<HTMLDivElement>;
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
}> = ({ label, active, onSelect }) => (
  <button
    onClick={onSelect}
    aria-current={active ? 'true' : undefined}
    className={`w-full text-left rounded-card px-4 py-3 text-[13.5px] font-black tracking-tight transition-colors duration-500 ${
      active
        ? 'bg-[#0b0f2a] text-white'
        : 'text-[#0b0f2a]/65 hover:bg-white/60 hover:text-[#0b0f2a]'
    }`}
  >
    {label}
  </button>
);

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
      className="lg:hidden sticky top-[calc(var(--nav-clearance,64px)+8px)] z-30 mb-8"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="w-full flex items-center justify-between gap-4 rounded-card bg-[#0b0f2a] text-white px-5 py-3.5 text-left shadow-lg shadow-[#0b0f2a]/10"
      >
        <span className="min-w-0">
          <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-white/45">
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR.panel, ease: EASE_REVEAL }}
            className="absolute inset-x-0 top-full mt-2 max-h-[62vh] overflow-y-auto rounded-card bg-white border border-[#0b0f2a]/10 shadow-2xl p-3"
          >
            {PILL_GROUPS.map((group, gi) => (
              <div key={group.label} className={gi > 0 ? 'mt-5' : undefined}>
                <p className="text-[#0a6f6a] font-black uppercase tracking-[0.2em] text-[9.5px] mb-2 px-3">
                  {group.label}
                </p>
                <div role="menu" aria-label={group.label} className="flex flex-col gap-0.5">
                  {group.items.map((item) => (
                    <SidebarItem
                      key={item.slug}
                      label={item.title}
                      active={item.slug === active}
                      onSelect={() => {
                        setOpen(false);
                        select(item.slug);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
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
const SidebarLayout: React.FC<LayoutProps> = ({ active, select, anchorRef, panel }) => (
  <div ref={anchorRef} className={`${WIDE_CONTAINER} pt-12 md:pt-16 scroll-mt-28`}>
    {/* Bis lg: die Auswahl als mitlaufender Knopf ueber dem Inhalt. Sie steht
        auszerhalb des Rasters, damit sie ueber dessen ganze Hoehe klebt und
        nicht nur ueber die Hoehe der Spalte, in der sie sonst saesze. */}
    <MobileServiceMenu active={active} select={select} />

    <div className="lg:grid lg:grid-cols-[268px_minmax(0,1fr)] lg:gap-10 xl:gap-14 lg:items-start">
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
  // Distinguishes a switch the visitor made from the initial render and from
  // browser back/forward, which must not steal the scroll position.
  const userSwitched = useRef(false);

  const content = servicesContent[active];
  const sidebar = SERVICES_LAYOUT === 'sidebar';

  useDocumentHead({
    title: content.seo.title,
    description: content.seo.description,
    ogImage: content.seo.ogImage,
    canonicalPath: content.path
  });

  const select = useCallback(
    (next: string) => {
      if (next === active) return;
      userSwitched.current = true;
      onSelectService(next);
    },
    [active, onSelectService]
  );

  // After a switch, bring the menu back to just under the navigation, so the
  // new service starts at its beginning instead of dropping the reader into
  // the middle of a page they have not seen. Only for a switch the visitor
  // made: on first render the page is already at the top, and on back/forward
  // the browser restores its own position.
  //
  // Im Sidebar-Layout gilt das nur, solange der Kopf des Rasters noch unter
  // der Navigation steht -- also bevor die Sidebar klebt. Ist sie einmal
  // angedockt, waere dieser Sprung genau das, was er verhindern soll: die
  // Spalte loest sich, wandert ein Stueck und dockt neu an, obwohl der
  // Besucher nur nebenan eine andere Leistung angetippt hat. Die Auswahl
  // steht dann still und nur das Panel wechselt.
  useEffect(() => {
    if (!userSwitched.current) return;
    userSwitched.current = false;
    const el = anchorRef.current;
    if (!el) return;
    const distanceFromNav = el.getBoundingClientRect().top - navClearance();
    if (sidebar && window.innerWidth >= 1024 && distanceFromNav <= 12) return;
    const top = el.getBoundingClientRect().top + window.scrollY - navClearance() - 12;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }, [active, sidebar]);

  /*
    Zwei Wechsel, aus einem Grund verschieden.

    Im Pillen-Layout haelt `mode="wait"` den alten Inhalt fest, bis er
    ausgeblendet ist: ein Kreuzblenden legt beide Leistungen gleichzeitig aus
    und die Seitenhoehe springt auf die groeszere der beiden.

    Im Sidebar-Layout ist genau dieses Warten das Problem. Zwischen Aus- und
    Einblendung ist das Panel fuer einen Moment leer, die Seite damit kuerzer
    als die aktuelle Scrollposition erlaubt -- der Browser zieht sie nach oben,
    und die klebende Spalte rutscht sichtbar mit. Ohne AnimatePresence tauscht
    React den Knoten am key-Wechsel direkt aus: es gibt keinen leeren Moment,
    die Hoehe faellt nie auf null, die Sidebar steht.

    In beiden Faellen nur Deckkraft und ein kurzes Steigen. Das sind lange
    Dokumente, und alles, was schwerer ist als eine Compositor-Eigenschaft,
    macht aus einem Klick ein Stottern.
  */
  // Im Panel begrenzt und polstert schon die Spalte -- die Ansicht bekommt
  // dort keinen zweiten Container.
  const view = (
    <ServiceView
      content={content}
      container={sidebar ? 'w-full' : undefined}
      onOpenBooking={onOpenBooking}
      onOpenContact={onOpenContact}
    />
  );

  const motionProps = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.panel, ease: EASE_REVEAL }
  } as const;

  const panel = sidebar ? (
    <motion.div key={active} {...motionProps}>
      {view}
    </motion.div>
  ) : (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={active} {...motionProps} exit={{ opacity: 0, y: -8 }}>
        {view}
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

      <Layout active={active} select={select} anchorRef={anchorRef} panel={panel} />

      {/* The homepage's Blog section, at the foot of every service.
          Outside the layout on purpose: it is identical for all ten services,
          so it should stay put while the service above it swaps rather than
          tearing down and rebuilding its cards on every click. */}
      <BlogSection onOpenPost={onOpenPost} />

    </div>
  );
};
