/** @type {import('tailwindcss').Config} */

// Design tokens. The palette below is the site's *existing* colour set, only
// named -- no hue was changed. Naming them is what stops the next
// near-duplicate green from being added by accident.
export default {
  content: ['./index.html', './{App,index}.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Grounds
        ground: '#020617',      // primary dark ground (slate-950)
        'ground-soft': '#061226', // hero vignette mid-stop
        canvas: '#badeda',      // the one light ground, used by every light section
        // Headings. Every headline is set in this pair: the leading words in
        // `ink`, the trailing/secondary words in `ink-accent`.
        ink: '#0b0f2a',
        'ink-accent': '#0e958e',
        // A darker step of the same accent, for the places where it has to
        // carry *small* text on a light surface. #0e958e is a display colour:
        // it reads beautifully at 40-100px but only reaches ~3.2:1 on the
        // light cards, which is under the minimum for anything body-sized.
        // Same hue, same role, just dark enough to be read.
        'ink-accent-deep': '#0a6f6a',
        // And one step lighter, for small accent text on the *dark* ground --
        // the mirror of ink-accent-deep. Same hue throughout.
        'ink-accent-soft': '#5fd6cf',
        // ---------------------------------------------------------------
        // Ein Gruen, nicht zwei
        // ---------------------------------------------------------------
        // Die Seite trug zwei Gruentoene nebeneinander: das Tuerkis der
        // Ueberschriften (#0e958e, das "level up") und Tailwinds Emerald,
        // ein deutlich gelberes Gruen, das ueber die Voreinstellung in jeden
        // Knopf, jedes Symbol und jeden Zeigezustand gelaufen ist. Nebenein-
        // ander sehen die beiden nicht nach zwei Abstufungen aus, sondern
        // nach einem Fehler.
        //
        // Statt in neunundzwanzig Dateien Klassen zu tauschen, wird die
        // Leiter selbst ersetzt: `emerald` ist ab hier dieselbe Farbe wie
        // ink-accent, in hellere und dunklere Stufen gefaechert. Jedes
        // bestehende `emerald-400`, `emerald-500`, `shadow-emerald-500/20`
        // zieht damit von selbst mit -- und ein kuenftiges auch.
        //
        // Die Ankerstufen sind die, die es schon gab: 300 ist
        // ink-accent-soft, 500 ist ink-accent, 600 ist ink-accent-deep.
        emerald: {
          50: '#eafaf8',
          100: '#cdf3f0',
          200: '#9ee7e2',
          300: '#5fd6cf',
          400: '#22bdb5',
          500: '#0e958e',
          600: '#0a6f6a',
          700: '#0b5854',
          800: '#0d4744',
          900: '#103b39',
          950: '#032222'
        },
        // Brand accents
        brand: '#0e958e',
        'brand-bright': '#22bdb5',
        teal: '#2dd4bf',        // headline gradient start
        lime: '#84cc16',        // headline gradient end
        petrol: '#00818d',      // hero ambient glow
        signal: '#00ff00',      // consent / high-alert green
        'signal-deep': '#00dd00',
      },
      borderRadius: {
        // Three steps replacing the nine ad-hoc values that had accumulated
        // (1.2 / 1.5 / 1.8 / 2 / 2.5 / 3 / 3.2rem, 20px, 28px). The three
        // values below were picked to sit on the existing clusters, so
        // consolidating changed the rule without redesigning the look.
        card: '1.25rem',   // 20px -- chips, small tiles, inputs
        surface: '2rem',   // 32px -- cards, media tiles
        shell: '2.5rem',   // 40px -- large panels, section shells
      },
      transitionTimingFunction: {
        // Two registers, deliberately separated (Mooser's model):
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',       // calm, content
        spring: 'cubic-bezier(0.67, 0.13, 0.14, 1.04)', // springy, interactive
      },
      // Kept in sync with DUR in components/motion.ts by hand -- the same
      // vocabulary, once for Tailwind classes and once for inline styles.
      transitionDuration: {
        micro: '250ms',
        interact: '500ms',
        panel: '550ms',
        reveal: '1050ms',
        slow: '1500ms',
      },
      keyframes: {
        'tilt-in': {
          '0%': { opacity: '0', transform: 'perspective(1200px) rotateX(-60deg) translateY(300px)' },
          '100%': { opacity: '1', transform: 'perspective(1200px) rotateX(0deg) translateY(0)' },
        },
        'pin-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'tilt-in': 'tilt-in 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pin-bounce': 'pin-bounce 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
