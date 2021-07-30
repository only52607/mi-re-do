<template>
    <div :class="{ content: true, multi: !isPureImageMessage }">
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
    content: MessageChain
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

</script>


<style lang="less" scoped>
.content {
    background-color: #fff;
    // padding: 5px 8px;
    display: inline-block;
    border-radius: 5px;
    margin: 0px 0 0px 15px;
    position: relative;
    max-width: 80%;
    word-break: break-all;
}

.multi {
    padding: 5px 8px;
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