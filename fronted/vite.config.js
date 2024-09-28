import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import baseUrl from './src/baseUrl.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true // Helps detect file changes in some environments
    }
  },
  proxy: {
    '/api': {
      target: `${baseUrl}`,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
})
