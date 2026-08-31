
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Competencies } from './components/Competencies';
import { BestCases } from './components/BestCases';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { BlogSection } from './components/BlogSection';
import { blogPosts } from './components/blogPosts';
import { serviceSlugs } from './components/serviceSlugs';
import { Purpose } from './components/Purpose';
import { SocialStack } from './components/ui/social-stack';
import { smoothScrollToElement } from './components/motion';

// ---------------------------------------------------------------------------
// Route splitting
// ---------------------------------------------------------------------------
// Everything above is the homepage, which is what an arriving visitor is
// almost always looking at, so it stays in the entry bundle and renders
// without a second round trip.
//
// Everything below is a route reached by a click -- five case studies, the
// services overview and its four subpages, the blog articles, the two legal
// pages, "Über uns" -- plus two overlays that only exist once something is
// interacted with. None of it can be on screen at first paint, and all of it
// was being downloaded, parsed and evaluated before the hero could render.
// Together they were the larger half of a single 667 kB bundle.
//
// `lazy` puts each behind its own chunk, fetched when the route is first
// opened; `warmRouteChunks` below then pulls them in during idle time, so in
// practice the chunk is already cached by the time it is clicked and the
// Suspense fallback never actually shows.
const ServicesDetail = lazy(() => import('./components/ServicesDetail').then(m => ({ default: m.ServicesDetail })));
const BlogDetail = lazy(() => import('./components/BlogDetail').then(m => ({ default: m.BlogDetail })));
const LegalPage = lazy(() => import('./components/LegalPage').then(m => ({ default: m.LegalPage })));
const CaseDetail = lazy(() => import('./components/CaseDetail').then(m => ({ default: m.CaseDetail })));
const TSystemsDetail = lazy(() => import('./components/TSystemsDetail').then(m => ({ default: m.TSystemsDetail })));
const BayernZocktDetail = lazy(() => import('./components/BayernZocktDetail').then(m => ({ default: m.BayernZocktDetail })));
const Showdown0711Detail = lazy(() => import('./components/Showdown0711Detail').then(m => ({ default: m.Showdown0711Detail })));
const BFVDetail = lazy(() => import('./components/BFVDetail').then(m => ({ default: m.BFVDetail })));
const ServiceDetailPage = lazy(() => import('./components/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const UeberUnsPage = lazy(() => import('./components/UeberUnsPage').then(m => ({ default: m.UeberUnsPage })));
const CookiePopup = lazy(() => import('./components/CookiePopup').then(m => ({ default: m.CookiePopup })));
const BookingModal = lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));

/**
 * Held in place of a route while its chunk is in flight.
 *
 * Full viewport height and the page's own background: a short fallback that
 * collapses to nothing would drop the scroll height to zero and then restore
 * it a moment later, which reads as the page flinching.
 */
const RouteFallback = () => <div className="min-h-screen bg-[#badeda]" aria-hidden="true" />;

type Page =
  | 'home' | 'services' | 'impressum' | 'privacy' | 'hagebau' | 'tsystems' | 'bayern-zockt' | 'showdown-0711' | 'bfv'
  | 'gamification-im-marketing' | 'esport-event-planen' | 'streaming-fuer-marken' | 'recruiting-im-gaming' | 'gaming-am-messestand'
  | 'strategie-konzeption' | 'content-streaming' | 'messen-events' | 'digitale-loesungen' | 'ueber-uns';

const blogSlugs = blogPosts.map((post) => post.slug);
// These pages use real pathnames (/services/<slug>, /ueber-uns) instead of
// the #hash routing the rest of the site uses, so they get proper, distinct,
// crawlable URLs for SEO. Everything else keeps working exactly as before.
const servicePages = serviceSlugs as readonly string[] as Page[];

/**
 * Resolves the current page from either a real pathname (/services/<slug>,
 * used by the 4 service detail pages) or the #hash the rest of the site still
 * uses -- read for the very first render and again on every
 * hashchange/popstate (browser back/forward).
 *
 * At module scope rather than inside the mount effect so that the first render
 * can already be the right page; see the `useState` initialiser below.
 */
const resolvePage = (): Page => {
  const path = window.location.pathname.replace(/\/+$/, '');
  const serviceMatch = path.match(/^\/services\/([a-z-]+)$/);
  if (serviceMatch && servicePages.includes(serviceMatch[1] as Page)) {
    return serviceMatch[1] as Page;
  }
  if (path === '/ueber-uns') {
    return 'ueber-uns';
  }

  const currentHash = window.location.hash.replace('#', '');
  const validPages: string[] = ['home', 'services', 'impressum', 'privacy', 'hagebau', 'tsystems', 'bayern-zockt', 'showdown-0711', 'bfv', ...blogSlugs];
  if (validPages.includes(currentHash)) {
    return currentHash as Page;
  }
  return 'home';
};

export default function App() {
  // Resolved during the first render, not afterwards in an effect.
  //
  // This used to start at 'home' behind an `isMounted` flag that an effect
  // flipped, which cost every visit a full render-and-paint of a bare dark
  // rectangle before anything real appeared -- the route was not known until
  // after React had already committed once. Reading the URL in the state
  // initialiser makes the first commit the correct page, so the hero (or
  // whichever route was linked) is in the very first paint.
  const [activePage, setActivePage] = useState<Page>(resolvePage);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  // Latches true on the first open; see the BookingModal mount below.
  const [hasOpenedBooking, setHasOpenedBooking] = useState(false);

  const openBooking = () => {
    setHasOpenedBooking(true);
    setIsBookingOpen(true);
  };

  useEffect(() => {

    const handleNav = () => {
      setActivePage(resolvePage());
      // Explicitly instant. The document has scroll-behavior: smooth, so a
      // bare scrollTo(0, 0) animates -- and an animated reset that is still
      // running when the page content swaps gets cut off part-way, leaving
      // the visitor stranded mid-page on the new route.
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('hashchange', handleNav);
    window.addEventListener('popstate', handleNav);
    return () => {
      window.removeEventListener('hashchange', handleNav);
      window.removeEventListener('popstate', handleNav);
    };
  }, []);

  const navigateTo = (page: Page) => {
    document.querySelectorAll('video').forEach(v => {
      v.pause();
      v.currentTime = 0;
    });
    setActivePage(page);
    // Instant for the same reason as handleNav above: this reset races the
    // render of a page that is usually much shorter, and an animated one
    // loses that race.
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (servicePages.includes(page)) {
      window.history.pushState(null, '', `/services/${page}`);
    } else if (page === 'ueber-uns') {
      window.history.pushState(null, '', '/ueber-uns');
    } else {
      window.history.pushState(null, '', `/#${page}`);
    }
  };

  const openBlogPost = (slug: string) => navigateTo(slug as Page);

  const scrollToSection = (id: string) => {
    if (activePage !== 'home') {
      setActivePage('home');
      window.history.pushState(null, '', '/#home');
      // The homepage has to mount before the target exists. A single frame is
      // not always enough, so poll a few frames rather than silently doing
      // nothing when the element is not there yet.
      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          smoothScrollToElement(el);
        } else if (tries++ < 30) {
          requestAnimationFrame(attempt);
        }
      };
      requestAnimationFrame(attempt);
    } else {
      const el = document.getElementById(id);
      if (el) {
        smoothScrollToElement(el);
      }
    }
  };

  const baseTransition = "pt-16 md:pt-24";
  const standardSectionPadding = "py-24 md:py-32";

  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white bg-[#badeda] overflow-x-hidden w-full">
      <div className="noise fixed inset-0 z-50 pointer-events-none" />
      
      <Navbar onNavigate={navigateTo} scrollToSection={scrollToSection} activePage={activePage === 'services' ? 'services' : 'home'} />
      
      <main className="relative z-10 flex flex-col gap-0 pb-10">
        {activePage === 'home' && (
          <div className="flex flex-col">
            <Hero onNavigate={navigateTo} scrollToSection={scrollToSection} onOpenBooking={openBooking} />

            <SocialProof scrollToSection={scrollToSection} />

            <Competencies onNavigate={navigateTo} />

            <Purpose onNavigate={navigateTo} />

            <BestCases onScroll={scrollToSection} onNavigate={navigateTo} />

            <BlogSection onOpenPost={openBlogPost} />

            <div id="contact-section">
              <ContactForm />
            </div>
          </div>
        )}

        <Suspense fallback={activePage === 'home' ? null : <RouteFallback />}>
        {activePage === 'services' && <ServicesDetail onNavigate={navigateTo} />}
        {/* Back from a case returns to the Best Cases section the visitor came
            from, not the top of the homepage -- same as BlogDetail below. */}
        {activePage === 'hagebau' && <CaseDetail onBack={() => scrollToSection('best-cases')} />}
        {activePage === 'tsystems' && <TSystemsDetail onBack={() => scrollToSection('best-cases')} />}
        {activePage === 'bayern-zockt' && <BayernZocktDetail onBack={() => scrollToSection('best-cases')} />}
        {activePage === 'showdown-0711' && <Showdown0711Detail onBack={() => scrollToSection('best-cases')} />}
        {activePage === 'bfv' && <BFVDetail onBack={() => scrollToSection('best-cases')} />}
        {activePage === 'impressum' && <LegalPage type="impressum" />}
        {activePage === 'privacy' && <LegalPage type="privacy" />}
        {activePage === 'ueber-uns' && <UeberUnsPage onNavigate={navigateTo} scrollToSection={scrollToSection} onOpenBooking={openBooking} />}
        {blogSlugs.includes(activePage) && (
          <BlogDetail slug={activePage} onBack={() => scrollToSection('blog')} />
        )}
        {servicePages.includes(activePage) && (
          <ServiceDetailPage
            slug={activePage}
            onNavigate={navigateTo}
            scrollToSection={scrollToSection}
            onOpenBooking={openBooking}
          />
        )}
        </Suspense>
      </main>

      <Footer onNavigate={navigateTo} scrollToSection={scrollToSection} />
      {activePage === 'home' && <SocialStack />}
      <Suspense fallback={null}>
        <CookiePopup />
        {/* Mounted from the first time it is opened and kept mounted after
            that, rather than mounted on `isBookingOpen`. Its chunk therefore
            never loads for a visitor who does not book, but once it has, the
            modal's own AnimatePresence still gets to play its close
            animation -- unmounting it on close would cut that off. */}
        {hasOpenedBooking && (
          <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        )}
      </Suspense>
    </div>
  );
}
