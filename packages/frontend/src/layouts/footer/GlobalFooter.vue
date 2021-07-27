<template>
  <a-layout-footer style="text-align: center">
      {{ copyright }}
  </a-layout-footer>
</template>
<script setup lang="ts">
import config from "@/config"
const { copyright } = config
</script>