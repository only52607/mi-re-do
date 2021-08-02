<template>
    <div id="main">
        <div id="left">
            <session-list
                id="left-content"
                :session-list="sessionList"
                v-model:selectedKeys="selectedKeys"
                :inline-collapsed="sessionListCollapsed"
                @select="scrollChatListToButtom = true"
            />
        </div>
        <div id="right">
            <chat-screen
                @send="handleSendClick"
                :session="selectedSession"
                v-model:pending-text="pendingText"
                v-model:scroll-to-buttom="scrollChatListToButtom"
            >
                <template #backIcon>
                    <menu-switch v-model:collapsed="sessionListCollapsed" />
                </template>
                <template #headerExtra>
                    <a-popover placement="bottom" trigger="click">
                        <template #content>
                            <a-menu :selectable="false">
                                <a-menu-item>
                                    <span @click="handleRemoveSession">删除此会话</span>
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button type="text" class="more-button">
                            <template #icon>
                                <menu-outlined />
                            </template>
                        </a-button>
                    </a-popover>
                </template>
                <template #title="{ session }">
                    <div
                        @click="switchExtraDrawer"
                        class="session-title"
                    >{{ getSessionTitle(session) }}</div>
                </template>
                <template #subTitle="{ session }">{{ getSessionSubTitle(session) }}</template>
                <template #content="{ session }">
                    <a-drawer
                        placement="right"
                        :closable="true"
                        :visible="drawerVisible"
                        :get-container="false"
                        :wrap-style="{ position: 'absolute' }"
                        @close="drawerVisible = false"
                        :width="500"
                    >
                        <user-description
                            v-if="session.type == 'friend'"
                            :user-id="session.contact.id"
                            :profile="currentUserProfile"
                        />
                        <member-list
                            v-if="session.type == 'group'"
                            @goto-temp-session="gotoTempSession"
                            :member-list="currentMemberList"
                            :loading="memberListLoading"
                            :grid="{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 1 }"
                        ></member-list>
                        <member-desciption v-if="session.type == 'temp'" :member="currentMember" />
                    </a-drawer>
                </template>
            </chat-screen>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, createVNode } from "vue";
import type { ComputedRef, Ref } from "vue";
import SessionList from "@/components/list/SessionList.vue"
import { findSessionInSessionListByIdentityString, sessionIdentityEquals, useCurrentSessionIdentity, useSessionList, pushEmptySession } from "@/use/session";
import type { Session } from "@/use/session";
import type { SessionIdentity } from "@/use/session";
import ChatScreen from "./ChatScreen.vue"
import { useMiraiApi, messageBuilder, useBotProfile, useFriendProfile, useMemberList } from "mirai-reactivity-ws";
import type { Member } from "mirai-reactivity-ws"
import type { MessageChain, MessageReceipt, BotProfile } from "mirai-reactivity-ws";
import { message } from "ant-design-vue";
import { useConnectionInfo } from "@/use";
import { sessionIdentityAsString } from '@/use/session';
import { useRoute, useRouter } from "vue-router";
import { MenuOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import UserDescription from '@/components/info/UserDescription.vue';
import MemberList from "@/components/list/MemberList.vue"
import MemberDesciption from "@/components/info/MemberDesciption.vue"

const sessionList = useSessionList()
const { botProfile } = useBotProfile()
const connectionInfo = useConnectionInfo()
const route = useRoute()
const router = useRouter()
const selectedKeys = ref([] as string[])
const sessionListCollapsed = ref(false)
const pendingText = ref("")
const miraiApi = useMiraiApi()
const scrollChatListToButtom = ref(true)
const drawerVisible = ref(false)
const currentSessionIdentity = useCurrentSessionIdentity()

function switchSessionFromRoute() {
    if (route.query["sessionIdentityString"]) {
        selectedKeys.value = [route.query["sessionIdentityString"] as string]
        drawerVisible.value = false
    }
}

onMounted(() => switchSessionFromRoute())

watch(() => route.query, () => switchSessionFromRoute())

const selectedSession: ComputedRef<Session | undefined> = computed(() => {
    if (selectedKeys.value.length == 0) return;
    const { session } = findSessionInSessionListByIdentityString(selectedKeys.value[0])
    if (session) {
        session.unreadCount = 0
    }
    currentSessionIdentity.value = session?.identity
    return session
})

const getSessionTitle = (session: Session) => {
    switch (session.type) {
        case "friend":
            return session.contact.nickname
        case "temp":
            return session.contact.memberName
        case "group":
            return session.contact.name
    }
}

const getSessionSubTitle = (session: Session) => session.contact.id

async function executeSend(messageChain: MessageChain) {
    if (selectedSession.value == undefined || miraiApi.value == undefined) return
    let receipt: MessageReceipt
    switch (selectedSession.value.type) {
        case "friend":
            receipt = await miraiApi.value.sendFriendMessage(messageChain, selectedSession.value.contact.id)
            break
        case "group":
            receipt = await miraiApi.value.sendGroupMessage(messageChain, selectedSession.value.contact.id)
            break
        case "temp":
            receipt = await miraiApi.value.sendTempMessage(messageChain, selectedSession.value.contact.id, selectedSession.value.contact.group.id)
            break
    }
    if (!receipt) throw Error("unknown session type")
    miraiApi.value.emitEvent({
        type: "SentMessage",
        receipt: receipt,
        bot: { ...(botProfile.value as BotProfile), id: connectionInfo.value?.authentication.qq ?? 0},
        messageChain: messageChain,
        targetType: selectedSession.value.type as any,
        target: selectedSession.value.contact as any
    })
}

async function handleSendClick(messageChain: MessageChain) {
    if (miraiApi.value == undefined || selectedSession.value == undefined) {
        message.error("未就绪")
        return
    }
    try {
        const receipt = await executeSend(messageChain)
        pendingText.value = ""
        scrollChatListToButtom.value = true
    } catch {
        message.error("消息发送失败")
    }
}

function removeCurrentSession() {
    if (selectedSession.value == undefined) return
    const index = sessionList.value.findIndex((session) => sessionIdentityEquals(session.identity, selectedSession.value!.identity))
    if (index < 0) return
    selectedKeys.value = []
    sessionList.value.splice(index, 1)
    message.success("已删除")
}

function handleRemoveSession() {
    Modal.confirm({
        title: '确认删除该聊天以及该聊天的所有聊天记录?',
        icon: createVNode(ExclamationCircleOutlined),
        content: '此操作不可逆!',
        onOk() {
            removeCurrentSession()
        },
    });
}

const currentUserId: Ref<number | undefined> = ref()
const { profile: currentUserProfile } = useFriendProfile(currentUserId)

const currentGroupId: Ref<number | undefined> = ref()
const { members: currentMemberList, state: memberListState } = useMemberList(currentGroupId)
const memberListLoading = computed(() => memberListState.value != 'done')

const currentMember: Ref<Member | undefined> = ref()

function switchExtraDrawer() {
    if (!selectedSession.value) return
    if (drawerVisible.value) {
        drawerVisible.value = false
        return
    }
    switch (selectedSession.value.type) {
        case "friend":
            currentUserId.value = selectedSession.value.contact.id
            break;
        case "group":
            currentGroupId.value = selectedSession.value.contact.id
            break;
        case "temp":
            currentMember.value = selectedSession.value.contact
            break;
    }
    drawerVisible.value = true
}

function gotoTempSession(member: Member) {
    pushEmptySession("temp", member)
    router.push({ name: "session", query: { sessionIdentityString: sessionIdentityAsString([member.id, "temp"]) } })
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
        flex: 1 1 0;
        width: 0;
        height: 100%;
        .more-button {
            font-size: 18px;
        }
    }
}

.session-title {
    cursor: pointer;
}
</style>