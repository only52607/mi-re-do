<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-empty v-if="!group" style="height:100%" />
    <template v-else>
        <a-row style="height: 15%; ">
            <a-col :span="24">
                <a-page-header :title="group.name" :sub-title="group.id" style="background:#fff;">
                    <template #extra>
                        <a-button
                            type="primary"
                            key="send-message"
                            ghost
                            @click="$emit('goto-group-session')"
                        >发消息</a-button>
                    </template>
                </a-page-header>
            </a-col>
        </a-row>
        <a-row type="flex" justify="center" style="height: 75%; overflow:auto;">
            <a-col :span="20">
                <member-list
                    @goto-temp-session="(member) => emits('goto-temp-session', member)"
                    :member-list="memberList"
                    :loading="loading"
                ></member-list>
            </a-col>
        </a-row>
    </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Group, Member } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';
import MemberList from "@/components/list/MemberList.vue"

defineProps<{
    memberList: Optional<Member[]>,
    group: Optional<Group>,
    loading: boolean
}>()

const emits = defineEmits<{
    (event: 'goto-group-session'): void
    (event: 'goto-temp-session', contact: Member): void
}>()

</script>
  
<style lang="less">
</style>