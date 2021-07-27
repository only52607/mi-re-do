<template>
  <a-layout id="user-layout" class="layout">
    <global-logo style="font-size: 25px; margin: 18px" :collapsed="false"/>

    <div id="content">
      <router-view />
    </div>

    <global-footer id="footer" />
  </a-layout>
</template>

<script setup lang="ts" >
import { GlobalLogo } from "./logo"
import { GlobalFooter } from "./footer"
</script>

<style>
#user-layout {
  height: 100%;
  width: 100%;
  text-align: center;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} 

/* #content {
  background: '#fff';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#footer {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
} */
</style>

