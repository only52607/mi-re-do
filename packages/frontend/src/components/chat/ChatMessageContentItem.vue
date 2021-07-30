<template>
    <template v-if="message.type == 'Source'"></template>
    <template v-else-if="message.type == 'Plain'">
        <span>{{ message.text }}</span>
    </template>
    <template v-else-if="message.type == 'Face'">{{ `[${message.name}]` }}</template>
    <template v-else-if="message.type == 'Image'">
        <img @click="$emit('display-image', getImageUrl(message))" :src="message.url ?? undefined" />
    </template>
    <template v-else-if="message.type == 'FlashImage'">
        <a-tag>闪图</a-tag>
        <img @click="$emit('display-image', getImageUrl(message))" :src="message.url ?? undefined" />
    </template>
    <template v-else-if="message.type == 'AtAll'">
        <a-tag>@全体成员</a-tag>
    </template>
    <template v-else-if="message.type == 'At'">
        <a-tag>@{{ message.display }}[{{ message.target }}]</a-tag>
    </template>
    <template v-else-if="message.type == 'Voice'">
        <a-tag>
            语音:
            <a :href="message.url ?? undefined">{{ message.voiceId }}</a>
        </a-tag>
        <br />
        <audio
            :src="message.url ?? undefined"
            controls="true"
        >Your browser does not support the audio element.</audio>
    </template>
    <template v-else-if="message.type == 'Poke'">
        <a-tag>Poke {{ message.name }}</a-tag>
    </template>
    <template v-else-if="message.type == 'Xml'">
        <a-tag>XML</a-tag>
        <br />
        {{ message.xml }}
    </template>
    <template v-else-if="message.type == 'MusicShare'">
        <a-tag>音乐分享</a-tag>
        <br />
        {{ message.musicUrl }}
    </template>
    <template v-else-if="message.type == 'App'">
        <a-tag>App</a-tag>
        <br /> 
        {{ message.content }}
    </template>
    <template v-else-if="message.type == 'Json'">
        <a-tag>Json</a-tag>
        <br />
        {{ message.json }}
    </template>
    <template v-else-if="message.type == 'Quote'">
        <a-tag>引用 {{ message.id }}</a-tag>
    </template>
    <template v-else-if="message.type == 'File'">
        <a-tag>文件 {{ message.id }}</a-tag>
    </template>
    <template v-else-if="message.type == 'Forward'">
        <a-tag>转发消息 {{ message.title }}</a-tag>
    </template>
</template>


<script setup lang="ts">
import type { SingleMessage } from 'mirai-reactivity-ws';
import { defineProps } from 'vue';

defineProps<{
    message: SingleMessage
}>()

defineEmits<{
    (event: "display-image", url: string): void
}>()

function getImageUrl(message: SingleMessage) {
    if (message.type == "Image" || message.type == "FlashImage") {
        return message.url ?? ""
    }
    return ""
}

</script>


<style lang="less" scoped>
img {
    max-height: 150px;
    border-radius: 5px;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
}

span {
    vertical-align: bottom;
}
</style>