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
      scope: "/",
      description: "轻量级IM前端客户端",
      icons: [{
        src: "./favicon.ico",
        size: "48*48"
      }]
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
