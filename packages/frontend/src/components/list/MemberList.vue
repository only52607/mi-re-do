<template>
    <a-spin v-if="loading" />
    <a-empty v-else-if="!memberList" />
    <a-list
        v-else
        style="margin: 5px;"
        :loading="loading"
        :grid="{ gutter: 10, xs: 1, sm: 1, md: 4, lg: 4, xl: 6, xxl: 2 }"
        :data-source="memberList"
    >
        <template #renderItem="{ item: member }">
            <a-list-item>
                <a-popover trigger="click">
                    <template #content>
                        <member-desciption :tiny="true" :member="member"/>
                        <a-divider></a-divider>
                        <a-button
                            type="primary"
                            key="send-message"
                            ghost
                            @click="$emit('goto-temp-session', member)"
                        >发消息</a-button>
                    </template>
                    <a-card :hoverable="true">
                        <div style="display: flex;">
                            <user-avatar
                                style="margin: 0px auto;"
                                :user-id="member.id"
                                :nickname="member.memberName"
                            />
                        </div>
                        <a-divider></a-divider>
                        <div style="overflow: hidden;">
                            <span
                                style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;"
                            >
                                <member-tag :member="member" />
                                {{ member.memberName }}
                            </span>
                        </div>
                    </a-card>
                </a-popover>
            </a-list-item>
        </template>
    </a-list>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';
import type { Member } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';
import UserAvatar from "@/components/info/UserAvatar.vue"
import MemberTag from "@/components/info/MemberTag.vue"
import MemberDesciption from "@/components/info/MemberDesciption.vue"

defineProps<{
    memberList: Optional<Member[]>,
    loading: boolean
}>()

defineEmits<{
    (event: 'goto-temp-session', contact: Member): void
}>()

</script>
  
<style lang="less">

</style>