import { App } from "@vue/runtime-core";

export default {
  install: (app: App) => {
    (window as any)['global'] = window;
  },
};