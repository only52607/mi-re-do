<template>
  <a-layout id="base-layout" style="height:100%; overflow: hidden;">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <global-logo :collapsed="collapsed" id="logo" />
      <route-base-menu theme="dark" mode="inline" :routes="routes" :current-route="route" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header id="header">
        <menu-switch id="switch" v-model:collapsed="collapsed" />
        <span>{{ route.meta.title }}</span>
        <bot-dropdown
          :bot-id="connectionInfo?.authentication?.qq"
          :bot="botProfile"
          @menu-select="onMenuSelect"
        />
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
      :connection-info="connectionInfo"
    ></connection-modal>
    <bot-profile-modal
      :visible="botprofileModalVisible"
      :bot-id="connectionInfo?.authentication?.qq"
      :bot="botProfile"
      @cancel="() => botprofileModalVisible = false"
    />
  </a-layout>
</template>
<script setup lang="ts">
import { RouteBaseMenu } from "./menu"
import { GlobalLogo } from "./logo"
import { useRoute, useRouter } from "vue-router";
import { routes } from "@/router"
import { createMiraiWebsocketApi, registerGlobalMiraiApi, useBotProfile, useMiraiApi } from "mirai-reactivity-ws";
import BotDropdown from "@/components/BotDropdown.vue"
import ConnectionModal from "@/components/modal/ConnectionModal.vue"
import { message, notification } from "ant-design-vue";
import { onMounted, watch } from "@vue/runtime-core";
import { useConnectionInfo } from "@/use";
import BotProfileModal from "@/components/modal/BotProfileModal.vue"
import { registerEventDispatcherForSession } from "@/use/session";
import { ref } from "vue";
import type { MiraiWsConnectParams } from "mirai-reactivity-ws";

const { botProfile } = useBotProfile()
const connectionInfo = useConnectionInfo()
let hideLoadingToast: () => void | undefined
const connectionModalVisible = ref(false)
const botprofileModalVisible = ref(false)
const router = useRouter()
const route = useRoute()
const collapsed = ref(true)
const connecting = ref(false)
const miraiApi = useMiraiApi()

registerEventDispatcherForSession(() => {
  notification.success({
    message: "事件监听已启动"
  })
})

watch(() => connecting.value, () => {
  if (!connecting.value && hideLoadingToast) {
    hideLoadingToast()
    return
  }
  if (connecting.value) {
    hideLoadingToast = message.loading("正在连接服务器")
  }
})

function showConnectModal() {
  message.warning("请先连接服务器")
  if (miraiApi.value == undefined) {
    connectionModalVisible.value = true
  }
}

function cancelModal() {
  if (!miraiApi.value) {
    message.warning("请先连接到服务器")
    return
  }
  connectionModalVisible.value = false
}

function connectionInfoAvailable() {
  return connectionInfo.value &&
    connectionInfo.value.address &&
    connectionInfo.value.authentication &&
    connectionInfo.value.authentication.qq &&
    connectionInfo.value.authentication.verifyKey
}

async function connectAutomatic() {
  if (!connectionInfo.value || !connectionInfoAvailable()) return
  try {
    connecting.value = true
    const { api } = await createMiraiWebsocketApi(connectionInfo.value)
    registerGlobalMiraiApi(api)
    connectionModalVisible.value = false
    notification.success({ message: "自动连接服务器成功" })
  } catch(e) {
    notification.error({ message: "自动连接服务器失败" })
    showConnectModal()
    console.log(e)
  }
  connecting.value = false
}

onMounted(async () => {
  if (miraiApi.value) return  // 已登录无需重复连接
  if (!connectionInfo.value || !connectionInfoAvailable()) {  // 没有连接信息，弹出连接框
    showConnectModal()
    return
  }
  connectAutomatic()
})

async function onMenuSelect(itemName: string) {
  switch (itemName) {
    case "connect":
      connectionModalVisible.value = true
      break
    case "show-profile":
      botprofileModalVisible.value = true
      break
  }
}

async function connect(params: MiraiWsConnectParams) {
  try {
    connecting.value = true
    const { api } = await createMiraiWebsocketApi(params)
    registerGlobalMiraiApi(api)
    connectionModalVisible.value = false
    notification.success({
      message: "连接服务器成功"
    })
    connectionInfo.value = params  // 保存信息
  } catch (e) {
    const reason = e?.message ?? ""
    message.error(`连接服务器失败!  ${reason}`)
  }
  connecting.value = false
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
  margin: 18px 0px 10px 0;
  font-weight: bold;
  text-align: center;
}

#switch {
  line-height: 64px;
}
</style>