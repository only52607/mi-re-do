<template>
    <div :class="{ receive: !isSend, send: isSend , multi: !isPureImageMessage }">
        <a-tag v-if="isUndefineMessage"> 不支持的消息 </a-tag>
        <template v-for="item in content">
            <chat-message-content-item @display-image="emitDisplayImage" :message="item" />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { MessageChain } from 'mirai-reactivity-ws';
import { computed, defineProps } from 'vue';
import ChatMessageContentItem from "./ChatMessageContentItem.vue"
const props = defineProps<{
    content: MessageChain,
    isSend?: boolean
}>()
const emits = defineEmits<{
    (event: "display-image", url: string): void
}>()

function emitDisplayImage(url: string) {
    emits("display-image", url)
}

const isPureImageMessage = computed(() => {
    if (props.content.length != 2) return false
    const secondMessageType = props.content[1].type
    return secondMessageType == "Image"
})

const isUndefineMessage = computed(() => {
    if (props.content.length != 1) return false
    return props.content[0].type == "Source"
})

</script>


<style lang="less" scoped>
.receive {
    background-color: #fff;
    display: inline-block;
    border-radius: 5px;
    margin: 0px 0 0px 15px;
    position: relative;
    max-width: 80%;
    word-break: break-all;
}

.send {
    background-color: lighten(@primary-color, 4%);
    display: inline-block;
    border-radius: 5px;
    margin: 0px 15px 0px 0px;
    position: relative;
    color: #fff;
    max-width: 80%;
    word-break: break-all;
}

.receive::after {
    content: "";
    border: 8px solid #ffffff00;
    border-right: 8px solid #fff;
    position: absolute;
    top: 6px;
    left: -16px;
}

.send::after {
    content: "";
    border: 8px solid #ffffff00;
    border-left: 8px solid lighten(@primary-color, 4%);
    position: absolute;
    top: 6px;
    right: -16px;
}

.multi {
    padding: 5px 8px;
}

</style>