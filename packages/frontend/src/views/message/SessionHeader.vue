<template>
    <!-- <div> </div> -->
    <a-page-header
        v-if="session.type == 'friend'"
        :title="session.contact.nickname"
        :sub-title="session.contact.id"
        style="background:#fff;"
        @back="() => {}"
    >
        <template #backIcon>
            <slot name="backIcon"></slot>
        </template>
    </a-page-header>
    <a-page-header
        v-else-if="session.type == 'group'"
        :title="session.contact.name"
        :sub-title="session.contact.id"
        style="background:#fff;"
        @back="() => {}"
    >
        <template #backIcon>
            <slot name="backIcon"></slot>
        </template>
    </a-page-header>
    <a-page-header
        v-else-if="session.type == 'temp'"
        :title="session.contact.memberName"
        :sub-title="session.contact.id"
        style="background:#fff;"
        @back="() => {}"
    >
        <template #backIcon>
            <slot name="backIcon"></slot>
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
