import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { hmr: { overlay: false } },
  optimizeDeps: {
    exclude: ['aframe'], // Exclude A-Frame from optimization to avoid conflicts
  },
  assetsInclude: ['**/*.html'], // Allow HTML files from A-Frame
  resolve: {
    alias: {
      'three': 'three', // Ensure Three.js is resolved correctly
    },
  },
});