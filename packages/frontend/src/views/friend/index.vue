<template>
<a-row style="height:100%;">
    <a-col :span="8" style="height:100%; overflow:auto; background-color: white;">
      <friend-list :loading="friendsState!='done'" style="height:100%;" :friend-list="friends" v-model:selectedKeys="selectedKeys" />
    </a-col>
    <a-col :span="16" style="height:100%; overflow:auto;">
    <friend-details @send-friend-message="sendFriendMessage" :friend="selectedFriend" :loading="profileState!='done'" :profile="profile" style="width:100%; height:100%;" />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import FriendList from "@/components/list/FriendList.vue"
import { useFriendProfile, useFriends } from "mirai-reactivity-ws";
import type { Friend } from "mirai-reactivity-ws";
import FriendDetails from "@/views/friend/FriendDetails.vue"
import { pushEmptySession } from "@/use/session";
import { useRouter } from "vue-router";

const router = useRouter()
const selectedKeys = ref([]);
const { friends, state: friendsState } = useFriends();
const selectedFriendId = computed(() => {
  if (!friends.value || selectedKeys.value.length == 0) return 0;
  return selectedKeys.value[0]
});
const selectedFriend = computed(() => {
  if (!friends.value || selectedKeys.value.length == 0) return;
  return friends.value.find((friend) => friend.id == selectedFriendId.value)
});
const { profile, state: profileState, emitUpdate } = useFriendProfile(selectedFriendId);

onMounted(() => emitUpdate())

function sendFriendMessage(type: "friend", contact: Friend) {
    pushEmptySession(type, contact)
    router.push({name: "message"})
}

</script>

<style>
</style>