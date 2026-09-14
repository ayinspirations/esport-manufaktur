import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useDocumentHead } from '../hooks/useDocumentHead';

interface NotFoundPageProps {
  onNavigate: (page: any) => void;
}

/**
 * Was unter einer Adresse steht, die es nicht gibt.
 *
 * Vorher stand dort die Startseite. Fuer einen Besucher war das verwirrend --
 * er hatte sich vertippt und bekam eine Seite, die so tat, als sei alles in
 * Ordnung. Fuer eine Suchmaschine war es schlimmer: sie fand unter jeder
 * beliebigen Adresse eine vollstaendige Seite mit Status 200 und meldete
 * "Soft 404". Wo das haeufig vorkommt, verteilt Google seine Zeit auf
 * erfundene Adressen statt auf die echten.
 *
 * Die eigentliche 404-Antwort kann diese Anwendung nicht geben -- Netlify
 * liefert fuer jede Adresse dieselbe index.html aus, und welcher Pfad gemeint
 * war, weiss erst der Browser. Was hier steht, ist die zweitbeste Antwort und
 * die, auf die es fuer die Suche ankommt: eine Seite, die sich als Fehler zu
 * erkennen gibt und per robots-Angabe aus dem Index heraushaelt.
 *
 * public/404.html ist davon unberuehrt -- die Datei beantwortet fehlende
 * Bilder und Videos, also Adressen, die nie in dieser Anwendung ankommen.
 */
export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useDocumentHead({
    title: 'Seite nicht gefunden | GG Manufaktur',
    description: 'Diese Adresse gibt es nicht.',
    robots: 'noindex, follow'
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 md:px-14 pt-32 md:pt-48 pb-24 md:pb-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl text-center"
      >
        <p className="text-[#0a6f6a] font-black text-xs tracking-[0.25em] uppercase mb-6">Fehler 404</p>
        <h1 className="text-4xl md:text-6xl font-black text-[#0b0f2a] tracking-tighter leading-[0.95] mb-6">
          Diese Seite gibt es nicht.
        </h1>
        <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed tracking-tight mb-10">
          Womöglich hat sich ein Zeichen in die Adresse verirrt, oder die Seite ist umgezogen.
          Über die Startseite findest du alles Weitere.
        </p>
        <button
          onClick={() => onNavigate('home')}
          data-track="navigation_click"
          data-track-label="404 zur Startseite"
          className="inline-flex items-center gap-2 text-emerald-700 font-black uppercase tracking-widest text-sm hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Zur Startseite
        </button>
      </motion.div>
    </div>
  );
};
