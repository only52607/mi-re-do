<template>
    <div v-if="event.type == 'SentMessage'" id="item" style="flex-direction: row-reverse;">
        <user-avatar id="avatar" :user-id="event.botId" :nickname="event.bot.nickname" />
        <div id="bubble-and-name" style="text-align: right;">
            <div style="margin-right: 15px;">{{ event.bot.nickname }}</div>
            <chat-message-bubble-send
                @display-image="emitDisplayImage"
                :content="event.messageChain"
            ></chat-message-bubble-send>
        </div>
    </div>
    <div v-else id="item">
        <template v-if="event.type == 'FriendMessage'">
            <user-avatar id="avatar" :user-id="event.sender.id" :nickname="event.sender.nickname" />
            <div id="bubble-and-name">
                <div style="margin-left: 15px;">{{ event.sender.nickname }}</div>
                <chat-message-bubble-receive
                    @display-image="emitDisplayImage"
                    :content="event.messageChain"
                ></chat-message-bubble-receive>
            </div>
        </template>
        <template v-if="event.type == 'GroupMessage'">
            <user-avatar
                id="avatar"
                :user-id="event.sender.id"
                :nickname="event.sender.memberName"
            />
            <div id="bubble-and-name">
                <div style="margin-left: 15px;">
                    <member-tag :member="event.sender" />
                    {{ event.sender.memberName }}
                </div>
                <chat-message-bubble-receive
                    @display-image="emitDisplayImage"
                    :content="event.messageChain"
                ></chat-message-bubble-receive>
            </div>
        </template>
        <template v-if="event.type == 'TempMessage'">
            <user-avatar
                id="avatar"
                :user-id="event.sender.id"
                :nickname="event.sender.memberName"
            />
            <div id="bubble-and-name">
                <div style="margin-left: 15px;">{{ event.sender.memberName }}</div>
                <chat-message-bubble-receive
                    @display-image="emitDisplayImage"
                    :content="event.messageChain"
                ></chat-message-bubble-receive>
            </div>
        </template>
    </div>
</template>



<script setup lang="ts">
import { defineProps } from 'vue';
import UserAvatar from "@/components/info/UserAvatar.vue"
import ChatMessageBubbleReceive from "./ChatMessageBubbleReceive.vue"
import ChatMessageBubbleSend from "./ChatMessageBubbleSend.vue"
import type { Event } from 'mirai-reactivity-ws/dist/types/event';
import MemberTag from "@/components/info/MemberTag.vue"

defineProps<{
    event: Event
}>()
const emits = defineEmits<{
    (event: "display-image", url: string): void
}>()
function emitDisplayImage(url: string) {
    emits("display-image", url)
}
</script>


<style lang="less" scoped>
#item {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    #avatar {
        flex: 0 0 auto;
    }
    #bubble-and-name {
        flex: 1 1 auto;
    }
}
</style>