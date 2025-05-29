import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/dlocal': {
        target: 'https://api-sbx.dlocalgo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/dlocal/, ''),
        secure: false,
      }
    }
  },
});
