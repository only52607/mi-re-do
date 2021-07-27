<template>
<a-upload v-bind="$attrs" @change="handleChange" :action="uploadAction">
    <template v-if="listType=='picture-card'">
        <div>
            <plus-outlined />
            <div class="ant-upload-text"> 上传 </div>
          </div>
    </template>
    <template v-else>
        <a-button>
            <upload-outlined></upload-outlined>
            上传
        </a-button>
    </template>
</a-upload>
</template>

<script setup lang="ts">
import { UploadOutlined } from "@ant-design/icons-vue"
import { defineEmits, defineProps } from "vue";
import type { FileInfo } from "./type";
import config from "@/config"
const { listType, limit } = defineProps<{
    listType: string
    limit: number
}>()
ref: uploadAction = `${config.baseURL}/files`
const emit = defineEmits(["change","update:fileList"])
const handleChange = (info: FileInfo) => {
    let resFileList = [...info.fileList];
    resFileList = resFileList.slice(-limit);
    emit("update:fileList", resFileList)
    emit("change", info)
};

</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>