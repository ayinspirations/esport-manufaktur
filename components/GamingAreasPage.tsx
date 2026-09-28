import React from 'react';
import { Check } from 'lucide-react';
import { Reveal } from './Reveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { PAGE_META, headFor } from './pageMeta';
import { asset } from './site';
import { Chips, ClosingCTA, Faq, MoneyHero, Section } from './money/ui';

// ---------------------------------------------------------------------------
// Money Page: Gaming Areas
// ---------------------------------------------------------------------------

interface GamingAreasPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
  scrollToSection: (id: string) => void;
}

const PATH = '/gaming-areas';

const BEREICHE = [
  {
    title: 'Einkaufscenter & Retail',
    claim: 'Mehr Frequenz, längere Verweildauer.',
    text: 'Eine Gaming Area zieht Familien, Jugendliche und junge Erwachsene an und hält sie länger im Center.',
    points: ['Frequenz-Steigerung', 'Längere Verweildauer', 'Familien-Anziehung'],
    image: '/images/showcase/plauen-park.jpg'
  },
  {
    title: 'Sportevents & Fanzonen',
    claim: 'Die perfekte Pausen-Action.',
    text: 'Egal ob Fußballspiel, NFL-Game oder Vereinsjubiläum: Gaming-Aktivierungen bieten Fans und Besuchern die perfekte Abwechslung abseits des Hauptgeschehens.',
    points: ['Pausen-Aktivierung', 'Hoher Besucherandrang OK', 'Fan-Engagement'],
    image: '/images/showcase/allianz-vfb-stuttgart-2.jpg'
  },
  {
    title: 'Firmenanlässe & Teambuilding',
    claim: 'Der digitale Icebreaker.',
    text: 'Lockere dein Sommerfest, die Weihnachtsfeier oder das Kick-off spürbar auf. Mitarbeitende kommen abteilungsübergreifend ganz natürlich ins Gespräch.',
    points: ['Abteilungs-Mix', 'Lockere Atmosphäre', 'Plug & Play Setup'],
    image: '/images/showcase/kreissparkasse-esslingen.jpg'
  },
  {
    title: 'Produktpräsentationen & Messen',
    claim: 'Leads generieren, Marke erleben.',
    text: 'Nutze die Anziehungskraft von Gaming, um deine Marke oder neue Produkte interaktiv und emotional zu inszenieren. Highscore-Jagden schaffen direkten Kontakt zur Zielgruppe.',
    points: ['Lead-Generierung', 'Branding-Integration', 'Highscore-Mechanik'],
    image: '/images/showcase/hhn-gamingland-meetit-2.jpg'
  }
];

const REFERENZEN = [
  {
    title: 'eSport Week im Emmen Center',
    tags: ['Shopping-Center', 'Mehrtägig', 'Frequenz-Boost'],
    text: 'Wie eine maßgeschneiderte Gaming Area die Besucherfrequenz und Verweildauer im Center messbar steigert.'
  },
  {
    title: 'UEFA EURO 2024 · Fanzone München',
    tags: ['Fan-Zone', 'Public Viewing', 'Pausen-Action'],
    text: 'Wie unsere interaktiven Module die Wartezeiten der Fans vor dem Anpfiff zum echten Highlight machen.'
  },
  {
    title: 'Clash of Cash · FI Forum',
    tags: ['Firmen-Forum', 'Icebreaker', 'Teambuilding'],
    text: 'Modernes Teambuilding mit einer flexiblen Gaming-Zone als perfektem Icebreaker für die Sparkassen Finanz Informatik.'
  },
  {
    title: 'Fanta · Xbox · Fantasy Basel',
    tags: ['Markenaktivierung', 'Highscore-Challenge', 'Sponsoring'],
    text: 'Markenaktivierung mit Highscore-Challenge: Leads generieren, während die Marke erlebbar wird.'
  }
];

export const GamingAreasPage: React.FC<GamingAreasPageProps> = ({ onOpenBooking, onOpenContact, scrollToSection }) => {
  useDocumentHead(headFor(PATH));
  useStructuredData(PATH);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('Gaming Area');
  const toReferenzen = () => document.getElementById('referenzen')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="w-full bg-[#badeda]">
      <MoneyHero
        eyebrow="Gaming Areas · Interaktives Highlight"
        title="Gaming Areas: das interaktive Highlight"
        accent="für dein nächstes Event."
        body={
          <p>
            Egal ob Einkaufszentrum, Sport-Event oder Firmenfeier. Mit unseren maßgeschneiderten Gaming Areas schaffst du
            unvergessliche Erlebnisse, bindest Besucher aktiv ein und sorgst für maximale Interaktion. Full-Service von der
            Planung bis zur Betreuung vor Ort.
          </p>
        }
        image="/images/showcase/aok-fortuna-duesseldorf.jpg"
        imageAlt="Gaming Area bei einem Event mit Besuchern an den Stationen"
        label="Jetzt anfragen"
        onBooking={booking}
        onContact={contact}
        secondary={{ label: 'Referenzen ansehen', href: '#referenzen', onClick: toReferenzen }}
      />

      {/* ============ Einsatzbereiche ============ */}
      <Section
        title="Vier Einsatzbereiche, in denen"
        accent="Gaming funktioniert."
        intro={<p className="text-[#0e958e] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Geeignete Einsatzbereiche</p>}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {BEREICHE.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <article className="h-full rounded-card overflow-hidden tile-gradient text-white border border-white/10 flex flex-col">
                <div className="relative h-52 md:h-60">
                  <img src={asset(b.image)} alt={`Gaming Area: ${b.title}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />
                  <h3 className="absolute left-7 right-7 bottom-5 text-xl md:text-2xl font-black uppercase tracking-tighter">{b.title}</h3>
                </div>
                <div className="p-7 flex-1">
                  <p className="text-[#2dd4bf] font-black text-base md:text-lg tracking-tight mb-2">{b.claim}</p>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-medium">{b.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-1.5 text-white font-bold text-xs uppercase tracking-wider">
                        <Check className="w-4 h-4 text-[#2dd4bf]" /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Referenzen ============ */}
      <Section
        id="referenzen"
        title="Was wir an Gaming Areas"
        accent="gebaut haben."
        intro={
          <>
            <p className="text-[#0e958e] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Referenzen &amp; Beispiele</p>
            <p>Vier Fälle, die zeigen, wie sich Gaming Areas im Center, an der Fanzone, beim Firmenanlass und auf der Messe spielen.</p>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {REFERENZEN.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="h-full p-7 rounded-card bg-white/50 border border-white/70">
                <h3 className="text-[#0b0f2a] font-black text-lg md:text-xl uppercase tracking-tight mb-4">{r.title}</h3>
                <Chips items={r.tags} />
                <p className="mt-5 text-slate-600 text-sm md:text-base leading-relaxed font-medium">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ FAQ ============ */}
      <Section title="FAQ zu" accent="Gaming Areas.">
        <Faq items={PAGE_META[PATH].faq ?? []} />
      </Section>

      {/* ============ Abschluss ============ */}
      <ClosingCTA
        title="Lass uns dein"
        accent="Setup planen."
        label="Jetzt anfragen"
        onBooking={booking}
        onContact={contact}
        secondary={{ label: 'Alle Referenzen', href: '/#best-cases', onClick: () => scrollToSection('best-cases') }}
      >
        <p className="text-[#2dd4bf] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Lust auf deine Gaming Area?</p>
        <p>Wir liefern Technik, Aufbau und Betreuung. Du kümmerst dich um deine Gäste.</p>
      </ClosingCTA>
    </div>
  );
};
