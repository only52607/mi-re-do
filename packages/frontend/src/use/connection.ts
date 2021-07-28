import { ref, Ref, watchEffect } from "vue";

export interface ConnectionInfo {
    address: string,
    authentication: { qq: number, verifyKey: string }
}

const connectionInfo: Ref<ConnectionInfo | undefined> = ref()

const storeKey = "mirai-console-websocket"

function initConnectionInfo() {
    const connectInfoString = localStorage.getItem(storeKey)
    if (!connectInfoString) {
        return
    }
    const connectInfoObj = JSON.parse(connectInfoString)
    connectionInfo.value = connectInfoObj
}

let inited = false

export function useConnectionInfo() {
    if (!inited) {
        initConnectionInfo()
    }
    return connectionInfo
}

/**
 * 监听并保存信息
 */
watchEffect(() => {
    if (connectionInfo.value != undefined) {
        localStorage.setItem(storeKey, JSON.stringify(connectionInfo.value))
    }
})