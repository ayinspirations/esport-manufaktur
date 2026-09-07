
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Competencies } from './components/Competencies';
import { BestCases } from './components/BestCases';
import { CaseShowcase } from './components/CaseShowcase';
import { CasesCTA } from './components/CasesCTA';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { BlogSection } from './components/BlogSection';
import { blogPosts, blogRoutes, getBlogPost } from './components/blogPosts';
import { CASE_META, CASE_SLUGS } from './components/caseMeta';
import { useDocumentHead } from './hooks/useDocumentHead';
import { resolveServiceSlug } from './components/serviceCatalogue';
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
// ---------------------------------------------------------------------------
// Nachladen, das einen Deploy ueberlebt
// ---------------------------------------------------------------------------
// Die Routen unten liegen in eigenen Dateien, die erst beim Klick geholt
// werden. Deren Namen tragen einen Hash des Inhalts -- nach jedem Deploy
// heiszen sie anders, und die alten sind weg.
//
// Wer die Seite offen hatte, waehrend deployt wurde, haelt damit ein
// index.html, das auf Dateien zeigt, die es nicht mehr gibt. Der Klick loeste
// dann ein `import()` aus, das ins Leere lief; React hatte keine Auffangstelle
// dafuer, also blieb die Seite leer, bis jemand neu lud. Genau das war die
// Meldung "geht erst nach dem Neuladen" -- und an einem Tag mit acht Deploys
// trifft es jeden, der laenger als eine Runde liest.
//
// Also: ein zweiter Versuch (eine abgerissene Verbindung ist der haeufigere
// Fall), und wenn auch der scheitert, laedt die Seite sich einmal selbst neu.
// Das holt index.html mitsamt den heutigen Dateinamen; der Merker verhindert,
// dass daraus eine Schleife wird, falls wirklich etwas kaputt ist.
// ---------------------------------------------------------------------------

const RELOAD_MARK = 'gg:chunk-reload';

/** sessionStorage kann werfen (private Fenster, gesperrte Speicher). */
const mark = {
  read: () => { try { return sessionStorage.getItem(RELOAD_MARK); } catch { return null; } },
  set: () => { try { sessionStorage.setItem(RELOAD_MARK, '1'); } catch { /* egal */ } },
  clear: () => { try { sessionStorage.removeItem(RELOAD_MARK); } catch { /* egal */ } }
};

function lazyRoute<T extends React.ComponentType<any>>(load: () => Promise<{ default: T }>) {
  return lazy(() =>
    load()
      .then((mod) => { mark.clear(); return mod; })
      .catch((error) =>
        load()
          .then((mod) => { mark.clear(); return mod; })
          .catch(() => {
            if (!mark.read()) {
              mark.set();
              window.location.reload();
              // Der Aufrufer braucht ein Versprechen; eingeloest wird es nie,
              // weil die Seite in diesem Moment ohnehin neu laedt.
              return new Promise<{ default: T }>(() => {});
            }
            throw error;
          })
      )
  );
}

const BlogDetail = lazyRoute(() => import('./components/BlogDetail').then(m => ({ default: m.BlogDetail })));
const LegalPage = lazyRoute(() => import('./components/LegalPage').then(m => ({ default: m.LegalPage })));
const CaseDetail = lazyRoute(() => import('./components/CaseDetail').then(m => ({ default: m.CaseDetail })));
const TSystemsDetail = lazyRoute(() => import('./components/TSystemsDetail').then(m => ({ default: m.TSystemsDetail })));
const BayernZocktDetail = lazyRoute(() => import('./components/BayernZocktDetail').then(m => ({ default: m.BayernZocktDetail })));
const Showdown0711Detail = lazyRoute(() => import('./components/Showdown0711Detail').then(m => ({ default: m.Showdown0711Detail })));
const BFVDetail = lazyRoute(() => import('./components/BFVDetail').then(m => ({ default: m.BFVDetail })));
const IntersportDetail = lazyRoute(() => import('./components/IntersportDetail').then(m => ({ default: m.IntersportDetail })));
const ReweDetail = lazyRoute(() => import('./components/ReweDetail').then(m => ({ default: m.ReweDetail })));
const XpDaysDetail = lazyRoute(() => import('./components/XpDaysDetail').then(m => ({ default: m.XpDaysDetail })));
const DekraDetail = lazyRoute(() => import('./components/DekraDetail').then(m => ({ default: m.DekraDetail })));
const InterwettenDetail = lazyRoute(() => import('./components/InterwettenDetail').then(m => ({ default: m.InterwettenDetail })));
const NiveaEffectCrackzDetail = lazyRoute(() => import('./components/NiveaEffectCrackzDetail').then(m => ({ default: m.NiveaEffectCrackzDetail })));
const ServicesPage = lazyRoute(() => import('./components/ServicesPage').then(m => ({ default: m.ServicesPage })));
const UeberUnsPage = lazyRoute(() => import('./components/UeberUnsPage').then(m => ({ default: m.UeberUnsPage })));
const MeineGeschichte = lazyRoute(() => import('./components/MeineGeschichte').then(m => ({ default: m.MeineGeschichte })));
const WebdesignPage = lazyRoute(() => import('./components/WebdesignPage').then(m => ({ default: m.WebdesignPage })));
const CookiePopup = lazyRoute(() => import('./components/CookiePopup').then(m => ({ default: m.CookiePopup })));
const BookingModal = lazyRoute(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));
const ContactModal = lazyRoute(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));

/**
 * Steht an der Stelle einer Route, solange deren Datei unterwegs ist.
 *
 * Volle Schirmhoehe und die Flaeche der Seite: ein Platzhalter, der zu nichts
 * zusammenfaellt, wuerde die Scrollhoehe auf null ziehen und einen Wimpernschlag
 * spaeter zurueck -- die Seite zuckt.
 *
 * Nach einem Drittel einer Sekunde kommt ein Zeichen dazu. Kuerzer waere es
 * ein Flackern; laenger sieht eine leere Flaeche aus, als sei etwas kaputt --
 * und wer das denkt, laedt neu, statt zu warten.
 */
const RouteFallback = () => {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSlow(true), 320);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <div className="min-h-screen bg-[#badeda] flex items-start justify-center pt-[38vh]" role="status" aria-live="polite">
      <span
        className="w-8 h-8 rounded-full border-2 border-[#0b0f2a]/15 border-t-[#0e958e] transition-opacity duration-300"
        style={{ opacity: slow ? 1 : 0, animation: 'gg-spin 700ms linear infinite' }}
      />
      <span className="sr-only">Seite wird geladen</span>
    </div>
  );
};

/**
 * Faengt ab, was beim Laden einer Route schiefgeht.
 *
 * Ohne sie nimmt ein einziges fehlgeschlagenes `import()` die ganze Anwendung
 * mit: React raeumt den Baum ab, zurueck bleibt eine weisze Flaeche ohne
 * Hinweis, was zu tun waere. lazyRoute oben faengt den haeufigsten Fall schon
 * vorher ab; was hier ankommt, ist der Rest -- und der bekommt wenigstens eine
 * Seite, die sagt, was los ist, und einen Knopf, der es behebt.
 */
// React liegt in diesem Projekt ohne Typdefinitionen vor -- @types/react ist
// nicht installiert, und der Rest des Codes kommt ohne aus, weil er nur
// Funktionskomponenten schreibt. Eine Auffangstelle muss aber eine Klasse
// sein (nur sie kennt getDerivedStateFromError), und dafuer braucht
// TypeScript die Basisklasse; ohne Typen kennt es weder `props` noch `state`.
// Deshalb steht sie hier einmal als `any`.
const ReactComponent: any = React.Component;

class RouteBoundary extends ReactComponent {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Route konnte nicht geladen werden:', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-screen bg-[#badeda] flex flex-col items-center justify-center gap-5 px-6 text-center">
        <h2 className="text-[clamp(24px,4vw,40px)] font-black uppercase tracking-tighter text-[#0b0f2a] leading-[0.95]">
          Diese Seite ist gerade nicht<br />durchgekommen.
        </h2>
        <p className="text-slate-600 font-medium max-w-sm leading-relaxed">
          Meist liegt es an der Verbindung oder an einer frisch veröffentlichten Fassung dieser Website.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-full bg-[#0b0f2a] hover:bg-[#0e958e] text-white text-sm font-bold tracking-tight transition-colors"
        >
          Neu laden
        </button>
      </div>
    );
  }
}

type Page =
  | 'home' | 'services' | 'impressum' | 'privacy' | 'hagebau' | 'tsystems' | 'bayern-zockt' | 'showdown-0711' | 'bfv' | 'intersport' | 'rewe' | 'xp-days' | 'dekra' | 'interwetten' | 'consumenta'
  | 'gamification-messestand' | 'gamification-im-marketing'
  | 'ueber-uns' | 'meine-geschichte' | 'webdesign';

/**
 * A resolved location: which page, and -- on the services page -- which
 * service is open.
 *
 * The individual services used to each be their own `Page`, back when each was
 * a separate route with its own component. They are one page with a filter
 * now, so the service is a parameter of that page rather than a page of its
 * own. It still has its own URL: `/services/<slug>` addresses the services
 * page with that service selected.
 */
interface Route {
  page: Page;
  service?: string;
}

const blogSlugs = blogPosts.map((post) => post.slug);

/**
 * Resolves the current route from either a real pathname (/services,
 * /services/<slug>, /ueber-uns) or the #hash the rest of the site still uses
 * -- read for the very first render and again on every hashchange/popstate
 * (browser back/forward).
 *
 * At module scope rather than inside the mount effect so that the first render
 * can already be the right page; see the `useState` initialiser below.
 */
const resolveRoute = (): Route => {
  const path = window.location.pathname.replace(/\/+$/, '');

  const serviceMatch = path.match(/^\/services\/([a-z0-9-]+)$/);
  if (serviceMatch) {
    // resolveServiceSlug follows a rename, so the two slugs these pages used
    // to live under still land on the right service instead of a 404.
    return { page: 'services', service: resolveServiceSlug(serviceMatch[1]) };
  }
  if (path === '/services') {
    return { page: 'services' };
  }
  if (path === '/ueber-uns') {
    return { page: 'ueber-uns' };
  }
  if (path === '/ueber-uns/meine-geschichte') {
    return { page: 'meine-geschichte' };
  }
  if (path === '/webdesign') {
    return { page: 'webdesign' };
  }
  // Auch ein Best Case lebt unter einer eigenen Adresse. Hinter einer Raute
  // ist er fuer eine Suchmaschine kein eigenes Dokument, sondern ein Anker in
  // der Startseite -- elf Seiten, die nie in einer Trefferliste auftauchen.
  const caseMatch = path.match(/^\/best-cases\/([a-z0-9-]+)$/);
  if (caseMatch && CASE_SLUGS.includes(caseMatch[1])) {
    return { page: caseMatch[1] as Page };
  }

  // Ein Artikel lebt unter seiner eigenen Adresse, nicht hinter einer Raute.
  // Frueher genutzte Adressen fuehren ueber getBlogPost auf den heutigen
  // Artikel, statt den Leser auf der Startseite abzuliefern.
  const blogMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blogMatch) {
    const post = getBlogPost(blogMatch[1]);
    if (post) return { page: post.slug as Page };
  }

  const currentHash = window.location.hash.replace('#', '');
  const validPages: string[] = ['home', 'services', 'impressum', 'privacy', 'hagebau', 'tsystems', 'bayern-zockt', 'showdown-0711', 'bfv', 'intersport', 'rewe', 'xp-days', 'dekra', 'interwetten', 'consumenta', ...blogRoutes];
  if (validPages.includes(currentHash)) {
    // Auch hinter der Raute kann eine alte Artikeladresse stehen.
    const post = getBlogPost(currentHash);
    return { page: (post ? post.slug : currentHash) as Page };
  }
  return { page: 'home' };
};

/**
 * Setzt Titel, Beschreibung und kanonische Adresse einer Best-Case-Seite.
 *
 * Als eigene Komponente und nicht als Aufruf in App, weil ein Hook nicht
 * bedingt aufgerufen werden darf -- hier haengt er an der Lebensdauer genau
 * der Seite, um die es geht, und raeumt beim Verlassen selbst auf.
 */
const CaseHead: React.FC<{ slug: string; children: React.ReactNode }> = ({ slug, children }) => {
  const meta = CASE_META[slug];
  useDocumentHead({
    title: meta.title,
    description: meta.description,
    canonicalPath: `/best-cases/${slug}`,
    ogImage: meta.image
  });
  return <>{children}</>;
};

/**
 * Navigation targets. A plain page id, or `service:<slug>` to open the
 * services page on one particular service -- which is what the homepage
 * pillar tiles send.
 */
const SERVICE_TARGET = /^service:([a-z0-9-]+)$/;

export default function App() {
  // Resolved during the first render, not afterwards in an effect.
  //
  // This used to start at 'home' behind an `isMounted` flag that an effect
  // flipped, which cost every visit a full render-and-paint of a bare dark
  // rectangle before anything real appeared -- the route was not known until
  // after React had already committed once. Reading the URL in the state
  // initialiser makes the first commit the correct page, so the hero (or
  // whichever route was linked) is in the very first paint.
  const [route, setRoute] = useState<Route>(resolveRoute);
  const { page: activePage } = route;
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  // Latches true on the first open; see the BookingModal mount below.
  const [hasOpenedBooking, setHasOpenedBooking] = useState(false);

  const openBooking = () => {
    setHasOpenedBooking(true);
    setIsBookingOpen(true);
  };

  // Same latching as the booking modal: its chunk never loads for a visitor who
  // does not ask, and once it has, the modal stays mounted so AnimatePresence
  // can still play its close animation.
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>(undefined);
  const [hasOpenedContact, setHasOpenedContact] = useState(false);

  const openContact = (subject?: string) => {
    setContactSubject(subject);
    setHasOpenedContact(true);
    setIsContactOpen(true);
  };

  useEffect(() => {
    // Der Browser stellt beim Zurueckgehen die alte Scrollposition wieder her
    // -- und tut das erst nach unserem eigenen Sprung nach oben. Auf einer
    // Seite, die kuerzer ist als die, von der man kommt, landet man dadurch
    // unterhalb des Inhalts: sichtbar bleibt die dunkle Flaeche. Wir setzen
    // die Position ohnehin selbst, also nehmen wir dem Browser die Aufgabe ab.
    const previousRestoration = history.scrollRestoration;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const handleNav = () => {
      setRoute(resolveRoute());
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
      if ('scrollRestoration' in history) history.scrollRestoration = previousRestoration;
    };
  }, []);

  /**
   * `target` is a page id, or `service:<slug>` to open the services page on a
   * particular service.
   */
  const navigateTo = (target: string) => {
    document.querySelectorAll('video').forEach(v => {
      v.pause();
      v.currentTime = 0;
    });

    const service = target.match(SERVICE_TARGET)?.[1];
    const page = (service ? 'services' : target) as Page;

    setRoute({ page, service });
    // Instant for the same reason as handleNav above: this reset races the
    // render of a page that is usually much shorter, and an animated one
    // loses that race.
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    if (service) {
      window.history.pushState(null, '', `/services/${service}`);
    } else if (page === 'services') {
      window.history.pushState(null, '', '/services');
    } else if (page === 'ueber-uns') {
      window.history.pushState(null, '', '/ueber-uns');
    } else if (page === 'meine-geschichte') {
      window.history.pushState(null, '', '/ueber-uns/meine-geschichte');
    } else if (page === 'webdesign') {
      window.history.pushState(null, '', '/webdesign');
    } else if (CASE_SLUGS.includes(page)) {
      window.history.pushState(null, '', `/best-cases/${page}`);
    } else if (blogSlugs.includes(page)) {
      window.history.pushState(null, '', `/blog/${page}`);
    } else {
      window.history.pushState(null, '', `/#${page}`);
    }
  };

  const openBlogPost = (slug: string) => navigateTo(slug);

  /**
   * Switching service inside the services page.
   *
   * Deliberately not `navigateTo`: that resets the scroll to the top of the
   * document, which is right when the whole page changes and wrong here --
   * the services page scrolls itself back to its filter bar, keeping the
   * filter in view so the next switch is one click away rather than one
   * scroll-up-and-click.
   */
  const selectService = (service: string) => {
    setRoute({ page: 'services', service });
    window.history.pushState(null, '', `/services/${service}`);
  };

  const scrollToSection = (id: string) => {
    if (activePage !== 'home') {
      setRoute({ page: 'home' });
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
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white bg-[#badeda] clip-x w-full">
      <div className="noise fixed inset-0 z-50 pointer-events-none" />
      
      <Navbar onNavigate={navigateTo} scrollToSection={scrollToSection} activePage={activePage === 'services' ? 'services' : 'home'} />
      
      <main className="relative z-10 flex flex-col gap-0 pb-10">
        {activePage === 'home' && (
          <div className="flex flex-col">
            <Hero onNavigate={navigateTo} scrollToSection={scrollToSection} onOpenBooking={openBooking} />

            <SocialProof scrollToSection={scrollToSection} />

            <Competencies onNavigate={navigateTo} />

            <Purpose onNavigate={navigateTo} />

            <BestCases onNavigate={navigateTo} />

            {/* The same five cases as a full-viewport stage, directly under the
                mosaic: the grid above is for comparing them, this is for
                looking at one. */}
            <CaseShowcase />

            {/* Erst hinter beiden Case-Sektionen die Frage nach dem Projekt --
                unter dem Mosaik stand sie noch mitten in den Cases. */}
            <CasesCTA onOpenBooking={openBooking} onOpenContact={openContact} onScroll={scrollToSection} />

            <BlogSection onOpenPost={openBlogPost} />

            <div id="contact-section">
              <ContactForm />
            </div>
          </div>
        )}

        {/* `key` haengt an der Route: eine Auffangstelle, die einmal
            ausgeloest hat, bleibt sonst ausgeloest -- auch fuer die naechste
            Seite, die vielleicht problemlos laedt. */}
        <RouteBoundary key={activePage}>
        <Suspense fallback={activePage === 'home' ? null : <RouteFallback />}>
        {activePage === 'services' && (
          <ServicesPage
            slug={route.service}
            onNavigate={navigateTo}
            onSelectService={selectService}
            onOpenBooking={openBooking}
            onOpenContact={openContact}
            onOpenPost={openBlogPost}
          />
        )}
        {/* Back from a case returns to the Best Cases section the visitor came
            from, not the top of the homepage -- same as BlogDetail below. */}
        {activePage === 'hagebau' && (
          <CaseHead slug="hagebau">
            <CaseDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'tsystems' && (
          <CaseHead slug="tsystems">
            <TSystemsDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'bayern-zockt' && (
          <CaseHead slug="bayern-zockt">
            <BayernZocktDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'showdown-0711' && (
          <CaseHead slug="showdown-0711">
            <Showdown0711Detail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'bfv' && (
          <CaseHead slug="bfv">
            <BFVDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'intersport' && (
          <CaseHead slug="intersport">
            <IntersportDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'rewe' && (
          <CaseHead slug="rewe">
            <ReweDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'xp-days' && (
          <CaseHead slug="xp-days">
            <XpDaysDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'dekra' && (
          <CaseHead slug="dekra">
            <DekraDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'interwetten' && (
          <CaseHead slug="interwetten">
            <InterwettenDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'consumenta' && (
          <CaseHead slug="consumenta">
            <NiveaEffectCrackzDetail onBack={() => scrollToSection('best-cases')} />
          </CaseHead>
        )}
        {activePage === 'impressum' && <LegalPage type="impressum" />}
        {activePage === 'privacy' && <LegalPage type="privacy" />}
        {activePage === 'ueber-uns' && <UeberUnsPage onNavigate={navigateTo} scrollToSection={scrollToSection} onOpenBooking={openBooking} onOpenContact={openContact} />}
        {activePage === 'meine-geschichte' && <MeineGeschichte onNavigate={navigateTo} onOpenBooking={openBooking} onOpenContact={openContact} />}

        {activePage === 'webdesign' && <WebdesignPage onNavigate={navigateTo} onOpenBooking={openBooking} onOpenContact={openContact} />}
        {blogSlugs.includes(activePage) && (
          <BlogDetail
            slug={activePage}
            onBack={() => scrollToSection('blog')}
            onOpenBooking={openBooking}
            onOpenContact={openContact}
          />
        )}
        </Suspense>
        </RouteBoundary>
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
        {hasOpenedContact && (
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            subject={contactSubject}
          />
        )}
      </Suspense>
    </div>
  );
}
