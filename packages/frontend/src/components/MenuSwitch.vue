<template>
  <menu-unfold-outlined v-if="collapsed" class="trigger" @click="$emit('update:collapsed', false)" />
  <menu-fold-outlined v-else class="trigger" @click="$emit('update:collapsed', true)" />
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { defineProps } from 'vue';
defineProps({
  collapsed: Boolean
})
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>