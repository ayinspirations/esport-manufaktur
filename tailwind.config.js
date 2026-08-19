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
        // Brand accents
        brand: '#10b981',       // emerald 500
        'brand-bright': '#34d399', // emerald 400 -- primary CTA
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
        reveal: 'cubic-bezier(0.16, 1, 0.3, 1)',        // calm, content
        spring: 'cubic-bezier(0.67, 0.13, 0.14, 1.04)', // springy, interactive
      },
      transitionDuration: {
        micro: '150ms',
        interact: '300ms',
        reveal: '750ms',
        slow: '1100ms',
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
