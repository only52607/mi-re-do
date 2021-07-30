<template>
    <div class="content">
        <template v-for="item in content">
            <chat-message-content-item @display-image="emitDisplayImage" :message="item" />
        </template>
    </div>
</template>


<script setup lang="ts">
import type { MessageChain } from 'mirai-reactivity-ws';
import { defineProps } from 'vue';
import ChatMessageContentItem from "./ChatMessageContentItem.vue"
defineProps<{
    content: MessageChain
}>()
const emits = defineEmits<{
    (event: "display-image", url: string): void
}>()

function emitDisplayImage(url: string) {
    emits("display-image", url)
}

</script>


<style lang="less" scoped>
.content {
    background-color: #fff;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 5px;
    margin: 0px 0 0px 15px;
    position: relative;
    max-width: 80%;
    word-break: break-all;
}
.content::after {
    content: "";
    border: 8px solid #ffffff00;
    border-right: 8px solid #fff;
    position: absolute;
    top: 6px;
    left: -16px;
}
</style>