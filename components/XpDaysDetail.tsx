import React, { useEffect } from 'react';
import { Trophy, Target, Users } from 'lucide-react';
import { Reveal, RevealText } from './Reveal';
import { CaseHero } from './CaseHero';
import { CaseSlider } from './CaseSlider';
import { STAGGER, DUR } from './motion';

interface XpDaysDetailProps {
  onBack: () => void;
}

// Liegen die Bilder unter public/images/xp-days, erscheinen sie von selbst --
// fehlt eines, faellt es aus der Reihe (siehe CaseSlider).
const images = [
  '/images/xp-days/slide-1.jpg',
  '/images/xp-days/slide-2.jpg',
  '/images/xp-days/slide-3.jpg',
  '/images/xp-days/slide-4.jpg',
];

// ---------------------------------------------------------------------------
// Die Inhalte dieses Cases
// ---------------------------------------------------------------------------
// Wie bei den anderen Best Cases: alles, was auf der Seite steht, steht hier
// oben, in der freigegebenen Reihenfolge. Anders als die uebrigen ist dies
// kein Kundenprojekt, sondern unser eigenes Format -- der Text sagt das
// selbst, die Seite braucht dafuer keinen Sonderaufbau.
// ---------------------------------------------------------------------------

const EINLEITUNG = [
  'Wie schafft man eine Karrieremesse, auf der junge Menschen nicht nur Informationen sammeln, sondern Unternehmen wirklich kennenlernen wollen? Mit den XP Days haben wir ein eigenes Messeformat entwickelt, das Recruiting, Content Creation, Gamification, Gaming und persönliche Begegnungen konsequent miteinander verbindet.',
  'Eine digitale Plattform, ein messeweites XP-System, authentischer Videocontent, interaktive Ausstellerprofile, Online-Turniere und vielfältige Erlebnisformate vor Ort machten Karriereorientierung erlebbar. 2026 feierten die XP Days ihre Premiere in der Carl Benz Arena in Stuttgart.'
];

const PROJEKTBESCHREIBUNG = [
  'Die Idee zu den XP Days entstand aus zahlreichen Gesprächen mit Unternehmen, die junge Menschen besser erreichen möchten, beim Einsatz von Gamification aber häufig noch Berührungsängste haben.',
  'Eine wiederkehrende Aussage lautete: „Die jungen Leute sollen doch nicht nur zum Zocken auf die Messe kommen.“ Doch genau darum geht es nicht. Gamification ist kein Selbstzweck und Gaming ersetzt weder die Berufsorientierung noch das persönliche Gespräch. Es schafft einen authentischen Zugang zu Menschen, die ein Unternehmen erreichen und von sich überzeugen möchte.',
  'Gaming ist ein fester Bestandteil der Lebenswelt vieler Jugendlicher und junger Erwachsener. Wer diese Zielgruppe für Ausbildungsberufe, duale Studiengänge oder den Berufseinstieg gewinnen möchte, sollte ihre Interessen verstehen und daraus relevante Begegnungen entwickeln.',
  'Auch ein Glücksrad nutzt spielerische Mechanismen, um Aufmerksamkeit und Interaktion zu erzeugen. Bei digitalen Games, eSport oder moderner Gamification bestehen jedoch häufig größere Vorbehalte – insbesondere dann, wenn Unternehmen die Aktivierung selbst konzipieren und in ihre bestehenden Messemaßnahmen integrieren müssten.',
  'Deshalb haben wir nicht nur einzelne Messestände verändert, sondern das Messekonzept selbst neu gedacht.',
  'Klassische Karrieremessen funktionieren meist nach einem ähnlichen Prinzip: Unternehmen präsentieren sich an ihren Ständen, Besucherinnen und Besucher sammeln Informationen und führen kurze Gespräche. Wie intensiv der Austausch ausfällt, hängt dabei stark von der individuellen Aktivierung jedes einzelnen Ausstellers ab.',
  'Was bislang fehlte, war eine Karrieremesse, die einen wesentlichen Bestandteil der jungen Lebenswelt als zentrales Element des gesamten Formats nutzt. Genau daraus entstanden die XP Days: eine gamifizierte Karriere- und Erlebnismesse, bei der Interaktion nicht nur an einzelnen Ständen stattfindet, sondern in die gesamte Candidate Journey integriert ist.',
  'Das digitale Herzstück bildete eine eigens entwickelte Plattform. Dort konnten sich die Besucherinnen und Besucher informieren, Ausstellerprofile und Stellenangebote entdecken, an Quizformaten teilnehmen und durch unterschiedliche Aktivitäten XP-Punkte sammeln.',
  'Bereits vor der Messe konnten sich Interessierte digital mit den XP Days beschäftigen und an Online-Turnieren teilnehmen. So begann die Aktivierung nicht erst beim Betreten der Halle, sondern entwickelte bereits im Vorfeld erste Berührungspunkte zwischen Teilnehmenden, Unternehmen und dem Event.',
  'Um die beteiligten Arbeitgeber schon vor der Veranstaltung nahbar und authentisch vorzustellen, produzierten wir zusätzlich eigenen Videocontent. Dafür besuchten wir Partnerunternehmen direkt an ihren Standorten und gaben potenziellen Bewerberinnen und Bewerbern kurze Einblicke in die Unternehmen, ihre Arbeitswelten und die Menschen dahinter.',
  'Der Content verlängerte die Kommunikation über klassische Unternehmensprofile hinaus. Junge Menschen konnten sich bereits vor dem persönlichen Treffen ein erstes Bild machen und erhielten konkrete Anknüpfungspunkte für spätere Gespräche auf der Messe.',
  'Vor Ort wurde die digitale Candidate Journey durch eine vielseitige Erlebniswelt ergänzt. Mario Kart, Virtual Reality, Retro-Gaming, League of Legends, Porsche Sim Racing und weitere Gaming-Formate boten unterschiedliche Zugänge für verschiedene Interessen und Erfahrungsstufen.',
  'eSport-Turniere, Showmatches und gemeinsame Challenges schufen Aufmerksamkeit und sorgten für wiederkehrende Begegnungen innerhalb der Veranstaltung. Gleichzeitig lieferten Bühnentalks mit Creatorn, Influencern und weiteren Gästen zusätzliche Impulse rund um Karriere, Gaming und digitale Lebenswelten.',
  'Unternehmen wie TRUMPF, Porsche, Vector, DEKRA, ZÜBLIN und DVAG konnten das Format nutzen, um neue Formen der Zielgruppenansprache kennenzulernen und direkt zu erleben. Statt Gamification isoliert in einen einzelnen Messestand integrieren zu müssen, wurden die Aussteller Teil eines ganzheitlich aktivierenden Messekonzepts.',
  'Die erste Ausgabe der XP Days im Jahr 2026 war für uns bewusst Auftakt, Pilotprojekt und Investition in ein neues Format zugleich. Sie hat gezeigt, welches Potenzial entsteht, wenn Content Creation, digitale Plattform, Gamification, Gaming-Experience und persönliche Begegnung von Beginn an gemeinsam gedacht werden.',
  'Wir sind überzeugt, dass genau diese Mischung einen authentischen und wertvollen Austausch schafft. Content erzeugt erste Nähe, Gamification weckt Neugier, Gaming schafft gemeinsame Erlebnisse und das persönliche Gespräch zeigt, ob Unternehmen und Talente wirklich zueinander passen.',
  'Die gewonnenen Erfahrungen bilden die Grundlage für die weitere Entwicklung. Unser Ziel ist es, die XP Days langfristig auszubauen und noch mehr Unternehmen dabei zu unterstützen, Gaming, eSport und Gamification authentisch für Recruiting und Employer Branding einzusetzen.'
];

const FACTS = [
  {
    title: 'Digitale XP-Plattform',
    icon: <Target className="w-6 h-6" />,
    text: 'Eine zentrale Plattform mit Ausstellerprofilen, Stellenangeboten, Quizformaten, Online-Turnieren und einem messeweiten XP-System für wiederkehrende Interaktionen.'
  },
  {
    title: 'Content × Gaming Experience',
    icon: <Users className="w-6 h-6" />,
    text: 'Authentischer Videocontent aus den Partnerunternehmen kombiniert mit Mario Kart, Virtual Reality, Retro-Gaming, League of Legends, Porsche Sim Racing, eSport-Turnieren, Showmatches und Bühnentalks.'
  }
];

const LEISTUNGEN = [
  {
    title: 'Strategie & Formatentwicklung',
    desc: 'Entwicklung eines eigenständigen Messekonzepts, das Karriereorientierung, Content, Gamification und persönliche Begegnungen miteinander verbindet.'
  },
  {
    title: 'Plattform & digitale Candidate Journey',
    desc: 'Konzeption und Entwicklung einer eigenen Eventplattform mit Ausstellerprofilen, Stellenangeboten, Quizformaten, Online-Turnieren und XP-System.'
  },
  {
    title: 'Content Creation',
    desc: 'Produktion authentischer Videoformate direkt bei den Partnerunternehmen, um Arbeitswelten, Unternehmenskultur und potenzielle Arbeitgeber bereits vor der Messe nahbar zu machen.'
  },
  {
    title: 'Gamification & Aktivierungsmechanik',
    desc: 'Entwicklung messeweiter Spiel- und Interaktionsmechanismen, über die Besucherinnen und Besucher Inhalte entdecken, Aktivitäten absolvieren und XP-Punkte sammeln konnten.'
  },
  {
    title: 'Gaming & eSport',
    desc: 'Konzeption und Umsetzung verschiedener Gaming-Bereiche, Online- und Offline-Turniere, Showmatches und frei zugänglicher Mitmachangebote.'
  },
  {
    title: 'Aussteller- & Recruiting-Aktivierung',
    desc: 'Einbindung der beteiligten Unternehmen in eine gemeinsame Aktivierungsstruktur mit digitalen, medialen und physischen Touchpoints.'
  },
  {
    title: 'Bühnenprogramm & Live-Kommunikation',
    desc: 'Planung und Umsetzung von Bühnentalks, Creator- und Influencer-Einbindungen sowie weiteren inhaltlichen Programmpunkten.'
  },
  {
    title: 'Eventplanung & Produktion',
    desc: 'Ganzheitliche Entwicklung, Organisation und Realisierung der ersten XP Days in der Carl Benz Arena in Stuttgart.'
  }
];

const IMPACT = [
  { label: 'Zielgruppen', value: 'Schülerinnen und Schüler, Studierende, Berufseinsteiger und weitere junge Menschen in der Phase der beruflichen Orientierung.' },
  { label: 'Aktivierung', value: 'Eigenmotivierte Teilnahme, spielerische Interaktion und längere Kontaktmomente statt passiver Informationsaufnahme.' },
  { label: 'Nähe', value: 'Authentischer Videocontent gab bereits vor der Messe Einblicke in Unternehmen, Arbeitswelten und die Menschen hinter den Arbeitgebermarken.' },
  { label: 'Matching', value: 'Gemeinsame Erlebnisse und persönliche Gespräche schufen die Grundlage, um herauszufinden, ob Unternehmen und junge Talente zueinander passen.' }
];

export const XpDaysDetail: React.FC<XpDaysDetailProps> = () => {
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
        image="/images/xp-days/hero.jpg"
        alt="XP Days – gamifizierte Karriere- und Erlebnismesse"
        title="XP Days"
        accent="Karriere. Erleben."
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <RevealText
                as="h2"
                by="word"
                text="Eine gamifizierte Karrieremesse, auf der Unternehmen und junge Talente zu einem echten Match werden können."
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

            <CaseSlider images={images} alt="Eindruck von den XP Days" />

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
                      <h4 className="text-lg font-black text-[#0e958e] leading-tight">Gamifizierte Karriere- und Erlebnismesse</h4>
                      <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                        Content + Digital + Live | Recruiting | Gamification | eigenes skalierbares Format
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
                      <h4 className="text-white font-black leading-snug">Eine neue Form der Karrieremesse</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">
                        Mit den XP Days entstand ein eigenständiges Format, das Content Creation, digitale Plattform,
                        Gamification, Gaming und persönliche Begegnungen zu einer durchgängigen Candidate Journey
                        verbindet.
                      </p>
                    </div>
                  </section>

                  <div className="pt-10 border-t border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</div>
                        <div className="text-lg font-black text-white leading-tight">Premiere 2026 erfolgreich umgesetzt</div>
                        <div className="text-white/60 text-sm font-medium leading-snug mt-1">
                          Das Format wird auf Basis der gewonnenen Erkenntnisse kontinuierlich weiterentwickelt und für
                          kommende Ausgaben ausgebaut.
                        </div>
                      </div>
                    </div>
                    <p className="text-emerald-400 text-sm font-black leading-relaxed italic">
                      „Content schafft Nähe. Gamification weckt Neugier. Gaming verbindet. Im persönlichen Austausch
                      zeigt sich, ob daraus ein echtes Match wird.“
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
