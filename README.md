# web 前端系统

使用 react,ant design pro, umi 构建的 web 前端界面

## 2.1 登录界面开发

登录界面是 antd pro 的 LoginForm 组件

切换界面用到了 antd 的 Tabs 组件, 加载页面标题用到了 Helmet 组件

组件可以在 antd 和 antd pro 的官方网站查找

加载请求使用 request(封装了 axios)进行后端请求, 同时用到了 proxy 正向代理, 自动转发/api 请求到后端

登录状态测试成功, 接口返回用户信息, 并保存 SessionID(session 中没有存储用户信息, 信息存储在后端 HttpServerletRequest, 具体的 session 原理还需要研究)

## 2.2 注册界面开发

1. app.tsx 是前端项目的全局文件, 在 app.tsx 中有一个 onPageChange, 判断用户身份, 如果得不到用户身份则跳转到 login 界面; app.tsx 中的 getInitialState 会在页面刷新时执行, 其中定义的 fetchUserInfo 的 async 异步函数, 会在界面不是 login 时执行并 await 结果

2. 重写了登录和注册组件, 使用 ant design 的 form 表单实现, 并添加了表头的头像和标题

3. 修改了和后端统一的请求接口和返回类型

4. 创建字符串常量类出现无法识别的问题, 需要后续解决(todo), 出现报错以报错为线索去解决, 一个字符串常量类导致整个界面无法加载
