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
    image: string;
    imageAlt: string;
  };
  pain: {
    heading: string;
    text: string;
  };
  leistungenHeading: string;
  leistungen: ServiceLeistungGroup[];
  vorgehenHeading: string;
  vorgehen: ServiceStep[];
  fuerWenHeading: string;
  fuerWen: string[];
  bestCase: {
    heading: string;
    text: string;
  };
  faq: ServiceFaqItem[];
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
      title: 'Gaming & eSport Strategie-Beratung | eSport Manufaktur',
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
      imageAlt: 'Strategieworkshop für Gaming Marketing Strategie und eSport Markenpositionierung bei eSport Manufaktur'
    },
    pain: {
      heading: 'Warum klassisches Marketing im Gaming-Umfeld scheitert',
      text: 'Die Gaming-Community erkennt sofort, wenn eine Marke mit alten Werbelogiken auf neue Zielgruppen trifft. Plumpe Logo-Platzierungen, generische Botschaften und fehlende Kultur-Kenntnis kosten mehr Glaubwürdigkeit, als sie Reichweite bringen. Wer im Gaming-Umfeld ernst genommen werden will, braucht eine Strategie, die aus der Zielgruppe heraus gedacht ist — nicht eine, die ihr übergestülpt wird.'
    },
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

  'content-streaming': {
    slug: 'content-streaming',
    path: '/services/content-streaming',
    seo: {
      title: 'Gaming Content & Live-Streaming Produktion | eSport Manufaktur',
      description:
        'Professionelle Streaming-Produktion, Formatentwicklung und Creator-Kooperationen für authentischen Gaming-Content. Jetzt Projekt starten.',
      ogImage: 'https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?auto=format&fit=crop&q=80&w=1600'
    },
    h1: 'Content & Streaming, das die Gaming-Community wirklich erreicht',
    hero: {
      headline: 'Content, der nicht wie Werbung aussieht — weil er keine ist.',
      subline:
        'Live-Produktionen, Streaming-Formate und Creator-Kooperationen, die eure Marke authentisch im Gaming-Umfeld positionieren.',
      ctaLabel: 'Content-Projekt anfragen',
      image: 'https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?auto=format&fit=crop&q=80&w=1600',
      imageAlt: 'Live-Streaming Produktion und Gaming Content Produktion bei eSport Manufaktur'
    },
    pain: {
      heading: 'Warum Standard-Content in der Gaming-Community nicht funktioniert',
      text: 'Content, der sichtbar "von außen produziert" wirkt, wird von der Community sofort abgestraft. Gleichzeitig überfordert professionelles Streaming-Setup, Formatentwicklung und Creator-Auswahl viele Teams intern. Das Ergebnis: entweder gar kein Content oder Content ohne Wirkung.'
    },
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

  'messen-events': {
    slug: 'messen-events',
    path: '/services/messen-events',
    seo: {
      title: 'Gaming-Aktivierungen für Messen & Events | eSport Manufaktur',
      description:
        'Standkonzeption, technisches Setup und Turniere vor Ort — Gaming-Aktivierungen, die auf Messen und Events wirklich Zielgruppen anziehen.',
      ogImage: '/images/competencies/eventtechnik.jpg'
    },
    h1: 'Messen & Events mit echter Gaming-Anziehungskraft',
    hero: {
      headline: 'Ein Stand allein zieht niemanden an. Ein Erlebnis schon.',
      subline:
        'Von der Standkonzeption bis zur Umsetzung vor Ort — Gaming-Aktivierungen auf Messen und Events, die Zielgruppen wirklich erreichen.',
      ctaLabel: 'Event-Konzept anfragen',
      image: '/images/competencies/eventtechnik.jpg',
      imageAlt: 'Gaming Messestand und eSport Event Konzeption von eSport Manufaktur'
    },
    pain: {
      heading: 'Warum Standard-Messestände die Gaming-Zielgruppe verfehlen',
      text: 'Ein klassischer Messestand mit ein paar Bildschirmen reicht nicht, um eine Gaming-Zielgruppe zu binden. Gleichzeitig werden technische Komplexität — Konsolen, PCs, Netzwerk, Streaming vor Ort — und Logistik häufig unterschätzt. Ergebnis: hoher Aufwand, wenig Wirkung.'
    },
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
      title: 'Digitale Gaming-Lösungen & Whitelabel-Software | eSport Manufaktur',
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
      imageAlt: 'Gamification Lösung und individuelle Gaming Plattform von eSport Manufaktur'
    },
    pain: {
      heading: 'Warum Standardsoftware selten zur Marke passt',
      text: 'Fertige Tools und Gamification-Ansätze von der Stange wirken oft aufgesetzt und binden die Zielgruppe nicht wirklich. Gleichzeitig fehlt vielen Unternehmen das eigene Entwicklerteam, um individuelle digitale Lösungen selbst zu bauen und zu betreiben.'
    },
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
  }
};

export const serviceSlugs = Object.keys(servicesContent);
