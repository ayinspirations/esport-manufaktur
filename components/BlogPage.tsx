import React from 'react';
import { BlogSection } from './BlogSection';
import { useDocumentHead } from '../hooks/useDocumentHead';

/**
 * Die Blog-Uebersicht unter einer eigenen Adresse (/blog).
 *
 * Auf der Startseite ist der Blog ein Abschnitt unter vielen; wer ueber /blog
 * kommt, soll nur die Artikel sehen und von hier aus lesen koennen.
 */
export const BlogPage: React.FC<{ onOpenPost: (slug: string) => void }> = ({ onOpenPost }) => {
  useDocumentHead({
    title: 'Blog & Wissen | GG Manufaktur',
    description:
      'Artikel rund um Gamification, Gaming und eSport im Marketing, Recruiting und auf Messen – Praxiswissen von der GG Manufaktur.',
    canonicalPath: '/blog',
    breadcrumbs: [{ name: 'Blog & Wissen', path: '/blog' }]
  });

  return (
    <div className="pt-16 md:pt-24">
      <BlogSection onOpenPost={onOpenPost} />
    </div>
  );
};
