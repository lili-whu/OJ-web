# OJ 系统前端界面

使用 react, ant design, ant design pro 构建的 OJ 系统前端

#### 在线访问

http://121.199.10.73

#### 前端界面组成

- 登录、注册界面
- 题目展示和条件查询
- 做题界面
  - 左侧题目内容、题解、提交记录
  - 详细提交记录界面
  - 右侧代码编辑和结果展示界面
- 管理界面(管理员)
  - 题目创建
  - 题目修改
  - 用户管理
- 管理界面(用户)
  - 用户个人信息管理
  - 历史提交记录查询

#### 主要功能介绍

- 用户登录、注册
- 题目编辑上传和修改(介绍、测试用例、时空限制、类型、难度、题解等)
- 根据标题、标签、类型查询题目, 代码提交记录查询
- 代码在线编辑, 提交, 展示运行结果
- 自动保存代码提交历史记录

## ————————————————————————————————————————

## 分割线下为项目实现笔记

## 项目部署

安装 nginx, rabbitmq, java17, mysql, docker, redis, maven (sh init.sh)

启动各项服务

前端项目打包 npm run build, 复制 dist 到服务器下载镜像 docker pull openjdk:17.0.2-jdk-oraclelinux7 修改 nginx 配置(/etc/nginx/nginx.conf), 修改端口, 后端请求转发, root 路径 // 注意参考 antd pro 官方部署文档调整参数! sudo nginx -s reload 修改 mysql 密码 sql 语句初始化数据库表后端项目上传, 创建数据库表, 代码沙箱和判题项目打包, 运行 startback.sh

```shell
mvn clean package -DskipTests
java -jar ./target/codesandbox-0.0.1-SNAPSHOT.jar
java -jar ./target/OJ-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

```

## 2.10

1. 引入 markdown 编辑 https://github.com/bytedance/bytemd 创建两个组件 MdEditor 和 MdViewer, 定义 props(值和回调函数)用于和父组件通信
2. 引入代码编辑 https://github.com/suren-atoyan/monaco-react 默认 Java // todo 加载可选配置
3. 使用 OpenApi 导入了后端接口
   - 之前写的 User 的相关接口也改成了统一的 openapi 的接口类型
   - 调用的方法名等于后端的方法名
   - post 参数为后端定义的封装 dto 类名, get 参数为方法名+Params
   - 返回类型为封装 VO 名称/类型名称+Result
   - (调用的方法感觉类似于 rpc, 可以直接调用后端的方法) plan
4. 创建题目页面使用 ant design 的表单组件, 包括 list, checkbox, radio 等
   - tips:优先使用组件的 jsx 定义去定义样式, 部分无法修改的样式(例如表单居中)不能修改, 可以调整子元素的 width, 以及改变子元素的 jsx 去实现

## 2.11

1. 题目列表使用 antdesign 的 table 组件对题目进行分页展示, 并在路由中设置参数,并设置 href 可以导航到某一题的做题界面, 题目列表添加了查询功能, 可以根据标题, tags 等模糊查询
2. 题目修改界面提交题号, 然后根据 id 查询对应题目, 并自动绑定到表单, 修改后可以提交
3. 题目详情/在线做题
   - 分为左右栏, 左边详情, 右边提交 // todo 两个比较重要的功能: 判题状态查看, 题目的提交记录, 个人的所有提交记录

## 2.17

1. 使用 Context 在题目界面传递上下文信息 tips: 当变量名和属性名相同时, 可以简写为 value, 不需要 key: value
2. 解决在解题界面点击返回会出现空白的问题
   - 在 questionList 中直接导航到 solve 界面, coding 的组件会自动加载, 并触发 useEffect 得到信息, 传递给子组件
3. 加载时自动获取上一次提交的代码和提交状态, 提交状态在下方左侧, 常见的控制位置的方法, float, textalign, margin, fontsize...
4. 加载提交记录, (组件首次加载或者[]内元素变化时调用 useEffect 函数)

## 2.18

1. 用户信息修改界面
2. 用户查看做题详情界面
3. 用户查看提交记录界面
4. bug: defaultLanguage 设置成 java 实现代码高亮, 之前设置成 Java, 没有该属性

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
