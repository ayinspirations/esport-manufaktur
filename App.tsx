
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Competencies } from './components/Competencies';
import { BestCases } from './components/BestCases';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ServicesDetail } from './components/ServicesDetail';
import { BlogSection } from './components/BlogSection';
import { BlogDetail } from './components/BlogDetail';
import { blogPosts } from './components/blogPosts';
import { LegalPage } from './components/LegalPage';
import { CaseDetail } from './components/CaseDetail';
import { TSystemsDetail } from './components/TSystemsDetail';
import { BayernZocktDetail } from './components/BayernZocktDetail';
import { Showdown0711Detail } from './components/Showdown0711Detail';
import { BFVDetail } from './components/BFVDetail';
import { CookiePopup } from './components/CookiePopup';
import { BookingModal } from './components/BookingModal';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { servicesContent, serviceSlugs } from './components/servicesContent';
import { Purpose } from './components/Purpose';
import { UeberUnsPage } from './components/UeberUnsPage';
import { SocialStack } from './components/ui/social-stack';

type Page =
  | 'home' | 'services' | 'impressum' | 'privacy' | 'hagebau' | 'tsystems' | 'bayern-zockt' | 'showdown-0711' | 'bfv'
  | 'gamification-im-marketing' | 'esport-event-planen' | 'streaming-fuer-marken' | 'recruiting-im-gaming' | 'gaming-am-messestand'
  | 'strategie-konzeption' | 'content-streaming' | 'messen-events' | 'digitale-loesungen' | 'ueber-uns';

const blogSlugs = blogPosts.map((post) => post.slug);
// These pages use real pathnames (/services/<slug>, /ueber-uns) instead of
// the #hash routing the rest of the site uses, so they get proper, distinct,
// crawlable URLs for SEO. Everything else keeps working exactly as before.
const servicePages = serviceSlugs as Page[];

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Resolves the current page from either a real pathname (/services/<slug>,
    // used by the 4 new service detail pages) or the #hash the rest of the
    // site still uses -- checked on first mount and again on every
    // hashchange/popstate (browser back/forward).
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

    const handleNav = () => {
      setActivePage(resolvePage());
      window.scrollTo(0, 0);
    };

    handleNav();
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
    window.scrollTo(0, 0);
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

      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-[#020617]" />;
  }

  const baseTransition = "pt-16 md:pt-24";
  const standardSectionPadding = "py-24 md:py-32";

  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white bg-[#d1dbd2] overflow-x-hidden w-full">
      <div className="noise fixed inset-0 z-50 pointer-events-none" />
      
      <Navbar onNavigate={navigateTo} scrollToSection={scrollToSection} activePage={activePage === 'services' ? 'services' : 'home'} />
      
      <main className="relative z-10 flex flex-col gap-0 pb-10">
        {activePage === 'home' && (
          <div className="flex flex-col">
            <Hero onNavigate={navigateTo} scrollToSection={scrollToSection} onOpenBooking={() => setIsBookingOpen(true)} />

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
        {activePage === 'ueber-uns' && <UeberUnsPage onNavigate={navigateTo} scrollToSection={scrollToSection} />}
        {blogSlugs.includes(activePage) && (
          <BlogDetail slug={activePage} onBack={() => scrollToSection('blog')} />
        )}
        {servicePages.includes(activePage) && (
          <ServiceDetailPage
            content={servicesContent[activePage]}
            onNavigate={navigateTo}
            scrollToSection={scrollToSection}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} scrollToSection={scrollToSection} />
      {activePage === 'home' && <SocialStack />}
      <CookiePopup />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
