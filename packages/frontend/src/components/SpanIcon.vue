<template>
  <span>
    <template v-if="icon != null">
        <component :is="icon"  />
    </template>
    <span>{{ text }}</span>
  </span>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';
defineProps({
  icon: Function,
  text: String
})

</script>