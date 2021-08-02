import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import components from "./components"
import pwa from "@/plugins/pwa"
import polyfill from "@/plugins/polyfill"

const app = createApp(App)
app.use(pwa)
app.use(router)
app.use(Antd)
app.use(components)
app.use(polyfill)
app.mount('#app')