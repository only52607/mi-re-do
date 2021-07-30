<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-24 21:33:50
 * @LastEditTime: 2021-03-01 14:26:09
-->
<template>
  <div id="main">
    <div id="content">
      <a-card style="width: 100%">
        <a-card-meta
          :title="botProfile?.nickname"
          :description="connectionInfo?.authentication?.qq ?? 0"
        >
          <template #avatar>
            <user-avatar
              :nickname="botProfile?.nickname"
              :user-id="connectionInfo?.authentication?.qq ?? 0"
            />
          </template>
        </a-card-meta>
        <a-divider></a-divider>
        <a-descriptions title="Mah 插件信息">
          <a-descriptions-item :span="3" label="地址">{{ connectionInfo?.address }}</a-descriptions-item>
          <a-descriptions-item :span="3" label="版本">{{ pluginInfo?.version }}</a-descriptions-item>
        </a-descriptions>
        <a-divider></a-divider>
        <a-descriptions title="MI-RE-DO">
          <a-descriptions-item :span="3" label="Github"><a href="https://github.com/only52607/mi-re-do"> only52607/MI-RE-DO </a></a-descriptions-item>
        </a-descriptions>
      </a-card>
    </div>
    <global-footer id="footer" />
  </div>
</template>

<script setup lang="ts" >
import { GlobalFooter } from "@/layouts/footer"
import UserAvatar from "@/components/info/UserAvatar.vue"
import { useConnectionInfo } from "@/use";
import { useBotProfile, usePluginInfo } from "mirai-reactivity-ws";
import { watchEffect } from "@vue/runtime-core";

const { botProfile } = useBotProfile()
const connectionInfo = useConnectionInfo()
const { pluginInfo } = usePluginInfo()

</script>

<style lang="less" scoped>
#main {
  display: flex;
  flex-direction: column;
  height: 100%;
  #content {
    flex: 1 1 auto;
    height: 0px;
  }
  #footer {
    flex: 0 0 auto;
  }
}
</style>