<template>
    <a-dropdown>
        <span id="user-dropdown-title">
            {{ bot?.nickname ?? "未连接" }}
            <a-divider type="vertical" />
            <user-avatar size="small" :user-id="botId ?? 0" :nickname="bot?.nickname" />
        </span>
        <template #overlay>
            <a-menu>
                <a-menu-item>
                    <span>
                        <api-filled />
                        <a-divider type="vertical"></a-divider>
                        <span @click="$emit('menu-select', 'connect')">连接服务器</span>
                    </span>
                </a-menu-item>
                <a-menu-item>
                    <span>
                        <profile-filled />
                        <a-divider type="vertical"></a-divider>
                        <span @click="$emit('menu-select', 'show-profile')">Bot资料</span>
                    </span>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
  
<script setup lang="ts" >
import { defineEmits, defineProps } from "vue";
import { ProfileFilled, ApiFilled } from "@ant-design/icons-vue";
import type { BotProfile, Optional } from "mirai-reactivity-ws";
import UserAvatar from "@/components/info/UserAvatar.vue"

defineProps<{
    bot: Optional<BotProfile>,
    botId: Optional<number>
}>()
defineEmits(['menu-select'])


</script>
  
<style lang="less">
#user-dropdown-title {
    height: 100%;
}
#user-dropdown-title:hover {
    cursor: pointer;
}
#avatar {
    background-color: @primary-color;
}
</style>