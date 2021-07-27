<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 菜单
 * @Date: 2021-01-28 21:05:39
 * @LastEditTime: 2021-02-25 10:45:54
-->
<template>
  <a-menu  v-model:selectedKeys="selectedKeys">
    <template v-for="routeItem in flatternRoutes(routes)" >

      <!-- Show MenuItem -->
      <template v-if="!routeItem.children || routeItem.children.length == 0">
        <route-base-menu-item :route="routeItem" :key="routeItem.meta?.fullPath"/>
      </template>

      <!-- Show SubMenu -->
      <template v-else>
        <route-base-sub-menu :route="routeItem" :key="routeItem.meta?.fullPath"/>
      </template>
      
    </template>
  </a-menu>
</template>


<script setup="" lang="ts">
import { watch, defineProps } from "vue"
import RouteBaseSubMenu from "./RouteBaseSubMenu.vue"
import RouteBaseMenuItem from "./RouteBaseMenuItem.vue"
import { routes, flatternRoutes } from "@/router"
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps<{
  routes: Array<RouteRecordRaw>,
  currentRoute: any
}>()
const route = props.currentRoute!
ref: selectedKeys = [route.path] as string[];
watch(() => route.path,() => {
  selectedKeys = [route.path]
})

</script>