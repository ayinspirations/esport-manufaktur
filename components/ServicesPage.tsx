import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { ServiceView } from './ServiceView';
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
    onClick={onSelect}
    // aria-current rather than aria-pressed: these behave as a set of related
    // links through the same page, and only one is ever the current one.
    aria-current={active ? 'true' : undefined}
    className={`shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2.5 md:px-5 text-[12px] md:text-[13px] font-black uppercase tracking-[0.08em] transition-colors duration-300 border ${
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
  onNavigate,
  onSelectService,
  onOpenBooking
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
      <section className={`${CONTAINER} pt-24 md:pt-40 pb-10 md:pb-14`}>
        <Reveal duration={0.6}>
          <button
            onClick={() => onNavigate('home')}
            className="group inline-flex items-center gap-2 mb-8 md:mb-12 text-[#0b0f2a]/60 hover:text-[#0e958e] text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            Zur Startseite
          </button>
        </Reveal>

        <h1 className="text-[clamp(40px,7vw,100px)] font-black leading-[0.85] tracking-tighter uppercase text-[#0b0f2a]">
          <RevealText as="span" by="word" text="Unsere" />
          <RevealText as="span" by="word" text="Services." className="text-[#0e958e] italic" delay={0.14} />
        </h1>
        <Reveal as="p" delay={0.3} className="text-slate-900 font-bold text-lg md:text-xl mt-6 max-w-xl leading-snug tracking-tight">
          Von der digitalen Experience bis zum physischen Erlebnis.
        </Reveal>
        <Reveal as="p" delay={0.38} className="text-slate-600 font-medium text-base md:text-lg mt-3 max-w-2xl leading-relaxed tracking-tight">
          Wählt einen Bereich — die vier Säulen zuerst, dahinter alles, was wir sonst noch abdecken.
        </Reveal>
      </section>

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
      <div ref={filterRef} className="border-y border-[#0b0f2a]/12">
        <div className={`${CONTAINER} py-4 md:py-5`}>
          <div
            role="tablist"
            aria-label="Services"
            className="services-filter flex gap-2 md:gap-2.5 overflow-x-auto snap-x pb-1 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((s, i) => (
              <React.Fragment key={s.slug}>
                {/* The four pillars are the ones the homepage sends people in
                    on, so they are kept readable as a group rather than buried
                    in a run of ten identical pills. On desktop the pills wrap,
                    so the break is a real one: a zero-height item spanning the
                    row pushes the remaining six onto their own line. On mobile
                    the row scrolls and never wraps, so a rule is the right cue
                    there instead. */}
                {i === PILLAR_COUNT && (
                  <>
                    <span aria-hidden="true" className="md:hidden shrink-0 self-center w-px h-6 bg-[#0b0f2a]/15 mx-1" />
                    <span aria-hidden="true" className="hidden md:block basis-full h-0" />
                  </>
                )}
                <FilterPill label={s.title} active={s.slug === active} onSelect={() => select(s.slug)} />
              </React.Fragment>
            ))}
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
          <ServiceView content={content} onOpenBooking={onOpenBooking} />
        </motion.div>
      </AnimatePresence>

      <style>{`.services-filter::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};
