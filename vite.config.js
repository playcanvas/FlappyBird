import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import dotenv from 'dotenv';

dotenv.config();

console.log('Running PC', process.env.VITE_PLAYCANVAS)

export default defineConfig({
  plugins: [
    VitePWA({ 
        registerType: 'autoUpdate',
        workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        } 
    })
  ],
  resolve: {
      alias: {
          playcanvas: process.env.VITE_PLAYCANVAS
      }
  }
})