<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-menu mode="inline">
        <a-empty v-if="!friendList" />
        <a-spin v-else-if="loading" />
        <template v-else>
            <a-menu-item v-for="(friend, i) in friendList" :key="friend.id">
                <template #icon>
                    <user-avatar :user-id="friend.id" :nickname="friend.nickname" />
                </template>
                {{ friend.remark }}
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Friend } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';
import UserAvatar from "@/components/info/UserAvatar.vue"

defineProps<{
    friendList: Optional<Friend[]>,
    loading: boolean
}>()

</script>
  
<style lang="less">
</style>