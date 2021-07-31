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
                    <template #extra="{ session }">
                        <slot name="headerExtra" :session="session"></slot>
                    </template>
                    <template #title="{ session }">
                        <slot name="title" :session="session"></slot>
                    </template>
                    <template #subTitle="{ session }">
                        <slot name="subTitle" :session="session"></slot>
                    </template>
                </session-header>
            </div>
            <div id="content">
                <div id="chat-message-area">
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
                <div id="send-area" justify="end" style="padding: 5px;">
                    <a-dropdown-button @click="emitSendEvent('text')" type="primary">
                        发送
                        <template #overlay>
                            <a-menu>
                                <a-menu-item
                                    key="message-chain"
                                    @click="emitSendEvent('message-chain')"
                                >以MessageChain标准形式发送</a-menu-item>
                                <a-menu-item key="xml" @click="emitSendEvent('xml')">以XML消息发送</a-menu-item>
                                <a-menu-item key="json" @click="emitSendEvent('json')">以JSON消息发送</a-menu-item>
                            </a-menu>
                        </template>
                        <template #icon>
                            <down-outlined />
                        </template>
                    </a-dropdown-button>
                </div>
                <slot name="content" :session="session"></slot>
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
import { messageBuilder } from "mirai-reactivity-ws";
import type { MessageChain } from "mirai-reactivity-ws";

const props = defineProps<{
    session: Optional<Session>,
    pendingText: string,
    scrollToButtom: boolean
}>()

const emits = defineEmits<{
    (event: 'send', content: MessageChain): void
    (event: 'update:pending-text', text: string): void
    (event: 'update:scroll-to-buttom', value: boolean): VideoFacingModeEnum
}>()

const emitUpdatePendingText = (text: string) => emits('update:pending-text', text)
const emitUpdateScrollToButtom = (value: boolean) => emits('update:scroll-to-buttom', value)

function buildMessage(type: "xml" | "json" | "text" | "message-chain", text: string): MessageChain | undefined {
    switch (type) {
        case "xml":
            return [messageBuilder.buildXml(text)]
        case "json":
            return [messageBuilder.buildApp(text)]
        case "text":
            return [messageBuilder.buildPlain(text)]
        case "message-chain":
            const result = JSON.parse(text)
            if (result instanceof Array) return result as MessageChain
            return [result] as MessageChain
    }
}

function emitSendEvent(type: "xml" | "json" | "text" | "message-chain") {
    const messageChain = buildMessage(type, props.pendingText)
    if (!messageChain) return
    emits("send", messageChain)
}

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
    #content {
        flex: 1 1 0;
        height: 0;
        display: flex;
        flex-flow: column;
        position: relative;
        overflow: hidden;
        #chat-message-area {
            flex: 1 1 0;
            height: 0;
        }
        #input-area {
            flex: 0 1 auto;
            padding-left: 2px;
            padding-right: 2px;
        }
        #send-area {
            display: flex;
            flex-flow: row-reverse;
            width: 100%;
            flex: 0 1 auto;
        }
    }
}
</style>