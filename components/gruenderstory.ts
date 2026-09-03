// ---------------------------------------------------------------------------
// Die Gründerstory
// ---------------------------------------------------------------------------
// The founder's own account, as delivered: a first-person text in chapters.
// Kept as data rather than as JSX so the page is a renderer and this file is
// the manuscript -- an edit to the story is an edit here, and only here.
//
// Its own module, not part of UeberUnsPage: the teaser under the team is on
// the "Über uns" chunk, the full text is only fetched when someone actually
// opens /ueber-uns/meine-geschichte.
// ---------------------------------------------------------------------------

export interface StoryChapter {
  heading: string;
  paras: string[];
}

/** The line under the page's headline. */
export const STORY_LEAD =
  'Vom Fußball zum Gaming. Von Stift und Papier zur eigenen Plattform. Und von der eSport Manufaktur zur GG Manufaktur.';

/** Before the first chapter heading. */
export const STORY_INTRO: string[] = [
  'Wenn ich heute auf die GG Manufaktur schaue, sehe ich keine Firma, die irgendwann an einem Schreibtisch geplant wurde. Ich sehe viele einzelne Momente, Begegnungen und Entscheidungen, die lange Zeit gar nicht wie der Anfang einer Unternehmensgeschichte aussahen.'
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    heading: 'Die ersten Turniere',
    paras: [
      'Eigentlich begann alles vor rund 15 Jahren. In einer Garage bei einem örtlichen Fußballverein veranstalteten wir an Feiertagen und Wochenenden unsere ersten FIFA-Turniere. Wir spielten auf einer Leinwand, die Ergebnisse wurden mit Stift und Papier festgehalten und der Turnierplan entstand irgendwie nebenbei.',
      'Es war improvisiert, aber es funktionierte. Menschen kamen zusammen, spielten gegeneinander, fieberten mit und wollten wissen, wer am Ende vorne lag. Rückblickend waren das meine ersten Gaming-Events – auch wenn damals niemand von Gamification, Community Engagement oder Live-Aktivierung gesprochen hätte.',
      'Auch außerhalb dieser Turniere gehörte FIFA für uns einfach dazu. Freitags trafen wir uns mit Freunden, bevor es gemeinsam weiterging. Gespielt wurde im klassischen „Verlierer gibt ab“-Modus. Wer verlor, musste den Controller weiterreichen.',
      'Das war unkompliziert und machte Spaß. Trotzdem stellte ich mir immer wieder dieselbe Frage: Warum gibt es für solche privaten Runden keine einfache Möglichkeit, Ergebnisse, Duelle, Tabellen und kleine Wettbewerbe digital festzuhalten? Keine komplizierte Profi-Plattform, sondern eine Anwendung für Casual Gamer, Freundesgruppen und kleine Communities – mit Leaderboards, Ligen und Turniermodulen, die jeder ohne großen Aufwand nutzen kann.'
    ]
  },
  {
    heading: 'Eine Idee, die immer wieder zurückkam',
    paras: [
      'Diese Idee blieb über Jahre in der Schublade. Ich sprach immer wieder mit zwei Freunden darüber, mit denen sie ursprünglich entstanden war. Im Jahr 2020 sagte ich schließlich: Lasst es uns wirklich umsetzen.',
      'Die beiden teilten zu diesem Zeitpunkt meine Vorstellung einer eigenen App nicht mehr. Sie gaben mir aber die Freiheit, die Idee allein weiterzuverfolgen. Also fing ich an.',
      'Mein beruflicher Weg hatte mich bis dahin nicht durch klassische Agenturen oder Start-up-Inkubatoren geführt. Mein Fundament lag in der Materialwirtschaft und im Business Development. Mehr als zwölf Jahre Berufserfahrung hatten mir gezeigt, wie Einkauf, Kalkulation, Vertrieb, Prozesse, Verhandlungen und operative Verantwortung zusammenspielen.',
      'Ich wusste also, wie man ein Vorhaben strukturiert und wirtschaftlich denkt. Was ich nicht hatte, waren Erfahrung in der Softwareentwicklung und ausreichend Kapital, um eine App vollständig finanzieren zu lassen.'
    ]
  },
  {
    heading: 'Viel Idee, wenig Kapital',
    paras: [
      'Ich stellte meine Idee verschiedenen Agenturen vor. Die Reaktionen waren nicht grundsätzlich negativ. Das Problem war deutlich einfacher: Ohne Budget wollte niemand ein solches Produkt entwickeln. Ich suchte deshalb keinen klassischen Auftragnehmer, sondern einen Partner, der an die Idee glaubte, sich beteiligte und bereit war, gemeinsam ins Risiko zu gehen.',
      'Über meine Schwester lernte ich schließlich einen selbstständigen Entwickler kennen. Unsere Vereinbarung war genauso einfach wie naiv: Du entwickelst die Anwendung, ich kümmere mich um den Rest.',
      'Wir starteten praktisch blind. Ohne großen Businessplan, ohne finanzielle Absicherung und ohne zu wissen, wohin uns dieses Hobbyprojekt führen würde.'
    ]
  },
  {
    heading: 'Eine Stecknadel auf Google Maps',
    paras: [
      'Die erste Version unserer App wurde entwickelt und über das Gewerbe des Entwicklers gehostet. Dadurch entstand auch ein Google-Eintrag am Standort seines Unternehmens.',
      'Was danach passierte, kann man kaum planen.',
      'Ein Verantwortlicher aus dem eFootball-Umfeld des Bayerischen Fußball-Verbands wollte einen ehemaligen Klassenkameraden besuchen. Bei der Suche nach der Adresse entdeckte er auf Google Maps – nur eine Straße entfernt – den damaligen Namen unseres Projekts. Der klang nach eSport und machte ihn neugierig.',
      'Beim BFV wurde recherchiert, wer dahintersteckte und was wir eigentlich machten. Kurz darauf erhielten wir eine E-Mail mit der Frage, ob wir uns einmal austauschen möchten.',
      'Zu diesem Zeitpunkt hatten wir keine Website, keine Agentur und kein etabliertes Unternehmen. Wir hatten lediglich eine App, an der wir in unserer Freizeit arbeiteten, und die Hoffnung, daraus etwas Cooles für die Gaming-Community zu entwickeln.',
      'Wir vereinbarten einen Zoom-Call. Als die Kamera anging, begrüßte mich ein junger Mann mit den Worten: „Hi Giana.“ Giana ist mein Spitzname. Trotzdem konnte ich ihn zunächst nicht einordnen. Sein Gesicht kam mir bekannt vor, mehr aber auch nicht.',
      'Dann erklärte er es: Wir kannten uns aus dem Umfeld der SKV Rutesheim. Er hatte dort in der A-Jugend gespielt, kannte mich als Stürmer der ersten Mannschaft und absolvierte inzwischen ein Praktikum beim Bayerischen Fußball-Verband.',
      'Wir kamen aus demselben Ort, waren uns im Fußball bereits begegnet und mussten uns trotzdem über eine App und einen digitalen Termin beim BFV wiederfinden. Manchmal gehört zu einer echten Gründungsgeschichte neben Mut und Arbeit eben auch eine Portion Zufall.'
    ]
  },
  {
    heading: 'Der erste große Türöffner',
    paras: [
      'Die Gespräche mit dem BFV entwickelten sich schnell. Die persönliche Chemie stimmte und auch unsere Herangehensweise überzeugte.',
      'Es gab nur zwei Probleme: Wir hatten noch keine richtige Firma und unser bestehendes Produkt war nicht das, was der Verband benötigte.',
      'Gesucht wurde eine flexible White-Label-Lösung, die individuell an die Prozesse, Wettbewerbe und Anforderungen des BFV angepasst werden konnte. Unsere ursprüngliche Community-App war dafür nicht gebaut.',
      'Statt abzusagen, gingen wir gemeinsam in Workshops. Wir analysierten Anforderungen, hinterfragten unser bisheriges Modell und entwickelten die Idee weiter. Aus einer Anwendung für FIFA-Abende unter Freunden wurde Schritt für Schritt die Grundlage für eine professionelle Turnier- und eFootball-Plattform.',
      'Der konkrete Auftrag erhöhte das Tempo erheblich. Am 22. September 2021 wurde schließlich die eSport Manufaktur GmbH gegründet – gemeinsam mit weiteren Gesellschaftern, die Erfahrungen aus Entwicklung, Marketing, Gaming und der Creator-Welt mitbrachten.',
      'Wir gründeten schnell, voller Überzeugung und ohne uns in jeder unternehmerischen Frage ausreichend beraten zu lassen. Wir wollten die Chance nutzen und liefern. Heute würde ich manche Entscheidung anders treffen. Damals war genau dieses Tempo aber wahrscheinlich notwendig, damit aus der Idee überhaupt ein Unternehmen werden konnte.'
    ]
  },
  {
    heading: 'Plötzlich war es kein Hobbyprojekt mehr',
    paras: [
      'Parallel zur Zusammenarbeit mit dem BFV kamen immer neue Anfragen. Vereine, Unternehmen, Streamer und Communities wollten Online-Turniere in FIFA, Mario Kart oder Formel 1 veranstalten.',
      'Unsere Anwendung wuchs. Turnier-, Liga- und Leaderboard-Module wurden erweitert. Premium-Abonnements, Bezahlfunktionen und Preisgelder kamen hinzu. Aus einem kleinen Community-Projekt entwickelte sich innerhalb kurzer Zeit ein Produkt mit echten Kunden, Verpflichtungen und wirtschaftlicher Verantwortung.',
      'Nur zwei Monate nach der Gründung folgte die erste große Krise. Der Entwickler erklärte, dass er das Projekt zeitlich nicht mehr weiterführen könne. Gleichzeitig standen wir mitten im Go-live für den BFV. Es folgte eine schwierige Auseinandersetzung über Quellcode, Nutzungsrechte und die Zukunft der Plattform.',
      'Mein erstes großes unternehmerisches Learning war schmerzhaft und teuer: Eine gute Zusammenarbeit ersetzt keine klaren Regelungen über Code, Urheberrechte und geistiges Eigentum.',
      'Wir fanden schließlich eine Einigung. Vor allem aber schafften wir es, die Handlungsfähigkeit des Unternehmens zu sichern und unsere Verpflichtungen gegenüber dem BFV zu erfüllen.',
      'Für mich war Aufgeben zu diesem Zeitpunkt keine Option. Ich hatte Kunden überzeugt, Verantwortung übernommen und an die Idee geglaubt. Also setzte ich alles in Bewegung, um weiterzumachen.'
    ]
  },
  {
    heading: 'Aus dem ersten Auftrag wurde ein Netzwerk',
    paras: [
      'Weitere Projekte und Kooperationen folgten – unter anderem mit dem VfL Bochum, RB Leipzig und T-Systems. Gleichzeitig entwickelte sich die Zusammenarbeit mit dem Bayerischen Fußball-Verband weiter.',
      'Aus einem zufälligen Erstkontakt wurde eine langfristige und vertrauensvolle Partnerschaft, die bis heute Bestand hat. Gemeinsam entstanden immer neue Wettbewerbe, Plattformfunktionen und Sonderprojekte.',
      'Auch unser Angebot wurde breiter. Kunden kamen nicht mehr nur wegen einer Turniersoftware auf uns zu. Sie benötigten strategische Beratung, Eventkonzepte, Content, Technik, Streaming, Community Management, Recruiting-Aktivierungen und vollständige Umsetzungen.',
      'Wir entwickelten eigene Plattformen, steuerten Live-Events und übersetzten Markenbotschaften in Formate, an denen Menschen selbst teilnehmen konnten. Mehr als 30.000 registrierte Gamer, rund 2,6 Millionen Seitenaufrufe, eine durchschnittliche Interaktionsdauer von 7,1 Minuten und 47,3 Prozent wiederkehrende Besucher zeigten uns, dass Menschen dort bleiben, wo sie nicht nur zuschauen, sondern selbst Teil des Erlebnisses werden.'
    ]
  },
  {
    heading: 'Wachstum verläuft selten geradlinig',
    paras: [
      'Nach den ersten Erfolgen folgte keine gerade Linie nach oben.',
      'Bis 2024 wurde das Unternehmen weitgehend nebenberuflich aufgebaut. Alle Beteiligten hatten weitere berufliche Verpflichtungen. Gleichzeitig stiegen die Anforderungen der Kunden, der Aufwand für die Software und die Verantwortung für laufende Projekte.',
      'Die Vorstellungen über die Zukunft des Unternehmens entwickelten sich auseinander. Ebenso unterschiedlich wurden Einsatz, Verantwortung und erwarteter Output bewertet. Die eSport Manufaktur war in dieser Phase weder ein klares Nebenprojekt noch ein konsequent auf Wachstum ausgerichtetes Unternehmen.',
      'Nach und nach trennten sich die Wege der ursprünglichen Gesellschafter. Ich blieb als Hauptgesellschafter zurück.',
      'Das war kein einfacher Abschnitt. Aber es war ein wichtiger. Denn ich musste entscheiden, ob die eSport Manufaktur ein interessantes Nebenprojekt bleiben oder ein Unternehmen mit einer klaren Zukunft werden sollte. Ich entschied mich für die Zukunft.'
    ]
  },
  {
    heading: 'Wenn aus einem Unternehmen ein Familienprojekt wird',
    paras: [
      'In vielen Familien steigen irgendwann die Kinder in das Unternehmen der Eltern ein. Bei uns verlief es andersherum.',
      'Meine Eltern unterstützten mich finanziell und gaben mir damit einen Vertrauensvorschuss, den ich bis heute nicht als selbstverständlich empfinde. Mein Vater erwarb einen kleinen Anteil am Unternehmen – als Beteiligung an meiner Vision, als möglicher Baustein seiner Altersvorsorge und als Aufgabe für die bevorstehende Rente.',
      'Aus der finanziellen Unterstützung wurde schnell echte Mitarbeit. Er brachte seine Erfahrung ein, übernahm Verantwortung und entwickelte eine eigene Leidenschaft für das Unternehmen und die Branche. Aus meinem Projekt wurde damit auch ein Stück weit unser gemeinsames Projekt.',
      'Diese familiäre Unterstützung gab mir nicht nur wirtschaftlichen Rückhalt. Sie gab mir die Sicherheit, die eSport Manufaktur neu zu ordnen und konsequenter weiterzuentwickeln.'
    ]
  },
  {
    heading: 'Vertrauen, das man sich erarbeiten muss',
    paras: [
      'Heute besteht die GG Manufaktur aus einem Kernteam sowie einem gewachsenen Netzwerk aus Festangestellten, Minijobbern, Freelancern, Entwicklern, Kreativen und spezialisierten Dienstleistungspartnern.',
      'Dieses Netzwerk funktioniert, weil wir offen, direkt und ehrlich miteinander arbeiten. Wir müssen nicht jede Kompetenz dauerhaft selbst vorhalten. Aber wir müssen für jedes Projekt wissen, wen wir brauchen, wem wir vertrauen können und wer bereit ist, gemeinsam Verantwortung zu übernehmen.',
      'Dass Unternehmen und Marken wie REWE, NIVEA MEN, T-Systems, INTERSPORT, DAZN, Bayer, Allianz, AOK, EWE, SONAX, DEKRA, Expert und ERAZER, hagebau bolay, Schwarz Digits, Interwetten, Mastercard, KKH, LBBW, die Nassauische Sparkasse, die Kreissparkasse Böblingen, DVAG, All for One, Vector Informatik, ZÜBLIN, TRUMPF, Siegle + Epple, TERRA, WORTMANN und Effect Energy mit uns gearbeitet oder uns Projekte anvertraut haben, bestätigt diesen Weg.',
      'Im Sport durften wir unter anderem Projekte mit dem Bayerischen Fußball-Verband, dem VfB Stuttgart, dem Hamburger SV, RB Leipzig beziehungsweise RBLZ, dem VfL Bochum, dem 1. FC Nürnberg, dem SV Wehen Wiesbaden, Fortuna Düsseldorf, dem MSV Duisburg, dem 1. FC Köln und Eintracht Frankfurt begleiten.',
      'Auch öffentliche Institutionen, Hochschulen und eigene Formate wurden Teil unserer Geschichte – vom Bayerischen Digitalministerium und der Stadt München über die Hochschule Heilbronn bis zu den XP Days, dem 0711 SHOWDOWN und zahlreichen Gaming-, Recruiting- und Community-Events.',
      'Nicht jede Referenz steht für dasselbe Projektvolumen. Manche Zusammenarbeit begann mit einer Beratung, andere mit einer Plattform, einem Turnier oder einem einzelnen Event. Entscheidend ist für mich etwas anderes: Aus einer Idee ohne Kapital, Website oder fertiges Geschäftsmodell ist ein Unternehmen entstanden, dem bekannte Marken, Vereine, Verbände und Institutionen Verantwortung übertragen.'
    ]
  },
  {
    heading: 'Aus Erfahrung wurde Wissen',
    paras: [
      'Mit jedem Projekt wuchs nicht nur unser Portfolio, sondern auch unser Wissen darüber, wie Gaming, Gamification und eSport im Umfeld von Marken, Sponsoring und Recruiting funktionieren können.',
      '2025 durfte ich diese Erfahrungen auf unterschiedlichen Bühnen weitergeben. Beim Markenfestival trat ich als Speaker auf und zeigte anhand unserer Zusammenarbeit mit hagebau bolay, wie sich Gaming einsetzen lässt, um junge Menschen zu erreichen und neue Zugänge zum Recruiting zu schaffen.',
      'Beim SPOBIS Brand Summit sprach ich gemeinsam mit Maximilian Hoffart von hagebau bolay und Philipp Hagemann vom Hamburger SV über „Next Level Sponsoring: Potenziale für Marken im eSport und Recruiting“. Im Mittelpunkt stand die Frage, wie Unternehmen Gaming, Gamification und eSport authentisch in ihr Markenumfeld integrieren und damit insbesondere junge Zielgruppen erreichen können.',
      'Hinzu kamen mehrere Webinare, in denen ich unsere Erfahrungen aus Gaming, Gamification, eSport, Markenaktivierung und Employer Branding weitergeben durfte.',
      'Ich stand nicht auf diesen Bühnen, weil ich irgendwann beschlossen hatte, Speaker zu werden. Ich stand dort, weil wir über Jahre Erfahrungen gesammelt hatten, über die es sich zu sprechen lohnte.'
    ]
  },
  {
    heading: 'Nicht nur über Ideen sprechen',
    paras: [
      'Ich habe früh gelernt, dass gute Konzepte nicht automatisch überzeugen. Menschen müssen eine Idee verstehen, sehen und im besten Fall schon fühlen können, bevor sie umgesetzt wurde. Deshalb endet mein Einsatz nicht mit einer Präsentation.',
      'Für den Pitch zum 0711 eChampions Cup entwickelten wir nicht nur das strategische und operative Konzept. Wir produzierten einen eigenen Film direkt im Umfeld des VfB Stuttgart. Ich stand selbst vor der Kamera und erzählte die Geschichte des geplanten Formats, um Kunden und mögliche Partner für die Idee zu gewinnen.',
      'Dieser Aufwand ist für einen Pitch nicht zwingend erforderlich. Für mich beschreibt er trotzdem sehr gut, wie ich arbeite. Wenn ich an eine Idee glaube, ist mir kein Weg zu weit. Dann telefoniere ich, bringe Menschen zusammen, suche nach Partnern, fahre zur Location, stehe selbst vor der Kamera und investiere die zusätzliche Zeit, die es braucht, um aus einer Vorstellung etwas Greifbares zu machen.'
    ]
  },
  {
    heading: 'Vertrauen braucht Verantwortung',
    paras: [
      'Ende 2025 glaubten wir, vor dem nächsten großen Meilenstein unserer Unternehmensentwicklung zu stehen.',
      'Für den Auftritt der Phygital Sports League Deutschland auf der ISPO München wurden wir mit einem Projekt im Umfang von rund 60.000 Euro beauftragt. Gemeinsam mit unseren technischen Partnern und weiteren spezialisierten Dienstleistern realisierten wir innerhalb kurzer Zeit ein umfangreiches Sport-eSport-Hybrid-Event.',
      'Dazu gehörten unter anderem ein ASB GlassFloor, digitale Werbebanden, unser eSport-Setup, eine Lichtshow, eine abgehängte LED-Wand, Bühnen- und Paneltechnik sowie die Regie- und Ablaufplanung. Es war ambitioniert, technisch anspruchsvoll und genau an der Schnittstelle aus Sport, Gaming, Event und Entertainment angesiedelt, an der wir uns über Jahre immer stärker positioniert hatten.',
      'Weil die beauftragende Gesellschaft erst kurz zuvor gegründet worden war, hinterfragte ich im Vorfeld, ob die Finanzierung eines Projekts dieser Größenordnung gesichert war. Nach den Gesprächen entschied ich mich, dem Vorhaben und den beteiligten Personen zu vertrauen.',
      'Wir gingen in Vorleistung, beauftragten Partner und trugen einen erheblichen Teil der externen Kosten. Das Event auf der ISPO wurde umgesetzt. Die erwartete weitere Finanzierung der Liga kam anschließend jedoch nicht zustande.',
      'Von unserer Rechnung über rund 62.000 Euro wurde lediglich ein Teilbetrag bezahlt. Eine offene Forderung von 50.000 Euro blieb bestehen. Am 13. Februar 2026 wurde der Insolvenzantrag gestellt, am 30. April 2026 das Insolvenzverfahren eröffnet.',
      'Für ein Unternehmen unserer Größe hätte ein Ausfall in dieser Höhe das Ende bedeuten können. Dass er uns nicht ausgenockt hat, verdanken wir auch den Menschen und Unternehmen in unserem Netzwerk. Partner blieben mit uns im Austausch, suchten gemeinsam nach Lösungen und gaben uns den notwendigen Rückhalt. Dafür bin ich bis heute dankbar.',
      'Trotzdem war dieses Projekt eines der schmerzhaftesten Learnings meiner bisherigen Unternehmergeschichte. Ich habe gelernt, dass Vertrauen eine wichtige Grundlage guter Zusammenarbeit bleibt, aber keine kaufmännische Absicherung ersetzt. Heute prüfen wir Finanzierungen genauer, arbeiten bei größeren Projekten mit Anzahlungen und klaren Meilensteinen und begrenzen bewusst die Risiken, die wir für andere Unternehmen übernehmen.',
      'Diese Erfahrung hat mich nicht dazu gebracht, kleiner zu denken. Sie hat uns aber dabei geholfen, erwachsener zu handeln.'
    ]
  },
  {
    heading: 'Dann kamen die XP Days',
    paras: [
      '2026 brachte jedoch nicht nur einen der größten Rückschläge unserer Geschichte. Das Jahr brachte auch mein bisheriges persönliches Highlight als Gründer: die XP Days in Stuttgart.',
      'Die Idee dafür entstand aus einer Beobachtung, die wir bei vielen klassischen Berufs- und Ausbildungsmessen gemacht hatten. Junge Menschen wurden von Stand zu Stand geschickt, sammelten Stempel und Broschüren, ohne wirklich zu wissen, mit welchen Unternehmen sie gerade gesprochen hatten. Für eine Generation, deren Alltag von Interaktion, digitalen Medien und Gaming geprägt ist, fühlte sich das oft nicht mehr zeitgemäß an.',
      'Wir wollten zeigen, dass Recruiting auch anders funktionieren kann.',
      'Am 27. und 28. März 2026 setzten wir in der Carl-Benz-Arena in Stuttgart die XP Days um – mit dem Anspruch, Deutschlands erste konsequent gamifizierte Karrieremesse zu schaffen.',
      'Unternehmen und Institutionen wie Porsche, TRUMPF, Vector Informatik, DEKRA, die DVAG und der VfB Stuttgart trafen auf Schüler, Studierende, Berufseinsteiger und Young Professionals aus einer jungen, gaming-affinen Zielgruppe.',
      'Die Besucher gingen dabei nicht einfach von Messestand zu Messestand. Über unser digitales XP-Modul konnten sie Unternehmen kennenlernen, Quizfragen beantworten, Challenges absolvieren und für ihre Aktivitäten Erfahrungspunkte sammeln.',
      'Gaming- und eSport-Formate, Bühneninhalte und interaktive Unternehmensaktivierungen sorgten dafür, dass aus einem klassischen Messebesuch eine gemeinsame Erfahrung wurde. Gleichzeitig entstanden messbare und DSGVO-konforme Kontakte zwischen Unternehmen und potenziellen Bewerbern.',
      'Die XP Days brachten vieles zusammen, woran wir in den Jahren zuvor gearbeitet hatten: eigene Technologie, Gamification, Gaming, eSport, Recruiting, Content, Bühnenprogramm, Eventproduktion und die Zusammenarbeit mit starken Partnern.',
      'Für mich waren die XP Days deshalb mehr als ein weiteres Projekt. Sie waren der Beweis, dass sich aus unseren vielen einzelnen Erfahrungen etwas Eigenes entwickeln konnte. Aus einer Idee wurde eine App. Aus der App entstand eine Agentur. Und aus den Erfahrungen dieser Agentur entstand schließlich ein eigenes Veranstaltungsformat.'
    ]
  },
  {
    heading: 'Nach fünf Jahren wurde der Name zu klein',
    paras: [
      'Im September 2026 feiern wir fünf Jahre eSport Manufaktur.',
      'Fünf Jahre voller Ideen, Projekte, Zufälle, Veränderungen, Fehler und Learnings. Fünf Jahre, in denen aus einer Anwendung für Casual-Gaming-Turniere ein Unternehmen für Gamification, Events, digitale Lösungen, Markenaktivierung und Engagement geworden ist.',
      'Der Name eSport Manufaktur beschreibt deshalb inzwischen vor allem, wo wir herkommen. Er beschreibt nicht mehr vollständig, wer wir heute sind und was wir gemeinsam mit unseren Kunden umsetzen können.',
      'Zum fünften Geburtstag leveln wir uns deshalb selbst auf.',
      'Neuer Name. Neuer Auftritt. Klarere Positionierung.',
      'Aus der eSport Manufaktur wird die GG Manufaktur.',
      'GG steht für „Good Game“ – einen Begriff, der für mich weit über das Ende eines Matches hinausgeht. Er steht für Gaming, Gamification, Games und die Kultur, die Menschen rund um das gemeinsame Spielen verbindet.',
      'Gleichzeitig steht GG für unseren Anspruch an jedes Projekt: eine gute Idee, eine gute Zusammenarbeit und ein Ergebnis, das für alle Beteiligten funktioniert.',
      'Gaming und eSport bleiben Teil unserer DNA. Aber sie sind nicht länger die Grenze unseres Denkens. Heute entwickeln wir die Lösung, die zum Ziel, zur Zielgruppe und zur Aufgabe passt – unabhängig davon, ob am Ende eine Plattform, ein Turnier, ein Event, ein Quiz, ein Escape Game oder ein vollständig neues Format entsteht.'
    ]
  },
  {
    heading: 'Was bleibt',
    paras: [
      'Wenn ich heute auf die vergangenen Jahre zurückblicke, sehe ich keine makellose Erfolgsgeschichte. Ich sehe eine Idee, die lange in einer Schublade lag. Zufälle, die Türen geöffnet haben. Menschen, die mich begleitet haben. Menschen, von denen ich mich trennen musste. Entscheidungen, die ich heute anders treffen würde. Projekte, die uns wachsen ließen. Und Rückschläge, die uns beinahe aus der Bahn geworfen hätten.',
      'Vor allem sehe ich aber ein Unternehmen, das immer wieder weitergemacht hat.',
      'Die eSport Manufaktur war der Anfang. Die GG Manufaktur ist der nächste Schritt.',
      'Was dabei geblieben ist, ist der Satz, der unsere Geschichte wahrscheinlich besser zusammenfasst als jeder Unternehmensname:',
      'Wir wollen Menschen begeistern.',
      'Mit Gamification, Events und Markenaktivierungen, die in Erinnerung bleiben.',
      'Live. Digital. Messbar. Immer authentisch.',
      'Ich bin gespannt, was ich in den kommenden Jahren an dieser Stelle noch zu erzählen haben werde.',
      'Das ist meine Story.'
    ]
  },
];
