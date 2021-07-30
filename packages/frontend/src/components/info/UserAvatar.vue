<template>
    <a-avatar
        :src="`https://q.qlogo.cn/headimg_dl?bs=qq&dst_uin=${userId}&src_uin=www.jlwz.cn&fid=blog&spec=100`"
        :alt="nickname"
    />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Optional } from '@/types/utility';

defineProps<{
    nickname: Optional<string>,
    userId: number
}>()

</script>