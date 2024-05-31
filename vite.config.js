import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

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
          playcanvas: "https://esm.sh/gh/playcanvas/engine@865fd8041c/src/index.js"
      }
  }
})