<template>
    <a-empty v-if="!profile" />
    <template v-else>
        <a-descriptions>
            <a-descriptions-item label="ID" :span="3">{{ userId }}</a-descriptions-item>
            <a-descriptions-item
                label="性别"
                :span="3"
            >{{ profile.sex == "FEMALE" ? "女" : profile.sex == "MALE" ? "男" : "未知" }}</a-descriptions-item>
            <a-descriptions-item label="等级" :span="3">{{ profile.level }}</a-descriptions-item>
            <a-descriptions-item label="年龄" :span="3">{{ profile.age }}</a-descriptions-item>
            <a-descriptions-item label="邮箱" :span="3">{{ profile.email }}</a-descriptions-item>
        </a-descriptions>
    </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { UserProfile } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';

defineProps<{
    profile: Optional<UserProfile>,
    userId: number
}>()

</script>