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
    background-color: lighten(@primary-color, 4%);
    padding: 5px 8px;
    display: inline-block;
    border-radius: 5px;
    margin: 0px 15px 0px 0px;
    position: relative;
    color: #fff;
}
.content::after {
    content: "";
    border: 8px solid #ffffff00;
    border-left: 8px solid lighten(@primary-color, 4%);
    position: absolute;
    top: 6px;
    right: -16px;
}
</style>