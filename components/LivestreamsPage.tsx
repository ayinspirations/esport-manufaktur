import React from 'react';
import { Check } from 'lucide-react';
import { Reveal } from './Reveal';
import { MoneyPage } from './money/AutoReveal';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { PAGE_META, headFor } from './pageMeta';
import { asset } from './site';
import { ClosingCTA, CONTAINER, Faq, MoneyHero, Section } from './money/ui';
import { BLOCK_GAP } from './spacing';

// ---------------------------------------------------------------------------
// Money Page: Livestreams
// ---------------------------------------------------------------------------

interface LivestreamsPageProps {
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
  scrollToSection: (id: string) => void;
}

const PATH = '/livestreams';

const MODI = [
  {
    title: 'Events vor Ort',
    image: '/images/showcase/markenfestival.jpg',
    points: ['Eigene Technik', 'Regie inklusive', 'Moderation optional'],
    text: 'Wir produzieren Livestreams direkt auf dem Event und bringen dafür unsere eigene Technik mit, vom Kamerasetup bis zur Regie. Durch unsere langjährige Erfahrung laufen die Übertragungen stabil, sauber und ohne großen Aufwand für unsere Kunden. Auf Wunsch integrieren wir Moderation, Grafiken und Spielinhalte.'
  },
  {
    title: 'Online-Events',
    image: '/images/showcase/naspa-svww.jpg',
    points: ['Remote-Setup', 'Live-Moderation', 'Grafiken & Spielstände'],
    text: 'Für Online-Turniere übernehmen wir den kompletten Livestream inklusive eigener Technik und einem klaren Ablauf. Die Matches werden live begleitet, ergänzt durch Moderation, Grafiken und aktuelle Spielstände. Ideal für Firmen-Events, digitale Kampagnen oder Aktivierungen mit großer Reichweite.'
  }
];

export const LivestreamsPage: React.FC<LivestreamsPageProps> = ({ onOpenBooking, onOpenContact, scrollToSection }) => {
  useDocumentHead(headFor(PATH));
  useStructuredData(PATH);

  const booking = () => onOpenBooking?.();
  const contact = () => onOpenContact?.('Livestream');
  const toModi = () => document.getElementById('modi')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <MoneyPage>
      <MoneyHero
        eyebrow="Livestreams · TV-Qualität"
        title="Professionelles Livestreaming für deine"
        accent="eSport & Gaming Events."
        body={
          <p>
            Wir bringen dein Event global auf die Bildschirme. Stabil, interaktiv und in TV-Qualität. Von der
            Firmen-Meisterschaft bis zum hybriden Messe-Highlight.
          </p>
        }
        image="/images/showcase/allianz-vfb-stuttgart.jpg"
        imageAlt="Livestream-Produktion bei einem eSport Event"
        label="Jetzt anfragen"
        onBooking={booking}
        onContact={contact}
        secondary={{ label: 'Modi entdecken', href: '#modi', onClick: toModi }}
      />

      {/* ============ Zwei Modi ============ */}
      <Section
        id="modi"
        title="Vor Ort oder online:"
        accent="Wir liefern den Stream."
        intro={
          <>
            <p className="text-[#0e958e] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Zwei Modi, ein Anspruch</p>
            <p>
              eSport ist längst kein Nischenthema mehr. Laut Statista erreicht die globale eSport-Zuschauerschaft 2025
              rund 640 Millionen Menschen. Die GG Manufaktur übernimmt die komplette Livestream-Produktion, sodass du dich
              auf deine Gäste, deine Marke und deine Botschaft konzentrieren kannst.
            </p>
          </>
        }
      >
        <div className="grid md:grid-cols-2 gap-4">
          {MODI.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <article className="h-full rounded-card overflow-hidden tile-gradient text-white border border-white/10 flex flex-col">
                <div className="relative h-52 md:h-64">
                  <img src={asset(m.image)} alt={`Livestream ${m.title}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />
                  <h3 className="absolute left-7 bottom-5 text-2xl md:text-3xl font-black uppercase tracking-tighter">{m.title}</h3>
                </div>
                <div className="p-7 md:p-8 flex-1">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
                    {m.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-1.5 text-[#2dd4bf] font-black text-xs uppercase tracking-wider">
                        <Check className="w-4 h-4" /> {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-medium">{m.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Moderation ============ */}
      <section className={`${CONTAINER} ${BLOCK_GAP}`}>
        <Reveal>
          <div className="grid md:grid-cols-2 rounded-card overflow-hidden bg-white/50 border border-white/70">
            <div className="relative min-h-[240px]">
              <img
                src={asset('/images/showcase/hhn-techday.jpg')}
                alt="Moderation bei einem Gaming Event"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-7 md:p-12">
              <p className="text-[#0e958e] font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-3">Stimme im Stream</p>
              <h2 className="text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tighter uppercase text-[#0b0f2a]">
                Wer deinen Livestream <span className="text-[#0e958e] italic">moderiert.</span>
              </h2>
              <p className="mt-4 text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                Ein Livestream lebt von der Stimme dahinter. Unsere Stream- und Bühnen-Moderatoren kommentieren Matches,
                führen durch das Event und halten die Community wach. Mehrere haben Erfahrung aus Bundesliga-eFootball und
                nationalen Cups.
              </p>
              <button
                onClick={() => onOpenContact?.('Livestream-Moderation')}
                className="spring mt-7 inline-flex items-center gap-2 rounded-full bg-[#0b0f2a] text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#0e958e] transition-colors duration-500"
              >
                Moderation anfragen →
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ FAQ ============ */}
      <Section title="FAQ zu" accent="Livestreams.">
        <Faq items={PAGE_META[PATH].faq ?? []} />
      </Section>

      {/* ============ Abschluss ============ */}
      <ClosingCTA
        title="Lass uns deinen Livestream"
        accent="produzieren."
        label="Jetzt anfragen"
        onBooking={booking}
        onContact={contact}
        secondary={{ label: 'Referenzen ansehen', href: '/#best-cases', onClick: () => scrollToSection('best-cases') }}
      >
        <p className="text-[#2dd4bf] font-black uppercase tracking-[0.2em] text-xs md:text-sm">Bereit für deinen Stream?</p>
        <p>Eigene Technik, eigene Regie, eigene Moderation. Du fokussierst dich auf dein Event.</p>
      </ClosingCTA>
    </MoneyPage>
  );
};
