import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-dynamic-forms/', // Set base for GitHub Pages deployment
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
