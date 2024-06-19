// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; 

export default defineConfig({
  plugins: [
    react(),
    VitePWA(),
    require('tailwindcss'), // Add Tailwind CSS plugin
    require('autoprefixer'), // Add Autoprefixer plugin
  ],
});
