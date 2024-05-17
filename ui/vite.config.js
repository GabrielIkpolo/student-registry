import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_REACT_APP_API_BASE_URL,
        changeOrigin: true,
        secure: process.env.SECURE, // set to true if the api uses Https
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/the-department': {
        target: process.env.VITE_REACT_APP_API_BASE_URL,
        changeOrigin: true,
        secure: process.env.SECURE,
      }
    },
  },
})
