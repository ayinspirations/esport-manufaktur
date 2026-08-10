
import React from 'react';
import { Youtube, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { SocialStack } from './ui/social-stack';

interface FooterProps {
  onNavigate: (page: 'home' | 'services' | 'impressum' | 'privacy') => void;
  scrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, scrollToSection }) => {
  const handleNav = (e: React.MouseEvent, page: 'home' | 'services' | 'impressum' | 'privacy') => {
    e.preventDefault();
    onNavigate(page);
  };

  const socialLinks = [
    { Icon: Youtube, href: "https://www.youtube.com/@eSport-Manufaktur" },
    { Icon: Instagram, href: "https://www.instagram.com/esport.manufaktur" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/esport-manufaktur-gmbh/" }
  ];

  return (
    <div className="w-full bg-[#d1dbd2]">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-14">
        <footer className="py-24 md:py-32 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1100px] mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-16 mb-24">
              <div className="col-span-2">
                <a
                  href="#home"
                  onClick={(e) => handleNav(e, 'home')}
                  className="flex items-center gap-3 mb-8 group"
                  aria-label="eSport Manufaktur"
                >
                  <img src="/logos/Esport-Manufaktur_Logo-blau.png" alt="eSport Manufaktur" className="h-9 w-auto object-contain" />
                </a>
                <p className="text-slate-600 max-w-sm leading-relaxed mb-10 text-lg font-medium tracking-tight">
                  Wir verbinden Gaming, eSport und Gamification mit Strategie, Technologie und echten Erlebnissen – digital, physisch und immer mit dem Ziel, Menschen zu begeistern und Marken erlebbar zu machen.
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
                  <li><a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection('blog'); }} className="hover:text-emerald-700 transition-colors">Blog</a></li>
                  <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-emerald-700 transition-colors">Kontakt</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-[0.3em]">Rechtliches</h4>
                <ul className="space-y-4 text-slate-600 text-base font-bold tracking-tight">
                  <li><a href="#impressum" onClick={(e) => handleNav(e, 'impressum')} className="hover:text-emerald-700 transition-colors">Impressum</a></li>
                  <li><a href="#privacy" onClick={(e) => handleNav(e, 'privacy')} className="hover:text-emerald-700 transition-colors">Datenschutz</a></li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-900/10 text-[11px] md:text-xs text-slate-500 font-bold text-center md:text-left gap-6">
              <p>© 2025 eSport Manufaktur GmbH</p>
              <p className="md:text-right">
                Webseite umgesetzt durch <a href="https://www.akiistudio.de" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500 transition-colors">Akii Studio</a>
              </p>
            </div>
          </motion.div>
        </footer>
      </div>
      <SocialStack />
    </div>
  );
};
