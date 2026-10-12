import React from 'react';
import { Reveal } from '../Reveal';
import { MONEY_PAGES, RELATED_SOLUTIONS } from './pages';
import { SolutionTile } from './SolutionTile';

// ---------------------------------------------------------------------------
// "Passend dazu" -- zwei Money Pages unter einer Seite
// ---------------------------------------------------------------------------
// Die Money Pages werden aus dem Inhalt heraus verlinkt (Leistungen, Best
// Cases, untereinander) statt als lange Liste im Footer. Welche Seite wohin
// fuehrt, steht in RELATED_SOLUTIONS.
// ---------------------------------------------------------------------------

export const RelatedSolutions: React.FC<{ from: string; onNavigate: (page: string) => void; className?: string }> = ({ from, onNavigate, className }) => {
  const items = (RELATED_SOLUTIONS[from] ?? [])
    .map((p) => MONEY_PAGES.find((m) => m.page === p))
    .filter((m): m is NonNullable<typeof m> => !!m);
  if (!items.length) return null;

  return (
    <section className={className ?? 'bg-[#badeda] py-16 md:py-24'}>
      {/* Mit eigener className bringt der Aufrufer den Container mit. */}
      <div className={className ? '' : 'max-w-[1440px] mx-auto px-6 md:px-14'}>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <Reveal as="h2" className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#0b0f2a]">
            Passend <span className="text-[#0e958e] italic">dazu.</span>
          </Reveal>
          <a
            href="/loesungen"
            onClick={(e) => { e.preventDefault(); onNavigate('loesungen'); }}
            className="font-black text-[#0b0f2a] hover:text-[#0e958e] transition-colors"
          >
            Alle Lösungen ansehen →
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((m, i) => (
            <Reveal key={m.page} delay={i * 0.08}>
              <SolutionTile m={m} onNavigate={onNavigate} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
