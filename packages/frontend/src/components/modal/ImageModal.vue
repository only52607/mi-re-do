<script setup lang="ts">
import { defineEmits, defineProps } from "@vue/runtime-core";

defineProps<{
    visible: boolean,
    imageUrl: string
}>()
const emit = defineEmits(["changeTitle", "update:visible"])
function handleTitleChange(newTitle: string, oldTitle: string) {
    emit("changeTitle", newTitle, oldTitle)
}
</script>

<template>
    <a-modal
        v-bind="$attrs"
        :visible="visible"
        :footer="null"
        @cancel="() => $emit('update:visible', false)"
    >
        <img alt="example" style="width: 100%" :src="imageUrl" />
    </a-modal>
</template>