
import React from 'react';
import { motion } from 'framer-motion';

interface LegalPageProps {
  type: 'impressum' | 'privacy';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = {
    impressum: {
      title: "Impressum.",
      subtitle: "Gesetzliche Anbieterkennung & Rechtliche Hinweise",
      body: (
        <div className="space-y-12">
          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Angaben gemäß § 5 TMG</h3>
            <p className="text-2xl font-bold text-slate-900 leading-tight">
              eSport Manufaktur GmbH<br />
              Gartenstraße 16/1<br />
              71229 Leonberg<br />
              Deutschland
            </p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Vertreten durch</h3>
            <p className="text-xl font-bold text-slate-900">Geschäftsführer: Gianluca Crepaldi</p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Kontakt</h3>
            <p className="text-xl font-bold text-slate-900">
              Telefon: +49 151 44360133<br />
              E-Mail: info@esport-manufaktur.com<br />
              Internet: https://esport-manufaktur.com
            </p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Register & Steuern</h3>
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
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Streitbeilegung</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">https://ec.europa.eu/consumers/odr/</a>
            </p>
            <p className="mt-4 text-slate-500 italic">Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Verantwortlich nach § 18 Abs. 2 MStV</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              eSport Manufaktur GmbH<br />
              Gianluca Crepaldi<br />
              Gartenstraße 16/1<br />
              71229 Leonberg
            </p>
          </section>

          <section className="p-8 bg-slate-50 rounded-surface border border-black/[0.03]">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Angaben nach § 2 DL-InfoV</h3>
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
      subtitle: "Datenschutzerklärung von esport-manufaktur.com",
      body: (
        <div className="space-y-12 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
          <section className="border-b border-slate-100 pb-10">
            <p className="text-lg font-bold text-slate-900 mb-4">Diese Website erhebt personenbezogene Daten von ihren Nutzern.</p>
            <p>Dieses Dokument kann zu Zwecken der Aufbewahrung über den Befehl „Drucken“ im Browser ausgedruckt werden.</p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Anbieter und Verantwortlicher</h3>
            <p className="text-lg font-bold text-slate-900">
              eSport Manufaktur GmbH<br />
              Gartenstraße 16/1<br />
              71229 Leonberg
            </p>
            <p className="mt-2 text-slate-500 font-bold italic">E-Mail-Adresse des Anbieters: info@esport-manufaktur.com</p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Arten der erhobenen Daten</h3>
            <p>Zu den personenbezogenen Daten, die diese Website selbstständig oder durch Dritte verarbeitet, gehören: Tracker; Nutzungsdaten; Anzahl der Nutzer; Sitzungsstatistiken; E-Mail; Nachname; Antworten auf Fragen; Benutzerinhalte; Telefonnummer.</p>
            <p className="mt-4 text-slate-500">
              Vollständige Details zu jeder Art von verarbeiteten personenbezogenen Daten werden in den dafür vorgesehenen Abschnitten dieser Datenschutzerklärung oder punktuell durch Erklärungstexte bereitgestellt, die vor der Datenerhebung angezeigt werden.
              Personenbezogene Daten können vom Nutzer freiwillig angegeben oder, im Falle von Nutzungsdaten, automatisch erhoben werden, wenn diese Website genutzt wird.
              Sofern nicht anders angegeben, ist die Angabe aller durch diese Website angeforderten Daten obligatorisch. Weigert sich der Nutzer, die Daten anzugeben, kann dies dazu führen, dass diese Website dem Nutzer ihre Dienste nicht zur Verfügung stellen kann. In Fällen, in denen diese Website die Angabe personenbezogener Daten ausdrücklich als freiwillig bezeichnet, dürfen sich die Nutzer dafür entscheiden, diese Daten ohne jegliche Folgen für die Verfügbarkeit oder die Funktionsfähigkeit des Dienstes nicht anzugeben.
              Nutzer, die sich darüber im Unklaren sind, welche personenbezogenen Daten obligatorisch sind, können sich an den Anbieter wenden.
              Jegliche Verwendung von Cookies – oder anderer Tracking-Tools – durch diese Website oder Anbieter von Drittdiensten, die durch diese Website eingesetzt werden, dient dem Zweck, den vom Nutzer gewünschten Dienst zu erbringen, und allen anderen Zwecken, die im vorliegenden Dokumentund in der Cookie-Richtlinie beschrieben sind.
            </p>
            <p className="mt-4 font-bold text-slate-900">Die Nutzer sind für alle personenbezogenen Daten Dritter verantwortlich, die durch diese Website beschafft, veröffentlicht oder weitergegeben werden.</p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Art und Ort der Datenverarbeitung</h3>
            
            <div>
              <h4 className="font-black text-slate-900 mb-2 uppercase text-xs">Verarbeitungsmethoden</h4>
              <p>Der Anbieter verarbeitet die personenbezogenen Daten der Nutzer auf ordnungsgemäße Weise und ergreift angemessene Sicherheitsmaßnahmen, um den unbefugten Zugriff und die unbefugte Weiterleitung, Veränderung oder Vernichtung von Daten zu vermeiden.</p>
              <p className="mt-2">Die Datenverarbeitung wird mittels Computern oder IT-basierten Systemen nach organisatorischen Verfahren und Verfahrensweisen durchgeführt, die gezielt auf die angegebenen Zwecke abstellen. Zusätzlich zum Verantwortlichen könnten auch andere Personen intern (Personalverwaltung, Vertrieb, Marketing, Rechtsabteilung, Systemadministratoren) oder extern – und in dem Fall soweit erforderlich, vom Verantwortlichen als Auftragsverarbeiter benannt (wie Anbieter technischer Dienstleistungen, Zustellunternehmen, Hosting-Anbieter, IT-Unternehmen oder Kommunikationsagenturen) - diese Website betreiben und damit Zugriff auf die Daten haben. Eine aktuelle Liste dieser Beteiligten kann jederzeit vom Anbieter verlangt werden.</p>
            </div>

            <div>
              <h4 className="font-black text-slate-900 mb-2 uppercase text-xs">Ort</h4>
              <p>Die Daten werden in der Niederlassung des Anbieters und an allen anderen Orten, an denen sich die an der Datenverarbeitung beteiligten Stellen befinden, verarbeitet.</p>
              <p className="mt-2">Je nach Standort der Nutzer können Datenübertragungen die Übertragung der Daten des Nutzers in ein anderes Land als das eigene beinhalten. Um mehr über den Ort der Verarbeitung der übermittelten Daten zu erfahren, können die Nutzer den Abschnitt mit den ausführlichen Angaben zur Verarbeitung der personenbezogenen Daten konsultieren.</p>
            </div>

            <div>
              <h4 className="font-black text-slate-900 mb-2 uppercase text-xs">Speicherdauer</h4>
              <p>Sofern in diesem Dokument nicht anderweitig festgelegt, werden personenbezogene Daten so lange verarbeitet und gespeichert, wie es der Zweck erfordert, zu dem sie erhoben wurden, und können ggf. aufgrund einer zu erfüllenden rechtlichen Verpflichtung oder basierend auf der Einwilligung des Nutzers auch länger aufbewahrt werden.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Zwecke der Verarbeitung</h3>
            <p>Personenbezogene Daten über den Nutzer werden erhoben, damit der Anbieter den Dienst erbringen und des Weiteren seinen gesetzlichen Verpflichtungen nachkommen, auf Durchsetzungsforderungen reagieren, seine Rechte und Interessen (oder die der Nutzer oder Dritter) schützen, böswillige oder betrügerische Aktivitäten aufdecken kann. Darüber hinaus werden Daten zu folgenden Zwecken erhoben: Analytik, Anzeigen von Inhalten externer Plattformen, Tag-Verwaltung, Kontaktieren des Nutzers, Zugriff auf Profile von Drittanbietern, Interaktion mit externen sozialen Netzwerken und Plattformen und Interaktion mit Live-Chat-Plattformen.</p>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Facebook-Genehmigungen</h3>
            <p>Diese Website kann bestimmte Facebook-Genehmigungen verlangen, um mit dem Facebook-Konto des Nutzers Aktionen auszuführen und Informationen einschließlich personenbezogener Daten daraus zu erhalten. Diese Website verbindet sich mittels dieses Dienstes mit dem Nutzerprofil auf dem sozialen Netzwerk Facebook, bereitgestellt von Facebook Inc.</p>
            <p className="mt-2">Folgende Genehmigungen werden verlangt: Allgemeine Angaben, E-Mail, Geräteinformationen, Nutzungsdaten und Tracker.</p>
          </section>

          <section className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Ausführliche Angaben über die Verarbeitung personenbezogener Daten</h3>
            
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-black text-slate-900 mb-3 uppercase text-xs">Analytik</h4>
              <ul className="space-y-4">
                <li>
                  <span className="font-bold">Google Analytics 4 (Google LLC):</span> Google Analytics 4 ist ein Webanalysedienst von Google LLC („Google“). Google verwendet die erhobenen Daten, um nachzuverfolgen und zu untersuchen, wie diese Website genutzt wird. Verarbeitete Daten: Anzahl der Nutzer; Nutzungsdaten; Sitzungsstatistiken; Tracker. Verarbeitungsort: Vereinigte Staaten.
                </li>
                <li>
                  <span className="font-bold">HubSpot Analytics (HubSpot Germany GmbH):</span> HubSpot Analytics ist ein Analysedienst von HubSpot, Inc. Verarbeitete Daten: Nutzungsdaten; Tracker. Verarbeitungsort: Deutschland.
                </li>
              </ul>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-black text-slate-900 mb-3 uppercase text-xs">Anzeigen von Inhalten externer Plattformen</h4>
              <ul className="space-y-4">
                <li>
                  <span className="font-bold">Google Fonts (Google LLC):</span> Visualisierung von Schriftarten. Verarbeitungsort: Vereinigte Staaten.
                </li>
                <li>
                  <span className="font-bold">Google-Maps-Widget (Google LLC):</span> Visualisierung von Karten. Verarbeitungsort: Vereinigte Staaten.
                </li>
              </ul>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-black text-slate-900 mb-3 uppercase text-xs">Interaktion mit Live-Chat-Plattformen</h4>
              <p><span className="font-bold">HubSpot Chat (HubSpot Germany GmbH):</span> Dienst für das Interagieren mit der Live-Chat-Plattform HubSpot. Verarbeitete Daten: Antworten auf Fragen; Benutzerinhalte; E-Mail; Nachname; Telefonnummer. Verarbeitungsort: Deutschland.</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-black text-slate-900 mb-3 uppercase text-xs">Kontaktieren des Nutzers</h4>
              <ul className="space-y-4">
                <li><span className="font-bold">Kontaktformular:</span> Autorisierung zur Verwendung der Angaben für Antworten auf Bitten nach Informationen. Verarbeitete Daten: E-Mail; Nutzungsdaten.</li>
                <li><span className="font-bold">Mailingliste oder Newsletter:</span> Hinzufügung der E-Mail-Adresse zur Kontaktliste für gewerbliche Informationen. Verarbeitete Daten: E-Mail; Nutzungsdaten; Tracker.</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-black text-slate-900 mb-3 uppercase text-xs">Tag-Verwaltung</h4>
              <p><span className="font-bold">Google Tag Manager (Google LLC):</span> Dienst zur zentralen Verwaltung von Tags. Verarbeitungsort: Vereinigte Staaten.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Rechtsgrundlagen der Verarbeitung</h3>
            <p>Der Anbieter darf personenbezogene Daten von Nutzern nur dann verarbeiten, wenn einer der folgenden Punkte zutrifft:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Die Nutzer haben ihre Einwilligung für einen oder mehrere bestimmte Zwecke erteilt.</li>
              <li>die Datenerhebung ist für die Erfüllung eines Vertrages mit dem Nutzer und/oder für vorvertragliche Maßnahmen daraus erforderlich;</li>
              <li>die Verarbeitung ist für die Erfüllung einer rechtlichen Verpflichtung, der der Anbieter unterliegt, erforderlich;</li>
              <li>die Verarbeitung steht im Zusammenhang mit einer Aufgabe, die im öffentlichen Interesse oder in Ausübung hoheitlicher Befugnisse, die dem Anbieter übertragen wurden, durchgeführt wird;</li>
              <li>die Verarbeitung ist zur Wahrung der berechtigten Interessen des Anbieters oder eines Dritten erforderlich.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Rechte der Nutzer (DSGVO)</h3>
            <p>Nutzer haben im gesetzlich zulässigen Umfang insbesondere das Recht, Folgendes zu tun:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Die Einwilligungen jederzeit widerrufen.</li>
              <li>Widerspruch gegen die Verarbeitung ihrer Daten einlegen.</li>
              <li>Auskunft bezüglich ihrer Daten erhalten.</li>
              <li>Überprüfen und berichtigen lassen.</li>
              <li>Einschränkung der Verarbeitung ihrer Daten verlangen.</li>
              <li>Löschung oder anderweitiges Entfernen der personenbezogenen Daten verlangen.</li>
              <li>Ihre Daten erhalten und an einen anderen Verantwortlichen übertragen lassen.</li>
              <li>Beschwerde einreichen.</li>
            </ul>
            
            <div className="mt-8 p-6 bg-slate-950 text-white rounded-2xl border border-white/10 shadow-xl">
              <h4 className="font-black uppercase text-[10px] tracking-[0.2em] mb-3 text-emerald-400">Details zum Widerspruchsrecht</h4>
              <p className="text-sm leading-relaxed text-white/70">
                Werden personenbezogene Daten im öffentlichen Interesse, in Ausübung eines dem Anbieter übertragenen hoheitlichen Befugnisses oder zur Wahrung der berechtigten Interessen des Anbieters verarbeitet, kann der Nutzer dieser Verarbeitung widersprechen, indem er einen Rechtfertigungsgrund angibt, der sich auf seine besondere Situation bezieht.
                Nutzer werden darüber informiert, dass sie der Verarbeitung der personenbezogenen Daten für Direktwerbung jederzeit unentgeltlich ohne Angabe von Gründen widersprechen können.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Begriffsbestimmungen</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">Personenbezogene Daten</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">Nutzungsdaten</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">Nutzer & Betroffener</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">Auftragsverarbeiter</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">Verantwortlicher</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">Tracker & Cookie</div>
            </div>
          </section>

          <section className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Letzte Aktualisierung: 24. Juli 2025</p>
            <div className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">iubenda hostet diese Inhalte</div>
          </section>
        </div>
      )
    }
  };

  const activeContent = content[type];

  return (
    <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 md:px-14">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-emerald-700 font-black tracking-[0.4em] uppercase text-[10px] mb-6">Legal Information</div>
          <h1 className="text-6xl md:text-[110px] font-bold mb-6 tracking-tighter leading-[0.85] text-slate-950">
            {activeContent.title.split('.')[0]}<span className="text-slate-900/30 italic">.</span>
          </h1>
          <p className="text-slate-600 text-xl md:text-2xl font-bold leading-tight tracking-tight mb-20 max-w-2xl">
            {activeContent.subtitle}
          </p>

          <div className="glass bg-white/60 rounded-shell p-10 md:p-20 shadow-2xl border border-white/40">
            {activeContent.body}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
