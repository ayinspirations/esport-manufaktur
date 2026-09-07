// ---------------------------------------------------------------------------
// Titel und Beschreibung je Best-Case-Seite
// ---------------------------------------------------------------------------
// Die elf Case-Seiten hatten bis eben gar keine eigenen Kopfdaten: jede trug
// den Titel und die Beschreibung der Startseite. Fuer eine Suchmaschine waren
// das elf Seiten mit demselben Namen -- und in einer Trefferliste elfmal
// dieselbe Zeile.
//
// Die Beschreibungen sind bewusst kurz und nennen die Sache, nicht das
// Adjektiv: was gebaut wurde, fuer wen, mit welchem Ergebnis.
// ---------------------------------------------------------------------------

export interface CaseMeta {
  title: string;
  description: string;
  image: string;
}

export const CASE_META: Record<string, CaseMeta> = {
  tsystems: {
    title: 'T-Systems: Gaming-Aktivierung für Employer Branding | GG Manufaktur',
    description:
      'Deutschlandweite Turnierserie, White-Label-Plattform und Hochschulfinale: Wie T-Systems mit Gaming junge Tech-Talente als Arbeitgeber erreicht.',
    image: '/images/t-systems/hero.jpg'
  },
  hagebau: {
    title: 'hagebau Bolay: Recruiting-Game & Gaming Days | GG Manufaktur',
    description:
      'Recruiting-Game, Messeaktivierung und eigene Gaming Days im Markt: ein mehrjähriger Kreislauf, der bei Ausbildungsmessen beginnt und zur Bewerbung führt.',
    image: '/images/hagebau/gallery-1.jpg'
  },
  'showdown-0711': {
    title: '0711 Showdown: Gamifiziertes Recruiting-Event | GG Manufaktur',
    description:
      'Fünf Arbeitgeber, 64 ausgewählte Jugendliche und ein EA SPORTS FC-Turnier in der CLUTCH23 eArena — der Proof of Concept für gamifiziertes Recruiting.',
    image: '/videos/case-showdown.jpg'
  },
  'bayern-zockt': {
    title: 'Bayern zockt: Digitale EM zur UEFA EURO 2024 | GG Manufaktur',
    description:
      'Eine bayernweite Online-EM im Originalmodus mit White-Label-Plattform, Claim und Key Visual — Finale im Stadion des 1. FC Augsburg.',
    image: '/images/bayern-zockt/hero.jpg'
  },
  bfv: {
    title: 'BFV eFootball: Verbandsplattform für den digitalen Fußball | GG Manufaktur',
    description:
      'Seit unserer Gründung: Plattform, Wettbewerbe, Content und Events für den Bayerischen Fußball-Verband — eine Multi-Tenant-Struktur für Vereine und Partner.',
    image: '/images/bfv/hero.jpg'
  },
  intersport: {
    title: 'INTERSPORT Clubhouse: Pop-up-Gaming in Berlin | GG Manufaktur',
    description:
      'Sechs Wochen Gaming-Wall im Pop-up-Store, eigene Turnierplattform und ein EA SPORTS FC 26-Turnier mit acht Konsolen und Main Stage.',
    image: '/images/intersport/hero.jpg'
  },
  rewe: {
    title: 'REWE × 1. FC Köln: eSport-Sponsoring aktivieren | GG Manufaktur',
    description:
      'Scouting für die Virtual Bundesliga, Community-Turniere und Recruiting für die REWE Group — aus einem Sponsoring wird eine Aktivierungsplattform.',
    image: '/images/rewe/hero.jpg'
  },
  'xp-days': {
    title: 'XP Days: Gamifizierte Karrieremesse | GG Manufaktur',
    description:
      'Unser eigenes Messeformat: digitale Plattform mit XP-System, Videocontent aus den Partnerunternehmen und eine Gaming-Erlebniswelt in der Carl Benz Arena.',
    image: '/images/xp-days/hero.jpg'
  },
  dekra: {
    title: 'DEKRA Motorsport: Digitaler Event-Pass bei der DTM | GG Manufaktur',
    description:
      'Vom Stempelpass zur messbaren Customer Journey: Wallet-Pass, QR-Tracking und Live-Fortschritt an sechs DTM-Standorten.',
    image: '/images/dekra/hero.jpg'
  },
  interwetten: {
    title: 'Interwetten: Virtual Tennis beim BOSS OPEN | GG Manufaktur',
    description:
      'Gebrandeter Tennis-Court im Pagodenzelt, VR-Aktivierung, Registrierungstool und Live-Ranking — Standdesign und Lead-Generierung aus einer Hand.',
    image: '/images/interwetten/hero.jpg'
  },
  consumenta: {
    title: 'NIVEA MEN, EFFECT & CRACKZ auf der Consumenta | GG Manufaktur',
    description:
      'Drei Marken, drei Mechaniken, eine Messefläche: Sponsorship Activation, Product Sampling, Highscore-Challenge und Twitch-Livestream.',
    image: '/images/consumenta/hero.jpg'
  }
};

/** Die Seiten-Ids der Best Cases -- Reihenfolge wie im Mosaik. */
export const CASE_SLUGS = Object.keys(CASE_META);
