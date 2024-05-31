import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({ 
        registerType: 'autoUpdate' 
    })
  ],
  resolve: {
      alias: {
          playcanvas: "http://localhost:51000/playcanvas.dbg.mjs"
      }
  }
})