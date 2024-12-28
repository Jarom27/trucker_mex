import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    port: process.env.PORT || 80,
    host: true,
    proxy: {
      '/api': {
        target: 'https://truckerapi.onrender.com/',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild'
  },
  base: '/',
})
