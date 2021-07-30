<template>
    <a-row style="height:100%;">
        <a-col :span="8" style="height:100%; overflow:auto; background-color: white;">
            <group-list
                :loading="groupsState != 'done'"
                style="height:100%;"
                :group-list="groups"
                v-model:selectedKeys="selectedKeys"
            />
        </a-col>
        <a-col :span="16" style="height:100%;">
            <member-details
                @goto-group-session="gotoGroupSession"
                @goto-temp-session="gotoTempSession"
                :group="selectedGroup"
                :member-list="members"
                :loading="memberlistState != 'done'"
            />
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import GroupList from "@/components/list/GroupList.vue"
import { useMemberList, useGroups } from "mirai-reactivity-ws";
import MemberDetails from "@/views/group/MemberDetails.vue"
import { pushEmptySession, sessionIdentityEquals, sessionIdentityAsString } from "@/use/session";
import { useRouter } from "vue-router";
import type { Member, Group } from "mirai-reactivity-ws"

const router = useRouter()
const selectedKeys = ref([]);
const { groups, state: groupsState } = useGroups();
const selectedGroupId = computed(() => {
    if (!groups || selectedKeys.value.length == 0) return;
    return selectedKeys.value[0]
});
const selectedGroup = computed(() => {
    if (!selectedGroupId || !groups.value) return;
    return groups.value.find((group) => group.id == selectedGroupId.value)
})
const { members, state: memberlistState, emitUpdate } = useMemberList(selectedGroupId);
onMounted(() => emitUpdate())

function gotoGroupSession() {
    if (!selectedGroup.value) return
    pushEmptySession("group", selectedGroup.value)
    router.push({ name: "message", query: { sessionIdentityString: sessionIdentityAsString([selectedGroup.value.id, "group"]) } })
}

function gotoTempSession(contact: Member) {
    pushEmptySession("temp", contact)
    router.push({ name: "message", query: { sessionIdentityString: sessionIdentityAsString([contact.id, "temp"]) } })
}

</script>
    
<style>
</style>