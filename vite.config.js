import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Using root domain kidlatpogi.github.io (no base path needed)
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor.react'
            return 'vendor'
          }
          // Put the ExpandingCards gallery and its images into a separate chunk
          if (id.includes('src/JS/ExpandingCards') || id.includes('src/JS/DesignCard') || id.includes('src/JS/DesignModal')) {
            return 'expanding-cards'
          }
        }
      }
    }
  }
})
