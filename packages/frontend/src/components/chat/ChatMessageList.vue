<template>
    <div id="chat-list">
        <template v-for="event in session.events">
            <chat-message-list-item @display-image="displayImage" :event="event"></chat-message-list-item>
        </template>
        <image-modal
            :visible="imageModalVisible"
            title="查看图片"
            :image-url="imageUrl"
            @update:visible="(value) => imageModalVisible = value"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps, nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import type { Session } from '@/use';
import ChatMessageListItem from "./ChatMessageListItem.vue"
import ImageModal from "@/components/modal/ImageModal.vue"
const imageModalVisible = ref(false)
const imageUrl = ref("")

const props = defineProps<{
    session: Session
    scrollToButtom: boolean
}>()

const emits = defineEmits<{
    (event: 'update:scroll-to-buttom', value: boolean): void
}>()

function executeScrollToButtom() {
    const chatListNode = document.getElementById('chat-list')
    if (!chatListNode) return
    chatListNode.scrollTop = chatListNode.scrollHeight
}

function checkAndScroll() {
    if (props.scrollToButtom) {
        executeScrollToButtom()
    }
}

watchEffect(() => {
    checkAndScroll()
})

watch(() => props.session.events.length, () => {
    nextTick(() => {
        checkAndScroll()
    })
})

onMounted(() => {
    checkAndScroll()
    const chatListNode = document.getElementById('chat-list')
    if (!chatListNode) return
    chatListNode.onscroll = () => {
        emits("update:scroll-to-buttom", Math.abs(chatListNode.scrollHeight - chatListNode.scrollTop - chatListNode.clientHeight) < 1)
    }
})

function displayImage(url: string) {
    imageUrl.value = url
    imageModalVisible.value = true
}

</script>


<style lang="less" scoped>
#chat-list {
    overflow: auto;
    height: 100%;
}
</style>