// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    assetsInclude: ['**/*.glb'],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client', 'three']
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        'framer-motion',
        '@react-three/fiber',
        '@react-three/drei',
        '@react-three/rapier',
        'three',
        'lucide-react'
      ]
    }
  },

  adapter: cloudflare({
    prerenderEnvironment: 'node'
  })
});
// Force restart dev server