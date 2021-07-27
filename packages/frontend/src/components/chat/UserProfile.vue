<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
    <a-spin v-if="loading || !profile" />
    <template v-else>
        <a-card :loading="loading">
            <template #cover>
                <!-- <div style="height: 100px;">
                    <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    style="width: 100%;"
                />
                </div> -->
            </template>
            <a-card-meta :title="profile.nickname" :description="profile.sign">
                <template #avatar>
                    <a-avatar>{{ profile.nickname }}</a-avatar>
                </template>
            </a-card-meta>
            <a-divider></a-divider>
            <a-row>
                <a-col :span="20">
                    <a-descriptions>
                        <a-descriptions-item
                            label="ID"
                            span="24"
                        >{{ id }}</a-descriptions-item>
                        <a-descriptions-item
                            label="性别"
                            span="24"
                        >{{ profile.sex == "FEMALE" ? "女" : profile.sex == "MALE" ? "男" : "未知" }}</a-descriptions-item>
                        <a-descriptions-item label="等级" span="24">{{ profile.level }}</a-descriptions-item>
                        <a-descriptions-item label="年龄" span="24">{{ profile.age }}</a-descriptions-item>
                        <a-descriptions-item label="邮箱" span="24">{{ profile.email }}</a-descriptions-item>
                    </a-descriptions>
                </a-col>
            </a-row>

            <a-divider></a-divider>

            <a-row type="flex" justify="center">
                <a-col :span="6">
                    <a-button
                        type="primary"
                        key="send-message"
                        @click="onClickSendMessageButton"
                    >发消息</a-button>
                </a-col>
            </a-row>
        </a-card>
    </template>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type { UserProfile } from "mirai-reactivity-ws"
import type { Optional } from '@/types/utility';

const props = defineProps<{
    profile: Optional<UserProfile>,
    id: number
    loading: boolean
}>()

const emit = defineEmits(["send-message"])
function onClickSendMessageButton() {
    emit("send-message")
}

</script>
  
<style lang="less">
</style>