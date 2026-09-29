# Admin: Vorschau-Modus

Unter `/admin` kann sich der Website-Besitzer anmelden und danach auf **jeder
Seite** Bilder austauschen und Texte ändern, um zu sehen, wie es aussieht.
**Es wird nichts gespeichert oder hochgeladen** – Neu laden oder
„Zurücksetzen“ stellt alles wieder her. Andere Besucher sehen nie etwas davon.

## Einrichtung (einmalig, in Vercel)

Project → Settings → Environment Variables (Production und Preview):

| Name             | Wert                                                    |
|------------------|---------------------------------------------------------|
| `ADMIN_USER`     | Benutzername für den Login                              |
| `ADMIN_PASSWORD` | Passwort (lang und zufällig)                            |
| `ADMIN_SECRET`   | optional: langer Zufallswert zum Signieren der Sitzung  |

Danach einmal neu deployen. Solange die Variablen fehlen, meldet `/admin`
„noch nicht eingerichtet“.

## Bedienung

- **Ansehen** – normale Seite, Navigation funktioniert.
- **Texte** – Text anklicken und direkt tippen. Links und Buttons sind in
  diesem Modus stillgelegt.
- **Bilder** – Bild anklicken, Datei vom Gerät wählen. Dieselbe Bilddatei wird
  überall auf der Website ersetzt und bleibt beim Seitenwechsel erhalten.
- **Zurücksetzen** – lädt die Seite neu, alle Änderungen sind weg.
- **Abmelden** – beendet die Sitzung (sonst nach 8 Stunden automatisch).

Textänderungen gelten für die gerade angezeigte Seite.

## Technik

- `api/admin-login.js`, `api/admin-session.js`, `api/admin-logout.js` –
  Vercel Functions; Sitzung als signiertes, HttpOnly-Cookie.
- `components/admin/AdminPage.tsx` – Login-Formular unter `/admin` (noindex).
- `components/admin/EditMode.tsx` – Vorschau-Leiste; lädt nur nach bestätigter
  Sitzung.
- Läuft nur auf Vercel (die Functions gibt es auf Netlify nicht).
