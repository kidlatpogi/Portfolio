import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // When deploying to GitHub Pages under a repo (kidlatpogi/Portfolio)
  // we need a base path so built assets are requested from /Portfolio/.
  const isProd = mode === 'production'
  return {
    base: isProd ? '/Portfolio/' : '/',
    plugins: [react()],
  }
})
