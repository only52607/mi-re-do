<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-empty v-if="!session" style="height:100%" />
    <template v-else>
        <div id="main">
            <div id="header">
                <session-header :session="session">
                    <template #backIcon>
                        <slot name="backIcon"></slot>
                    </template>
                </session-header>
            </div>
            <div id="chat-message-row">
                <chat-message-list
                    :scroll-to-buttom="scrollToButtom"
                    @update:scrollToButtom="emitUpdateScrollToButtom"
                    :session="session"
                />
            </div>
            <div id="input-area">
                <a-textarea
                    :value="pendingText"
                    placeholder="发送消息"
                    :auto-size="{ minRows: 2, maxRows: 4 }"
                    @update:value="emitUpdatePendingText"
                />
            </div>
            <div id="send-row" justify="end" style="padding: 5px;">
                <a-dropdown-button @click="$emit('send', 'text', pendingText)" type="primary">
                    发送
                    <template #overlay>
                        <a-menu>
                            <a-menu-item
                                key="message-chain"
                                @click="$emit('send', 'message-chain', pendingText)"
                            >以MessageChain标准形式发送</a-menu-item>
                            <a-menu-item
                                key="xml"
                                @click="$emit('send', 'xml', pendingText)"
                            >以XML消息发送</a-menu-item>
                            <a-menu-item
                                key="json"
                                @click="$emit('send', 'json', pendingText)"
                            >以JSON消息发送</a-menu-item>
                        </a-menu>
                    </template>
                    <template #icon>
                        <down-outlined />
                    </template>
                </a-dropdown-button>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Optional } from '@/types/utility';
import type { Session } from '@/use';
import ChatMessageList from "@/components/chat/ChatMessageList.vue"
import { DownOutlined } from '@ant-design/icons-vue';
import SessionHeader from "./SessionHeader.vue"

defineProps<{
    session: Optional<Session>,
    pendingText: string,
    scrollToButtom: boolean
}>()

const emits = defineEmits<{
    (event: 'send', type: "text" | "xml" | "json" | "message-chain", text: string): void
    (event: 'update:pending-text', text: string): void
    (event: 'update:scroll-to-buttom', value: boolean): VideoFacingModeEnum
}>()

const emitUpdatePendingText = (text: string) => emits('update:pending-text', text)
const emitUpdateScrollToButtom = (value: boolean) => emits('update:scroll-to-buttom', value)

</script>

<style lang="less" scoped>
#main {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    #header {
        flex: 0 1 auto;
    }
    #chat-message-row {
        flex: 1 0 0;
        height: 0px;
    }
    #input-area {
        flex: 0 1 auto;
        padding-left: 2px;
        padding-right: 2px;
    }
    #send-row {
        display: flex;
        flex-flow: row-reverse;
        width: 100%;
        flex: 0 1 auto;
    }
}
</style>