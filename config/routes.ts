export default [
  {
    path: '/user',
    layout: false, // 不加载全局layout
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  // 系统首页, 未登录自动跳转到登录界面
  { path: '/', redirect: '/main/questionList' },

  // 管理界面的侧边栏直接读取的这个路由下的内容
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    component: './Admin',
    access: 'canAdmin', // 对应access, 只有管理员能查看的界面
    routes: [
      { path: '/admin/userManage', name: '用户管理', component: './Admin/UserManage' },
      { path: '/admin/questionCreate', name: '题目创建', component: './Admin/QuestionCreate' },
      { path: '/admin/questionRevise', name: '题目修改', component: './Admin/QuestionRevise' },
    ],
  },
  // 题目页面
  {
    path: '/main',
    name: '题目页面',

    routes: [
      {
        path: '/main/coding/',
        name: '解题主界面',
        component: './Main/Coding/',

        routes: [
          {
            path: '/main/coding/solve',
            name: '解题',
            component: './Main/Coding/Solve',
            hideInMenu: true,
          },
          {
            path: '/main/coding/answer',
            name: '题解',
            component: './Main/Coding/Answer',
            hideInMenu: true,
          },
          {
            path: '/main/coding/record',
            name: '提交记录',
            component: './Main/Coding/Record',
            hideInMenu: true,
          },
        ],
      },

      { path: '/main/questionList', name: '题目列表', component: './Main/QuestionList' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
