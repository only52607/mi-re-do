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
                <a-page-header
                    v-if="session.type == 'friend'"
                    :title="session.contact.nickname"
                    :sub-title="session.contact.id"
                    style="background:#fff;"
                    @back="() => { }"
                >
                    <template #backIcon>
                        <menu-switch
                            :collapsed="sessionListCollapsed"
                            @update:collapsed="(value) => $emit('update:sessionListCollapsed', value)"
                        />
                    </template>
                </a-page-header>
                <a-page-header
                    v-else-if="session.type == 'group'"
                    :title="session.contact.name"
                    :sub-title="session.contact.id"
                    style="background:#fff;"
                    @back="() => { }"
                >
                    <template #backIcon>
                        <menu-switch
                            :collapsed="sessionListCollapsed"
                            @update:collapsed="(value) => $emit('update:sessionListCollapsed', value)"
                        />
                    </template>
                </a-page-header>
                <a-page-header
                    v-else-if="session.type == 'temp'"
                    :title="session.contact.memberName"
                    :sub-title="session.contact.id"
                    style="background:#fff;"
                    @back="() => { }"
                >
                    <template #backIcon>
                        <menu-switch
                            :collapsed="sessionListCollapsed"
                            @update:collapsed="(value) => $emit('update:sessionListCollapsed', value)"
                        />
                    </template>
                </a-page-header>
            </div>
            <div id="chat-message-row">
                <chat-message-list :session="session" />
            </div>
            <div id="input-area">
                <a-textarea
                    v-model:value="pendingText"
                    placeholder="发送消息"
                    :auto-size="{ minRows: 2, maxRows: 4 }"
                />
            </div>
            <div id="send-row" justify="end" style="padding: 5px;">
                <a-dropdown-button type="primary">
                    发送
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="xml">以XML消息发送
                            </a-menu-item>
                            <a-menu-item key="app">以JSON消息发送
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <template #icon><down-outlined /></template>
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

ref: pendingText = ""

defineProps<{
    session: Optional<Session>,
    sessionListCollapsed: boolean
}>()

function onClickSendMessageButton() {

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