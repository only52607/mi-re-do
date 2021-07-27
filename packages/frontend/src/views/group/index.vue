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
            <member-screen :member-list="members" :loading="memberlistState!='done'"></member-screen>
        </a-col>
    </a-row>
</template>
    
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import GroupList from "@/components/chat/GroupList.vue"
import { useMemberList, useGroups } from "mirai-reactivity-ws";
import MemberScreen from "@/components/chat/MemberScreen.vue"

const selectedKeys = ref([]);
const { groups, state: groupsState } = useGroups();
const selectedGroupId = computed(() => {
    if (!groups || selectedKeys.value.length == 0) return 0;
    return selectedKeys.value[0]
});
const { members, state: memberlistState, emitUpdate } = useMemberList(selectedGroupId);
onMounted(() => emitUpdate())

</script>
    
    <style>
</style>