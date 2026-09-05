# Portraits des Teams

Hier gehören die Bilder hin, die auf `/ueber-uns` in den Team-Kacheln stehen.
Erwartet werden genau diese Dateinamen — klein geschrieben, ohne Umlaute,
ohne Leerzeichen, Endung `.jpg`:

| Datei          | Person           |
| -------------- | ---------------- |
| `gianluca.jpg` | Gianluca Crepaldi |
| `sandra.jpg`   | Sandra Weiser     |
| `akan.jpg`     | Akan Yüksel       |
| `mark.jpg`     | Mark Bäder        |
| `yannik.jpg`   | Yannik Michael    |
| `chris.jpg`    | Christoph Lux     |

Warum umbenennen: ein Leerzeichen muss in einer URL kodiert werden, und die
Groß-/Kleinschreibung der Endung (`.JPG` gegenüber `.jpg`) ist auf manchen
Servern signifikant. Beides führt zu einem Bild, das lokal erscheint und live
fehlt — ein Fehler, den niemand sucht.

Zuschnitt: hochkant, mindestens 800 × 1000 Pixel. Die Kachel schneidet auf 4:5
und setzt den Fokus auf das obere Viertel, damit Gesichter im Bild bleiben.

Wer kein Bild hat, bekommt automatisch sein Monogramm — dafür ist nichts zu
tun. Kommt später ein Portrait dazu, genügt die Datei hier plus die Zeile
`image: '/team/<vorname>.jpg'` in `components/UeberUnsPage.tsx`.
