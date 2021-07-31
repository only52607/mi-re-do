# MI-RE-DO
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![GitHub](https://img.shields.io/github/license/only52607/mi-re-do)](https://github.com/only52607/mi-re-do)

精美的IM前端客户端实现，基于vite + vue 3 + ant-design-vue，通过[mirai-reactivity-ws](https://github.com/only52607/mirai-reactivity-ws)对接[mah](https://github.com/project-mirai/mirai-api-http)作为后端。

![logo](./assets/logo.png)

## 在线使用

[MI-RE-DO](http://)

## 功能

- [x] 对接mirai-console(websocket)后端，启动时自动连接
- [x] 好友列表、群列表、群成员列表的展示
- [x] 大部分消息格式的接收（文字、图片、语音等）
- [x] 文本消息，MessageChain格式消息的发送
- [x] 基于localStorage的消息持久化实现
- [ ] 发送复杂消息
- [ ] 基于IndexDB的前端储存方案
- [ ] 历史消息查询（需要额外增强插件支持）
- [ ] 插件管理功能（需要额外增强插件支持）
- [ ] 扩展配置功能（需要额外增强插件支持）



## 如何连接mirai-console后端

1. 配置[mirai-console-loader](https://github.com/iTXTech/mirai-console-loader)(mcl)，添加[mirai-http-api](https://github.com/project-mirai/mirai-api-http)插件。

2. 修改[mirai-http-api](https://github.com/project-mirai/mirai-api-http)配置，增加ws通道,，参考配置如下：
```yaml
adapters:
  - ws
cacheSize: 4096
enableVerify: true          # 开启verifyKey认证
verifyKey: 1234567890       # 连接时需要用到该值
adapterSettings:
  ws:
    host: localhost
    port: 8080
    reservedSyncId: -1      # 必须为-1
```
3. 启动mcl，登录bot

4. 访问在线前端页面，填入连接信息并连接



## Build

```
npm install
npm run esbuild:init
npm run build
```



## Thanks

[mirai-console-loader](https://github.com/iTXTech/mirai-console-loader)

[mirai-http-api](https://github.com/project-mirai/mirai-api-http)

[vite](https://github.com/vitejs/vite)

[ant-design-vue](https://github.com/vueComponent/ant-design-vue)

[vue](https://github.com/vuejs/vue)

## License
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)

本项目仅供学习参考，禁止用于任何商业用途。任何单位或个人认为本项目可能涉嫌侵犯其合法权益，应该及时提出反馈，我们将会第一时间对违规内容给予删除等相关处理。