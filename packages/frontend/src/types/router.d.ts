import 'vue-router'
import { User } from './user';

declare module 'vue-router' {
  interface RouteMeta {
      fullPath?: string
      hiddien?: boolean
      authorize?: (User) => boolean
      title?: string
      subTitle?: string
      icon?: Component
      flattened?: boolean // 作用于菜单显示，当值为true时，隐藏该route显示，并提取childrens到上层显示
  }
}