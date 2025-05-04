import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-stack-q550.onrender.com', // Backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})


