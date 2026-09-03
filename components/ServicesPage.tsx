import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { PageHero } from './PageHero';
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

/** Number of pillars, so the filter can put a divider after them. */
const PILLAR_COUNT = pillars.length;

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
    className={`shrink-0 snap-start whitespace-nowrap rounded-full px-3 py-2 md:px-5 md:py-2.5 text-[10.5px] md:text-[13px] font-black uppercase tracking-[0.06em] md:tracking-[0.08em] transition-colors duration-300 border ${
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
  // The pill strip scrolls on a phone. These say whether there is anything left
  // to reach in either direction, which is what the arrows and the edge fades
  // are driven by.
  const railRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    // Measured against the first and last pill, not against scrollLeft.
    //
    // The rail is padded at both ends by half-width spacers, which is what lets
    // a centred first or last pill have somewhere to scroll into. Those spacers
    // are scrollable distance too, so a raw scrollLeft reading calls the strip
    // "scrolled left" while the first pill is still perfectly visible, and
    // offers an arrow that only scrolls into empty space. Asking whether a real
    // pill is off-screen answers the question the arrows are actually posing.
    const update = () => {
      const pills = rail.querySelectorAll<HTMLElement>('[data-pill]');
      const first = pills[0];
      const last = pills[pills.length - 1];
      if (!first || !last) return;
      setCanLeft(first.offsetLeft < rail.scrollLeft - 4);
      setCanRight(last.offsetLeft + last.offsetWidth > rail.scrollLeft + rail.clientWidth + 4);
    };
    update();
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      rail.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Roughly a screenful at a time, so a page always lands on a pill boundary
  // rather than halfway through a label.
  const page = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' });
  };

  // Centre the selected pill in the strip.
  //
  // It used to be parked a quarter of the way in, which meant the first and
  // last services simply sat against their edge -- the two you are most likely
  // to pick, since one is the default and the other ends the list. The spacers
  // at both ends of the rail are what make a true centre reachable: without
  // them there is nothing to scroll into, and the browser clamps the position
  // back to the edge however the maths is written.
  const centreActive = (behavior: ScrollBehavior) => {
    const rail = railRef.current;
    const pill = rail?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!rail || !pill) return;
    const left = pill.offsetLeft - (rail.clientWidth - pill.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(left, 0), behavior });
  };

  // Instant on the first pass, animated afterwards: on mount the strip should
  // simply already be in the right place, not slide there while the page is
  // still arriving.
  const centred = useRef(false);
  useEffect(() => {
    centreActive(centred.current ? 'smooth' : 'auto');
    centred.current = true;
  }, [active]);

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
      <PageHero
        eyebrow="Leistungen"
        title="Unsere"
        accent="Services."
        subline="Von der digitalen Experience bis zum physischen Erlebnis."
      />

      <div className={`${CONTAINER} pt-10 md:pt-14`}>
        <Reveal as="p" delay={0.1} className="text-slate-600 font-medium text-base md:text-lg max-w-2xl leading-relaxed tracking-tight">
          Wählt einen Bereich — die vier Säulen zuerst, dahinter alles, was wir sonst noch abdecken.
        </Reveal>
      </div>

      {/* ============ Menu bar ============ */}
      {/*
        A menu bar, and deliberately not a sticky one any more.

        Pinned under the navigation it was permanently in the way: it sat over
        whatever was being read, the service's own artwork ran into it while
        scrolling, and on a narrow window two rows of pills ate a third of the
        viewport for the entire length of the page. A menu belongs at the top of
        what it controls -- you go to it, it does not follow you.

        With the service view cut down to three rows it is also never far: the
        whole of a service now fits in roughly a screen and a half.
      */}
      <div ref={filterRef} className="pb-2 md:pb-4">
        <div className={`${CONTAINER} py-4 md:py-5`}>
          {/*
            On a phone the strip scrolls, and it used to give no sign of that:
            two and a bit pills were visible, the third sliced by the viewport
            edge, and nothing said the other seven existed. The pills are
            smaller here, the cut edge is turned into a deliberate fade, and a
            pair of arrows both announces the overflow and pages through it.
            From md the pills simply wrap and none of this applies.
          */}
          <div className="relative">
            <div
              ref={railRef}
              role="tablist"
              aria-label="Services"
              className="services-filter flex gap-x-2 gap-y-1.5 md:gap-x-2.5 md:gap-y-2 overflow-x-auto snap-x pb-1 -mx-6 md:mx-0 md:flex-wrap md:overflow-visible"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <span aria-hidden="true" className="md:hidden shrink-0 w-1/2" />
              {services.map((s, i) => (
                <React.Fragment key={s.slug}>
                  {/* On mobile the row scrolls and never wraps, so a rule marks
                      where the four pillars end and the rest begin.

                      Desktop had a forced line break here doing the same job,
                      and it is gone: a full-width item forms a flex line of its
                      own, so the pillars were separated from the row below by
                      two vertical gaps where every other row had one. */}
                  {i === PILLAR_COUNT && (
                    <span aria-hidden="true" className="md:hidden shrink-0 self-center w-px h-6 bg-[#0b0f2a]/15 mx-1" />
                  )}
                  <FilterPill label={s.title} active={s.slug === active} onSelect={() => select(s.slug)} />
                </React.Fragment>
              ))}
              <span aria-hidden="true" className="md:hidden shrink-0 w-1/2" />
            </div>

            {/* Fades sit over the scroll edges, so a pill leaving the strip
                dissolves instead of being chopped in half. They are shown only
                when there is actually something in that direction. */}
            <div
              aria-hidden="true"
              className={`md:hidden pointer-events-none absolute inset-y-0 -left-6 w-10 bg-gradient-to-r from-[#badeda] to-transparent transition-opacity duration-300 ${canLeft ? 'opacity-100' : 'opacity-0'}`}
            />
            <div
              aria-hidden="true"
              className={`md:hidden pointer-events-none absolute inset-y-0 -right-6 w-10 bg-gradient-to-l from-[#badeda] to-transparent transition-opacity duration-300 ${canRight ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>

          {/* Phone only: the pills wrap from md and there is nothing to page. */}
          <div className="md:hidden flex items-center justify-end gap-2 mt-3">
            <button
              onClick={() => page(-1)}
              disabled={!canLeft}
              aria-label="Vorherige Services"
              className="w-9 h-9 rounded-full border border-[#0b0f2a]/20 flex items-center justify-center text-[#0b0f2a] disabled:opacity-25 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => page(1)}
              disabled={!canRight}
              aria-label="Weitere Services"
              className="w-9 h-9 rounded-full border border-[#0b0f2a]/20 flex items-center justify-center text-[#0b0f2a] disabled:opacity-25 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
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

      <style>{`.services-filter::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};
