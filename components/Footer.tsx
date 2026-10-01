
import React from 'react';
import { Youtube, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { resetConsent } from './cookieConsent';

interface FooterProps {
  onNavigate: (page: 'home' | 'services' | 'impressum' | 'privacy' | 'webdesign' | 'esport-turnier-organisieren' | 'white-label-turnierplattform' | 'gaming-dienstleister-fuer-agenturen' | 'teambuilding-gaming-esport' | 'gaming-esport-betriebssport' | 'gaming-esport-dienstleister' | 'blog' | 'kontakt' | 'livestreams' | 'landingpages' | 'gaming-areas' | 'eventmodule') => void;
  scrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, scrollToSection }) => {
  const handleNav = (e: React.MouseEvent, page: 'home' | 'services' | 'impressum' | 'privacy' | 'webdesign' | 'esport-turnier-organisieren' | 'white-label-turnierplattform' | 'gaming-dienstleister-fuer-agenturen' | 'teambuilding-gaming-esport' | 'gaming-esport-betriebssport' | 'gaming-esport-dienstleister' | 'blog' | 'kontakt' | 'livestreams' | 'landingpages' | 'gaming-areas' | 'eventmodule') => {
    e.preventDefault();
    onNavigate(page);
  };

  const socialLinks = [
    { Icon: Youtube, href: "https://www.youtube.com/@eSport-Manufaktur" },
    { Icon: Instagram, href: "https://www.instagram.com/esport.manufaktur" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/esport-manufaktur-gmbh/" }
  ];

  return (
    <div className="w-full bg-[#badeda]">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-14">
        <footer data-track-location="footer" className="py-24 md:py-32 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[1100px] mx-auto"
          >
            {/* The track count has to match what the children actually occupy:
                the intro block spans 2, Links and Rechtliches take 1 each, so
                the grid needs exactly 4. It declared 5 at lg, leaving a phantom
                empty track on the right -- the container was centred, but the
                content inside it sat 233px left of centre because of it. */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 lg:gap-16 mb-24">
              <div className="col-span-2">
                <a
                  href="#home"
                  onClick={(e) => handleNav(e, 'home')}
                  className="flex items-center gap-3 mb-8 group"
                  aria-label="GG Manufaktur"
                >
                  <img src="/logos/GG_Bildmarke_pos.png" alt="GG Manufaktur" className="h-9 w-auto object-contain" />
                </a>
                <p className="text-slate-600 max-w-sm leading-relaxed mb-10 text-lg font-medium tracking-tight">
                  Wir entwickeln Gamification, Events und Markenaktivierungen – von der ersten Idee bis zur Umsetzung. Live, digital und immer mit dem Ziel, Menschen zu begeistern.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map(({ Icon, href }, i) => (
                    <motion.a 
                      key={i} 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, backgroundColor: "#10b981", color: "#fff" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white/40 border border-white/40 rounded-full flex items-center justify-center text-slate-700 transition-colors shadow-sm"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-[0.3em]">Links</h4>
                <ul className="space-y-4 text-slate-600 text-base font-bold tracking-tight">
                  <li><a href="#home" onClick={(e) => handleNav(e, 'home')} className="hover:text-emerald-700 transition-colors">Startseite</a></li>
                  <li><a href="/esport-turnier-organisieren" onClick={(e) => handleNav(e, 'esport-turnier-organisieren')} className="hover:text-emerald-700 transition-colors">eSport Turnier organisieren</a></li>
                  <li><a href="/white-label-turnierplattform" onClick={(e) => handleNav(e, 'white-label-turnierplattform')} className="hover:text-emerald-700 transition-colors">White-Label Turnierplattform</a></li>
                  <li><a href="/gaming-esport-dienstleister" onClick={(e) => handleNav(e, 'gaming-esport-dienstleister')} className="hover:text-emerald-700 transition-colors">Gaming & eSport Dienstleister</a></li>
                  <li><a href="/gaming-dienstleister-fuer-agenturen" onClick={(e) => handleNav(e, 'gaming-dienstleister-fuer-agenturen')} className="hover:text-emerald-700 transition-colors">Gaming für Agenturen</a></li>
                  <li><a href="/teambuilding-gaming-esport" onClick={(e) => handleNav(e, 'teambuilding-gaming-esport')} className="hover:text-emerald-700 transition-colors">Teambuilding mit Gaming</a></li>
                  <li><a href="/gaming-esport-betriebssport" onClick={(e) => handleNav(e, 'gaming-esport-betriebssport')} className="hover:text-emerald-700 transition-colors">Gaming als Betriebssport</a></li>
                  <li><a href="/blog" onClick={(e) => handleNav(e, 'blog')} className="hover:text-emerald-700 transition-colors">Blog</a></li>
                  <li><a href="/kontakt" onClick={(e) => handleNav(e, 'kontakt')} className="hover:text-emerald-700 transition-colors">Kontakt</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-[0.3em]">Rechtliches</h4>
                <ul className="space-y-4 text-slate-600 text-base font-bold tracking-tight">
                  <li><a href="#impressum" onClick={(e) => handleNav(e, 'impressum')} className="hover:text-emerald-700 transition-colors">Impressum</a></li>
                  <li><a href="#privacy" onClick={(e) => handleNav(e, 'privacy')} className="hover:text-emerald-700 transition-colors">Datenschutz</a></li>
                  {/* Consent has to be withdrawable, not just grantable --
                      this clears the stored decision and reopens the dialog. */}
                  <li>
                    <button
                      type="button"
                      onClick={() => resetConsent()}
                      className="hover:text-emerald-700 transition-colors text-left"
                    >
                      Cookie-Einstellungen
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-900/10 text-[11px] md:text-xs text-slate-500 font-bold text-center md:text-left gap-6">
              {/* Der Auszenauftritt, ohne Rechtsform: die eingetragene Firma
                  heiszt bis zur Umfirmierung eSport Manufaktur GmbH und steht
                  so im Impressum. */}
              <p>GG Manufaktur – 2026</p>
              <p className="md:text-right">
                {/* Die Zeile fuehrt nicht mehr nach auszen, sondern auf die
                    eigene Seite: wer sie anklickt, hat gerade gesehen, was
                    dort angeboten wird. */}
                Website designed by{' '}
                <a
                  href="/webdesign"
                  onClick={(e) => handleNav(e, 'webdesign')}
                  className="text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  Akan
                </a>
              </p>
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};
