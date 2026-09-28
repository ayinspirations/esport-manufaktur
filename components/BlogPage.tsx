import React from 'react';
import { BlogSection } from './BlogSection';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { headFor } from './pageMeta';

/**
 * Die Blog-Uebersicht unter einer eigenen Adresse (/blog).
 *
 * Auf der Startseite ist der Blog ein Abschnitt unter vielen; wer ueber /blog
 * kommt, soll nur die Artikel sehen und von hier aus lesen koennen.
 */
export const BlogPage: React.FC<{ onOpenPost: (slug: string) => void }> = ({ onOpenPost }) => {
  useDocumentHead(headFor('/blog'));

  return (
    <div className="pt-16 md:pt-24">
      <BlogSection onOpenPost={onOpenPost} />
    </div>
  );
};
