import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8000,
  },
  resolve: {
    alias: {
      '@/styles': '/src/styles',
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/pages': '/src/pages',
    },
  },
})

