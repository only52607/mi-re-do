<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { ref } from 'vue';
moment.locale('zh-cn');
const locale = ref(zhCN)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>