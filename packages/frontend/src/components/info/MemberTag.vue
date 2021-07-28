<template>
    <a-tag v-if="member.permission == 'OWNER'" color="orange">群主</a-tag>
    <a-tag v-if="member.permission == 'ADMINISTRATOR'" color="green">管理员</a-tag>
    <a-tag
        v-if="member.specialTitle != undefined && member.specialTitle.length > 0"
        color="blue"
    >{{ member.specialTitle }}</a-tag>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Member } from "mirai-reactivity-ws"

defineProps<{
    member: Member
}>()

</script>