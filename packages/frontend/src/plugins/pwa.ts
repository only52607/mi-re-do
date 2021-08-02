import { App } from "@vue/runtime-core";
import { registerSW } from "virtual:pwa-register";

export default {
  install: (app: App) => {
    registerSW({ immediate: true });
  },
};
