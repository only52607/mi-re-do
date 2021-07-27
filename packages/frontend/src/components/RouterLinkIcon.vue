<template>
    <template v-if="icon != null">
        <component :is="icon"  />
    </template>
    <span>{{ text }}</span>
    <template v-if="to != null"> 
        <router-link :to="to" /> 
    </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  icon: Function,
  text: String,
  to: String
})

</script>