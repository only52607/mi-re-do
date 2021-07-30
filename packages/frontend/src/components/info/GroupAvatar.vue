<template>
    <a-avatar :src="`https://p.qlogo.cn/gh/${groupId}/${groupId}/0`" :alt="groupName" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Optional } from '@/types/utility';

defineProps<{
    groupName: Optional<string>,
    groupId: number
}>()

</script>