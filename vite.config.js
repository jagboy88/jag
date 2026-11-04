import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ARTIFACT=1 produces a single bundle (no lazy chunks) so the whole app can
// be inlined into one HTML page for the claude.ai preview. The normal build
// keeps Three.js and GSAP in their own cached chunks.
const singleBundle = process.env.ARTIFACT === '1';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // Relative asset paths so the build works at the domain root, under
  // GitHub Pages' /jag/ sub-path, and when the HTML is embedded elsewhere.
  base: './',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      // The SSR build (used only by scripts/prerender.mjs) externalises
      // node_modules, so chunking applies to the client build alone.
      output: isSsrBuild
        ? {}
        : singleBundle
          ? { inlineDynamicImports: true }
          : {
              manualChunks: {
                three: ['three', '@react-three/fiber'],
                motion: ['gsap', '@gsap/react', 'lenis', 'framer-motion'],
              },
            },
    },
  },
}));
