<template>
    <div id="item">
        <template v-if="event.type=='FriendMessage'">
            <user-avatar  id="avatar" :user-id="event.sender.id" :nickname="event.sender.nickname" />
            <div id="bubble-and-name">
                <div style="margin-left: 15px;"> {{ event.sender.nickname }}</div>
                <message-bubble @display-image="emitDisplayImage" :content="event.messageChain"> </message-bubble>
            </div>
        </template>
        <template v-if="event.type=='GroupMessage'">
            <user-avatar  id="avatar" :user-id="event.sender.id" :nickname="event.sender.memberName" />
            <div id="bubble-and-name">
                <div style="margin-left: 15px;">
                    <member-tag :member="event.sender" />
                    {{ event.sender.memberName }}
                </div>
                <message-bubble @display-image="emitDisplayImage" :content="event.messageChain"> </message-bubble>
            </div>
        </template>
        <template v-if="event.type=='TempMessage'">
            <user-avatar  id="avatar" :user-id="event.sender.id" :nickname="event.sender.memberName" />
            <div id="bubble-and-name">
                <div style="margin-left: 15px;"> {{ event.sender.memberName }}</div>
                <message-bubble @display-image="emitDisplayImage" :content="event.messageChain"> </message-bubble>
            </div>
        </template>
    </div>
</template>



<script setup lang="ts">
import { defineProps } from 'vue';
import UserAvatar from "@/components/info/UserAvatar.vue"
import MessageBubble from "./ChatMessageBubble.vue"
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
    padding: 10px;
    #avatar {
        flex: 0 0 auto
    }
    #bubble-and-name {
        flex: 1 1 auto
    }
}

</style>