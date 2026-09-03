import { serviceSlugs as routableSlugs } from './serviceCatalogue';

export interface ServiceCard {
  title: string;
  text: string;
}

export interface ServiceLeistungGroup {
  heading?: string;
  text?: string;
  cards: ServiceCard[];
  /** Only set on the "Digitale Lösungen" page's Whitelabel group. */
  groupCta?: string;
}

export interface ServiceStep {
  title: string;
  text: string;
}

export interface ServiceFaqItem {
  q: string;
  a: string;
}

/**
 * One service's page copy.
 *
 * The four pillars fill this out completely. The six services reached only
 * through the filter carry a shorter version -- hero, Leistungen, "Für wen",
 * closer -- so everything they do not have is optional and the renderer skips
 * the section rather than printing an empty heading. Nothing here is faked to
 * fill a slot: a service without a written case study simply has no case
 * study section.
 */
export interface ServiceContent {
  slug: string;
  path: string;
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  h1: string;
  hero: {
    headline: string;
    subline: string;
    ctaLabel: string;
    /** Optional: without one the hero renders the branded placeholder band. */
    image?: string;
    imageAlt?: string;
  };
  pain?: {
    heading: string;
    text: string;
  };
  leistungenHeading: string;
  leistungen: ServiceLeistungGroup[];
  /**
   * What the service achieves -- the third of the three blocks the services
   * page shows (what it is / scope / effect).
   *
   * NEW COPY, written from each service's own listed Leistungen and not yet
   * signed off. No figures, no claims that are not already implied by what the
   * service does; still, this is the block to read before it goes live.
   */
  wirkung?: string;
  vorgehenHeading?: string;
  vorgehen?: ServiceStep[];
  fuerWenHeading?: string;
  fuerWen?: string[];
  bestCase?: {
    heading: string;
    text: string;
  };
  faq?: ServiceFaqItem[];
  ctaCloser: {
    headline: string;
    primaryLabel: string;
    secondaryLabel?: string;
  };
}

export const servicesContent: Record<string, ServiceContent> = {
  'strategie-konzeption': {
    slug: 'strategie-konzeption',
    path: '/services/strategie-konzeption',
    seo: {
      title: 'Gaming & eSport Strategie-Beratung | GG Manufaktur',
      description:
        'Zielgruppenanalyse, Markenpositionierung und Kampagnenstrategie für die Gaming-Community — authentisch statt aufgesetzt. Jetzt Strategiegespräch sichern.',
      ogImage: '/Strategie.jpg'
    },
    h1: 'Strategie & Konzeption für eure Marke im Gaming-Umfeld',
    hero: {
      headline: 'Bevor ihr Gaming-Marketing macht, versteht Gaming-Marketing euch.',
      subline:
        'Wir entwickeln Strategien für Marken im eSport- und Gaming-Umfeld — auf Basis echter Community-Kenntnis, nicht aus dem Werbebaukasten.',
      ctaLabel: 'Strategiegespräch sichern',
      image: '/Strategie.jpg',
      imageAlt: 'Strategieworkshop für Gaming Marketing Strategie und eSport Markenpositionierung bei GG Manufaktur'
    },
    pain: {
      heading: 'Warum klassisches Marketing im Gaming-Umfeld scheitert',
      text: 'Die Gaming-Community erkennt sofort, wenn eine Marke mit alten Werbelogiken auf neue Zielgruppen trifft. Plumpe Logo-Platzierungen, generische Botschaften und fehlende Kultur-Kenntnis kosten mehr Glaubwürdigkeit, als sie Reichweite bringen. Wer im Gaming-Umfeld ernst genommen werden will, braucht eine Strategie, die aus der Zielgruppe heraus gedacht ist — nicht eine, die ihr übergestülpt wird.'
    },
    wirkung:
      'Eine Positionierung, die in der Community trägt: klare Zielgruppen, ein definierter Platz für eure Marke und Ziele, an denen sich jede folgende Aktivierung ausrichten lässt.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          {
            title: 'Zielgruppenanalyse',
            text: 'Gamer-Personas, Plattformverhalten und Community-Dynamiken verstehen, bevor die erste Kampagne startet.'
          },
          {
            title: 'Markenpositionierung im Gaming-Kontext',
            text: 'Wo passt eure Marke glaubwürdig hin? Wir definieren die Rolle, die ihr in der Community einnehmen könnt.'
          },
          {
            title: 'Kanal- & Kampagnenstrategie',
            text: 'Von Twitch bis Discord: welcher Kanal für welches Ziel, mit klarer Content- und Format-Logik.'
          },
          {
            title: 'KPI-Framework & Erfolgsmessung',
            text: 'Messbare Ziele statt Bauchgefühl — abgestimmt auf Reichweite, Engagement und Markenwirkung.'
          }
        ]
      }
    ],
    vorgehenHeading: 'Unser Vorgehen',
    vorgehen: [
      { title: 'Analyse', text: 'Zielgruppe, Wettbewerb und aktuelle Markenwahrnehmung im Gaming-Umfeld erfassen.' },
      { title: 'Strategieworkshop', text: 'Gemeinsam Positionierung, Ziele und Leitplanken erarbeiten.' },
      { title: 'Konzept & Roadmap', text: 'Konkreter Fahrplan mit Kanälen, Formaten und Meilensteinen.' },
      { title: 'Umsetzungsbegleitung', text: 'Wir bleiben an eurer Seite, bis die Strategie im Alltag funktioniert.' }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Marken & Unternehmen', 'Publisher', 'Vereine mit Gaming-Sparte', 'Agenturen ohne Gaming-Expertise'],
    bestCase: {
      heading: 'So sieht das in der Praxis aus',
      text: 'Platzhalter für 1 Referenz-Case mit konkretem Ergebnis (z. B. Reichweite, Engagement-Rate).'
    },
    faq: [
      {
        q: 'Brauchen wir schon eine Gaming-Präsenz, bevor wir mit euch starten?',
        a: 'Nein. Wir arbeiten sowohl mit Marken, die bei null starten, als auch mit solchen, die ihre bestehende Präsenz schärfen wollen.'
      },
      {
        q: 'Wie lange dauert ein Strategieprojekt?',
        a: 'Je nach Umfang zwischen 4 und 8 Wochen, von der Analyse bis zur fertigen Roadmap.'
      },
      {
        q: 'Setzt ihr die Strategie auch selbst um?',
        a: 'Ja, nahtlos über unsere Bereiche Content & Streaming sowie Digitale Lösungen — oder als Übergabe an euer Team.'
      }
    ],
    ctaCloser: {
      headline: 'Lasst uns eure Gaming-Strategie aufsetzen.',
      primaryLabel: 'Jetzt Gespräch vereinbaren'
    }
  },

  'content-live-kommunikation': {
    slug: 'content-live-kommunikation',
    path: '/services/content-live-kommunikation',
    seo: {
      title: 'Gaming Content & Live-Streaming Produktion | GG Manufaktur',
      description:
        'Professionelle Streaming-Produktion, Formatentwicklung und Creator-Kooperationen für authentischen Gaming-Content. Jetzt Projekt starten.',
      ogImage: '/REWExfckoln_1770162125933.jpg'
    },
    h1: 'Content & Live-Kommunikation, die die Gaming-Community wirklich erreicht',
    hero: {
      headline: 'Content, der nicht wie Werbung aussieht — weil er keine ist.',
      subline:
        'Live-Produktionen, Streaming-Formate und Creator-Kooperationen, die eure Marke authentisch im Gaming-Umfeld positionieren.',
      ctaLabel: 'Content-Projekt anfragen',
      image: '/REWExfckoln_1770162125933.jpg',
      imageAlt: 'Live-Streaming Produktion und Gaming Content Produktion bei GG Manufaktur'
    },
    pain: {
      heading: 'Warum Standard-Content in der Gaming-Community nicht funktioniert',
      text: 'Content, der sichtbar "von außen produziert" wirkt, wird von der Community sofort abgestraft. Gleichzeitig überfordert professionelles Streaming-Setup, Formatentwicklung und Creator-Auswahl viele Teams intern. Das Ergebnis: entweder gar kein Content oder Content ohne Wirkung.'
    },
    wirkung:
      'Reichweite, die aus dem Format kommt und nicht aus dem Mediabudget — Inhalte, die in der Gaming-Community geteilt werden, weil sie dort hingehören.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          {
            title: 'Live-Produktion & Streaming-Setup',
            text: 'Technisch sauber, visuell hochwertig, auf Twitch, YouTube und Co. produziert.'
          },
          {
            title: 'Formatentwicklung',
            text: 'Shows, Turnier-Formate und Behind-the-Scenes-Content, die zur Marke und zur Community passen.'
          },
          {
            title: 'Creator- & Influencer-Kooperationen',
            text: 'Passende Persönlichkeiten finden und Kooperationen aufsetzen, die glaubwürdig wirken.'
          },
          {
            title: 'Social-Cutdowns & Distribution',
            text: 'Aus einer Produktion wird Content für alle relevanten Kanäle — ohne Qualitätsverlust.'
          }
        ]
      }
    ],
    vorgehenHeading: 'Unser Vorgehen',
    vorgehen: [
      { title: 'Formatentwicklung', text: 'Konzept, Ton und Aufbau des Contents gemeinsam definieren.' },
      { title: 'Produktion', text: 'Live oder aufgezeichnet, mit professionellem technischen Setup.' },
      { title: 'Postproduktion', text: 'Schnitt, Grading und Cutdowns für alle Kanäle.' },
      { title: 'Distribution & Reporting', text: 'Ausspielung, Monitoring und Learnings für die nächste Produktion.' }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Marken mit eigenem Content-Bedarf', 'Vereine & Teams', 'Publisher (Launch-Content)', 'Event-Veranstalter'],
    bestCase: {
      heading: 'Ein Blick auf eine unserer Produktionen',
      text: 'Platzhalter für 1 Referenz-Case (z. B. Zuschauerzahlen, Watch-Time, Engagement).'
    },
    faq: [
      {
        q: 'Braucht ihr unser eigenes Equipment oder bringt ihr alles mit?',
        a: 'Wir bringen das komplette technische Setup mit oder integrieren uns in eure bestehende Infrastruktur — je nach Projekt.'
      },
      {
        q: 'Könnt ihr auch einmalige Produktionen übernehmen, nicht nur laufende Formate?',
        a: 'Ja, von Einzelproduktionen bis zu regelmäßigen Formaten ist alles möglich.'
      },
      {
        q: 'Wie findet ihr passende Creator für unsere Marke?',
        a: 'Über Community-Fit, nicht nur Reichweite — wir prüfen Tonalität, Zielgruppen-Überschneidung und Glaubwürdigkeit.'
      }
    ],
    ctaCloser: {
      headline: 'Lasst uns euren nächsten Content produzieren.',
      primaryLabel: 'Jetzt Projekt anfragen'
    }
  },

  'events-erlebniswelten': {
    slug: 'events-erlebniswelten',
    path: '/services/events-erlebniswelten',
    seo: {
      title: 'Gaming-Aktivierungen für Messen & Events | GG Manufaktur',
      description:
        'Standkonzeption, technisches Setup und Turniere vor Ort — Gaming-Aktivierungen, die auf Messen und Events wirklich Zielgruppen anziehen.',
      ogImage: '/images/competencies/eventtechnik.jpg'
    },
    h1: 'Events & Erlebniswelten mit echter Gaming-Anziehungskraft',
    hero: {
      headline: 'Ein Stand allein zieht niemanden an. Ein Erlebnis schon.',
      subline:
        'Von der Standkonzeption bis zur Umsetzung vor Ort — Gaming-Aktivierungen auf Messen und Events, die Zielgruppen wirklich erreichen.',
      ctaLabel: 'Event-Konzept anfragen',
      image: '/images/competencies/eventtechnik.jpg',
      imageAlt: 'Gaming Messestand und eSport Event Konzeption von GG Manufaktur'
    },
    pain: {
      heading: 'Warum Standard-Messestände die Gaming-Zielgruppe verfehlen',
      text: 'Ein klassischer Messestand mit ein paar Bildschirmen reicht nicht, um eine Gaming-Zielgruppe zu binden. Gleichzeitig werden technische Komplexität — Konsolen, PCs, Netzwerk, Streaming vor Ort — und Logistik häufig unterschätzt. Ergebnis: hoher Aufwand, wenig Wirkung.'
    },
    wirkung:
      'Ein Auftritt, an dem die Zielgruppe stehenbleibt statt vorbeizugehen — mit Aktivierungen, die vor Ort funktionieren und über den Veranstaltungstag hinaus nachwirken.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          {
            title: 'Standkonzeption & Gaming-Aktivierung',
            text: 'Erlebnisorientiertes Standdesign, das zur Marke passt und Besucher aktiv einbindet.'
          },
          {
            title: 'Technisches Setup',
            text: 'Konsolen, PCs, VR und Netzwerktechnik — zuverlässig aufgebaut und betreut.'
          },
          {
            title: 'Turniere & Wettbewerbe vor Ort',
            text: 'Live-Turniere als Publikumsmagnet, inklusive Moderation und Ablaufplanung.'
          },
          {
            title: 'Personal, Moderation & Promotion',
            text: 'Geschultes Standpersonal, das die Zielgruppe versteht und anspricht.'
          }
        ]
      }
    ],
    vorgehenHeading: 'Unser Vorgehen',
    vorgehen: [
      { title: 'Konzeption', text: 'Standidee, Aktivierung und Ablauf gemeinsam entwickeln.' },
      { title: 'Planung & Logistik', text: 'Technik, Personal und Zeitplan bis ins Detail vorbereiten.' },
      { title: 'Auf- & Abbau vor Ort', text: 'Reibungslose Umsetzung während der gesamten Veranstaltung.' },
      { title: 'Nachbereitung & Reporting', text: 'Ergebnisse, Learnings und Foto-/Videodokumentation.' }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Messeaussteller', 'Unternehmen mit Firmenevents', 'Kommunen & Institutionen', 'Vereine (Turniere & Fanevents)'],
    bestCase: {
      heading: 'Eine unserer Aktivierungen in Aktion',
      text: 'Platzhalter für 1 Referenz-Case (z. B. Standbesucher, Turnier-Teilnehmer).'
    },
    faq: [
      {
        q: 'Übernehmt ihr auch die komplette technische Ausstattung?',
        a: 'Ja, von Konsolen und PCs bis zur Netzwerkinfrastruktur — alles aus einer Hand.'
      },
      {
        q: 'Wie weit im Voraus sollten wir planen?',
        a: 'Für größere Messeauftritte empfehlen wir mindestens 8-12 Wochen Vorlauf.'
      },
      {
        q: 'Könnt ihr auch kurzfristige Firmenevents umsetzen?',
        a: 'Bei kleineren Formaten sind auch kürzere Vorlaufzeiten möglich — sprecht uns einfach an.'
      }
    ],
    ctaCloser: {
      headline: 'Lasst uns euer nächstes Event planen.',
      primaryLabel: 'Jetzt Konzept anfragen'
    }
  },

  'digitale-loesungen': {
    slug: 'digitale-loesungen',
    path: '/services/digitale-loesungen',
    seo: {
      title: 'Digitale Gaming-Lösungen & Whitelabel-Software | GG Manufaktur',
      description:
        'Individuelle digitale Tools, Gamification-Konzepte und Whitelabel-Software für nachhaltige Zielgruppenbindung im Gaming-Umfeld.',
      ogImage: '/Gamification.jpg'
    },
    h1: 'Digitale Lösungen für nachhaltige Zielgruppenbindung',
    hero: {
      headline: 'Digitale Lösungen, die eure Zielgruppe binden — nicht nur unterhalten.',
      subline: 'Individuelle Tools, Gamification-Konzepte und eigene Software mit eurem Branding.',
      ctaLabel: 'Digitale Lösung anfragen',
      image: '/Gamification.jpg',
      imageAlt: 'Gamification Lösung und individuelle Gaming Plattform von GG Manufaktur'
    },
    pain: {
      heading: 'Warum Standardsoftware selten zur Marke passt',
      text: 'Fertige Tools und Gamification-Ansätze von der Stange wirken oft aufgesetzt und binden die Zielgruppe nicht wirklich. Gleichzeitig fehlt vielen Unternehmen das eigene Entwicklerteam, um individuelle digitale Lösungen selbst zu bauen und zu betreiben.'
    },
    wirkung:
      'Aktivierungen, die sich skalieren und auswerten lassen: jede Interaktion erfasst, jedes Format wiederverwendbar, jeder Durchlauf messbar.',
    leistungenHeading: 'Was wir bauen und betreiben',
    leistungen: [
      {
        heading: 'Individuelle Tools & Gamification',
        text: 'Wir entwickeln digitale Tools und Gamification-Mechaniken, die zu eurer Marke und eurer Zielgruppe passen — von der Idee bis zur laufenden Anwendung.',
        cards: [
          { title: 'Individuelle Tools & Apps', text: 'Digitale Anwendungen, exakt auf euren Anwendungsfall zugeschnitten.' },
          { title: 'Gamification-Konzepte', text: 'Mechaniken, die Nutzer aktiv einbinden statt nur zu unterhalten.' },
          { title: 'Community-Plattformen', text: 'Digitale Räume, in denen sich eure Zielgruppe organisiert und austauscht.' }
        ]
      },
      {
        heading: 'Eure eigene Plattform, ohne eigenes Entwicklerteam',
        text: 'Für Unternehmen, die eine eigene digitale Plattform wollen, ohne diese selbst zu entwickeln und zu betreiben: Wir stellen unsere Software-Basis mit eurem Branding, eurer Domain und euren Inhalten bereit.',
        cards: [
          { title: 'Whitelabel-Plattform', text: 'Eure Marke, eure Domain, eure Inhalte — auf einer erprobten technischen Basis.' },
          { title: 'Individuelle Anpassung', text: 'Funktionsumfang und Design an eure Anforderungen angepasst.' },
          { title: 'Onboarding & Support', text: 'Laufende Betreuung, Weiterentwicklung und technischer Support.' }
        ],
        groupCta: 'Whitelabel-Demo anfragen'
      }
    ],
    vorgehenHeading: 'Unser Vorgehen',
    vorgehen: [
      { title: 'Bedarfsklärung', text: 'Anwendungsfall, Ziel und Rahmenbedingungen definieren.' },
      { title: 'Konzept', text: 'Funktionsumfang, Design und technische Basis festlegen.' },
      { title: 'Umsetzung', text: 'Entwicklung bzw. Einrichtung der Whitelabel-Lösung.' },
      { title: 'Onboarding & Betrieb', text: 'Übergabe, Schulung und laufende Betreuung.' }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: [
      'Marken mit Bedarf an individuellen Tools',
      'Vereine & Verbände',
      'Unternehmen ohne eigenes Dev-Team',
      'Publisher & Plattformbetreiber'
    ],
    bestCase: {
      heading: 'Eine digitale Lösung aus der Praxis',
      text: 'Platzhalter für 1 Referenz-Case.'
    },
    faq: [
      {
        q: 'Was ist der Unterschied zwischen einem individuellen Tool und einer Whitelabel-Lösung?',
        a: 'Ein individuelles Tool wird komplett für euch neu entwickelt. Eine Whitelabel-Lösung basiert auf einer bestehenden Software, die mit eurem Branding versehen wird — schneller verfügbar, dafür etwas weniger flexibel.'
      },
      {
        q: 'Können wir die Whitelabel-Plattform später erweitern?',
        a: 'Ja, die Plattform wächst mit euren Anforderungen mit.'
      },
      {
        q: 'Wie viel Aufwand entsteht bei uns intern?',
        a: 'Minimal — wir übernehmen Einrichtung, technischen Betrieb und Support.'
      }
    ],
    ctaCloser: {
      headline: 'Lasst uns eure digitale Lösung besprechen.',
      primaryLabel: 'Projekt anfragen',
      secondaryLabel: 'Whitelabel-Demo anfragen'
    }
  },

  // -------------------------------------------------------------------------
  // The six services reached through the filter.
  //
  // Their copy is the company's own wording from the old homepage carousel,
  // restructured rather than rewritten: each hero subline is the description
  // that service already carried, and every Leistungen card names something
  // that description already listed. Nothing is invented to fill a section --
  // where there is no written Vorgehen, case study or FAQ yet, the section is
  // simply absent and the page skips it. These are the entries to expand when
  // real copy for them exists.
  // -------------------------------------------------------------------------
  'eventtechnik-produktion': {
    slug: 'eventtechnik-produktion',
    path: '/services/eventtechnik-produktion',
    seo: {
      title: 'Eventtechnik & Produktion für Gaming-Events | GG Manufaktur',
      description:
        'Gaming-Hardware, Netzwerktechnik, Regie, Streaming- und Veranstaltungstechnik: technische Infrastruktur und Betrieb für Gaming- und eSport-Events.',
      ogImage: '/images/hagebau/slide-2.jpg'
    },
    h1: 'Eventtechnik & Produktion für Gaming- und eSport-Events',
    hero: {
      headline: 'Die Technik, auf der das Erlebnis läuft.',
      subline:
        'Von Gaming-Hardware und Netzwerktechnik bis zu Regie, Streaming- und Veranstaltungstechnik: Wir planen die technische Infrastruktur und sorgen gemeinsam mit unseren Partnern für einen reibungslosen Betrieb vor Ort.',
      ctaLabel: 'Technik-Setup anfragen',
      image: '/images/hagebau/slide-2.jpg',
      imageAlt: 'Eventtechnik und Produktionsequipment bei einer Gaming-Aktivierung von GG Manufaktur'
    },
    wirkung:
      'Technik, die im Hintergrund bleibt — stabiler Turnierbetrieb, saubere Übertragung und ein Ablauf, der ohne Zwischenfälle durchläuft.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          { title: 'Gaming-Hardware', text: 'PCs, Konsolen und Peripherie in der Konfiguration, die das Format wirklich braucht.' },
          { title: 'Netzwerktechnik', text: 'Stabile Verbindungen für Turnierbetrieb, Streaming und Besucher-WLAN.' },
          { title: 'Regie & Streaming-Technik', text: 'Bildregie, Übertragung und Signalwege für die Live-Ausspielung.' },
          { title: 'Veranstaltungstechnik', text: 'Licht, Ton und Bühnentechnik als Teil desselben Setups statt als Fremdgewerk.' },
          { title: 'Technische Planung', text: 'Infrastruktur, Stromlast und Aufbaulogik vorab durchgerechnet.' },
          { title: 'Betrieb vor Ort', text: 'Gemeinsam mit unseren Partnern während der gesamten Laufzeit im Einsatz.' }
        ]
      }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Marken & Unternehmen', 'Messeveranstalter', 'Vereine & Verbände', 'Agenturen'],
    ctaCloser: {
      headline: 'Erzählt uns von eurem Setup.',
      primaryLabel: 'Technik-Setup anfragen'
    }
  },

  'art-design-messebau': {
    slug: 'art-design-messebau',
    path: '/services/art-design-messebau',
    seo: {
      title: 'Art Design & Messebau für Gaming-Events | GG Manufaktur',
      description:
        'Maßgeschneiderte Raum- und Ausstattungskonzepte für Gaming- und eSport-Events — individuelle Möbel, Setups und Infrastruktur, realisiert mit erfahrenen Messebau-Partnern.',
      ogImage: '/hero-rewe.jpg'
    },
    h1: 'Art Design & Messebau für Gaming- und eSport-Events',
    hero: {
      headline: 'Ein Raum, der aussieht wie die Marke, die darin steht.',
      subline:
        'Du brauchst individuelle Möbel, Setups oder Infrastruktur für dein Gaming- und eSport-Event? Wir entwickeln maßgeschneiderte Raum- und Ausstattungskonzepte und realisieren diese gemeinsam mit erfahrenen Messebau-Partnern.',
      ctaLabel: 'Raumkonzept anfragen',
      image: '/hero-rewe.jpg',
      imageAlt: 'Individuell gestalteter Gaming-Messestand mit Custom-Branding bei GG Manufaktur'
    },
    wirkung:
      'Eine Fläche, die als Markenraum gelesen wird und nicht als Standardstand — gebaut für das Format, das darin stattfindet.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          { title: 'Individuelle Möbel', text: 'Spielplätze, Theken und Sitzlandschaften, gebaut für das jeweilige Format.' },
          { title: 'Setups & Infrastruktur', text: 'Die physische Grundlage der Aktivierung, von der Bühne bis zur Spielstation.' },
          { title: 'Raumkonzepte', text: 'Flächenaufteilung, Wegeführung und Zonierung für den erwarteten Besucherstrom.' },
          { title: 'Ausstattungskonzepte', text: 'Material, Branding und Ausstattung als ein zusammenhängendes Bild.' },
          { title: 'Umsetzung mit Partnern', text: 'Realisierung gemeinsam mit erfahrenen Messebau-Partnern.' }
        ]
      }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Marken & Unternehmen', 'Messeaussteller', 'Publisher', 'Agenturen'],
    ctaCloser: {
      headline: 'Lasst uns über euren Raum sprechen.',
      primaryLabel: 'Raumkonzept anfragen'
    }
  },

  'foto-video': {
    slug: 'foto-video',
    path: '/services/foto-video',
    seo: {
      title: 'Foto & Video für Gaming- und eSport-Events | GG Manufaktur',
      description:
        'Erfahrene Foto- und Videoteams begleiten euer Gaming- oder eSport-Event und produzieren Content, der Atmosphäre, Emotionen und Markenbotschaften einfängt.',
      ogImage: '/REWExfckoln_1770162125933.jpg'
    },
    h1: 'Foto & Video für Gaming- und eSport-Events',
    hero: {
      headline: 'Was im Raum passiert, bleibt selten im Raum.',
      subline:
        'Wir begleiten Gaming- und eSport-Events mit erfahrenen Foto- und Videoteams und produzieren authentischen Content, der Atmosphäre, Emotionen und Markenbotschaften hochwertig einfängt.',
      ctaLabel: 'Produktion anfragen'
      // No hero photograph yet -- the branded placeholder band stands in.
    },
    wirkung:
      'Material, das nach dem Event weiterarbeitet: Bilder und Bewegtbild für Social, Presse, Vertrieb und die nächste Kampagne.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          { title: 'Fotografie vor Ort', text: 'Erfahrene Teams, die das Event über die gesamte Laufzeit begleiten.' },
          { title: 'Videoproduktion', text: 'Bewegtbild vom Aufbau bis zum Finale, gedreht für die spätere Verwendung.' },
          { title: 'Atmosphäre & Emotionen', text: 'Die Momente, die ein Event ausmachen — nicht nur die Bühnenbilder.' },
          { title: 'Markenbotschaften', text: 'Markenauftritt und Aktivierung hochwertig im Bild mitgeführt.' }
        ]
      }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Marken & Unternehmen', 'Vereine & Verbände', 'Messeveranstalter', 'Agenturen'],
    ctaCloser: {
      headline: 'Lasst uns euer Event festhalten.',
      primaryLabel: 'Produktion anfragen'
    }
  },

  'creator-talent-activation': {
    slug: 'creator-talent-activation',
    path: '/services/creator-talent-activation',
    seo: {
      title: 'Creator & Talent Activation im Gaming | GG Manufaktur',
      description:
        'Passende Creator, Hosts, Moderatoren und eSport-Talents für Kampagnen und Events — von der Auswahl über die Konzeption bis zur Community-Aktivierung.',
      ogImage: '/images/hagebau/slide-1.jpg'
    },
    h1: 'Creator & Talent Activation im Gaming-Umfeld',
    hero: {
      headline: 'Die richtige Stimme erreicht mehr als die größte Reichweite.',
      subline:
        'Wir integrieren passende Creator, Hosts, Moderatoren und eSport-Talents in Kampagnen und Events – von der Auswahl und Konzeption bis zur authentischen Aktivierung der jeweiligen Community.',
      ctaLabel: 'Creator-Aktivierung anfragen',
      image: '/images/hagebau/slide-1.jpg',
      imageAlt: 'Creator-Aktivierung mit Moderation auf einer Gaming-Bühne bei GG Manufaktur'
    },
    wirkung:
      'Glaubwürdigkeit, die sich nicht einkaufen lässt — Reichweite über Stimmen, denen die jeweilige Community ohnehin zuhört.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          { title: 'Creator-Auswahl', text: 'Wer wirklich zur Marke und zur Zielgruppe passt — nicht wer gerade groß ist.' },
          { title: 'Hosts & Moderation', text: 'Bühnenmoderation und Formatführung für Live- und Streaming-Formate.' },
          { title: 'eSport-Talents', text: 'Spielerinnen und Spieler, die im jeweiligen Titel Glaubwürdigkeit haben.' },
          { title: 'Konzeption', text: 'Formate, in denen die Beteiligten etwas zu tun haben statt nur dabei zu sein.' },
          { title: 'Community-Aktivierung', text: 'Ansprache, die in der jeweiligen Community als echt durchgeht.' }
        ]
      }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Marken & Unternehmen', 'Publisher', 'Vereine mit Gaming-Sparte', 'Agenturen'],
    ctaCloser: {
      headline: 'Lasst uns die passenden Gesichter finden.',
      primaryLabel: 'Creator-Aktivierung anfragen'
    }
  },

  'scouting-talent-development': {
    slug: 'scouting-talent-development',
    path: '/services/scouting-talent-development',
    seo: {
      title: 'eSport Scouting & Talent Development | GG Manufaktur',
      description:
        'Ganzheitliche Scouting-Lösungen für Vereine und Verbände — digitale Qualifier, Turnierserien, Scouting-Events und Finals, online und offline verzahnt.',
      ogImage: '/images/status-quo/rewe-event.jpg'
    },
    h1: 'Scouting & Talent Development für Vereine und Verbände',
    hero: {
      headline: 'Talente findet man nicht an einem Abend.',
      subline:
        'Wir entwickeln ganzheitliche Scouting-Lösungen für Vereine und Verbände – von digitalen Qualifiern und Turnierserien bis zu physischen Scouting-Events und Finals. Online und offline greifen dabei nahtlos ineinander, um Talente gezielt zu erreichen, zu identifizieren und langfristig zu entwickeln.',
      ctaLabel: 'Scouting-Konzept anfragen',
      image: '/images/status-quo/rewe-event.jpg',
      imageAlt: 'Bühne des Scouting Cup Finales einer eSport-Talentförderung bei GG Manufaktur'
    },
    wirkung:
      'Ein Weg, auf dem Talente sichtbar werden und bleiben — von der ersten Onlinerunde bis ins Finale, als Pipeline statt als Einzelaktion.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          { title: 'Digitale Qualifier', text: 'Breite Sichtung online, bevor irgendjemand anreisen muss.' },
          { title: 'Turnierserien', text: 'Wiederkehrende Formate, die über eine Saison hinweg tragen.' },
          { title: 'Scouting-Events', text: 'Physische Sichtungen, an denen die Auswahl tatsächlich stattfindet.' },
          { title: 'Finals', text: 'Der Abschluss, der die Serie sichtbar macht — für Talente wie für Partner.' },
          { title: 'Online & offline verzahnt', text: 'Ein Weg von der ersten Runde bis ins Finale, nicht zwei getrennte Programme.' }
        ]
      }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Vereine', 'Verbände', 'Publisher', 'Marken & Unternehmen'],
    ctaCloser: {
      headline: 'Lasst uns euer Scouting aufsetzen.',
      primaryLabel: 'Scouting-Konzept anfragen'
    }
  },

  'recruiting-employer-branding': {
    slug: 'recruiting-employer-branding',
    path: '/services/recruiting-employer-branding',
    seo: {
      title: 'Recruiting & Employer Branding über Gaming | GG Manufaktur',
      description:
        'Arbeitgebermarken über Gaming, eSport und Gamification erlebbar machen — digitale Challenges, Recruiting-Games, Turniere, Messeaktivierungen und hybride Kampagnen.',
      ogImage: '/hero-gamechanger.jpg'
    },
    h1: 'Recruiting & Employer Branding im Gaming-Umfeld',
    hero: {
      headline: 'Junge Zielgruppen lesen keine Stellenanzeigen.',
      subline:
        'Wir nutzen Gaming, eSport und Gamification, um Arbeitgebermarken erlebbar zu machen und junge Zielgruppen authentisch zu erreichen – von digitalen Challenges und Recruiting-Games bis zu Turnieren, Messeaktivierungen und hybriden Kampagnen.',
      ctaLabel: 'Recruiting-Aktivierung anfragen',
      image: '/hero-gamechanger.jpg',
      imageAlt: 'Employer-Branding-Aktivierung im Gaming-Umfeld bei GG Manufaktur'
    },
    wirkung:
      'Kontakt zu jungen Zielgruppen, bevor sie eine Stellenanzeige lesen — und eine Arbeitgebermarke, die sie selbst ausprobiert haben.',
    leistungenHeading: 'Leistungen im Detail',
    leistungen: [
      {
        cards: [
          { title: 'Digitale Challenges', text: 'Aufgaben, die Interesse zeigen, bevor jemand ein Formular ausfüllt.' },
          { title: 'Recruiting-Games', text: 'Spielbare Formate, die die Arbeitgebermarke erlebbar machen.' },
          { title: 'Turniere', text: 'Wettbewerbsformate als Anlass, mit der Zielgruppe ins Gespräch zu kommen.' },
          { title: 'Messeaktivierungen', text: 'Der Stand auf der Karrieremesse als Ort, an dem etwas passiert.' },
          { title: 'Hybride Kampagnen', text: 'Digitale Reichweite und Präsenz vor Ort als eine Kampagne gedacht.' }
        ]
      }
    ],
    fuerWenHeading: 'Für wen',
    fuerWen: ['Unternehmen mit Recruiting-Bedarf', 'HR- & Employer-Branding-Teams', 'Hochschulen', 'Agenturen'],
    ctaCloser: {
      headline: 'Lasst uns eure Arbeitgebermarke spielbar machen.',
      primaryLabel: 'Recruiting-Aktivierung anfragen'
    }
  }
};

// The catalogue in `./serviceCatalogue` is what the router loads on every page
// view; this file is only pulled in when a service is actually opened. That
// split only stays safe if the two lists never drift, so development asserts
// they agree. Stripped from production output -- `import.meta.env.DEV` is a
// compile-time constant, so the whole block is dead code there and the
// minifier removes it.
if (import.meta.env.DEV) {
  const declared = [...routableSlugs].sort().join(',');
  const actual = Object.keys(servicesContent).sort().join(',');
  if (declared !== actual) {
    console.error(
      `serviceCatalogue is out of sync with servicesContent.\n  catalogue: ${declared}\n  content:   ${actual}`
    );
  }
}
