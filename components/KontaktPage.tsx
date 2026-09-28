import React from 'react';
import { ContactForm } from './ContactForm';
import { useDocumentHead } from '../hooks/useDocumentHead';

/**
 * Das Kontaktformular unter einer eigenen Adresse (/kontakt).
 *
 * Auf der Startseite steht es ganz unten; ein Link, der etwa ueber LinkedIn
 * verschickt wird, soll aber direkt und nur beim Formular landen.
 */
export const KontaktPage: React.FC = () => {
  useDocumentHead({
    title: 'Kontakt | GG Manufaktur',
    description:
      'Erzähl uns von deinem Vorhaben: kostenloses Erstgespräch, erste Ideenskizze und gemeinsame Umsetzung mit der GG Manufaktur.',
    canonicalPath: '/kontakt',
    breadcrumbs: [{ name: 'Kontakt', path: '/kontakt' }]
  });

  return (
    <div className="pt-16 md:pt-24">
      <ContactForm />
    </div>
  );
};
