import React, { useEffect } from 'react';
import { Target, Users, Play } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface CaseDetailProps {
  onBack: () => void;
}

const images = [
  '/images/bfv/slide-1.jpg',
  '/images/bfv/slide-2.jpg',
  '/images/bfv/slide-3.jpg',
];

const videos = [
  {
    id: 'rbLU0nKoO-Y',
    title: 'BFV eFootball Highlight',
    thumbnail: 'https://img.youtube.com/vi/rbLU0nKoO-Y/maxresdefault.jpg',
    url: 'https://youtu.be/rbLU0nKoO-Y'
  },
  {
    id: 'UdnMraIQ3UY',
    title: 'Schultag der Superlative',
    thumbnail: 'https://img.youtube.com/vi/UdnMraIQ3UY/maxresdefault.jpg',
    url: 'https://youtu.be/UdnMraIQ3UY'
  }
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei T-Systems und hagebau Bolay: alles, was auf der Seite steht, steht
// hier oben, in der freigegebenen Reihenfolge. Der frühere Text nannte
// Kennzahlen (5.000 Nutzer, 100 Turniere, eigene App), die so nicht mehr
// freigegeben sind -- er ist ersetzt, nicht überarbeitet.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie überträgt man gewachsene Verbands- und Vereinsstrukturen glaubwürdig auf den virtuellen Rasen? Gemeinsam mit dem Bayerischen Fußball-Verband entwickeln wir seit unserer Gründung eine zentrale Plattform und nachhaltige Wettbewerbsstruktur für den bayerischen eFootball.',
  'Aus dem ursprünglichen Auftrag für eine moderne White-Label-Turnierplattform ist eine intensive Full-Service-Partnerschaft entstanden. Heute begleiten wir den BFV von der strategischen Weiterentwicklung über Plattform, Content und Teilnehmergewinnung bis zum vollständigen Online- und Offline-Wettbewerbsmanagement.'
];

const PROJEKTBESCHREIBUNG = [
  'Der Bayerische Fußball-Verband ist Kunde der ersten Stunde. Begonnen hat unsere Zusammenarbeit mit einer klaren technologischen Aufgabenstellung: Die bestehende White-Label-Lösung für Turniere, Liga und ePokal sollte durch eine moderne, flexible und langfristig weiterentwickelbare Plattform ersetzt werden.',
  'Zu diesem Zeitpunkt waren wir mit unserer eigenen Community- und Turnierlösung gestartet. Die Anforderungen des BFV und unsere technologische Grundlage passten unmittelbar zusammen: Gesucht wurde keine kurzfristige Einzellösung, sondern ein digitales System, das die bestehenden Verbandsstrukturen abbildet und gleichzeitig Raum für neue Wettbewerbe, Inhalte und Partneraktivierungen schafft.',
  'Auf dieser Basis entstand der BFV-eFootball-Hub als zentrale digitale Anlaufstelle für Spielerinnen und Spieler, Vereine, Wettbewerbe und Partner. Die Plattform bildet nicht nur Anmeldungen, Turniere, Spielpläne und Ergebnisse ab, sondern verbindet Organisation, Kommunikation und Community-Management in einem gemeinsamen digitalen Ökosystem.',
  'Im Laufe der Zusammenarbeit entwickelte sich unser Aufgabenbereich weit über die technische Plattform hinaus. Gemeinsam mit dem BFV konzipierten und realisierten wir Content-Formate, Nebenprojekte, digitale Cups und Live-Events. Gleichzeitig übernahmen wir zentrale operative Aufgaben von der Teilnehmergewinnung und Spielleitung bis zur vollständigen Planung und Durchführung von Online- und Offline-Wettbewerben.',
  'Ein wesentlicher Bestandteil der Partnerschaft ist die kontinuierliche Weiterentwicklung der Wettbewerbsstruktur. Gemeinsam entwickelten wir neue Formate wie die BFV eMeisterschaft und begleiteten bestehende Ligen, den ePokal, offene BFV-Cups und Scouting-Wettbewerbe. Dabei geht es nicht nur um die technische Abbildung einzelner Turniere, sondern um nachvollziehbare Wettbewerbswege und langfristige Beteiligungsmöglichkeiten für Spieler und Vereine.',
  'Auch im B2B-Bereich unterstützen wir den BFV bei der Entwicklung aktivierender Konzepte für Partner und Sponsoren. Digitale Plattformmodule, individuelle Wettbewerbe und gebrandete Aktivierungen schaffen zusätzliche Touchpoints und ermöglichen es Partnern, sich authentisch innerhalb der Fußball- und Gaming-Community zu positionieren.',
  'Aktuell entwickeln wir die Plattform im Rahmen ihres dritten umfassenden Rebrandings zur nächsten Ausbaustufe weiter. Neben einer neuen Nutzerführung und einem modernisierten Look and Feel werden künftig auch B2B-Services stärker integriert.',
  'Der BFV bildet dabei den zentralen Hauptmandanten. Für größere Partner können untergeordnete White-Label-Mandanten mit eigenem Branding, individualisierten Funktionen und projektspezifischen Tools bereitgestellt werden. So entsteht eine skalierbare Multi-Tenant-Struktur, die Verbandsplattform, Partneraktivierungen und individuelle digitale Lösungen unter einem gemeinsamen technologischen Dach verbindet.',
  'Aus einem Plattformprojekt ist dadurch eine langfristige Partnerschaft entstanden, in der Strategie, Technologie, Wettbewerb, Content und Eventmanagement kontinuierlich zusammenspielen. Gemeinsam verlängern wir das bayerische Vereins- und Verbandsleben vom Rasen auf den virtuellen Rasen.'
];

const FACTS = [
  {
    title: 'Full-Service-eFootball-Management',
    icon: <Users className="w-6 h-6" />,
    text: 'Ganzheitliche Betreuung von Plattform, Teilnehmergewinnung, Content, Spielleitung, Online-Turnieren, Live-Events und langfristiger Wettbewerbsentwicklung.'
  },
  {
    title: 'Skalierbare Multi-Tenant-Plattform',
    icon: <Target className="w-6 h-6" />,
    text: 'Weiterentwicklung des BFV-eFootball-Hubs zum zentralen Hauptmandanten mit individuellen White-Label-Bereichen, B2B-Services und digitalen Aktivierungstools für Partner.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Strategie & Weiterentwicklung',
    desc: 'Kontinuierliche konzeptionelle Weiterentwicklung des BFV eFootball sowie Entwicklung neuer Formate, Services und Aktivierungsmöglichkeiten.'
  },
  {
    title: 'Plattform & Technologie',
    desc: 'Aufbau, Betrieb und Weiterentwicklung einer individuellen White-Label-Plattform für Turniere, Ligen, Inhalte, Community und Partnerintegrationen.'
  },
  {
    title: 'Wettbewerbs- & Spielmanagement',
    desc: 'Konzeption von Wettbewerbsarten und -strukturen sowie Organisation, Spielleitung und Durchführung von Online- und Offline-Turnieren, Ligen und Cups.'
  },
  {
    title: 'Content, Community & Teilnehmergewinnung',
    desc: 'Entwicklung und Umsetzung von Content-Formaten, B2C-Kommunikation sowie Maßnahmen zur Gewinnung und Aktivierung von Spielern und Vereinen.'
  },
  {
    title: 'B2B- & Partneraktivierung',
    desc: 'Konzeption individueller Plattformmodule, Wettbewerbe und White-Label-Mandanten für Partner und Sponsoren des BFV.'
  },
  {
    title: 'Eventmanagement',
    desc: 'Planung, Organisation und operative Umsetzung von Finalveranstaltungen, Offline-Turnieren und weiteren eFootball-Formaten.'
  }
];

const IMPACT = [
  { label: 'Zielgruppen', value: 'Spielerinnen und Spieler, Amateurfußballvereine, Fußballinteressierte sowie Partner und Sponsoren des BFV.' },
  { label: 'Aktivierung', value: 'Wiederkehrende Wettbewerbe und digitale Services schaffen langfristige Beteiligung statt punktueller Einzelaktionen.' },
  { label: 'Verbandswirkung', value: 'Der BFV verlängert seine bestehenden Strukturen glaubwürdig in den digitalen Fußball und schafft neue Angebote für Vereine, Community und Partner.' }
];

export const BFVDetail: React.FC<CaseDetailProps> = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#badeda] text-slate-900">
      <CaseHero
        image="/images/bfv/hero.jpg"
        alt="BFV eFootball – digitale Verbands- und Wettbewerbsplattform"
        title="BFV eFootball"
        accent="Vom Rasen auf den virtuellen Rasen."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Das bayerische Verbands- und Vereinsleben nachhaltig in den digitalen Fußball verlängern."
                className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic text-[#0e958e]"
              />
              <div className="space-y-6">
                {EINLEITUNG.map((para, i) => (
                  <Reveal key={i} as="p" delay={0.08 + i * 0.08} className="text-lg md:text-2xl font-medium leading-relaxed text-slate-700">
                    {para}
                  </Reveal>
                ))}
              </div>
            </section>

            <CaseSlider images={images} alt="Eindruck aus dem BFV eFootball" />

            <section className="space-y-6">
              {PROJEKTBESCHREIBUNG.map((para, i) => (
                <Reveal key={i} as="p" y={20} className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  {para}
                </Reveal>
              ))}
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FACTS.map((item, i) => (
                <Reveal key={item.title} delay={i * STAGGER.card} y={26} className="bg-white/50 backdrop-blur-xl p-8 rounded-surface border border-slate-900/5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                </Reveal>
              ))}
            </div>

            {/* Bewegtbild zum Case. Liegt bei YouTube, wird deshalb nicht
                eingebettet, sondern verlinkt -- ein Klick verlaesst die Seite,
                statt dass YouTube auf ihr mitliest. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video, i) => (
                <Reveal key={video.id} delay={i * STAGGER.card} y={26}>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video rounded-surface overflow-hidden bg-slate-900 shadow-lg"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110">
                        <Play className="w-6 h-6 translate-x-0.5" />
                      </span>
                    </div>
                    <span className="absolute bottom-5 left-6 right-6 text-white font-black uppercase tracking-tighter text-lg leading-tight">
                      {video.title}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <div className="pt-12 flex justify-center">
              <a
                href="https://www.bfv.de"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="/logos/Bayerischer_Fussballverband.svg.png"
                  alt="Bayerischer Fußball-Verband Logo"
                  className="h-16 md:h-24 w-auto opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Projekt-Steckbrief */}
          <div className="lg:col-span-4 space-y-12 order-last lg:order-none">
            <div className="sticky top-32">
              <Reveal y={28} duration={DUR.slow} className="bg-slate-900 text-white p-10 rounded-shell shadow-2xl">
                <div className="space-y-10">
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Format</h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Digitale Verbands- und Wettbewerbsplattform</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Plattform + Wettbewerbe + Content + Events | Full Service | Multi-Tenant | langfristig
                      </p>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Leistungen</h3>
                    </div>
                    <ul className="space-y-6">
                      {LEISTUNGEN.map((item) => (
                        <li key={item.title}>
                          <h5 className="font-black uppercase tracking-widest text-[10px] text-[#0e958e] mb-1">{item.title}</h5>
                          <p className="text-white/80 font-bold leading-snug">{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Impact</h3>
                    </div>
                    <ul className="space-y-4">
                      {IMPACT.map((item) => (
                        <li key={item.label}>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{item.label}</div>
                          <div className="text-white font-black leading-snug">{item.value}</div>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Ergebnis</h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-black leading-snug">Ein digitales Ökosystem für den bayerischen Fußball</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Aus einer neuen Turnierplattform ist eine umfassende eFootball-Struktur entstanden, die
                        Technologie, Wettbewerbe, Kommunikation, Events und Partneraktivierung dauerhaft miteinander
                        verbindet.
                      </p>
                    </div>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="mb-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                      <div className="text-lg font-black text-white leading-tight">Kunde seit unserer Gründung</div>
                      <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                        Langjährige Full-Service-Partnerschaft und kontinuierliche Weiterentwicklung der Plattform,
                        Wettbewerbe und B2B-Services.
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Gemeinsam mit dem BFV verlängern wir das bayerische Verbands- und Vereinsleben vom Rasen auf den
                      virtuellen Rasen.“
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
