<template>
  <div>
    {{ collapsed ? shortTitle : title }}
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue"
import config from "@/config"
defineProps<{
  collapsed: boolean
}>()
const { title, shortTitle } = config
</script>

<style>
</style>