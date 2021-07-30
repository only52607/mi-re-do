<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 子菜单
 * @Date: 2021-02-02 21:33:20
 * @LastEditTime: 2021-02-25 10:40:12
-->
<template>
  <a-sub-menu :key="`${route.meta?.fullPath}`" v-bind="$attrs">
    <!-- Title -->
    <template #title>
      <span-icon :icon="route.meta?.icon" :text="route.meta?.title" />
    </template>
    <!-- Childrens -->
    <template v-for="routeItem in route.children">
      <!-- Show MenuItem -->
      <template v-if="!routeItem.children || routeItem.children.length == 0">
        <route-base-menu-item :route="routeItem" :key="routeItem.meta?.fullPath" />
      </template>

      <!-- Show SubMenu -->
      <template v-else>
        <route-base-sub-menu :route="routeItem" :key="routeItem.meta?.fullPath" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import RouteBaseMenuItem from "./RouteBaseMenuItem.vue"
import type { RouteRecordRaw } from "vue-router";
defineProps<{
  route: RouteRecordRaw
}>()
</script>