import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Using root domain kidlatpogi.github.io (no base path needed)
  base: '/',
  plugins: [react()],
})
