import { BaseLayout } from '@/layouts'

import {
  DesktopOutlined,
  CommentOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  ApiOutlined
} from '@ant-design/icons-vue'

import type { RouteRecordRaw } from 'vue-router'

const menuRoute =  {
  path: '/',
  component: BaseLayout,
  meta: {
    flattened: true
  },
  children: [
    {
      path: '',
      name: 'home',
      component: () => import("@/views/home.vue"),
      meta: {
        title: "控制中心",
        icon: DesktopOutlined,
      },
    },
    {
      path: 'message',
      name: 'message',
      component: () => import("@/views/message/index.vue"),
      meta: {
        title: "消息",
        icon: CommentOutlined,
      },
    },
    {
      path: 'friend',
      name: 'friend',
      component: () => import("@/views/friend/index.vue"),
      meta: {
        title: "好友",
        icon: UserOutlined,
      },
    },
    {
      path: 'group',
      name: 'group',
      component: () => import("@/views/group/index.vue"),
      meta: {
        title: "群聊",
        icon: TeamOutlined,
      },
    },
    {
      path: 'plugin',
      name: 'plugin',
      component: () => import("@/views/plugin/index.vue"),
      meta: {
        title: "插件",
        icon: ApiOutlined,
      },
    },
    {
      path: 'setting',
      name: 'setting',
      component: () => import("@/views/setting/index.vue"),
      meta: {
        title: "配置",
        icon: SettingOutlined,
      },
    },
  ],
}

const testRoutes:RouteRecordRaw[] = [
  {
    path: '/test',
    component: BaseLayout,
    meta: {
      hiddien: true
    }
  }
]

export const routes:RouteRecordRaw[] = [menuRoute]

export default routes