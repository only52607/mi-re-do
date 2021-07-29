<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-menu mode="inline">
        <a-empty v-if="sessionList.length == 0" />
        <template v-else>
            <a-menu-item id="session-item" v-for="(eventBox, i) in sessionList" :key="eventBox.identity">
                <template #icon>
                    <template v-if="eventBox.type == 'friend'">
                        <user-avatar
                            :user-id="eventBox.contact?.id ?? 0"
                            :nickname="eventBox.contact?.nickname ?? ''"
                        />
                    </template>
                    <template v-if="eventBox.type == 'group'">
                        <group-avatar
                            :group-id="eventBox.contact?.id ?? 0"
                            :group-name="eventBox.contact?.name ?? ''"
                        />
                    </template>
                    <template v-if="eventBox.type == 'temp'">
                        <user-avatar
                            :user-id="eventBox.contact?.id ?? 0"
                            :nickname="eventBox.contact?.memberName ?? ''"
                        />
                    </template>
                </template>
                <a-row>
                    <a-col :span="20">
                        <span id="session-name">
                            <template
                                v-if="eventBox.type == 'friend'"
                            >{{ eventBox.contact?.nickname }}</template>
                            <template v-if="eventBox.type == 'group'">{{ eventBox.contact?.name }}</template>
                            <template
                                v-if="eventBox.type == 'temp'"
                            >{{ eventBox.contact?.memberName }}</template>
                        </span>
                    </a-col>
                    <a-col :span="4">
                        <a-badge :overflow-count="999" :count="eventBox.unreadCount"></a-badge>
                    </a-col>
                </a-row>
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import UserAvatar from "@/components/info/UserAvatar.vue"
import GroupAvatar from "@/components/info/GroupAvatar.vue"
import type { SessionList } from '@/use/session';

defineProps<{
    sessionList: SessionList
}>()

document.oncontextmenu = (event) => {
    event.preventDefault();

    // el.style.display='block';
    // el.style.left=event.clientX+'px';
    // el.style.top=event.clientY+'px';

}

</script>
  
<style lang="less" scoped>
#session-name {
    overflow:hidden;
    text-overflow:ellipsis;
    -webkit-text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    white-space:nowrap;
}


</style>