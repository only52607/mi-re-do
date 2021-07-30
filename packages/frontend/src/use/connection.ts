import { MiraiWsConnectParams } from "mirai-reactivity-ws";
import { useStorage } from "@vueuse/core";

const storeKey = "connection:mirai-console-websocket"

const globalConnectionInfo = useStorage(storeKey, {} as MiraiWsConnectParams) // address:"", authentication:{ qq:0 , verifyKey:"" }

export function useConnectionInfo() {
    return globalConnectionInfo
}