// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.zeusbautista.site',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    assetsInclude: ['**/*.glb'],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom/client', 'three', 'lenis']
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'framer-motion',
        'gsap',
        'gsap/ScrollTrigger',
        'lucide-react',
        'lenis'
      ],
      exclude: ['react-github-calendar']
    }
  },

  adapter: cloudflare({
    prerenderEnvironment: 'node'
  })
});