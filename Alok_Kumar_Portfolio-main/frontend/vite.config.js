import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // <--- This is the magic line that unmasks production errors
    rollupOptions: {
      output: {
        manualChunks: {
          // Put heavy third-party libraries into their own chunk
          vendor: ['react', 'react-dom', 'framer-motion', 'react-icons'],
        }
      }
    }
  }
})