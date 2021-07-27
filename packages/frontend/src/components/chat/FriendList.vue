<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-menu mode="inline">
        <a-spin v-if="!friendList" />
        <template v-else>
            <a-menu-item v-for="(friend, i) in friendList" :key="friend.id" >
                <template #icon>
                    <a-avatar>{{ friend.nickname }}</a-avatar>
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

defineProps<{
    friendList: Optional<Friend[]>,
    loading: boolean
}>()

</script>
  
<style lang="less">
</style>