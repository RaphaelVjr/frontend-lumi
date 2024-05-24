import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
    test: {
    globals: true,
    environment: 'jsdom', 
  },
})
