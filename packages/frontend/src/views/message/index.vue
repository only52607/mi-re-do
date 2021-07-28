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
            <chat-screen v-model:session-list-collapsed="sessionListCollapsed" :session="selectedSession" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import SessionList from "@/components/list/SessionList.vue"
import { sessionIdentityEquals, useSessionList } from "@/use/session";
import type { SessionIdentity } from "@/use/session";
import ChatScreen from "./ChatScreen.vue"

const selectedKeys = ref([] as SessionIdentity[]);
const sessionList = useSessionList()
ref: sessionListCollapsed = false

const selectedSession = computed(() => {
    if (selectedKeys.value.length == 0) return;
    const selctedKey = selectedKeys.value[0]
    return sessionList.find((session) => sessionIdentityEquals(session.identity, selctedKey) )
})

</script>
    
<style lang="less" scoped>
#main {
    display: flex;
    width: 100%;
    height: 100%;
    #left {
        flex: 0 1 auto;
        height:100%; 
        overflow:auto; 
        background-color: white;
        #left-content {
            height:100%;
        }
    }
    #right {
        flex: 1 1 auto;
        height:100%;
    }
}

</style>