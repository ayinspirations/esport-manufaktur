
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { ProblemSolution } from './components/ProblemSolution';
import { ScrollTextSection } from './components/ScrollTextSection';
import { Competencies } from './components/Competencies';
import { BestCases } from './components/BestCases';
import { WhyUs } from './components/WhyUs';
import { ContactForm } from './components/ContactForm';
import { Analytics } from '@vercel/analytics/react';
import { Footer } from './components/Footer';
import { ServicesDetail } from './components/ServicesDetail';
import { ScrollToCasesCTA } from './components/ScrollToCasesCTA';
import { LegalPage } from './components/LegalPage';
import { CaseDetail } from './components/CaseDetail';
import { TSystemsDetail } from './components/TSystemsDetail';
import { BayernZocktDetail } from './components/BayernZocktDetail';
import { Showdown0711Detail } from './components/Showdown0711Detail';
import { BFVDetail } from './components/BFVDetail';
import { CookiePopup } from './components/CookiePopup';
import { BookingModal } from './components/BookingModal';

type Page = 'home' | 'services' | 'impressum' | 'privacy' | 'hagebau' | 'tsystems' | 'bayern-zockt' | 'showdown-0711' | 'bfv';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace('#', '');
      const validPages: string[] = ['home', 'services', 'impressum', 'privacy', 'hagebau', 'tsystems', 'bayern-zockt', 'showdown-0711', 'bfv'];
      
      if (validPages.includes(currentHash)) {
        setActivePage(currentHash as Page);
        window.scrollTo(0, 0);
      } else if (currentHash === '') {
        setActivePage('home');
        window.scrollTo(0, 0);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
    window.history.pushState(null, '', `#${page}`);
  };

  const scrollToSection = (id: string) => {
    if (activePage !== 'home') {
      setActivePage('home');
      window.history.pushState(null, '', '#home');
      
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
    return <div className="min-h-screen bg-[#d1dbd2]" />;
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
            
            <div className="pt-16 md:pt-24">
              <SocialProof />
            </div>

            <div className="pt-16 md:pt-24">
              <ScrollToCasesCTA onScroll={scrollToSection} />
            </div>

            <div className="pt-16 md:pt-24">
              <ProblemSolution onNavigate={navigateTo} scrollToSection={scrollToSection} />
            </div>

            <div className="pt-16 md:pt-24">
              <ScrollTextSection />
            </div>

            <div className="pt-16 md:pt-24">
              <Competencies onNavigate={navigateTo} />
            </div>

            <WhyUs />

            <div className="pt-16 md:pt-24" id="best-cases-container">
              <BestCases onScroll={scrollToSection} onNavigate={navigateTo} />
            </div>

            <div className="pt-16 md:pt-24" id="contact-section">
              <ContactForm />
            </div>
          </div>
        )}

        {activePage === 'services' && <ServicesDetail onNavigate={navigateTo} />}
        {activePage === 'hagebau' && <CaseDetail onBack={() => navigateTo('home')} />}
        {activePage === 'tsystems' && <TSystemsDetail onBack={() => navigateTo('home')} />}
        {activePage === 'bayern-zockt' && <BayernZocktDetail onBack={() => navigateTo('home')} />}
        {activePage === 'showdown-0711' && <Showdown0711Detail onBack={() => navigateTo('home')} />}
        {activePage === 'bfv' && <BFVDetail onBack={() => navigateTo('home')} />}
        {activePage === 'impressum' && <LegalPage type="impressum" />}
        {activePage === 'privacy' && <LegalPage type="privacy" />}
      </main>

      <Footer onNavigate={navigateTo} scrollToSection={scrollToSection} />
      <CookiePopup />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Analytics />
    </div>
  );
}
