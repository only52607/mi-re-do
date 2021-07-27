<template>
<a-row style="height:100%;">
    <a-col :span="8" style="height:100%; overflow:auto; background-color: white;">
      <friend-list :loading="friendsState!='done'" style="height:100%;" :friend-list="friends" v-model:selectedKeys="selectedKeys" />
    </a-col>
    <a-col :span="16" style="height:100%; overflow:auto;">
    <user-profile :id="selectedFriendId" :loading="profileState!='done'" :profile="profile" style="width:100%; height:100%;" ></user-profile>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import FriendList from "@/components/chat/FriendList.vue"
import { useFriendProfile, useFriends, useMiraiApi } from "mirai-reactivity-ws";
import UserProfile from "@/components/chat/UserProfile.vue"

const selectedKeys = ref([]);
const { friends, state: friendsState } = useFriends();
const selectedFriendId = computed(() => {
  if (!friends || selectedKeys.value.length == 0) return 0;
  return selectedKeys.value[0]
});
const { profile, state: profileState, emitUpdate } = useFriendProfile(selectedFriendId);

onMounted(() => emitUpdate())

</script>

<style>
</style>