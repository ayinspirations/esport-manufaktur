import React, { useState } from 'react';
import { Instagram, Linkedin, Youtube, Share2 } from 'lucide-react';

interface SocialStackLink {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  closedClass: string;
  openClass: string;
  hoverClass: string;
  zClass: string;
}

// Same URLs as components/Footer.tsx -- kept in sync manually, not imported,
// since Footer doesn't export them as a shared constant.
const SOCIAL_LINKS: SocialStackLink[] = [
  {
    href: 'https://www.instagram.com/esport.manufaktur',
    label: 'Instagram',
    Icon: Instagram,
    closedClass: 'translate-y-1 scale-95',
    openClass: '-translate-y-16 scale-100',
    hoverClass: 'group-hover:-translate-y-16 group-hover:scale-100',
    zClass: 'z-[3]'
  },
  {
    href: 'https://www.linkedin.com/company/esport-manufaktur-gmbh/',
    label: 'LinkedIn',
    Icon: Linkedin,
    closedClass: 'translate-y-2 scale-90',
    openClass: '-translate-y-32 scale-100',
    hoverClass: 'group-hover:-translate-y-32 group-hover:scale-100',
    zClass: 'z-[2]'
  },
  {
    href: 'https://www.youtube.com/@eSport-Manufaktur',
    label: 'YouTube',
    Icon: Youtube,
    closedClass: 'translate-y-3 scale-[0.85]',
    openClass: '-translate-y-48 scale-100',
    hoverClass: 'group-hover:-translate-y-48 group-hover:scale-100',
    zClass: 'z-[1]'
  }
];

export const SocialStack: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] group">
      <div className="relative h-14 w-14">
        {SOCIAL_LINKS.map(({ href, label, Icon, closedClass, openClass, hoverClass, zClass }, i) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            tabIndex={isOpen ? 0 : -1}
            className={`absolute inset-0 ${zClass} flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/10 bg-[#020617] opacity-100 shadow-[0_0_24px_rgba(52,211,153,0.25)] transition-all duration-500 ease-out ${
              isOpen ? openClass : `${closedClass} ${hoverClass}`
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Icon className="h-5 w-5 text-emerald-400" />
          </a>
        ))}

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label="Social Media Links"
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/10 bg-[#020617] shadow-[0_0_28px_rgba(52,211,153,0.35)] transition-transform duration-300 group-hover:scale-105"
        >
          <Share2 className="h-5 w-5 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
