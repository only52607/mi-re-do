<template>
<a-upload v-bind="$attrs" :action="uploadAction" @change="handleChange">
<a-button>
    <upload-outlined></upload-outlined>
    上传
</a-button>
</a-upload>
</template>

<script setup lang="ts">
import { UploadOutlined } from "@ant-design/icons-vue"
import { defineEmits } from "vue";
import type { FileInfo } from "./type";
import config from "@/config"
import { message } from "ant-design-vue";
const emit = defineEmits(["change","update:fileList"])
const handleChange = (info: FileInfo) => {
    let resFileList = [...info.fileList];
    resFileList = resFileList.slice(-1);
    emit("update:fileList", resFileList)
    emit("change", info)
    if (info.file.status == "done") {
        message.success("上传成功")
    }
};
ref: uploadAction = `${config.baseURL}/files`

</script>