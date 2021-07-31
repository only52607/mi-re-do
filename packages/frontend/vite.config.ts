import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  base: "/mi-re-do/",
  plugins: [vue({
    script: {
      refSugar: true
    }
  }),
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: "MI-RE-DO",
      short_name: "MRD",
      start_url: ".",
      display: "standalone",
      background_color: "#ffffff",
      lang: "cn",
      scope: "/mi-re-do/",
      description: "轻量级IM前端客户端",
      theme_color: '#1abc9c',
      icons: [{
        src: "./logo.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "./logo_144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any"
      }
    ]
    }
  })],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1abc9c',
          'link-color': '#27ae60',
          'border-radius-base': '5px',
        },
        javascriptEnabled: true,
      },
    }
  }
})
