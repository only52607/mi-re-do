<template>
    <div id="main">
        <div id="left">
            <session-list
                id="left-content"
                :session-list="sessionList"
                v-model:selectedKeys="selectedKeys"
                :inline-collapsed="sessionListCollapsed"
            />
        </div>
        <div id="right">
            <chat-screen
                @send="handleSend"
                v-model:pending-text="pendingText"
                v-model:session-list-collapsed="sessionListCollapsed"
                :session="selectedSession"
                v-model:scrollToButtom = "scrollChatListToButtom"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import SessionList from "@/components/list/SessionList.vue"
import { sessionIdentityEquals, useSessionList } from "@/use/session";
import type { SessionIdentity } from "@/use/session";
import ChatScreen from "./ChatScreen.vue"
import { useMiraiApi, messageBuilder, useBotProfile } from "mirai-reactivity-ws";
import type { MessageChain, MessageReceipt, BotProfile } from "mirai-reactivity-ws";
import { message } from "ant-design-vue";
import { useConnectionInfo } from "@/use";

const selectedKeys = ref([] as SessionIdentity[]);
const sessionList = useSessionList()
ref: sessionListCollapsed = false
ref: pendingText = ""
ref: miraiApi = useMiraiApi()
const { botProfile } = useBotProfile()
ref: connectionInfo = useConnectionInfo()
ref: scrollChatListToButtom = true

const selectedSession = computed(() => {
    if (selectedKeys.value.length == 0) return;
    const selctedKey = selectedKeys.value[0]
    const session = sessionList.find((session) => sessionIdentityEquals(session.identity, selctedKey))
    if(session) {
        session.unreadCount = 0
    }
    return session
})

watch(() => selectedKeys.value,() => {
    scrollChatListToButtom = true
})

function buildMessage(type: "xml" | "json" | "text" | "message-chain", text: string): MessageChain | undefined {
    switch (type) {
        case "xml":
            return [messageBuilder.buildXml(text)]
        case "json":
            return [messageBuilder.buildApp(text)]
        case "text":
            return [messageBuilder.buildPlain(text)]
        case "message-chain":
            return JSON.parse(text) as MessageChain
    }
}

async function executeSend(messageChain: MessageChain): Promise<MessageReceipt | undefined> {
    if (selectedSession.value == undefined || miraiApi == undefined) return
    switch (selectedSession.value.type) {
        case "friend":
            return await miraiApi.sendFriendMessage(messageChain, selectedSession.value.contact.id)
        case "group":
            return await miraiApi.sendGroupMessage(messageChain, selectedSession.value.contact.id)
        case "temp":
            return await miraiApi.sendTempMessage(messageChain, selectedSession.value.contact.id, selectedSession.value.contact.group.id)
    }
}

async function handleSend(type: "xml" | "json" | "text" | "message-chain", text: string) {
    if (miraiApi == undefined) {
        message.error("连接未就绪")
        return
    }
    const messageChain = buildMessage(type, text)
    if (messageChain == undefined || selectedSession.value == undefined) return
    try {
        const receipt = await executeSend(messageChain)
        pendingText = ""
        miraiApi.emitEvent({
            type: "SentMessage",
            receipt: receipt,
            bot: botProfile.value as BotProfile,
            botId: connectionInfo?.authentication.qq ?? 0,
            messageChain: messageChain,
            targetType: selectedSession.value.type as any,
            target: selectedSession.value.contact as any
        })
        scrollChatListToButtom = true
    } catch {
        message.error("消息发送失败")
    }
}

</script>
    
<style lang="less" scoped>
#main {
    display: flex;
    width: 100%;
    height: 100%;
    #left {
        flex: 0 0 auto;
        height: 100%;
        overflow: auto;
        max-width: 200px;
        background-color: white;
        #left-content {
            height: 100%;
        }
    }
    #right {
        flex: 1 1 auto;
        height: 100%;
    }
}
</style>