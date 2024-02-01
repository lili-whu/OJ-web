# web 前端系统

使用 react,ant design pro, umi 构建的 web 前端界面

## 2.1 登录界面开发

登录界面是 antd pro 的 LoginForm 组件

切换界面用到了 antd 的 Tabs 组件, 加载页面标题用到了 Helmet 组件

组件可以在 antd 和 antd pro 的官方网站查找

加载请求使用 request(封装了 axios)进行后端请求, 同时用到了 proxy 正向代理, 自动转发/api 请求到后端

登录状态测试成功, 接口返回用户信息, 并保存 SessionID(session 中没有存储用户信息, 信息存储在后端 HttpServerletRequest, 具体的 session 原理还需要研究)