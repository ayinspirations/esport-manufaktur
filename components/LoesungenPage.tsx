import React, { useEffect } from 'react';
import { PageHero } from './PageHero';
import { Reveal } from './Reveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { headFor } from './pageMeta';
import { MONEY_PAGES, SOLUTION_GROUPS } from './money/pages';
import { SolutionTile } from './money/SolutionTile';

// ---------------------------------------------------------------------------
// /loesungen -- alle Money Pages an einem Ort, nach Zielgruppe gruppiert
// ---------------------------------------------------------------------------
// Ersetzt die wachsende Linkliste im Footer: dort steht nur noch "Lösungen".
// Eine neue Money Page kommt in pages.ts in eine Gruppe; Seiten ohne Gruppe
// erscheinen unter "Weitere Lösungen".
// ---------------------------------------------------------------------------

export const LoesungenPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  useDocumentHead(headFor('/loesungen'));
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const grouped = new Set(SOLUTION_GROUPS.flatMap((g) => g.pages));
  const groups = [
    ...SOLUTION_GROUPS,
    { title: 'Weitere Lösungen', pages: MONEY_PAGES.map((m) => m.page).filter((p) => !grouped.has(p)) }
  ]
    .map((g) => ({ ...g, items: g.pages.map((p) => MONEY_PAGES.find((m) => m.page === p)).filter((m): m is NonNullable<typeof m> => !!m) }))
    .filter((g) => g.items.length);

  return (
    <div className="min-h-screen bg-[#badeda]">
      <PageHero
        eyebrow="Gaming · eSport · Gamification"
        title="Unsere"
        accent="Lösungen."
        subline="Konkrete Formate für Unternehmen, Marken, Agenturen und Vereine."
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-24 space-y-16 md:space-y-20">
        {groups.map((g) => (
          <section key={g.title}>
            <Reveal as="h2" className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-[#0b0f2a] mb-6 md:mb-8">
              {g.title}
            </Reveal>
            <div className="grid md:grid-cols-2 gap-4">
              {g.items.map((m, i) => (
                <Reveal key={m.page} delay={i * 0.08}>
                  <SolutionTile m={m} onNavigate={onNavigate} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
