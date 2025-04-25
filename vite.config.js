import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.45:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})