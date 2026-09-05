import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

/*
  Die Auswahl steht links und bleibt stehen, der Inhalt laeuft rechts durch.

  Das ist bewusst `position: sticky` und kein abgefangenes Scrollen: die Spalte
  klebt, solange das Raster laeuft -- also genau so lange, wie die Leistung
  daneben zu lesen ist -- und loest sich an dessen Ende von selbst, sodass die
  Seite ganz normal weiterscrollt. Wer stattdessen das Scrollrad umleitet,
  nimmt dem Besucher die Kontrolle ueber die Seite, bricht Tastatur- und
  Trackpad-Bedienung und faellt auf dem Telefon ohnehin in sich zusammen.

  Unter `lg` gibt es keine zweite Spalte, in die eine Sidebar passt: dort
  stehen dieselben Eintraege als umbrechende Pillen ueber dem Panel.
*/
const SidebarLayout: React.FC<LayoutProps> = ({ active, select, anchorRef, panel }) => (
  <div ref={anchorRef} className={`${WIDE_CONTAINER} pt-12 md:pt-16 scroll-mt-28`}>
    <div className="lg:grid lg:grid-cols-[268px_minmax(0,1fr)] lg:gap-10 xl:gap-14 lg:items-start">
      {/* ---- Auswahl ---- */}
      <aside className="lg:sticky lg:top-[calc(var(--nav-clearance,96px)+16px)] lg:max-h-[calc(100dvh-var(--nav-clearance,96px)-40px)] lg:overflow-y-auto lg:pr-1 lg:pb-2">
        {/* Phone und Tablet: dieselbe Liste, als Pillen */}
        <div className="lg:hidden">
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

        {/* Desktop: die eigentliche Sidebar */}
        <nav aria-label="Leistungen" className="hidden lg:block">
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
      <div className="min-w-0 mt-10 lg:mt-0">
        {/* Die erste Sektion bringt den Seitenabstand von BLOCK_GAP mit --
            im Panel sitzt sie damit ein Drittel Bildschirmhoehe unter dem
            eigenen Rand. Hier wird nur ihr Kopfabstand zurueckgenommen, der
            Rhythmus zwischen den Sektionen bleibt. */}
        <div className="rounded-shell bg-white/45 border border-white/60 px-6 md:px-10 lg:px-12 pb-2 overflow-hidden [&_section:first-of-type]:pt-10 md:[&_section:first-of-type]:pt-14">
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
  useEffect(() => {
    if (!userSwitched.current) return;
    userSwitched.current = false;
    const el = anchorRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - navClearance() - 12;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }, [active]);

  /*
    `mode="wait"` so the outgoing service is gone before the next arrives:
    cross-fading two full service pages means both are laid out at once and the
    page height jumps to whichever is taller.

    Opacity and a short rise only. These are long documents, and animating
    anything heavier than compositor properties across one is what turns a
    filter click into a stutter.
  */
  const panel = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: DUR.panel, ease: EASE_REVEAL }}
      >
        {/* Im Panel begrenzt und polstert schon die Spalte -- die Ansicht
            bekommt dort keinen zweiten Container. */}
        <ServiceView
          content={content}
          container={sidebar ? 'w-full' : undefined}
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

      <Layout active={active} select={select} anchorRef={anchorRef} panel={panel} />

      {/* The homepage's Blog section, at the foot of every service.
          Outside the layout on purpose: it is identical for all ten services,
          so it should stay put while the service above it swaps rather than
          tearing down and rebuilding its cards on every click. */}
      <BlogSection onOpenPost={onOpenPost} />

    </div>
  );
};
