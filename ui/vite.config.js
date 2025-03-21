import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // When you make a request to /api/*, proxy it to the backend server
      '/api': {
        target: 'http://localhost:5000', // Backend server
        changeOrigin: true,              // Allows cross-origin requests
      }
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setupTests.js",
    css: false,
  }
})
