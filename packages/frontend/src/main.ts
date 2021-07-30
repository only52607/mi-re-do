import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import components from "./components"
import "@/views/pwa/ReloadPrompt.vue"

(window as any)['global'] = window;
const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(components)
app.mount('#app')