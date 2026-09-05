// ---------------------------------------------------------------------------
// Wer diese Website ausliefert
// ---------------------------------------------------------------------------
// Steht hier, weil es in der Datenschutzerklärung steht -- und dort darf nur
// stehen, was tatsächlich passiert. Die Masterfassung ist an dem Punkt
// eindeutig: Infrastruktur wird nur genannt, wenn sie wirklich Daten von
// Websitebesuchern verarbeitet. Ein Hoster, der noch nicht ausliefert, gehört
// nicht in den Text; einer, der es tut, muss drin sein.
//
// Der Umzug auf Netlify ist vorbereitet (siehe netlify.toml), ausgeliefert
// wird bis dahin von Vercel. Am Tag des Umzugs ist das hier eine Zeile:
// 'vercel' -> 'netlify'. Datenschutzerklärung, Empfängerliste und der
// Abschnitt zu Drittlandübermittlungen ziehen dann von selbst mit.
// ---------------------------------------------------------------------------

export type HostingProvider = 'vercel' | 'netlify';

export const HOSTING_PROVIDER: HostingProvider = 'vercel';
