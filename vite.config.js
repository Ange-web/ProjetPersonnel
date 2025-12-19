import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-16-171-143-46.eu-north-1.compute.amazonaws.com:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
