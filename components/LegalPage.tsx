
import React from 'react';
import { motion } from 'framer-motion';
import { PageHero } from './PageHero';
import { HOSTING_PROVIDER } from './hosting';

interface LegalPageProps {
  type: 'impressum' | 'privacy';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  // Welcher Hoster im Text steht, entscheidet nicht die Absicht, sondern der
  // Betrieb -- siehe components/hosting.ts.
  const onNetlify = HOSTING_PROVIDER === 'netlify';
  const content = {
    impressum: {
      title: "Impressum.",
      subtitle: "Gesetzliche Anbieterkennung & Rechtliche Hinweise",
      body: (
        <div className="space-y-12">
          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-6">Angaben gemäß § 5 TMG</h3>
            <p className="text-2xl font-bold text-slate-900 leading-tight">
              eSport Manufaktur GmbH<br />
              im Außenauftritt: GG Manufaktur<br />
              Gartenstraße 16/1<br />
              71229 Leonberg<br />
              Deutschland
            </p>
            <p className="mt-4 text-slate-600 font-medium leading-relaxed">
              Die Umfirmierung in GG Manufaktur GmbH ist in Vorbereitung. Bis zu ihrer Eintragung im Handelsregister
              ist die eSport Manufaktur GmbH der Rechtsträger; durch die Umfirmierung ändert sich lediglich die Firma
              der Gesellschaft, nicht ihre Identität.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-6">Vertreten durch</h3>
            <p className="text-xl font-bold text-slate-900">Geschäftsführer: Gianluca Crepaldi</p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-6">Kontakt</h3>
            <p className="text-xl font-bold text-slate-900">
              Telefon: +49 151 44360133<br />
              E-Mail: info@esport-manufaktur.com<br />
              Internet: https://esport-manufaktur.com
            </p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-6">Register & Steuern</h3>
            <div className="space-y-4">
              <p className="text-slate-600 font-medium leading-relaxed">
                <span className="font-black text-slate-900">Handelsregister:</span><br />
                Amtsgericht Stuttgart – HRB 781154
              </p>
              <p className="text-slate-600 font-medium leading-relaxed">
                <span className="font-black text-slate-900">Umsatzsteuer-ID:</span><br />
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE346227352
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-6">Streitbeilegung</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Die Europäische Kommission hat ihre Plattform zur Online-Streitbeilegung (OS) zum 20. Juli 2025
              eingestellt. Ein Verweis darauf entfällt damit.
            </p>
            <p className="mt-4 text-slate-500 italic">Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-6">Verantwortlich nach § 18 Abs. 2 MStV</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              eSport Manufaktur GmbH<br />
              Gianluca Crepaldi<br />
              Gartenstraße 16/1<br />
              71229 Leonberg
            </p>
          </section>

          <section className="p-8 bg-slate-50 rounded-surface border border-black/[0.03]">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0b0f2a]/50 mb-4">Angaben nach § 2 DL-InfoV</h3>
            <ul className="list-disc pl-5 space-y-2 text-xs font-bold text-slate-500 uppercase tracking-wider leading-relaxed">
              <li>Unsere Dienstleistungen richten sich an Unternehmen, Verbände und Institutionen.</li>
              <li>Vertrags- und Kommunikationssprache ist Deutsch.</li>
              <li>Es gilt das Recht der Bundesrepublik Deutschland.</li>
              <li>Gerichtsstand für Kaufleute, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen ist – nach unserer Wahl – Leonberg oder der Sitz des Kunden.</li>
            </ul>
          </section>

          <div className="pt-12 border-t border-slate-200 space-y-10 text-slate-600 font-medium leading-relaxed text-sm">
            <section>
              <h4 className="font-black text-slate-900 mb-2">1. Inhalte auf dieser Website</h4>
              <p>Wir erstellen die Inhalte dieser Website mit größtmöglicher Sorgfalt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.</p>
              <p className="mt-2">Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten verantwortlich. Nach §§ 8–10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.</p>
            </section>
            
            <section>
              <h4 className="font-black text-slate-900 mb-2">2. Links zu externen Websites</h4>
              <p>Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist ausschließlich der jeweilige Anbieter verantwortlich.</p>
            </section>

            <section>
              <h4 className="font-black text-slate-900 mb-2">3. Urheberrecht</h4>
              <p>Die durch uns erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Rechteinhabers.</p>
            </section>

            <section>
              <h4 className="font-black text-slate-900 mb-2">4. Salvatorische Klausel</h4>
              <p>Sollten einzelne Bestimmungen dieser rechtlichen Hinweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
            </section>
          </div>
        </div>
      )
    },
    privacy: {
      title: "Datenschutz.",
      subtitle: "Datenschutzerklärung für diese Website",
      body: (
        <div className="space-y-10 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
          <section className="border-b border-slate-100 pb-8">
            <p className="text-lg font-bold text-slate-900 mb-3">
              Diese Erklärung beschreibt, was beim Besuch dieser Website mit personenbezogenen Daten geschieht.
            </p>
            <p>
              Sie ist die auf diese Domain zugeschnittene Fassung unserer Master-Datenschutzerklärung: beschrieben
              wird ausschließlich, was hier tatsächlich stattfindet. Für unsere Turnier-, Event- und
              White-Label-Plattformen gelten eigene, dort bereitgestellte Datenschutzhinweise.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">1. Verantwortlicher</h3>
            <p className="text-lg font-bold text-slate-900">
              eSport Manufaktur GmbH<br />
              im Außenauftritt: GG Manufaktur<br />
              Gartenstraße 16/1<br />
              71229 Leonberg<br />
              Deutschland
            </p>
            <p className="mt-3">E-Mail: info@esport-manufaktur.com</p>
            <p className="mt-3">
              Die Umfirmierung in GG Manufaktur GmbH ist in Vorbereitung. Bis zur Eintragung im Handelsregister ist
              die eSport Manufaktur GmbH die rechtlich verantwortliche Gesellschaft. Durch die Umfirmierung ändert
              sich lediglich die Firma; die Identität des Rechtsträgers bleibt bestehen.
            </p>
            <p className="mt-3">
              Einen Datenschutzbeauftragten haben wir nicht bestellt; dazu sind wir gesetzlich nicht verpflichtet.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">2. Hosting und technische Bereitstellung</h3>
            {onNetlify ? (
              <p>
                Diese Website wird bei <span className="font-bold">Netlify (Netlify, Inc., San Francisco,
                Kalifornien, USA)</span> gehostet und über dessen Content-Delivery-Netzwerk ausgeliefert. Die
                Auslieferung erfolgt aus Rechenzentren in der Europäischen Union.
              </p>
            ) : (
              <p>
                Diese Website wird bei <span className="font-bold">Vercel (Vercel Inc., 440 N Barranca Avenue #4133,
                Covina, CA 91723, USA)</span> gehostet und über dessen Content-Delivery-Netzwerk ausgeliefert. Vercel
                betreibt eine globale Infrastruktur; eine Verarbeitung außerhalb der Europäischen Union kann daher
                stattfinden.
              </p>
            )}
            <p className="mt-3">Beim Aufruf werden technisch erforderliche Zugriffsdaten verarbeitet. Dazu gehören insbesondere:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>IP-Adresse,</li>
              <li>Datum und Uhrzeit des Zugriffs,</li>
              <li>aufgerufene Seite oder Datei,</li>
              <li>Referrer-URL,</li>
              <li>Browsertyp und -version,</li>
              <li>Betriebssystem sowie Geräte- und Verbindungsinformationen,</li>
              <li>übertragene Datenmenge und HTTP-Statuscode,</li>
              <li>technische Fehler- und Sicherheitsinformationen.</li>
            </ul>
            <p className="mt-3">
              Die Verarbeitung dient der Bereitstellung des Angebots, der Systemsicherheit und Stabilität, der
              Fehleranalyse sowie der Abwehr missbräuchlicher Zugriffe. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
              DSGVO; unser berechtigtes Interesse besteht in einem sicheren und funktionsfähigen Betrieb.
            </p>
            <p className="mt-3">
              Server- und Zugriffsprotokolle werden nur so lange gespeichert, wie dies für Betrieb, Fehleranalyse und
              Sicherheit erforderlich ist. Mit {onNetlify ? 'Netlify' : 'Vercel'} besteht ein Vertrag zur
              Auftragsverarbeitung nach Art. 28 DSGVO beziehungsweise ist das jeweils verfügbare Data Processing
              Addendum einbezogen. Da das Unternehmen seinen Sitz in den USA hat, lässt sich ein Zugriff aus einem
              Drittland nicht vollständig ausschließen; die Übermittlung wird auf das EU-US Data Privacy Framework
              und, soweit erforderlich, auf die Standardvertragsklauseln der Europäischen Kommission gestützt.
            </p>
            {!onNetlify && (
              <p className="mt-3">
                Optionale Vercel-Produkte wie Web Analytics oder Speed Insights sind auf dieser Website nicht
                aktiviert. Die Auslieferung wird auf Netlify umgestellt; dieser Abschnitt wird mit der Umstellung
                angepasst.
              </p>
            )}
            <p className="mt-3">
              Die Domain und ihre DNS-Verwaltung liegen bei der{' '}
              <span className="font-bold">Hetzner Online GmbH, Industriestraße 25, 91710 Gunzenhausen,
              Deutschland</span> – dort wird der Aufruf angenommen und an den oben genannten Hoster weitergeleitet. Bei Hetzner laufen
              außerdem unsere eigenen Plattform-, Datenbank- und Backup-Systeme, in Rechenzentren in Deutschland.
              Diese Website selbst führt keine Datenbank. Mit Hetzner besteht ein Vertrag zur Auftragsverarbeitung
              gemäß Art. 28 DSGVO.
            </p>
            <p className="mt-2 text-slate-500">
              Weitere Informationen: hetzner.com/legal/privacy-policy sowie{' '}
              {onNetlify ? 'netlify.com/privacy' : 'vercel.com/legal/privacy-notice und vercel.com/legal/dpa'}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">3. Kontaktaufnahme und B2B-Anfragen</h3>
            <p>
              Wenn du uns über das Anfrageformular, per E-Mail oder telefonisch kontaktierst, verarbeiten wir die von
              dir mitgeteilten Daten zur Bearbeitung deiner Anfrage. Dazu können Vor- und Nachname, geschäftliche
              E-Mail-Adresse, Telefonnummer, Unternehmen, Position, Interessengebiet, Inhalt der Anfrage sowie
              Zeitpunkt und Verlauf der Kommunikation gehören.
            </p>
            <p className="mt-3">
              Bezieht sich die Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen, ist Rechtsgrundlage Art. 6
              Abs. 1 lit. b DSGVO. Kontaktierst du uns als Ansprechpartner eines Unternehmens, erfolgt die
              Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse besteht in der
              Bearbeitung geschäftlicher Anfragen und der Anbahnung von Geschäftsbeziehungen.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">4. HubSpot: Formulare, Terminbuchung und CRM</h3>
            <p>
              Das Anfrageformular und die Terminbuchung für ein Erstgespräch werden über HubSpot bereitgestellt.
              Vertragspartner ist die HubSpot Germany GmbH; die technische Plattform wird durch Unternehmen der
              HubSpot-Gruppe bereitgestellt, insbesondere die HubSpot, Inc. (USA) und die HubSpot Ireland Limited.
            </p>
            <p className="mt-3 font-bold text-slate-900">
              Beim bloßen Aufruf dieser Website wird nichts an HubSpot übermittelt. Weder das Formular noch die
              Terminbuchung ist in eine Seite eingebettet, und es läuft kein HubSpot-Tracking-Code im Hintergrund.
            </p>
            <p className="mt-3">
              Erst wenn du „Kontakt aufnehmen“ oder „Termin vereinbaren“ anklickst, wird das jeweilige Fenster
              geöffnet und der dafür nötige HubSpot-Code nachgeladen. Die Verarbeitung beginnt also mit einer
              Handlung, mit der du die Funktion ausdrücklich anforderst; schließt du das Fenster, ohne etwas
              abzuschicken, wird auch nichts übermittelt.
            </p>
            <p className="mt-3">
              Beim Laden dieser Elemente können insbesondere IP-Adresse, Online-Kennungen, aufgerufene Seiten,
              Formularinteraktionen, Geräte- und Browserinformationen, Referrer-URL, Interaktionszeitpunkte sowie die
              übermittelten Kontaktangaben verarbeitet werden. Bei der Terminbuchung kommen der gewählte Termin und
              die dafür angegebenen Kontaktdaten hinzu.
            </p>
            <p className="mt-3">
              In HubSpot als CRM werden Kontakt- und Unternehmensdaten, Kommunikationsverläufe, angefragte
              Leistungen, Termine sowie Einwilligungs- und Widerrufsinformationen gespeichert. Rechtsgrundlage ist je
              nach Anlass Art. 6 Abs. 1 lit. b oder lit. f DSGVO. Mit HubSpot besteht ein Vertrag zur
              Auftragsverarbeitung gemäß Art. 28 DSGVO.
            </p>
            <p className="mt-3">
              Soweit unser HubSpot-Konto in der Europäischen Union gehostet wird, erfolgt die primäre Speicherung in
              Deutschland. Eine begrenzte Verarbeitung außerhalb der EU kann dennoch stattfinden; HubSpot stützt
              erforderliche Übermittlungen in die USA auf das EU-US Data Privacy Framework und ergänzend auf die
              Standardvertragsklauseln.
            </p>
            <p className="mt-3">
              HubSpot wird für B2B-Kontakt- und CRM-Prozesse verwendet. Teilnehmer-, Turnier- und Gaming-Daten werden
              nicht an HubSpot übermittelt.
            </p>
            <p className="mt-2 text-slate-500">
              Weitere Informationen: legal.hubspot.com/privacy-policy, legal.hubspot.com/dpa und
              legal.hubspot.com/sub-processors-page
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">5. Cookies und Einwilligungen</h3>
            <p>
              Technisch erforderliche Cookies und Speicherzugriffe setzen wir ein, soweit sie für Bereitstellung,
              Sicherheit und Sitzungsverwaltung unbedingt erforderlich sind. Rechtsgrundlage für die Speicherung oder
              den Zugriff auf Informationen im Endgerät ist § 25 Abs. 2 Nr. 2 TDDDG; die anschließende Verarbeitung
              richtet sich nach Art. 6 Abs. 1 lit. b oder lit. f DSGVO.
            </p>
            <p className="mt-3">
              Nicht notwendige Analyse-, Marketing- und Tracking-Technologien werden erst nach ausdrücklicher
              Einwilligung aktiviert. Rechtsgrundlagen sind § 25 Abs. 1 TDDDG und Art. 6 Abs. 1 lit. a DSGVO. Deine
              Auswahl triffst du im Einwilligungsbanner dieser Website und kannst sie dort jederzeit mit Wirkung für
              die Zukunft ändern.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">6. Schriftarten</h3>
            <p>
              Die auf dieser Website verwendete Schriftart Inter wird von unserem eigenen Server ausgeliefert. Zum
              Laden der Schrift wird keine Verbindung zu Google oder einem anderen Font-Anbieter hergestellt, und es
              werden dabei keine Daten an Dritte übermittelt.
            </p>
            <p className="mt-3">
              Die Auslieferung der Schriftdatei ist Teil der Bereitstellung dieser Website und damit technisch
              erforderlich; sie erfolgt über dieselbe Verbindung wie die übrigen Inhalte (siehe Abschnitt 2).
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">7. Empfänger personenbezogener Daten</h3>
            <p>Personenbezogene Daten erhalten nur Stellen, die sie für den jeweiligen Zweck benötigen. Auf dieser Website sind das:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Hetzner für Domain, DNS und unsere übrigen Systeme,</li>
              <li>{onNetlify ? 'Netlify' : 'Vercel'} als Hosting- und CDN-Dienstleister,</li>
              <li>HubSpot für Formulare, Terminbuchung und CRM,</li>
              <li>IT-, Entwicklungs- und Supportdienstleister,</li>
              <li>Rechts-, Steuer- und sonstige Berater sowie</li>
              <li>Behörden und Gerichte, soweit eine gesetzliche Verpflichtung besteht.</li>
            </ul>
            <p className="mt-3">
              Dienstleister, die Daten in unserem Auftrag verarbeiten, werden auf Grundlage eines Vertrags zur
              Auftragsverarbeitung gemäß Art. 28 DSGVO eingesetzt und erhalten nur die für ihre Tätigkeit
              erforderlichen Daten. Eine Weitergabe zu eigenen Werbezwecken Dritter erfolgt nicht.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">8. Übermittlungen in Drittländer</h3>
            <p>
              Bei {onNetlify ? 'Netlify' : 'Vercel'} und HubSpot kann eine Verarbeitung außerhalb der Europäischen Union oder des
              Europäischen Wirtschaftsraums erfolgen. Eine Übermittlung erfolgt nur, wenn die Voraussetzungen der
              Art. 44 ff. DSGVO erfüllt sind – insbesondere über einen Angemessenheitsbeschluss, eine gültige
              Zertifizierung nach dem EU-US Data Privacy Framework, die Standardvertragsklauseln der Europäischen
              Kommission und erforderlichenfalls ergänzende Schutzmaßnahmen.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">9. Speicherdauer und Löschung</h3>
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Zweck erforderlich ist
              oder eine gesetzliche Aufbewahrungspflicht besteht. Für diese Website gilt insbesondere:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Server- und Sicherheitsprotokolle werden nach Ablauf der festgelegten Sicherheitsfrist gelöscht, sofern kein sicherheitsrelevanter Vorfall vorliegt.</li>
              <li>B2B-Kontaktdaten werden regelmäßig überprüft und gelöscht, wenn keine Geschäftsbeziehung, laufende Vertragsanbahnung oder andere Rechtsgrundlage mehr besteht.</li>
              <li>Vertrags-, Abrechnungs- und Buchhaltungsunterlagen werden entsprechend den gesetzlichen Aufbewahrungsfristen gespeichert.</li>
              <li>Einwilligungsnachweise werden bis zum Ablauf der maßgeblichen Nachweis- und Verjährungsfristen gespeichert.</li>
            </ul>
            <p className="mt-3">
              Nach Löschung aus den Produktivsystemen können Daten bis zur turnusmäßigen Überschreibung noch in
              verschlüsselten Backups enthalten sein. Sie werden dort nicht mehr produktiv verwendet.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">10. Datensicherheit</h3>
            <p>
              Wir treffen unter Berücksichtigung des Stands der Technik angemessene technische und organisatorische
              Maßnahmen zum Schutz personenbezogener Daten. Dazu gehören insbesondere die verschlüsselte
              Datenübertragung über HTTPS/TLS, rollen- und berechtigungsbasierte Zugriffskonzepte, die Protokollierung
              sicherheitsrelevanter Vorgänge, regelmäßige Datensicherungen, die Trennung von Produktiv-, Entwicklungs-
              und Testumgebungen, regelmäßige Aktualisierung der Systeme sowie Vertraulichkeitsverpflichtungen für
              Mitarbeiter und Dienstleister.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">11. Pflicht zur Bereitstellung von Daten</h3>
            <p>
              Die Bereitstellung personenbezogener Daten ist freiwillig. Bestimmte Angaben sind jedoch erforderlich,
              damit wir eine Anfrage bearbeiten oder einen Termin vereinbaren können. Ohne die entsprechend
              gekennzeichneten Pflichtangaben ist die Nutzung der betreffenden Funktion gegebenenfalls nicht möglich.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">12. Rechte betroffener Personen</h3>
            <p>Du hast nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Recht auf Auskunft gemäß Art. 15 DSGVO,</li>
              <li>Recht auf Berichtigung gemäß Art. 16 DSGVO,</li>
              <li>Recht auf Löschung gemäß Art. 17 DSGVO,</li>
              <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO,</li>
              <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO,</li>
              <li>Recht auf Widerspruch gemäß Art. 21 DSGVO,</li>
              <li>Recht auf Widerruf einer Einwilligung gemäß Art. 7 Abs. 3 DSGVO sowie</li>
              <li>Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde gemäß Art. 77 DSGVO.</li>
            </ul>
            <p className="mt-3">Zur Ausübung deiner Rechte genügt eine Nachricht an info@esport-manufaktur.com.</p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">13. Widerruf und Widerspruch</h3>
            <p>
              Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Der Widerruf
              berührt nicht die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung. Cookie- und
              Tracking-Einwilligungen änderst du über die Cookie-Einstellungen dieser Website.
            </p>
            <div className="mt-6 p-6 bg-slate-950 text-white rounded-2xl border border-white/10 shadow-xl">
              <h4 className="font-black uppercase text-[10px] tracking-[0.2em] mb-3 text-[#0e958e]">Widerspruchsrecht</h4>
              <p className="text-sm leading-relaxed text-white/70">
                Soweit personenbezogene Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeitet werden, kannst
                du aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit Widerspruch gegen die
                Verarbeitung einlegen. Werden Daten für Direktwerbung verarbeitet, kannst du jederzeit ohne Angabe von
                Gründen widersprechen; danach werden die Daten nicht mehr für Direktwerbung verwendet.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">14. Beschwerderecht</h3>
            <p>Du kannst dich bei einer Datenschutzaufsichtsbehörde beschweren. Für uns zuständig ist:</p>
            <p className="mt-3 font-bold text-slate-900">
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
              Heilbronner Straße 35<br />
              70191 Stuttgart<br />
              Deutschland
            </p>
            <p className="mt-3">
              E-Mail: poststelle@lfdi.bwl.de · Website: www.baden-wuerttemberg.datenschutz.de
            </p>
            <p className="mt-3">
              Du kannst dich auch an jede andere nach Art. 77 DSGVO zuständige Aufsichtsbehörde wenden, insbesondere
              an die an deinem Aufenthaltsort.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">15. Automatisierte Entscheidungen</h3>
            <p>
              Eine ausschließlich automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO, die rechtliche
              Wirkung entfaltet oder dich in vergleichbarer Weise erheblich beeinträchtigt, findet nicht statt.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0a6f6a] mb-4">16. Aktualisierung dieser Datenschutzerklärung</h3>
            <p>
              Wir aktualisieren diese Datenschutzerklärung, wenn sich unsere Angebote, Datenverarbeitungen,
              Dienstleister oder die rechtlichen Anforderungen ändern. Nach Eintragung der Umfirmierung wird die
              Bezeichnung „eSport Manufaktur GmbH“ durch „GG Manufaktur GmbH“ ersetzt; der datenschutzrechtlich
              verantwortliche Rechtsträger wechselt dadurch nicht.
            </p>
            <p className="mt-3">
              Für einzelne Turniere, Events und White-Label-Plattformen werden ergänzende Datenschutzhinweise
              bereitgestellt.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-200">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Stand: September 2026</p>
          </section>
        </div>
      )
    }
  };

  const activeContent = content[type];

  return (
    <div className="w-full">
      {/* Same header as every other route -- the legal pages used to be the
          only ones opening on bare canvas with no hero ground at all. */}
      <PageHero
        eyebrow="Legal Information"
        title={activeContent.title}
        subline={activeContent.subtitle}
      />

      <div className="pt-16 md:pt-24 pb-24 md:pb-32 px-6 md:px-14">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass bg-white/60 rounded-shell p-10 md:p-20 shadow-2xl border border-white/40">
              {activeContent.body}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
