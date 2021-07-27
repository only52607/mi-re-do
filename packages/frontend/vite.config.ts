import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    script: {
      refSugar: true
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
  css:{
    preprocessorOptions:{
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
