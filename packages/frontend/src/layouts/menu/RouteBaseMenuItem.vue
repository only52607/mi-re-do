<template>
    <a-menu-item :key="route.meta?.fullPath">
        <router-link-icon :icon="route.meta?.icon" :text="route.meta?.title" :to="route.meta?.fullPath" />
    </a-menu-item>
</template>


<script setup lang="ts">
import { defineProps } from "vue";
import type { RouteRecordRaw } from "vue-router";
defineProps<{
    route: RouteRecordRaw
}>()
</script>