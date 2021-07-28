import { App } from "@vue/runtime-core"

import EditableCell from "./EditableCell.vue"
import MenuSwitch from "./MenuSwitch.vue"
import RouterLinkIcon from "./RouterLinkIcon.vue"
import SpanIcon from "./SpanIcon.vue"
import ImageModal from "./modal/ImageModal.vue"

export default {
    install(app: App, ...options: any[]) {
        app.component("EditableCell", EditableCell)
        app.component("MenuSwitch", MenuSwitch)
        app.component("RouterLinkIcon", RouterLinkIcon)
        app.component("SpanIcon", SpanIcon)
        app.component("ImageModal", ImageModal)
    }
}