import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import components from "./components"
import "@/views/pwa/ReloadPrompt.vue"
import { registerSW } from 'virtual:pwa-register'

(window as any)['global'] = window;
registerSW({
    onNeedRefresh() {
        // show a prompt to user
    },
    onOfflineReady() {
        // show a ready to work offline to user
    },
})
const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(components)
app.mount('#app')