# OJ 系统前端界面

使用 react,ant design pro, umi 构建的登录注册, 用户管理的 web 前端

- 基础登录注册用户管理功能继承 user-center-web 项目

## 2.10

1. 引入 markdown 编辑 https://github.com/bytedance/bytemd 创建两个组件 MdEditor 和 MdViewer, 定义 props(值和回调函数)用于和父组件通信 plan
1. 创建题目页面
1. 题目内容管理页面
1. 题目列表
1. 题目详情/在线做题

# web 用户中心

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

## 2.3 主界面开发

1. 使用 AntDesign 的 Menu 组件, 去除了 app.tsx 中定义的全局 layout 布局 ProLayout
2. 使用 children 完成了页面嵌套, 使用<Outlet>做了路由组件的嵌套

## 2.4 用户信息表格展示

1. 使用 ProComponents 的 table 组件展示用户信息, 路由/admin/userMange, 主要是定义 columns, 可以根据列项自动生成查询条件等,包含
   - dataIndex 对象字段
   - title 列名
   - filters:过滤筛选
   - valueType: 数据类型(日期 datetime, select 枚举类型)
   - render: 数据渲染
   - sorter 排序
2. 退出登录接口, 后端会将 session 对应的 user 信息取消, 前端也更改 InitialState
3. 适配后端的统一响应结果 // todo 分页查询, 条件查询

## 2.6 条件查询接口

1. 实现了条件查询和分页查询接口, 部分字段支持模糊搜索, 结果支持分页显示
2. 实现了删除接口, 可以对用户进行逻辑删除
