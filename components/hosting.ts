// ---------------------------------------------------------------------------
// Wer diese Website ausliefert
// ---------------------------------------------------------------------------
// Steht hier, weil es in der Datenschutzerklärung steht -- und dort darf nur
// stehen, was tatsächlich passiert. Die Masterfassung ist an dem Punkt
// eindeutig: Infrastruktur wird nur genannt, wenn sie wirklich Daten von
// Websitebesuchern verarbeitet.
//
// Eine Zeile schaltet um: 'netlify' <-> 'vercel'. Datenschutzerklärung,
// Empfängerliste und der Abschnitt zu Drittlandübermittlungen ziehen von
// selbst mit, weil sie ihre Angaben aus HOST beziehen und nicht selbst
// eingetippt haben.
// ---------------------------------------------------------------------------

export type HostingProvider = 'vercel' | 'netlify';

export const HOSTING_PROVIDER: HostingProvider = 'netlify';

export interface HostingDetails {
  /** Wie der Dienst im Fließtext heißt. */
  name: string;
  /** Firmierung und ladungsfähige Anschrift, wie sie ins Impressum-Umfeld gehört. */
  legalEntity: string;
  /** Was über die Infrastruktur zutrifft -- nicht, was man sich wünscht. */
  infrastructure: string;
  /** Wo die Datenschutzhinweise des Dienstes stehen. */
  privacyUrl: string;
}

// -----------------------------------------------------------------------
// ACHTUNG, vor dem Livegang prüfen: die Anschrift von Netlify stammt aus
// deren Terms of Service und ist aus dieser Umgebung nicht abrufbar
// gewesen. Vor der Veröffentlichung einmal gegen das aktuelle Netlify-DPA
// beziehungsweise deren Terms abgleichen -- eine falsche Anschrift in
// einer Datenschutzerklärung ist ein Mangel, kein Schönheitsfehler.
//
// Ebenso die Aussage zur Infrastruktur: Netlify liefert im Standardtarif
// über ein weltweites CDN aus. Erst mit gebuchter EU Data Residency wäre
// "Auslieferung aus Rechenzentren in der EU" richtig. Bis das gebucht ist,
// steht hier die Wahrheit und nicht der Wunsch.
// -----------------------------------------------------------------------
export const HOSTS: Record<HostingProvider, HostingDetails> = {
  netlify: {
    name: 'Netlify',
    legalEntity: 'Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA',
    infrastructure:
      'Netlify betreibt ein weltweites Content-Delivery-Netzwerk; eine Verarbeitung außerhalb der Europäischen Union kann daher stattfinden.',
    privacyUrl: 'netlify.com/privacy'
  },
  vercel: {
    name: 'Vercel',
    legalEntity: 'Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA',
    infrastructure:
      'Vercel betreibt eine globale Infrastruktur; eine Verarbeitung außerhalb der Europäischen Union kann daher stattfinden.',
    privacyUrl: 'vercel.com/legal/privacy-notice und vercel.com/legal/dpa'
  }
};

export const HOST: HostingDetails = HOSTS[HOSTING_PROVIDER];
