import React from 'react';
import { ContactForm } from './ContactForm';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { headFor } from './pageMeta';

/**
 * Das Kontaktformular unter einer eigenen Adresse (/kontakt).
 *
 * Auf der Startseite steht es ganz unten; ein Link, der etwa ueber LinkedIn
 * verschickt wird, soll aber direkt und nur beim Formular landen.
 */
export const KontaktPage: React.FC = () => {
  useDocumentHead(headFor('/kontakt'));

  return (
    <div className="pt-16 md:pt-24">
      <ContactForm />
    </div>
  );
};
