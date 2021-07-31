<template>
    <a-empty v-if="!member" />
    <template v-else-if="tiny">
        <p>{{ member.memberName }}</p>
        <p>
            <member-tag :member="member" />
        </p>
        <p>
            加群时间:
            {{ timestampToTime(member.joinTimestamp) }}
        </p>
    </template>
    <template v-else>
        <a-descriptions>
            <a-descriptions-item label="ID" :span="3">{{ member.id }}</a-descriptions-item>
            <a-descriptions-item label="群名片" :span="3">
                <member-tag :member="member" />
                {{ member.memberName }}
            </a-descriptions-item>
            <a-descriptions-item label="来源群" :span="3">{{ member.group.name }} {{ member.group.id }}</a-descriptions-item>
            <a-descriptions-item label="加群时间" :span="3">{{ timestampToTime(member.joinTimestamp) }}</a-descriptions-item>
            <a-descriptions-item label="上次发言时间" :span="3">{{ timestampToTime(member.lastSpeakTimestamp) }}</a-descriptions-item>
        </a-descriptions>
    </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Member, UserProfile } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';
import MemberTag from "@/components/info/MemberTag.vue"

defineProps<{
    member?: Optional<Member>
    tiny?: boolean
}>()

function timestampToTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() + ' ';
    const h = date.getHours() + ':';
    const m = date.getMinutes() + ':';
    const s = date.getSeconds();
    return Y + M + D + h + m + s;
}

</script>