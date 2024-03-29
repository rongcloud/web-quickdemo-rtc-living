## 快速集成 Demo - 直播场景

## 版本依赖

```html
<!-- RongIMLib -->
<script src="https://cdn.ronghub.com/RongIMLib-5.9.2.prod.js"></script>
<!-- RTCLib v5 -->
<script src="https://cdn.ronghub.com/RCRTC-5.6.17.prod.js"></script>
```

## 使用说明

1. 将工程 clone 到本地，使用 Chrome 浏览器直接打开静态资源中的 `anchor.html` 、`audience.html` 进行操作，`anchor.html` 为主播端，`audience.html` 为观众端
2. demo 仅提供了基础的流程梳理，如您需要更多功能，可[参考低延迟直播开发文档](https://docs.rongcloud.cn/v4/5X/views/rtc/livevideo/web/guide/quick/premise/web.html)

## 参数说明

### Appkey 获取

[可在融云开发者后台 - 服务管理](https://developer.rongcloud.cn/app/appService/8zkf1JD8NLF0gxOV3S0NuA)中创建一个应用，填入应用对应的 `appkey`

### Token 获取

[可在融云开发者后台 - 服务管理 - API 调用 - 获取 Token](https://developer.rongcloud.cn/apitool/bj4hYt7YBcwvXteZeVi7aQ) 中，输入 `userId`，从提交后返回的数据中取 `token` 字段值

### RoomId

房间号长度不能超过 64，可包含 `A-Z`、`a-z`、`0-9`、`+`、`=`、`-`、`_`

### liveUrl

1. 主播端发布完资源后，会在页面显示 `liveUrl` 的值
2. 观众端可复制主播端的 `liveUrl`，在观众端输入、订阅观看

## 私有云用户特殊配置

私有云用户需要单独配置 `navi` 地址以连接到私有云的 IM 服务，`navi` 配置可通过修改 `config.js` 完成

> 私有云用户需联系商务获取私有云 sdk 的 cdn 文件
