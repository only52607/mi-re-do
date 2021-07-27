<template>
  <a-layout id="base-layout" style="height:100%; overflow: hidden;">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <global-logo :collapsed="collapsed" id="logo" />
      <route-base-menu theme="dark" mode="inline" :routes="routes" :current-route="route" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header id="header">
        <menu-switch v-model:collapsed="collapsed" />
        <span>{{ route.meta.title }}</span>
        <bot-dropdown :bot="botProfile" @menu-select="onMenuSelect" />
      </a-layout-header>
      <a-layout-content id="content">
        <router-view />
      </a-layout-content>
    </a-layout>
    <connection-modal
      :connecting="connecting"
      :visible="connectionModalVisible"
      @connect="connect"
      @cancel="cancelModal"
    ></connection-modal>
  </a-layout>
</template>
<script setup lang="ts">
import { RouteBaseMenu } from "./menu"
import { GlobalLogo } from "./logo"
import { useRoute, useRouter } from "vue-router";
import { routes } from "@/router"
import { createMiraiWebsocketApi, setDefaultMiraiApi, useBotProfile, useMiraiApi } from "mirai-reactivity-ws";
import BotDropdown from "@/components/BotDropdown.vue"
import ConnectionModal from "@/components/ConnectionModal.vue"
import { message, notification } from "ant-design-vue";
import { onMounted, watch } from "@vue/runtime-core";

const { botProfile } = useBotProfile()
ref: connectionModalVisible = false
const router = useRouter()
const route = useRoute()
ref: collapsed = true
ref: connecting = false
const miraiApi = useMiraiApi()
const storeKey = "mirai-console-websocket"

let hideLoadingToast: () => void | undefined

watch(() => connecting, () => {
  if (!connecting && hideLoadingToast) {
    hideLoadingToast()
    return
  }
  if (connecting) {
    hideLoadingToast = message.loading("正在连接服务器")
  }
})

function showConnectModal() {
  message.warning("请先连接服务器")
  if (miraiApi.value == undefined) {
    connectionModalVisible = true
  }
}

onMounted(async () => {
  const connectInfoString = localStorage.getItem(storeKey)
  if (!connectInfoString) {
    showConnectModal()
    return
  }
  const connectInfoObj = JSON.parse(connectInfoString)
  try {
    connecting = true
    const { api } = await createMiraiWebsocketApi(connectInfoObj)
    setDefaultMiraiApi(api)
    connectionModalVisible = false
    notification.success({
      message: "连接websocket服务器成功"
    })
    connecting = false
  } catch {
    notification.error({
      message: "连接websocket服务器失败"
    })
    showConnectModal()
  }
})

async function onMenuSelect(itemName: string) {
  switch (itemName) {
    case "connect":
      connectionModalVisible = true
      break
    case "show-profile":
      router.replace({ path: '/' })
      break
  }
}

async function connect(connectInfo: any) {
  try {
    connecting = true
    const param = {
      address: connectInfo.address,
      authentication: { qq: parseInt(connectInfo.qq), verifyKey: connectInfo.verifyKey }
    }
    const { api } = await createMiraiWebsocketApi(param)
    setDefaultMiraiApi(api)
    connectionModalVisible = false
    notification.success({
      message: "连接到websocket服务器成功"
    })
    localStorage.setItem(storeKey, JSON.stringify(param))
  } catch (e) {
    const reason = e?.message ?? ""
    message.error(`连接websocket服务器失败!  ${reason}`)
  }
  connecting = false
}

function cancelModal() {
  if (miraiApi.value) {
    connectionModalVisible = false
  } else {
    message.warning("请先连接到服务器")
  }
}

</script>

<style scoped lang="less">
#base-layout {
  height: 100%;
}

#header {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0 10px 0 0;
  margin-bottom: 1px;
}

#content {
  margin: 0px 0px;
  padding: 0px 0px;
  min-height: 280px;
}

#logo {
  color: @primary-color;
  font-size: 17px;
  margin: 18px 0px 10px 25px;
  font-weight: bold;
}
</style>