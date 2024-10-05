import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.webp'],
  build: {
    assetsInlineLimit: 0,
  },
  server: {
    hmr: {
      overlay: false,
    },
    logLevel: 'warn',
  },
})