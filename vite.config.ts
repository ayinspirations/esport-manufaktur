import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Emits a `<link rel="prefetch">` for every lazily-loaded route chunk.
 *
 * The routes are code-split (see App.tsx), which means clicking one costs a
 * round trip that the old single-bundle build did not. The obvious fix --
 * warming the chunks from the client with `import()` on an idle callback --
 * was tried and measurably made scrolling *worse*: an `import()` does not just
 * fetch, it parses and evaluates, and idle callbacks are handed exactly the
 * gaps between scroll frames, so each warmed route spent that gap compiling
 * and the next frame was late. On a 4x-throttled CPU that was consistently
 * ~25 dropped frames per pass down the page against ~3 for the old build.
 *
 * `rel="prefetch"` has none of that cost. The browser fills its HTTP cache at
 * the lowest priority it has, after everything the page actually needs, and
 * nothing is parsed until the route is really opened -- at which point the
 * `import()` is served from cache. No main-thread work at any point, so the
 * scroll never sees it.
 *
 * Generated at build time because only the bundle knows the hashed filenames.
 */
const prefetchRouteChunks = (): Plugin => ({
  name: 'prefetch-route-chunks',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(_html, ctx) {
      if (!ctx.bundle) return;
      const chunks = Object.values(ctx.bundle).filter(
        (c): c is typeof c & { isDynamicEntry: boolean; fileName: string } =>
          c.type === 'chunk' && (c as any).isDynamicEntry
      );
      return chunks.map((c) => ({
        tag: 'link',
        attrs: { rel: 'prefetch', href: `/${c.fileName}`, as: 'script', crossorigin: '' },
        injectTo: 'head' as const
      }));
    }
  }
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 5000,
        host: '0.0.0.0',
        allowedHosts: true,
        watch: {
          ignored: ['**/.local/**', '**/node_modules/**'],
        },
      },
      plugins: [react(), prefetchRouteChunks()],
      build: {
        // Every browser that can run this site's CSS (backdrop-filter,
        // mask-composite, dvh units) is well past ES2020, so there is nothing
        // to gain from shipping the older, larger default output.
        target: 'es2020',
        cssCodeSplit: true,
        // Source maps are a separate download the browser only fetches when
        // devtools are open, so they cost visitors nothing and make a
        // production stack trace readable.
        sourcemap: true,
        reportCompressedSize: false,
        rollupOptions: {
          output: {
            // Three vendor chunks instead of one 667 kB bundle. They are split
            // along how they are actually used, so a visitor downloads a
            // library when the page that needs it renders:
            //
            //   react   -- needed to boot, so it is on the critical path
            //   gsap    -- only the homepage hero drives it
            //   motion  -- Framer, used by the nav and the tile grids
            //
            // Splitting also means a release that only touches page copy
            // leaves all three cached.
            manualChunks: {
              react: ['react', 'react-dom', 'react-dom/client'],
              gsap: ['gsap', 'gsap/ScrollTrigger', '@gsap/react'],
              motion: ['framer-motion'],
            },
          },
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
