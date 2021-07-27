<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-row type="flex" justify="center" style="height: 80%; overflow:auto;">
        <a-col :span="20">
            <a-list
                style="margin: 5px;"
                :loading="loading"
                :grid="{ gutter: 10, xs: 1, sm: 1, md: 4, lg: 4, xl: 6, xxl: 2 }"
                :data-source="memberList"
            >
                <template #renderItem="{ item: member }">
                    <a-list-item>
                        <a-popover trigger="click">
                            <template #content>
                                <p>{{ member.memberName }}</p>
                                <p> {{ member.permission=="OWNER" ? "群主" : member.permission=="MEMBER" ? "群成员" : "管理员" }} </p>
                                <a-divider></a-divider>
                                <a-button type="primary" key="send-message" ghost @click="onClickSendMessageButton">发消息</a-button>
                            </template>
                            <a-card :hoverable="true">
                                <div style="display: flex;">
                                    <a-avatar style="margin: 0px auto;">{{ member.memberName }}</a-avatar>
                                </div>
                                <a-divider></a-divider>
                                <div style="overflow: hidden;">
                                    <span
                                        style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;"
                                    >
                                    <a-tag v-if="member.permission=='OWNER'" color="orange">群主</a-tag>
                                    <a-tag v-if="member.permission=='ADMINISTRATOR'" color="green">管理员</a-tag>
                                    <a-tag v-if="member.specialTitle != undefined && member.specialTitle.length>0" color="blue"> {{ member.specialTitle }}</a-tag>
                                    {{ member.memberName }}
                                    </span>
                                </div>
                            </a-card>
                        </a-popover>
                    </a-list-item>
                </template>
            </a-list>
        </a-col>
    </a-row>

    <a-divider></a-divider>

    <a-row type="flex" justify="center" style="height: 20%;">
        <a-col :span="6">
            <a-button type="primary" key="send-message" @click="onClickSendMessageButton">发消息</a-button>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Member } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';

defineProps<{
    memberList: Optional<Member[]>,
    loading: boolean
}>()

function onClickSendMessageButton() {

}

</script>
  
<style lang="less">
</style>