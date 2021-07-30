<template>
    <a-row style="height:100%;">
        <a-col :span="8" style="height:100%; overflow:auto; background-color: white;">
            <group-list
                :loading="groupsState!='done'"
                style="height:100%;"
                :group-list="groups"
                v-model:selectedKeys="selectedKeys"
            />
        </a-col>
        <a-col :span="16" style="height:100%;">
            <member-details 
                @send-temp-message="sendTempMessage"
                @send-group-message="sendGroupMessage"
                :group="group" 
                :member-list="members" 
                :loading="memberlistState!='done'" 
            />
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import GroupList from "@/components/list/GroupList.vue"
import { useMemberList, useGroups } from "mirai-reactivity-ws";
import MemberDetails from "@/views/group/MemberDetails.vue"
import { pushEmptySession, sessionIdentityEquals, useSessionList } from "@/use/session";
import { useRouter } from "vue-router";
import type { Member, Group } from "mirai-reactivity-ws"

const router = useRouter()
const selectedKeys = ref([]);
const { groups, state: groupsState } = useGroups();
const selectedGroupId = computed(() => {
    if (!groups || selectedKeys.value.length == 0) return;
    return selectedKeys.value[0]
});
const group = computed(() => { 
    if (!selectedGroupId || !groups.value) return;
    return groups.value.find((group) =>  group.id == selectedGroupId.value )
})
const { members, state: memberlistState, emitUpdate } = useMemberList(selectedGroupId);
onMounted(() => emitUpdate())

function sendGroupMessage(type: "group", contact: Group) {
    pushEmptySession(type, contact)
    router.push({name: "message"})
}

function sendTempMessage(type: "temp", contact: Member) {
    pushEmptySession(type, contact)
    router.push({name: "message"})
}


</script>
    
<style>
</style>