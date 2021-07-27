<template>
  <a-dropdown>
    <span id="user-dropdown-title">
      <a-avatar size="small" style="background-color: #e67e22">
        {{ user.username?.charAt(user.username.length - 1) }}
      </a-avatar>
      {{ user.username }}
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item>
            <span>
                <user-outlined /> <a style="color:rgba(0, 0, 0, 0.45)" @click="$emit('menu-select','show-profile')">我的资料</a>
            </span>
        </a-menu-item>
        <a-menu-item>
            <span>
                <logout-outlined /> <a style="color:rgba(0, 0, 0, 0.45)" @click="$emit('menu-select','logout')">退出登录</a>
            </span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts" >
import { defineEmit, defineProps } from "vue";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import type { User } from "@/types/user";
defineProps<{
  user: User
}>()
defineEmit(['menu-select'])
</script>

<style>
#user-dropdown-title {
  height: 100%;
}
#user-dropdown-title:hover {
  cursor: pointer;
}
</style>