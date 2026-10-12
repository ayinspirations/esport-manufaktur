import React from 'react';
import { MoneyPageLink } from './pages';

/** Dunkle Kachel einer Money Page -- auf /loesungen und unter "Passend dazu". */
export const SolutionTile: React.FC<{ m: MoneyPageLink; onNavigate: (page: string) => void }> = ({ m, onNavigate }) => (
  <a
    href={`/${m.page}`}
    onClick={(e) => { e.preventDefault(); onNavigate(m.page); }}
    className="group block h-full tile-gradient text-white rounded-card border border-white/10 p-7 md:p-10 transition-transform duration-500 hover:scale-[1.01]"
  >
    <span className="block text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3">{m.eyebrow}</span>
    <span className="block text-[clamp(22px,2.6vw,34px)] font-black uppercase tracking-tighter leading-tight">
      {m.title} <span className="text-[#2dd4bf]">→</span>
    </span>
    <span className="block mt-3 text-white/65 text-sm md:text-base font-medium max-w-2xl">{m.text}</span>
  </a>
);
