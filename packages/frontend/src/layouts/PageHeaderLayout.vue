<template>
  <a-page-header
    :title="currentRoute.meta.title"
    :sub-title="currentRoute.meta.subTitle"
    @back="() => $router.go(-1)"
    style="background:#fff"
  >
    <template #extra>
        
    </template>
  </a-page-header>
  <router-view />
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { routes, flatternRoutes } from "@/router"
const currentRoute = useRoute()
</script>
