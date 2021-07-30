<template>
    <a-modal :title="bot?.nickname" v-bind="$attrs" :footer="null">
        <user-description :user-id="botId ?? 0" :profile="bot" />
    </a-modal>
</template>

<script setup lang="ts">
import type { Optional } from "@/types/utility";
import type { BotProfile } from "mirai-reactivity-ws";
import { defineProps } from "@vue/runtime-core";
import UserDescription from "@/components/info/UserDescription.vue"

defineProps<{
    bot: Optional<BotProfile>,
    botId: Optional<number>
}>()


</script>