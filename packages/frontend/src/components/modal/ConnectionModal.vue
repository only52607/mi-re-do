<template>
    <a-modal title="连接到 MiraiConsole" v-bind="$attrs" :visible="visible" :footer="null">
        <a-form :rules="rules" :model="connectionForm" ref="formRef">
            <a-form-item label="通道">
                <a-input v-model:value="connectionForm.host">
                    <template #addonBefore>ws://</template>
                    <template #addonAfter>
                        <a-select v-model:value="connectionForm.channel">
                            <a-select-option value="all">all</a-select-option>
                            <a-select-option value="message">message</a-select-option>
                            <a-select-option value="event">event</a-select-option>
                        </a-select>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Verify Key">
                <a-input v-model:value="connectionForm.verifyKey"></a-input>
            </a-form-item>
            <a-form-item label="QQ">
                <a-input v-model:value="connectionForm.qq"></a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" :loading="connecting" @click="onClickConnect">连接</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, reactive } from "@vue/runtime-core";
import { message } from "ant-design-vue";
import { ref } from "vue";
import type { MiraiWsConnectParams } from "mirai-reactivity-ws";

const props = defineProps<{
    visible: boolean,
    connecting: boolean,
    connectionInfo: MiraiWsConnectParams
}>()

const emit = defineEmits<{
    (event: "connect", params: any): void
}>()

const formRef = ref();

const addressParts = props.connectionInfo?.address?.match(/ws:\/\/(.+)\/(all|message|event)/)

const connectionForm = reactive({
    host: addressParts?.[1] ?? "127.0.0.1:8082",
    channel: addressParts?.[2] ?? "all",
    verifyKey: props.connectionInfo?.authentication?.verifyKey ?? "1234567890",
    qq: props.connectionInfo?.authentication?.qq?.toString() ?? ""
})

const rules = {
    verifyKey: [
        { required: true, message: '请输入Verify Key', trigger: 'blur' },
    ],
    qq: [
        { required: true, message: '请输入QQ号', trigger: 'blur' },
        { min: 1, max: 30, message: '请输入正确的QQ号', trigger: 'blur' },
    ],
};

function onClickConnect() {
    if (connectionForm.channel.length == 0) {
        message.warning("请输入verify key")
        return
    }
    if (connectionForm.qq.length == 0) {
        message.warning("请输入qq号")
        return
    }
    formRef.value
        .validate()
        .then(() => {
            emit("connect", {
                address: `ws://${connectionForm.host}/${connectionForm.channel}`,
                authentication: {
                    verifyKey: connectionForm.verifyKey,
                    qq: parseInt(connectionForm.qq)
                }
            })
        })
}

</script>