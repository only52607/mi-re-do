<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-menu mode="inline">
        <a-spin v-if="!groupList"/>
        <template v-else>
            <a-menu-item v-for="(group, i) in groupList" :key="group.id" >
                <template #icon>
                    <a-avatar>{{ group.name }}</a-avatar>
                </template>
                {{ `${group.name}(${group.id})` }}
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Group } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';

defineProps<{
    groupList: Optional<Group[]>,
    loading: boolean
}>()

</script>
  
<style lang="less">
</style>