<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-empty v-if="!profile" />
    <a-spin v-else-if="loading" />
    <template v-else>
        <a-card :loading="loading">
            <template #cover>
            </template>
            <a-card-meta :title="profile.nickname" :description="profile.sign">
                <template #avatar>
                    <user-avatar :user-id="friend?.id ?? 0" :nickname="profile.nickname"/>
                </template>
            </a-card-meta>
            <a-divider></a-divider>
            <a-row>
                <a-col :span="20">
                    <user-description :user-id="friend?.id ?? 0" :profile="profile" />
                </a-col>
            </a-row>

            <a-divider></a-divider>

            <a-row type="flex" justify="center">
                <a-col :span="6">
                    <a-button
                        type="primary"
                        key="send-message"
                        @click="$emit('send-friend-message', 'friend', friend)"
                    >发消息</a-button>
                </a-col>
            </a-row>
        </a-card>
    </template>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type { Friend, UserProfile } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';
import UserAvatar from "@/components/info/UserAvatar.vue"
import UserDescription from "@/components/info/UserDescription.vue"

const props = defineProps<{
    profile: Optional<UserProfile>,
    friend: Optional<Friend>
    loading: boolean
}>()

defineEmits<{
    (event: 'send-friend-message', type: "friend", contact: Friend): void
}>()

</script>
  
<style lang="less">
</style>