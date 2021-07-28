<template>
    <div id="list">
        <template v-for="event in session.events">
            <chat-message-list-item  @display-image="displayImage" :event="event"  >
            </chat-message-list-item>
        </template>
        <image-modal :visible="imageModalVisible" title="查看图片" :image-url="imageUrl" @update:visible="(value) => imageModalVisible = value" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { Session } from '@/use';
import ChatMessageListItem from "./ChatMessageListItem.vue"
import ImageModal from "@/components/modal/ImageModal.vue"
const imageModalVisible = ref(false)
const imageUrl = ref("")

defineProps<{
    session: Session
}>()

function displayImage(url: string) {
    imageUrl.value = url
    imageModalVisible.value = true
}

</script>


<style lang="less" scoped>
#list {
    overflow: scroll;
    height: 100%;
}
</style>