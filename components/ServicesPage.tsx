import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import { PageHero } from './PageHero';
import { BLOCK_GAP } from './spacing';
import { ServiceView } from './ServiceView';
import { BlogSection } from './BlogSection';
import { servicesContent } from './servicesContent';
import { services, pillars, serviceSlugs } from './serviceCatalogue';
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
    className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 md:px-5 md:py-2.5 text-[10.5px] md:text-[13px] font-black uppercase tracking-[0.06em] md:tracking-[0.08em] transition-colors duration-300 border ${
      active
        ? 'bg-[#0b0f2a] text-white border-[#0b0f2a]'
        : 'bg-white/50 text-[#0b0f2a]/70 border-[#0b0f2a]/10 hover:bg-white hover:text-[#0b0f2a] hover:border-[#0b0f2a]/25'
    }`}
  >
    {label}
  </button>
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
  const filterRef = useRef<HTMLDivElement>(null);
  // Distinguishes a switch the visitor made from the initial render and from
  // browser back/forward, which must not steal the scroll position.
  const userSwitched = useRef(false);

  const content = servicesContent[active];

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

  // After a switch, bring the filter bar back to just under the navigation, so
  // the new service starts at its beginning instead of dropping the reader into
  // the middle of a page they have not seen. Only for a switch the visitor
  // made: on first render the page is already at the top, and on back/forward
  // the browser restores its own position.
  useEffect(() => {
    if (!userSwitched.current) return;
    userSwitched.current = false;
    const el = filterRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - navClearance() - 12;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }, [active]);

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

      <div className={`${CONTAINER} ${BLOCK_GAP}`}>
        <Reveal as="p" delay={0.1} className="text-slate-600 font-medium text-base md:text-lg max-w-3xl leading-relaxed tracking-tight">
          Du kannst uns für einzelne Leistungen beauftragen oder als zentralen Partner für dein gesamtes Projekt.
          Gemeinsam klären wir, welche Kompetenzen dein Vorhaben benötigt und in welchen Bereichen wir dich sinnvoll
          unterstützen können.
        </Reveal>
        <Reveal as="p" delay={0.18} className="text-[#0b0f2a] font-bold text-base md:text-lg mt-5 tracking-tight">
          Wähle einen Leistungsbereich, um mehr zu erfahren.
        </Reveal>
      </div>

      {/* ============ Menu bar ============ */}
      {/*
        A menu bar, and deliberately not a sticky one: pinned under the
        navigation it sat over whatever was being read, and on a narrow window
        two rows of pills ate a third of the viewport for the whole length of
        the page. A menu belongs at the top of what it controls -- you go to
        it, it does not follow you.

        Two labelled groups rather than one strip. The four central fields and
        the six further competencies are not a flat list of ten, and saying so
        costs one line of type each. This also replaced a horizontal scroll
        rail on the phone -- with edge fades, paging arrows and a centring
        effect -- that hid seven of the ten entries behind a gesture nothing
        announced. The pills wrap at every width now: everything the page
        offers is on screen, which is the whole job of a filter.
      */}
      <div ref={filterRef} className={`${CONTAINER} pt-12 md:pt-16 scroll-mt-28`}>
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

      {/* ============ The selected service ============ */}
      {/*
        `mode="wait"` so the outgoing service is gone before the next arrives:
        cross-fading two full service pages means both are laid out at once and
        the page height jumps to whichever is taller.

        Opacity and a short rise only. These are long documents, and animating
        anything heavier than compositor properties across one is what turns a
        filter click into a stutter.
      */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <ServiceView content={content} onOpenBooking={onOpenBooking} onOpenContact={onOpenContact} />
        </motion.div>
      </AnimatePresence>

      {/* The homepage's Blog section, at the foot of every service.
          Outside the AnimatePresence above on purpose: it is identical for all
          ten services, so it should stay put while the service above it swaps
          rather than tearing down and rebuilding its cards on every click. */}
      <BlogSection onOpenPost={onOpenPost} />

    </div>
  );
};
