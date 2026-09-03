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

/**
 * One service's page copy.
 *
 * All ten now carry the same four blocks -- hero, Ausgangslage, six Leistungen,
 * closer -- so the pages read as one set rather than four full ones and six
 * short ones. Anything genuinely absent (a service without artwork) is
 * optional, and the renderer skips the block rather than printing an empty
 * heading.
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
    /** One paragraph, or several -- the renderer handles both. */
    text: string | string[];
  };
  leistungenHeading: string;
  leistungen: ServiceLeistungGroup[];
  ctaCloser: {
    headline: string;
    /** Optional line between the closing headline and the buttons. */
    text?: string;
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
    h1: 'Strategie & Konzeption: vom Ziel aus gedacht',
    hero: {
      headline: 'Wir denken vom Ziel aus. Nicht vom Format.',
      subline:
        'Unsere Wurzeln liegen im Gaming, eSport und in der Gamification. Dort haben wir gelernt, wie Aktivierung, Wettbewerb und echtes Engagement entstehen. Diese Erfahrung prägt unsere Arbeit, ohne unsere Lösungen darauf zu beschränken.',
      ctaLabel: 'Projekt anfragen',
      image: '/Strategie.jpg',
      imageAlt: 'Strategieworkshop für Gaming Marketing Strategie und eSport Markenpositionierung bei GG Manufaktur'
    },
    pain: {
      heading: 'Die passende Lösung muss nicht digital sein',
      text: [
        'Am Anfang stehen für uns nicht das Tool, die Plattform oder ein fertiger Projektbaustein, sondern dein Ziel: Wen möchtest du erreichen? Was sollen die Menschen erleben oder tun? Und was soll das Projekt für dein Unternehmen oder deine Organisation bewirken?',
        'Erst wenn diese Fragen geklärt sind, entwickeln wir den passenden Ansatz. Das kann ein Gaming- oder eSport-Format, eine digitale Gamification-Lösung oder ein interaktives Event sein. Genauso können ein Kartenspiel, ein Quiz, ein Escape Game, eine Live-Challenge oder ein ganz anderer Mechanismus die richtige Lösung sein.',
        'Wir arbeiten losgelöst von starren Formaten und stellen für jedes Vorhaben die Leistungen und Kompetenzen zusammen, die tatsächlich benötigt werden. Wenn wir dabei feststellen, dass ein anderer Ansatz sinnvoller ist oder wir nicht der richtige Partner für die Umsetzung sind, sagen wir das offen. Denn gute Beratung bedeutet für uns, die beste Lösung für dein Projekt zu finden – nicht zwangsläufig die beste Lösung für uns.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Je nach Ausgangslage begleiten wir dich punktuell als strategischer Sparringspartner oder entwickeln gemeinsam mit dir die vollständige Grundlage für dein Projekt.',
        cards: [
          {
            title: 'Strategy-Workshops & Sparring',
            text: 'In strukturierten Workshops schärfen wir gemeinsam die Aufgabenstellung, entwickeln erste Ansätze und schaffen eine belastbare Grundlage für die nächsten Entscheidungen.'
          },
          {
            title: 'Ziel- & Zielgruppenanalyse',
            text: 'Wir definieren Ziele, Zielgruppen, Bedürfnisse und relevante Rahmenbedingungen, damit die spätere Lösung nicht an den Menschen vorbeientwickelt wird.'
          },
          {
            title: 'Kreative Leitidee & Storytelling',
            text: 'Wir entwickeln eine verständliche Leitidee und ein Narrativ, das dein Projekt inhaltlich zusammenhält und zur Marke sowie zur Zielgruppe passt.'
          },
          {
            title: 'Formate & Aktivierungsmechaniken',
            text: 'Wir prüfen unterschiedliche Formate und Mechaniken und entwickeln den Ansatz, der Menschen am besten zum Mitmachen, Wiederkommen oder Weitererzählen bewegt.'
          },
          {
            title: 'Machbarkeit & Umsetzungsplanung',
            text: 'Wir betrachten Budget, Timing, technische Anforderungen, notwendige Kompetenzen und mögliche Partner und übersetzen die Idee in eine realistische Roadmap.'
          },
          {
            title: 'KPIs & Erfolgsmessung',
            text: 'Wir legen fest, woran der Erfolg gemessen werden soll – beispielsweise an Teilnahmen, Leads, Verweildauer, Interaktionen, Conversion oder Markenwirkung.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns die passende Lösung für dein Vorhaben finden.',
      text:
        'Im kostenlosen Erstgespräch lernen wir deine Aufgabenstellung kennen und klären, welcher nächste Schritt für dein Projekt sinnvoll ist.',
      primaryLabel: 'Projekt anfragen'
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
      headline: 'Guter Content beginnt mit einer guten Geschichte.',
      subline:
        'Wir entwickeln Content- und Live-Formate, die zur Marke, zum Kanal und zu den Menschen passen, die du erreichen möchtest.',
      ctaLabel: 'Contentprojekt unverbindlich besprechen',
      image: '/REWExfckoln_1770162125933.jpg',
      imageAlt: 'Live-Streaming Produktion und Gaming Content Produktion bei GG Manufaktur'
    },
    pain: {
      heading: 'Vom einzelnen Moment zum wiedererkennbaren Format',
      text: [
        'Content soll nicht nur dokumentieren, dass etwas stattgefunden hat. Er soll erklären, unterhalten, Nähe schaffen oder Menschen zum Mitmachen bewegen. Deshalb denken wir Thema, Format, Produktion und spätere Ausspielung von Anfang an gemeinsam.',
        'Unsere Erfahrung stammt aus Live-Produktionen, Gaming, eSport und Community-Kommunikation. Dieses Wissen setzen wir ebenso für Events, Markenformate, Interviews, Shows und Social Content ein. Je nach Bedarf entwickeln wir ein neues Format, produzieren einzelne Inhalte oder übernehmen die redaktionelle und technische Gesamtsteuerung.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Unsere Leistungen reichen von der ersten Themenidee bis zur fertigen Ausspielung und Auswertung.',
        cards: [
          {
            title: 'Contentstrategie',
            text:
              'Wir definieren Themen, Zielgruppen, Kanäle und Ziele als Grundlage für die weitere Produktion.'
          },
          {
            title: 'Formatentwicklung',
            text:
              'Wir entwickeln wiedererkennbare Shows, Serien, Interviews und redaktionelle Formate.'
          },
          {
            title: 'Redaktion & Storytelling',
            text:
              'Wir strukturieren Inhalte, Botschaften, Moderationen und Abläufe zu einer verständlichen Geschichte.'
          },
          {
            title: 'Live-Formate & Broadcast',
            text:
              'Wir konzipieren Livestreams, Bühnenkommunikation und hybride Formate für relevante Plattformen.'
          },
          {
            title: 'Social Content & Cutdowns',
            text:
              'Wir verlängern Produktionen mit plattformgerechten Kurzformaten, Clips und begleitenden Inhalten.'
          },
          {
            title: 'Distribution & Auswertung',
            text:
              'Wir planen die Ausspielung und bewerten Reichweite, Interaktionen, Verweildauer und weitere KPIs.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns über dein nächstes Contentformat sprechen.',
      text:
        'Im kostenlosen Erstgespräch klären wir, welche Inhalte und Kanäle für dein Ziel sinnvoll sind.',
      primaryLabel: 'Contentprojekt unverbindlich besprechen'
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
      headline: 'Aus einem Ort wird ein Erlebnis.',
      subline:
        'Wir konzipieren und realisieren Events und Markenaktivierungen, die Menschen nicht nur besuchen, sondern aktiv erleben. Vom einzelnen Modul am Messestand bis zur vollständigen Veranstaltung.',
      ctaLabel: 'Eventprojekt unverbindlich besprechen',
      image: '/images/competencies/eventtechnik.jpg',
      imageAlt: 'Gaming Messestand und eSport Event Konzeption von GG Manufaktur'
    },
    pain: {
      heading: 'Erlebnisse, die zur Aufgabe passen',
      text: [
        'Am Anfang steht die Frage, was dein Event erreichen soll: Aufmerksamkeit erzeugen, Menschen zusammenbringen, ein Produkt erlebbar machen oder eine Community aktivieren. Daraus entwickeln wir ein Format, das zur Zielgruppe, zur Marke und zu den Rahmenbedingungen passt.',
        'Wir begleiten Projekte von der ersten Idee über Dramaturgie, Flächenplanung und Programm bis zur Umsetzung vor Ort. Du kannst uns für einzelne Bausteine beauftragen oder uns die zentrale Steuerung des Gesamtprojekts übertragen. Dabei setzen wir nicht automatisch auf Gaming oder digitale Technik, sondern auf die Lösung, die für das konkrete Ziel sinnvoll ist.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Je nach Projekt übernehmen wir einzelne Leistungsbereiche oder verbinden sie zu einem ganzheitlich gesteuerten Eventkonzept.',
        cards: [
          {
            title: 'Eventstrategie & Konzeption',
            text:
              'Wir übersetzen Ziele, Zielgruppen und Rahmenbedingungen in ein tragfähiges Veranstaltungskonzept.'
          },
          {
            title: 'Dramaturgie & Besucherführung',
            text:
              'Wir planen Abläufe, Programmpunkte, Flächen und Touchpoints entlang eines schlüssigen Gesamterlebnisses.'
          },
          {
            title: 'Markenaktivierungen',
            text:
              'Wir entwickeln Mitmachformate, Challenges und Erlebnisse, die Besucher aktiv mit der Marke verbinden.'
          },
          {
            title: 'Shows, Turniere & Rahmenprogramm',
            text:
              'Wir konzipieren Bühnenprogramme, Wettbewerbe und begleitende Inhalte für Publikum und Teilnehmende.'
          },
          {
            title: 'Projektsteuerung & Logistik',
            text:
              'Wir koordinieren Gewerke, Partner, Timings, Genehmigungen und die operative Vorbereitung.'
          },
          {
            title: 'Umsetzung & Betrieb vor Ort',
            text:
              'Wir steuern Aufbau, Proben, Veranstaltung und Abbau und bleiben während der gesamten Laufzeit ansprechbar.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns dein nächstes Erlebnis gemeinsam planen.',
      text:
        'Im kostenlosen Erstgespräch sprechen wir über dein Vorhaben und die passende Form der Zusammenarbeit.',
      primaryLabel: 'Eventprojekt unverbindlich besprechen'
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
      headline: 'Digitale Lösungen, die sich deinem Projekt anpassen.',
      subline:
        'Wir entwickeln individuelle Tools, White-Label-Plattformen und Gamification-Lösungen, ohne dass du dafür ein eigenes Entwicklerteam aufbauen musst.',
      ctaLabel: 'Digitale Lösung unverbindlich besprechen',
      image: '/Gamification.jpg',
      imageAlt: 'Gamification Lösung und individuelle Gaming Plattform von GG Manufaktur'
    },
    pain: {
      heading: 'Eigene Lösung, ohne bei null anzufangen',
      text: [
        'Unsere modulare Softwarebasis ermöglicht es, digitale Anwendungen schneller und wirtschaftlicher an Marken, Prozesse und Zielgruppen anzupassen. Benötigt dein Projekt darüber hinaus individuelle Funktionen, entwickeln wir diese gezielt weiter.',
        'So entstehen beispielsweise digitale Eventpässe, Quizzes, Games, Challenges, Turniersysteme, Community-Plattformen oder Recruiting-Lösungen. Wir betrachten dabei nicht nur die Oberfläche, sondern auch Registrierung, Datenstruktur, Schnittstellen, Betrieb und Erfolgsmessung. Datenschutz, DSGVO-konforme Prozesse und Hosting in Deutschland werden von Beginn an berücksichtigt.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Die technische Lösung wird aus erprobten Modulen und projektspezifischen Funktionen zusammengestellt.',
        cards: [
          {
            title: 'Individuelle Tools & Anwendungen',
            text:
              'Wir entwickeln digitale Anwendungen, die exakt auf den jeweiligen Anwendungsfall zugeschnitten sind.'
          },
          {
            title: 'White-Label-Plattformen',
            text:
              'Unsere technische Basis erscheint mit deiner Marke, Domain, Gestaltung und den benötigten Funktionen.'
          },
          {
            title: 'Gamification & Games',
            text:
              'Wir entwickeln Quizzes, Challenges, Belohnungssysteme und spielerische Mechaniken für konkrete Kommunikationsziele.'
          },
          {
            title: 'Turniere & Communities',
            text:
              'Registrierung, Bracketing, Rankings und Community-Funktionen werden zentral abgebildet und verwaltet.'
          },
          {
            title: 'Leadgenerierung & CRM',
            text:
              'Einwilligungsbasierte Datenerfassung und Schnittstellen ermöglichen strukturierte Übergaben an bestehende Systeme.'
          },
          {
            title: 'Hosting, Support & Betrieb',
            text:
              'Wir übernehmen Hosting, technische Betreuung, Updates und die laufende Weiterentwicklung der Lösung.'
          }
        ],
        groupCta: 'Whitelabel-Demo anfragen'
      }
    ],
    ctaCloser: {
      headline: 'Lass uns deine digitale Lösung gemeinsam einordnen.',
      text:
        'Im kostenlosen Erstgespräch prüfen wir, welche bestehenden Module passen und wo individuelle Entwicklung sinnvoll ist.',
      primaryLabel: 'Digitale Lösung unverbindlich besprechen'
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
      headline: 'Technik, die funktioniert, wenn es darauf ankommt.',
      subline:
        'Wir planen und koordinieren die technische Infrastruktur für Events, Markenaktivierungen, Gaming-Setups und Live-Produktionen.',
      ctaLabel: 'Technikprojekt unverbindlich besprechen',
      image: '/images/hagebau/slide-2.jpg',
      imageAlt: 'Eventtechnik und Produktionsequipment bei einer Gaming-Aktivierung von GG Manufaktur'
    },
    pain: {
      heading: 'Verlässlich geplant und professionell betrieben',
      text: [
        'Gute Eventtechnik beginnt lange vor dem Aufbau. Wir prüfen Anforderungen, Flächen, Strom, Netzwerk, Signalwege und Abläufe und entwickeln daraus ein Setup, das zum Format und zum Budget passt.',
        'Gemeinsam mit spezialisierten Technikpartnern koordinieren wir Hardware, Veranstaltungstechnik, Regie und Betrieb. Dabei behalten wir alle Schnittstellen im Blick und planen notwendige Redundanzen, Tests und Proben ein. So entsteht eine technische Grundlage, auf die sich Produktion, Teilnehmende und Veranstalter verlassen können.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Wir stellen das technische Setup passend zum tatsächlichen Bedarf des Projekts zusammen.',
        cards: [
          {
            title: 'Technische Planung',
            text:
              'Wir planen Infrastruktur, Stromlasten, Signalwege, Aufbauzeiten und technische Schnittstellen.'
          },
          {
            title: 'Gaming-Hardware',
            text:
              'PCs, Konsolen, Displays und Peripherie werden passend zum Format konfiguriert und betreut.'
          },
          {
            title: 'Netzwerk & Internet',
            text:
              'Wir konzipieren stabile Verbindungen für Spielbetrieb, Produktion, Streaming und Besucher.'
          },
          {
            title: 'Licht, Ton, LED & Bühne',
            text:
              'Veranstaltungstechnik wird als Teil des Gesamterlebnisses geplant und mit den Gewerken abgestimmt.'
          },
          {
            title: 'Regie, Streaming & Broadcast',
            text:
              'Wir koordinieren Kameras, Bildregie, Ton, Einspieler, Streaming und die technische Ausspielung.'
          },
          {
            title: 'Aufbau & Betrieb vor Ort',
            text:
              'Technische Teams begleiten Aufbau, Proben, Veranstaltung, Störungsmanagement und Abbau.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns dein technisches Setup durchsprechen.',
      text:
        'Im kostenlosen Erstgespräch klären wir Anforderungen, Rahmenbedingungen und notwendige Gewerke.',
      primaryLabel: 'Technikprojekt unverbindlich besprechen'
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
      headline: 'Räume und Designs, die Marken erlebbar machen.',
      subline:
        'Wir entwickeln visuelle Auftritte, Flächen und individuelle Bauten, die Funktion, Markenbild und Besuchererlebnis sinnvoll miteinander verbinden.',
      ctaLabel: 'Raumkonzept unverbindlich besprechen',
      image: '/hero-rewe.jpg',
      imageAlt: 'Individuell gestalteter Gaming-Messestand mit Custom-Branding bei GG Manufaktur'
    },
    pain: {
      heading: 'Mehr als eine schöne Fläche',
      text: [
        'Ein guter Markenraum muss nicht nur gut aussehen. Er muss Orientierung geben, Abläufe ermöglichen, Menschen anziehen und die geplante Aktivierung unterstützen. Deshalb denken wir Gestaltung, Besucherführung, Technik und Nutzung von Anfang an zusammen.',
        'Von der ersten visuellen Idee über Raum- und Ausstattungskonzepte bis zur Produktion und Montage begleiten wir den gesamten Prozess. Für Messebau und Sonderanfertigungen arbeiten wir mit erfahrenen Partnern zusammen und koordinieren die Umsetzung zentral.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Je nach Projekt entwickeln wir einzelne Gestaltungselemente oder den vollständigen räumlichen Auftritt.',
        cards: [
          {
            title: 'Creative Direction',
            text:
              'Wir übersetzen Marke, Botschaft und Aktivierungsidee in eine klare visuelle Richtung.'
          },
          {
            title: 'Raum- & Flächenkonzeption',
            text:
              'Wir planen Zonierung, Besucherführung, Funktionsbereiche und die sinnvolle Nutzung der verfügbaren Fläche.'
          },
          {
            title: 'Set- & Bühnendesign',
            text:
              'Wir gestalten Bühnen, Studios, Kulissen und Erlebnisräume passend zu Format und Produktion.'
          },
          {
            title: 'Messebau & Sonderbauten',
            text:
              'Messestände, Spielstationen, Möbel und individuelle Bauteile werden projektspezifisch realisiert.'
          },
          {
            title: 'Branding & Orientierung',
            text:
              'Grafiken, Beschilderungen, Wegeführung und Markenflächen schaffen einen konsistenten Gesamtauftritt.'
          },
          {
            title: 'Produktion, Aufbau & Logistik',
            text:
              'Wir koordinieren Fertigung, Transport, Montage, Abnahme und Rückbau mit den beteiligten Partnern.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns über deine Fläche und ihre Aufgabe sprechen.',
      text:
        'Im kostenlosen Erstgespräch klären wir, was der Raum leisten soll und welche Umsetzung dafür sinnvoll ist.',
      primaryLabel: 'Raumkonzept unverbindlich besprechen'
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
      headline: 'Wir halten fest, was dein Projekt besonders macht.',
      subline:
        'Wir begleiten Events, Aktivierungen und Kampagnen mit Foto- und Videoproduktionen, die Atmosphäre, Menschen und Markenbotschaften authentisch einfangen.',
      ctaLabel: 'Foto- oder Videoprojekt besprechen'
    },
    pain: {
      heading: 'Content, der über den Moment hinaus wirkt',
      text: [
        'Bevor die Kamera läuft, klären wir, wofür das Material später benötigt wird. Daraus entstehen Motivplanung, Shotlists, Interviewfragen und ein Produktionsablauf, der zum Event oder zur Kampagne passt.',
        'Unsere Teams kennen die Dynamik von Live-Events, Gaming-Produktionen, Bühnen und Community-Formaten. Sie arbeiten aufmerksam im Hintergrund und sind gleichzeitig dort, wo die entscheidenden Momente entstehen. Das Material bereiten wir passend für Dokumentation, Presse, Social Media, interne Kommunikation oder die nächste Kampagne auf.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Der Produktionsumfang wird auf Anlass, Kanäle und gewünschte Weiterverwendung abgestimmt.',
        cards: [
          {
            title: 'Eventfotografie',
            text:
              'Wir dokumentieren Menschen, Atmosphäre, Aktivierungen, Branding und entscheidende Programmmomente.'
          },
          {
            title: 'Eventfilm & Aftermovie',
            text:
              'Wir verdichten den Verlauf und die Stimmung eines Projekts zu einem hochwertigen Bewegtbildformat.'
          },
          {
            title: 'Interviews & Statements',
            text:
              'Wir planen und produzieren Gespräche, O-Töne und kurze Statements für unterschiedliche Kanäle.'
          },
          {
            title: 'Kampagnen- & Produktcontent',
            text:
              'Wir erstellen Foto- und Videoinhalte für Markenkommunikation, Produkte und begleitende Kampagnen.'
          },
          {
            title: 'Social-Media-Content',
            text:
              'Hochkantformate, Reels, Shorts und schnelle Cutdowns werden direkt für die jeweilige Plattform geplant.'
          },
          {
            title: 'Postproduktion & Assets',
            text:
              'Auswahl, Schnitt, Farbkorrektur, Tonbearbeitung und strukturierte Bereitstellung erfolgen aus einer Produktion.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns festhalten, was dein Projekt besonders macht.',
      text:
        'Im kostenlosen Erstgespräch klären wir Anlass, benötigte Formate und den passenden Produktionsumfang.',
      primaryLabel: 'Foto- oder Videoprojekt besprechen'
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
      headline: 'Die richtige Persönlichkeit ist wichtiger als die größte Reichweite.',
      subline:
        'Wir finden und integrieren Creator, Hosts, Moderatoren und eSport-Talents, die glaubwürdig zur Marke, zur Zielgruppe und zur Aufgabe passen.',
      ctaLabel: 'Creator-Aktivierung unverbindlich besprechen',
      image: '/images/hagebau/slide-1.jpg',
      imageAlt: 'Creator-Aktivierung mit Moderation auf einer Gaming-Bühne bei GG Manufaktur'
    },
    pain: {
      heading: 'Menschen mit einer klaren Rolle im Konzept',
      text: [
        'Eine bekannte Person allein macht noch keine gute Aktivierung. Entscheidend ist, warum sie Teil des Projekts ist, was sie dort tut und welchen Mehrwert sie für Community und Marke schafft.',
        'Wir unterstützen von der Auswahl über Ansprache und Buchung bis zur inhaltlichen Einbindung und Betreuung. Dabei betrachten wir Reichweite, Community-Fit, Tonalität, Plattformen und Brand Safety. So entstehen Kooperationen, die nicht aufgesetzt wirken und über einen kurzen Auftritt hinaus funktionieren.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Je nach Projekt übernehmen wir einzelne Schritte oder das vollständige Talentmanagement.',
        cards: [
          {
            title: 'Recherche & Auswahl',
            text:
              'Wir identifizieren Creator, Hosts, Moderatoren und Talents, die zur Zielgruppe und zum Format passen.'
          },
          {
            title: 'Community-Fit & Brand Safety',
            text:
              'Wir bewerten Inhalte, Tonalität, Umfeld und mögliche Risiken vor einer Zusammenarbeit.'
          },
          {
            title: 'Rollen- & Formatentwicklung',
            text:
              'Wir entwickeln eine klare Aufgabe für die beteiligten Persönlichkeiten innerhalb des Gesamtkonzepts.'
          },
          {
            title: 'Ansprache, Buchung & Rechte',
            text:
              'Wir koordinieren Verfügbarkeiten, Konditionen, Nutzungsrechte und die vertragliche Abstimmung.'
          },
          {
            title: 'Integration & Betreuung',
            text:
              'Wir briefen Beteiligte, begleiten Proben und Produktion und sichern eine reibungslose Einbindung.'
          },
          {
            title: 'Content & Auswertung',
            text:
              'Wir planen verwertbare Inhalte und bewerten Reichweite, Interaktionen und weitere vereinbarte KPIs.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns die passenden Persönlichkeiten für dein Projekt finden.',
      text:
        'Im kostenlosen Erstgespräch sprechen wir über Zielgruppe, Format, Rolle und mögliche Besetzung.',
      primaryLabel: 'Creator-Aktivierung unverbindlich besprechen'
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
      headline: 'Talente finden. Potenziale entwickeln.',
      subline:
        'Wir entwickeln Scouting- und Entwicklungsformate für Vereine, Verbände und Organisationen, die Talente strukturiert erreichen, auswählen und langfristig begleiten möchten.',
      ctaLabel: 'Scouting-Konzept unverbindlich besprechen',
      image: '/images/status-quo/rewe-event.jpg',
      imageAlt: 'Bühne des Scouting Cup Finales einer eSport-Talentförderung bei GG Manufaktur'
    },
    pain: {
      heading: 'Scouting ist mehr als ein einzelnes Turnier',
      text: [
        'Ein erfolgreiches Scouting beginnt mit klaren Auswahlkriterien und einem nachvollziehbaren Weg von der ersten Teilnahme bis zur finalen Entscheidung. Dafür verbinden wir digitale Qualifier, Turnierserien, physische Sichtungen und Finals zu einem zusammenhängenden Prozess.',
        'Neben der sportlichen oder spielerischen Leistung können Teamfähigkeit, Kommunikation, Auftreten und Entwicklungspotenzial berücksichtigt werden. Wir unterstützen bei Organisation, Plattform, Bewertung und Dokumentation und beachten dabei Datenschutz, Einwilligungen und besondere Anforderungen bei minderjährigen Teilnehmenden.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Die einzelnen Bausteine werden passend zu Ziel, Titel, Region und gewünschter Talentstruktur kombiniert.',
        cards: [
          {
            title: 'Scoutingstrategie',
            text:
              'Wir definieren Zielbild, Teilnahmebedingungen, Auswahlkriterien und den vollständigen Scoutingprozess.'
          },
          {
            title: 'Digitale Qualifier',
            text:
              'Online-Wettbewerbe ermöglichen eine breite und ortsunabhängige erste Sichtung potenzieller Talente.'
          },
          {
            title: 'Physische Scouting-Events',
            text:
              'Vor-Ort-Formate schaffen Raum für persönliche Bewertung, Interviews und ergänzende Aufgaben.'
          },
          {
            title: 'Turnierserien & Finals',
            text:
              'Wiederkehrende Wettbewerbe und Finalevents geben dem Prozess Struktur, Sichtbarkeit und einen klaren Abschluss.'
          },
          {
            title: 'Bewertung & Dokumentation',
            text:
              'Ergebnisse, Beobachtungen und Einwilligungen werden nachvollziehbar und datenschutzkonform erfasst.'
          },
          {
            title: 'Talententwicklung & Teambuilding',
            text:
              'Trainings, Workshops und begleitende Programme unterstützen ausgewählte Talente nach dem Scouting.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns dein Scouting strukturiert aufsetzen.',
      text:
        'Im kostenlosen Erstgespräch klären wir Zielbild, Zielgruppe und den passenden Auswahlprozess.',
      primaryLabel: 'Scouting-Konzept unverbindlich besprechen'
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
      headline: 'Arbeitgebermarken werden stark, wenn Menschen sie erleben.',
      subline:
        'Wir nutzen Gamification, Gaming, eSport und interaktive Formate, um Arbeitgeber mit jungen und digital affinen Zielgruppen ins Gespräch zu bringen.',
      ctaLabel: 'Recruiting-Aktivierung besprechen',
      image: '/hero-gamechanger.jpg',
      imageAlt: 'Employer-Branding-Aktivierung im Gaming-Umfeld bei GG Manufaktur'
    },
    pain: {
      heading: 'Vom ersten Kontakt zum echten Austausch',
      text: [
        'Gerade auf Ausbildungs- und Karrieremessen reicht es nicht, Informationen auszulegen und auf Gespräche zu warten. Eine passende Aktivierung schafft einen natürlichen Einstieg, erhöht die Verweildauer und macht Unternehmen, Aufgaben und Kultur erlebbar.',
        'Dabei muss nicht jedes Recruiting-Projekt ein eSport-Turnier sein. Je nach Zielgruppe und Anlass können ein Quiz, ein Recruiting-Game, eine Team-Challenge, ein Simulator oder ein einfaches analoges Mitmachformat die bessere Lösung sein. Wir verbinden die Aktivierung auf Wunsch mit Registrierung, Leadgenerierung, CRM-Übergabe und einer nachvollziehbaren Erfolgsmessung. Datenschutz und transparente Einwilligungen werden von Anfang an mitgedacht.'
      ]
    },
    leistungenHeading: 'Unsere Leistungen im Detail',
    leistungen: [
      {
        text:
          'Wir entwickeln einzelne Messeaktivierungen ebenso wie längerfristige Recruiting- und Employer-Branding-Kampagnen.',
        cards: [
          {
            title: 'Strategie & Zielgruppenansprache',
            text:
              'Wir definieren Ziele, Botschaften und geeignete Zugänge zu Bewerbern, Schülern und Nachwuchstalenten.'
          },
          {
            title: 'Messe- & Eventaktivierungen',
            text:
              'Interaktive Formate erleichtern den Gesprächseinstieg und erhöhen Aufmerksamkeit und Verweildauer am Stand.'
          },
          {
            title: 'Games, Quizzes & Challenges',
            text:
              'Spielerische Aufgaben vermitteln Arbeitgebermarke, Berufsbilder und Unternehmensinhalte auf verständliche Weise.'
          },
          {
            title: 'Gaming- & eSport-Formate',
            text:
              'Turniere und Gaming-Erlebnisse schaffen authentische Anknüpfungspunkte für digital affine Zielgruppen.'
          },
          {
            title: 'Candidate Journey & Leadgenerierung',
            text:
              'Registrierung, Einwilligungen und Follow-ups werden entlang eines klaren Kontaktprozesses geplant.'
          },
          {
            title: 'CRM & Erfolgsmessung',
            text:
              'Schnittstellen und KPI-Tracking machen Kontakte, Teilnahmen, Interaktionen und Conversion nachvollziehbar.'
          }
        ]
      }
    ],
    ctaCloser: {
      headline: 'Lass uns deine Arbeitgebermarke erlebbar machen.',
      text:
        'Im kostenlosen Erstgespräch sprechen wir über Zielgruppe, Anlass und die passende Aktivierung.',
      primaryLabel: 'Recruiting-Aktivierung besprechen'
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
