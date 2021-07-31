<template>
    <a-page-header
        style="background:#fff;"
        @back="() => {}"
    >
        <template #backIcon>
            <slot name="backIcon"></slot>
        </template>
        <template #extra>
            <slot :session="session" name="extra"></slot>
        </template>
        <template #title>
            <slot :session="session" name="title"></slot>
        </template>
        <template #subTitle>
            <slot :session="session" name="subTitle"></slot>
        </template>
    </a-page-header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Session } from '@/use';

defineProps<{
    session: Session
}>()

</script>
